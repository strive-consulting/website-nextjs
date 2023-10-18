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
  }
}
