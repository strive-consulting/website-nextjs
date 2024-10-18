'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { FooterDocument, GlobalNavDocument } from '@/prismicio-types'
import { PrismicLink } from '@prismicio/react'
import FloatingButton from './floating-contact'
interface MobileNavProps {
  navigation: GlobalNavDocument<string>
  footer: FooterDocument<string>
}

export default function MobileMenu({ navigation, footer }: MobileNavProps) {
  const [mobileNavOpen, setMobileNavOpen] = useState<boolean>(false)

  const trigger = useRef<HTMLButtonElement>(null)
  const mobileNav = useRef<HTMLDivElement>(null)

  // close the mobile menu on click outside
  useEffect(() => {
    const clickHandler = ({ target }: { target: EventTarget | null }): void => {
      if (!mobileNav.current || !trigger.current) return
      if (!mobileNavOpen || mobileNav.current.contains(target as Node) || trigger.current.contains(target as Node)) return
      setMobileNavOpen(false)
    }
    document.addEventListener('click', clickHandler)
    return () => document.removeEventListener('click', clickHandler)
  })

  // close the mobile menu if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: { keyCode: number }): void => {
      if (!mobileNavOpen || keyCode !== 27) return
      setMobileNavOpen(false)
    }
    document.addEventListener('keydown', keyHandler)
    return () => document.removeEventListener('keydown', keyHandler)
  })
  // Nested menu toggle function
  const handleNestedMenuToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    document.querySelectorAll('.submenu').forEach((submenu) => {
      if (submenu !== e.currentTarget.nextElementSibling) {
        submenu.classList.add('hidden'); // Close submenu
        submenu.previousElementSibling?.classList.remove('text-white'); // Reset button color
        submenu.previousElementSibling?.querySelector('svg')?.classList.remove('rotate-180'); // Reset icon rotation
      }
    });
    const nestedMenu = e.currentTarget.nextElementSibling;
    if (nestedMenu) {
      nestedMenu.classList.toggle('hidden');
      e.currentTarget.classList.toggle('text-white');
      e.currentTarget.querySelector('svg')?.classList.toggle('rotate-180');
    }
  }
  return (
    <div className='md:hidden flex justify-end bg-gray-900 shadow-md pb-2 w-full px-4'>
      {/* Hamburger button */}
      <button ref={trigger} className={`hamburger ${mobileNavOpen && 'active'}`} aria-controls='mobile-nav' aria-expanded={mobileNavOpen} onClick={() => setMobileNavOpen(!mobileNavOpen)}>
        <span className='sr-only'>Menu</span>
        <svg className='w-6 h-6 fill-current text-gray-300 hover:text-gray-200 transition duration-150 ease-in-out' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
          <rect y='4' width='24' height='2' rx='1' />
          <rect y='11' width='24' height='2' rx='1' />
          <rect y='18' width='24' height='2' rx='1' />
        </svg>
      </button>

      {/*Mobile navigation */}
      <nav
        id='mobile-nav'
        ref={mobileNav}
        className='absolute top-20 z-20 left-0 w-full px-4 sm:px-6 overflow-hidden transition-all duration-300 ease-in-out'
        style={mobileNavOpen ? { opacity: 1 } : { maxHeight: 0, opacity: 0.8 }}
      >
        <ul className='bg-gray-800 px-4 py-2'>
          <li key="menu-1">
              <button
                className="flex items-center justify-between w-full flex text-gray-300 hover:text-gray-200 py-4"
                onClick={handleNestedMenuToggle}
              >
                Setting up a company in Dubai
                <svg className="w-4 h-4 transition-transform rotate-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 9l6 6 6-6" />
                </svg>
              </button>
              <ul className="submenu pl-4 hidden space-y-2">
                <li>
                  <Link href='/dubai-company-set-up' className='flex text-gray-300 hover:text-gray-200 py-2' onClick={() => setMobileNavOpen(false)}>
                    Company Formation
                  </Link>
                </li>
                <li>
                  <Link href='/dubai-mainland-company-formation' className='flex text-gray-300 hover:text-gray-200 py-2' onClick={() => setMobileNavOpen(false)}>
                    Mainland Commpany Formation
                  </Link>
                </li>
                <li>
                  <Link href='/dubai-freezone-company-formation' className='flex text-gray-300 hover:text-gray-200 py-2' onClick={() => setMobileNavOpen(false)}>
                    Freezone Commpany Formation
                  </Link>
                </li>
                <li>
                  <Link href='/dubai-offshore-company-formation' className='flex text-gray-300 hover:text-gray-200 py-2' onClick={() => setMobileNavOpen(false)}>
                    Offshore Commpany Formation
                  </Link>
                </li>
              </ul>
          </li>
          <li key="menu-2">
              <button
                className="flex items-center justify-between w-full flex text-gray-300 hover:text-gray-200 py-4"
                onClick={handleNestedMenuToggle}
              >
                Dubai Residency Visa
                <svg className="w-4 h-4 transition-transform rotate-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 9l6 6 6-6" />
                </svg>
              </button>
              <ul className="submenu pl-4 hidden space-y-2">
                <li>
                  <Link href='/dubai-residency-visa' className='flex text-gray-300 hover:text-gray-200 py-2' onClick={() => setMobileNavOpen(false)}>
                    Residency Visa via Company Formation
                  </Link>
                </li>
                <li>
                  <Link href='/uae-golden-visa' className='flex text-gray-300 hover:text-gray-200 py-2' onClick={() => setMobileNavOpen(false)}>
                    Golden Visa
                  </Link>
                </li>
                <li>
                  <Link href='/freelance-visa-dubai' className='flex text-gray-300 hover:text-gray-200 py-2' onClick={() => setMobileNavOpen(false)}>
                    Freelance Visa
                  </Link>
                </li>
              </ul>
          </li>
          <li  key="menu-3">
              <button
                className="flex items-center justify-between w-full flex text-gray-300 hover:text-gray-200 py-4"
                onClick={handleNestedMenuToggle}
              >
                Business Services
                <svg className="w-4 h-4 transition-transform rotate-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 9l6 6 6-6" />
                </svg>
              </button>
              <ul className="submenu pl-4 hidden space-y-2">
                <li>
                  <Link href='/uae-accountancy-service' className='flex text-gray-300 hover:text-gray-200 py-2' onClick={() => setMobileNavOpen(false)}>
                    Accounting & Bookkeeping
                  </Link>
                </li>
                <li>
                  <Link href='/uae-business-bank-account' className='flex text-gray-300 hover:text-gray-200 py-2' onClick={() => setMobileNavOpen(false)}>
                    Business Bank Account
                  </Link>
                </li>
                <li>
                  <Link href='/uae-digital-currency-business-account' className='flex text-gray-300 hover:text-gray-200 py-2' onClick={() => setMobileNavOpen(false)}>
                    Digital Currency Business Account
                  </Link>
                </li>
                <li>
                  <Link href='/cryptocurrency-dubai' className='flex text-gray-300 hover:text-gray-200 py-2' onClick={() => setMobileNavOpen(false)}>
                    Cryptocurrency Solutions
                  </Link>
                </li>
              </ul>
              
          </li>
          <li  key="menu-4">
              <button
                className="flex items-center justify-between w-full flex text-gray-300 hover:text-gray-200 py-4"
                onClick={handleNestedMenuToggle}
              >
                Resources
                <svg className="w-4 h-4 transition-transform rotate-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 9l6 6 6-6" />
                </svg>
              </button>
              <ul className="submenu pl-4 hidden space-y-2 transition ease-in-out delay-150">
                <li>
                  <Link href='/tools/cost-calculator' className='flex text-gray-300 hover:text-gray-200 py-2' onClick={() => setMobileNavOpen(false)}>
                    Cost Calculator
                  </Link>
                </li>
                <li>
                  <Link href='/tools/business-name-checker' className='flex text-gray-300 hover:text-gray-200 py-2' onClick={() => setMobileNavOpen(false)}>
                    Name Checker
                  </Link>
                </li>
                <li>
                  <Link href='/client-testimonials' className='flex text-gray-300 hover:text-gray-200 py-2' onClick={() => setMobileNavOpen(false)}>
                    Client Testimonials
                  </Link>
                </li>
                <li>
                  <Link href='/blog' className='flex text-gray-300 hover:text-gray-200 py-2' onClick={() => setMobileNavOpen(false)}>
                    Blog
                  </Link>
                </li>
                <li>
                <Link href='/dubai-accounting-guide' className='flex text-gray-300 hover:text-gray-200 py-2' onClick={() => setMobileNavOpen(false)}>
                  Dubai Accounting Guide
                </Link>
              </li>
              
              <li>
                <Link href='/dubai-relocation-guide' className='flex text-gray-300 hover:text-gray-200 py-2' onClick={() => setMobileNavOpen(false)}>
                  Dubai Relocation Guide
                </Link>
              </li>
              </ul>
          </li>
          
               {/*<li>
                <Link href='/dubai-accounting-guide' className='text-gray-400 hover:text-gray-100 transition duration-150 ease-in-out'>
                  Dubai Accounting Guide
                </Link>
              </li>
              <li>
                <Link href='/dubai-relocation-guide' className='text-gray-400 hover:text-gray-100 transition duration-150 ease-in-out'>
                  Dubai Relocation Guide
                </Link>
              </li>
               {footer.data.company_items.map((item) => {
                return (
                  <li key={item.menu_label}>
                    <PrismicLink field={item.menu_link} className='text-gray-400 hover:text-gray-100 transition duration-150 ease-in-out'>
                      {item.menu_label}
                    </PrismicLink>
                  </li>
                )
              })} */}
            </ul>
      </nav>
    </div>
  )
}
