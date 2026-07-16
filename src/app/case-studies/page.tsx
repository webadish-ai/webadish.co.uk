import { generatePageMetadata } from '@/lib/seo';
import StructuredData from '@/components/StructuredData';
import {
  generateServiceSchema,
  generateFAQSchema,
  generateBreadcrumbSchema,
} from '@/lib/schema';
import PageHeader from '@/components/PageHeader';
import TrustSignals from '@/components/TrustSignals';
import FAQ from '@/components/FAQ';
import CTA from '@/components/CTA';
import Link from 'next/link';

export const metadata = generatePageMetadata({
  title: 'WordPress Security Case Studies UK | Verofax, Shivam Autozone, Crystal Group',
  description:
    'Real WebAdish case studies including Verofax, Shivam Autozone, and Crystal Group, covering incident response, security hardening, recovery, and ongoing WordPress protection.',
  path: '/case-studies',
});

const faqItems = [
  {
    question: 'Is this based on a real engagement?',
    answer:
      'Yes. This case study is based on a real incident response engagement. Client-identifying details are anonymised, but the technical challenge, business impact, and recovery process reflect the actual work performed.',
  },
  {
    question: 'Why did previous cleanup attempts fail?',
    answer:
      'Because only visible malware was removed. The hidden persistence mechanisms and root cause remained in place, which allowed reinfection within days.',
  },
  {
    question: 'What happened after recovery?',
    answer:
      'The client moved into ongoing security protection with continuous monitoring, regular audits, and priority incident response to reduce future risk.',
  },
];

export default function CaseStudies() {
  const serviceSchema = generateServiceSchema(
    'WordPress Incident Response Case Study',
    'Case study showing how WebAdish recovered a compromised eCommerce website, removed hidden access, and prevented reinfection through proper incident response.',
    '/case-studies'
  );

  const faqSchema = generateFAQSchema(faqItems);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Case Studies', url: '/case-studies' },
  ]);

  return (
    <>
      <StructuredData schemas={[serviceSchema, faqSchema, breadcrumbSchema]} />

      <PageHeader
        title="Recovered a Compromised eCommerce Website <br /><span style='color: var(--primary)'>and Prevented Reinfection</span>"
        subtitle="A real-world example of what proper WordPress incident response looks like when revenue, rankings, and customer trust are at risk."
        badge="Incident Response Case Study"
      />

      <TrustSignals />

      <section className="section-padding" style={{ backgroundColor: 'var(--background)' }}>
        <div className="container">
          <div style={{ maxWidth: '980px', margin: '0 auto' }}>
            <div style={{ marginBottom: '1rem', color: '#a1a1aa', lineHeight: 1.8 }}>
              Trusted client work includes <strong style={{ color: 'var(--foreground)' }}>verofax.com</strong>, <strong style={{ color: 'var(--foreground)' }}>shivamautozone.com</strong>, and <strong style={{ color: 'var(--foreground)' }}>crystalgroup.in</strong>. Some UK-facing case-study details are anonymised where required, but these are real engagements involving incident cleanup, hardening, recovery, and ongoing protection work.
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                gap: '1rem',
                marginBottom: '2rem',
              }}
            >
              {[
                {
                  title: 'verofax.com',
                  text: 'Approached us after a compromise and stability concerns. We traced the root cause, removed the malicious foothold, and closed the access path so the site could return to normal operation without immediate reinfection.',
                },
                {
                  title: 'shivamautozone.com',
                  text: 'Worked on recovery and trust restoration after a security issue disrupted normal business use. The engagement focused on cleanup, hardening, and making sure the environment was safe to keep running.',
                },
                {
                  title: 'crystalgroup.in',
                  text: 'Handled website protection and operational hardening work for a real business environment where reliability and clean administration mattered more than a cosmetic one-time fix.',
                },
              ].map((item) => (
                <div
                  key={item.title}
                  style={{
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                    borderRadius: '12px',
                    padding: '1.25rem',
                  }}
                >
                  <h3 style={{ marginTop: 0, marginBottom: '0.65rem', fontSize: '1rem', color: 'var(--foreground)' }}>
                    {item.title}
                  </h3>
                  <p style={{ margin: 0, color: '#d4d4d8', lineHeight: 1.7, fontSize: '0.95rem' }}>{item.text}</p>
                </div>
              ))}
            </div>
            <h2 style={{ marginBottom: '1.5rem' }}>Snapshot</h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '1rem',
              }}
            >
              {[
                ['Client Type', 'eCommerce Website'],
                ['Issue', 'Malware infection, SEO drop, admin compromise'],
                ['Impact', 'Revenue disruption, search engine warning'],
                ['Resolution Time', '48 hours'],
                ['Engagement Level', 'Incident Response Program (£5K+)'],
              ].map(([label, value]) => (
                <div
                  key={label}
                  style={{
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                    borderRadius: '12px',
                    padding: '1.25rem',
                  }}
                >
                  <div style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--primary)', marginBottom: '0.5rem', fontWeight: 700 }}>
                    {label}
                  </div>
                  <div style={{ color: '#f4f4f5', lineHeight: 1.5 }}>{value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding" style={{ backgroundColor: 'var(--surface)' }}>
        <div className="container">
          <div style={{ maxWidth: '820px', margin: '0 auto' }}>
            <h2>The problem</h2>
            <p style={{ color: '#a1a1aa', lineHeight: 1.8 }}>
              The client approached us after noticing their website was redirecting users to external spam pages.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '0.75rem', margin: '1.5rem 0' }}>
              {[
                'Google had started flagging the site',
                'Organic traffic dropped significantly',
                'Admin access was partially compromised',
                'Previous attempts using plugins failed',
              ].map((item) => (
                <li key={item} style={{ color: '#d4d4d8', borderLeft: '3px solid var(--primary)', paddingLeft: '1rem' }}>
                  {item}
                </li>
              ))}
            </ul>
            <p style={{ color: 'var(--foreground)', fontWeight: 700, margin: 0 }}>
              Critical issue: The infection was not limited to visible malware — multiple hidden backdoors existed.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding" style={{ backgroundColor: 'var(--background)' }}>
        <div className="container">
          <div style={{ maxWidth: '820px', margin: '0 auto' }}>
            <h2>What others missed</h2>
            <p style={{ color: '#a1a1aa', lineHeight: 1.8 }}>
              The client had already attempted cleanup using standard tools and low-cost services.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '0.75rem', margin: '1.5rem 0' }}>
              {[
                'Only surface-level malware was removed',
                'Hidden access points remained',
                'Reinfection occurred within days',
              ].map((item) => (
                <li key={item} style={{ color: '#d4d4d8', borderLeft: '3px solid #ef4444', paddingLeft: '1rem' }}>
                  {item}
                </li>
              ))}
            </ul>
            <p style={{ color: 'var(--foreground)', fontWeight: 700, margin: 0 }}>
              This is a common failure pattern with incomplete recovery approaches.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding" style={{ backgroundColor: 'var(--surface)' }}>
        <div className="container">
          <div style={{ maxWidth: '980px', margin: '0 auto' }}>
            <h2>Our approach</h2>
            <p style={{ color: '#a1a1aa', lineHeight: 1.8, marginBottom: '1.75rem' }}>
              We handled this as a full security incident, not a basic cleanup.
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1rem' }}>
              {[
                {
                  step: 'Step 1 — Containment',
                  points: ['Blocked malicious access', 'Isolated compromised components'],
                },
                {
                  step: 'Step 2 — Forensic Analysis',
                  points: ['Identified entry point', 'Traced persistence mechanisms'],
                },
                {
                  step: 'Step 3 — Complete Cleanup',
                  points: ['Removed all malware and backdoors', 'Verified file and database integrity'],
                },
                {
                  step: 'Step 4 — Hardening',
                  points: ['Secured admin access', 'Patched vulnerabilities', 'Improved server-level security'],
                },
                {
                  step: 'Step 5 — Monitoring',
                  points: ['Implemented tracking and alerts', 'Ensured no reinfection'],
                },
              ].map((item) => (
                <div
                  key={item.step}
                  style={{
                    background: 'var(--background)',
                    border: '1px solid var(--border)',
                    borderRadius: '12px',
                    padding: '1.25rem',
                  }}
                >
                  <h3 style={{ marginTop: 0, marginBottom: '0.9rem', fontSize: '1.05rem' }}>{item.step}</h3>
                  <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '0.6rem' }}>
                    {item.points.map((point) => (
                      <li key={point} style={{ color: '#d4d4d8' }}>
                        &#10003; {point}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding" style={{ backgroundColor: 'var(--background)' }}>
        <div className="container">
          <div style={{ maxWidth: '820px', margin: '0 auto' }}>
            <h2>Results</h2>
            <p style={{ color: '#a1a1aa', lineHeight: 1.8, marginBottom: '1rem' }}>Within 48 hours:</p>
            <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '0.75rem', marginBottom: '1.5rem' }}>
              {[
                'Website fully restored',
                'No malicious activity detected',
                'Google warnings removed',
                'Traffic began recovering',
              ].map((item) => (
                <li key={item} style={{ color: '#d4d4d8', borderLeft: '3px solid var(--primary)', paddingLeft: '1rem' }}>
                  {item}
                </li>
              ))}
            </ul>
            <p style={{ color: '#a1a1aa', lineHeight: 1.8, marginBottom: '1rem' }}>After 30 days:</p>
            <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '0.75rem' }}>
              {[
                'No reinfection',
                'Improved performance',
                'Stable rankings',
              ].map((item) => (
                <li key={item} style={{ color: '#d4d4d8', borderLeft: '3px solid var(--primary)', paddingLeft: '1rem' }}>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section-padding" style={{ backgroundColor: 'var(--surface)' }}>
        <div className="container">
          <div style={{ maxWidth: '820px', margin: '0 auto' }}>
            <h2>Business impact</h2>
            <p style={{ color: '#a1a1aa', lineHeight: 1.8, marginBottom: '1rem' }}>The client avoided:</p>
            <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '0.75rem', marginBottom: '1.5rem' }}>
              {[
                'Continued revenue loss',
                'Long-term SEO damage',
                'Repeated recovery costs',
              ].map((item) => (
                <li key={item} style={{ color: '#d4d4d8', borderLeft: '3px solid #ef4444', paddingLeft: '1rem' }}>
                  {item}
                </li>
              ))}
            </ul>
            <p style={{ color: 'var(--foreground)', fontWeight: 700, margin: 0 }}>
              A proper recovery prevented significantly higher losses.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding" style={{ backgroundColor: 'var(--background)' }}>
        <div className="container">
          <div style={{ maxWidth: '820px', margin: '0 auto' }}>
            <h2>What happened next</h2>
            <p style={{ color: '#a1a1aa', lineHeight: 1.8, marginBottom: '1rem' }}>
              After recovery, the client opted for ongoing security protection.
            </p>
            <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '0.75rem', marginBottom: '1.5rem' }}>
              {[
                'Continuous monitoring',
                'Regular audits',
                'Priority incident response',
              ].map((item) => (
                <li key={item} style={{ color: '#d4d4d8', borderLeft: '3px solid var(--primary)', paddingLeft: '1rem' }}>
                  {item}
                </li>
              ))}
            </ul>
            <p style={{ color: 'var(--foreground)', fontWeight: 700, margin: 0 }}>
              This ensures long-term stability.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding" style={{ backgroundColor: 'var(--surface)' }}>
        <div className="container">
          <div style={{ maxWidth: '820px', margin: '0 auto' }}>
            <h2>Key takeaway</h2>
            <p style={{ color: '#a1a1aa', lineHeight: 1.8 }}>
              Most hacked websites are not properly secured after cleanup.
            </p>
            <p style={{ color: 'var(--foreground)', fontWeight: 700, margin: 0 }}>
              Without root-cause resolution, reinfection is highly likely.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding" style={{ backgroundColor: 'var(--background)' }}>
        <div className="container">
          <div style={{ maxWidth: '980px', margin: '0 auto' }}>
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <h2>Additional engagements</h2>
              <p style={{ color: '#a1a1aa', maxWidth: '720px', margin: '1rem auto 0' }}>
                Alongside incident recovery, we also support retained security and hardening work for other high-value WordPress environments.
              </p>
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '1.5rem',
              }}
            >
              {[
                {
                  sector: 'Insurance & Finance',
                  title: 'UK Insurance Portal Migration',
                  challenge:
                    'An insurance portal was running on an outdated WordPress environment with multiple known vulnerabilities while handling sensitive customer data.',
                  solution:
                    'We performed a full security audit, migrated the site onto a hardened stack, and introduced ongoing monitoring and access controls.',
                  results: [
                    '40% faster incident response',
                    'Zero downtime since migration',
                    'GDPR audit compliance improved',
                  ],
                },
                {
                  sector: 'Creative Agency',
                  title: 'London Creative Agency AI Portal',
                  challenge:
                    'A fast-growing AI membership platform exposed security gaps that could have affected proprietary assets and client data.',
                  solution:
                    'We introduced custom WAF rules, deployment security reviews, and a higher-assurance recovery guarantee within a retained arrangement.',
                  results: [
                    '4-hour recovery guarantee',
                    'Automated security scorecards',
                    'Reduced deployment risk',
                  ],
                },
                {
                  sector: 'eCommerce Retail',
                  title: 'WooCommerce Retail Security Overhaul',
                  challenge:
                    'A high-volume retailer needed stronger protection around checkout, customer data, and uptime during active trading periods.',
                  solution:
                    'We hardened the WooCommerce environment, improved monitoring, and layered protections around payment and admin access.',
                  results: [
                    '99.99% uptime target support',
                    'No major security incidents during retained period',
                    'Stronger operational resilience',
                  ],
                },
              ].map((study) => (
                <article
                  key={study.title}
                  style={{
                    background: 'var(--surface)',
                    border: '1px solid var(--border)',
                    borderRadius: '14px',
                    padding: '1.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '1rem',
                  }}
                >
                  <div
                    style={{
                      display: 'inline-block',
                      alignSelf: 'flex-start',
                      background: 'rgba(var(--primary-rgb), 0.12)',
                      color: 'var(--primary)',
                      padding: '0.3rem 0.75rem',
                      borderRadius: '999px',
                      fontSize: '0.78rem',
                      fontWeight: 700,
                    }}
                  >
                    {study.sector}
                  </div>
                  <h3 style={{ margin: 0 }}>{study.title}</h3>
                  <div>
                    <div style={{ color: '#f4f4f5', fontWeight: 700, marginBottom: '0.35rem' }}>Challenge</div>
                    <p style={{ color: '#a1a1aa', margin: 0, lineHeight: 1.7 }}>{study.challenge}</p>
                  </div>
                  <div>
                    <div style={{ color: '#f4f4f5', fontWeight: 700, marginBottom: '0.35rem' }}>Solution</div>
                    <p style={{ color: '#a1a1aa', margin: 0, lineHeight: 1.7 }}>{study.solution}</p>
                  </div>
                  <div>
                    <div style={{ color: '#f4f4f5', fontWeight: 700, marginBottom: '0.5rem' }}>Results</div>
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '0.5rem' }}>
                      {study.results.map((result) => (
                        <li key={result} style={{ color: '#d4d4d8' }}>
                          &#10003; {result}
                        </li>
                      ))}
                    </ul>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <FAQ items={faqItems} />

      <section className="section-padding" style={{ backgroundColor: 'var(--surface)', paddingTop: 0 }}>
        <div className="container">
          <div style={{ maxWidth: '900px', margin: '0 auto' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Continue to the Right Next Step</h2>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                gap: '1rem',
              }}
            >
              {[
                { href: '/pricing', label: 'View Pricing', desc: 'See incident response and monthly retainer ranges.' },
                { href: '/wordpress-security-audit', label: 'Security Audit', desc: 'Best next step for non-urgent prospects.' },
                { href: '/contact', label: 'Request Assessment', desc: 'Talk to the team about a similar issue.' },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  style={{
                    background: 'var(--background)',
                    border: '1px solid var(--border)',
                    borderRadius: '12px',
                    padding: '1.25rem',
                    textDecoration: 'none',
                  }}
                >
                  <div style={{ color: 'var(--foreground)', fontWeight: 700, marginBottom: '0.35rem' }}>{item.label}</div>
                  <p style={{ color: '#a1a1aa', margin: 0, lineHeight: 1.6, fontSize: '0.92rem' }}>{item.desc}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTA
        title="Facing a similar issue?"
        subtitle="Request Emergency Assessment. Triage begins within 30 minutes during active coverage hours."
        btnText="Request Emergency Assessment"
        btnLink="/contact"
      />

      <section className="section-padding" style={{ backgroundColor: 'var(--background)', paddingTop: 0 }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <Link href="/pricing" style={{ color: 'var(--primary)', marginRight: '1.5rem' }}>
            View Pricing
          </Link>
          <Link href="/" style={{ color: 'var(--primary)' }}>
            Return to Homepage
          </Link>
        </div>
      </section>
    </>
  );
}
