import { Metadata } from 'next'

import { businessActivities } from '@/app/constants'
import Link from 'next/link'
import TickIcon from '@/components/tickIcon'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import { convertCurrency, objectToQueryString } from '@/lib/helpers'

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title: 'Your Estimate',
}

export default async function Page({
  params,
  searchParams,
}: {
  params: { slug: string }
  searchParams?: {
    formName: string
    businessActivity: string
    numberOfVisas: number
    firstName: string
    lastName: string
    name: string
    phoneNumber: string
    email: string
    utmCampaign?: string
    utmMedium?: string
    utmSource?: string
    complete?: string
  }
}) {
  let mainlandPrice = 0.0
  let mainlandPriceConverted: number | string = 0.0
  let freezonePrice = 0.0
  let freezonePriceConverted: number | string = 0.0
  let businessActivityName
  let visaCount

  //Load any UTMs into an object for the form submission
  const utm = {
    utmCampaign: searchParams?.utmCampaign,
    utmMedium: searchParams?.utmMedium,
    utmSource: searchParams?.utmSource,
  }

  const isComplete = searchParams?.complete === 'true' ? true : false
  const calendarUrl = 'https://calendly.com/d/4cz-qzm-kdp/strive-consultants-dubai-discovery-call'
  const ctaUrl = `${calendarUrl}?name=${searchParams?.firstName}&email=${searchParams?.email}&a1=${searchParams?.phoneNumber}&utm_campaign=${utm.utmCampaign}&utm_medium=${utm.utmMedium}&utm_source=${utm.utmSource}`

  //Create a lead
  const formData = {
    name: searchParams?.name,
    email: searchParams?.email,
    phoneNumber: searchParams?.phoneNumber,
    formName: searchParams?.formName,
    dateTime: new Date().toISOString(),
    utm: utm,
  }

  // await fetch('/api/forms/prefill', {
  //   method: 'POST',
  //   body: JSON.stringify(formData),
  // })

  //Prevent double lead creation if refreshed
  if (!isComplete) {
    redirect('?' + objectToQueryString(searchParams) + '&complete=true')
  }

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

  return (
    <>
      <section className='relative'>
        <div className='max-w-6xl mx-auto px-4 sm:px-6 relative'>
          <div className='pt-32 md:pt-40'>
            <div className='flex flex-col md:flex-row'>
              <div className={`w-full mx-auto`}>
                <h1 className='h1 mb-4 text-center' data-aos='fade-up'>
                  Your Estimate
                </h1>

                {isComplete && (
                  <>
                    <p
                      className='text-xl text-center text-gray-400 prose-a:underline prose-a:text-gray-200 hover:prose-a:no-underline'
                      data-aos='fade-up'
                      data-aos-delay='200'
                    >
                      Here is your estimate for getting your business set up in the UAE 🚀
                    </p>

                    <div className='max-w-3xl mx-auto px-4 sm:px-6 relative'>
                      <div className='mt-10 pb-5'>
                        <div
                          className='w-full md:w-3/4 mx-auto border-purple-200 border-4 rounded p-5 mb-5 text-center'
                          data-aos='fade-up'
                          data-aos-delay='600'
                        >
                          <p className='mb-2'>
                            <span className='text-purple-600'>{businessActivityName}</span> business
                            licence and{' '}
                            <span className='text-purple-600'>{visaCount} residence visa(s)</span>
                          </p>
                          <div className='h4 md:h3 mb-1'>
                            Mainland: AED {mainlandPrice.toLocaleString()}
                          </div>
                          <div className='mb-5 text-lg italic'>
                            Approx £{mainlandPriceConverted}
                          </div>

                          <div className='h4 md:h3 mb-1'>
                            Free zone: AED {freezonePrice.toLocaleString()}
                          </div>
                          <div className='mb-5 text-lg italic'>
                            Approx £{freezonePriceConverted}
                          </div>

                          <div className='text-sm'>
                            Prices shown are indicative. Service fees apply
                          </div>
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
                          Your estimate includes all government processing fees for your selected
                          business activity and visas. Our service fees will be calculated based on
                          your exact requirements. We also offer fast track processing options to
                          get your business and residence visas in the shortest possible time.
                        </p>
                        <ul className='justify-center text-lg text-gray-400 -mx-2 -my-1 mb-10'>
                          <li
                            className='flex items-center mx-3 my-1'
                            data-aos-anchor='[data-aos-id-cta]'
                          >
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
                          <div className='w-full md:w-2/3'>
                            <p className='my-5'>
                              Strive are a certified Xero partner and will ensure your business
                              follows all of the latest financial compliance guidelines in the UAE.
                            </p>
                            <ul className='justify-center text-lg text-gray-400 -mx-2 -my-1 mb-10'>
                              <li
                                className='flex items-center mx-3 my-1'
                                data-aos-anchor='[data-aos-id-cta]'
                              >
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
                          <div className='w-full md:w-1/3 flex items-center justify-center order-first md:order-last'>
                            <Image
                              src='/images/xero-logo-hires-RGB.png'
                              alt='Strive is a Xero Partner'
                              width={160}
                              height={160}
                            />
                          </div>
                        </div>

                        <h4 className='h4'>Mainland vs Free zone?</h4>
                        <p className='mb-5 prose-a:underline prose-a:text-gray-200 hover:prose-a:no-underline'>
                          There are 2 different types of licence available in the UAE.{' '}
                          <Link href='/dubai-freezone-company-formation' target='_blank'>
                            Free zone licences
                          </Link>{' '}
                          are perfect for smaller businesses which have an international client base
                          and only require up to 5 residence visas.{' '}
                          <Link href='/dubai-mainland-company-formation' target='_blank'>
                            Mainland licences
                          </Link>{' '}
                          are the more like a traditional licence as you would find in any other
                          country and are ideal for companies wishing to do business with the local
                          market as well as international clients.
                        </p>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className='relative'></section>
    </>
  )
}
