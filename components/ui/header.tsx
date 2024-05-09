import Link from 'next/link'
import Image from 'next/image'
import Dropdown from '@/components/utils/dropdown'
import MobileMenu from './mobile-menu'
import { getFooter, getGlobalNav } from '@/lib/cms'
import { PrismicLink } from '@prismicio/react'

export default async function Header() {
  const nav = await getGlobalNav()
  const footer = await getFooter()

  return (
    <header className='bg-gray-900 w-full z-30 fixed top-0 shadow-md' id='top'>
      <div className='max-w-6xl mx-auto px-4 sm:px-6'>
        <div className='flex items-center justify-between h-20'>
          <div className='shrink-0 mr-4'>
            <Link href='/' className='block' aria-label='Strive Consultants'>
              <Image src='/images/logo/strive_logo.png' alt='Strive Consultants' width={150} height={55} priority={true} />
            </Link>
          </div>

          <nav className='hidden md:flex md:grow'>
            <ul className='flex grow justify-end flex-wrap items-center'>
              <Dropdown title='Business Setup'>
                {nav.data.company_formation_items.map((item) => {
                  return (
                    <li key={item.menu_label}>
                      <PrismicLink field={item.menu_link} className='font-medium text-sm text-gray-400 hover:text-purple-600 flex py-2 px-4 leading-tight'>
                        {item.menu_label}
                      </PrismicLink>
                    </li>
                  )
                })}
              </Dropdown>
              <Dropdown title='Residency Visa'>
                {nav.data.residency_visa_items.map((item) => {
                  return (
                    <li key={item.menu_label}>
                      <PrismicLink field={item.menu_link} className='font-medium text-sm text-gray-400 hover:text-purple-600 flex py-2 px-4 leading-tight'>
                        {item.menu_label}
                      </PrismicLink>
                    </li>
                  )
                })}
              </Dropdown>
              {/* <li>
                <Link
                  href='/dubai-residency-visa'
                  className='text-gray-300 hover:text-gray-200 px-4 py-2 flex items-center transition duration-150 ease-in-out'
                >
                  Residency Visa
                </Link>
              </li> */}
              {/* <li>
                <Link
                  href='/uae-accountancy-service'
                  className='text-gray-300 hover:text-gray-200 px-4 py-2 flex items-center transition duration-150 ease-in-out'
                >
                  Accounting
                </Link>
              </li> */}
              {/* <Dropdown title='Accounting'>
                {nav.data.accountancy_items.map((item) => {
                  return (
                    <li key={item.menu_label}>
                      <PrismicLink
                        field={item.menu_link}
                        className='font-medium text-sm text-gray-400 hover:text-purple-600 flex py-2 px-4 leading-tight'
                      >
                        {item.menu_label}
                      </PrismicLink>
                    </li>
                  )
                })}
              </Dropdown> */}
              <Dropdown title='Business Services'>
                {nav.data.accountancy_items.map((item) => {
                  return (
                    <li key={item.menu_label}>
                      <PrismicLink field={item.menu_link} className='font-medium text-sm text-gray-400 hover:text-purple-600 flex py-2 px-4 leading-tight'>
                        {item.menu_label}
                      </PrismicLink>
                    </li>
                  )
                })}
                {nav.data.business_services_items.map((item) => {
                  return (
                    <li key={item.menu_label}>
                      <PrismicLink field={item.menu_link} className='font-medium text-sm text-gray-400 hover:text-purple-600 flex py-2 px-4 leading-tight'>
                        {item.menu_label}
                      </PrismicLink>
                    </li>
                  )
                })}
              </Dropdown>
              <Dropdown title='Resources'>
                <Link href='/tools/cost-calculator' className='font-medium text-sm text-gray-400 hover:text-purple-600 flex py-2 px-4 leading-tight'>
                  Cost Calculator
                </Link>
                <Link href='/tools/business-name-checker' className='font-medium text-sm text-gray-400 hover:text-purple-600 flex py-2 px-4 leading-tight'>
                  Business Name Checker
                </Link>
                <Link href='/blog' className='font-medium text-sm text-gray-400 hover:text-purple-600 flex py-2 px-4 leading-tight'>
                  Blog
                </Link>
              </Dropdown>
            </ul>

            <ul className='flex grow justify-end flex-wrap items-center'>
              <li>
                <Link href='/tools/cost-calculator' className='btn-sm btn-cost-calculator text-white bg-purple-600 hover:bg-purple-700 ml-3'>
                  <Image src='/images/icon-calculator.png' alt='Dubai Cost calculator' width={24} height={24} />
                </Link>
              </li>
              <li>
                <PrismicLink field={nav.data.cta_link} className='btn-sm text-white bg-purple-600 hover:bg-purple-700 ml-3'>
                  {nav.data.cta_text}
                </PrismicLink>
              </li>
            </ul>
          </nav>

          <MobileMenu navigation={nav} footer={footer} />
        </div>
      </div>
    </header>
  )
}
