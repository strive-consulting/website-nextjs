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
import Calculator from '@/components/calculator'
import BusinessSetupCalculator from '@/components/calculators/business-setup'
import CompanyNameChecker from '@/components/calculators/company-name-checker'

export default async function Home() {
  // const page = await getCmsPage(params.uid)

  // if (page === undefined) return notFound()

  // let schema = {
  //   '@context': 'https://schema.org',
  //   '@type': 'WebPage',
  //   url: Constants.SiteDomain + linkResolver(page),
  //   name: page.data.meta_title,
  // }

  return (
    <>
      <section className='relative'>
        <div className='max-w-3xl mx-auto px-4 sm:px-6 relative'>
          <div className='pt-32 pb-12 md:pt-40 md:pb-20'>
            {/* Page header */}
            <div className='max-w-3xl mx-auto text-center mb-5'>
              <h1 className='h1 mb-4' data-aos='fade-up'>
                Calculator
              </h1>
              <p className='text-xl text-gray-400' data-aos='fade-up' data-aos-delay='200'>
                Complete the form and our team will be in touch usually within minutes 🚀
              </p>
            </div>

            {/* <Calculator embed={true} /> */}

            <BusinessSetupCalculator />

            <h3>Company name check</h3>
            <CompanyNameChecker/>
          </div>
        </div>
      </section>

      {/* <SliceZone slices={page.data.slices} components={components} />
      <SchemaTag schemaJson={schema} /> */}
    </>
  )

  //Schema = organiszation, website, person (author), webpage (plus sitenavigationelement), artcticle breadcrumblist
}
