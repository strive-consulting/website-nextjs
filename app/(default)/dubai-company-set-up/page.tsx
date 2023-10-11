export const metadata = {
  title: 'Dubai Company Set Up',
  description:
    'Strive makes Dubai company formation easy. Learn about what company formation options are available in the UAE and the process of opening a business.',
}

import Blocks from '@/components/blocks'
import Cta from '@/components/cta'
import HeroMain, { HeaderEnum } from '@/components/hero-main'
import TeamQuote from '@/components/team-quote'
import TickIcon from '@/components/tickIcon'
import { GridBlock } from '@/types'
import Image from 'next/image'

export default function Features() {
  const heroBullets: string[] = [
    'Can be opened remotely',
    'Many cost-effective options',
    'No requirement for a physical premises',
    '100% foreign ownership (no local sponsor required)',
  ]

  const blocks: GridBlock[] = [
    {
      title: 'Free Zone',
      ctaButtonText: 'Learn more',
      ctaLink: '/dubai-freezone-company-set-up',
      description:
        'Dubai has a number of geographic locations referred to as “Free zones”. These free zones are designed to allow easy company incorporation for foreign nationals.',
      bullets: [
        'Can be opened remotely',

        'Many cost-effective options',

        'No requirement for a physical premises',

        '100% foreign ownership (no local sponsor required)',

        'Future tax concessions',

        'Maximum employees of 5-6 without incurring a cost',
      ],
    },
    {
      title: 'Mainland',
      ctaButtonText: 'Learn more',
      ctaLink: '/dubai-mainland-company-set-up',
      description:
        'A mainland company allows you to openly trade anywhere in the UAE. In recent years, certain business activities now allow for 100% foreign ownership.',
      bullets: [
        'Openly trade with other mainland and free zone companies',

        'Rent commercial space anywhere',

        'Unlimited visa allocations allowed',

        'Many business activities can have 100% foreign ownership',

        'Minimum commercial space required',

        'Physically required to visit the UAE to open a company',
      ],
    },
    {
      title: 'Offshore',
      ctaButtonText: 'Learn more',
      ctaLink: '/dubai-offshore-company-set-up',
      description:
        'An offshore company or SPV is a non-trading company which is commonly used to be a parent company and own shares in another company.',
      bullets: [
        'Can hold shares in another company',

        'Layer of privacy',

        'Able to purchase assets such as real estate',

        '100% foreign ownership (no local sponsor required)',

        'Not allowed to carry out trading or business activity',

        'Requires a representative agent in UAE',
      ],
    },
  ]
  return (
    <>
      {/* <Hero /> */}
      <HeroMain
        title='Setup a Company in Dubai from overseas'
        subTitle='Your one-stop shop for company structuring & formations in the UAE. We make setup quick and easier than ever before.'
        showBackgroundIllustration={false}
        // bodyImage='/images/hero-image-01.jpg'
        showCta={true}
        align={HeaderEnum.Left}
        bullets={heroBullets}
      />

      {/* <section>
        <div className='max-w-6xl mx-auto px-4 sm:px-6'>
        
          <div className="flex items-center justify-center px-5 py-5 ">
            <div className="w-full mx-auto rounded-lg bg-gray-800 shadow-lg px-5 pt-5 pb-10 text-gray-800">
                <div className="w-full pt-1 pb-5">
                    <div className="-mt-16 mx-auto relative">
                        <Image
                          className='rounded-full'
                          src={`/images/team/raj.jpg`}
                          width={100}
                          height={100}
                          alt={`Raj from Strive Consultants`}
                        />
                        
                    </div>
                </div>
                <blockquote className='text-lg text-gray-400 grow relative'>
                  <p className="text-center px-5 text-gray-400 grow">Choosing the correct type of company formation is vital to ensure your business is structured the correct way for your future growth plans. We&apos;re here to navigate the landmines and make sure your compliant from day one.</p>
                </blockquote>
                <div className='text-gray-700 font-medium mt-6 pt-5 border-t border-gray-700'>
                  <cite className='text-gray-200 not-italic'>Raj K</cite> -{' '}
                  <a
                    className='text-purple-600 hover:text-gray-200 transition duration-150 ease-in-out'
                    href='#0'
                  >
                    <div>Head of UK / CTO - Strive Consultants</div>
                  </a>
                </div>

            </div>
          </div>

        </div>
      </section> */}
      <section>
        <div className='max-w-6xl mx-auto px-4 sm:px-6'>
          <div className='py-12 md:py-10 border-t border-gray-800'></div>

          <div className='grid gap-20'>
            {/* 1st item */}
            <div className='md:grid md:grid-cols-12 md:gap-6 items-center'>
              {/* Image */}
              <div
                className='max-w-xl md:max-w-none md:w-full mx-auto md:col-span-5 lg:col-span-5 mb-8 md:mb-0 md:order-1'
                data-aos='fade-up'
              >
                <TeamQuote />
              </div>
              {/* Content */}
              <div
                className='max-w-xl md:max-w-none md:w-full mx-auto md:col-span-7 lg:col-span-7'
                data-aos='fade-right'
              >
                <div className='md:pr-4 lg:pr-12 xl:pr-16'>
                  {/* <div className='font-architects-daughter text-xl text-purple-600 mb-2'>
                    Let us take the confusion out
                  </div> */}
                  <h3 className='h3 mb-3'>Simple company formation in Dubai </h3>
                  <p className='text-xl text-gray-400 mb-4'>
                    The process of opening a business in the UAE can be daunting, but we will help
                    you avoid any major hiccups on your journey. From obtaining all necessary
                    permits and dealing with local authorities to launching your new company as soon
                    as possible.{' '}
                  </p>
                  <p className='text-xl text-gray-400 mb-4'>
                    The three most popular types of companies in the UAE are free zones, offshore,
                    and mainland. There are many variables to consider when opening your business,
                    including which setup will provide you with what benefits based on where it’s
                    located. You must also factor in how much regulation there may be around certain
                    industries that could affect operations if not handled properly by consultants
                    at Strive who specialize in this area!
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* <Zigzag /> */}
      {/* <Zigzag /> */}
      {/* <Stats /> */}

      <Blocks blocks={blocks} title='Available formation options in the UAE' />
      {/* <CaseStudies /> */}
      <Cta />
    </>
  )
}
