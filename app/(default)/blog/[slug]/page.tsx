import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import PostTags from '@/components/post-tags'
import { getBlogPost, getBlogPostsAll, getBlogPostsPaged } from '@/lib/cms'
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

export async function generateStaticParams() {
  const pages = await getBlogPostsAll()

  return pages.map((page) => {
    return { slug: page.uid }
  })
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getBlogPost(params.slug)

  return {
    title: post.data.meta_title,
    description: post.data.meta_description,
    alternates: {
      canonical: Constants.SiteDomain + linkResolver(post),
    },
    openGraph: {
      title: post.data.meta_title ?? Constants.SiteTitle,
      description: post.data.meta_description ?? Constants.SiteDescription,
      images: [Constants.SiteDomain + Constants.OpenGraphImage],
      url: Constants.SiteDomain + linkResolver(post),
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: post.data.meta_title ?? Constants.SiteTitle,
      description: post.data.meta_description ?? Constants.SiteDescription,
      siteId: '',
      images: [Constants.SiteDomain + Constants.OpenGraphImage],
    },
  }
}

export default async function SinglePost({ params }: { params: { slug: string } }) {
  const post = await getBlogPost(params.slug)

  console.log(post.tags?.[0])

  const blogPosts = await getBlogPostsPaged(1, 3, post.tags?.[0], post.uid)

  if (post === undefined) return notFound()

  let schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': Constants.SiteDomain + linkResolver(post),
    },
    headline: post.data.meta_title,
    description: post.data.meta_description,
    image: post.data.youtube_video?.thumbnail_url,
    publisher: {
      '@type': 'Organization',
      name: 'Strive',
      logo: {
        '@type': 'ImageObject',
        url: Constants.SiteDomain + '/' + Constants.OpenGraphImage,
        height: 60,
        width: 60,
      },
    },
    datePublished: post.data.published_date,
    dateModified: post.data.published_date,
  }

  const shareUrl = Constants.SiteDomain + linkResolver(post)

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
                    <BreadCrumbs homeTitle='Blog' homeUrl='/blog' currentPageName={post.tags?.[0] ?? post.data.title} currentPageUrl={Constants.SiteDomain + linkResolver(post)} />
                    <h1 className='h1 mb-4' data-aos='fade-up'>
                      {post.data.title}
                    </h1>
                    <PrismicRichText
                      field={post.data.introduction}
                      components={{
                        paragraph: ({ children }) => (
                          <p className='text-xl text-gray-400' data-aos='fade-up' data-aos-delay='200'>
                            {children}
                          </p>
                        ),
                      }}
                    />
                  </div>
                  {/* Article meta */}
                  <div className='md:flex md:items-center md:justify-between mt-3'>
                    {/* Author meta */}
                    <div className='flex items-center justify-center' data-aos='fade-up' data-aos-delay='400'>
                      <BlogPostAuthorFooter post={post} type="start"/>
                    </div>
                    {/* Article tags */}
                    {post.tags && (
                      <div className='flex justify-center mt-4 md:mt-0' data-aos='fade-up' data-aos-delay='600'>
                        <PostTags tags={post.tags} />
                      </div>
                    )}
                  </div>
                </header>

                {/* Article image */}
                {post.data.image && (
                  <figure className='mb-8 lg:-ml-32 lg:-mr-32' data-aos='fade-up' data-aos-delay='600'>
                    <PrismicImage className='w-full' field={post.data.image} width={1024} height={576} />
                  </figure>
                )}
                {post.data.youtube_video.embed_url != null && (
                  <div className='relative videoWrapper'>
                    <iframe
                      className='absolute top-0 left-0 w-full h-full'
                      src={post.data.youtube_video.embed_url.replace('watch?v=', 'embed/')}
                      title={post.data.title?.toString()}
                      allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                      allowFullScreen={true}
                    ></iframe>
                  </div>
                )}

                <PrismicRichText
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
                />

                {/* Article footer */}
                <footer>
                  <div className='text-end'>
                    {/* <div className='text-lg text-gray-400 italic'></div> */}
                    <ShareBar title={post.data.title?.toString()} url={shareUrl} />
                  </div>
                </footer>
              </article>
            </div>
          </div>
        </div>
        <BlogPostAuthorFooter post={post} type="end"/>
        <SliceZone slices={post.data.slices} components={components} />
        <SchemaTag schemaJson={schema} />
      </section>
      {blogPosts.generalPosts?.length > 0 && (
        <section className='relative'>
          <div className='max-w-6xl mx-auto px-4 mt-4 sm:px-6'>
            <div className='pt-5 md:pb-20'>
              {/*  Page header */}
              <div className='max-w-3xl pb-12 md:pb-10 text-center md:text-left'>
                <h3 className='h3' data-aos='fade-up'>
                  Explore more
                </h3>
              </div>

              <div className='max-w-sm mx-auto md:max-w-none border-t border-gray-700 py-10'>
                <div className='grid gap-12 md:grid-cols-3 md:gap-x-6 md:gap-y-8 items-start'>
                  {blogPosts.generalPosts.map((post, postIndex) => (
                    <PostItem key={postIndex} post={post} />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <SchemaTag schemaJson={schema} />
        </section>
      )}
    </>
  )
}
