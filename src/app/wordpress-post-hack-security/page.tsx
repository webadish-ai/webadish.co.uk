import { generatePageMetadata } from '@/lib/seo';
import BlogPostLayout from '@/components/BlogPostLayout';
import Link from 'next/link';

export const metadata = generatePageMetadata({
  title: 'WordPress Post-Hack Security: 12 Steps After a Cleanup (UK)',
  description:
    'A malware cleanup is not the end of a WordPress incident — it is the start of the highest-risk 30 days. The 12 post-hack security steps UK businesses should complete after any cleanup.',
  path: '/wordpress-post-hack-security',
  type: 'article',
  publishedTime: '2026-07-16',
  modifiedTime: '2026-07-16',
});

const faqItems = [
  {
    question: 'Is my WordPress site safe after a malware cleanup?',
    answer: 'Not automatically. A cleanup removes the malicious code that was found — it does not change the conditions that let the attacker in, and it cannot guarantee every backdoor was caught. Industry experience consistently shows the 30 days after a cleanup are the highest-risk period for reinfection. A site is only safe once the entry point is closed, all credentials are rotated, and monitoring is in place to catch any code the cleanup missed.',
  },
  {
    question: 'Why do WordPress sites get reinfected after cleaning?',
    answer: 'Three reasons dominate: a backdoor survived the cleanup (attackers routinely plant several, in places surface scans miss), the original vulnerability was never patched, or stolen credentials were never rotated. Any one of these lets the attacker walk straight back in — often within days, using automated tooling that revisits previously compromised sites.',
  },
  {
    question: 'What credentials need to be changed after a WordPress hack?',
    answer: 'All of them, and the list is longer than most people expect: every WordPress admin and editor password, the database password in wp-config.php, WordPress salts and security keys, hosting control panel and SFTP/SSH credentials, and any API keys stored in the site — payment gateways, email services, CRM integrations. If the attacker read your files or database, treat everything in them as compromised.',
  },
  {
    question: 'How long should I monitor a WordPress site after a hack?',
    answer: 'Treat the first 30 days as an active monitoring window: daily file-integrity checks, blocklist status checks, and review of new admin users and scheduled tasks. Most reinfections surface in that window. After 30 clean days you can drop to the routine monitoring any business site should have — but the monitoring itself should never stop entirely.',
  },
  {
    question: 'Do I need to report a hacked WordPress site to the ICO?',
    answer: 'You need to assess it, and quickly — the UK GDPR gives you 72 hours from becoming aware of a personal data breach to notify the ICO if the breach is likely to risk people’s rights and freedoms. Whether a hacked website meets that bar depends on what data the site holds and what the attacker could access. Document your assessment even if you conclude no report is needed.',
  },
  {
    question: 'Should I pay for ongoing security after a hack, or handle it myself?',
    answer: 'The honest test is whether you will actually do the work: rotate credentials properly, apply security updates within days of release, check integrity reports, and respond when an alert fires at the weekend. If your site generates revenue or leads, a monthly plan that includes incident response typically costs less than a single repeat cleanup — and removes the risk that post-hack discipline quietly lapses after a few weeks.',
  },
];

export default function PostPage() {
  return (
    <>
      <BlogPostLayout
        title="WordPress Post-Hack Security: The 12 Steps That Stop the Second Hack"
        lead="The cleanup invoice is paid, the malware warnings are gone, and the site looks normal again. This is the moment most WordPress owners relax — and it is exactly the moment attackers count on. Here is the post-hack security work that decides whether you stay clean or become a repeat victim."
        datePublished="2026-07-16"
        dateModified="2026-07-16"
        category="WordPress Security"
        slug="wordpress-post-hack-security"
        kicker="WordPress Security"
        faqItems={faqItems}
        summaryPoints={[
          'The 30 days after a cleanup are the highest-risk period for reinfection — attackers revisit sites they have already compromised',
          'A cleanup removes malicious code; it does not close the entry point or rotate the credentials the attacker may hold',
          'Post-hack security has three phases: lock out the attacker, close the entry point, then monitor for what the cleanup missed',
        ]}
      >
        <h2>Why the cleanup is not the end of the incident</h2>
        <p>A malware cleanup answers one question: &ldquo;what malicious code can we find right now?&rdquo; It does not answer the questions that determine what happens next — how the attacker got in, what they took, what access they still hold, and whether anything survived the sweep. Attackers know most site owners stop caring the day the warnings disappear, so they plant multiple backdoors and return weeks later, often with automated tooling that re-tests every site they have ever compromised.</p>
        <p>This is why <Link href="/wordpress-site-keeps-getting-hacked">sites that get hacked once so often get hacked again</Link>: the visible infection was treated, the compromise was not. The steps below are the difference, grouped into the order you should do them.</p>

        <h2>Phase 1 — Lock the attacker out (day one)</h2>
        <p>Assume the attacker still has at least one working set of credentials. Until everything is rotated, nothing else you do is reliable.</p>
        <p><strong>1. Rotate every WordPress password.</strong> Every administrator and editor account, without exception — including accounts belonging to former staff and old agencies, which are better deleted outright.</p>
        <p><strong>2. Rotate the credentials WordPress itself uses.</strong> The database password in <code>wp-config.php</code>, and fresh WordPress salts so every existing login cookie — including the attacker&rsquo;s — is invalidated instantly.</p>
        <p><strong>3. Rotate hosting and transfer credentials.</strong> Hosting control panel, SFTP/SSH, and any deployment keys. If the attacker reached the hosting account rather than just WordPress, cleaning WordPress alone achieves nothing.</p>
        <p><strong>4. Rotate API keys and integration secrets.</strong> Payment gateways, transactional email, CRM connections, backup services — any secret stored in the site&rsquo;s files or database should be treated as read by the attacker.</p>
        <p><strong>5. Audit the user table.</strong> Look for administrator accounts you do not recognise, recently changed email addresses on legitimate accounts, and users with roles higher than they need. Attackers routinely create innocuous-looking admin users as a fallback, with names like &ldquo;wp_support&rdquo; or copies of real staff names.</p>

        <h2>Phase 2 — Close the door they used (week one)</h2>
        <p><strong>6. Identify and patch the entry point.</strong> If your cleanup provider cannot tell you how the attacker got in, that is a red flag — root-cause identification is the difference between <Link href="/wordpress-security-audit-vs-malware-scan">a professional recovery and a cosmetic one</Link>. The most common entry points are a vulnerable plugin or theme, a brute-forced or reused password, and a compromised neighbouring site on the same hosting account.</p>
        <p><strong>7. Remove what you do not use.</strong> Every deactivated plugin and unused theme is attack surface that nobody is watching. Delete them — deactivated is not safe, deleted is.</p>
        <p><strong>8. Harden the obvious weak points.</strong> Enforce two-factor authentication on all admin accounts, disable XML-RPC if nothing depends on it, and disable file editing in the dashboard. None of this requires a developer, and together it closes the routes most automated attacks try first.</p>
        <p><strong>9. Reset your backup regime.</strong> Your existing backups may contain the infection — and the backdoors. Take a fresh, verified-clean full backup immediately after the cleanup and hardening, store it off the server, and mark older backups as suspect so nobody innocently restores the compromise back onto the clean site.</p>

        <h2>Phase 3 — Watch for what the cleanup missed (days 1–30)</h2>
        <p><strong>10. Run daily integrity and blocklist checks.</strong> File-integrity monitoring catches new or modified files — the signature of a surviving backdoor being used. Blocklist monitoring catches Google flagging the site before your customers tell you about it. A <Link href="/wordpress-security-scanner">free scan</Link> is a reasonable spot check; during the 30-day window you want it happening automatically, every day.</p>
        <p><strong>11. Review what search engines see.</strong> Check Google Search Console for security issues, unfamiliar sitemaps, unauthorised owners, and indexed URLs you did not create — SEO-spam infections are frequently invisible in the browser and obvious in the index. If the site was blocklisted, confirm the review request went through and the warning cleared.</p>
        <p><strong>12. Complete your data-breach assessment.</strong> UK businesses have 72 hours from becoming aware of a qualifying breach to notify the ICO, so this cannot wait until the technical work is done. Our guide to <Link href="/do-you-need-to-report-a-hacked-website-to-the-ico">whether a hacked website needs reporting to the ICO</Link> walks through the assessment — and document your reasoning even if you conclude no report is required.</p>

        <h2>The uncomfortable truth about post-hack discipline</h2>
        <p>Almost nobody sustains this manually. The first week after a hack, everyone checks everything. By week three, the daily checks are weekly. By month two, the site is exactly as unwatched as it was before the incident — except now it is on lists of previously compromised sites that attackers actively revisit.</p>
        <p>That is the honest argument for putting a hacked site on a monthly plan rather than a good-intentions checklist: not that the tasks are difficult, but that they only work when they happen every day, indefinitely, including the weeks nobody is thinking about security. It is also why we back <Link href="/hacked-website-recovery-uk">every recovery we perform</Link> with a 30-day reinfection guarantee — the reinfection window is when protection earns its keep.</p>
        <p>If your cleanup is done and you want the post-hack window covered properly — monitoring, hardening, and a team already familiar with incident response if anything resurfaces — a <Link href="/wordpress-security-retainer">security retainer</Link> exists for exactly this situation.</p>
      </BlogPostLayout>
    </>
  );
}
