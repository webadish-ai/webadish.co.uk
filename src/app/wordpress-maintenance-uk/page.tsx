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
  title: 'WordPress Maintenance Service UK | Security, Updates & Support from £149/mo',
  description:
    'Reliable WordPress maintenance service for UK businesses. Proactive security updates, daily off-site backups, 24/7 uptime monitoring, and expert UK support. Plans from £149/month.',
  path: '/wordpress-maintenance-uk',
});

const faqItems = [
  {
    question: 'What does your WordPress maintenance service include?',
    answer:
      'Our WordPress maintenance service covers the technical tasks required to keep your site secure, fast, and available. This includes applying WordPress core, plugin, and theme updates; running daily off-site backups; monitoring uptime 24/7; scanning for malware; optimising database performance; and providing a monthly health report. We offer three tiers of care: Essentials, Pro, and Enterprise.',
  },
  {
    question: 'How much does WordPress maintenance cost in the UK?',
    answer:
      'WordPress maintenance service pricing in the UK typically ranges from £50/month for basic updates to £750+/month for fully managed security retainers. WebAdish plans start at £149/month for the Essentials plan, £349/month for the Pro plan, and from £749/month for the Enterprise tier.',
  },
  {
    question: 'Why do I need a professional WordPress maintenance service?',
    answer:
      'Without regular maintenance, WordPress sites become vulnerable to security threats, performance degradation, and data loss. 96% of hacked sites are running outdated software. A professional service ensures your site is updated safely (tested on staging where needed), backed up reliably, and monitored 24/7, reducing the risk of expensive downtime or recovery costs.',
  },
  {
    question: "What's the difference between a maintenance plan and a security retainer?",
    answer:
      'A maintenance plan handles routine upkeep — updates, backups, monitoring — and is suitable for most business websites. A security retainer is a higher-tier engagement designed for businesses with elevated risk: it includes proactive penetration testing, real-time threat monitoring, incident response with SLA guarantees, and a dedicated security analyst. If your site processes payments or stores sensitive personal data, a retainer offers significantly stronger protection.',
  },
  {
    question: 'Do you offer white-label plans for UK agencies?',
    answer:
      'Yes. We work with several UK digital agencies under white-label arrangements. All reports are branded with your agency logo, and client communications go through your channels. White-label is available on our Pro and Enterprise plans.',
  },
  {
    question: 'How often do you apply WordPress updates?',
    answer:
      'Update frequency depends on your plan. Essentials plans receive monthly updates, Pro plans receive weekly updates (with staging tests for risky plugins), and Enterprise plans receive high-frequency or daily updates. Critical security patches are applied immediately across all tiers.',
  },
  {
    question: 'What happens if my site gets hacked while on a maintenance plan?',
    answer:
      'If your site is compromised while under an active maintenance plan, we begin the recovery process immediately. Our Pro and Enterprise plans include a hack recovery guarantee, meaning we clean and restore your site at no additional charge. For Essentials clients, we provide a priority path to recovery.',
  },
  {
    question: 'Are your services GDPR compliant?',
    answer:
      'Yes. All backups are stored on UK and EU-based servers, encrypted at rest and in transit. We do not transfer your data outside the UK or EU. We operate as a data processor under GDPR and can provide a Data Processing Agreement (DPA) on request.',
  },
  {
    question: 'Can I upgrade or cancel my plan at any time?',
    answer:
      'Plans are rolling monthly with no long-term lock-in. You can upgrade or downgrade between tiers at any point. To cancel, we require 30 days written notice. On cancellation, we provide a full handover document including backup archives and a site health summary.',
  },
  {
    question: 'Do you offer ad-hoc WordPress support alongside monthly maintenance packages?',
    answer:
      'Yes. While our monthly WordPress maintenance packages in the UK cover proactive updates, uptime checks, and security monitoring, we also provide support hours for ad-hoc website tasks, content updates, plugin adjustments, and custom development to ensure your site continues to run smoothly.',
  },
];

export default function WordPressMaintenanceUK() {
  const serviceSchema = generateServiceSchema(
    'WordPress Maintenance Service UK',
    'Professional WordPress maintenance service and security protection for UK businesses. 24/7 uptime monitoring, daily backups, security updates, malware scanning, and expert UK support.',
    '/wordpress-maintenance-uk',
    'From £149/month'
  );
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: '/' },
    { name: 'Services', url: '/#services' },
    { name: 'WordPress Maintenance Service UK', url: '/wordpress-maintenance-uk' },
  ]);
  const faqSchema = generateFAQSchema(faqItems);

  return (
    <>
      <StructuredData schemas={[serviceSchema, breadcrumbSchema, faqSchema]} />

      <PageHeader
        title="WordPress Maintenance <br /><span style='color: var(--primary)'>Service UK</span>"
        subtitle="Professional WordPress maintenance services and support for UK businesses. We handle daily backups, core/plugin updates, and 24/7 uptime monitoring so your website stays secure."
        badge="Plans from £149/month"
      />

      <TrustSignals />

      {/* What's included */}
      <section className="section-padding">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2>WordPress Website Maintenance Services & Packages</h2>
            <p style={{ color: '#a1a1aa', maxWidth: '600px', margin: '1rem auto 0' }}>
              We cover the core areas that keep a WordPress site secure, fast, and available for your customers.
            </p>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1.5rem',
          }}>
            {[
              { icon: '🔒', title: 'Security Updates', desc: 'WordPress core, plugin, and theme updates applied on your plan schedule, with staging tests for high-risk changes on Pro and Enterprise tiers.' },
              { icon: '💾', title: 'Daily Cloud Backups', desc: 'Full-site backups every 24 hours, stored encrypted on UK/EU servers. 30-day retention with one-click restore functionality.' },
              { icon: '📡', title: '24/7 Uptime Monitoring', desc: 'We monitor your site every minute. If it goes down, we are alerted within 60 seconds and begin investigating immediately.' },
              { icon: '🛡️', title: 'Malware Scanning', desc: 'Automated malware scans run daily. Any infection is flagged and quarantined before it affects your visitors or SEO rankings.' },
              { icon: '⚡', title: 'Performance Checks', desc: 'Regular speed audits with Core Web Vitals tracking. Higher tiers include active optimisation: image compression and database cleanup.' },
              { icon: '📊', title: 'Monthly Health Report', desc: 'A clear monthly report covering updates applied, backup status, uptime percentage, security scan results, and performance scores.' },
            ].map((item) => (
              <div key={item.title} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px', padding: '1.75rem' }}>
                <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }}>{item.icon}</div>
                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.5rem' }}>{item.title}</h3>
                <p style={{ color: '#a1a1aa', fontSize: '0.9rem', lineHeight: 1.6, margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WordPress Monitoring UK */}
      <section className="section-padding" style={{ background: 'var(--surface)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'center' }}>
            <div>
              <span style={{ display: 'inline-block', background: 'rgba(var(--primary-rgb), 0.1)', color: 'var(--primary)', fontSize: '0.8rem', fontWeight: 700, padding: '4px 12px', borderRadius: '20px', marginBottom: '1rem', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                WordPress Monitoring UK
              </span>
              <h2>24/7 WordPress Maintenance & Emergency Monitoring Services UK</h2>
              <p style={{ color: '#a1a1aa', lineHeight: 1.7, margin: '1rem 0 1.5rem' }}>
                Most hosting providers offer basic uptime monitoring. Our WordPress maintenance service goes further — monitoring every layer of your site, from server response to file integrity to login security.
              </p>
              <p style={{ color: '#a1a1aa', lineHeight: 1.7, margin: '0 0 1.5rem' }}>
                When something changes — whether it&apos;s a malware injection or an SSL certificate nearing expiry — we&apos;re alerted before you are. UK businesses on our plans have averaged{' '}
                <strong style={{ color: '#fff' }}>99.9% uptime</strong> across all monitored sites.
              </p>
              <Link href="/contact" className="btn btn-primary">Get Monitoring Set Up</Link>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { icon: '📡', title: 'Uptime monitoring every 60 seconds', desc: 'Checks your site is live and responding. Alert within 60 seconds of downtime.' },
                { icon: '🔐', title: 'SSL certificate monitoring', desc: 'Warns you 30 days before your certificate expires — no surprise outages.' },
                { icon: '🛡️', title: 'File integrity & malware monitoring', desc: 'Detects unauthorised file changes and injected code before it affects visitors.' },
                { icon: '⚡', title: 'Performance & response time monitoring', desc: 'Flags slowdowns and time-to-first-byte regressions as soon as they appear.' },
                { icon: '🔒', title: 'Brute-force login monitoring', desc: 'Detects and blocks automated login attacks targeting wp-login.php.' },
              ].map((item) => (
                <div key={item.title} style={{ background: 'var(--background)', border: '1px solid var(--border)', borderRadius: '10px', padding: '1rem 1.25rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: '1.4rem', flexShrink: 0, marginTop: '2px' }}>{item.icon}</span>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.9rem', marginBottom: '0.25rem', color: '#f4f4f5' }}>{item.title}</div>
                    <div style={{ color: '#a1a1aa', fontSize: '0.85rem', lineHeight: 1.5 }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Tiers */}
      <section className="section-padding">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2>WordPress Maintenance Packages & Support Pricing</h2>
            <p style={{ color: '#a1a1aa', maxWidth: '560px', margin: '1rem auto 0' }}>
              Transparent monthly WordPress maintenance plans built for different business needs. No setup fees, no long-term contracts.
            </p>
            <p style={{ marginTop: '1rem' }}>
              <Link href="/pricing" style={{ color: 'var(--primary)', fontWeight: 600 }}>
                Compare all UK WordPress support plans and monthly pricing
              </Link>
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem', maxWidth: '1000px', margin: '0 auto' }}>
            {/* Essentials */}
            <div style={{ background: 'var(--background)', border: '1px solid var(--border)', borderRadius: '16px', padding: '2rem' }}>
              <h3 style={{ marginBottom: '0.5rem' }}>Essentials</h3>
              <p style={{ color: '#a1a1aa', fontSize: '0.85rem', marginBottom: '1.5rem' }}>Best for simple brochure and business sites</p>
              <div style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1.5rem' }}>
                £149<span style={{ fontSize: '1rem', fontWeight: 400, color: '#a1a1aa' }}>/mo</span>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {[
                  'Monthly core, plugin & theme updates',
                  'Daily off-site backups',
                  '24/7 uptime monitoring',
                  'Weekly malware scanning',
                  'Monthly site health summary',
                  'UK business hours support',
                ].map((f) => (
                  <li key={f} style={{ display: 'flex', gap: '0.5rem', fontSize: '0.9rem', color: '#d4d4d8' }}>
                    <span style={{ color: 'var(--primary)', flexShrink: 0 }}>✓</span> {f}
                  </li>
                ))}
              </ul>
              <Link href="/contact" className="btn btn-secondary" style={{ display: 'block', textAlign: 'center' }}>Get Started</Link>
            </div>
            {/* Pro */}
            <div style={{ background: 'var(--background)', border: '2px solid var(--primary)', borderRadius: '16px', padding: '2rem', position: 'relative' }}>
              <div style={{ position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)', background: 'var(--primary)', color: '#000', fontSize: '0.75rem', fontWeight: 700, padding: '4px 16px', borderRadius: '20px', whiteSpace: 'nowrap' }}>
                MOST POPULAR
              </div>
              <h3 style={{ color: 'var(--primary)', marginBottom: '0.5rem' }}>Pro</h3>
              <p style={{ color: '#a1a1aa', fontSize: '0.85rem', marginBottom: '1.5rem' }}>For active lead-gen and marketing sites</p>
              <div style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1.5rem' }}>
                £349<span style={{ fontSize: '1rem', fontWeight: 400, color: '#a1a1aa' }}>/mo</span>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {[
                  'Weekly updates with staging checks',
                  'Daily backups and rollback support',
                  '24/7 uptime & malware monitoring',
                  'Monthly performance review',
                  'Small content edits (30 mins/mo)',
                  'Priority UK business hours support',
                  'Hack recovery guarantee',
                ].map((f) => (
                  <li key={f} style={{ display: 'flex', gap: '0.5rem', fontSize: '0.9rem', color: '#d4d4d8' }}>
                    <span style={{ color: 'var(--primary)', flexShrink: 0 }}>✓</span> {f}
                  </li>
                ))}
              </ul>
              <Link href="/contact" className="btn btn-primary" style={{ display: 'block', textAlign: 'center' }}>Get Started</Link>
            </div>
            {/* Enterprise */}
            <div style={{ background: 'var(--background)', border: '1px solid var(--border)', borderRadius: '16px', padding: '2rem' }}>
              <h3 style={{ marginBottom: '0.5rem' }}>Enterprise</h3>
              <p style={{ color: '#a1a1aa', fontSize: '0.85rem', marginBottom: '1.5rem' }}>For WooCommerce and revenue-critical sites</p>
              <div style={{ fontSize: '2.5rem', fontWeight: 800, marginBottom: '1.5rem' }}>
                £749<span style={{ fontSize: '1rem', fontWeight: 400, color: '#a1a1aa' }}>/mo</span>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 2rem', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                {[
                  'High-frequency security updates',
                  'Enhanced staging & rollback checks',
                  'Active speed optimisation',
                  'Dedicated technical contact',
                  'Quarterly security review calls',
                  'Priority 2-hour response SLA',
                  'Advanced reporting for stakeholders',
                ].map((f) => (
                  <li key={f} style={{ display: 'flex', gap: '0.5rem', fontSize: '0.9rem', color: '#d4d4d8' }}>
                    <span style={{ color: 'var(--primary)', flexShrink: 0 }}>✓</span> {f}
                  </li>
                ))}
              </ul>
              <Link href="/contact" className="btn btn-secondary" style={{ display: 'block', textAlign: 'center' }}>Contact Us</Link>
            </div>
          </div>
          <p style={{ textAlign: 'center', color: '#71717a', fontSize: '0.85rem', marginTop: '1.5rem' }}>
            Looking for enterprise-grade security hardening? See our{' '}
            <Link href="/wordpress-security-retainer" style={{ color: 'var(--primary)' }}>WordPress Security Retainer</Link>
            {' '}from £1,000/month.
          </p>
        </div>
      </section>

      {/* Why WebAdish */}
      <section className="section-padding">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', alignItems: 'center' }}>
            <div>
              <h2>Why UK Businesses Choose WebAdish</h2>
              <p style={{ color: '#a1a1aa', lineHeight: 1.7, margin: '1rem 0 1.5rem' }}>
                Most WordPress security protections are automated ticket queues. We work differently — you get a dedicated contact, plain-English reporting, and a team that already understands your site before anything goes wrong.
              </p>
              <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {[
                  'UK business hours support — no offshore time-zone delays',
                  'GDPR-compliant backups on UK/EU servers',
                  'Direct access on Pro plan — no ticket queues',
                  'Security-first: updates tested before deployment',
                  'Transparent monthly reporting, no jargon',
                  'White-label available for agency partners',
                ].map((point) => (
                  <li key={point} style={{ display: 'flex', gap: '0.75rem', color: '#d4d4d8', fontSize: '0.95rem' }}>
                    <span style={{ color: 'var(--primary)', flexShrink: 0, marginTop: '2px' }}>→</span> {point}
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { stat: '4 hrs', label: 'Average malware response time' },
                { stat: '99.9%', label: 'Client uptime across managed sites' },
                { stat: '30 days', label: 'Hack recovery guarantee window' },
                { stat: 'UK/EU', label: 'GDPR-compliant backup storage' },
              ].map((item) => (
                <div key={item.label} style={{ background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: '12px', padding: '1.25rem 1.5rem', display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                  <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--primary)', minWidth: '80px' }}>{item.stat}</div>
                  <div style={{ color: '#a1a1aa', fontSize: '0.9rem' }}>{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section-padding" style={{ background: 'var(--surface)' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2>How Our WordPress Security Protection Works</h2>
            <p style={{ color: '#a1a1aa', maxWidth: '540px', margin: '1rem auto 0' }}>Getting started takes less than one business day.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2rem', maxWidth: '900px', margin: '0 auto' }}>
            {[
              { step: '01', title: 'Onboard', desc: 'We run a baseline security and performance audit, set up monitoring, configure backups, and document your site environment. Done within one business day.' },
              { step: '02', title: 'Monitor & Maintain', desc: 'Updates, scans, and backups run on your plan schedule. Our monitoring watches your site around the clock and alerts us the moment something changes.' },
              { step: '03', title: 'Report & Improve', desc: 'Every month you receive a clear report covering everything we did, your site health scores, and any recommended improvements.' },
            ].map((item) => (
              <div key={item.step} style={{ textAlign: 'center' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'var(--primary)', color: '#000', fontWeight: 800, fontSize: '1.1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem' }}>
                  {item.step}
                </div>
                <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem' }}>{item.title}</h3>
                <p style={{ color: '#a1a1aa', fontSize: '0.9rem', lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related reading */}
      <section className="section-padding">
        <div className="container">
          <h2 style={{ marginBottom: '1.5rem' }}>Further Reading</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            <Link href="/wordpress-maintenance-service-uk-what-is-included-and-how-much-it-costs" style={{ color: 'var(--primary)', textDecoration: 'none', fontSize: '0.95rem' }}>
              → WordPress Maintenance Cost UK: What&apos;s Included &amp; What You Should Pay
            </Link>
            <Link href="/how-to-choose-wordpress-maintenance-service-uk" style={{ color: 'var(--primary)', textDecoration: 'none', fontSize: '0.95rem' }}>
              → How to Choose a WordPress Maintenance Service UK: What Agencies Don&apos;t Tell You
            </Link>
            <Link href="/wordpress-care-plans-uk" style={{ color: 'var(--primary)', textDecoration: 'none', fontSize: '0.95rem' }}>
              → WordPress Care Plans UK: What&apos;s Included and Which Plan Is Right for You
            </Link>
            <Link href="/wordpress-management-services-uk" style={{ color: 'var(--primary)', textDecoration: 'none', fontSize: '0.95rem' }}>
              → WordPress Management Services UK: What&apos;s Included and Who Needs One
            </Link>
            <Link href="/wordpress-monitoring-uk" style={{ color: 'var(--primary)', textDecoration: 'none', fontSize: '0.95rem' }}>
              → WordPress Monitoring UK: What to Monitor and Why Uptime Checks Aren&apos;t Enough
            </Link>
            <Link href="/wordpress-site-keeps-getting-hacked" style={{ color: 'var(--primary)', textDecoration: 'none', fontSize: '0.95rem' }}>
              → WordPress Site Keeps Getting Hacked? Here&apos;s Why &amp; How to Stop It
            </Link>
            <Link href="/wordpress-security-retainer" style={{ color: 'var(--primary)', textDecoration: 'none', fontSize: '0.95rem' }}>
              → WordPress Security Retainer: Enterprise-Grade Protection from £1,000/month
            </Link>
          </div>
        </div>
      </section>

      <FAQ items={faqItems} />

      <CTA
        title="Ready to Hand Off Your WordPress Security Protection?"
        subtitle="Get a free site health check when you sign up. No setup fee, no long-term contract."
        btnText="View Plans &amp; Get Started"
        btnLink="/contact"
      />
    </>
  );
}
