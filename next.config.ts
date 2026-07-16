import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Consolidated maintenance cluster (2026-07): plans page merged into the hub
      { source: '/wordpress-maintenance-plans', destination: '/wordpress-maintenance-uk', statusCode: 301 },
      // Legacy core pages
      { source: '/about', destination: '/about-webadish-web-agency', statusCode: 301 },
      { source: '/contact-webadish-web-design', destination: '/contact', statusCode: 301 },
      { source: '/portfolio', destination: '/web-design-portfolio', statusCode: 301 },
      { source: '/services', destination: '/web-design-services', statusCode: 301 },

      // Legacy service slugs
      { source: '/wordpress-maintenance', destination: '/wordpress-maintenance-uk', statusCode: 301 },
      { source: '/wordpress-maintenance-uk-london', destination: '/wordpress-maintenance-uk', statusCode: 301 },
      { source: '/hacked-website-recovery', destination: '/hacked-website-recovery-uk', statusCode: 301 },
      { source: '/hacked-site-recovery', destination: '/hacked-website-recovery-uk', statusCode: 301 },
      { source: '/web-development', destination: '/web-development-services', statusCode: 301 },
      { source: '/web-hosting', destination: '/web-hosting-email-services', statusCode: 301 },
      { source: '/hosting-email', destination: '/web-hosting-email-services', statusCode: 301 },

      // Removed off-brand pages → redirect to relevant pages
      { source: '/branding-services', destination: '/about-webadish-web-agency', statusCode: 301 },
      { source: '/digital-marketing-london', destination: '/', statusCode: 301 },
      { source: '/digital-marketing', destination: '/', statusCode: 301 },
      { source: '/custom-web-design-services-london', destination: '/web-design-services', statusCode: 301 },
      { source: '/custom-web-design', destination: '/web-design-services', statusCode: 301 },

      // Removed Australia pages → redirect to UK equivalents
      { source: '/wordpress-maintenance-australia', destination: '/wordpress-maintenance-uk', statusCode: 301 },
      { source: '/wordpress-maintenance-au', destination: '/wordpress-maintenance-uk', statusCode: 301 },
      { source: '/hacked-website-recovery-australia', destination: '/hacked-website-recovery-uk', statusCode: 301 },

      // Special offers → Security audit page
      { source: '/special-offers', destination: '/wordpress-security-audit', statusCode: 301 },

      // Blog rename
      { source: '/web-design-blog', destination: '/blog', statusCode: 301 },

      // Redirect generic web design blog posts to blog index
      { source: '/10-inspiring-beautifully-designed-websites', destination: 'https://www.webadish.com/web-design', statusCode: 301 },
      { source: '/10-inspiring-beautifully-designed-websites/', destination: 'https://www.webadish.com/web-design', statusCode: 301 },
      { source: '/the-top-web-design-trends-to-watch-in-2024', destination: '/blog', statusCode: 301 },
      { source: '/a-comprehensive-website-solution-for-your-businesss-online-growth-waas', destination: '/blog', statusCode: 301 },

      // Policies
      { source: '/terms', destination: '/terms-conditions', statusCode: 301 },
      { source: '/privacy', destination: '/privacy-policy', statusCode: 301 },

      // Old WordPress 404s from GSC coverage report (2026-03-09)
      { source: '/ai-trends-for-web-designers', destination: '/blog', statusCode: 301 },
      { source: '/ai-trends-for-web-designers/', destination: '/blog', statusCode: 301 },
      { source: '/web-design-development-email-hosting-services', destination: '/web-hosting-email-services', statusCode: 301 },
      { source: '/web-design-development-email-hosting-services/', destination: '/web-hosting-email-services', statusCode: 301 },
      { source: '/design', destination: '/web-design-services', statusCode: 301 },
      { source: '/design/', destination: '/web-design-services', statusCode: 301 },
      { source: '/support-hosting', destination: '/web-hosting-email-services', statusCode: 301 },
      { source: '/support-hosting/', destination: '/web-hosting-email-services', statusCode: 301 },

      // Old WordPress blog posts & author archives (from GSC "Crawled not indexed" report 2026-03-11)
      { source: '/10-common-web-design-mistakes-to-avoid', destination: 'https://www.webadish.com/web-design', statusCode: 301 },
      { source: '/10-common-web-design-mistakes-to-avoid/', destination: 'https://www.webadish.com/web-design', statusCode: 301 },
      { source: '/author/:path*', destination: '/about-webadish-web-agency', statusCode: 301 },

      // Old WordPress hacked-site post → new blog post (357 impressions, consolidate link equity)
      { source: '/signs-your-wordpress-website-has-been-hacked-and-what-to-do-next-in-london', destination: '/wordpress-site-keeps-getting-hacked', statusCode: 301 },
      { source: '/signs-your-wordpress-website-has-been-hacked-and-what-to-do-next-in-london/', destination: '/wordpress-site-keeps-getting-hacked', statusCode: 301 },
      { source: '/gdpr-wordpress-security-uk-business-owners', destination: '/gdpr-wordpress-security', statusCode: 301 },
      { source: '/gdpr-wordpress-security-uk-business-owners/', destination: '/gdpr-wordpress-security', statusCode: 301 },

      // WordPress-specific paths (from old WordPress site — fix 404s + 403s in GSC)
      { source: '/wp-login.php', destination: '/', statusCode: 301 },
      { source: '/xmlrpc.php', destination: '/', statusCode: 301 },
      { source: '/wp-admin', destination: '/', statusCode: 301 },
      { source: '/wp-admin/:path*', destination: '/', statusCode: 301 },
      { source: '/wp-content/:path*', destination: '/', statusCode: 301 },
      { source: '/wp-includes/:path*', destination: '/', statusCode: 301 },
      { source: '/wp-json/:path*', destination: '/', statusCode: 301 },
      { source: '/feed', destination: '/blog', statusCode: 301 },
      { source: '/feed/', destination: '/blog', statusCode: 301 },
      // Note: /?feed=rss2 (query string) cannot be matched in Next.js redirect source
      // — handled at Cloudflare level or ignored (negligible traffic)
    ];
  },
};

export default nextConfig;
