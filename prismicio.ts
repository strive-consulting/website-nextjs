import * as prismic from '@prismicio/client'
import * as prismicNext from '@prismicio/next'
import config from './slicemachine.config.json'

/**
 * The project's Prismic repository name.
 */
export const repositoryName = config.repositoryName

export function linkResolver(doc: any) {
  switch (doc.type) {
    // case "blog_post":
    //   return "/blog/" + doc.uid;
    case 'partner_post':
      return `/partners/${doc.uid}`
    case 'servicepage':
      return `/${doc.uid}`
    case 'landingpage':
      return `/lp/${doc.uid}`
    case 'blog_post':
      return `/blog/${doc.uid}`
    case 'author':
      return `/blog/author/${doc.uid}`
    default:
      return null
  }
}
/**
 * A list of Route Resolver objects that define how a document's `url` field is resolved.
 *
 * {@link https://prismic.io/docs/route-resolver#route-resolver}
 */
// TODO: Update the routes array to match your project's route structure.
const routes: prismic.ClientConfig['routes'] = [
  
  {
    type: 'servicepage',
    path: '/:uid',
  },
  {
    type: 'landingpage',
    path: '/lp/:uid',
  },
  {
    type: 'partner_post',
    path: '/partners/:uid',
  },
  {
    type: 'blog_post',
    path: '/blog/:uid',
  },
  {
    type: 'author',
    path: '/blog/author/:uid',
  },
  // E
  // Examples:
  // {
  // 	type: "homepage",
  // 	path: "/",
  // },
  // {
  // 	type: "page",
  // 	path: "/:uid",
  // },
]

/**
 * Creates a Prismic client for the project's repository. The client is used to
 * query content from the Prismic API.
 *
 * @param config - Configuration for the Prismic client.
 */
export const createClient = (config: prismicNext.CreateClientConfig = {}) => {
  const client = prismic.createClient(repositoryName, {
    routes,
    fetchOptions: process.env.NODE_ENV === 'production' ? { next: { tags: ['prismic'] }, cache: 'force-cache' } : { next: { revalidate: 5 } },
    ...config,
  })

  prismicNext.enableAutoPreviews({
    client,
    previewData: config.previewData,
    req: config.req,
  })

  return client
}
