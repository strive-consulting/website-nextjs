export const metadata = {
  title: 'Call Back',
  description: 'Talk to an expert about your UAE business formation and residency visa plans for Dubai',
  alternates: {
    canonical: Constants.SiteDomain + '/call-back',
  },
  openGraph: {
    title: 'Call Back',
    description: 'Talk to an expert about your UAE business formation and residency visa plans for Dubai',
    images: [Constants.SiteDomain + Constants.OpenGraphImage],
    url: Constants.SiteDomain + '/call-back',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Call Back',
    description: 'Talk to an expert about your UAE business formation and residency visa plans for Dubai',
    siteId: '',
    images: [Constants.SiteDomain + Constants.OpenGraphImage],
  },
}

import { Constants } from '@/app/constants'
import CalendlyDynamic from '@/components/calendly-dynamic'

export default function Contact() {
  return (
    <>
      <section className='relative'>
        <div className='max-w-3xl mx-auto px-4 sm:px-6 relative'>
          <div className='pt-32 pb-12 md:pt-40 md:pb-20'>
            {/* Page header */}
            <div className='max-w-3xl mx-auto text-center mb-2'>
              <h1 className='h1 mb-4' data-aos='fade-up'>
                Talk to an Expert
              </h1>
              <p className='text-xl text-gray-400' data-aos='fade-up' data-aos-delay='200'>
                Book in a call with our team of experts who are on hand to discuss your requirements and get you started in the UAE 🚀
              </p>
            </div>
            <CalendlyDynamic url={`https://calendly.com/d/4cz-qzm-kdp/strive-consultants-dubai-discovery-call`} ctaid={`website`} />
          </div>
        </div>
      </section>
    </>
  )
}
