import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { getFooter } from '@/lib/cms'
import { PrismicLink, PrismicRichText } from '@prismicio/react'

export default async function Footer() {
  const footer = await getFooter()

  return (
    <footer>
      <div className='py-12 md:py-16'>
        <div className='max-w-6xl mx-auto px-4 sm:px-6'>
          {/* Top area: Blocks */}
          <div className='grid md:grid-cols-12 gap-8 lg:gap-20 mb-8 md:mb-12'>
            {/* 1st block */}
            <div className='md:col-span-4'>
              <div className='mb-2'>
                {/* Logo */}
                <Link href='/' className='inline-block' aria-label='Strive Consultants'>
                  <Image src='/images/logo/strive_logo.png' alt='Strive Consultants' width={150} height={55} />
                </Link>
              </div>
              <div className='text-gray-400'>
                <PrismicRichText
                  field={footer.data.description}
                  components={{
                    paragraph: ({ children }) => <p className='mb-6 text-sm'>{children}</p>,
                  }}
                />
              </div>
            </div>

            {/* 2nd, 3rd and 4th blocks */}
            <div className='md:col-span-8 grid sm:grid-cols-3 gap-12 md:gap-6'>
              {/* 2nd block */}
              <div className='text-sm'>
                <div className='text-gray-200 font-medium mb-3'>Business Activities</div>
                <ul className='space-y-2'>
                  {footer.data.business_activities_items.map((item) => {
                    return (
                      <li key={item.menu_label}>
                        <PrismicLink field={item.menu_link} className='text-gray-400 hover:text-gray-100 transition duration-150 ease-in-out'>
                          {item.menu_label}
                        </PrismicLink>
                      </li>
                    )
                  })}
                </ul>
              </div>

              {/* 4th block */}
              <div className='text-sm'>
                <div className='text-gray-200 font-medium mb-3'>Company</div>
                <ul className='space-y-2'>
                  {footer.data.company_items.map((item) => {
                    return (
                      <li key={item.menu_label}>
                        <PrismicLink field={item.menu_link} className='text-gray-400 hover:text-gray-100 transition duration-150 ease-in-out'>
                          {item.menu_label}
                        </PrismicLink>
                      </li>
                    )
                  })}
                </ul>
              </div>
              <div className='w-full md:py-10'>
                <Link href={'/uae-accountancy-service'}>
                  <Image className='md:mx-auto' src='/images/xero-certified-advisors.png' width={120} height={59} alt='Strive is a Xero Certified Advisor' />
                </Link>
              </div>
            </div>
          </div>

          <div className='md:flex md:items-center md:justify-between'>
            <ul className='flex mb-4 md:order-1 md:ml-4 md:mb-0'>
              <li className='ml-4'>
                <Link
                  href='https://www.facebook.com/strivedubai'
                  className='flex justify-center items-center text-purple-600 bg-gray-800 hover:text-gray-100 hover:bg-purple-600 rounded-full transition duration-150 ease-in-out'
                  aria-label='Facebook'
                >
                  <svg className='w-8 h-8 fill-current' viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'>
                    <path d='M14.023 24L14 17h-3v-3h3v-2c0-2.7 1.672-4 4.08-4 1.153 0 2.144.086 2.433.124v2.821h-1.67c-1.31 0-1.563.623-1.563 1.536V14H21l-1 3h-2.72v7h-3.257z' />
                  </svg>
                </Link>
              </li>
              <li className='ml-4'>
                <Link
                  href='https://www.instagram.com/strive_dubai/'
                  className='flex justify-center items-center text-purple-600 bg-gray-800 hover:text-gray-100 hover:bg-purple-600 rounded-full transition duration-150 ease-in-out'
                  aria-label='Instagram'
                >
                  <svg className='w-8 h-8 fill-current' viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'>
                    <circle cx='20.145' cy='11.892' r='1' />
                    <path d='M16 20c-2.206 0-4-1.794-4-4s1.794-4 4-4 4 1.794 4 4-1.794 4-4 4zm0-6c-1.103 0-2 .897-2 2s.897 2 2 2 2-.897 2-2-.897-2-2-2z' />
                    <path d='M20 24h-8c-2.056 0-4-1.944-4-4v-8c0-2.056 1.944-4 4-4h8c2.056 0 4 1.944 4 4v8c0 2.056-1.944 4-4 4zm-8-14c-.935 0-2 1.065-2 2v8c0 .953 1.047 2 2 2h8c.935 0 2-1.065 2-2v-8c0-.935-1.065-2-2-2h-8z' />
                  </svg>
                </Link>
              </li>
              <li className='ml-4'>
                <Link
                  href='https://www.linkedin.com/company/strive-consultants/'
                  className='flex justify-center items-center text-purple-600 bg-gray-800 hover:text-gray-100 hover:bg-purple-600 rounded-full transition duration-150 ease-in-out'
                  aria-label='Linkedin'
                >
                  <svg className='w-8 h-8 fill-current' viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'>
                    <path d='M23.3 8H8.7c-.4 0-.7.3-.7.7v14.7c0 .3.3.6.7.6h14.7c.4 0 .7-.3.7-.7V8.7c-.1-.4-.4-.7-.8-.7zM12.7 21.6h-2.3V14h2.4v7.6h-.1zM11.6 13c-.8 0-1.4-.7-1.4-1.4 0-.8.6-1.4 1.4-1.4.8 0 1.4.6 1.4 1.4-.1.7-.7 1.4-1.4 1.4zm10 8.6h-2.4v-3.7c0-.9 0-2-1.2-2s-1.4 1-1.4 2v3.8h-2.4V14h2.3v1c.3-.6 1.1-1.2 2.2-1.2 2.4 0 2.8 1.6 2.8 3.6v4.2h.1z' />
                  </svg>
                </Link>
              </li>
              <li className='ml-4'>
                <Link
                  href='https://www.youtube.com/@strivedubai'
                  className='flex justify-center items-center text-purple-600 bg-gray-800 hover:text-gray-100 hover:bg-purple-600 rounded-full transition duration-150 ease-in-out'
                  aria-label='YouTube'
                >
                  {/* transform: translate(4px, 4px); */}
                  <svg xmlns='http://www.w3.org/2000/svg' className='w-8 h-8 fill-current youtube-icon' viewBox='0 0 32 32'>
                    <path d='M4.652 0h1.44l.988 3.702.916-3.702h1.454l-1.665 5.505v3.757h-1.431v-3.757l-1.702-5.505zm6.594 2.373c-1.119 0-1.861.74-1.861 1.835v3.349c0 1.204.629 1.831 1.861 1.831 1.022 0 1.826-.683 1.826-1.831v-3.349c0-1.069-.797-1.835-1.826-1.835zm.531 5.127c0 .372-.19.646-.532.646-.351 0-.554-.287-.554-.646v-3.179c0-.374.172-.651.529-.651.39 0 .557.269.557.651v3.179zm4.729-5.07v5.186c-.155.194-.5.512-.747.512-.271 0-.338-.186-.338-.46v-5.238h-1.27v5.71c0 .675.206 1.22.887 1.22.384 0 .918-.2 1.468-.853v.754h1.27v-6.831h-1.27zm2.203 13.858c-.448 0-.541.315-.541.763v.659h1.069v-.66c.001-.44-.092-.762-.528-.762zm-4.703.04c-.084.043-.167.109-.25.198v4.055c.099.106.194.182.287.229.197.1.485.107.619-.067.07-.092.105-.241.105-.449v-3.359c0-.22-.043-.386-.129-.5-.147-.193-.42-.214-.632-.107zm4.827-5.195c-2.604-.177-11.066-.177-13.666 0-2.814.192-3.146 1.892-3.167 6.367.021 4.467.35 6.175 3.167 6.367 2.6.177 11.062.177 13.666 0 2.814-.192 3.146-1.893 3.167-6.367-.021-4.467-.35-6.175-3.167-6.367zm-12.324 10.686h-1.363v-7.54h-1.41v-1.28h4.182v1.28h-1.41v7.54zm4.846 0h-1.21v-.718c-.223.265-.455.467-.696.605-.652.374-1.547.365-1.547-.955v-5.438h1.209v4.988c0 .262.063.438.322.438.236 0 .564-.303.711-.487v-4.939h1.21v6.506zm4.657-1.348c0 .805-.301 1.431-1.106 1.431-.443 0-.812-.162-1.149-.583v.5h-1.221v-8.82h1.221v2.84c.273-.333.644-.608 1.076-.608.886 0 1.18.749 1.18 1.631v3.609zm4.471-1.752h-2.314v1.228c0 .488.042.91.528.91.511 0 .541-.344.541-.91v-.452h1.245v.489c0 1.253-.538 2.013-1.813 2.013-1.155 0-1.746-.842-1.746-2.013v-2.921c0-1.129.746-1.914 1.837-1.914 1.161 0 1.721.738 1.721 1.914v1.656z' />
                  </svg>
                </Link>
              </li>
            </ul>

            <div className='text-gray-400 text-sm mr-4'>&copy; strive.ae. All rights reserved.</div>
          </div>
        </div>
      </div>
    </footer>
  )
}
