import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      //   Disable static and nextjs image.
      disallow:  '/_next/'
      //   disallow: '/private/',
    },
    sitemap: 'https://strive.ae/sitemap.xml',
  }
}
