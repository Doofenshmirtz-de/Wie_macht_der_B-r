import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { BlogHero } from '../../ui/blog/BlogHero';
import { BlogPostGrid } from '../../ui/blog/BlogPostGrid';
import { BlogCategories } from '../../ui/blog/BlogCategories';
import { BlogNewsletter } from '../../ui/blog/BlogNewsletter';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Blog' });
  
  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'website',
      locale: locale,
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
    },
    alternates: {
      canonical: `/${locale}/blog`,
      languages: {
        'de': '/de/blog',
        'en': '/en/blog',
      },
    },
  };
}

export default async function BlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <main>
        {/* Hero Section */}
        <BlogHero locale={locale as 'de' | 'en'} />
        
        {/* Categories */}
        <BlogCategories locale={locale as 'de' | 'en'} />
        
        {/* Blog Posts Grid */}
        <BlogPostGrid locale={locale as 'de' | 'en'} />
        
        {/* Newsletter Signup */}
        <BlogNewsletter locale={locale as 'de' | 'en'} />
      </main>
    </div>
  );
}
