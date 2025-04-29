import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPartnerPost, getPartnerPostsAll, getPartnerPostsPaged } from '@/lib/cms'
import { PrismicImage, PrismicLink, PrismicRichText, SliceZone } from '@prismicio/react'
import { Constants } from '@/app/constants'
import { linkResolver } from '@/prismicio'
import SchemaTag from '@/components/schema'
import BreadCrumbs from '@/components/breadcrumbs'
import Link from 'next/link'
import PostItem from '@/components/post-item'
import ShareBar from '@/components/share-bar'
import TickIcon from '@/components/tickIcon'
import PartnerReferralForm from '@/components/partner-referral-form'

export async function generateStaticParams() {
  const pages = await getPartnerPostsAll()

  return pages.map((page) => {
    return { slug: page.uid }
  })
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await getPartnerPost(params.slug)

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

export default async function SinglePartnerPost({ params }: { params: { slug: string } }) {
  const post = await getPartnerPost(params.slug)

  console.log(post.tags?.[0])

  const blogPosts = await getPartnerPostsPaged(1, 3, post.tags?.[0], post.uid)

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
    //image: post.data.youtube_video?.thumbnail_url,
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
                  <div className='text-center md:text-left'>
                    <BreadCrumbs homeTitle='Partners' homeUrl='/partner' currentPageName={post.tags?.[0] ?? post.data.title} currentPageUrl={Constants.SiteDomain + linkResolver(post)} />
                  </div>
                </header>
                <div className='md:grid md:grid-cols-12 md:gap-6 items-center'>
                  <div className={`max-w-xl md:max-w-none col-span-7 lg:col-span-8 self-start`}>
                    <h1 className='h1 mb-4 md:mb-12' data-aos='fade-up'>
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

                    <PrismicLink field={post.data.back_link} className='inline-flex my-10 p-4 rounded-xl bg-gray-600' rel='no follow' target='_blank'>
                      Visit the {post.data.title} website
                    </PrismicLink>
                  </div>
                  <div className='col-span-5 lg:col-span-4 self-start'>
                    {post.data.logo && (
                      <figure className='mb-3' data-aos='fade-up' data-aos-delay='300'>
                        <PrismicImage className='w-full' field={post.data.logo} />
                      </figure>
                    )}
                    {post.data.image && (
                      <figure className='mb-8' data-aos='fade-up' data-aos-delay='600'>
                        <PrismicImage className='w-full' field={post.data.image} />
                      </figure>
                    )}

                    <h4 className='h4 mb-4' data-aos='fade-up' data-aos-delay='200'>
                      Contact {post.data.title}
                    </h4>
                    <PartnerReferralForm pipeDriveLabel={post.data.pipedrive_label ?? ''} />

                    <div className='bg-gray-800 p-4 rounded-lg mt-10'>
                      <h3 className='text-base font-semibold text-foreground mb-1'>Partner with us</h3>
                      <p className='text-sm text-muted-foreground mb-3'>
                        Join the Strive partner programme to reach more customers in the UAE.{' '}
                        <Link href='/contact' className='inline-block text-sm text-primary hover:underline'>
                          Learn more
                        </Link>
                      </p>
                    </div>
                  </div>
                </div>
                {/* <div className='md:grid md:grid-cols-12 md:gap-6 items-center'>
                  <div className={`max-w-xl md:max-w-none col-span-7 lg:col-span-8 self-start`}>
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
                  </div>
                  <div className='col-span-5 lg:col-span-4  self-start'>
                    <h4 className='h4 mb-4' data-aos='fade-up' data-aos-delay='200'>Contact {post.data.title}</h4>
                    <PartnerReferralForm label='Partner' pipeDriveLabel={post.data.pipedrive_label ?? ''} />

                    <div>PARTNER WITH US</div>
                  </div>
                </div> */}

                {/* Article footer */}
                <footer>
                  <div className='text-end'>
                    <ShareBar title={post.data.title?.toString()} url={shareUrl} />
                  </div>
                </footer>
              </article>
            </div>
          </div>
        </div>
        {/* <SliceZone slices={post.data.slices} components={components} /> */}
        <SchemaTag schemaJson={schema} />
      </section>
    </>
  )
}
