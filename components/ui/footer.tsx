import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { getFooter } from '@/lib/cms'
import { PrismicLink, PrismicRichText } from '@prismicio/react'

export default async function Footer() {
  const footer = await getFooter()

  return (
    <footer>
      <div className='py-12 md:py-16 pb-36'>
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
              <ul className='flex mb-4 md:order-1 md:ml-0 md:mb-0'>
                <li className='ml-0'>
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
                <li className='ml-4'>
                  <Link
                    href='https://www.tiktok.com/@strive_dubai'
                    className='flex justify-center items-center text-purple-600 bg-gray-800 hover:text-gray-100 hover:bg-purple-600 rounded-full transition duration-150 ease-in-out'
                    aria-label='TikTok'
                  >
                    <svg xmlns='http://www.w3.org/2000/svg' className='w-8 h-8 fill-current tiktok-icon' width='32px' height='32px' viewBox='0 0 32 32' version='1.1'>
                      <path d='M 25.761719 7.417969 C 25.558594 7.3125 25.363281 7.195312 25.171875 7.074219 C 24.617188 6.707031 24.105469 6.273438 23.65625 5.785156 C 22.523438 4.488281 22.101562 3.175781 21.945312 2.257812 L 21.953125 2.257812 C 21.820312 1.492188 21.875 1 21.882812 1 L 16.730469 1 L 16.730469 20.921875 C 16.730469 21.191406 16.730469 21.457031 16.71875 21.71875 C 16.71875 21.75 16.714844 21.78125 16.714844 21.8125 C 16.714844 21.828125 16.714844 21.84375 16.710938 21.859375 C 16.710938 21.863281 16.710938 21.867188 16.710938 21.871094 C 16.601562 23.320312 15.777344 24.625 14.511719 25.34375 C 13.859375 25.710938 13.125 25.90625 12.378906 25.90625 C 9.976562 25.90625 8.03125 23.949219 8.03125 21.53125 C 8.03125 19.113281 9.976562 17.15625 12.378906 17.15625 C 12.832031 17.15625 13.285156 17.226562 13.714844 17.367188 L 13.722656 12.121094 C 11.070312 11.777344 8.398438 12.558594 6.347656 14.277344 C 5.460938 15.050781 4.710938 15.96875 4.140625 17 C 3.921875 17.375 3.101562 18.878906 3.003906 21.328125 C 2.941406 22.714844 3.359375 24.152344 3.558594 24.746094 L 3.558594 24.757812 C 3.683594 25.109375 4.167969 26.304688 4.957031 27.3125 C 5.59375 28.117188 6.34375 28.828125 7.1875 29.417969 L 7.1875 29.402344 L 7.199219 29.417969 C 9.695312 31.109375 12.460938 31 12.460938 31 C 12.9375 30.980469 14.542969 31 16.363281 30.136719 C 18.382812 29.179688 19.535156 27.753906 19.535156 27.753906 C 20.269531 26.902344 20.851562 25.933594 21.261719 24.882812 C 21.726562 23.65625 21.882812 22.1875 21.882812 21.601562 L 21.882812 11.03125 C 21.945312 11.066406 22.777344 11.617188 22.777344 11.617188 C 22.777344 11.617188 23.976562 12.386719 25.847656 12.886719 C 27.191406 13.246094 29 13.320312 29 13.320312 L 29 8.203125 C 28.367188 8.273438 27.078125 8.074219 25.761719 7.417969 Z M 25.761719 7.417969 ' />
                    </svg>
                  </Link>
                </li>
              </ul>
            </div>

            {/* 2nd, 3rd and 4th blocks */}
            <div className='md:col-span-8 flex flex-wrap justify-between sm:grid-cols-3 gap-12 md:gap-6'>
              {/* 2nd block */}
              <div className='text-sm'>
                <div className='text-gray-200 font-medium mb-3'>Company</div>
                <ul className='space-y-2'>
                  {footer?.data?.company_items?.map((item) => {
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

              <div className='text-sm'>
                <div className='text-gray-200 font-medium mb-3'>Tailored Global Solutions</div>
                <ul className='space-y-2'>
                  {footer?.data?.free_zone_items?.map((item) => {
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
                <div className='text-gray-200 font-medium mb-3'>Business Activities</div>
                <ul className='space-y-2'>
                  {footer?.data?.business_activities_items?.map((item) => {
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
            </div>
          </div>
          <div className='md:col-span-4 flex items-center sm:grid-cols-2'>
            <div className='md:flex md:items-center md:justify-end mr-2 mb-4'>
              <Link href={'/uae-accountancy-service'}>
                <Image className='md:mx-auto' src='/images/xero-silver-partner-strive.png' width={160} height={78} alt='Strive is a Xero Silver Partner' />
              </Link>
            </div>
            <div className='md:flex md:items-center md:justify-start ml-2 mb-4'>
              <Link href={'/uae-accountancy-service'}>
                <Image className='md:mx-auto' src='/images/zoho.png' width={160} height={78} alt='Strive is a Zoho Partner' />
              </Link>
            </div>
            <div className='md:flex md:items-center md:justify-start ml-2 mb-4'>
              <Link href={'/uae-accountancy-service'}>
                <Image className='md:mx-auto' src='/images/quickbooks.png' width={160} height={78} alt='Strive is a quickbooks Partner' />
              </Link>
            </div>
          </div>
          <div className='md:flex md:items-center md:justify-center'>
            <div className='text-gray-400 text-sm mr-4 text-center'>
              &copy; strive.ae. All rights reserved. <br />
              <a href='https://strive.ae/privacy-policy'>Privacy Policy</a> / <a href='https://strive.ae/terms-and-conditions'>Terms and conditions</a> / <a href='https://strive.ae/cookies-policy'>Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
