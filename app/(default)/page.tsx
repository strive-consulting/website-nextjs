import { components } from '@/slices'

import { Metadata } from 'next'
import { SliceZone } from '@prismicio/react'
import { getCmsPage } from '@/lib/cms'
import { Constants } from '../constants'
import { linkResolver } from '@/prismicio'
import SchemaTag from '@/components/schema'

export default async function Home() {
  const page = await getCmsPage('home')

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

export async function generateMetadata(): Promise<Metadata> {
  const page = await getCmsPage('home')

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
    alternates: {
      canonical: '/',
    },
    openGraph: {
      title: page.data.meta_title ?? Constants.SiteTitle,
      description: page.data.meta_description ?? Constants.SiteDescription,
      images: [Constants.SiteDomain + Constants.OpenGraphImage],
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
