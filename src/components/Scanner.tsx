'use client';

import { useState } from 'react';
import { Search, ShieldCheck, AlertTriangle, Loader2, ArrowRight, Lock } from 'lucide-react';
import { trackEvent } from '@/lib/tracking';
import type { ScanResult, Finding, Severity } from '@/lib/scanner';

const WA =
  'https://wa.me/447344540450?text=I%20ran%20the%20security%20scanner%20and%20need%20help%20with%20my%20WordPress%20site.';

type SevKey = Severity | 'unknown';
const SEV: Record<SevKey, { color: string; bg: string; border: string; label: string }> = {
  critical: { color: '#f87171', bg: 'rgba(239,68,68,0.12)', border: 'rgba(239,68,68,0.4)', label: 'Critical' },
  warning: { color: '#fbbf24', bg: 'rgba(217,119,6,0.12)', border: 'rgba(217,119,6,0.4)', label: 'Warning' },
  ok: { color: '#34d399', bg: 'rgba(16,163,74,0.12)', border: 'rgba(16,163,74,0.35)', label: 'OK' },
  unknown: { color: '#94a3b8', bg: 'rgba(148,163,184,0.1)', border: 'rgba(148,163,184,0.3)', label: 'N/A' },
};

const panel = (extra: React.CSSProperties = {}): React.CSSProperties => ({
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid rgba(255,255,255,0.1)',
  borderRadius: '16px',
  ...extra,
});

export default function Scanner() {
  const [url, setUrl] = useState('');
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<ScanResult | null>(null);

  const [leadEmail, setLeadEmail] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [leadCompany, setLeadCompany] = useState(''); // honeypot
  const [leadSubmitting, setLeadSubmitting] = useState(false);
  const [leadError, setLeadError] = useState('');
  const [unlocked, setUnlocked] = useState(false);

  const issues = result ? result.counts.critical + result.counts.warning : 0;
  const showGate = result && issues > 0 && !unlocked;
  const showFindings = result && (unlocked || issues === 0);

  // A confirmed infection (malware signature, injected spam, blacklist flag, or
  // any critical finding) routes the CTA to the dedicated malware-removal page —
  // the more specific, higher-intent landing page — rather than generic recovery.
  const infected =
    !!result &&
    (result.verdict === 'infected' ||
      result.findings.some((f) => (f.category === 'malware' || f.category === 'blacklist') && f.severity !== 'ok'));
  const fixHref = infected ? '/wordpress-malware-removal' : '/hacked-website-recovery-uk';
  const fixLabel = infected ? 'Malware Removal' : 'Recovery Service';

  async function handleScan(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    if (!url.trim()) {
      setError('Please enter your website address.');
      return;
    }
    setScanning(true);
    setResult(null);
    setUnlocked(false);
    trackEvent('scan_started');
    try {
      const res = await fetch('/api/scan', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: url.trim() }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data?.error || 'The scan failed. Please try again.');
        return;
      }
      if (data.verdict === 'error') {
        setError(data.error || 'We could not reach that site.');
        return;
      }
      setResult(data as ScanResult);
      trackEvent('scan_complete', { verdict: data.verdict, score: data.score });
    } catch {
      setError('Something went wrong. Please try again.');
    } finally {
      setScanning(false);
    }
  }

  async function handleLead(e: React.FormEvent) {
    e.preventDefault();
    setLeadError('');
    if (!result) return;
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(leadEmail.trim())) {
      setLeadError('Please enter a valid email address.');
      return;
    }
    setLeadSubmitting(true);
    try {
      const res = await fetch('/api/scan-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          url: result.url,
          email: leadEmail.trim(),
          phone: leadPhone.trim(),
          fax_number: leadCompany, // honeypot
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setLeadError(data?.error || 'Could not unlock. Please try again.');
        return;
      }
      trackEvent('scan_lead', { verdict: result.verdict });
      trackEvent('generate_lead', { value: result.verdict === 'infected' ? 1 : 0 });
      setUnlocked(true);
    } catch {
      setLeadError('Something went wrong. Please try again.');
    } finally {
      setLeadSubmitting(false);
    }
  }

  const tone = !result
    ? SEV.unknown
    : result.verdict === 'infected'
    ? SEV.critical
    : result.verdict === 'clean'
    ? SEV.ok
    : SEV.warning;

  return (
    <div className="container" style={{ maxWidth: '820px' }}>
      {/* Hero + form */}
      <div style={{ textAlign: 'center', padding: '3rem 0 1.5rem' }}>
        <div
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.4)',
            color: '#a5b4fc', fontSize: '0.85rem', fontWeight: 600,
            padding: '0.4rem 0.9rem', borderRadius: '999px', marginBottom: '1.5rem',
          }}
        >
          <ShieldCheck size={15} /> Free Instant Scan
        </div>
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 800, lineHeight: 1.1, marginBottom: '1rem' }}>
          Is Your WordPress Site <span style={{ color: '#818cf8' }}>Hacked?</span>
        </h1>
        <p style={{ fontSize: '1.125rem', color: 'rgba(255,255,255,0.7)', maxWidth: '34rem', margin: '0 auto 2rem' }}>
          Run a free instant check for malware, Google blacklist warnings, spam injections, and security gaps. See your result in seconds.
        </p>

        <form onSubmit={handleScan} style={{ maxWidth: '34rem', margin: '0 auto' }}>
          <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
            <div style={{ position: 'relative', flex: '1 1 240px' }}>
              <Search size={18} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
              <input
                type="text" inputMode="url" autoComplete="url" value={url}
                onChange={(e) => setUrl(e.target.value)} placeholder="yourwebsite.com"
                style={{
                  width: '100%', background: '#fff', color: '#0f172a', border: 'none',
                  borderRadius: '12px', padding: '0.9rem 1rem 0.9rem 2.6rem', fontSize: '1rem',
                }}
              />
            </div>
            <button
              type="submit" disabled={scanning}
              style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                background: '#6366f1', color: '#fff', fontWeight: 700, border: 'none',
                borderRadius: '12px', padding: '0.9rem 1.6rem', fontSize: '1rem',
                cursor: scanning ? 'not-allowed' : 'pointer', opacity: scanning ? 0.7 : 1, whiteSpace: 'nowrap',
              }}
            >
              {scanning ? <Loader2 size={18} className="spin" /> : null}
              {scanning ? 'Scanning…' : 'Scan My Site'}
            </button>
          </div>
          {error && <p style={{ color: '#fca5a5', fontSize: '0.9rem', marginTop: '0.8rem' }}>{error}</p>}
          <p style={{ color: '#94a3b8', fontSize: '0.78rem', marginTop: '0.9rem' }}>
            Free · no signup to see your result · checks the public homepage only
          </p>
        </form>
      </div>

      {/* Results */}
      {result && (
        <div style={{ marginTop: '1rem', display: 'grid', gap: '1.2rem' }}>
          {/* Verdict */}
          <div style={panel({ overflow: 'hidden' })}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.3rem 1.4rem', background: tone.bg, borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ flexShrink: 0, width: 48, height: 48, borderRadius: 12, background: tone.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {result.verdict === 'clean' ? <ShieldCheck size={24} color="#0a0a0c" /> : <AlertTriangle size={24} color="#0a0a0c" />}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 700, fontSize: '1.1rem', color: tone.color }}>
                  {result.verdict === 'infected' ? 'Critical issues found' : result.verdict === 'clean' ? 'No critical issues found' : 'Some warnings found'}
                </div>
                <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {hostOf(result.finalUrl)} · {result.counts.critical} critical, {result.counts.warning} warnings
                </div>
              </div>
              <div style={{ textAlign: 'right', flexShrink: 0 }}>
                <div style={{ fontSize: '1.8rem', fontWeight: 800, lineHeight: 1, color: tone.color }}>{result.score}</div>
                <div style={{ fontSize: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'rgba(255,255,255,0.6)' }}>Health score</div>
              </div>
            </div>
            {/* Category tiles */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))' }}>
              {result.categories.map((c) => {
                const s = SEV[(c.status as SevKey) || 'unknown'] || SEV.unknown;
                return (
                  <div key={c.key} style={{ padding: '1rem 1.1rem', borderTop: '1px solid rgba(255,255,255,0.06)', borderRight: '1px solid rgba(255,255,255,0.06)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                      <span style={{ width: 8, height: 8, borderRadius: 999, background: s.color, display: 'inline-block' }} />
                      <span style={{ fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em', color: s.color }}>{s.label}</span>
                    </div>
                    <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{c.label}</div>
                    <div style={{ color: '#94a3b8', fontSize: '0.78rem', marginTop: 2 }}>{c.summary}</div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Email gate */}
          {showGate && (
            <div style={panel({ padding: '1.6rem' })}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <Lock size={18} color="#818cf8" />
                <h2 style={{ fontSize: '1.2rem', fontWeight: 700, margin: 0 }}>See the full report + fix steps</h2>
              </div>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', margin: '0.4rem 0 1.1rem' }}>
                We found {result.counts.critical} critical issue{result.counts.critical === 1 ? '' : 's'} and {result.counts.warning} warning{result.counts.warning === 1 ? '' : 's'}. Enter your email to see exactly what they are and how to fix each one.
              </p>
              <form onSubmit={handleLead} style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                <input type="email" required value={leadEmail} onChange={(e) => setLeadEmail(e.target.value)} placeholder="you@yourbusiness.co.uk" autoComplete="email"
                  style={{ flex: '1 1 200px', background: '#fff', color: '#0f172a', border: 'none', borderRadius: 10, padding: '0.7rem 0.9rem', fontSize: '0.9rem' }} />
                <input type="tel" value={leadPhone} onChange={(e) => setLeadPhone(e.target.value)} placeholder="Phone (optional)" autoComplete="tel"
                  style={{ flex: '1 1 140px', background: '#fff', color: '#0f172a', border: 'none', borderRadius: 10, padding: '0.7rem 0.9rem', fontSize: '0.9rem' }} />
                {/* honeypot */}
                <input type="text" tabIndex={-1} autoComplete="off" value={leadCompany} onChange={(e) => setLeadCompany(e.target.value)}
                  name="fax_number" aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }} />
                <button type="submit" disabled={leadSubmitting}
                  style={{ background: '#6366f1', color: '#fff', fontWeight: 700, border: 'none', borderRadius: 10, padding: '0.7rem 1.2rem', fontSize: '0.9rem', cursor: 'pointer', opacity: leadSubmitting ? 0.7 : 1, whiteSpace: 'nowrap' }}>
                  {leadSubmitting ? 'Unlocking…' : 'Unlock Report'}
                </button>
              </form>
              {leadError && <p style={{ color: '#fca5a5', fontSize: '0.85rem', marginTop: '0.7rem' }}>{leadError}</p>}
              <p style={{ color: '#64748b', fontSize: '0.72rem', marginTop: '0.7rem' }}>We email your report and may follow up to help. No spam.</p>
            </div>
          )}

          {/* Findings */}
          {showFindings && (
            <div style={{ display: 'grid', gap: '0.8rem' }}>
              {result.findings
                .filter((f) => (issues > 0 ? f.severity !== 'ok' : true))
                .map((f: Finding, i) => {
                  const s = SEV[f.severity];
                  return (
                    <div key={i} style={panel({ padding: '1.2rem', borderColor: s.border })}>
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.8rem' }}>
                        <span style={{ flexShrink: 0, marginTop: 2, fontSize: '0.62rem', fontWeight: 700, color: '#0a0a0c', background: s.color, padding: '2px 7px', borderRadius: 4, textTransform: 'uppercase' }}>{s.label}</span>
                        <div style={{ minWidth: 0 }}>
                          <h3 style={{ fontWeight: 700, fontSize: '0.95rem', margin: '0 0 4px' }}>{f.title}</h3>
                          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.88rem', lineHeight: 1.6, margin: '0 0 6px' }}>{f.detail}</p>
                          <p style={{ color: '#a5b4fc', fontSize: '0.88rem', lineHeight: 1.6, margin: 0 }}><strong>Fix:</strong> {f.recommendation}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          )}

          {/* Clean result: report-by-email capture (non-blocking — findings already shown) */}
          {result && issues === 0 && !unlocked && (
            <div style={panel({ padding: '1.6rem' })}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                <ShieldCheck size={18} color="#34d399" />
                <h2 style={{ fontSize: '1.2rem', fontWeight: 700, margin: 0 }}>Get this report by email — plus what a homepage scan can&apos;t see</h2>
              </div>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', margin: '0.4rem 0 1.1rem' }}>
                A clean homepage scan doesn&apos;t mean the server, plugins, or admin accounts are clean. We&apos;ll email your full report with the deeper checks worth running before an attacker does.
              </p>
              <form onSubmit={handleLead} style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap' }}>
                <input type="email" required value={leadEmail} onChange={(e) => setLeadEmail(e.target.value)} placeholder="you@yourbusiness.co.uk" autoComplete="email"
                  style={{ flex: '1 1 200px', background: '#fff', color: '#0f172a', border: 'none', borderRadius: 10, padding: '0.7rem 0.9rem', fontSize: '0.9rem' }} />
                <input type="tel" value={leadPhone} onChange={(e) => setLeadPhone(e.target.value)} placeholder="Phone (optional)" autoComplete="tel"
                  style={{ flex: '1 1 140px', background: '#fff', color: '#0f172a', border: 'none', borderRadius: 10, padding: '0.7rem 0.9rem', fontSize: '0.9rem' }} />
                {/* honeypot */}
                <input type="text" tabIndex={-1} autoComplete="off" value={leadCompany} onChange={(e) => setLeadCompany(e.target.value)}
                  name="fax_number" aria-hidden="true" style={{ position: 'absolute', left: '-9999px', width: 1, height: 1, opacity: 0 }} />
                <button type="submit" disabled={leadSubmitting}
                  style={{ background: '#6366f1', color: '#fff', fontWeight: 700, border: 'none', borderRadius: 10, padding: '0.7rem 1.2rem', fontSize: '0.9rem', cursor: 'pointer', opacity: leadSubmitting ? 0.7 : 1, whiteSpace: 'nowrap' }}>
                  {leadSubmitting ? 'Sending…' : 'Email My Report'}
                </button>
              </form>
              {leadError && <p style={{ color: '#fca5a5', fontSize: '0.85rem', marginTop: '0.7rem' }}>{leadError}</p>}
              <p style={{ color: '#64748b', fontSize: '0.72rem', marginTop: '0.7rem' }}>We email your report and may follow up to help. No spam.</p>
            </div>
          )}
          {result && issues === 0 && unlocked && (
            <div style={panel({ padding: '1.4rem', textAlign: 'center' })}>
              <p style={{ color: '#34d399', fontWeight: 700, margin: '0 0 0.3rem' }}>Report sent — check your inbox.</p>
              <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.88rem', margin: 0 }}>Reply to that email any time to talk to a human about hardening your site.</p>
            </div>
          )}

          {/* Clean result: prevention CTA */}
          {result && issues === 0 && (
            <div style={{ background: 'linear-gradient(135deg, #065f46, #064e3b)', borderRadius: 16, padding: '1.8rem', textAlign: 'center' }}>
              <h2 style={{ fontSize: '1.3rem', fontWeight: 700, margin: '0 0 0.5rem' }}>Clean today. Keep it that way.</h2>
              <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.9rem', maxWidth: '30rem', margin: '0 auto 1.3rem' }}>
                Most hacked sites were &quot;fine&quot; until a plugin vulnerability landed. Monthly protection covers updates, daily monitoring, and priority emergency response if anything gets through.
              </p>
              <div style={{ display: 'flex', gap: '0.7rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <a href="/wordpress-security-retainer" onClick={() => trackEvent('scanner_cta_click', { target: '/wordpress-security-retainer', infected: false })}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#22c55e', color: '#fff', fontWeight: 700, textDecoration: 'none', padding: '0.7rem 1.4rem', borderRadius: 12 }}>
                  View Protection Retainers
                </a>
                <a href="/wordpress-maintenance-uk" onClick={() => trackEvent('scanner_cta_click', { target: '/wordpress-maintenance-uk', infected: false })}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.12)', color: '#fff', fontWeight: 700, textDecoration: 'none', padding: '0.7rem 1.4rem', borderRadius: 12 }}>
                  Maintenance Plans <ArrowRight size={16} />
                </a>
              </div>
            </div>
          )}

          {/* Recovery CTA */}
          {showFindings && issues > 0 && (
            <div style={{ background: 'linear-gradient(135deg, #4338ca, #312e81)', borderRadius: 16, padding: '1.8rem', textAlign: 'center' }}>
              <h2 style={{ fontSize: '1.3rem', fontWeight: 700, margin: '0 0 0.5rem' }}>
                {infected ? 'We can clean this infection for you' : 'Want us to fix this for you?'}
              </h2>
              <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.9rem', maxWidth: '30rem', margin: '0 auto 1.3rem' }}>
                {infected
                  ? 'Complete malware removal and backdoor cleanup, plus a Google blacklist reconsideration if needed — fixed fee with a 30-day guarantee. Same-day emergency response available.'
                  : 'Expert WordPress security hardening and recovery — fixed fee with a 30-day guarantee. Same-day emergency response available.'}
              </p>
              <div style={{ display: 'flex', gap: '0.7rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <a href={WA} target="_blank" rel="noopener noreferrer" onClick={() => trackEvent('whatsapp_click', { source: 'scanner' })}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: '#22c55e', color: '#fff', fontWeight: 700, textDecoration: 'none', padding: '0.7rem 1.4rem', borderRadius: 12 }}>
                  WhatsApp Our Team
                </a>
                <a href={fixHref} onClick={() => trackEvent('scanner_cta_click', { target: fixHref, infected })}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 6, background: 'rgba(255,255,255,0.12)', color: '#fff', fontWeight: 700, textDecoration: 'none', padding: '0.7rem 1.4rem', borderRadius: 12 }}>
                  {fixLabel} <ArrowRight size={16} />
                </a>
              </div>
            </div>
          )}

          <p style={{ textAlign: 'center', fontSize: '0.74rem', color: '#64748b', maxWidth: '34rem', margin: '0.5rem auto 0' }}>
            This automated scan checks public, homepage-level signals only. A clean result does not guarantee a clean server; a flagged result is a strong indicator worth investigating with a full audit.
          </p>
        </div>
      )}

      <style>{`@keyframes spin{to{transform:rotate(360deg)}} .spin{animation:spin 0.8s linear infinite}`}</style>
    </div>
  );
}

function hostOf(u: string) {
  try { return new URL(u).host; } catch { return u; }
}
