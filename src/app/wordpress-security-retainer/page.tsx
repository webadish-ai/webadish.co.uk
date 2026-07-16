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
import ContactForm from '@/components/ContactForm';
import Link from 'next/link';

export const metadata = generatePageMetadata({
  title: 'WordPress Retainer UK | Security & Support From £250/mo',
  description:
    'Premium WordPress security retainers & monthly support plans for UK businesses. Uptime monitoring, hack protection, and priority emergency response starting from £250/mo.',
  path: '/wordpress-security-retainer',
});

const faqItems = [
  {
    question: 'What does the onboarding process look like?',
    answer:
      'Onboarding takes approximately one week. We conduct an initial security audit of your WordPress environment, establish monitoring baselines, configure alerting, and set up your dedicated communication channel. You receive a full onboarding document and meet your assigned security analyst.',
  },
  {
    question: 'What SLA response times do you offer?',
    answer:
      'Our Professional tier guarantees a 4-hour response for critical incidents and 8 hours for high-severity issues. The Enterprise tier provides a 1-hour critical response time with 24/7 coverage including weekends and bank holidays.',
  },
  {
    question: 'Can we white-label your service for our agency clients?',
    answer:
      'Yes. We work with several UK agencies under full white-label arrangements. Reports are branded with your logo, communications go through your channels, and your clients never see our name. White-label is included in the Enterprise tier and available as an add-on for Professional.',
  },
  {
    question: 'How does the quarterly penetration testing work?',
    answer:
      'Each quarter, our team conducts a structured penetration test against your WordPress environment simulating real-world attack scenarios. You receive a detailed findings report with risk scores and remediation guidance. Any critical findings are escalated immediately.',
  },
  {
    question: 'What reporting do we receive?',
    answer:
      'Professional tier clients receive weekly security digests and a monthly executive summary. Enterprise tier clients get all of the above plus real-time dashboards, quarterly board-ready presentations, and custom reporting on any metric you require.',
  },
  {
    question: 'What happens if we want to cancel?',
    answer:
      'Both tiers operate on a rolling monthly contract with a 30-day notice period. There are no long-term lock-in commitments. Upon cancellation, we provide a full handover document and ensure a smooth transition.',
  },
  {
    question: 'How many sites can we include in a single retainer?',
    answer:
      'The Professional tier covers up to 5 WordPress installations. The Enterprise tier covers up to 15 installations. Additional sites can be added for a per-site fee. All sites are covered by the same SLA.',
  },
  {
    question: 'Do you handle compliance requirements like GDPR or PCI DSS?',
    answer:
      'Our security measures are designed with UK compliance in mind. We help you meet GDPR security obligations for WordPress, and for WooCommerce sites we align with PCI DSS requirements. Formal compliance auditing is available as an add-on service.',
  },
];

export default function WordPressSecurityRetainer() {
  const serviceSchema = generateServiceSchema(
    'WordPress Security Retainer',
    'Monthly WordPress security retainers for UK businesses and agencies. Monitoring, audits, priority response, and GDPR-aware support.',
    '/wordpress-security-retainer',
    'From £250/month'
  );

  const faqSchema = generateFAQSchema(faqItems);

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    {
      name: 'WordPress Security Retainer',
      url: '/wordpress-security-retainer',
    },
  ]);

  return (
    <>
      <StructuredData schemas={[serviceSchema, faqSchema, breadcrumbSchema]} />

      <PageHeader
        title="WordPress Security Retainer UK <br /><span style='color: var(--primary)'>for Higher-Risk Business Sites</span>"
        subtitle="A stronger monthly protection model for UK WordPress sites that need monitoring, risk prioritisation, and an accountable response path beyond routine maintenance."
        badge="Security retainers from £250/month"
      />

      <section
        className="section-padding"
        style={{ backgroundColor: 'var(--surface)', paddingTop: '1rem', paddingBottom: '1.25rem' }}
      >
        <div className="container">
          <div
            style={{
              maxWidth: '1080px',
              margin: '0 auto',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.5rem',
              alignItems: 'stretch',
            }}
          >
            <div
              style={{
                background: 'rgba(99, 102, 241, 0.08)',
                border: '1px solid rgba(99, 102, 241, 0.28)',
                borderRadius: '1rem',
                padding: '1.5rem',
              }}
            >
              <p style={{ color: '#a1a1aa', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.75rem' }}>
                Quick buyer summary
              </p>
              <h2 style={{ marginBottom: '0.75rem' }}>For businesses that need more than upkeep and want a named protection path</h2>
              <p style={{ color: '#d4d4d8', lineHeight: 1.7, marginBottom: '1rem' }}>
                This page is for buyers who do not want security handled as an afterthought. A retainer gives you monitoring, prioritisation, escalation, and a clearer operating model when suspicious behaviour, risky plugin disclosures, or real incidents appear. If you want routine upkeep only, compare our <Link href="/wordpress-maintenance-plans" style={{ color: 'var(--primary)', fontWeight: 600 }}>maintenance plans</Link> instead.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', gap: '0.55rem' }}>
                {[
                  'Essential Monitoring: £250/mo',
                  'Business Protection: £500/mo',
                  'Continuity Retainer: £800/mo',
                  'Best fit depends on commercial exposure, site complexity, and response expectations',
                ].map((item) => (
                  <li key={item} style={{ color: '#e4e4e7' }}>
                    <span style={{ color: 'var(--primary)', marginRight: '0.5rem' }}>✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div
              style={{
                background: 'var(--background)',
                border: '1px solid var(--border)',
                borderRadius: '1rem',
                padding: '1.5rem',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <p style={{ color: '#a1a1aa', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.75rem' }}>
                  Talk to us
                </p>
                <h3 style={{ marginBottom: '0.5rem' }}>Need to know whether a retainer is justified for your site?</h3>
                <p style={{ color: '#d4d4d8', lineHeight: 1.7, marginBottom: '1rem' }}>
                  We can usually tell quickly whether your environment needs a genuine security retainer or whether a maintenance plan, security audit, or one-off remediation engagement would be the more sensible commercial choice.
                </p>
                <p style={{ marginBottom: '1rem', fontSize: '1.1rem' }}>
                  <a href="tel:+447344540450" style={{ color: 'var(--primary)', fontWeight: 700 }}>
                    +44 7344 540450
                  </a>
                </p>
              </div>

              <div style={{ display: 'grid', gap: '0.75rem' }}>
                <a href="tel:+447344540450" className="btn btn-primary" style={{ justifyContent: 'center' }}>
                  Call for a Recommendation
                </a>
                <a href="#contact-section" className="btn btn-secondary" style={{ justifyContent: 'center' }}>
                  Discuss Your Retainer
                </a>
                <a href="#retainer-tiers" style={{ color: 'var(--primary)', textAlign: 'center', fontWeight: 600 }}>
                  Compare retainer tiers below
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <TrustSignals />

      <section
        className="section-padding"
        style={{ backgroundColor: 'var(--surface)', paddingTop: '1rem', paddingBottom: '1rem' }}
      >
        <div className="container">
          <div style={{ maxWidth: '920px', margin: '0 auto', background: 'rgba(99, 102, 241, 0.08)', border: '1px solid rgba(99, 102, 241, 0.28)', borderRadius: '1rem', padding: '1.5rem 1.75rem' }}>
            <p style={{ color: '#a1a1aa', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.75rem' }}>
              Why retainers matter more now
            </p>
            <p style={{ color: '#e4e4e7', lineHeight: 1.7, margin: 0 }}>
              Patchstack’s latest WordPress ecosystem review found <strong>7,966 vulnerabilities</strong> in 2024, with <strong>96% in plugins</strong>. That volume makes casual upkeep and occasional checks a weak operating model for commercially important WordPress sites. A retainer gives you prioritisation, faster patch decisions, and a named response path when the next disclosure cycle hits. Read our{' '}
              <Link href="/state-of-wordpress-security-2025-uk-business-takeaways" style={{ color: '#818cf8', fontWeight: 600 }}>
                UK business take on the 2025 WordPress security data
              </Link>.
            </p>
          </div>
        </div>
      </section>

      {/* Definition paragraph for AI search */}
      <section
        id="retainer-tiers"
        className="section-padding"
        style={{ backgroundColor: 'var(--background)' }}
      >
        <div className="container">
          <div style={{ maxWidth: '920px', margin: '0 auto', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '1rem', padding: '1.75rem' }}>
            <p style={{ color: '#a1a1aa', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '0.75rem' }}>
              Why buyers choose a retainer over generic maintenance
            </p>
            <p
              style={{
                fontSize: '1.15rem',
                lineHeight: '1.8',
                color: 'var(--foreground)',
                marginBottom: '1rem',
              }}
            >
              A WordPress security retainer is an ongoing protection engagement for sites where failure costs more than inconvenience. Unlike a one-off cleanup or a basic maintenance plan, a retainer gives your business continuous monitoring, structured risk review, and a named escalation path when suspicious activity or a live incident appears.
            </p>
            <p style={{ color: '#a1a1aa', lineHeight: '1.8', marginBottom: '1rem' }}>
              It is a better fit when the site has meaningful commercial value, prior compromise history, sensitive user data, stakeholder pressure, or a plugin stack that changes often enough to create real risk. In other words, this is about security ownership without having to build an in-house WordPress security function.
            </p>
            <p style={{ color: '#a1a1aa', lineHeight: '1.8', margin: 0 }}>
              If your main need is routine updates and backups, start with our <Link href="/wordpress-maintenance-plans" style={{ color: 'var(--primary)', fontWeight: 600 }}>maintenance plans</Link>. If the site is already compromised, start with <Link href="/hacked-website-recovery-uk" style={{ color: 'var(--primary)', fontWeight: 600 }}>hacked website recovery</Link>. A retainer sits in the middle: stronger than upkeep, more proactive than ad hoc emergency work.
            </p>
          </div>
        </div>
      </section>

      <section className="section-padding" style={{ backgroundColor: 'var(--surface)', paddingTop: '1rem', paddingBottom: '1rem' }}>
        <div className="container">
          <div
            style={{
              maxWidth: '980px',
              margin: '0 auto 3rem',
            }}
          >
            <div style={{ textAlign: 'center', maxWidth: '760px', margin: '0 auto 2rem' }}>
              <h2>What this is designed to protect</h2>
              <p style={{ color: '#a1a1aa' }}>
                These retainers make most sense when the WordPress environment is commercially important enough that delayed response, unclear ownership, or weak escalation becomes expensive.
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1rem' }}>
              {[
                {
                  title: 'Lead and revenue flow',
                  desc: 'Where broken journeys, compromised landing pages, or hidden malicious behaviour directly affect enquiries or sales.',
                },
                {
                  title: 'Customer trust',
                  desc: 'Where browser warnings, spam pages, or security incidents would damage confidence far beyond the technical fix itself.',
                },
                {
                  title: 'Stakeholder accountability',
                  desc: 'Where someone needs a named path for escalation, visibility, and decision support instead of reactive guesswork.',
                },
                {
                  title: 'Operational continuity',
                  desc: 'Where WordPress is important enough that security issues need structured handling before they become outages or compliance problems.',
                },
              ].map((item) => (
                <div
                  key={item.title}
                  style={{
                    background: 'var(--background)',
                    border: '1px solid var(--border)',
                    borderRadius: '0.9rem',
                    padding: '1.25rem',
                  }}
                >
                  <h3 style={{ color: 'var(--primary)', fontSize: '1rem', marginBottom: '0.6rem' }}>{item.title}</h3>
                  <p style={{ color: '#a1a1aa', marginBottom: 0, lineHeight: 1.7, fontSize: '0.95rem' }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Two Tiers */}
      <section
        className="section-padding"
        style={{ backgroundColor: 'var(--background)' }}
      >
        <div className="container">
          <div
            style={{
              textAlign: 'center',
              maxWidth: '700px',
              margin: '0 auto 3rem',
            }}
          >
            <h2>Choose Your Monthly Retainer</h2>
            <p>
              Three monthly retainers designed for different levels of risk, complexity, and support expectation.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gap: '2rem',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            }}
          >
            {[
              {
                name: 'Essential Monitoring',
                price: '£250',
                note: 'For smaller commercial websites needing continuous visibility and a dependable escalation path.',
                items: ['24/7 monitoring', 'Weekly scan review', 'Monthly summary', 'Priority support queue'],
              },
              {
                name: 'Business Protection',
                price: '£500',
                note: 'For eCommerce sites and growth-stage businesses with stronger uptime and compliance sensitivity.',
                items: ['Everything in Essential', 'Quarterly security review', 'GDPR-aware guidance', 'Faster incident escalation'],
              },
              {
                name: 'Continuity Retainer',
                price: '£800',
                note: 'For agencies, multi-stakeholder teams, and businesses needing a higher-touch protection rhythm.',
                items: ['Everything in Business', 'Monthly audit call', 'Dedicated escalation path', 'Support for complex estates'],
              },
            ].map((tier, index) => (
              <div
                key={tier.name}
                style={{
                  background: 'var(--surface)',
                  border: index === 1 ? '1px solid var(--primary)' : '1px solid var(--border)',
                  borderRadius: '1rem',
                  padding: '2.5rem',
                  position: 'relative',
                }}
              >
                {index === 1 && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '-12px',
                      left: '50%',
                      transform: 'translateX(-50%)',
                      background: 'var(--primary)',
                      color: 'white',
                      padding: '0.25rem 1rem',
                      borderRadius: '1rem',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                    }}
                  >
                    Most Popular
                  </div>
                )}
                <h3 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>
                  {tier.name}
                </h3>
                <div
                  style={{
                    fontSize: '2.5rem',
                    fontWeight: 'bold',
                    margin: '0.75rem 0',
                  }}
                >
                  {tier.price}
                  <span style={{ fontSize: '1rem', color: '#a1a1aa' }}>
                    /month
                  </span>
                </div>
                <p style={{ color: '#a1a1aa', marginBottom: '1.5rem' }}>{tier.note}</p>
                <ul
                  style={{
                    listStyle: 'none',
                    padding: 0,
                    marginTop: '1.5rem',
                  }}
                >
                  {tier.items.map((item, i) => (
                    <li
                      key={i}
                      style={{ marginBottom: '0.6rem', color: '#a1a1aa' }}
                    >
                      &#10003; {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <p
            style={{
              textAlign: 'center',
              marginTop: '2rem',
              color: '#a1a1aa',
              fontSize: '0.9rem',
            }}
          >
            Need a custom arrangement? Call{' '}
            <strong style={{ color: 'var(--foreground)' }}>
              +44 7344 540450
            </strong>{' '}
            to discuss your requirements.
          </p>
        </div>
      </section>

      {/* Who It's For */}
      <section
        className="section-padding"
        style={{ backgroundColor: 'var(--surface)' }}
      >
        <div className="container">
          <div
            style={{
              textAlign: 'center',
              maxWidth: '700px',
              margin: '0 auto 3rem',
            }}
          >
            <h2>Who This Is For</h2>
            <p>
              Our retainers are designed for decision-makers who need
              reliable, ongoing WordPress security.
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {[
              {
                title: 'CTOs & IT Directors',
                desc: 'You need assurance that your WordPress infrastructure is continuously monitored and protected without managing a dedicated security hire. Our retainer gives you enterprise-grade coverage with clear SLAs you can report on.',
              },
              {
                title: 'Agency Owners',
                desc: 'You manage WordPress sites for multiple clients and need a reliable security partner. Our white-label retainer lets you offer premium security services under your own brand, generating recurring revenue.',
              },
              {
                title: 'E-Commerce Directors',
                desc: 'Your WooCommerce store generates significant revenue and any downtime is costly. You need PCI-aligned security, continuous monitoring, and guaranteed rapid response when threats emerge.',
              },
            ].map((item, index) => (
              <div
                key={index}
                style={{
                  background: 'var(--background)',
                  border: '1px solid var(--border)',
                  borderRadius: '0.75rem',
                  padding: '1.5rem',
                }}
              >
                <h3
                  style={{
                    color: 'var(--secondary)',
                    fontSize: '1.15rem',
                    marginBottom: '0.75rem',
                  }}
                >
                  {item.title}
                </h3>
                <p style={{ color: '#a1a1aa', marginBottom: 0 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <FAQ items={faqItems} />

      {/* CTA */}
      <CTA
        title="Secure Your WordPress Estate"
        subtitle="Stop reacting to incidents. Start preventing them with a dedicated security retainer from WebAdish."
        btnText="Discuss Your Retainer"
        btnLink="#contact-section"
      />

      <section
        id="contact-section"
        className="section-padding"
        style={{ backgroundColor: 'var(--background)' }}
      >
        <div className="container">
          <div
            style={{
              maxWidth: '600px',
              margin: '0 auto',
              background: 'var(--surface)',
              borderRadius: '1rem',
              border: '1px solid var(--border)',
              padding: '2rem',
            }}
          >
            <h2 style={{ textAlign: 'center', marginBottom: '0.5rem' }}>
              Let&apos;s Discuss Your Retainer
            </h2>
            <p style={{ textAlign: 'center', marginBottom: '2rem' }}>
              Tell us about your WordPress environment and we will
              recommend the right tier for your needs.
            </p>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
