import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import PostTags from '@/components/post-tags'
import { getBlogPost, getBlogPostsAll, getBlogPostsPaged, getAuthors, getAuthor, getBlogPostsByAuthorPaged } from '@/lib/cms'
import { PrismicImage, PrismicRichText, SliceZone } from '@prismicio/react'
import { Constants } from '@/app/constants'
import { linkResolver } from '@/prismicio'
import SchemaTag from '@/components/schema'
import BreadCrumbs from '@/components/breadcrumbs'
import Link from 'next/link'
import PostItem from '@/components/post-item'
import ShareBar from '@/components/share-bar'
import BlogPostAuthorFooter from '@/components/blog-post-author-footer'
import TickIcon from '@/components/tickIcon'
import { components } from '@/slices'
import BlogPagination from '@/components/blog-pagination'

export async function generateStaticParams() {
  const authors = await getAuthors()

  return authors.map((author) => {
    return { slug: author.uid }
  })
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const author = await getAuthor(params.slug)

  // return {
  //   title: post.data.meta_title,
  //   description: post.data.meta_description,
  //   alternates: {
  //     canonical: Constants.SiteDomain + linkResolver(post),
  //   },
  //   openGraph: {
  //     title: post.data.meta_title ?? Constants.SiteTitle,
  //     description: post.data.meta_description ?? Constants.SiteDescription,
  //     images: [Constants.SiteDomain + Constants.OpenGraphImage],
  //     url: Constants.SiteDomain + linkResolver(post),
  //     type: 'website',
  //   },
  //   twitter: {
  //     card: 'summary_large_image',
  //     title: post.data.meta_title ?? Constants.SiteTitle,
  //     description: post.data.meta_description ?? Constants.SiteDescription,
  //     siteId: '',
  //     images: [Constants.SiteDomain + Constants.OpenGraphImage],
  //   },
  // }

  return {}
}

export default async function SinglePost({ params }: { params: { slug: string } }) {
  const author = await getAuthor(params.slug)
  const blogPosts = await getBlogPostsByAuthorPaged(1, 30, params.slug, author)

  console.log('bp=' + blogPosts.generalPosts.length)
  // const blogPosts = await getBlogPostsPaged(1, 3, post.tags?.[0], post.uid)

  if (author === undefined) return notFound()

  // let schema = {
  //   '@context': 'https://schema.org',
  //   '@type': 'BlogPosting',
  //   mainEntityOfPage: {
  //     '@type': 'WebPage',
  //     '@id': Constants.SiteDomain + linkResolver(post),
  //   },
  //   headline: post.data.meta_title,
  //   description: post.data.meta_description,
  //   image: post.data.youtube_video?.thumbnail_url,
  //   publisher: {
  //     '@type': 'Organization',
  //     name: 'Strive',
  //     logo: {
  //       '@type': 'ImageObject',
  //       url: Constants.SiteDomain + '/' + Constants.OpenGraphImage,
  //       height: 60,
  //       width: 60,
  //     },
  //   },
  //   datePublished: post.data.published_date,
  //   dateModified: post.data.published_date,
  // }

  // const shareUrl = Constants.SiteDomain + linkResolver(post)

  // return (
  //   <>
      
  //     <footer className='flex items-center mt-4'>
  //       <Link href='#'>
  //         <PrismicImage className='rounded-full shrink-0 mr-4' field={author.data?.avatar} width={40} height={40} />
  //       </Link>
  //       <div className='font-medium'>
  //         <Link href='#' className='text-gray-200 hover:text-gray-100 transition duration-150 ease-in-out'>
  //           {author.data?.name}
  //         </Link>
  //         <span className='text-gray-700'> - </span>
          
  //       </div>
  //     </footer>
  //   </>
  // )

  return (
    <>
      <section className='relative'>
        <div className='max-w-6xl mx-auto px-4 sm:px-6'>
          <div className='pt-32 pb-12 md:pt-40 md:pb-20'>
            <div className='max-w-3xl mx-auto'>
              <article>
                <header className='mb-8'>
                  {/* Title and excerpt */}
                  <div className='text-center md:text-left'>
                    {/* <BreadCrumbs homeTitle='Blog' homeUrl='/blog' currentPageName={post.tags?.[0] ?? post.data.title} currentPageUrl={Constants.SiteDomain + linkResolver(post)} /> */}
                    <h1 className='h1 mb-4' data-aos='fade-up'>
                      {author.data.name} 
                    </h1>
                    {/* <PrismicRichText
                      field={post.data.introduction}
                      components={{
                        paragraph: ({ children }) => (
                          <p className='text-xl text-gray-400' data-aos='fade-up' data-aos-delay='200'>
                            {children}
                          </p>
                        ),
                      }}
                    /> */}
                  </div>

                </header>

                {/*  Articles list */}
                <div className='max-w-sm mx-auto md:max-w-none'>
                  <h4 className='h4 pb-6 mb-10 border-b border-gray-700' data-aos='fade-up'>
                    Latest articles
                  </h4>
                  <div className='grid gap-12 md:grid-cols-3 md:gap-x-6 md:gap-y-8 items-start'>
                    {blogPosts.generalPosts.map((post, postIndex) => (
                      <PostItem key={postIndex} post={post} />
                    ))}
                  </div>
                </div>

                <BlogPagination totalpages={blogPosts.total_pages} activepage={blogPosts.active_page} />

                {/* Article image */}
                {/* {post.data.image && (
                  <figure className='mb-8 lg:-ml-32 lg:-mr-32' data-aos='fade-up' data-aos-delay='600'>
                    <PrismicImage className='w-full' field={post.data.image} width={1024} height={576} />
                  </figure>
                )} */}
                {/* {post.data.youtube_video.embed_url != null && (
                  <div className='relative videoWrapper'>
                    <iframe
                      className='absolute top-0 left-0 w-full h-full'
                      src={post.data.youtube_video.embed_url.replace('watch?v=', 'embed/')}
                      title={post.data.title?.toString()}
                      allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                      allowFullScreen={true}
                    ></iframe>
                  </div>
                )} */}

                {/* <PrismicRichText
                  field={post.data.body}
                  components={{
                    heading2: ({ children }) => <h2 className='h3 my-5'>{children}</h2>,
                    heading3: ({ children }) => <h3 className='h4 my-5'>{children}</h3>,
                    paragraph: ({ children }) => (
                      <p className='prose my-6 text-gray-400 max-w-none prose-lg prose-invert prose-p:leading-normal prose-headings:text-gray-200 prose-a:text-gray-200 prose-a:underline hover:prose-a:no-underline prose-a:font-normal prose-strong:font-medium prose-strong:text-gray-200 prose-blockquote:italic prose-blockquote:pl-4 prose-blockquote:border-l-2 prose-blockquote:border-gray-200 prose-blockquote:font-normal prose-blockquote:text-gray-400'>
                        {children}
                      </p>
                    ),
                    list: ({ children }) => <ul>{children}</ul>,
                    listItem: ({ children }) => (
                      <li className='flex items-center text-lg text-gray-400 mt-4'>
                        <TickIcon />
                        {children}
                      </li>
                    ),
                    oList: ({ children }) => <ul>{children}</ul>,
                    oListItem: ({ children }) => (
                      <li className='flex items-center text-lg text-gray-400 mt-4'>
                        <TickIcon />
                        {children}
                      </li>
                    ),
                  }}
                /> */}
              </article>
            </div>
          </div>
        </div>
        
        {/* <SchemaTag schemaJson={schema} /> */}
      </section>
      
    </>
  )
}
