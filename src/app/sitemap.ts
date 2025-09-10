import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.wie-macht-der-baer.de'
  const lastModified = new Date()

  return [
    // Homepage - Höchste Priorität
    {
      url: `${baseUrl}/de`,
      lastModified,
      changeFrequency: 'daily',
      priority: 1.0,
      alternates: {
        languages: {
          en: `${baseUrl}/en`,
          de: `${baseUrl}/de`,
        },
      },
    },
    {
      url: `${baseUrl}/en`,
      lastModified,
      changeFrequency: 'daily', 
      priority: 0.9,
      alternates: {
        languages: {
          en: `${baseUrl}/en`,
          de: `${baseUrl}/de`,
        },
      },
    },
    {
      url: baseUrl,
      lastModified,
      changeFrequency: 'daily',
      priority: 0.8,
    },

    // 🔥 BOMB PARTY - Hauptspiel (Höchste Game-Priorität)
    {
      url: `${baseUrl}/de/game/bomb`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.95,
      alternates: {
        languages: {
          en: `${baseUrl}/en/game/bomb`,
          de: `${baseUrl}/de/game/bomb`,
        },
      },
    },
    {
      url: `${baseUrl}/en/game/bomb`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.85,
      alternates: {
        languages: {
          en: `${baseUrl}/en/game/bomb`,
          de: `${baseUrl}/de/game/bomb`,
        },
      },
    },

    // 🤫 ICH HAB NOCH NIE - Beliebtes Trinkspiel
    {
      url: `${baseUrl}/de/game/neverhaveiever`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
      alternates: {
        languages: {
          en: `${baseUrl}/en/game/neverhaveiever`,
          de: `${baseUrl}/de/game/neverhaveiever`,
        },
      },
    },
    {
      url: `${baseUrl}/en/game/neverhaveiever`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
      alternates: {
        languages: {
          en: `${baseUrl}/en/game/neverhaveiever`,
          de: `${baseUrl}/de/game/neverhaveiever`,
        },
      },
    },

    // 💣 WAHRHEIT ODER PFLICHT - Partykracher
    {
      url: `${baseUrl}/de/game/truthordare`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
      alternates: {
        languages: {
          en: `${baseUrl}/en/game/truthordare`,
          de: `${baseUrl}/de/game/truthordare`,
        },
      },
    },
    {
      url: `${baseUrl}/en/game/truthordare`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.8,
      alternates: {
        languages: {
          en: `${baseUrl}/en/game/truthordare`,
          de: `${baseUrl}/de/game/truthordare`,
        },
      },
    },

    // 📱 OFFLINE PAGE - PWA Support
    {
      url: `${baseUrl}/de/offline`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.3,
      alternates: {
        languages: {
          en: `${baseUrl}/en/offline`,
          de: `${baseUrl}/de/offline`,
        },
      },
    },
    {
      url: `${baseUrl}/en/offline`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.25,
      alternates: {
        languages: {
          en: `${baseUrl}/en/offline`,
          de: `${baseUrl}/de/offline`,
        },
      },
    },

    // 📰 BLOG SEITEN - Content Marketing
    {
      url: `${baseUrl}/de/blog`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.7,
      alternates: {
        languages: {
          en: `${baseUrl}/en/blog`,
          de: `${baseUrl}/de/blog`,
        },
      },
    },
    {
      url: `${baseUrl}/en/blog`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.6,
      alternates: {
        languages: {
          en: `${baseUrl}/en/blog`,
          de: `${baseUrl}/de/blog`,
        },
      },
    },

    // ❓ FAQ SEITEN - Wichtig für SEO & User Support
    {
      url: `${baseUrl}/de/faq`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.8,
      alternates: {
        languages: {
          en: `${baseUrl}/en/faq`,
          de: `${baseUrl}/de/faq`,
        },
      },
    },
    {
      url: `${baseUrl}/en/faq`,
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
      alternates: {
        languages: {
          en: `${baseUrl}/en/faq`,
          de: `${baseUrl}/de/faq`,
        },
      },
    },

    // 🎯 ZUKÜNFTIGE LEGAL SEITEN (auskommentiert)
    /*
    {
      url: `${baseUrl}/de/datenschutz`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.4,
    },
    {
      url: `${baseUrl}/de/impressum`,
      lastModified,
      changeFrequency: 'yearly',
      priority: 0.4,
    },
    */
  ]
}