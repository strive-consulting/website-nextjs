import { SliceZone } from '@prismicio/react'

import { components } from '@/slices'
import { Metadata } from 'next'
import { getAllCmsPages, getCmsPage } from '@/lib/cms'

type Params = { uid: string }

export default async function Page({ params }: { params: Params }) {
  const page = await getCmsPage(params.uid)

  return <SliceZone slices={page.data.slices} components={components} />
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const page = await getCmsPage(params.uid)

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
  }
}

export async function generateStaticParams() {
  const pages = await getAllCmsPages()

  return pages.map((page) => {
    return { uid: page.uid }
  })
}
