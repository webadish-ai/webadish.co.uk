import Link from 'next/link';

// Real client engagements. Summaries supplied by WebAdish and mirrored on the
// /case-studies page. Keep these factual — do not embellish into fabricated
// testimonials. The client domains are real and link out for verifiability.
const engagements = [
  {
    domain: 'verofax.com',
    href: 'https://verofax.com',
    label: 'Compromise recovery',
    summary:
      'Approached us after a compromise and stability concerns. We traced the root cause, removed the malicious foothold, and closed the access path so the site could return to normal operation without immediate reinfection.',
  },
  {
    domain: 'shivamautozone.com',
    href: 'https://shivamautozone.com',
    label: 'Recovery & hardening',
    summary:
      'Worked on recovery and trust restoration after a security issue disrupted normal business use. The engagement focused on cleanup, hardening, and making sure the environment was safe to keep running.',
  },
  {
    domain: 'crystalgroup.in',
    href: 'https://crystalgroup.in',
    label: 'Protection & hardening',
    summary:
      'Handled website protection and operational hardening for a real business environment where reliability and clean administration mattered more than a cosmetic one-time fix.',
  },
];

const RecoveryCaseStudies = () => {
  return (
    <section className="section-padding" style={{ backgroundColor: 'var(--surface)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 2.5rem' }}>
          <p style={{ color: '#4ade80', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.5rem', fontWeight: 700 }}>
            Real engagements, real businesses
          </p>
          <h2 style={{ marginBottom: '0.5rem' }}>Recovery work we have actually delivered</h2>
          <p style={{ color: '#a1a1aa' }}>
            Not theoretical checklists. These are live business sites — named and
            verifiable — where we traced the root cause, removed the foothold,
            and hardened the environment so the issue did not simply return.
          </p>
          <p style={{ color: '#a1a1aa', marginTop: '0.75rem' }}>
            For UK clients, engagements are delivered in partnership with{' '}
            <a href="https://btlitc.co.uk" target="_blank" rel="noopener noreferrer" style={{ color: '#d4af37', fontWeight: 600 }}>
              Business Together Limited
            </a>
            {' '}(BTLITC), a UK-registered cybersecurity company — the same incident
            team stands behind every recovery shown here.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', maxWidth: '1040px', margin: '0 auto' }}>
          {engagements.map((item) => (
            <div
              key={item.domain}
              style={{
                background: 'var(--background)',
                border: '1px solid var(--border)',
                borderRadius: '0.9rem',
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '0.75rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.75rem' }}>
                <a
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#fff', fontWeight: 700, fontSize: '1.05rem', textDecoration: 'none' }}
                >
                  {item.domain}
                </a>
                <span style={{ flexShrink: 0, color: '#ef4444', fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', border: '1px solid rgba(239, 68, 68, 0.35)', borderRadius: '0.5rem', padding: '0.2rem 0.55rem' }}>
                  {item.label}
                </span>
              </div>
              <p style={{ color: '#d4d4d8', lineHeight: 1.7, margin: 0, fontSize: '0.95rem' }}>
                {item.summary}
              </p>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <Link href="/case-studies" className="btn btn-secondary">
            See more recovery case studies
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RecoveryCaseStudies;
