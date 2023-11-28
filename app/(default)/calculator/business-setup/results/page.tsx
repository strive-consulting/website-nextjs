import { Metadata } from 'next'
import SchemaTag from '@/components/schema'

import { businessActivities } from '@/app/constants'
import Link from 'next/link'

export default async function Page({
  params,
  searchParams,
}: {
  params: { slug: string }
  searchParams?: {
    businessActivity: string
    numberOfVisas: number
    firstName: string
    lastName: string
    phoneNumber: string
    email: string
  }
}) {
  let mainlandPrice = 0.0
  let freezonePrice = 0.0
  let businessActivityName
  let visaCount

  //TODO
  const utm = {
    utmCampaign: '', //searchParams.get('utm_campaign') ?? undefined,
    utmMedium: '', //searchParams.get('utm_medium') ?? undefined,
    utmSource: '', //searchParams.get('utm_source') ?? undefined,
  }

  const calendarUrl = 'https://calendly.com/d/4cz-qzm-kdp/strive-consultants-dubai-discovery-call'
  const ctaUrl = `${calendarUrl}?name=${searchParams?.firstName}&email=${searchParams?.email}&a1=${searchParams?.phoneNumber}&utm_campaign=${utm.utmCampaign}&utm_medium=${utm.utmMedium}&utm_source=${utm.utmSource}`

  Calculate()

  function Calculate() {
    const businessactivity = parseInt(searchParams?.businessActivity ?? '0')
    const businessActivity = businessActivities.find((obj) => obj.id === businessactivity)
    businessActivityName = businessActivity?.label
    const visas: number = searchParams?.numberOfVisas ?? 1
    visaCount = visas

    if (businessActivity) {
      mainlandPrice = businessActivity.mainlandPrice + visas * businessActivity.additionalVisaPrice
      freezonePrice = businessActivity.freeZonePrice + visas * businessActivity.additionalVisaPrice
    }
  }

  return (
    <>
      <section className='relative'>
        <div className='max-w-6xl mx-auto px-4 sm:px-6 relative'>
          <div className='pt-32 md:pt-40'>
            <div className='flex flex-col md:flex-row'>
              <div className={`w-full mx-auto text-center`}>
                <h1 className='h1 mb-4' data-aos='fade-up'>
                  Your Estimate 🚀
                </h1>

                <p
                  className='text-xl text-gray-400 prose-a:underline prose-a:text-gray-200 hover:prose-a:no-underline'
                  data-aos='fade-up'
                  data-aos-delay='200'
                >
                  Here is you estimate for getting your business set up in the UAE
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className='relative'>
        <div className='max-w-3xl mx-auto px-4 sm:px-6 relative'>
          <div className='mt-10 pb-5'>
            <div
              className='w-3/4 mx-auto border-purple-200 border-8 p-5 mb-5 text-center'
              data-aos='fade-up'
              data-aos-delay='600'
            >
              <p className='mb-2'>
                <span className='text-purple-600'>{businessActivityName}</span> business licence and{' '}
                <span className='text-purple-600'>{visaCount} residence visa(s)</span>
              </p>
              <div className='h3 mb-2'>Mainland: AED {mainlandPrice.toLocaleString()}</div>
              <div className='h3'>Free zone: AED {freezonePrice.toLocaleString()}</div>
              (Approx dollar prices?)
            </div>

            <div className={`w-full mx-auto text-center`}>
              <div data-aos='fade-up' data-aos-delay='600'>
                <Link
                  className='btn text-white bg-purple-600 hover:bg-purple-600 w-full sm:w-auto sm:ml-4'
                  href={ctaUrl}
                >
                  Talk to an Expert
                </Link>
              </div>
            </div>

            <h4 className='h4'>What&apos;s included?</h4>
            <p className='mb-5'>
              Your estimate includes all government processing fees and our fast track processing
              fees to get your business and residence visas.
            </p>
            <h4 className='h4'>Mainland vs Free zone?</h4>
            <p className='mb-5'>
              There are 2 different types of licence available in the UAE.{' '}
              <Link href='/dubai-freezone-company-formation'>Free zone licences</Link> are perfect
              for smaller businesses which have an international client base and only require up to
              5 residence visas. Mainland licences are the more tradition licence as you would find
              in any other country and are ideal for larger companies wishing to do business with
              the local market as well as internation clients.
            </p>
          </div>

          <div className='max-w-3xl mx-auto text-center pb-12 md:pb-16' data-aos-id-cta>
            {/* Section header */}
            <h4 className='h2 mb-4' data-aos='fade-up' data-aos-anchor='[data-aos-id-cta]'>
              Interested?
            </h4>

            <p
              className='text-xl text-gray-400 mb-8'
              data-aos='fade-up'
              data-aos-delay='200'
              data-aos-anchor='[data-aos-id-cta]'
            >
              The next step is to speak to our expert team to discuss your exact requirements. Book
              in a time
            </p>

            {/* CTA button */}
            <div
              className='flex justify-center mb-8'
              data-aos='fade-up'
              data-aos-delay='400'
              data-aos-anchor='[data-aos-id-cta]'
            >
              <Link
                className={`btn-sm text-white bg-purple-600 hover:bg-purple-700 mt-6`}
                href={ctaUrl}
                target='_blank'
              >
                Book call
              </Link>
            </div>

            {/* {slice.primary.bullets && (
              <PrismicRichText
                field={slice.primary.bullets}
                components={{
                  list: ({ children }) => (
                    <ul className='flex flex-wrap justify-center text-lg text-gray-400 -mx-2 -my-1'>
                      {children}
                    </ul>
                  ),
                  listItem: ({ children }) => (
                    <li
                      className='flex items-center mx-3 my-1'
                      data-aos='fade-up'
                      data-aos-delay='600'
                      data-aos-anchor='[data-aos-id-cta]'
                    >
                      <TickIcon />
                      <span>{children}</span>
                    </li>
                  ),
                }}
              />
            )} */}
          </div>
        </div>
      </section>
    </>
  )
}

// export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
//   const page = await getLandingPage(params.uid)

//   return {
//     title: page.data.meta_title,
//     description: page.data.meta_description,
//     alternates: {
//       canonical: Constants.SiteDomain + '/',
//     },
//     openGraph: {
//       title: page.data.meta_title ?? Constants.SiteTitle,
//       description: page.data.meta_description ?? Constants.SiteDescription,
//       images: [Constants.SiteDomain + Constants.OpenGraphImage],
//       url: Constants.SiteDomain + '/',
//       type: 'website',
//     },
//     twitter: {
//       card: 'summary_large_image',
//       title: page.data.meta_title ?? Constants.SiteTitle,
//       description: page.data.meta_description ?? Constants.SiteDescription,
//       siteId: '',
//       images: [Constants.SiteDomain + Constants.OpenGraphImage],
//     },
//   }
// }
