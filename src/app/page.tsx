import Hero from '@/components/Hero';
import TrustSignals from '@/components/TrustSignals';
import FAQ from '@/components/FAQ';
import CTA from '@/components/CTA';
import StructuredData from '@/components/StructuredData';
import Link from 'next/link';
import styles from './page.module.scss';
import { generatePageMetadata } from '@/lib/seo';
import { generateFAQSchema } from '@/lib/schema';

export const metadata = generatePageMetadata({
  title: 'WordPress Incident Response & Security UK | WebAdish',
  description:
    'Premium WordPress incident response for UK businesses. We contain, recover, and secure compromised websites with root-cause-led remediation and long-term protection.',
  path: '/',
});

export default function Home() {
  const faqs = [
    {
      question: 'How quickly can you respond to a hacked WordPress website?',
      answer:
        'We prioritise active incidents immediately. The first goal is containment and risk reduction, followed by proper investigation and clean recovery.',
    },
    {
      question: 'Why do basic malware cleanups often fail?',
      answer:
        'Because they usually remove visible malware without identifying the original access point, hidden backdoors, compromised accounts, or infrastructure weaknesses that allow reinfection.',
    },
    {
      question: 'Which recovery option do most businesses choose?',
      answer:
        'Most commercial websites choose Fixed-Fee Forensic Recovery because it combines deep forensic investigation, root-cause remediation, and post-recovery monitoring to reduce the chance of repeat compromise. Small and brochure sites start with Emergency Malware Removal from £299.',
    },
    {
      question: 'Who is this service for?',
      answer:
        'We work with eCommerce businesses, agencies, membership platforms, and companies where downtime, reputation damage, or customer-data exposure have direct commercial consequences.',
    },
  ];

  const schemas = [generateFAQSchema(faqs)];

  const heroTitle =
    "Your WordPress Site Is Compromised.<br />We Contain, Recover, and Secure It <span style='color: var(--primary)'>— Completely.</span>";
  const heroSubtitle =
    'Expert incident response for business-critical websites. We eliminate threats at root level and ensure it doesn’t happen again.';

  return (
    <>
      <StructuredData schemas={schemas} />

      <Hero
        title={heroTitle}
        subtitle={heroSubtitle}
        ctaText="Request Emergency Assessment"
        ctaLink="/contact"
        ctaNote="Active threats are contained immediately. Delays increase damage."
        showImage={false}
      />

      {/* Above-fold pricing + emergency CTA strip — mirrors /hacked-website-recovery-uk */}
      <section style={{ backgroundColor: 'var(--surface)', borderBottom: '1px solid var(--border)', padding: '1.25rem 0' }}>
        <div className="container">
          <div style={{ maxWidth: '960px', margin: '0 auto', display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', alignItems: 'center' }}>
              <div>
                <span style={{ color: '#4ade80', fontWeight: 800, fontSize: '1.25rem' }}>From £299</span>
                <span style={{ color: '#a1a1aa', fontSize: '0.9rem', marginLeft: '0.5rem' }}>small-site cleanup · 30-day guarantee</span>
              </div>
              <div style={{ color: '#a1a1aa', fontSize: '0.9rem' }}>
                <span style={{ color: '#e4e4e7', fontWeight: 600 }}>£1,499</span> business forensic · <span style={{ color: '#e4e4e7', fontWeight: 600 }}>No recovery, no invoice</span>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <a
                href="tel:+447344540450"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: '#ef4444', color: '#fff', fontWeight: 700, padding: '0.55rem 1.1rem', borderRadius: '0.5rem', fontSize: '0.9rem', textDecoration: 'none' }}
              >
                📞 Call Now
              </a>
              <a
                href="https://wa.me/447344540450?text=My%20website%20has%20been%20hacked%20and%20I%20need%20urgent%20help"
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: '#16a34a', color: '#fff', fontWeight: 700, padding: '0.55rem 1.1rem', borderRadius: '0.5rem', fontSize: '0.9rem', textDecoration: 'none' }}
              >
                💬 WhatsApp
              </a>
              <Link
                href="/wordpress-security-scanner"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '0.4rem', background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.4)', color: '#a5b4fc', fontWeight: 700, padding: '0.55rem 1.1rem', borderRadius: '0.5rem', fontSize: '0.9rem', textDecoration: 'none' }}
              >
                🔎 Free Instant Scan
              </Link>
            </div>
          </div>
        </div>
      </section>

      <TrustSignals />

      <section className={`${styles.highTicketSection} section-padding`}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2>For businesses where downtime, data loss, and security failure are not acceptable.</h2>
            <p>Triage begins within 30 minutes during active coverage hours.</p>
            <p>Led by 20+ years of experience in infrastructure, cybersecurity, and enterprise systems.</p>
          </div>
        </div>
      </section>

      <section className={`${styles.caseStudiesSection} section-padding`}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2>Every minute your site remains compromised, the risk and damage increase.</h2>
          </div>
          <div className={styles.compactGrid}>
            {[
              {
                label: '01',
                title: 'Revenue loss',
                description:
                  'Downtime, failed checkouts, and broken lead flows can turn a technical issue into an immediate commercial loss.',
              },
              {
                label: '02',
                title: 'SEO damage',
                description:
                  'Malware flags and blacklist warnings can wipe out hard-won rankings and leave you with months of recovery work.',
              },
              {
                label: '03',
                title: 'Customer trust erosion',
                description:
                  'Visitors who see warnings, redirects, or broken pages may not come back, even after the site is restored.',
              },
              {
                label: '04',
                title: 'Hidden attacker access',
                description:
                  'If the root cause is missed, backdoors, rogue users, or cron abuse may still be active long after the visible symptoms disappear.',
              },
            ].map((item) => (
              <article key={item.title} className={styles.compactCard}>
                <span className={styles.compactLabel}>{item.label}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
          <div className={styles.sectionHeader} style={{ marginTop: '2rem' }}>
            <p>
              <strong>Most “quick fixes” don’t solve the real problem — they just delay the next attack.</strong>
            </p>
          </div>
        </div>
      </section>

      <section className={`${styles.servicesSection} section-padding`}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2>This is a security incident — not a simple fix</h2>
            <p>Most providers remove symptoms. We eliminate the cause.</p>
            <p>
              If your site is stable but you need to understand hidden risk before attackers do, start with our <Link href="/wordpress-security-audit" style={{ color: 'var(--primary)' }}>WordPress security audit UK</Link> service.
            </p>
          </div>
          <div className={styles.fourPointGrid}>
            {[
              'Manual forensic investigation',
              'Root cause identification',
              'Complete backdoor elimination',
              'Infrastructure-level security hardening',
            ].map((item) => (
              <article key={item} className={styles.highlightCard}>
                <h3>{item}</h3>
              </article>
            ))}
          </div>
          <div className={styles.sectionHeader} style={{ marginTop: '2rem' }}>
            <p><strong>We don’t just clean your site — we secure your business.</strong></p>
          </div>
        </div>
      </section>

      <section className={`${styles.processSection} section-padding`}>
        <div className="container">
          <div className={styles.processContent}>
            <h2>What’s actually at stake?</h2>
            <ul className={styles.benefitsList}>
              <li><strong>Daily revenue loss:</strong> £1K–£10K+ depending on your business.</li>
              <li><strong>SEO recovery time:</strong> Months of lost visibility and slower recovery after blacklisting.</li>
              <li><strong>Customer data exposure:</strong> Potential legal, regulatory, and trust consequences.</li>
              <li><strong>Brand damage:</strong> Reputation loss that can outlast the technical recovery.</li>
            </ul>
            <p>
              <strong>Investing in proper recovery now prevents significantly larger losses later.</strong>
            </p>
          </div>
        </div>
      </section>

      <section className={`${styles.highTicketSection} section-padding`}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2>Select the Level of Response Your Situation Requires</h2>
            <p>Based on your situation, we recommend the appropriate level of response.</p>
            <p>
              <Link href="/hacked-website-recovery-uk" style={{ color: 'var(--primary)' }}>
                See our hacked website recovery UK service
              </Link>
            </p>
            <p>
              <Link href="/hacked-website-recovery-uk" style={{ color: 'var(--primary)' }}>
                Compare the full emergency WordPress recovery process before choosing a response tier
              </Link>
            </p>
            <p>
              <Link href="/wordpress-malware-removal" style={{ color: 'var(--primary)' }}>
                Need fixed-fee WordPress malware removal instead? Start with the cleanup service page
              </Link>
            </p>
          </div>
          <div className={styles.highTicketGrid}>
            <article className={styles.highlightCard}>
              <h3>Emergency Malware Removal</h3>
              <p><strong>From £299</strong></p>
              <p>For small and brochure WordPress sites needing fixed-fee cleanup.</p>
              <p>Malware removal</p>
              <p>Google blacklist removal support</p>
              <p>Basic hardening</p>
              <p>30-day reinfection guarantee</p>
              <p><strong>Fixed fee. No recovery, no invoice.</strong></p>
            </article>
            <article className={styles.highlightCard}>
              <div className={styles.planLabel}>Most clients choose this</div>
              <h3>Fixed-Fee Forensic Recovery</h3>
              <p><strong>From £1,499</strong></p>
              <p>Complete recovery and protection against reinfection for business sites.</p>
              <p>Deep forensic investigation</p>
              <p>Root cause identification</p>
              <p>Full malware &amp; backdoor removal</p>
              <p>Database and file integrity validation</p>
              <p>Hosting, DNS, and access audit</p>
              <p>Advanced security hardening</p>
              <p>Post-recovery monitoring &amp; support</p>
              <p><strong>Most businesses choose this to avoid repeat attacks.</strong></p>
            </article>
            <article className={styles.highlightCard}>
              <div className={styles.planLabelCritical}>For business-critical systems</div>
              <h3>Business-Critical Response</h3>
              <p><strong>£3,000 – £12,000+</strong></p>
              <p>For revenue-critical sites, multi-site estates, and major incidents.</p>
              <p>Post-hack forensic &amp; hardening package</p>
              <p>Breach autopsy and vector closure</p>
              <p>Disaster recovery architecture</p>
              <p>Advanced monitoring &amp; alerting</p>
              <p>Team access &amp; workflow security</p>
              <p>12-month protection roadmap</p>
              <p>SLA-backed emergency response</p>
              <p><strong>Designed for eCommerce, agencies &amp; high-revenue sites.</strong></p>
            </article>
          </div>
        </div>
      </section>

      <section className={`${styles.caseStudiesSection} section-padding`}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2>Why most hacked websites get compromised again (and why quick fixes fail)</h2>
          </div>
          <div className={styles.compactGrid}>
            {[
              {
                label: '01',
                title: 'Only visible malware is removed',
                description:
                  'Many low-cost cleanups focus on obvious infected files while ignoring persistence hidden deeper in the environment.',
              },
              {
                label: '02',
                title: 'Hidden backdoors remain',
                description:
                  'Attackers often leave alternate access methods in uploads, plugins, databases, or scheduled tasks so they can return later.',
              },
              {
                label: '03',
                title: 'No root cause is identified',
                description:
                  'If nobody confirms how access was gained, the same weakness is left open and the next compromise becomes far more likely.',
              },
              {
                label: '04',
                title: 'No long-term protection is implemented',
                description:
                  'Without monitoring, hardening, and access control improvements, the site goes back online in a vulnerable state.',
              },
            ].map((item) => (
              <article key={item.title} className={styles.compactCard}>
                <span className={styles.compactLabel}>{item.label}</span>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
          <div className={styles.sectionHeader} style={{ marginTop: '2rem' }}>
            <p><strong>That’s why reinfections are common with low-cost fixes.</strong></p>
            <p>
              <Link href="/wordpress-site-keeps-getting-hacked" style={{ color: 'var(--primary)' }}>
                Read why WordPress sites keep getting hacked after cleanup
              </Link>
            </p>
            <p>
              <Link href="/wordpress-malware-removal" style={{ color: 'var(--primary)' }}>
                Compare our fixed-fee WordPress malware removal service
              </Link>
            </p>
          </div>
        </div>
      </section>

      <section className={`${styles.servicesSection} section-padding`}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2>How we handle critical security incidents</h2>
          </div>
          <div className={styles.servicesGrid}>
            {[
              {
                title: 'Immediate Assessment',
                description: 'Rapid diagnosis of severity and access points.',
              },
              {
                title: 'Containment',
                description: 'Stop active threats and prevent further damage.',
              },
              {
                title: 'Recovery',
                description: 'Clean, rebuild, and restore safely.',
              },
              {
                title: 'Hardening',
                description: 'Close all vulnerabilities and access points.',
              },
              {
                title: 'Protection',
                description: 'Ongoing monitoring and prevention strategy.',
              },
            ].map((item) => (
              <article key={item.title} className={styles.highlightCard}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className={`${styles.processSection} section-padding`}>
        <div className="container">
          <div className={styles.processContent}>
            <h2>Who this is for</h2>
            <ul className={styles.benefitsList}>
              <li>Small business and brochure sites needing fixed-fee emergency cleanup</li>
              <li>Businesses generating revenue through their website</li>
              <li>eCommerce and membership platforms</li>
              <li>Agencies managing client websites</li>
              <li>Companies where downtime has real financial impact</li>
            </ul>
            <p><strong>From £299 small-site cleanups to major incident engagements — every tier is root-cause-led, not a surface malware sweep.</strong></p>
          </div>
        </div>
      </section>

      <section className={`${styles.highTicketSection} section-padding`}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2>After recovery, stay protected</h2>
            <p>Once your website is secured, ongoing protection is critical.</p>
            <p>
              <Link href="/wordpress-security-audit" style={{ color: 'var(--primary)' }}>
                Get a WordPress security audit to understand your current risk posture
              </Link>
            </p>
            <p>
              <Link href="https://www.webadish.com/" style={{ color: 'var(--primary)' }}>
                Continue with our ongoing security protection
              </Link>
            </p>
          </div>
        </div>
      </section>

      <FAQ items={faqs} />

      <CTA
        title="Every hour increases risk, damage, and recovery cost."
        subtitle="Request Emergency Assessment Now. Triage begins within 30 minutes during active coverage hours."
        btnText="Request Emergency Assessment Now"
        btnLink="/contact"
      />

      <section className="section-padding" style={{ backgroundColor: 'var(--background)', paddingTop: 0 }}>
        <div className="container">
          <p style={{ textAlign: 'center', color: '#a1a1aa', maxWidth: '860px', margin: '0 auto' }}>
            We specialize in WordPress security, incident response, and ongoing protection for business-critical websites.
          </p>
        </div>
      </section>
    </>
  );
}
