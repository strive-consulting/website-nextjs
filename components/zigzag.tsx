import Image from 'next/image'

import FeatImage01 from '@/public/images/features-03-image-01.png'
import FeatImage02 from '@/public/images/features-03-image-02.png'
import FeatImage03 from '@/public/images/features-03-image-03.png'
import Link from 'next/link'

export default function Zigzag() {
  return (
    <section>
      <div className='max-w-6xl mx-auto px-4 sm:px-6'>
        <div className='py-12 md:py-20 border-t border-gray-800'>
          {/* Section header */}
          <div className='max-w-3xl mx-auto text-center pb-12 md:pb-16'>
            <div className='inline-flex text-sm font-semibold py-1 px-3 m-2 text-green-600 bg-green-200 rounded-full mb-4'>Getting you started</div>
            <h2 className='h2 mb-4'>Company Formation Options</h2>
            <p className='text-xl text-gray-400'>
              <p>
                The process of opening a business in the UAE can be daunting, but we will help you avoid any major hiccups on your journey. From obtaining all necessary permits and dealing with local
                authorities to launching your new company as soon as possible
              </p>
              <p>
                The three most popular types of companies in the UAE are free zones, offshore, and mainland. There are many variables to consider when opening your business, including which setup will
                provide you with what benefits based on where it’s located. You must also factor in how much regulation there may be around certain industries that could affect operations if not
                handled properly by consultants at Strive who specialize in this area!
              </p>
              <p>
                The best way to know which kind of company you should open depends entirely on your needs and the future ambitions of your business. We’re here to help you navigate the landmines,
                which can have consequences like hefty fines.
              </p>{' '}
            </p>
          </div>

          {/* Items */}
          <div className='grid gap-20'>
            {/* 1st item */}
            <div className='md:grid md:grid-cols-12 md:gap-6 items-center'>
              {/* Image */}
              <div className='max-w-xl md:max-w-none md:w-full mx-auto md:col-span-5 lg:col-span-6 mb-8 md:mb-0 md:order-1' data-aos='fade-up'>
                <Image className='max-w-full mx-auto md:max-w-none h-auto' src={FeatImage01} width={540} height={405} alt='Features 01' />
              </div>
              {/* Content */}
              <div className='max-w-xl md:max-w-none md:w-full mx-auto md:col-span-7 lg:col-span-6' data-aos='fade-right'>
                <div className='md:pr-4 lg:pr-12 xl:pr-16'>
                  <div className='font-architects-daughter text-xl text-purple-600 mb-2'>Most Popular</div>
                  <h3 className='h3 mb-3'>Free Zone Company</h3>
                  <p className='text-xl text-gray-400 mb-4'>
                    Dubai has a number of geographic locations referred to as “Free zones”. These free zones are designed to allow easy company incorporation for foreign nationals.
                  </p>
                  <ul className='text-lg text-gray-400 mb-6'>
                    <li className='flex items-center mb-2'>
                      <svg className='w-3 h-3 fill-current text-green-500 mr-2 shrink-0' viewBox='0 0 12 12' xmlns='http://www.w3.org/2000/svg'>
                        <path d='M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z' />
                      </svg>
                      <span>Can be opened remotely</span>
                    </li>
                    <li className='flex items-center mb-2'>
                      <svg className='w-3 h-3 fill-current text-green-500 mr-2 shrink-0' viewBox='0 0 12 12' xmlns='http://www.w3.org/2000/svg'>
                        <path d='M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z' />
                      </svg>
                      <span>Many cost-effective options</span>
                    </li>
                    <li className='flex items-center mb-2'>
                      <svg className='w-3 h-3 fill-current text-green-500 mr-2 shrink-0' viewBox='0 0 12 12' xmlns='http://www.w3.org/2000/svg'>
                        <path d='M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z' />
                      </svg>
                      <span>No requirement for a physical premises</span>
                    </li>

                    <li className='flex items-center'>
                      <svg className='w-3 h-3 fill-current text-green-500 mr-2 shrink-0' viewBox='0 0 12 12' xmlns='http://www.w3.org/2000/svg'>
                        <path d='M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z' />
                      </svg>
                      <span>100% foreign ownership (no local sponsor required)</span>
                    </li>
                  </ul>

                  <Link className='btn text-white bg-purple-600 hover:bg-purple-600 w-full sm:w-auto sm:ml-4' href='/dubai-freezone-company-formation/'>
                    Learn more
                  </Link>
                </div>
              </div>
            </div>

            {/* 2nd item */}
            <div className='md:grid md:grid-cols-12 md:gap-6 items-center'>
              {/* Image */}
              <div className='max-w-xl md:max-w-none md:w-full mx-auto md:col-span-5 lg:col-span-6 mb-8 md:mb-0 rtl' data-aos='fade-up'>
                <Image className='max-w-full mx-auto md:max-w-none h-auto' src={FeatImage02} width={540} height={405} alt='Features 02' />
              </div>
              {/* Content */}
              <div className='max-w-xl md:max-w-none md:w-full mx-auto md:col-span-7 lg:col-span-6' data-aos='fade-left'>
                <div className='md:pl-4 lg:pl-12 xl:pl-16'>
                  <div className='font-architects-daughter text-xl text-purple-600 mb-2'>More speed. Less spend</div>
                  <h3 className='h3 mb-3'>Mainland</h3>
                  <p className='text-xl text-gray-400 mb-4'>
                    A mainland company allows you to openly trade anywhere in the UAE. In recent years, certain business activities now allow for 100% foreign ownership.
                  </p>
                  <ul className='text-lg text-gray-400 -mb-2'>
                    <li className='flex items-center mb-2'>
                      <svg className='w-3 h-3 fill-current text-green-500 mr-2 shrink-0' viewBox='0 0 12 12' xmlns='http://www.w3.org/2000/svg'>
                        <path d='M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z' />
                      </svg>
                      <span>Duis aute irure dolor in reprehenderit</span>
                    </li>
                    <li className='flex items-center mb-2'>
                      <svg className='w-3 h-3 fill-current text-green-500 mr-2 shrink-0' viewBox='0 0 12 12' xmlns='http://www.w3.org/2000/svg'>
                        <path d='M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z' />
                      </svg>
                      <span>Excepteur sint occaecat</span>
                    </li>
                    <li className='flex items-center'>
                      <svg className='w-3 h-3 fill-current text-green-500 mr-2 shrink-0' viewBox='0 0 12 12' xmlns='http://www.w3.org/2000/svg'>
                        <path d='M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z' />
                      </svg>
                      <span>Amet consectetur adipiscing elit</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 3rd item */}
            <div className='md:grid md:grid-cols-12 md:gap-6 items-center'>
              {/* Image */}
              <div className='max-w-xl md:max-w-none md:w-full mx-auto md:col-span-5 lg:col-span-6 mb-8 md:mb-0 md:order-1' data-aos='fade-up'>
                <Image className='max-w-full mx-auto md:max-w-none h-auto' src={FeatImage03} width={540} height={405} alt='Features 03' />
              </div>
              {/* Content */}
              <div className='max-w-xl md:max-w-none md:w-full mx-auto md:col-span-7 lg:col-span-6' data-aos='fade-right'>
                <div className='md:pr-4 lg:pr-12 xl:pr-16'>
                  <div className='font-architects-daughter text-xl text-purple-600 mb-2'>More speed. Less spend</div>
                  <h3 className='h3 mb-3'>Offshore</h3>
                  <p className='text-xl text-gray-400 mb-4'>An offshore company or SPV is a non-trading company which is commonly used to own.</p>
                  <ul className='text-lg text-gray-400 -mb-2'>
                    <li className='flex items-center mb-2'>
                      <svg className='w-3 h-3 fill-current text-green-500 mr-2 shrink-0' viewBox='0 0 12 12' xmlns='http://www.w3.org/2000/svg'>
                        <path d='M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z' />
                      </svg>
                      <span>Duis aute irure dolor in reprehenderit</span>
                    </li>
                    <li className='flex items-center mb-2'>
                      <svg className='w-3 h-3 fill-current text-green-500 mr-2 shrink-0' viewBox='0 0 12 12' xmlns='http://www.w3.org/2000/svg'>
                        <path d='M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z' />
                      </svg>
                      <span>Excepteur sint occaecat</span>
                    </li>
                    <li className='flex items-center'>
                      <svg className='w-3 h-3 fill-current text-green-500 mr-2 shrink-0' viewBox='0 0 12 12' xmlns='http://www.w3.org/2000/svg'>
                        <path d='M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z' />
                      </svg>
                      <span>Amet consectetur adipiscing elit</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
