'use client';

import React, { useState, useEffect } from 'react';
import { trackEvent, trackLeadConversion } from '@/lib/tracking';
import TurnstileField from '@/components/TurnstileField';

interface UTMParams {
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  utm_term: string;
  utm_content: string;
  gclid: string;
  landing_page: string;
  referrer: string;
}

interface LandingContactFormProps {
  formTitle?: string;
  buttonText?: string;
}

export default function LandingContactForm({
  formTitle = 'Get Your Free Security Assessment',
  buttonText = 'Request Security Audit',
}: LandingContactFormProps) {
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY || '';
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    website: '',
    message: '',
    fax_number: '', // honeypot
    form_started_at: Date.now(),
    turnstile_token: '',
  });
  const [errorText, setErrorText] = useState('');
  const [utmParams, setUtmParams] = useState<UTMParams>({
    utm_source: '',
    utm_medium: '',
    utm_campaign: '',
    utm_term: '',
    utm_content: '',
    gclid: '',
    landing_page: '',
    referrer: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [hasTrackedStart, setHasTrackedStart] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setUtmParams({
      utm_source: params.get('utm_source') || '',
      utm_medium: params.get('utm_medium') || '',
      utm_campaign: params.get('utm_campaign') || '',
      utm_term: params.get('utm_term') || '',
      utm_content: params.get('utm_content') || '',
      gclid: params.get('gclid') || '',
      landing_page: window.location.pathname,
      referrer: document.referrer || '',
    });
  }, []);

  const trackFormStart = () => {
    if (hasTrackedStart) return;
    setHasTrackedStart(true);
    trackEvent('form_start', {
      form_name: 'uk_landing_contact',
      page_path: utmParams.landing_page || window.location.pathname,
    });
  };

  const normalizeWebsite = (value: string) => {
    const trimmed = value.trim();
    if (!trimmed) return '';
    if (/^[a-z]+:\/\//i.test(trimmed)) return trimmed;
    return `https://${trimmed}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.fax_number) return; // honeypot
    trackFormStart();
    setErrorText('');

    if (turnstileSiteKey && !formData.turnstile_token) {
      setErrorText('Please complete the security check above, then submit again.');
      setStatus('error');
      return;
    }

    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          website: normalizeWebsite(formData.website),
          // /api/contact requires a message of 12+ chars; emergency visitors often skip it
          message: formData.message.trim() || 'Emergency recovery request via landing page — no details provided.',
          ...utmParams,
        }),
      });

      if (res.ok) {
        setStatus('success');
        trackEvent('form_submit_success', {
          form_name: 'uk_landing_contact',
          page_path: utmParams.landing_page || window.location.pathname,
          source: utmParams.utm_source || 'direct',
          medium: utmParams.utm_medium || 'none',
          campaign: utmParams.utm_campaign || 'none',
        });
        trackLeadConversion({
          form_name: 'uk_landing_contact',
          page_path: utmParams.landing_page || window.location.pathname,
          source: utmParams.utm_source || 'direct',
          medium: utmParams.utm_medium || 'none',
          campaign: utmParams.utm_campaign || 'none',
        });
        setFormData({ name: '', email: '', phone: '', website: '', message: '', fax_number: '', form_started_at: Date.now(), turnstile_token: '' });
        setHasTrackedStart(false);
      } else {
        setStatus('error');
        trackEvent('form_submit_error', {
          form_name: 'uk_landing_contact',
          page_path: utmParams.landing_page || window.location.pathname,
        });
      }
    } catch {
      setStatus('error');
      trackEvent('form_submit_error', {
        form_name: 'uk_landing_contact',
        page_path: utmParams.landing_page || window.location.pathname,
      });
    }
  };

  if (status === 'success') {
    return (
      <div style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: '16px',
        padding: '3rem 2rem',
        textAlign: 'center',
      }}>
        <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>&#10003;</div>
        <h3 style={{ color: 'var(--foreground)', marginBottom: '0.75rem' }}>Thank You!</h3>
        <p style={{ color: '#a1a1aa', marginBottom: '1.5rem' }}>
          We&apos;ve received your request. Triage begins within 30 minutes during active coverage hours.
        </p>
        <p style={{ color: 'var(--foreground)', fontWeight: 600, marginBottom: '0.75rem', fontSize: '0.95rem' }}>
          Site actively compromised? Use the fastest route:
        </p>
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a
            href="tel:+447344540450"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: '#ef4444', color: '#fff', fontWeight: 700, padding: '0.6rem 1.2rem', borderRadius: '0.5rem', fontSize: '0.9rem', textDecoration: 'none' }}
          >
            📞 Call Now
          </a>
          <a
            href="https://wa.me/447344540450?text=I%20just%20submitted%20the%20recovery%20form%20and%20my%20site%20is%20actively%20compromised"
            target="_blank"
            rel="noopener noreferrer"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: '#16a34a', color: '#fff', fontWeight: 700, padding: '0.6rem 1.2rem', borderRadius: '0.5rem', fontSize: '0.9rem', textDecoration: 'none' }}
          >
            💬 WhatsApp
          </a>
        </div>
      </div>
    );
  }

  return (
    <div style={{
      background: 'var(--surface)',
      border: '1px solid var(--border)',
      borderRadius: '16px',
      padding: '2.5rem 2rem',
    }}>
      <h3 style={{ color: 'var(--foreground)', marginBottom: '0.25rem', fontSize: '1.3rem' }}>
        {formTitle}
      </h3>
      <p style={{ color: '#a1a1aa', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
        No obligation. We&apos;ll review your site and send a detailed security report.
      </p>
      <form onSubmit={handleSubmit}>
        <div style={{ display: 'none' }}>
          <input
            type="text"
            name="fax_number"
            value={formData.fax_number}
            onChange={(e) => setFormData({ ...formData, fax_number: e.target.value })}
            tabIndex={-1}
            autoComplete="new-password"
          />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <input
            type="text"
            placeholder="Your name"
            required
            value={formData.name}
            onFocus={trackFormStart}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            minLength={2}
            maxLength={80}
            autoComplete="name"
            style={{
              background: 'var(--background)',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              padding: '0.85rem 1rem',
              color: 'var(--foreground)',
              fontSize: '0.95rem',
            }}
          />
          <input
            type="email"
            placeholder="Email address"
            required
            value={formData.email}
            onFocus={trackFormStart}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            autoComplete="email"
            style={{
              background: 'var(--background)',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              padding: '0.85rem 1rem',
              color: 'var(--foreground)',
              fontSize: '0.95rem',
            }}
          />
          <input
            type="tel"
            placeholder="Phone / WhatsApp (for fastest callback)"
            value={formData.phone}
            onFocus={trackFormStart}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            autoComplete="tel"
            style={{
              background: 'var(--background)',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              padding: '0.85rem 1rem',
              color: 'var(--foreground)',
              fontSize: '0.95rem',
            }}
          />
          <input
            type="text"
            inputMode="url"
            placeholder="Website URL (example.com)"
            required
            value={formData.website}
            onFocus={trackFormStart}
            onChange={(e) => setFormData({ ...formData, website: e.target.value })}
            autoComplete="url"
            style={{
              background: 'var(--background)',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              padding: '0.85rem 1rem',
              color: 'var(--foreground)',
              fontSize: '0.95rem',
            }}
          />
          <textarea
            placeholder="What's happening with your site? (optional)"
            rows={3}
            value={formData.message}
            onFocus={trackFormStart}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            style={{
              background: 'var(--background)',
              border: '1px solid var(--border)',
              borderRadius: '8px',
              padding: '0.85rem 1rem',
              color: 'var(--foreground)',
              fontSize: '0.95rem',
              resize: 'vertical',
              fontFamily: 'inherit',
            }}
          />
          <TurnstileField
            siteKey={turnstileSiteKey}
            theme="dark"
            onTokenChange={(token) => setFormData((current) => ({ ...current, turnstile_token: token }))}
          />
          <button
            type="submit"
            disabled={status === 'loading' || (Boolean(turnstileSiteKey) && !formData.turnstile_token)}
            className="btn btn-primary"
            style={{ width: '100%', justifyContent: 'center', padding: '1rem' }}
          >
            {status === 'loading' ? 'Sending...' : buttonText}
          </button>
        </div>
        {status === 'error' && (
          <p style={{ color: '#ef4444', marginTop: '0.75rem', fontSize: '0.9rem' }}>
            {errorText || 'Something went wrong. Please try again or email us at sales@webadish.co.uk.'}
          </p>
        )}
      </form>
    </div>
  );
}
