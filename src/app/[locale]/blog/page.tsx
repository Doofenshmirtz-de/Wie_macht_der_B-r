import { Metadata } from 'next';
import { BlogHero } from '../../ui/blog/BlogHero';
import { BlogPostGrid } from '../../ui/blog/BlogPostGrid';
import { BlogCategories } from '../../ui/blog/BlogCategories';
import { BlogNewsletter } from '../../ui/blog/BlogNewsletter';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const metadata = {
    de: {
      title: "Blog - Trinkspiele Magazin | Wie macht der Bär",
      description: "Entdecke die besten Tipps, Trends und Geheimnisse für unvergessliche Partys. Von klassischen Trinkspielen bis zu Online-Trends - dein Magazin für den perfekten Partyabend!",
      keywords: "Trinkspiele Blog, Partyplanung, Trinkspiele Tipps, Online Trinkspiele, Partyspiele Magazin, Saufspiele Guide, Drinking Games Blog"
    },
    en: {
      title: "Blog - Drinking Games Magazine | Bear Party",
      description: "Discover the best tips, trends and secrets for unforgettable parties. From classic drinking games to online trends - your magazine for the perfect party night!",
      keywords: "Drinking Games Blog, Party Planning, Drinking Games Tips, Online Drinking Games, Party Games Magazine, Drinking Games Guide"
    }
  };
  
  const t = metadata[locale as keyof typeof metadata] || metadata.de;
  
  return {
    title: t.title,
    description: t.description,
    keywords: t.keywords,
    openGraph: {
      title: t.title,
      description: t.description,
      type: 'website',
      locale: locale,
    },
    twitter: {
      card: 'summary_large_image',
      title: t.title,
      description: t.description,
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
