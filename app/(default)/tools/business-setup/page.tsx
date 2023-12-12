import { Metadata } from 'next'
import { Constants } from '@/app/constants'
import SchemaTag from '@/components/schema'
import BusinessSetupCalculator from '@/components/calculators/business-setup'

export const metadata: Metadata = {
  robots: { index: true, follow: true },
  title: 'Dubai Business Setup Calculator',
  description:
    'Dubai Business Setup Calculator by Strive. Use our calculator to get indicative costs for forming a buisness in the UAE',
  alternates: {
    canonical: Constants.SiteDomain + '/tools/business-setup',
  },
  openGraph: {
    title: 'Dubai Business Setup Calculator',
    description:
      'Dubai Business Setup Calculator by Strive. Use our calculator to get indicative costs for forming a buisness in the UAE',
    images: [Constants.SiteDomain + Constants.OpenGraphImage],
    url: Constants.SiteDomain + '/tools/business-setup',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dubai Business Setup Calculator',
    description:
      'Dubai Business Setup Calculator by Strive. Use our calculator to get indicative costs for forming a buisness in the UAE',
    siteId: '',
    images: [Constants.SiteDomain + Constants.OpenGraphImage],
  },
}

export default async function Home() {
  let schema = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    url: Constants.SiteDomain + '/tools/business-setup',
    name: 'Dubai Business Setup Calculator',
  }

  return (
    <>
      <section className='relative'>
        <div className='max-w-3xl mx-auto px-4 sm:px-6 relative'>
          <div className='pt-32 pb-12 md:pt-40 md:pb-20'>
            {/* Page header */}
            <div className='max-w-3xl mx-auto text-center mb-5'>
              <h1 className='h1 mb-4' data-aos='fade-up'>
                Cost Calculator
              </h1>
              <p className='text-xl text-gray-400' data-aos='fade-up' data-aos-delay='200'>
                Use our simple calculator to determine how much it will cost to get your business
                setup along with any UAE residency visas.
              </p>
            </div>
            <div className='w-1/2 lg:w-3/4 mx-auto'>
              <BusinessSetupCalculator />
            </div>
          </div>
        </div>
      </section>

      <SchemaTag schemaJson={schema} />
    </>
  )
}
