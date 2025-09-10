import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { BlogHero } from '../../ui/blog/BlogHero';
import { BlogPostGrid } from '../../ui/blog/BlogPostGrid';
import { BlogCategories } from '../../ui/blog/BlogCategories';
import { BlogNewsletter } from '../../ui/blog/BlogNewsletter';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'Blog' });
  
  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'website',
      locale: params.locale,
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
    },
    alternates: {
      canonical: `/${params.locale}/blog`,
      languages: {
        'de': '/de/blog',
        'en': '/en/blog',
      },
    },
  };
}

export default function BlogPage({ params }: { params: { locale: string } }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
      <main>
        {/* Hero Section */}
        <BlogHero locale={params.locale as 'de' | 'en'} />
        
        {/* Categories */}
        <BlogCategories locale={params.locale as 'de' | 'en'} />
        
        {/* Blog Posts Grid */}
        <BlogPostGrid locale={params.locale as 'de' | 'en'} />
        
        {/* Newsletter Signup */}
        <BlogNewsletter locale={params.locale as 'de' | 'en'} />
      </main>
    </div>
  );
}
