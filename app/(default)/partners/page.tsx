import Link from 'next/link'
import Image from 'next/image'
import PostTags from '@/components/post-tags'
import PostItem from '@/components/post-item'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Partners - Business Setup in Dubai, UAE',
    description: 'Latest information and news on Business Setup / Company Formation, Residency Visas and Tax in Dubai and UAE.',
    alternates: {
      canonical: Constants.SiteDomain + '/blog',
    },
    openGraph: {
      title: 'Partners - Business Setup in Dubai, UAE',
      description: 'Latest information and news on Business Setup / Company Formation, Residency Visas and Tax in Dubai and UAE.',
      images: [Constants.SiteDomain + Constants.OpenGraphImage],
      url: Constants.SiteDomain + '/blog',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Partners - Business Setup in Dubai, UAE',
      description: 'Latest information and news on Business Setup / Company Formation, Residency Visas and Tax in Dubai and UAE.',
      siteId: '',
      images: [Constants.SiteDomain + Constants.OpenGraphImage],
    },
  }
}

import { getPartnerPostsPaged } from '@/lib/cms'
import { PrismicImage, PrismicRichText } from '@prismicio/react'
import BlogPagination from '@/components/blog-pagination'
import BlogPostAuthorFooter from '@/components/blog-post-author-footer'
import { Metadata } from 'next'
import { Constants } from '@/app/constants'
import SchemaTag from '@/components/schema'

export default async function Blog() {
  const blogPosts = await getPartnerPostsPaged()
  const featuredPost = blogPosts.generalPosts[0]
  const posts = blogPosts.generalPosts.slice(1)

  let schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    url: Constants.SiteDomain + '/partner',
    name: 'Partners - Business Setup in Dubai, UAE',
  }

  return (
    <>
      <section className='relative'>
        <div className='max-w-6xl mx-auto px-4 sm:px-6'>
          <div className='pt-32 pb-12 md:pt-40 md:pb-20'>
            {/*  Page header */}
            <div className='max-w-3xl pb-12 md:pb-20 text-center md:text-left'>
              <h1 className='h1' data-aos='fade-up'>
                Partners
              </h1>
            </div>

            {/*  Featured article */}
            <div className='pb-12 md:pb-20'>
              <article className='max-w-sm mx-auto md:max-w-none grid md:grid-cols-2 gap-6 md:gap-8 lg:gap-12 xl:gap-16 items-center'>
                <Link href={`/partners/${featuredPost.uid}`} className='relative block group' data-aos='fade-right' data-aos-delay='200'>
                  <div
                    className='absolute inset-0 bg-gray-800 hidden md:block transform md:translate-y-2 md:translate-x-4 xl:translate-y-4 xl:translate-x-8 group-hover:translate-x-0 group-hover:translate-y-0 transition duration-700 ease-out pointer-events-none'
                    aria-hidden='true'
                  ></div>
                  {featuredPost.data.image && (
                    <figure className='relative h-0 pb-9/16 md:pb-3/4 lg:pb-9/16 overflow-hidden transform md:-translate-y-2 xl:-translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 transition duration-700 ease-out'>
                      <PrismicImage
                        className='absolute inset-0 w-full h-full object-cover transform hover:scale-105 transition duration-700 ease-out'
                        field={featuredPost.data.image}
                        width='540'
                        height='303'
                      />
                    </figure>
                  )}
                </Link>
                <div data-aos='fade-left' data-aos-delay='200'>
                  {featuredPost.data.logo && (
                    <figure className='mb-3' data-aos='fade-up' data-aos-delay='300'>
                      <PrismicImage field={featuredPost.data.logo} />
                    </figure>
                  )}
                  <header>
                    <div className='mb-3'>
                      {featuredPost.tags && (
                        <div className='mb-3'>
                          <PostTags tags={featuredPost.tags} />
                        </div>
                      )}
                    </div>
                    <h3 className='h3 text-2xl lg:text-3xl mb-2'>
                      <Link href={`/partners/${featuredPost.uid}`} className='hover:text-gray-100 transition duration-150 ease-in-out'>
                        {featuredPost.data.title}
                      </Link>
                    </h3>
                  </header>
                  <PrismicRichText
                    field={featuredPost.data.introduction}
                    components={{
                      paragraph: ({ children }) => <p className='text-lg text-gray-400 grow'>{children}</p>,
                    }}
                  />
                </div>
              </article>
            </div>

            {/*  Articles list */}
            <div className='max-w-sm mx-auto md:max-w-none'>
              {/*  Section title */}
              <h4 className='h4 pb-6 mb-10 border-b border-gray-700' data-aos='fade-up'>
                Our Partners
              </h4>

              <div className='grid gap-12 md:grid-cols-3 md:gap-x-6 md:gap-y-8 items-start'>
                {posts.map((post, postIndex) => (
                  <article key={postIndex} className='flex flex-col h-full' data-aos='fade-up'>
                    <header>
                      <Link href={`/partners/${post.uid}`} className='block mb-6'>
                        <figure>{post.data.image && <PrismicImage className='inset-0 w-full transform hover:scale-105 transition duration-700 ease-out' field={post.data.image} />}</figure>
                      </Link>

                      <h3 className='h4 mb-2 text-center'>
                        <Link href={`/partners/${post.uid}`} className='hover:text-gray-100 transition duration-150 ease-in-out'>
                          {post.data.title}
                        </Link>
                      </h3>
                    </header>

                    {/* <PrismicRichText
                          field={post.data.introduction}
                          components={{
                            paragraph: ({ children }) => <p className='text-lg text-gray-400 grow'>{children}</p>,
                          }}
                        /> */}
                  </article>
                ))}
              </div>
            </div>

            {/* <BlogPagination totalpages={blogPosts.total_pages} activepage={blogPosts.active_page} /> */}
          </div>
        </div>

        <SchemaTag schemaJson={schema} />
      </section>
    </>
  )
}
