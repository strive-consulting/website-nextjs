import { components } from '@/slices'

import { Metadata } from 'next'
import { SliceZone } from '@prismicio/react'
import { getCmsPage } from '@/lib/cms'

export default async function Home() {
  const page = await getCmsPage('home-test')
  return <SliceZone slices={page.data.slices} components={components} />
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
