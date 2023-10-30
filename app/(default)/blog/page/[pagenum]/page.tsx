// import { allPosts } from 'contentlayer/generated'
import PostItem from '@/components/post-item'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Blog - Business Setup in Dubai, UAE',
    description:
      'Latest information and news on Business Setup / Company Formation, Residency Visas and Tax in Dubai and UAE.',
    alternates: {
      canonical: Constants.SiteDomain + '/blog',
    },
    openGraph: {
      title: 'Blog - Business Setup in Dubai, UAE',
      description:
        'Latest information and news on Business Setup / Company Formation, Residency Visas and Tax in Dubai and UAE.',
      images: [Constants.SiteDomain + Constants.OpenGraphImage],
      url: Constants.SiteDomain + '/blog',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Blog - Business Setup in Dubai, UAE',
      description:
        'Latest information and news on Business Setup / Company Formation, Residency Visas and Tax in Dubai and UAE.',
      siteId: '',
      images: [Constants.SiteDomain + Constants.OpenGraphImage],
    },
  }
}

import { getBlogPostsPaged } from '@/lib/cms'
import BlogPagination from '@/components/blog-pagination'
import { notFound, redirect } from 'next/navigation'
import { Constants } from '@/app/constants'
import { Metadata } from 'next'
import SchemaTag from '@/components/schema'

export default async function Blog({ params }: { params: { pagenum: string } }) {
  const pageNo = parseInt(params.pagenum) ?? 1

  const blogPosts = await getBlogPostsPaged(parseInt(params.pagenum))

  if (blogPosts.generalPosts.length === 0) {
    return notFound()
  }

  if (pageNo === 1) {
    return redirect('/blog')
  }

  const posts = pageNo === 1 ? blogPosts.generalPosts.slice(1) : blogPosts.generalPosts

  let schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    url: Constants.SiteDomain + '/blog',
    name: 'Blog - Business Setup in Dubai, UAE',
  }

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
        <SchemaTag schemaJson={schema} />
      </section>
    </>
  )
}
