export const metadata = {
  title: 'Set up an offshore company in Dubai | Get instant quotations',
  description:
    'An offshore company is a non-trading company that is commonly used to own assets such as real estate and shares.',
}

import Cta from '@/components/cta'
import HeroMain, { TitleAlign } from '@/components/hero-main'
import { GridBlock, Icons } from '@/types'
import Blocks from '@/components/blocks'
import { Divider } from '@/components/divider'
import TeamQuote from '@/components/team-quote'
import Testimonials from '@/components/testimonials'

export default function MainlandCompany() {
  const heroBullets: string[] = [
    'Ideal in early stages',
    'Corporate tax exemptions',
    'Can be opened remotely',
    '100% foreign ownership (no local sponsor required)',
  ]

  const blocks: GridBlock[] = [
    {
      icon: Icons.Star,
      title: 'Hold shares in another company',
      description: 'No requirement for local sponsors giving you total control',
    },
    {
      icon: Icons.List,
      title: 'Layer of privacy',
      description:
        'Unlike with other company types, there are no restrictions on employing staff from the local market',
    },
    {
      icon: Icons.Globe,
      title: '100% Foreign ownership',
      description: 'There is no limit on the number of visas you can have on the company',
    },
    {
      icon: Icons.Person,
      title: 'Banking',
      description: 'Enables access to a wider range of banking providers in the UAE',
    },
    {
      icon: Icons.Like,
      title: 'Tax Relief',
      description: 'Certain business activities have exemptions from corporation tax',
    },
    {
      icon: Icons.Thought,
      title: 'Trade across the UAE',
      description: 'Trade openly across the UAE and the world with no restrictions',
    },
  ]

  return (
    <>
      <HeroMain
        align={TitleAlign.Left}
        title={'Set up a Offshore Company in Dubai'}
        subTitle={'Efficiently structure your growing business with 100% ownership in the UAE'}
        showBackgroundIllustration={false}
        showCta={true}
        bullets={heroBullets}
      />

      <section>
        <div className='max-w-6xl mx-auto px-4 sm:px-6'>
          <Divider />

          <div className='grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 items-center'>
            <div className='max-w-xl md:max-w-none md:w-full mx-auto md:col-span-7 lg:col-span-7 sm:order-1'>
              <div className='md:pr-4 lg:pr-12 xl:pr-16' data-aos='fade-right'>
                {/* <div className='font-architects-daughter text-xl text-purple-600 mb-2'>
                  Let us take the confusion out
                </div> */}
                <h3 className='h3 mb-3'>What is a Offshore company?</h3>
                <p className='text-xl text-gray-400 mb-4'>
                  An offshore company is a non-trading company that is commonly used to own assets
                  such as real estate and shares. They are usually incorporated for privacy and
                  operation advantages with regard to financial, legal, and tax benefits in foreign
                  countries.
                </p>
                <p className='text-xl text-gray-400 mb-4'>
                  Offshore companies are permitted to open bank accounts within the UAE, however
                  they cannot issue work visas or have physical offices within the country.
                </p>
              </div>
            </div>
            <div className='order-2 md:order-2 md:col-span-5'>
              <div
                className='max-w-xl md:max-w-none md:w-full mx-auto col-span-12 md:col-span-5 lg:col-span-5 mb-8 md:mb-0 sm:order-2'
                data-aos='fade-up'
              >
                <TeamQuote />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Blocks
        title='Benefits of forming a Mainland company in the United Arab Emirates'
        subTitle='A mainland company is much like a regular company in any country and benefits from the following features:'
        blocks={blocks}
      />
      {/* <CaseStudies /> */}
      <Testimonials count={3} />
      <Cta />
    </>
  )
}
