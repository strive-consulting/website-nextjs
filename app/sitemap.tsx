import { getAllCmsPages, getAllCmsPagesForSiteMap, getAuthors, getBlogPostsAll, getBlogTags, getPartnerPostsAll } from '@/lib/cms'
import { linkResolver } from '@/prismicio'
import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const cmsPages = await getAllCmsPagesForSiteMap()
  const blogPosts = await getBlogPostsAll()
  const partnerPosts = await getPartnerPostsAll()
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

  //blog author pages
  const blogAuthors = await getAuthors()

  blogAuthors.map((author) => {
    transformedCmsPages.push({
      url: baseUrl + '/blog/author/' + author.uid.toLowerCase(),
      lastModified: new Date(),
    })
  })

  //Partner pages
  const transformedPartnerPages = partnerPosts.map((partner) => ({
    url: baseUrl + linkResolver(partner),
    lastModified: new Date(),
  }))
  transformedCmsPages.push(...transformedPartnerPages)

  transformedCmsPages.push({
    url: baseUrl + '/tools/cost-calculator',
    lastModified: new Date(),
  })

  transformedCmsPages.push({
    url: baseUrl + '/tools/business-name-checker',
    lastModified: new Date(),
  })

  transformedCmsPages.push({
    url: baseUrl + '',
    lastModified: new Date(),
  })

  return transformedCmsPages


}
