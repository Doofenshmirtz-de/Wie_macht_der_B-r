import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://wiemachtderbaer.com'
  const lastModified = new Date()

  return [
    // Homepage (Deutsch)
    {
      url: `${baseUrl}/de`,
      lastModified,
      changeFrequency: 'daily',
      priority: 1,
      alternates: {
        languages: {
          en: `${baseUrl}/en`,
          de: `${baseUrl}/de`,
        },
      },
    },
    // Homepage (English)
    {
      url: `${baseUrl}/en`,
      lastModified,
      changeFrequency: 'daily', 
      priority: 1,
      alternates: {
        languages: {
          en: `${baseUrl}/en`,
          de: `${baseUrl}/de`,
        },
      },
    },
    // Root redirect
    {
      url: baseUrl,
      lastModified,
      changeFrequency: 'daily',
      priority: 1,
    },
    // Bomb Party Game (Deutsch)
    {
      url: `${baseUrl}/de/game/bomb`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
      alternates: {
        languages: {
          en: `${baseUrl}/en/game/bomb`,
          de: `${baseUrl}/de/game/bomb`,
        },
      },
    },
    // Bomb Party Game (English)
    {
      url: `${baseUrl}/en/game/bomb`,
      lastModified,
      changeFrequency: 'weekly',
      priority: 0.9,
      alternates: {
        languages: {
          en: `${baseUrl}/en/game/bomb`,
          de: `${baseUrl}/de/game/bomb`,
        },
      },
    },
  ]
}