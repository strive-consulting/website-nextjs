import { Metadata } from 'next'
import SchemaTag from '@/components/schema'

import { businessActivities } from '@/app/constants'
import Link from 'next/link'
import TickIcon from '@/components/tickIcon'
import Image from 'next/image'

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
  let mainlandPriceConverted: number | string = 0.0
  let freezonePrice = 0.0
  let freezonePriceConverted: number | string = 0.0
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

  await Calculate()

  async function Calculate() {
    const businessactivity = parseInt(searchParams?.businessActivity ?? '0')
    const businessActivity = businessActivities.find((obj) => obj.id === businessactivity)
    businessActivityName = businessActivity?.label
    const visas: number = searchParams?.numberOfVisas ?? 1
    visaCount = visas

    if (businessActivity) {
      mainlandPrice = businessActivity.mainlandPrice + visas * businessActivity.additionalVisaPrice
      freezonePrice = businessActivity.freeZonePrice + visas * businessActivity.additionalVisaPrice

      //currency convert
      mainlandPriceConverted = await convertCurrency(mainlandPrice, 'AED', 'GBP')
      freezonePriceConverted = await convertCurrency(freezonePrice, 'AED', 'GBP')
    }
  }

  async function convertCurrency(
    amount: number,
    baseCurrency: string,
    targetCurrency: string,
  ): Promise<number | string> {
    const accessKey = process.env.FIXER_CURRENCY_API_KEY
    const apiUrl = `http://data.fixer.io/api/latest?access_key=${accessKey}&format=1`

    try {
      const response = await fetch(apiUrl)

      if (response.ok) {
        const data = await response.json()

        if (data.success) {
          const rates = data.rates

          if (baseCurrency in rates && targetCurrency in rates) {
            const convertedAmount = amount * (rates[targetCurrency] / rates[baseCurrency])
            // Round up to the nearest thousand
            const roundedAmount = Math.ceil(convertedAmount / 1000) * 1000

            return roundedAmount
          } else {
            return 'Unsupported currency'
          }
        } else {
          return `Error: ${data.error.info}`
        }
      } else {
        return `Error: ${response.status} - ${response.statusText}`
      }
    } catch (error: any) {
      return `Error: ${error.message}`
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
                  Your Estimate 
                </h1>

                <p
                  className='text-xl text-gray-400 prose-a:underline prose-a:text-gray-200 hover:prose-a:no-underline'
                  data-aos='fade-up'
                  data-aos-delay='200'
                >
                  Here is your estimate for getting your business set up in the UAE 🚀
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
              className='w-3/4 mx-auto border-purple-200 border-4 rounded p-5 mb-5 text-center'
              data-aos='fade-up'
              data-aos-delay='600'
            >
              <p className='mb-2'>
                <span className='text-purple-600'>{businessActivityName}</span> business licence and{' '}
                <span className='text-purple-600'>{visaCount} residence visa(s)</span>
              </p>
              <div className='h3 mb-1'>Mainland: AED {mainlandPrice.toLocaleString()}</div>
              <div className='mb-5 text-lg italic'>Approx £{mainlandPriceConverted}</div>

              <div className='h3 mb-1'>Free zone: AED {freezonePrice.toLocaleString()}</div>
              <div className='mb-5 text-lg italic'>Approx £{freezonePriceConverted}</div>

              <div className='text-sm'>Prices shown are indicative. Service fees apply</div>
            </div>

            <div className={`w-full mx-auto text-center mb-10`}>
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
            
            <p className='my-5'>
              Your estimate includes all government processing fees for your selected business
              activity and visas. Our service fees will be calculated based on your exact
              requirements. We also offer fast track processing options to get your business and
              residence visas in the shortest possible time.
            </p>
            <ul className='justify-center text-lg text-gray-400 -mx-2 -my-1 mb-10'>
              <li className='flex items-center mx-3 my-1' data-aos-anchor='[data-aos-id-cta]'>
                <TickIcon />
                <span>Fast-track visa processing</span>
              </li>
              <li className='flex items-center mx-3 my-1'>
                <TickIcon />
                <span>[UK, UAE and Australian] support teams</span>
              </li>
              <li className='flex items-center mx-3 my-1'>
                <TickIcon />
                <span>Transparent pricing</span>
              </li>
            </ul>
            <h4 className='h4'>Financial Compliance</h4>

            <div className='flex flex-wrap'>
              <div className='w-2/3'>
              <p className='my-5'>
              Strive are a certified Xero partner and will ensure your business follows all of the latest financial compliance guidelines in the UAE.
            </p>
            <ul className='justify-center text-lg text-gray-400 -mx-2 -my-1 mb-10'>
              <li className='flex items-center mx-3 my-1' data-aos-anchor='[data-aos-id-cta]'>
                <TickIcon />
                <span>Xero Partner</span>
              </li>
              <li className='flex items-center mx-3 my-1'>
                <TickIcon />
                <span>Certified Chartered Accountants</span>
              </li>
              <li className='flex items-center mx-3 my-1'>
                <TickIcon />
                <span>Corporate Tax and VAT registration and filing</span>
              </li>
            </ul>
              </div>
              <div className='w-1/3 flex items-center justify-center'>
                <Image src='/images/xero-logo-hires-RGB.png' alt='Strive is a Xero Partner' width={160} height={160}/>
              </div>
            </div>

            

            <h4 className='h4'>Mainland vs Free zone?</h4>
            <p className='mb-5 prose-a:underline prose-a:text-gray-200 hover:prose-a:no-underline'>
              There are 2 different types of licence available in the UAE.{' '}
              <Link href='/dubai-freezone-company-formation' target='_blank'>Free zone licences</Link> are perfect
              for smaller businesses which have an international client base and only require up to
              5 residence visas. <Link href='/dubai-mainland-company-formation' target='_blank'>Mainland licences</Link> are the more like a traditional licence as you would find
              in any other country and are ideal for companies wishing to do business with
              the local market as well as international clients.
            </p>
          </div>

          {/* <div className='max-w-3xl mx-auto text-center pb-12 md:pb-16' data-aos-id-cta>
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

          </div> */}
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
