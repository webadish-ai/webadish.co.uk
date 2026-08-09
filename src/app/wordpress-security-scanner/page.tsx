import { ShieldCheck, Zap, Lock, MapPin, UserCheck } from 'lucide-react';
import Scanner from '@/components/Scanner';
import BackedByBTLITC from '@/components/BackedByBTLITC';
import { generatePageMetadata, SITE_URL } from '@/lib/seo';
import { generateFAQSchema, generateHowToSchema } from '@/lib/schema';

export const metadata = generatePageMetadata({
  title: 'Free WordPress Security Scanner | Is My Site Hacked? | WebAdish',
  description:
    'Free instant check for a hacked WordPress site. Scan for malware, Google blacklist warnings, spam injections, redirects and security gaps. Get a full report with fix steps — no signup to see your result.',
  path: '/wordpress-security-scanner',
});

const trustSignals = [
  { icon: Zap, title: 'Results in seconds', desc: 'No signup needed to see your verdict' },
  { icon: Lock, title: 'Safe, read-only scan', desc: 'We never log in or change your site' },
  { icon: MapPin, title: 'UK-based team', desc: 'GDPR-aware WordPress security experts' },
  { icon: UserCheck, title: 'Human help if flagged', desc: 'Fixed-fee cleanup with a 30-day guarantee' },
];

const checks = [
  { title: 'Google Blacklist', desc: 'Checks Google Safe Browsing for "this site may be hacked" / "deceptive site" flags.' },
  { title: 'Malware & Injections', desc: 'Scans the homepage for injected spam, obfuscated scripts, redirects and known malware signatures.' },
  { title: 'WordPress Hardening', desc: 'Looks for exposed version, directory listings and exposed config backups attackers exploit.' },
  { title: 'SSL & Headers', desc: 'Verifies HTTPS and key security headers that protect your visitors and login.' },
];

const schema = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',
  name: 'WordPress Security Scanner',
  applicationCategory: 'SecurityApplication',
  operatingSystem: 'Web',
  url: `${SITE_URL}/wordpress-security-scanner`,
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'GBP' },
  provider: { '@type': 'Organization', name: 'WebAdish', url: SITE_URL },
};

const faqs = [
  {
    question: 'Can a free scanner really tell if my WordPress site is hacked?',
    answer:
      'A scan is a fast first look. It reliably catches the signs visible from outside your site — Google blacklist flags, injected spam and malware on the homepage, unwanted redirects, exposed config and backup files, an exposed .git or .env, leaked usernames, and missing HTTPS or security headers. It cannot see every backdoor hidden in your files or database, so a clean result is reassuring but not a guarantee. If anything is flagged, or you still have symptoms, a full file and database investigation is the next step.',
  },
  {
    question: 'Is it safe to run the scan on my site?',
    answer:
      'Yes. The scanner only makes a handful of normal, read-only web requests to public pages — the same kind your browser makes when you visit the site. It does not log in, change anything, or store your site’s content.',
  },
  {
    question: 'The scan says my site is clean but I still think it was hacked. What now?',
    answer:
      'Homepage scanning can miss malware that only triggers for search engines, logged-out visitors, or specific countries, as well as backdoors buried in files or the database. If you are seeing spam pages in Google, redirect complaints, or host warnings, contact us for a complete malware investigation that goes beyond what an external scan can reach.',
  },
  {
    question: 'What should I do if the scanner finds a problem?',
    answer:
      'For hardening warnings (exposed version, XML-RPC, missing headers) you can usually fix them yourself or with a security plugin. For confirmed infections — injected spam, known malware signatures, a Google blacklist flag, or exposed credentials — clean up promptly and close the entry point so it cannot return. Our UK team can do this for you, including the Google Search Console reconsideration request if you have been blacklisted.',
  },
];

const faqSchema = generateFAQSchema(faqs);

const howToSchema = generateHowToSchema(
  'How to check if your WordPress site is hacked',
  'A quick way to find out whether your WordPress website has been hacked, using a free online security scanner and a few manual checks.',
  [
    {
      name: 'Run a free security scan',
      text: 'Enter your website address into the WebAdish WordPress Security Scanner. It checks the public homepage for malware, injected spam, unwanted redirects, and a Google Safe Browsing blacklist flag in seconds.',
    },
    {
      name: 'Review the findings by category',
      text: 'Read the result across the four categories — Google blacklist, malware and injections, WordPress hardening, and SSL and headers. Critical issues point to an active infection; warnings point to hardening gaps an attacker can exploit.',
    },
    {
      name: 'Look for the tell-tale symptoms',
      text: 'Confirm with the common signs of a hack: spam pages or Japanese characters appearing in Google search results, visitors redirected to other sites, browser or host warnings, a sudden traffic drop, or unfamiliar admin users.',
    },
    {
      name: 'Clean up and close the entry point',
      text: 'If anything is flagged, take a backup, remove the malware from your files and database, delete any backdoors, then update and harden WordPress so it cannot be reinfected. If you have been blacklisted, submit a reconsideration request in Google Search Console.',
    },
  ],
);

export default function SecurityScannerPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />

      <section style={{ background: 'linear-gradient(180deg, rgba(99,102,241,0.08) 0%, transparent 60%)' }}>
        <Scanner />
      </section>

      {/* Trust-signal strip */}
      <section style={{ borderTop: '1px solid rgba(255,255,255,0.08)', borderBottom: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.02)' }}>
        <div className="container" style={{ maxWidth: '1000px', padding: '1.6rem 0' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(210px, 1fr))', gap: '1.2rem' }}>
            {trustSignals.map((t) => (
              <div key={t.title} style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <div style={{ flexShrink: 0, width: 38, height: 38, borderRadius: 9, background: 'rgba(99,102,241,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <t.icon size={18} color="#818cf8" />
                </div>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{t.title}</div>
                  <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.8rem', lineHeight: 1.4 }}>{t.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <BackedByBTLITC />

      {/* What it checks */}
      <section style={{ padding: '4rem 0' }}>
        <div className="container" style={{ maxWidth: '1000px' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.2rem)', fontWeight: 700, marginBottom: '0.8rem' }}>What the Scanner Checks</h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', maxWidth: '34rem', margin: '0 auto' }}>
              A fast first look at the signals that most often reveal a hacked WordPress site.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.2rem' }}>
            {checks.map((c) => (
              <div key={c.title} style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '14px', padding: '1.5rem' }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: 'rgba(99,102,241,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem' }}>
                  <ShieldCheck size={22} color="#818cf8" />
                </div>
                <h3 style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '0.4rem' }}>{c.title}</h3>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', lineHeight: 1.6 }}>{c.desc}</p>
              </div>
            ))}
          </div>
          <p style={{ textAlign: 'center', fontSize: '0.85rem', color: '#94a3b8', maxWidth: '40rem', margin: '2.5rem auto 0' }}>
            The scanner is a quick triage, not a replacement for a full audit. If it flags anything — or you suspect a hack it cannot see from the homepage — our team can run a complete <a href="/wordpress-malware-removal" style={{ color: '#818cf8' }}>file and database investigation</a>.
          </p>
        </div>
      </section>

      {/* Step-by-Step Guide */}
      <section style={{ padding: '4rem 0', background: 'rgba(255,255,255,0.02)' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <h2 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.2rem)', fontWeight: 700, marginBottom: '0.8rem' }}>How to Check if Your WordPress Site is Hacked</h2>
            <p style={{ color: 'rgba(255,255,255,0.7)', maxWidth: '34rem', margin: '0 auto' }}>
              Follow these standard troubleshooting steps if you suspect your website has been compromised.
            </p>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {[
              {
                step: '01',
                title: 'Run an External Malware Scan',
                desc: 'Use our free tool above to scan your public files. It checks your homepage HTML, scripts, and server headers for obvious injections, redirects, or search engine blacklist warnings in under 30 seconds.'
              },
              {
                step: '02',
                title: 'Inspect Google Search Console (GSC)',
                desc: 'Log in to your GSC account and check the "Security Issues" tab under "Security & Manual Actions". If Google has detected malware, phishing, or spam queries, they will detail the infected URLs and issue a warning.'
              },
              {
                step: '03',
                title: 'Check Your Google Search Results (SERPs)',
                desc: 'Search for "site:yourdomain.com" in Google. Check if your main meta titles and descriptions look normal, or if you see injected keywords in foreign characters (known as the Japanese keyword hack) or pharma links.'
              },
              {
                step: '04',
                title: 'Audit User Accounts and Core Files',
                desc: 'Check your WordPress admin dashboard under "Users" for rogue administrator accounts. If you see unfamiliar profiles or notice file system changes in wp-config.php, your site requires deep forensic cleanup and backdoor removal.'
              }
            ].map((s) => (
              <div key={s.step} style={{ display: 'flex', gap: '1.2rem', alignItems: 'flex-start', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '1.5rem' }}>
                <div style={{ flexShrink: 0, width: 44, height: 44, borderRadius: '50%', background: 'rgba(99,102,241,0.15)', border: '1px solid rgba(99,102,241,0.3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#a5b4fc', fontSize: '1.1rem' }}>
                  {s.step}
                </div>
                <div>
                  <h3 style={{ fontWeight: 700, fontSize: '1.05rem', marginBottom: '0.4rem', color: '#fff' }}>{s.title}</h3>
                  <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.9rem', lineHeight: 1.65, margin: 0 }}>{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: '0 0 4rem' }}>
        <div className="container" style={{ maxWidth: '760px' }}>
          <h2 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.2rem)', fontWeight: 700, marginBottom: '2rem', textAlign: 'center' }}>
            Scanner FAQs
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
            {faqs.map((f) => (
              <details
                key={f.question}
                style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '12px', padding: '1.1rem 1.3rem' }}
              >
                <summary style={{ fontWeight: 600, fontSize: '1rem', cursor: 'pointer', listStyle: 'none' }}>
                  {f.question}
                </summary>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.92rem', lineHeight: 1.65, marginTop: '0.8rem' }}>
                  {f.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
