import { ShieldAlert, Clock, CheckCircle, Phone } from 'lucide-react';
import LandingContactForm from '@/components/LandingContactForm';
import { generatePageMetadata } from '@/lib/seo';

export const metadata = generatePageMetadata({
  title: 'WordPress Site Hacked? Emergency Fix | WebAdish',
  description: 'WordPress site hacked? We fix it in hours, not days. Emergency malware removal, backdoor cleanup, and site hardening. Fixed fee from £299 for small sites, with a 30-day re-clean guarantee.',
  path: '/lp/hacked-site-fix',
  noIndex: true,
});

export default function HackedSiteLP() {
  const steps = [
    {
      number: '1',
      title: 'Contact Us',
      description: 'Call or submit the form. Triage begins within 30 minutes during active coverage hours.',
    },
    {
      number: '2',
      title: 'We Diagnose',
      description: 'Our team scans your site, identifies the infection, and quarantines the threat.',
    },
    {
      number: '3',
      title: 'Site Restored',
      description: 'We remove all malware, patch vulnerabilities, and harden your site against future attacks.',
    },
  ];

  return (
    <>
      {/* Emergency Hero */}
      <section style={{
        padding: '4rem 0 3rem',
        textAlign: 'center',
        background: 'linear-gradient(180deg, rgba(239,68,68,0.08) 0%, transparent 100%)',
      }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'rgba(239,68,68,0.15)',
            border: '1px solid rgba(239,68,68,0.4)',
            borderRadius: '20px',
            padding: '0.5rem 1.25rem',
            fontSize: '0.9rem',
            color: '#ef4444',
            fontWeight: 600,
            marginBottom: '1.5rem',
            animation: 'pulse 2s infinite',
          }}>
            <ShieldAlert size={16} />
            EMERGENCY WORDPRESS RECOVERY
          </div>
          <h1 style={{
            fontSize: 'clamp(2rem, 5vw, 3.25rem)',
            fontWeight: 800,
            color: 'var(--foreground)',
            lineHeight: 1.15,
            marginBottom: '1.25rem',
          }}>
            WordPress Site Hacked?<br />
            <span style={{ color: '#ef4444' }}>We Fix It in Hours.</span>
          </h1>
          <p style={{
            fontSize: '1.15rem',
            color: '#a1a1aa',
            lineHeight: 1.7,
            maxWidth: '600px',
            margin: '0 auto 2rem',
          }}>
            Don&apos;t panic. Our expert WordPress security team will remove the malware, clean your site, and make sure it doesn&apos;t happen again.
          </p>

          {/* Emergency contact */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '1.5rem',
            flexWrap: 'wrap',
          }}>
            <a
              href="tel:+447344540450"
              className="btn btn-emergency"
              style={{
                fontSize: '1.25rem',
                padding: '1.25rem 2.5rem',
                background: '#ef4444',
                color: 'white',
                boxShadow: '0 10px 25px rgba(239,68,68,0.4)',
                width: '100%',
                maxWidth: '400px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Phone size={24} style={{ marginRight: '12px' }} />
              Call Specialist Now
            </a>
            <div style={{ display: 'flex', gap: '1rem', width: '100%', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a
                href="https://wa.me/447344540450"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
                style={{ fontSize: '1rem', padding: '0.75rem 1.5rem', borderColor: '#22c55e', color: '#16a34a' }}
              >
                WhatsApp Triage
              </a>
              <a href="#contact-form" className="btn btn-primary" style={{ fontSize: '1rem', padding: '0.75rem 1.5rem' }}>
                Submit Form
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 3-Step Process */}
      <section style={{ padding: '3rem 0' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', color: 'var(--foreground)', marginBottom: '2.5rem', fontSize: '1.75rem' }}>
            Our 3-Step Recovery Process
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '1.5rem',
          }}>
            {steps.map((step) => (
              <div key={step.number} style={{
                background: 'var(--surface)',
                border: '1px solid var(--border)',
                borderRadius: '12px',
                padding: '2rem',
                textAlign: 'center',
                position: 'relative',
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  background: 'var(--primary)',
                  color: 'white',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontWeight: 700,
                  fontSize: '1.25rem',
                  margin: '0 auto 1rem',
                }}>
                  {step.number}
                </div>
                <h3 style={{ color: 'var(--foreground)', marginBottom: '0.5rem' }}>{step.title}</h3>
                <p style={{ color: '#a1a1aa', fontSize: '0.95rem', lineHeight: 1.6 }}>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guarantees + Form */}
      <section id="contact-form" style={{ padding: '3rem 0 5rem' }}>
        <div className="container">
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '3rem',
            alignItems: 'start',
          }}>
            {/* Left: guarantees */}
            <div>
              <h2 style={{ color: 'var(--foreground)', fontSize: '1.75rem', marginBottom: '1.5rem' }}>
                Our Guarantee
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                {[
                  { icon: <Clock size={20} />, text: '4-24 hour recovery depending on severity' },
                  { icon: <CheckCircle size={20} />, text: 'Complete malware and backdoor removal' },
                  { icon: <ShieldAlert size={20} />, text: 'Security hardening to prevent reinfection' },
                  { icon: <CheckCircle size={20} />, text: '30-day monitoring after cleanup' },
                  { icon: <CheckCircle size={20} />, text: 'Google blacklist removal assistance' },
                ].map((item, i) => (
                  <div key={i} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    color: 'var(--foreground)',
                  }}>
                    <span style={{ color: 'var(--primary)', flexShrink: 0 }}>{item.icon}</span>
                    {item.text}
                  </div>
                ))}
              </div>

              <div style={{
                marginTop: '2rem',
                padding: '1.25rem',
                background: 'rgba(239,68,68,0.08)',
                border: '1px solid rgba(239,68,68,0.2)',
                borderRadius: '12px',
              }}>
                <p style={{ color: 'var(--foreground)', fontWeight: 600, marginBottom: '0.25rem' }}>
                  From £299 small sites · £1,499 business sites · 30-Day Guarantee
                </p>
                <p style={{ color: '#a1a1aa', fontSize: '0.9rem' }}>
                  Fixed fee, no hourly billing. If malware returns within 30 days, we clean it again at no extra cost.
                </p>
              </div>
            </div>

            {/* Right: form */}
            <LandingContactForm
              formTitle="Get Emergency Help Now"
              buttonText="Request Emergency Recovery"
            />
          </div>
        </div>
      </section>
    </>
  );
}
