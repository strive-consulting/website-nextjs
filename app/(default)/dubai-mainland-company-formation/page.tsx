export const metadata = {
  title: 'Mainland Company Formation with 100% Foreign Ownership in Duba',
  description:
    'What is a mainland Company? The freedom to operate throughout all the emirates and internationally is one of the major reasons to consider opening a mainland company.',
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
      title: '100% Foreign Ownership',
      description: 'No requirement for local sponsors giving you total control',
    },
    {
      icon: Icons.List,
      title: 'Employ local staff',
      description:
        'Unlike with other company types, there are no restrictions on employing staff from the local market',
    },
    {
      icon: Icons.Globe,
      title: 'No visa cap',
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
        title={'Set up a Mainland Company in Dubai'}
        subTitle={
          'Trade openly across the emirates and the world. The perfect licence for growing your business in the UAE'
        }
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
                <h3 className='h3 mb-3'>What is a Mainland company?</h3>
                <p className='text-xl text-gray-400 mb-4'>
                  The freedom to operate throughout all the emirates and internationally is one of
                  the major reasons to consider opening a mainland company.
                </p>
                <p className='text-xl text-gray-400 mb-4'>
                  The Department of Economic Development (DED) is the regulatory body that oversees
                  the issuance of mainland licenses. While previously restricted by the need to have
                  a local sponsor, over 1000 commercial licenses no longer have this dependency.
                </p>
                <p className='text-xl text-gray-400 mb-4'>
                  Mainland companies have no limitations on the number of visas issued by the
                  company and are able to open a bank account with ease compared to Freezone and
                  offshore entities.
                </p>
                <p className='text-xl text-gray-400 mb-4'>
                  In recent years the UAE government has allowed for 100% ownership for a vast array
                  of mainland company business activities, therefore removing the need for a local
                  national to be a 51% shareholder.
                </p>
              </div>
            </div>
            <div className='order-2 md:order-2 md:col-span-5'>
              <div
                className='max-w-xl md:max-w-none md:w-full mx-auto col-span-12 md:col-span-5 lg:col-span-5 mb-8 md:mb-0 sm:order-2'
                data-aos='fade-up'
              >
                {/* <TeamQuote /> */}
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
