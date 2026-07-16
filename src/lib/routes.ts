export interface RouteConfig {
  path: string;
  label: string;
  priority: number;
  changeFreq: 'daily' | 'weekly' | 'monthly' | 'yearly';
  lastModified: string;
}

export const SERVICE_ROUTES: RouteConfig[] = [
  {
    path: '/wordpress-security-audit',
    label: 'WordPress Security Audit',
    priority: 0.9,
    changeFreq: 'monthly',
    lastModified: '2026-04-11',
  },
  {
    path: '/wordpress-maintenance-uk',
    label: 'WordPress Maintenance',
    priority: 0.9,
    changeFreq: 'monthly',
    lastModified: '2026-07-16',
  },
  {
    path: '/hacked-website-recovery-uk',
    label: 'Hacked Website Recovery',
    priority: 0.9,
    changeFreq: 'monthly',
    lastModified: '2026-06-28',
  },
  {
    path: '/wordpress-malware-removal',
    label: 'WordPress Malware Removal',
    priority: 0.9,
    changeFreq: 'monthly',
    lastModified: '2026-06-28',
  },
  {
    path: '/wordpress-security-retainer',
    label: 'Security Retainer',
    priority: 0.9,
    changeFreq: 'monthly',
    lastModified: '2026-06-28',
  },
  {
    path: '/web-hosting-email-services',
    label: 'Secure WordPress Hosting',
    priority: 0.8,
    changeFreq: 'monthly',
    lastModified: '2026-03-03',
  },
];

export const CONTENT_ROUTES: RouteConfig[] = [
  {
    path: '/pricing',
    label: 'Pricing',
    priority: 0.9,
    changeFreq: 'monthly',
    lastModified: '2026-04-11',
  },
  {
    path: '/gdpr-wordpress-security',
    label: 'GDPR WordPress Security',
    priority: 0.8,
    changeFreq: 'monthly',
    lastModified: '2026-03-21',
  },
  {
    path: '/case-studies',
    label: 'Case Studies',
    priority: 0.8,
    changeFreq: 'monthly',
    lastModified: '2026-03-03',
  },
  {
    path: '/blog',
    label: 'Blog',
    priority: 0.7,
    changeFreq: 'weekly',
    lastModified: '2026-03-03',
  },
  {
    path: '/about-webadish-web-agency',
    label: 'About',
    priority: 0.7,
    changeFreq: 'monthly',
    lastModified: '2026-03-03',
  },
  {
    path: '/contact',
    label: 'Contact',
    priority: 0.7,
    changeFreq: 'monthly',
    lastModified: '2026-03-03',
  },
];

export const SECONDARY_ROUTES: RouteConfig[] = [
  {
    path: '/wordpress-security-scanner',
    label: 'Free WordPress Security Scanner',
    priority: 0.9,
    changeFreq: 'monthly',
    lastModified: '2026-06-03',
  },
  {
    path: '/partners',
    label: 'Partner Programme',
    priority: 0.7,
    changeFreq: 'monthly',
    lastModified: '2026-06-04',
  },
  {
    path: '/web-design-services',
    label: 'Secure WordPress Design',
    priority: 0.7,
    changeFreq: 'monthly',
    lastModified: '2026-03-03',
  },
  {
    path: '/web-development-services',
    label: 'WordPress Security Development',
    priority: 0.7,
    changeFreq: 'monthly',
    lastModified: '2026-03-03',
  },
  {
    path: '/web-design-portfolio',
    label: 'Portfolio',
    priority: 0.6,
    changeFreq: 'monthly',
    lastModified: '2026-03-03',
  },
];

export const LEGAL_ROUTES: RouteConfig[] = [
  {
    path: '/privacy-policy',
    label: 'Privacy Policy',
    priority: 0.3,
    changeFreq: 'yearly',
    lastModified: '2026-01-01',
  },
  {
    path: '/terms-conditions',
    label: 'Terms & Conditions',
    priority: 0.3,
    changeFreq: 'yearly',
    lastModified: '2026-01-01',
  },
];

export const ALL_ROUTES = [
  { path: '/', label: 'Home', priority: 1.0, changeFreq: 'weekly' as const, lastModified: '2026-04-11' },
  ...SERVICE_ROUTES,
  ...CONTENT_ROUTES,
  ...SECONDARY_ROUTES,
  ...LEGAL_ROUTES,
];
