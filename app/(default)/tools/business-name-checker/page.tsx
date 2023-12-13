import { Metadata } from 'next'
import { Constants } from '@/app/constants'
import SchemaTag, { ISchema } from '@/components/schema'
import BusinessSetupCalculator from '@/components/calculators/business-setup'
import CompanyNameChecker from '@/components/calculators/company-name-checker'

export const metadata: Metadata = {
  robots: { index: true, follow: true },
  title: 'Dubai Business Name Checker',
  description: 'Dubai Business Name Checker by Strive. Use our tool to check if your new business name is available in the UAE',
  alternates: {
    canonical: Constants.SiteDomain + '/calculator/business-setup',
  },
  openGraph: {
    title: 'Dubai Business Name Checker',
    description: 'Dubai Business Name Checker by Strive. Use our tool to check if your new business name is available in the UAE',
    images: [Constants.SiteDomain + Constants.OpenGraphImage],
    url: Constants.SiteDomain + '/calculator/business-setup',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dubai Business Name Checker',
    description: 'Dubai Business Name Checker by Strive. Use our tool to check if your new business name is available in the UAE',
    siteId: '',
    images: [Constants.SiteDomain + Constants.OpenGraphImage],
  },
}

export default async function Home() {
  let schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    url: Constants.SiteDomain + '/tools/business-name-checker',
    name: 'Dubai Business Name Checker',
  }

  return (
    <>
      <section className='relative'>
        <div className='max-w-3xl mx-auto px-4 sm:px-6 relative'>
          <div className='pt-32 pb-12 md:pt-40 md:pb-20'>
            {/* Page header */}
            <div className='max-w-3xl mx-auto text-center mb-5'>
              <h1 className='h1 mb-4' data-aos='fade-up'>
                UAE Business Name Checker
              </h1>
              <p className='text-xl text-gray-400' data-aos='fade-up' data-aos-delay='200'>
                Find your perfect UAE business name
              </p>
            </div>
            <div className='w-full md:w-1/2 lg:w-3/4 mx-auto'>
              <CompanyNameChecker />
            </div>
          </div>
        </div>
      </section>

      <SchemaTag schemaJson={schema} />
    </>
  )
}
