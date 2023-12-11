import { Metadata } from 'next'

import { businessActivities } from '@/app/constants'
import Link from 'next/link'
import TickIcon from '@/components/tickIcon'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import { convertCurrency, getVisitorGeoInfo, objectToQueryString } from '@/lib/helpers'
import Trustpilot from '@/components/trustpilot'
import { Divider } from '@/components/divider'
import { getTestimonial, getTestimonials } from '@/lib/cms'
import { PrismicRichText } from '@prismicio/react'

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
    // firstName: string
    // lastName: string
    name: string
    phoneNumber: string
    email: string
    utmCampaign?: string
    utmMedium?: string
    utmSource?: string
    complete?: string
    country?: string
    currency?: string
  }
}) {
  const testimonial = await getTestimonial('ryan-martin')

  let mainlandPrice = 0.0
  let mainlandPriceConverted: number | string = 0.0

  let mainlandPriceLower = 0.0
  let mainlandPriceLowerConverted: number | string = 0.0

  let mainlandPriceUpper = 0.0
  let mainlandPriceUpperConverted: number | string = 0.0

  let freezonePrice = 0.0
  let freezonePriceConverted: number | string = 0.0

  let freezonePriceLower = 0.0
  let freezonePriceLowerConverted: number | string = 0.0

  let freezonePriceUpper = 0.0
  let freezonePriceUpperConverted: number | string = 0.0

  let businessActivityName
  let visaCount

  let currencyCode

  //Load any UTMs into an object for the form submission
  const utm = {
    utmCampaign: searchParams?.utmCampaign,
    utmMedium: searchParams?.utmMedium,
    utmSource: searchParams?.utmSource,
  }

  const isComplete = searchParams?.complete === 'true' ? true : false
  const calendarUrl = 'https://calendly.com/d/4cz-qzm-kdp/strive-consultants-dubai-discovery-call'
  const ctaUrl = `${calendarUrl}?name=${searchParams?.name}&email=${searchParams?.email}&a1=${searchParams?.phoneNumber}&utm_campaign=${utm.utmCampaign}&utm_medium=${utm.utmMedium}&utm_source=${utm.utmSource}`

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
    const visitorInfo = await getVisitorGeoInfo()

    let appendToUrl = '&complete=true'
    if (visitorInfo && !visitorInfo.error) {
      appendToUrl += `&country=${visitorInfo.countryCode}&currency=${visitorInfo.currencyCode}`
    }

    console.log(appendToUrl)

    redirect('?' + objectToQueryString(searchParams) + appendToUrl)
  }

  // const ip = await fetch('https://jsonip.com', { mode: 'cors'} )
  // .then((resp) => resp.json())
  // .then((ip) => {
  //   console.log(ip);
  //   return ip;
  // });

  // console.log('IP', ip)

  // const geoInfo = await fetch(`http://api.ipstack.com/${ip.ip.toString()}?access_key=e64b9120473b19a667c4b29b54336e49`)
  // .then((resp) => resp.json())
  // .then((geo) => {
  //   console.log(geo);
  //   return geo;
  // });

  await getVisitorGeoInfo()

  await Calculate()

  async function Calculate() {
    const businessactivity = parseInt(searchParams?.businessActivity ?? '0')
    const businessActivity = businessActivities.find((obj) => obj.id === businessactivity)
    businessActivityName = businessActivity?.label
    const visas: number = searchParams?.numberOfVisas ?? 1
    visaCount = visas

    if (businessActivity) {
      mainlandPrice = businessActivity.mainlandPrice + visas * businessActivity.additionalVisaPrice
      mainlandPriceLower = mainlandPrice - 3000
      mainlandPriceUpper = mainlandPrice + 3000

      freezonePrice = businessActivity.freeZonePrice + visas * businessActivity.additionalVisaPrice
      freezonePriceLower = freezonePrice - 3000
      freezonePriceUpper = freezonePrice + 3000

      //currency convert
      currencyCode = searchParams?.currency ?? 'USD'

      mainlandPriceConverted = await convertCurrency(mainlandPrice, 'AED', currencyCode)
      mainlandPriceLowerConverted = await convertCurrency(mainlandPriceLower, 'AED', currencyCode)
      mainlandPriceUpperConverted = await convertCurrency(mainlandPriceUpper, 'AED', currencyCode)

      freezonePriceConverted = await convertCurrency(freezonePrice, 'AED', currencyCode)
      freezonePriceLowerConverted = await convertCurrency(freezonePriceLower, 'AED', currencyCode)
      freezonePriceUpperConverted = await convertCurrency(freezonePriceUpper, 'AED', currencyCode)
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
                          {/* <div className='h4 md:h3 mb-1'>
                            Mainland: AED {mainlandPrice.toLocaleString()}
                          </div> */}
                          <div className='h5 md:h3 mb-1'>
                            Mainland
                            <br />
                            AED {mainlandPriceLower.toLocaleString()} - AED{' '}
                            {mainlandPriceUpper.toLocaleString()}
                          </div>
                          {/* <div className='mb-5 text-lg italic'>
                            Approx £{mainlandPriceConverted}
                          </div> */}
                          {currencyCode && (
                            <div className='mb-5 text-lg italic'>
                              Approx {currencyCode} {mainlandPriceLowerConverted} - {currencyCode}{' '}
                              {mainlandPriceUpperConverted}
                            </div>
                          )}

                          {/* <div className='h4 md:h3 mb-1'>
                            Free zone: AED {freezonePrice.toLocaleString()}
                          </div> */}
                          <div className='h5 md:h3 mb-1'>
                            Free zone
                            <br />
                            AED {freezonePriceLower.toLocaleString()} - AED{' '}
                            {freezonePriceUpper.toLocaleString()}
                          </div>
                          {/* <div className='mb-5 text-lg italic'>
                            Approx £{freezonePriceConverted}
                          </div> */}
                          {currencyCode && (
                            <div className='mb-5 text-lg italic'>
                              Approx {currencyCode} {freezonePriceLowerConverted} - {currencyCode}{' '}
                              {freezonePriceUpperConverted}
                            </div>
                          )}
                          <div className='text-sm'>Prices shown are indicative</div>
                        </div>

                        {/* <h4 className='h2 text-center'>The only call you need to have</h4> */}
                        <h4 className='h2 text-center'>Speak to a true consultancy</h4>

                        <div className={`w-full mx-auto text-center my-5`}>
                          <div data-aos='fade-up' data-aos-delay='600'>
                            <Link
                              className='btn text-white bg-purple-600 hover:bg-purple-600 w-full sm:w-auto sm:ml-4'
                              href={ctaUrl}
                            >
                              Schedule a call
                            </Link>
                          </div>
                        </div>

                        <p className='my-10'>
                          Company formation and residency is core to us at Strive. When you{' '}
                          <Link className='underline' href={ctaUrl}>
                            schedule a call
                          </Link>{' '}
                          to speak to us, you will be speaking to one of our senior management team,
                          and not a sales rep. We&apos;ll advise you on the best structure for your
                          new venture to help you to save money. As a{' '}
                          <Link className='underline' href={`/uae-accountancy-service`}>
                            Xero partner
                          </Link>
                          , we can even help ensure your financial compliance and accounting best
                          practices in the UAE.
                        </p>

                        <div className='mt-10 text-center'>
                          <Trustpilot />
                        </div>
                        <section>
                          <div className='max-w-6xl mx-auto px-4 sm:px-6'>
                            <Divider />

                            <div>
                              <div className='max-w-2xl mx-auto mb-20'>
                                <div
                                  className='flex flex-col h-full p-6 bg-gray-800'
                                  data-aos='fade-up'
                                >
                                  <div>
                                    <div className='relative inline-flex flex-col mb-4'>
                                      {testimonial.data?.avatar.url && (
                                        <Image
                                          className='rounded-full'
                                          src={testimonial.data?.avatar.url ?? ''}
                                          width={120}
                                          height={120}
                                          alt={`Testimonial from ${testimonial.data?.name ?? ''}`}
                                        />
                                      )}

                                      <svg
                                        className='absolute top-0 right-0 -mr-3 w-6 h-5 fill-current text-purple-600'
                                        viewBox='0 0 24 20'
                                        xmlns='http://www.w3.org/2000/svg'
                                      >
                                        <path d='M0 13.517c0-2.346.611-4.774 1.833-7.283C3.056 3.726 4.733 1.648 6.865 0L11 2.696C9.726 4.393 8.777 6.109 8.152 7.844c-.624 1.735-.936 3.589-.936 5.56v4.644H0v-4.531zm13 0c0-2.346.611-4.774 1.833-7.283 1.223-2.508 2.9-4.586 5.032-6.234L24 2.696c-1.274 1.697-2.223 3.413-2.848 5.148-.624 1.735-.936 3.589-.936 5.56v4.644H13v-4.531z' />
                                      </svg>
                                    </div>
                                  </div>
                                  <blockquote className='text-lg text-gray-400 grow'>
                                    <PrismicRichText
                                      field={testimonial.data?.description}
                                      components={{
                                        paragraph: ({ children }) => <p>{children}</p>,
                                      }}
                                    />
                                  </blockquote>
                                  <div className='text-gray-700 font-medium mt-6 pt-5 border-t border-gray-700'>
                                    <cite className='text-gray-200 not-italic'>
                                      {testimonial.data?.name ?? ''}
                                    </cite>{' '}
                                    -{' '}
                                    <div className='text-purple-600'>
                                      {testimonial.data?.job_title ?? ''}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </section>
                        <h4 className='h4'>How are our fees calculated?</h4>

                        <p className='my-5'>
                          Your estimate includes all government processing fees for your selected
                          business activity and visas, as well as our consultancy and service fee.
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
                            <span>Dedicated WhatsApp, phone and email based support</span>
                          </li>
                          <li className='flex items-center mx-3 my-1'>
                            <TickIcon />
                            <span>Concierge-based visa processing in Dubai</span>
                          </li>
                          <li className='flex items-center mx-3 my-1'>
                            <TickIcon />
                            <span>360° Business Support</span>
                          </li>
                        </ul>
                        {/* <h4 className='h4'>Financial Compliance</h4>

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
                        </div> */}

                        <h4 className='h4'>Mainland vs Free zone?</h4>
                        <p className='my-5 mb-5 prose-a:underline prose-a:text-gray-200 hover:prose-a:no-underline'>
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
