import { NextResponse } from 'next/server';
import { Resend } from 'resend';

export const runtime = 'nodejs';

interface ContactPayload {
  name?: string;
  email?: string;
  phone?: string;
  website?: string;
  message?: string;
  fax_number?: string; // honeypot
  form_started_at?: number | string;
  turnstile_token?: string;
  // UTM tracking
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
  gclid?: string;
  landing_page?: string;
  referrer?: string;
}

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const RATE_LIMIT_MAX_REQUESTS = 5;
const MIN_FORM_FILL_MS = 1500;
const MAX_FORM_AGE_MS = 24 * 60 * 60 * 1000;
const ipHits = new Map<string, number[]>();

function getClientIp(request: Request) {
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  return request.headers.get('x-real-ip') || 'unknown';
}

function isRateLimited(ip: string) {
  const now = Date.now();
  const existing = ipHits.get(ip) || [];
  const recent = existing.filter((ts) => now - ts < RATE_LIMIT_WINDOW_MS);
  recent.push(now);
  ipHits.set(ip, recent);
  return recent.length > RATE_LIMIT_MAX_REQUESTS;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) return null;
  return new Resend(apiKey);
}

function parseRecipientList(...values: Array<string | undefined>) {
  return Array.from(
    new Set(
      values
        .flatMap((value) => (value || '').split(','))
        .map((value) => value.trim())
        .filter(Boolean)
    )
  );
}

function normaliseAttributionValue(value: string | undefined) {
  return (value || '').trim().toLowerCase();
}

function inferLeadChannel({
  utmSource,
  utmMedium,
  gclid,
  referrer,
}: {
  utmSource: string;
  utmMedium: string;
  gclid: string;
  referrer: string;
}) {
  const source = normaliseAttributionValue(utmSource);
  const medium = normaliseAttributionValue(utmMedium);
  const ref = normaliseAttributionValue(referrer);

  if (gclid) {
    return 'Google Ads (paid click detected via GCLID)';
  }

  if (source === 'google' && ['cpc', 'ppc', 'paid', 'paidsearch'].includes(medium)) {
    return 'Google Ads / paid search';
  }

  if (['meta', 'facebook', 'instagram'].includes(source) && ['cpc', 'paid', 'paid-social', 'social-paid'].includes(medium)) {
    return 'Paid social campaign';
  }

  if (source || medium) {
    return `Campaign traffic (${source || 'unknown source'} / ${medium || 'unknown medium'})`;
  }

  if (ref.includes('google.')) {
    return 'Organic Google or untagged Google traffic';
  }

  if (ref) {
    return 'Referral or untagged external traffic';
  }

  return 'Direct / unknown';
}

async function sendLeadWebhook(payload: Record<string, unknown>) {
  const webhookUrl = process.env.CONTACT_WEBHOOK_URL;
  if (!webhookUrl) return { sent: false as const, skipped: true as const };

  const secret = process.env.CONTACT_WEBHOOK_SECRET || '';
  const targetUrl = new URL(webhookUrl);
  if (secret) {
    targetUrl.searchParams.set('secret', secret);
  }

  const response = await fetch(targetUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...(secret ? { 'x-webhook-secret': secret } : {}),
    },
    body: JSON.stringify({
      ...payload,
      webhookSecret: secret || undefined,
    }),
    cache: 'no-store',
  });

  if (!response.ok) {
    const responseText = await response.text().catch(() => '');
    throw new Error(
      `Lead webhook failed: ${response.status} ${response.statusText}${responseText ? ` - ${responseText.slice(0, 200)}` : ''}`
    );
  }

  return { sent: true as const, skipped: false as const };
}

async function verifyTurnstileToken(token: string, ip: string) {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true;
  if (!token) return false;

  const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: new URLSearchParams({
      secret,
      response: token,
      remoteip: ip,
    }),
    cache: 'no-store',
  });

  if (!response.ok) return false;

  const data = (await response.json()) as { success?: boolean };
  return Boolean(data.success);
}

function hasMostlySafeCharacters(value: string) {
  return /^[\p{L}\p{N}\s.,'’"!?():/&+@#%-]*$/u.test(value);
}

function countLetters(value: string) {
  const matches = value.match(/\p{L}/gu);
  return matches ? matches.length : 0;
}

function countWords(value: string) {
  return value.trim().split(/\s+/).filter(Boolean).length;
}

function looksLikeRealName(value: string) {
  if (value.length < 2 || value.length > 80) return false;
  if (!/^[\p{L}\s.'’-]+$/u.test(value)) return false;
  return countLetters(value) >= 2;
}

function looksLikeRealMessage(value: string) {
  if (value.length < 12 || value.length > 4000) return false;
  if (!hasMostlySafeCharacters(value)) return false;
  if (countWords(value) < 3) return false;

  const letters = countLetters(value);
  const compactLength = value.replace(/\s+/g, '').length;
  if (!compactLength || letters / compactLength < 0.45) return false;

  if (/[A-Z]{5,}/.test(value) && !/\s/.test(value)) return false;
  if (/[bcdfghjklmnpqrstvwxyz]{7,}/i.test(value)) return false;

  return true;
}

function looksLikeValidWebsite(value: string) {
  if (!value || value === 'Not provided') return true;

  try {
    const normalized = /^[a-z]+:\/\//i.test(value) ? value : `https://${value}`;
    const url = new URL(normalized);
    return Boolean(url.hostname && url.hostname.includes('.'));
  } catch {
    return false;
  }
}

function parseStartedAt(value?: number | string) {
  if (typeof value === 'number') return value;
  if (typeof value === 'string' && value.trim()) {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  }
  return null;
}

function buildCustomerReplyHtml(name: string, message: string, replyToEmail: string, submissionId: string) {
  return `
    <div style="margin:0;padding:0;background:#f4f4f5;font-family:Arial,'Helvetica Neue',Helvetica,sans-serif;color:#18181b;">
      <div style="max-width:640px;margin:0 auto;padding:32px 16px;">
        <div style="background:#0b1220;border-radius:20px 20px 0 0;padding:22px 28px;text-align:left;">
          <img src="https://www.webadish.co.uk/brand/webadish-logo-white.png" alt="WebAdish" style="width:140px;max-width:100%;height:auto;display:block;" />
        </div>
        <div style="background:#ffffff;border:1px solid #e4e4e7;border-top:none;border-radius:0 0 20px 20px;padding:32px 28px;">
          <p style="margin:0 0 16px;font-size:16px;line-height:1.7;">Hi ${name},</p>
          <p style="margin:0 0 16px;font-size:16px;line-height:1.7;">
            Thank you for contacting <strong>WebAdish</strong>. We have received your message and will review it shortly.
          </p>
          <p style="margin:0 0 16px;font-size:16px;line-height:1.7;">
            If your request is urgent and relates to a hacked website or active security issue, you can reply to this email or call
            <strong> +44 7344 540450</strong>.
          </p>

          <div style="margin:24px 0;padding:20px;border-radius:16px;background:#fafafa;border:1px solid #e4e4e7;">
            <p style="margin:0 0 10px;font-size:13px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#71717a;">Your Message</p>
            <p style="margin:0;font-size:15px;line-height:1.8;color:#27272a;">${message}</p>
          </div>

          <div style="margin:24px 0;padding:20px;border-radius:16px;background:#fff7ed;border:1px solid #fdba74;">
            <p style="margin:0 0 8px;font-size:13px;font-weight:700;letter-spacing:0.08em;text-transform:uppercase;color:#9a3412;">What Happens Next</p>
            <p style="margin:0;font-size:15px;line-height:1.8;color:#431407;">
              We will review your enquiry and come back with the right next step, whether that is an audit, recovery assessment, protection retainer, or a direct response call.
            </p>
          </div>

          <p style="margin:0 0 16px;font-size:14px;line-height:1.7;color:#52525b;">
            Reference: <strong>${submissionId}</strong>
          </p>

          <p style="margin:0 0 8px;font-size:15px;line-height:1.7;">Regards,</p>
          <p style="margin:0;font-size:15px;line-height:1.7;">
            <strong>WebAdish Team</strong><br />
            <a href="mailto:${replyToEmail}" style="color:#dc2626;text-decoration:none;">${replyToEmail}</a><br />
            <span style="color:#52525b;">+44 7344 540450</span>
          </p>
        </div>
      </div>
    </div>
  `;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactPayload;
    const name = body.name?.trim();
    const email = body.email?.trim();
    const phone = body.phone?.trim() || '';
    const website = body.website?.trim() || 'Not provided';
    const message = body.message?.trim();
    const honeypot = body.fax_number?.trim();
    const startedAt = parseStartedAt(body.form_started_at);
    const turnstileToken = body.turnstile_token?.trim() || '';
    const ip = getClientIp(request);

    // Silent drop paths to avoid teaching bots how the filter works.
    if (honeypot) {
      console.warn('Silently dropped contact form submission: honeypot hit', { ip });
      return NextResponse.json({ success: true });
    }

    const now = Date.now();
    if (!startedAt || now - startedAt < MIN_FORM_FILL_MS || now - startedAt > MAX_FORM_AGE_MS) {
      console.warn('Rejected contact form submission: invalid timing', { ip });
      return NextResponse.json(
        { error: 'Please wait a moment and try again.' },
        { status: 400 }
      );
    }

    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: 'Too many requests. Please wait a few minutes before trying again.' },
        { status: 429 }
      );
    }

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 });
    }

    if (!looksLikeRealName(name) || !looksLikeRealMessage(message) || !looksLikeValidWebsite(website)) {
      console.warn('Rejected contact form submission: suspicious content', {
        ip,
        email,
        landingPage: body.landing_page,
      });
      return NextResponse.json(
        { error: 'Please add a little more detail so we can assess the request properly.' },
        { status: 400 }
      );
    }

    const isTurnstileValid = await verifyTurnstileToken(turnstileToken, ip);
    if (!isTurnstileValid) {
      console.warn('Rejected contact form submission: turnstile failed', {
        ip,
        email,
        landingPage: body.landing_page,
      });
      return NextResponse.json(
        { error: 'The security check expired or failed. Please complete it again.' },
        { status: 400 }
      );
    }

    const resend = getResendClient();
    const internalRecipients = parseRecipientList(
      process.env.CONTACT_TO_EMAIL,
      process.env.CONTACT_BACKUP_TO_EMAIL,
      process.env.RESEND_TO_EMAIL
    );
    const fromName = process.env.CONTACT_FROM_NAME || 'WebAdish Website';
    const fromEmail = process.env.CONTACT_FROM_EMAIL;
    const submissionId = `uk-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;

    if (!resend || !fromEmail || !internalRecipients.length) {
      return NextResponse.json({ error: 'Resend is not fully configured.' }, { status: 500 });
    }

    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeWebsite = escapeHtml(website);
    const safeMessage = escapeHtml(message).replace(/\n/g, '<br/>');

    // UTM tracking data
    const utmSource = body.utm_source || '';
    const utmMedium = body.utm_medium || '';
    const utmCampaign = body.utm_campaign || '';
    const utmTerm = body.utm_term || '';
    const utmContent = body.utm_content || '';
    const gclid = body.gclid || '';
    const landingPage = body.landing_page || '';
    const referrer = body.referrer || '';

    const inferredChannel = inferLeadChannel({ utmSource, utmMedium, gclid, referrer });
    const hasAttributionData = utmSource || utmMedium || utmCampaign || gclid || landingPage || referrer;
    const attributionSection = `
        <hr/>
        <h3>Lead Attribution</h3>
        <p><strong>Likely Channel:</strong> ${escapeHtml(inferredChannel)}</p>
        <p><strong>Source:</strong> ${escapeHtml(utmSource || 'direct')}</p>
        <p><strong>Medium:</strong> ${escapeHtml(utmMedium || 'none')}</p>
        <p><strong>Campaign:</strong> ${escapeHtml(utmCampaign || 'none')}</p>
        ${utmTerm ? `<p><strong>Term:</strong> ${escapeHtml(utmTerm)}</p>` : ''}
        ${utmContent ? `<p><strong>Content:</strong> ${escapeHtml(utmContent)}</p>` : ''}
        ${gclid ? `<p><strong>GCLID:</strong> ${escapeHtml(gclid)}</p>` : ''}
        <p><strong>Landing Page:</strong> ${escapeHtml(landingPage || 'unknown')}</p>
        <p><strong>Referrer:</strong> ${escapeHtml(referrer || 'direct')}</p>
    `;

    console.info('Contact form submission accepted', {
      submissionId,
      name,
      email,
      website,
      landingPage,
      utmSource: utmSource || 'direct',
      utmMedium: utmMedium || 'organic',
      utmCampaign: utmCampaign || '',
      gclid: gclid || '',
      recipients: internalRecipients,
    });

    const webhookResult = await sendLeadWebhook({
      submissionId,
      submittedAt: new Date().toISOString(),
      source: 'webadish-co-uk-contact',
      name,
      email,
      website,
      message,
      landingPage,
      referrer,
      utm: {
        source: utmSource || 'direct',
        medium: utmMedium || 'organic',
        campaign: utmCampaign || '',
        term: utmTerm || '',
        content: utmContent || '',
        gclid: gclid || '',
      },
    });

    const notifyResult = await resend.emails.send({
      from: `${fromName} <${fromEmail}>`,
      to: internalRecipients,
      bcc: ['dilipparmar@gmail.com'],
      replyTo: email,
      subject: `New contact form enquiry from ${name}${utmSource ? ` [${utmSource}]` : ''} [${submissionId}]`,
      text: `Submission ID: ${submissionId}\nName: ${name}\nEmail: ${email}${phone ? `\nPhone/WhatsApp: ${phone}` : ''}\nWebsite: ${website}\n\nMessage:\n${message}\n\nLead Attribution:\nLikely Channel: ${inferredChannel}\nSource: ${utmSource || 'direct'}\nMedium: ${utmMedium || 'none'}\nCampaign: ${utmCampaign || 'none'}${utmTerm ? `\nTerm: ${utmTerm}` : ''}${utmContent ? `\nContent: ${utmContent}` : ''}${gclid ? `\nGCLID: ${gclid}` : ''}\nLanding Page: ${landingPage || 'unknown'}\nReferrer: ${referrer || 'direct'}`,
      html: `
        <h2>New contact form enquiry</h2>
        <p><strong>Submission ID:</strong> ${escapeHtml(submissionId)}</p>
        <p><strong>Name:</strong> ${safeName}</p>
        <p><strong>Email:</strong> ${safeEmail}</p>
        ${phone ? `<p><strong>Phone/WhatsApp:</strong> ${escapeHtml(phone)}</p>` : ''}
        <p><strong>Website:</strong> ${safeWebsite}</p>
        <p><strong>Message:</strong></p>
        <p>${safeMessage}</p>
        ${attributionSection}
      `,
    });

    if (notifyResult.error) {
      throw new Error(`Team email failed: ${notifyResult.error.message}`);
    }

    const replyResult = await resend.emails.send({
      from: `${fromName} <${fromEmail}>`,
      to: email,
      bcc: internalRecipients,
      replyTo: internalRecipients[0],
      subject: `Thanks for contacting WebAdish — we received your message [${submissionId}]`,
      text: `Hi ${name},\n\nThank you for contacting WebAdish. We have received your message and will get back to you shortly.\n\nReference: ${submissionId}\n\nYour message:\n${message}\n\nRegards,\nWebAdish Team`,
      html: buildCustomerReplyHtml(safeName, safeMessage, internalRecipients[0], submissionId),
    });

    if (replyResult.error) {
      console.error('Contact form auto-reply error:', replyResult.error.message, replyResult.error);
    }

    console.info('Contact form submission delivered', {
      submissionId,
      webhookSent: webhookResult.sent,
      webhookSkipped: webhookResult.skipped,
      notifyMessageId: notifyResult.data?.id || null,
      replyMessageId: replyResult.data?.id || null,
      recipients: internalRecipients,
    });

    return NextResponse.json({ success: true, submissionId });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('Contact form mail error:', message, error);

    return NextResponse.json(
      {
        error: 'Failed to send message.',
        debug: process.env.NODE_ENV !== 'production' ? message : undefined,
      },
      { status: 500 }
    );
  }
}
