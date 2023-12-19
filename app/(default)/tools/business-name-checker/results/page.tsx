import { Metadata } from 'next'

import { businessActivities } from '@/app/constants'
import Link from 'next/link'
import TickIcon from '@/components/tickIcon'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import { convertCurrency, getVisitorGeoInfo, objectToQueryString } from '@/lib/helpers'
import Trustpilot from '@/components/trustpilot'
import { getTestimonial } from '@/lib/cms'
import { Divider } from '@/components/divider'
import { PrismicRichText } from '@prismicio/react'
import BusinessFormationCost from '@/components/calculators/business-formation-cost'

export const metadata: Metadata = {
  robots: { index: false, follow: false },
  title: 'UAE Business Name Checker Results',
}

export default async function Page({
  params,
  searchParams,
}: {
  params: { slug: string }
  searchParams?: {
    formName: string
    businessActivity: string
    companyName: number
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

  let businessActivityName
  let companyName

  //Load any UTMs into an object for the form submission
  const utm = {
    utmCampaign: searchParams?.utmCampaign != 'undefined' ? searchParams?.utmCampaign : '',
    utmMedium: searchParams?.utmMedium != 'undefined' ? searchParams?.utmMedium : '',
    utmSource: searchParams?.utmSource != 'undefined' ? searchParams?.utmSource : '',
  }

  const isComplete = searchParams?.complete === 'true' ? true : false
  const ctaUrl = `${process.env.ROUNDROBIN_CALENDAR_URL}?name=${searchParams?.name}&email=${searchParams?.email}&a1=${searchParams?.phoneNumber}&utm_campaign=${utm.utmCampaign}&utm_medium=${utm.utmMedium}&utm_source=${utm.utmSource}`

  //Prevent double lead creation if refreshed
  if (!isComplete) {
    //Create a lead
    const formData = {
      name: searchParams?.name,
      email: searchParams?.email,
      phoneNumber: searchParams?.phoneNumber,
      formName: searchParams?.formName,
      dateTime: new Date().toISOString(),
      note: 'Company name: ' + searchParams?.companyName,
      utm: utm,
    }

    await fetch(process.env.BASE_URL + '/api/forms/prefill', {
      method: 'POST',
      body: JSON.stringify(formData),
    })
  }

  const businessactivity = parseInt(searchParams?.businessActivity ?? '0')
  const businessActivity = businessActivities.find((obj) => obj.id === businessactivity)
  businessActivityName = businessActivity?.label

  companyName = searchParams?.companyName + ' ' + businessActivityName?.toLowerCase().replace('consultancy', '')

  //Pass the redirect url to our client component which does the processing and pushes complete=true to the querystring to prevent refreshes
  const redirectUrl = '?' + objectToQueryString(searchParams)

  return (
    <>
      {/* for Google enhanced conversion tracking */}
      <input type='hidden' id='name' name='name' value={searchParams?.name} />
      <input type='hidden' id='email' name='email' value={searchParams?.email} />
      <input type='hidden' id='phone' name='phone' value={searchParams?.phoneNumber} />

      <section className='relative'>
        <div className='max-w-6xl mx-auto px-4 sm:px-6 relative'>
          <div className='pt-32 md:pt-40'>
            <div className='flex flex-col md:flex-row'>
              <div className={`w-full mx-auto`}>
                <h1 className='h1 mb-4 text-center' data-aos='fade-up'>
                  UAE Business Name Checker
                </h1>

                <p className='text-xl text-center text-gray-400 prose-a:underline prose-a:text-gray-200 hover:prose-a:no-underline' data-aos='fade-up' data-aos-delay='200'>
                  Great news! Your company name may be available 🚀
                </p>

                <div className='max-w-3xl mx-auto px-4 sm:px-6 relative'>
                  <div className='mt-10 pb-5'>
                    <div className='w-full md:w-3/4 mx-auto border-purple-200 border-4 rounded p-5 mb-5 text-center' data-aos='fade-up' data-aos-delay='600'>
                      <div className='h4 md:h3 mb-1 uppercase'>{companyName}</div>
                      <p className='mb-2'>
                        Available as an <span className='text-purple-600'>LLC (limited liability company)</span> or a <span className='text-purple-600'>FZCO (free zone company)</span>{' '}
                        {businessActivityName} business for as low as
                      </p>

                      <BusinessFormationCost businessActivityId={searchParams?.businessActivity ?? ''} visas={1} redirectUrl={redirectUrl} />

                      <div className='text-sm'>*Prices shown are indicative. Final company name subject to company registry check during application</div>
                    </div>

                    <h4 className='h2 text-center' data-aos='fade-up' data-aos-delay='200'>
                      Speak to a true consultancy
                    </h4>

                    <div className={`w-full mx-auto text-center my-5`}>
                      <div data-aos='fade-up' data-aos-delay='100'>
                        <Link className='btn text-white bg-purple-600 hover:bg-purple-600 w-full sm:w-auto sm:ml-4' href={ctaUrl}>
                          Schedule a call
                        </Link>
                      </div>
                    </div>

                    <p className='my-10'>
                      Company formation and residency is core to us at Strive. When you{' '}
                      <Link className='underline' href={ctaUrl}>
                        schedule a call
                      </Link>{' '}
                      to speak to us, you will be speaking to one of our senior management team, and not a sales rep. We&apos;ll advise you on the best structure for your new venture to help you to
                      save money. As a{' '}
                      <Link className='underline' href={`/uae-accountancy-service`}>
                        Xero partner
                      </Link>
                      , we can even help ensure your financial compliance and accounting best practices in the UAE.
                    </p>

                    <div className='mt-10 text-center'>
                      <Trustpilot />
                    </div>
                    <section>
                      <div className='max-w-6xl mx-auto px-4 sm:px-6'>
                        <Divider />

                        <div>
                          <div className='max-w-2xl mx-auto mb-20'>
                            <div className='flex flex-col h-full p-6 bg-gray-800' data-aos='fade-up'>
                              <div>
                                <div className='relative inline-flex flex-col mb-4'>
                                  {testimonial.data?.avatar.url && (
                                    <Image className='rounded-full' src={testimonial.data?.avatar.url ?? ''} width={120} height={120} alt={`Testimonial from ${testimonial.data?.name ?? ''}`} />
                                  )}

                                  <svg className='absolute top-0 right-0 -mr-3 w-6 h-5 fill-current text-purple-600' viewBox='0 0 24 20' xmlns='http://www.w3.org/2000/svg'>
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
                                <cite className='text-gray-200 not-italic'>{testimonial.data?.name ?? ''}</cite> - <div className='text-purple-600'>{testimonial.data?.job_title ?? ''}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </section>

                    <h4 className='h4'>How are our fees calculated?</h4>

                    <p className='my-5'>Your estimate includes all government processing fees for your selected business activity and visas, as well as our consultancy and service fee.</p>
                    <ul className='justify-center text-lg text-gray-400 -mx-2 -my-1 mb-10'>
                      <li className='flex items-center mx-3 my-1' data-aos-anchor='[data-aos-id-cta]'>
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
                    <h4 className='h4'>Mainland vs Free zone?</h4>
                    <p className='my-5 mb-5 prose-a:underline prose-a:text-gray-200 hover:prose-a:no-underline'>
                      There are 2 different types of licence available in the UAE.{' '}
                      <Link href='/dubai-freezone-company-formation' target='_blank'>
                        Free zone licences
                      </Link>{' '}
                      are often perfect for smaller businesses which have an international client base and only require up to 6 residence visas.{' '}
                      <Link href='/dubai-mainland-company-formation' target='_blank'>
                        Mainland licences
                      </Link>{' '}
                      are more like a traditional licence as you would find in any other country, and are ideal for companies wishing to do business with the local market as well as international
                      clients.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className='relative'></section>
    </>
  )
}
