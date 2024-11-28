import { createClient } from '@/prismicio'
import { notFound } from 'next/navigation'
import * as prismic from '@prismicio/client'
import { blogTagNameCleaner, toTitleCase } from './helpers'

export async function getTestimonials(maxcount?: number) {
  const client = createClient()

  const testimonials = await client
    .getAllByType('testimonial', {
      orderings: [
        { field: 'my.testimonial.date_received', direction: 'desc' },
        { field: 'my.testimonial.order', direction: 'desc' },
      ],
      limit: maxcount ? maxcount : undefined,
    })
    .catch(() => notFound())

  return testimonials
}

export async function getTestimonial(uid: string) {
  const client = createClient()

  const testimonial = await client.getByUID('testimonial', uid, {}).catch(() => notFound())

  return testimonial
}

export async function getFreeZones() {
  const client = createClient()

  const freeZones = await client
    .getAllByType('free_zone', {
      orderings: [{ field: 'my.free_zone.order', direction: 'asc' }],
    })
    .catch(() => notFound())

  return freeZones
}

//Note, servicepage is the name of our general cms page
export async function getCmsPage(uid: string) {
  const client = createClient()
  const page = await client
    .getByUID('servicepage', uid, {
      fetchLinks: ['author.name', 'author.job_title', 'author.avatar', 'author.linkedin_url'],
    })
    .catch(() => notFound())

  return page

  //WORKS!
  //how to fetch
  /// ...primaryFields  //this gets all the fields of the slice. Or you can fetch each one
  // const page = await client.getByUID('servicepage', uid, {
  //   graphQuery: `{
  //     servicepage {
  //       slices {
  //         ...on description_quote {
  //           variation {
  //             ...on default {
  //               primary {
  //                 title
  //                 description
  //                 quote_author {
  //                   ...on author {
  //                     ...authorFields
  //                   }
  //                 }
  //               }
  //             }
  //           }
  //         }
  //       }
  //     }
  //   }`
  // });

  //console.log(page)

  //return page
}

export async function getAllCmsPages() {
  const client = createClient()
  const pages = await client.getAllByType('servicepage').catch(() => notFound())

  return pages
}

export async function getAllCmsPagesForSiteMap() {
  const client = createClient()
  const pages = await client
    .getAllByType('servicepage', {
      filters: [prismic.filter.not('my.servicepage.exclude_from_sitemap', true)],
    })
    .catch(() => notFound())
  return pages
}

export async function getGlobalNav() {
  const client = createClient()
  const nav = await client.getSingle('global_nav').catch(() => notFound())

  return nav
}

export async function getFooter() {
  const client = createClient()
  const footer = await client.getSingle('footer').catch(() => notFound())

  return footer
}

export async function getBlogPosts() {
  const client = createClient()
  const blogPosts = await client
    .getAllByType('blog_post', {
      orderings: [{ field: 'my.blog_post.published_date', direction: 'desc' }],
    })
    .catch(() => notFound())

  return blogPosts
}

export async function getBlogPostsPaged(pagenum: number = 1, pageSize?: number, tag?: string, blogPostToExcludeUid?: string) {
  const client = createClient()

  //PageSize is only set when we are fetching a few posts for a slice.
  pageSize = pageSize ? pageSize : pagenum === 1 ? 7 : 6

  //note, Tags are case sensitive in Prismic so we must follow the title case convention to make this work.

  const filters: string[] = []
  const tagFilter = tag && filters.push(prismic.filter.at('document.tags', [blogTagNameCleaner(tag)]))
  const postExcludeFilter = blogPostToExcludeUid && filters.push(prismic.filter.not('my.blog_post.uid', blogPostToExcludeUid.toString()))
  // console.log(filters)
  const communityPosts = await client
    .getByType('blog_post', {
      fetchLinks: ['author.name', 'author.job_title', 'author.avatar', 'author.linkedin_url', 'author.uid'],
      orderings: [{ field: 'my.blog_post.published_date', direction: 'desc' }],
      // filters: tag && [prismic.filter.at('document.tags', [toTitleCase(tag)])],

      filters: filters,
      // predicates: [predicate.at("my.community.most_popular",
      // {
      //   { orderings : '[document.first_publication_date desc]' }
      // })],
      pageSize: pageSize,
      page: pagenum,
    })
    .catch(() => notFound())

  //   Note, non paged
  // const popularPosts = await client.getAllByType("community", {
  //   predicates: [predicate.at("my.community.most_popular", true)],
  //   orderings: [{ field: "my.community.published_date", direction: "desc" }],
  // });

  // console.log(communityPosts.results);

  //console.log('pages=', communityPosts.results.length)

  return {
    generalPosts: communityPosts.results,
    // popularPosts,

    active_page: pagenum,
    total_pages: communityPosts.total_pages,
    next_page: communityPosts.next_page ? true : false,
    prev_page: communityPosts.prev_page ? true : false,
  }
}

export async function getBlogPost(name: string) {
  const client = createClient()

  const communityPost = await client
    .getByUID('blog_post', name, {
      fetchLinks: ['author.name', 'author.job_title', 'author.avatar', 'author.linkedin_url', 'author.uid'],
    })
    .catch(() => notFound())

  return communityPost
}

export async function getBlogPostsAll() {
  const client = createClient()

  const communityPosts = await client
    .getByType('blog_post', {
      fetchLinks: ['author.name', 'author.job_title', 'author.avatar', 'author.linkedin_url', 'author.uid'],
      orderings: [{ field: 'my.blog_post.published_date', direction: 'desc' }],
    })
    .catch(() => notFound())

  return communityPosts.results
}

export async function getBlogTags() {
  const client = createClient()

  //iterate through all blogs to find the unique tags
  //TODO. Will require future paging as the default page size is 100
  const communityPosts = await client.getByType('blog_post', {}).catch(() => notFound())

  let tags: string[] = []

  communityPosts.results.map((item) => {
    tags = [...tags, ...item.tags]
  })

  return Array.from(new Set(tags)) //unique values only
}

export async function getLandingPage(uid: string) {
  const client = createClient()
  const page = await client
    .getByUID('landingpage', uid, {
      fetchLinks: ['author.name', 'author.job_title', 'author.avatar', 'author.linkedin_url', 'testimonial.name', 'testimonial.job_title', 'testimonial.avatar', 'testimonial.description'],
    })
    .catch(() => notFound())

  return page
}

export async function getAllLandingPages() {
  const client = createClient()
  const pages = await client.getAllByType('landingpage').catch(() => notFound())

  return pages
}

export async function getAuthors() {
  const client = createClient()

  const authors = await client
    .getByType('author', {
      fetchLinks: ['name', 'job_title', 'avatar', 'linkedin_url'],
      orderings: [{ field: 'my.author.name', direction: 'desc' }],
    })
    .catch(() => notFound())

  return authors.results
}

export async function getAuthor(name: string) {
  const client = createClient()

  const author = await client
    .getByUID('author', name, {
      fetchLinks: ['name', 'job_title', 'avatar', 'linkedin_url'],
    })
    .catch(() => notFound())

  return author
}

export async function getBlogPostsByAuthorPaged(pagenum: number = 1, pageSize?: number, authorUid?: string) {
  const client = createClient()

  const communityPosts = await client
    .getByType('blog_post', {
      fetchLinks: ['author.name', 'author.job_title', 'author.avatar', 'author.linkedin_url'],
      orderings: [{ field: 'my.blog_post.published_date', direction: 'desc' }],
      filters: [prismic.filter.at('my.blog_post.author.data.uid', authorUid?.toString() ?? '')], //PROBLEM. Not supported. Will need to switch to graphQuery  
      pageSize: pageSize,
      page: pagenum,
    })
    .catch(() => notFound())

  return {
    generalPosts: communityPosts.results,

    active_page: pagenum,
    total_pages: communityPosts.total_pages,
    next_page: communityPosts.next_page ? true : false,
    prev_page: communityPosts.prev_page ? true : false,
  }
}