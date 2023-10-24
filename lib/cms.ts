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
  const page = await client.getByUID('servicepage', uid).catch(() => notFound())

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
