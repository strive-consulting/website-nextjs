// import { allPosts } from 'contentlayer/generated'
import Link from 'next/link'
import Image from 'next/image'
import PostDate from '@/components/post-date'
import PostTags from '@/components/post-tags'
import PostItem from '@/components/post-item'

export const metadata = {
  title: 'Blog - Open PRO',
  description: 'Page description',
}

import { getBlogPostsPaged } from '@/lib/cms'
import { PrismicImage, PrismicRichText } from '@prismicio/react'
import BlogPagination from '@/components/blog-pagination'
import { notFound } from 'next/navigation'

export default async function Blog({ params }: { params: { pagenum: string } }) {
  console.log('pagenum', params.pagenum)
  const pageNo = parseInt(params.pagenum) ?? 1

  const blogPosts = await getBlogPostsPaged(parseInt(params.pagenum))

  if (blogPosts.generalPosts.length === 0) {
    return notFound()
  }
  // Sort posts by date
  // allPosts.sort((a, b) => {
  //   return new Date(a.publishedAt) > new Date(b.publishedAt) ? -1 : 1
  // })

  //Ensure featuredPost is only shown on page 1
  const featuredPost = blogPosts.generalPosts[0]
  const posts = pageNo === 1 ? blogPosts.generalPosts.slice(1) : blogPosts.generalPosts

  return (
    <>
      <section className='relative'>
        <div className='max-w-6xl mx-auto px-4 sm:px-6'>
          <div className='pt-32 pb-12 md:pt-40 md:pb-20'>
            {/*  Page header */}
            <div className='max-w-3xl pb-12 md:pb-20 text-center md:text-left'>
              <h1 className='h1' data-aos='fade-up'>
                Blog
              </h1>
            </div>

            {/*  Featured article */}
            {pageNo === 1 && (
              <div className='pb-12 md:pb-20'>
                <article className='max-w-sm mx-auto md:max-w-none grid md:grid-cols-2 gap-6 md:gap-8 lg:gap-12 xl:gap-16 items-center'>
                  <Link
                    href={`/blog/${featuredPost.uid}`}
                    className='relative block group'
                    data-aos='fade-right'
                    data-aos-delay='200'
                  >
                    <div
                      className='absolute inset-0 bg-gray-800 hidden md:block transform md:translate-y-2 md:translate-x-4 xl:translate-y-4 xl:translate-x-8 group-hover:translate-x-0 group-hover:translate-y-0 transition duration-700 ease-out pointer-events-none'
                      aria-hidden='true'
                    ></div>
                    {featuredPost.data.image && (
                      <figure className='relative h-0 pb-9/16 md:pb-3/4 lg:pb-9/16 overflow-hidden transform md:-translate-y-2 xl:-translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 transition duration-700 ease-out'>
                        {!featuredPost.data.youtube_video && (
                          <PrismicImage
                            className='absolute inset-0 w-full h-full object-cover transform hover:scale-105 transition duration-700 ease-out'
                            field={featuredPost.data.image}
                            width='540'
                            height='303'
                          />
                        )}
                        {featuredPost.data.youtube_video.embed_url != null && (
                          <Image
                            alt={featuredPost.data.youtube_video.title ?? ''}
                            src={featuredPost.data.youtube_video.thumbnail_url ?? ''}
                            width={featuredPost.data.youtube_video.thumbnail_width ?? 540}
                            height={featuredPost.data.youtube_video.thumbnail_height ?? 303}
                          />
                        )}
                      </figure>
                    )}
                  </Link>
                  <div data-aos='fade-left' data-aos-delay='200'>
                    <header>
                      <div className='mb-3'>
                        {featuredPost.tags && (
                          <div className='mb-3'>
                            <PostTags tags={featuredPost.tags} />
                          </div>
                        )}
                      </div>
                      <h3 className='h3 text-2xl lg:text-3xl mb-2'>
                        <Link
                          href={`/blog/${featuredPost.uid}`}
                          className='hover:text-gray-100 transition duration-150 ease-in-out'
                        >
                          {featuredPost.data.title}
                        </Link>
                      </h3>
                    </header>
                    <PrismicRichText
                      field={featuredPost.data.introduction}
                      components={{
                        paragraph: ({ children }) => (
                          <p className='text-lg text-gray-400 grow'>{children}</p>
                        ),
                      }}
                    />

                    {/* <footer className='flex items-center mt-4'>
                      <Link href='#'>
                        <PrismicImage
                          className='rounded-full shrink-0 mr-4'
                          field={featuredPost.data.author.data?.avatar}
                          width={40}
                          height={40}
                        />
                      </Link>

                      <div>
                        <Link
                          href='#'
                          className='font-medium text-gray-200 hover:text-gray-100 transition duration-150 ease-in-out'
                        >
                          {featuredPost.data.author.data?.name}
                        </Link>
                        <span className='text-gray-700'> - </span>
                        <span className='text-gray-500'>
                          date
                          <PostDate
                            dateString={featuredPost.data.published_date?.toString() || ''}
                          />
                        </span>
                      </div>
                    </footer> */}
                  </div>
                </article>
              </div>
            )}

            {/*  Articles list */}
            <div className='max-w-sm mx-auto md:max-w-none'>
              {/*  Section title */}
              <h4 className='h4 pb-6 mb-10 border-b border-gray-700' data-aos='fade-up'>
                Latest articles
              </h4>

              {/*  Articles container */}
              <div className='grid gap-12 md:grid-cols-3 md:gap-x-6 md:gap-y-8 items-start'>
                {posts.map((post, postIndex) => (
                  <PostItem key={postIndex} post={post} />
                ))}
              </div>
            </div>

            <BlogPagination totalpages={blogPosts.total_pages} activepage={blogPosts.active_page} />
          </div>
        </div>
      </section>
    </>
  )
}
