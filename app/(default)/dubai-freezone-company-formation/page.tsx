export const metadata = {
  title: 'Features - Open PRO',
  description: 'Page description',
}

import Hero from '@/components/hero-features'
import Stats from '@/components/stats'
import Zigzag from '@/components/zigzag'
import Blocks, { GridBlock, Icons } from '@/components/blocks'
import CaseStudies from '@/components/case-studies'
import Cta from '@/components/cta'
import HeroMain, { HeaderEnum } from '@/components/hero-main'
import Link from 'next/link'
import Image from 'next/image'
import FeatImage01 from '@/public/images/features-03-image-01.png'

export default function Features() {
  const blocks: GridBlock[] = [
    {
      icon: Icons.Star,
      title: '100% Foreign Ownership',
      description:
        'One of the most appealing benefits of establishing a business in a free zone is full ownership rights. You can enjoy 100% ownership without help from sponsors, which means you have more control and are less at risk for any potential challenges or setbacks that might come up down the line.',
    },
    {
      icon: Icons.List,
      title: 'Corporate And Personal Tax Exemptions',
      description:
        'UAE’s tax laws make it one of the most attractive locations to set up a company internationally. Free zones offer 100% exemption from personal and corporate taxes, no strings attached!',
    },
    {
      icon: Icons.Globe,
      title: 'Import And Export Duties Exemption',
      description:
        'The UAE exempts business owners from paying import and export duties while having no currency regulation restrictions. This flexibility in currency exchange makes doing international financial transactions much simpler allowing your business to conveniently expand its horizons!',
    },
    {
      icon: Icons.Person,
      title: 'Support From The Government',
      description:
        'The UAE government is supportive of new-age business owners and has created world-renowned infrastructure to help support their growth. The free zone authorities also assist new businesses in getting a free zone license to get their business off the ground.',
    },
    {
      icon: Icons.Like,
      title: 'dsfdsf',
      description: '',
    },
    {
      icon: Icons.Thought,
      title: 'dsfdsf',
      description: '',
    },
  ]

  return (
    <>
      <HeroMain
        align={HeaderEnum.Left}
        title={'Set up a Free Zone Company in Dubai'}
        subTitle={
          '100% foreign ownership and government support for tax relief. The perfect way to start business in the UAE'
        }
        showBackgroundIllustration={false}
        showCta={true}
      />
      {/* <Stats /> */}

      <section>
        <div className='max-w-6xl mx-auto px-4 sm:px-6'>
          <div className='py-12 md:py-10 border-t border-gray-800'></div>

          <div className='grid gap-20'>
            {/* 1st item */}
            <div className='md:grid md:grid-cols-12 md:gap-6 items-center'>
              {/* Image */}
              <div
                className='max-w-xl md:max-w-none md:w-full mx-auto md:col-span-5 lg:col-span-6 mb-8 md:mb-0 md:order-1'
                data-aos='fade-up'
              >
                <ul className='text-lg text-gray-400 mb-6'>
                  <li className='flex items-center mb-2'>
                    <svg
                      className='w-3 h-3 fill-current text-green-500 mr-2 shrink-0'
                      viewBox='0 0 12 12'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path d='M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z' />
                    </svg>
                    <span>Can be opened remotely</span>
                  </li>
                  <li className='flex items-center mb-2'>
                    <svg
                      className='w-3 h-3 fill-current text-green-500 mr-2 shrink-0'
                      viewBox='0 0 12 12'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path d='M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z' />
                    </svg>
                    <span>Many cost-effective options</span>
                  </li>
                  <li className='flex items-center mb-2'>
                    <svg
                      className='w-3 h-3 fill-current text-green-500 mr-2 shrink-0'
                      viewBox='0 0 12 12'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path d='M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z' />
                    </svg>
                    <span>No requirement for a physical premises</span>
                  </li>

                  <li className='flex items-center'>
                    <svg
                      className='w-3 h-3 fill-current text-green-500 mr-2 shrink-0'
                      viewBox='0 0 12 12'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path d='M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z' />
                    </svg>
                    <span>100% foreign ownership (no local sponsor required)</span>
                  </li>
                </ul>
              </div>
              {/* Content */}
              <div
                className='max-w-xl md:max-w-none md:w-full mx-auto md:col-span-7 lg:col-span-6'
                data-aos='fade-right'
              >
                <div className='md:pr-4 lg:pr-12 xl:pr-16'>
                  <div className='font-architects-daughter text-xl text-purple-600 mb-2'>
                    Most Popular
                  </div>
                  <h3 className='h3 mb-3'>What is a Free Zone?</h3>
                  <p className='text-xl text-gray-400 mb-4'>
                    Free zones are economic areas where goods and services can be traded. They are
                    particularly popular with privacy-conscious entrepreneurs because there’s 100%
                    foreign ownership with no open directory of company details. This means that
                    sensitive corporate information such as shareholder details are never disclosed
                    to the public.
                  </p>
                  <p className='text-xl text-gray-400 mb-4'>
                    Financial benefits include 0% tax rates, preferential customs duty rates, and
                    100% import and export tax exemption.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <Zigzag /> */}

      <Blocks
        title='Benefits of setting up a Free Zone company in the UAE'
        subTitle='There are many reasons to open a company in one of the many free zones in the UAE. Lets&amp;s explore the four key factors that most business owners care about:'
        blocks={blocks}
      />
      <CaseStudies />
      <Cta />
    </>
  )
}
