import { SliceZone } from '@prismicio/react'
// const SliceZone = dynamic(() => import('@prismicio/react').then((module) => module.SliceZone));

import { components } from '@/slices'
import { Metadata } from 'next'
import { getAllCmsPages, getCmsPage } from '@/lib/cms'
import { Constants } from '@/app/constants'
import { linkResolver } from '@/prismicio'
import SchemaTag, { ISchema } from '@/components/schema'
import { notFound } from 'next/navigation'
import dynamic from 'next/dynamic'

type Params = { uid: string }

export default async function Page({ params }: { params: Params }) {
  const page = await getCmsPage(params.uid)

  if (page === undefined) return notFound()

  let schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    url: Constants.SiteDomain + linkResolver(page),
    name: page.data.meta_title,
  }

  return (
    <>
      <SliceZone slices={page.data.slices} components={components} />
      <SchemaTag schemaJson={schema} />
    </>
  )

  //Schema = organiszation, website, person (author), webpage (plus sitenavigationelement), artcticle breadcrumblist
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const page = await getCmsPage(params.uid)

  if (!page) return {}

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
    alternates: {
      canonical: Constants.SiteDomain + linkResolver(page),
    },
    openGraph: {
      title: page.data.meta_title ?? Constants.SiteTitle,
      description: page.data.meta_description ?? Constants.SiteDescription,
      images: [Constants.SiteDomain + Constants.OpenGraphImage],
      url: Constants.SiteDomain + linkResolver(page),
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

export async function generateStaticParams() {
  const pages = await getAllCmsPages()

  return pages.map((page) => {
    return { uid: page.uid }
  })
}
