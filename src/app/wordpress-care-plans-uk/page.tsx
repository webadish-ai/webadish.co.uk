import { generatePageMetadata } from '@/lib/seo';
import BlogPostLayout from '@/components/BlogPostLayout';
import Link from 'next/link';

export const metadata = generatePageMetadata({
  title: 'WordPress Care Plans UK: What\'s Included and Which Plan Is Right for You',
  description:
    'A practical guide to WordPress care plans for UK businesses — what should be included, what to avoid, how much to pay, and how to choose between a care plan and a security retainer.',
  path: '/wordpress-care-plans-uk',
  type: 'article',
  publishedTime: '2026-04-19',
  modifiedTime: '2026-04-19',
});

const faqItems = [
  {
    question: 'What is a WordPress care plan?',
    answer:
      'A WordPress care plan is a recurring monthly service that covers the technical upkeep your site needs to stay secure, updated, and running reliably. A good care plan handles core and plugin updates, backups, uptime monitoring, and basic security checks — so site owners do not have to manage these tasks manually or reactively.',
  },
  {
    question: 'What should a WordPress care plan include?',
    answer:
      'At minimum: monthly core and plugin updates tested before deployment, daily or weekly offsite backups with tested restores, uptime monitoring, and basic security scanning. Better plans add staging-based update testing, priority support, performance checks, and a monthly allowance for small technical changes.',
  },
  {
    question: 'How much does a WordPress care plan cost in the UK?',
    answer:
      'Professional WordPress care plans in the UK typically range from £100–£500+ per month. WebAdish plans start at £149 per month for Essentials, £349 per month for Pro (covering WooCommerce and active lead-gen sites), and from £749 per month for Enterprise-level protection. Security-focused retainers for highly sensitive sites can range from £1,000–£3,000+ per month.',
  },
  {
    question: 'Is a WordPress care plan worth it?',
    answer:
      'For most business websites, yes. The cost of a care plan is significantly less than a single emergency recovery incident, which starts from £1,500 in the UK. Beyond direct costs, an unmanaged site risks SEO damage, customer data exposure, and GDPR liability. Care plans prevent most of those scenarios.',
  },
  {
    question: 'What is the difference between a WordPress care plan and a security retainer?',
    answer:
      'A care plan focuses on routine maintenance — updates, backups, monitoring. A security retainer provides a named specialist, deeper ongoing security work including audits and hardening, and a defined SLA for incident response. Revenue-critical sites — WooCommerce, lead-gen, membership platforms — typically need a retainer rather than a basic care plan.',
  },
  {
    question: 'Can I cancel a WordPress care plan at any time?',
    answer:
      'Quality UK providers offer month-to-month terms with no lock-in. Be cautious of any care plan requiring annual lock-in or non-refundable setup fees — these structures favour the provider, not the client. A confident provider offers flexible terms because they expect clients to stay based on value delivered.',
  },
];

export default function WordPressCareePlansUKPage() {
  return (
    <BlogPostLayout
      title="WordPress Care Plans UK: What's Included and Which Plan Is Right for You"
      lead="A WordPress care plan is a recurring monthly service that handles the technical upkeep your site needs to stay secure, updated, and running. This guide explains what UK businesses should expect to be covered, what is typically excluded, and how to choose the right level of support."
      datePublished="2026-04-19"
      dateModified="2026-04-19"
      category="Maintenance"
      slug="wordpress-care-plans-uk"
      summaryPoints={[
        'A care plan should include core and plugin updates, daily backups, uptime monitoring, and security scanning at minimum',
        'WooCommerce and lead-generation sites need higher-tier coverage than simple brochure sites',
        'Care plans prevent most of the problems that lead to emergency recovery costs of £1,500–£6,000',
        'Month-to-month plans with no lock-in are now standard from quality UK providers',
      ]}
      faqItems={faqItems}
    >
      <h2>What a WordPress care plan actually covers</h2>
      <p>
        The term &quot;care plan&quot; gets used loosely in the WordPress industry. Before signing up to
        anything, it is worth understanding what a well-structured plan should include as standard versus
        what providers sometimes charge extra for.
      </p>
      <p>
        A proper WordPress care plan covers five core areas:
      </p>
      <ul>
        <li>
          <strong>Core and plugin updates</strong> — tested before deployment, ideally on a staging
          environment, so a bad update does not take your live site offline.
        </li>
        <li>
          <strong>Offsite backups</strong> — daily backups stored in a location separate from your hosting
          account, with documented restore procedures. Backups stored on the same server as your site are
          largely useless if the server is compromised.
        </li>
        <li>
          <strong>Uptime monitoring</strong> — automated checks so someone is notified immediately if the
          site goes down, rather than discovering it hours later through a customer complaint.
        </li>
        <li>
          <strong>Basic security scanning</strong> — regular checks for known malware signatures, suspicious
          file changes, and blacklist status.
        </li>
        <li>
          <strong>Support access</strong> — a channel for reporting technical problems and a defined
          response time, even if that is next-business-day for non-emergencies.
        </li>
      </ul>

      <h2>What is usually not included in a care plan</h2>
      <p>
        Equally important is knowing where care plans stop. Most basic and mid-tier plans do not include:
      </p>
      <ul>
        <li>
          <strong>Emergency malware removal</strong> — if your site is hacked, most care plans treat
          recovery as a separate chargeable incident. Check whether your plan includes any recovery coverage
          or whether you would need to pay separately.
        </li>
        <li>
          <strong>Content changes or design work</strong> — care plans cover maintenance, not development.
          Adding new pages, changing layouts, or editing copy is typically outside scope.
        </li>
        <li>
          <strong>Performance optimisation</strong> — basic plans monitor uptime but do not proactively
          improve page speed. If your site is slow, that is usually a separate project.
        </li>
        <li>
          <strong>Proactive security hardening</strong> — unless you are on a security-focused plan, most
          care plans do not include firewall configuration, two-factor enforcement, or active vulnerability
          remediation.
        </li>
      </ul>
      <p>
        The gap between &quot;technically maintained&quot; and &quot;genuinely protected&quot; is where most
        UK businesses get caught out. A site can be on a care plan and still get hacked because updates were
        applied but no hardening was ever done.
      </p>

      <h2>Choosing the right level for your site type</h2>
      <p>
        Not every WordPress site needs the same level of care. The right plan depends on what your site does
        commercially and what the cost of downtime or a breach actually is for your business.
      </p>
      <ul>
        <li>
          <strong>Brochure and informational sites</strong> — a basic plan covering updates, backups, and
          uptime monitoring is usually sufficient. These sites carry lower risk and lower breach impact.
          Budget: £149/month (Essentials tier).
        </li>
        <li>
          <strong>Lead-generation sites</strong> — sites that capture contact forms, enquiries, or
          appointments are storing personal data and generating direct commercial value. They need staging-
          tested updates, daily backups, security scanning, and faster response SLAs.
          Budget: £349/month (Pro tier).
        </li>
        <li>
          <strong>WooCommerce and ecommerce sites</strong> — payment processing, customer accounts, and
          order history create GDPR obligations and higher breach consequences. These sites need security
          hardening, checkout regression testing after updates, and ideally a provider with ecommerce
          experience. Budget: £749+/month (Enterprise tier) or a full security retainer.
        </li>
        <li>
          <strong>Membership and subscription sites</strong> — ongoing user access, payment data, and
          account security make these sites particularly sensitive. Full security retainer coverage is
          typically more appropriate than a basic care plan.
        </li>
      </ul>

      <h2>What to look for in a UK WordPress care plan provider</h2>
      <p>
        The care plan market in the UK ranges from solo freelancers managing dozens of sites on automation to
        specialist agencies with dedicated processes. Before committing, ask:
      </p>
      <ul>
        <li>
          <strong>How are updates tested?</strong> Updates pushed directly to a live site without staging
          are a common cause of downtime. Any provider worth paying tests changes before they go live.
        </li>
        <li>
          <strong>Where are backups stored?</strong> Offsite storage to a separate cloud environment is the
          minimum. Ask whether restores are tested periodically — backups that have never been tested are
          not reliable.
        </li>
        <li>
          <strong>What is the actual response SLA?</strong> &quot;We&apos;ll get back to you soon&quot; is
          not an SLA. A good provider defines response times clearly — for example, two hours for critical
          issues, one business day for general requests.
        </li>
        <li>
          <strong>What happens if the site gets hacked?</strong> Understand before you sign up whether
          recovery is included, covered at a discount, or billed at full rate. Some plans include one annual
          clean; others treat recovery as entirely separate.
        </li>
        <li>
          <strong>Is it month-to-month?</strong> Quality providers offer flexible terms. Lock-in contracts
          beyond three months should be viewed critically.
        </li>
      </ul>

      <h2>WordPress care plan vs security retainer: which do you need?</h2>
      <p>
        A care plan and a{' '}
        <Link href="/wordpress-security-retainer">security retainer</Link> serve different purposes and are
        not interchangeable.
      </p>
      <p>
        A care plan is operational maintenance — it keeps the site running and updated. A security retainer
        goes deeper: a named engineer, proactive hardening, regular security audits, active vulnerability
        monitoring, and a contractual SLA for emergency response.
      </p>
      <p>
        If your site is a significant commercial asset — generating leads, processing payments, or holding
        customer data at scale — a basic care plan is a floor, not a ceiling. The cost of a security
        incident on a revenue-critical site typically far exceeds what a retainer costs over the same period.
      </p>
      <p>
        As a rough guide: if you would notice significant financial or reputational impact within 24 hours of
        your site going down or being hacked, you need retainer-level coverage rather than a basic care
        plan.
      </p>
      <p>
        View our{' '}
        <Link href="/wordpress-maintenance-uk">WordPress maintenance service</Link> to see how WebAdish
        structures coverage across different site types, or{' '}
        <Link href="/contact">get in touch</Link> if you are unsure which level is right for your
        situation.
      </p>
    </BlogPostLayout>
  );
}
