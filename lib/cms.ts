import { createClient } from '@/prismicio'
import { notFound } from 'next/navigation'

export async function getTestimonials(maxcount?: number) {
  const client = createClient()

  const testimonials = await client.getAllByType('testimonial', {
    orderings: [{ field: 'my.testimonial.order', direction: 'desc' }],
    limit: maxcount ? maxcount : undefined,
  })

  return testimonials
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
  const pages = await client.getAllByType('servicepage')

  return pages
}

export async function getGlobalNav() {
  const client = createClient()
  const nav = await client.getSingle('global_nav')

  return nav
}

export async function getFooter() {
  const client = createClient()
  const footer = await client.getSingle('footer')

  return footer
}

export async function getBlogPosts() {
  const client = createClient()
  const blogPosts = await client.getAllByType('blog_post', {
    orderings: [{ field: 'my.blog_post.published_date', direction: 'desc' }],
  })

  return blogPosts
}

export async function getBlogPostsPaged(pagenum: number = 1) {
  const client = createClient()

  const pageSize = pagenum === 1 ? 7 : 6

  const communityPosts = await client.getByType('blog_post', {
    fetchLinks: ['author.name', 'author.job_title', 'author.avatar', 'author.linkedin_url'],
    orderings: [{ field: 'my.blog_post.published_date', direction: 'desc' }],

    // predicates: [predicate.at("my.community.most_popular",
    // {
    //   { orderings : '[document.first_publication_date desc]' }
    // })],
    pageSize: pageSize,
    page: pagenum,
  })

  //   Note, non paged
  // const popularPosts = await client.getAllByType("community", {
  //   predicates: [predicate.at("my.community.most_popular", true)],
  //   orderings: [{ field: "my.community.published_date", direction: "desc" }],
  // });

  // console.log(communityPosts.results);

  console.log('pages=', communityPosts.results.length)

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

  const communityPost = await client.getByUID('blog_post', name, {
    fetchLinks: ['author.name', 'author.job_title', 'author.avatar', 'author.linkedin_url'],
  })

  return communityPost
}

export async function getBlogPostsAll() {
  const client = createClient()

  const communityPosts = await client.getByType('blog_post', {
    fetchLinks: ['author.name', 'author.job_title', 'author.avatar', 'author.linkedin_url'],
    orderings: [{ field: 'my.blog_post.published_date', direction: 'desc' }],
  })

  return communityPosts.results
}
