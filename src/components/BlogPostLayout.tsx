import type { ReactNode } from 'react';
import Link from 'next/link';
import StructuredData from '@/components/StructuredData';
import { generateArticleSchema, generateBreadcrumbSchema, generateFAQSchema } from '@/lib/schema';
import styles from './BlogPostLayout.module.scss';

interface BlogPostLayoutProps {
  title: string;
  lead: string;
  kicker?: string;
  children: ReactNode;
  ctaText?: string;
  datePublished?: string;
  dateModified?: string;
  author?: string;
  category?: string;
  slug?: string;
  summaryPoints?: string[];
  faqItems?: { question: string; answer: string }[];
}

export default function BlogPostLayout({
  title,
  lead,
  kicker = 'WordPress Security',
  children,
  ctaText,
  datePublished,
  dateModified,
  author = 'WebAdish',
  category,
  slug,
  summaryPoints,
  faqItems,
}: BlogPostLayoutProps) {
  const schemas = [];

  if (slug && datePublished) {
    schemas.push(
      generateArticleSchema(
        title,
        lead,
        datePublished,
        dateModified || datePublished,
        `/${slug}`
      )
    );
  }

  schemas.push(
    generateBreadcrumbSchema([
      { name: 'Home', url: '/' },
      { name: 'Blog', url: '/blog' },
      { name: title, url: `/${slug || ''}` },
    ])
  );

  if (faqItems && faqItems.length > 0) {
    schemas.push(generateFAQSchema(faqItems));
  }

  return (
    <main className={styles.wrapper}>
      {schemas.length > 0 && <StructuredData schemas={schemas} />}

      <article className={`container ${styles.article}`}>
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" style={{ fontSize: '0.85rem', color: '#a1a1aa', marginBottom: '1.5rem' }}>
          <Link href="/" style={{ color: '#a1a1aa' }}>Home</Link>
          <span style={{ margin: '0 0.5rem' }}>/</span>
          <Link href="/blog" style={{ color: '#a1a1aa' }}>Blog</Link>
          <span style={{ margin: '0 0.5rem' }}>/</span>
          <span style={{ color: 'var(--foreground)' }}>{title}</span>
        </nav>

        <span className={styles.kicker}>{category || kicker}</span>
        <h1 className={styles.title}>{title}</h1>

        {/* Meta line */}
        {(datePublished || author) && (
          <div style={{ fontSize: '0.9rem', color: '#a1a1aa', marginBottom: '1.5rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            {author && <span>By {author}</span>}
            {datePublished && (
              <time dateTime={datePublished}>
                {new Date(datePublished).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}
              </time>
            )}
          </div>
        )}

        <p className={styles.lead}>{lead}</p>

        {/* Summary box */}
        {summaryPoints && summaryPoints.length > 0 && (
          <div style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '12px',
            padding: '1.5rem',
            marginBottom: '2rem',
          }}>
            <strong style={{ color: 'var(--primary)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Key Takeaways
            </strong>
            <ul style={{ marginTop: '0.75rem', paddingLeft: '1.25rem', lineHeight: '1.8' }}>
              {summaryPoints.map((point, i) => (
                <li key={i} style={{ color: 'var(--foreground)' }}>{point}</li>
              ))}
            </ul>
          </div>
        )}

        <div className={styles.content}>{children}</div>

        <div
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: '12px',
            padding: '1.5rem',
            marginTop: '2rem',
          }}
        >
          <h3 style={{ marginTop: 0, marginBottom: '0.75rem' }}>Related Recovery Resources</h3>
          <p style={{ color: '#a1a1aa', lineHeight: 1.6, marginTop: 0 }}>
            If this article is part of an active incident, use these core pages next.
          </p>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: '0.75rem',
            }}
          >
            {[
              { href: '/wordpress-security-scanner', label: 'Free WordPress Security Scan' },
              { href: '/hacked-website-recovery-uk', label: 'Hacked Website Recovery UK' },
              { href: '/wordpress-malware-removal', label: 'WordPress Malware Removal' },
              { href: '/wordpress-site-keeps-getting-hacked', label: 'Why Sites Keep Getting Hacked' },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  border: '1px solid var(--border)',
                  borderRadius: '10px',
                  padding: '0.9rem 1rem',
                  textDecoration: 'none',
                  color: 'var(--foreground)',
                  fontWeight: 600,
                }}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>

        {ctaText ? <p className={styles.cta}>{ctaText}</p> : (
          <div style={{
            background: 'linear-gradient(135deg, var(--surface), rgba(99, 102, 241, 0.1))',
            border: '1px solid var(--border)',
            borderRadius: '12px',
            padding: '2rem',
            marginTop: '3rem',
            textAlign: 'center',
          }}>
            <h3 style={{ color: 'var(--foreground)', marginBottom: '0.75rem' }}>Need Help With WordPress Security?</h3>
            <p style={{ color: '#a1a1aa', marginBottom: '1.25rem' }}>
              Run a free instant scan to check for malware and blacklisting, or speak to our team about protecting your WordPress site.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/wordpress-security-scanner" className="btn btn-primary">
                Scan My Site Free
              </Link>
              <Link href="/contact" className="btn btn-secondary">
                Request a Security Review
              </Link>
            </div>
          </div>
        )}
      </article>
    </main>
  );
}
