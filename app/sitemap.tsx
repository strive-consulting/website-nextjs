import { getAllCmsPages, getAllCmsPagesForSiteMap, getBlogPostsAll, getBlogTags } from '@/lib/cms'
import { linkResolver } from '@/prismicio'
import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const cmsPages = await getAllCmsPagesForSiteMap()
  const blogPosts = await getBlogPostsAll()
  const baseUrl = process.env.BASE_URL ?? ''

  const transformedCmsPages = cmsPages.map((page) => ({
    url: baseUrl + linkResolver(page),
    lastModified: new Date(),
  }))

  const transformedBlogPosts = blogPosts.map((post) => ({
    url: baseUrl + linkResolver(post),
    lastModified: new Date(),
  }))

  transformedCmsPages.push(...transformedBlogPosts)

  //Generate pages for blog tags
  const blogTags = await getBlogTags()

  blogTags.map((tag) => {
    transformedCmsPages.push({
      url: baseUrl + '/blog/tag/' + tag.toLowerCase(),
      lastModified: new Date(),
    })
  })

  transformedCmsPages.push({
    url: baseUrl + '',
    lastModified: new Date(),
  })

  return transformedCmsPages

  // return [
  //   {
  //     url: 'https://strive.ae',
  //     lastModified: new Date(),
  //   },
  // ]
}
