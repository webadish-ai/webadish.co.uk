import { generatePageMetadata } from '@/lib/seo';
import BlogPostLayout from '@/components/BlogPostLayout';
import Link from 'next/link';

export const metadata = generatePageMetadata({
  title: 'WordPress Site Keeps Getting Hacked? How to Stop It for Good',
  description: 'If your WordPress site keeps getting hacked after cleanup, a backdoor or compromised hosting account is usually the cause. Learn how to stop repeat hacks permanently.',
  path: '/wordpress-site-keeps-getting-hacked',
  type: 'article',
  publishedTime: '2026-03-09',
  modifiedTime: '2026-03-13',
});

const faqItems = [
  {
    question: 'Why does my WordPress site keep getting hacked?',
    answer: 'The most common reason a WordPress site keeps getting hacked is an undetected backdoor — a hidden file or code snippet that lets attackers re-enter even after you clean the site. Other causes include: a compromised hosting account, weak admin passwords, an outdated plugin that gets re-exploited, or a nulled theme with malware baked in.',
  },
  {
    question: 'How do I stop my WordPress site from being hacked repeatedly?',
    answer: 'To permanently stop repeat WordPress hacks: 1) Perform a full forensic cleanup including all backdoors — not just surface malware. 2) Change all passwords (WordPress admin, FTP, hosting, database). 3) Delete all unused plugins and themes. 4) Enable a Web Application Firewall. 5) Set up ongoing security monitoring. 6) Consider a professional security retainer for permanent protection.',
  },
  {
    question: 'What is a WordPress backdoor and how do I find it?',
    answer: 'A WordPress backdoor is malicious code hidden in your site files that allows attackers to re-enter without needing your password. They are often placed in the wp-content/uploads directory (which is rarely scanned), inside encoded PHP files, or disguised as legitimate WordPress core files. Finding all backdoors requires a full file-level scan — surface-level plugin scans often miss them.',
  },
  {
    question: 'Does reinstalling WordPress remove backdoors?',
    answer: 'No. Reinstalling WordPress core files only replaces the files in the /wp-admin/ and /wp-includes/ directories. Backdoors planted in wp-content/uploads, themes, plugins, or the database are completely untouched by a WordPress reinstall. This is why sites appear clean after a reinstall and then get reinfected shortly after.',
  },
  {
    question: 'Can my WordPress site get hacked through the hosting account?',
    answer: 'Yes. If your hosting account credentials are compromised, attackers can upload malicious files or modify existing ones at the server level — bypassing WordPress entirely. This is why changing FTP, cPanel, and database passwords after a hack is essential, not just WordPress admin passwords.',
  },
  {
    question: 'How much does it cost to permanently fix a repeatedly hacked WordPress site?',
    answer: 'A professional post-hack forensic and hardening engagement for a repeatedly hacked WordPress site in the UK typically starts around £3,000, depending on complexity. An ongoing security retainer then provides the best long-term protection, with continuous monitoring, immediate response to new vulnerabilities, and a recovery guarantee.',
  },
];

export default function PostPage() {
  return (
    <>
      <BlogPostLayout
        title="WordPress Site Keeps Getting Hacked? Why It Happens and How to Stop It"
        lead="You cleaned the malware. You updated everything. A week later, it is back. If your WordPress site keeps getting hacked, a hidden backdoor or compromised access path is usually still open."
        datePublished="2026-03-09"
        dateModified="2026-03-13"
        category="Recovery"
        slug="wordpress-site-keeps-getting-hacked"
        faqItems={faqItems}
        summaryPoints={[
          'Repeat hacks almost always mean a backdoor was missed during the initial cleanup',
          'Backdoors survive reinstalls, password changes, and surface-level malware scans',
          'Breaking the cycle requires a full forensic cleanup — not just removing visible malware',
        ]}
      >
        <h2>Why your site keeps getting hacked</h2>
        <p>If your WordPress site is being compromised repeatedly — even after you have cleaned it and updated everything — there are a small number of root causes. Understanding which one applies to your situation is the first step to breaking the cycle.</p>
        <p>The frustrating reality is that most repeat hacks are not new attacks. They are the same attacker (or their automated tools) re-entering through a door they left open the first time. Surface-level cleanup removes the symptoms — the spam links, the redirects, the injected scripts — but leaves the entry point intact. Within days or weeks, the infection returns.</p>

        <h2>The most common cause: undetected backdoors</h2>
        <p>A backdoor is a hidden piece of code that lets attackers re-enter your site without needing your username or password. When hackers compromise a site, the malware you can see — the spam links, the redirects, the defaced pages — is just the symptom. The backdoor is the real problem, and it is designed to be invisible.</p>
        <p>Backdoors are commonly hidden in:</p>
        <ul>
          <li><strong>The wp-content/uploads directory</strong> — This folder is writable by WordPress for uploading images, which means attackers can place PHP files there. Most security scans focus on plugin and theme files and miss this location entirely. PHP files have no legitimate reason to exist inside the uploads folder, but basic scanners rarely check for them.</li>
          <li><strong>Encoded PHP files</strong> — Malicious code is often base64-encoded or obfuscated with tools like PHP Obfuscator to look like gibberish. To a basic scanner it appears as an unusual but non-threatening file. A forensic scanner decodes these files and analyses what the code actually does.</li>
          <li><strong>WordPress core file replacements</strong> — Attackers replace legitimate files like wp-load.php or functions in wp-includes with modified versions containing backdoor code. Because the filename matches a known legitimate file, many scanners pass over it without inspecting the contents.</li>
          <li><strong>Database entries</strong> — Malicious JavaScript or PHP can be injected directly into your WordPress database, inside post content, widget settings, or theme options. Scanning files alone will not find a database-level backdoor.</li>
          <li><strong>Plugin and theme files</strong> — Even after you delete an infected plugin, if a backup or cached version remains on the server, the backdoor persists. Some hosting panels keep hidden backups in directories outside the WordPress install.</li>
        </ul>

        <h2>Why reinstalling WordPress does not fix repeat hacks</h2>
        <p>This is one of the most common misconceptions we encounter. Many site owners reinstall WordPress core after a hack, see the site looking clean, and assume the problem is resolved. It is not.</p>
        <p>A WordPress reinstall only replaces the files inside <code>/wp-admin/</code> and <code>/wp-includes/</code>. It leaves everything else untouched — your plugins, your themes, your uploads directory, and your database. Backdoors planted in any of those locations survive a full WordPress reinstall entirely. The site will appear clean for days or weeks, then become reinfected as the attacker or their scripts re-activate the backdoor and re-inject the malware.</p>

        <h2>Other reasons WordPress keeps getting hacked</h2>

        <h3>Compromised hosting credentials</h3>
        <p>If your FTP, cPanel, or hosting panel password was part of the original breach, attackers may still have access at the server level — independent of WordPress entirely. Changing your WordPress admin password does nothing if they can still log into your hosting account and upload files directly. Server-level access bypasses all WordPress security measures, including two-factor authentication and security plugins.</p>
        <p>After any WordPress hack, it is essential to change FTP/SFTP credentials, your cPanel or hosting panel password, your database password, and update <code>wp-config.php</code> to reflect the new database credentials.</p>

        <h3>Vulnerable plugin being re-exploited</h3>
        <p>If a plugin with a known vulnerability is still installed and active — even if you cleaned the malware it caused — attackers can exploit the same vulnerability again within days. Automated bots scan millions of sites constantly for known vulnerable plugin versions. These bots use public vulnerability databases like WPScan to identify targets. If your site is running a plugin version listed as vulnerable, it will be targeted repeatedly until the plugin is updated or removed.</p>
        <p>The fix is straightforward: update all plugins immediately, and set up monitoring so future vulnerability disclosures trigger an immediate update.</p>

        <h3>Nulled themes or plugins</h3>
        <p>Nulled (pirated) themes and plugins frequently contain malware baked into the code itself. Every time the file is loaded by WordPress, it re-infects your site. No amount of cleanup will help if a nulled file is still installed — the malware is in the code, not in a separate file you can delete. The only solution is to remove the nulled software entirely and replace it with a legitimate licensed version.</p>

        <h3>Cross-contamination from another site</h3>
        <p>If you host multiple WordPress sites on the same hosting account and one is compromised, the malware can spread laterally to your other sites through shared file system permissions. Cleaning one site without addressing all others on the same hosting account will result in re-infection. This is a particularly common problem with shared hosting environments where multiple sites share a single cPanel account.</p>

        <h3>Weak or reused admin passwords</h3>
        <p>Brute-force attacks and credential stuffing (using username/password combinations leaked in data breaches from other sites) are responsible for a significant proportion of WordPress hacks. If your WordPress admin password appears in any public data breach — even from an entirely unrelated service — it is known to attackers and will be tried on your site. Use a unique, randomly generated password of at least 20 characters for every WordPress admin account.</p>

        <h2>How to tell if your site has an active backdoor</h2>
        <p>Some signs that suggest an undetected backdoor is present, even after cleanup:</p>
        <ul>
          <li>Your site is reinfected within days or weeks of a cleanup</li>
          <li>Google Search Console shows manual action or deceptive content warnings</li>
          <li>Your hosting provider has suspended your account for malware</li>
          <li>Visitors are being redirected to spam or phishing sites</li>
          <li>Unexpected admin accounts appear in your WordPress user list</li>
          <li>Your site sends emails you did not create</li>
          <li>File modification dates in wp-content/uploads show recent changes to PHP files</li>
        </ul>
        <p>Any of the above is strong evidence that a backdoor remains active. A surface-level scan using free tools will frequently return clean results even when backdoors are present — these tools compare file hashes against known malware signatures and cannot detect custom or obfuscated backdoors.</p>

        <h2>How to permanently stop repeat WordPress hacks</h2>

        <h3>Step 1: Full forensic cleanup — not just surface malware</h3>
        <p>A genuine cleanup requires scanning every file on your server, not just the WordPress install directory. This includes the uploads folder, any hidden directories, server-level configuration files, and your WordPress database. Every backdoor must be identified and removed. Forensic-level cleanup tools decode obfuscated PHP, check file modification timestamps against expected values, compare core files against official WordPress releases, and analyse database content for injected scripts.</p>
        <p>If even one backdoor is missed, the site will be reinfected. This is why basic plugin-based scans often fail for repeat-hack situations — they are designed for initial detection, not forensic-level cleanup.</p>

        <h3>Step 2: Change every credential</h3>
        <p>After cleanup, change all of the following without exception:</p>
        <ul>
          <li>All WordPress admin account passwords</li>
          <li>FTP/SFTP credentials</li>
          <li>cPanel or hosting panel password</li>
          <li>Database password (and update wp-config.php accordingly)</li>
          <li>Any API keys or service integrations connected to the site</li>
          <li>Email account passwords, if those accounts are used for WordPress recovery</li>
        </ul>

        <h3>Step 3: Remove all unused plugins and themes</h3>
        <p>Deactivated plugins still present a vulnerability — their files remain on the server and can be exploited whether the plugin is active or not. Delete every plugin and theme you are not actively using. There is no benefit to keeping them installed. For themes, keep only the active theme and one backup theme (in case your active theme breaks after an update). Delete all others.</p>

        <h3>Step 4: Enable a Web Application Firewall</h3>
        <p>A WAF (Web Application Firewall) from Cloudflare, Sucuri, or Wordfence Premium blocks malicious traffic before it reaches your WordPress installation. It blocks known attack patterns, rate-limits login attempts to prevent brute-force attacks, blocks IP addresses with a history of malicious activity, and provides a buffer even when your plugins have unpatched vulnerabilities. A WAF alone will not stop a determined attacker with valid credentials, but it dramatically reduces the attack surface.</p>

        <h3>Step 5: Implement ongoing security monitoring</h3>
        <p>Once clean, you need to stay clean. This means daily automated scanning for file changes, new malware, and newly disclosed plugin vulnerabilities. Any unexpected change to a core WordPress file should trigger an immediate alert. An active <Link href="/wordpress-maintenance-uk">WordPress security protection</Link> or <Link href="/wordpress-security-retainer">security retainer</Link> handles this continuously — monitoring your site 24/7 and responding immediately when anything changes.</p>

        <h3>Step 6: Harden your WordPress configuration</h3>
        <p>After cleanup, apply security hardening to make future attacks significantly harder:</p>
        <ul>
          <li>Disable XML-RPC if you do not use it (a frequent attack vector)</li>
          <li>Restrict wp-admin access by IP address if your team works from fixed locations</li>
          <li>Enable two-factor authentication for all admin accounts</li>
          <li>Set correct file permissions (755 for directories, 644 for files, 600 for wp-config.php)</li>
          <li>Move wp-config.php one directory above the WordPress root if your hosting allows it</li>
          <li>Disable PHP execution in the uploads directory via .htaccess</li>
        </ul>

        <h2>When to call a professional</h2>
        <p>If your site has been hacked more than once, or if you have tried to clean it yourself and the infection returned, the most cost-effective path is a professional forensic cleanup. Security specialists know exactly where backdoors hide — including locations that basic tools never check — and have the tooling to find them all, not just the obvious ones.</p>
        <p>The cost of professional forensic recovery is almost always less than the cost of continued downtime, Google blacklisting, GDPR breach notification obligations, and repeat DIY cleanup attempts that do not resolve the root cause.</p>
        <p>WebAdish provides <Link href="/hacked-website-recovery-uk">emergency WordPress recovery</Link> for UK businesses. For repeat-hack cases, the stronger option is our post-hack forensic and hardening package: full file-level investigation, complete backdoor removal, credential rotation guidance, WAF configuration, hardening priorities, and a clear roadmap into ongoing protection.</p>
        <p>If you are still confirming whether the site is compromised, review the warning signs and first-hour actions in this guide, then move to our <Link href="/hacked-website-recovery-uk">hacked website recovery UK</Link> page if the incident is active. If you need a fixed-fee cleanup option, see our <Link href="/wordpress-malware-removal">WordPress malware removal service</Link>.</p>
      </BlogPostLayout>
    </>
  );
}
