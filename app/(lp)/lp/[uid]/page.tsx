import { components } from '@/slices'

import { Metadata } from 'next'
import { SliceZone } from '@prismicio/react'
import { getCmsPage, getLandingPage } from '@/lib/cms'
import { linkResolver } from '@/prismicio'
import SchemaTag from '@/components/schema'
import { Constants } from '@/app/constants'

type Params = { uid: string }

export default async function Page({ params }: { params: Params }) {
  // console.log(params)
  const page = await getLandingPage(params.uid)

  let schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      url: Constants.SiteDomain + linkResolver(page),
      name: page.data.meta_title,
    },
  ]

  return (
    <>
      <SliceZone slices={page.data.slices} components={components} />
      <SchemaTag schemaJson={schema} />
    </>
  )
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const page = await getLandingPage(params.uid)

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
    alternates: {
      canonical: Constants.SiteDomain + '/',
    },
    openGraph: {
      title: page.data.meta_title ?? Constants.SiteTitle,
      description: page.data.meta_description ?? Constants.SiteDescription,
      images: [Constants.SiteDomain + Constants.OpenGraphImage],
      url: Constants.SiteDomain + '/',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: page.data.meta_title ?? Constants.SiteTitle,
      description: page.data.meta_description ?? Constants.SiteDescription,
      siteId: '',
      images: [Constants.SiteDomain + Constants.OpenGraphImage],
    },
  }
}
