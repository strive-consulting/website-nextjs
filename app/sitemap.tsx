import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://strive.ae',
      lastModified: new Date(),
    },
  ]
}
