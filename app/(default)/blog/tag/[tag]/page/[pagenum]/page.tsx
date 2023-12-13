import PostItem from '@/components/post-item'

export async function generateMetadata({ params }: { params: { tag: string; pagenum: string } }): Promise<Metadata> {
  const tagName = toTitleCase(params.tag)

  return {
    title: `UAE ${tagName} Blog - Business Setup in Dubai, UAE`,
    description: `Latest '${tagName}' information and blogs in Dubai and UAE.`,
    alternates: {
      canonical: Constants.SiteDomain + '/blog' + params.tag,
    },
    openGraph: {
      title: `UAE ${tagName} Blog - Business Setup in Dubai, UAE`,
      description: `Latest ${tagName} information and blogs in Dubai and UAE.`,
      images: [Constants.SiteDomain + Constants.OpenGraphImage],
      url: Constants.SiteDomain + '/blog/' + params.tag,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: `UAE ${tagName} Blog - Business Setup in Dubai, UAE`,
      description: `Latest ${tagName} information and blogs in Dubai and UAE.`,
      siteId: '',
      images: [Constants.SiteDomain + Constants.OpenGraphImage],
    },
  }
}

import { getBlogPostsPaged } from '@/lib/cms'
import BlogPagination from '@/components/blog-pagination'
import { Metadata } from 'next'
import { Constants } from '@/app/constants'
import SchemaTag from '@/components/schema'
import { toTitleCase } from '@/lib/helpers'
import { notFound, redirect } from 'next/navigation'
import BreadCrumbs from '@/components/breadcrumbs'

export default async function Blog({ params }: { params: { tag: string; pagenum: string } }) {
  const pageNo = parseInt(params.pagenum) ?? 1
  const tagName = toTitleCase(params.tag)
  const blogPosts = await getBlogPostsPaged(parseInt(params.pagenum), 6, tagName)
  const posts = blogPosts.generalPosts

  if (blogPosts.generalPosts.length === 0) {
    return notFound()
  }

  if (pageNo === 1) {
    return redirect('/blog/tag/' + params.tag)
  }

  // console.log(blogPosts.total_pages)
  if (blogPosts.total_pages === 0) {
    return notFound()
  }

  const pagniatePath = '/blog/tag/' + params.tag + '/page/'

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
            <div className='max-w-3xl pb-12 md:pb-10 text-center md:text-left'>
              <BreadCrumbs homeTitle='Blog' homeUrl='/blog' currentPageName={tagName} currentPageUrl={Constants.SiteDomain + '/blog'} />

              <h1 className='h1' data-aos='fade-up'>
                {tagName}
              </h1>
            </div>

            <div className='max-w-sm mx-auto md:max-w-none border-t border-gray-700 py-10'>
              <div className='grid gap-12 md:grid-cols-3 md:gap-x-6 md:gap-y-8 items-start'>
                {posts.map((post, postIndex) => (
                  <PostItem key={postIndex} post={post} />
                ))}
              </div>
            </div>

            <BlogPagination totalpages={blogPosts.total_pages} activepage={blogPosts.active_page} pagniatePath={pagniatePath} />
          </div>
        </div>

        <SchemaTag schemaJson={schema} />
      </section>
    </>
  )
}
