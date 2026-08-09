// Credibility band: WebAdish LLP (India) and Business Together Limited (UK,
// trading as BTLITC) are SEPARATE legal entities, same owner. WebAdish has NO
// UK registration; the UK entity is Business Together Limited (company no.
// 9593738). Certifications below belong to BTLITC, not WebAdish — they are
// attributed as a partner's credentials, never claimed as WebAdish's own. Keep
// claims limited to what is verifiable on btlitc.co.uk (Cyber Essentials,
// CCS RM6237, JOSCAR, SME Gold Winner, "since 2015", 50+ clients). Do not
// upgrade "Cyber Essentials" to "Plus" or claim ISO 27001 certification.

const credentials = [
  'Cyber Essentials',
  'CCS RM6237',
  'JOSCAR Registered',
  'SME Gold Winner 2025',
  'ISO 27001 & NCSC-aligned',
];

const BackedByBTLITC = () => {
  return (
    <section className="section-padding" style={{ backgroundColor: 'var(--background)', paddingTop: '1.5rem', paddingBottom: '1.5rem' }}>
      <div className="container">
        <div
          style={{
            maxWidth: '960px',
            margin: '0 auto',
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderLeft: '3px solid #d4af37',
            borderRadius: '1rem',
            padding: '1.5rem 1.75rem',
            display: 'grid',
            gap: '1rem',
            gridTemplateColumns: '1fr',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
            <p style={{ color: '#d4af37', fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, margin: 0 }}>
              Backed by a certified UK cybersecurity firm
            </p>
            <div style={{ display: 'flex', gap: '1.25rem' }}>
              <span style={{ color: '#fff', fontWeight: 700 }}>10+ yrs <span style={{ color: '#a1a1aa', fontWeight: 400, fontSize: '0.85rem' }}>in business</span></span>
              <span style={{ color: '#fff', fontWeight: 700 }}>50+ <span style={{ color: '#a1a1aa', fontWeight: 400, fontSize: '0.85rem' }}>clients served</span></span>
            </div>
          </div>

          <p style={{ color: '#e4e4e7', lineHeight: 1.7, margin: 0 }}>
            WebAdish WordPress recovery is delivered in partnership with{' '}
            <a href="https://btlitc.co.uk/services/website-incident-response" target="_blank" rel="noopener noreferrer" style={{ color: '#d4af37', fontWeight: 700 }}>
              Business Together Limited
            </a>
            {' '}(BTLITC), a UK-registered IT &amp; cybersecurity company (no. 9593738)
            operating since 2015 with SIEM/SOC, penetration testing, and 24/7 incident
            response, containment, and recovery capability. Their certifications and
            security team stand behind the work.
          </p>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {credentials.map((c) => (
              <span
                key={c}
                style={{
                  color: '#d4d4d8',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  border: '1px solid rgba(212, 175, 55, 0.4)',
                  background: 'rgba(212, 175, 55, 0.07)',
                  borderRadius: '0.5rem',
                  padding: '0.35rem 0.7rem',
                }}
              >
                {c}
              </span>
            ))}
          </div>

          <a
            href="https://btlitc.co.uk/certifications"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#d4af37', fontSize: '0.9rem', fontWeight: 600 }}
          >
            Verify BTLITC&apos;s certifications →
          </a>
        </div>
      </div>
    </section>
  );
};

export default BackedByBTLITC;
