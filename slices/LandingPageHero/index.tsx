import BusinessSetupCalculator from '@/components/calculators/business-setup'
import { Content } from '@prismicio/client'
import { PrismicRichText, SliceComponentProps } from '@prismicio/react'

/**
 * Props for `LandingPageHero`.
 */
export type LandingPageHeroProps = SliceComponentProps<Content.LandingPageHeroSlice>

/**
 * Component for "LandingPageHero" Slices.
 */
const LandingPageHero = ({ slice }: LandingPageHeroProps): JSX.Element => {
  let formName = slice.primary.form?.toString()

  return (
    <section className='relative'>
      <div className='max-w-6xl mx-auto px-4 sm:px-6 relative'>
        <div className='pt-32 pb-12 md:pt-30 md:pb-0'>
          <div className='flex flex-col md:flex-row'>
            <div className={`w-full md:w-2/3 mx-auto text-center md:text-left items-center mt-0 md:mt-16`}>
              <h1 className='h1 mb-4' data-aos='fade-up'>
                {slice.primary.title}
              </h1>
              <PrismicRichText
                field={slice.primary.description}
                components={{
                  paragraph: ({ children }) => (
                    <p className='text-xl text-gray-400 prose-a:underline prose-a:text-gray-200 hover:prose-a:no-underline' data-aos='fade-up' data-aos-delay='200'>
                      {children}
                    </p>
                  ),
                }}
              />
            </div>
            <div className='w-full md:w-1/3 md:ml-20'>
              <div className='flex flex-wrap border border-4 py-4 px-2'>
                {formName === 'Business Setup Calculator' && (
                  <>
                    <h3 className='h3 mb-3 text-center w-full'>Setup Calculator</h3>
                    <div className='mx-auto w-full px-3'>
                      <BusinessSetupCalculator />
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LandingPageHero
