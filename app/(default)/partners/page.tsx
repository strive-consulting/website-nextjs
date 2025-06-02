import Link from 'next/link'
import PostTags from '@/components/post-tags'

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: 'Our Partners - Dubai Company Setup solutions backed by industry experts',
    description: 'Latest information and news on Strive&apos;s partnerships with with industry experts in Dubai.',
    alternates: {
      canonical: Constants.SiteDomain + '/blog',
    },
    openGraph: {
      title: 'Our Partners - Dubai Company Setup solutions backed by industry experts',
      description: 'Latest information and news on Strive&apos;s partnerships with with industry experts in Dubai.',
      images: [Constants.SiteDomain + Constants.OpenGraphImage],
      url: Constants.SiteDomain + '/blog',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Our Partners - Dubai Company Setup solutions backed by industry experts',
      description: 'Latest information and news on Strive&apos;s partnerships with with industry experts in Dubai.',
      siteId: '',
      images: [Constants.SiteDomain + Constants.OpenGraphImage],
    },
  }
}

import { getPartnerPostsPaged } from '@/lib/cms'
import { PrismicImage, PrismicRichText } from '@prismicio/react'
import { Metadata } from 'next'
import { Constants } from '@/app/constants'
import SchemaTag from '@/components/schema'

export default async function Blog() {
  const blogPosts = await getPartnerPostsPaged()
  const posts = blogPosts.generalPosts

  let schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    url: Constants.SiteDomain + '/partners',
    name: 'Our Partners - Dubai Company Setup solutions backed by industry experts',
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
              <p className='text-xl text-gray-400 mt-5' data-aos='fade-up' data-aos-delay='200'>
                We&apos;re proud to collaborate with some of the most respected and experienced professionals in Dubai and across the globe. These strategic partnerships are not just about
                credentials—they&apos;re about shared values, deep local knowledge, and a proven track record of delivering real results. We&apos;ve carefully selected each expert based on their
                ability to provide specialized support in key areas such as legal, financial, business setup, real estate, and lifestyle services.
              </p>
              <p className='text-xl text-gray-400 mt-5' data-aos='fade-up' data-aos-delay='200'>
                Our goal is to ensure that your transition to life and business in Dubai is as smooth and successful as possible. By working with trusted experts who understand both the local
                landscape and international expectations, we&apos;re able to offer you a seamless, efficient, and personalized experience. Whether you&apos;re establishing a new business, relocating
                your family, or exploring investment opportunities, our network is here to guide and support you at every step of the way.
              </p>
            </div>

            {posts.map((post, postIndex) => (
              <>
                <div className='pb-12 md:pb-20'>
                  <article className='max-w-sm mx-auto md:max-w-none grid md:grid-cols-2 gap-6 md:gap-8 lg:gap-12 xl:gap-16 items-center'>
                    <Link href={`/partners/${post.uid}`} className='relative block group' data-aos='fade-right' data-aos-delay='200'>
                      <div
                        className='absolute inset-0 bg-gray-800 hidden md:block transform md:translate-y-2 md:translate-x-4 xl:translate-y-4 xl:translate-x-8 group-hover:translate-x-0 group-hover:translate-y-0 transition duration-700 ease-out pointer-events-none'
                        aria-hidden='true'
                      ></div>
                      {post.data.image && (
                        <figure className='relative h-0 pb-9/16 md:pb-3/4 lg:pb-9/16 overflow-hidden transform md:-translate-y-2 xl:-translate-y-4 group-hover:translate-x-0 group-hover:translate-y-0 transition duration-700 ease-out'>
                          <PrismicImage
                            className='grayscale absolute inset-0 w-full h-full object-cover transform hover:scale-105 transition duration-700 ease-out'
                            field={post.data.image}
                            width='540'
                            height='303'
                          />
                        </figure>
                      )}
                    </Link>
                    <div data-aos='fade-left' data-aos-delay='200'>
                      {post.data.logo && (
                        <Link href={`/partners/${post.uid}`} className='hover:text-gray-100 transition duration-150 ease-in-out'>
                          <figure className='mb-3' data-aos='fade-up' data-aos-delay='300'>
                            <PrismicImage field={post.data.logo} className="grayscale"/>
                          </figure>
                        </Link>
                      )}
                      <header>
                        <div className='mb-3'>
                          {post.tags && (
                            <div className='mb-3'>
                              <PostTags tags={post.tags} disableLinks={true} />
                            </div>
                          )}
                        </div>
                        <h3 className='h3 text-2xl lg:text-3xl mb-2'>
                          <Link href={`/partners/${post.uid}`} className='hover:text-gray-100 transition duration-150 ease-in-out'>
                            {post.data.title}
                          </Link>
                        </h3>
                      </header>
                      <PrismicRichText
                        field={post.data.introduction}
                        components={{
                          paragraph: ({ children }) => <p className='text-lg text-gray-400 grow'>{children}</p>,
                        }}
                      />
                    </div>
                  </article>
                </div>
              </>
            ))}
          </div>
        </div>

        <SchemaTag schemaJson={schema} />
      </section>
    </>
  )
}
