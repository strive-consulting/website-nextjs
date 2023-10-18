import { Divider } from '@/components/divider'
import TickIcon from '@/components/tickIcon'
import { Content } from '@prismicio/client'
import { PrismicLink, PrismicRichText, SliceComponentProps } from '@prismicio/react'

/**
 * Props for `Cta1`.
 */
export type Cta1Props = SliceComponentProps<Content.Cta1Slice>

/**
 * Component for "Cta1" Slices.
 */
const Cta1 = ({ slice }: Cta1Props): JSX.Element => {
  return (
    <section>
      <div className='max-w-6xl mx-auto px-4 sm:px-6 relative'>
        <Divider />
        <div className=''>
          <div className='max-w-3xl mx-auto text-center pb-12 md:pb-16' data-aos-id-cta>
            {/* Section header */}
            <h4 className='h2 mb-4' data-aos='fade-up' data-aos-anchor='[data-aos-id-cta]'>
              {slice.primary.title}
            </h4>

            <PrismicRichText
              field={slice.primary.sub_text}
              components={{
                paragraph: ({ children }) => (
                  <p
                    className='text-xl text-gray-400 mb-8'
                    data-aos='fade-up'
                    data-aos-delay='200'
                    data-aos-anchor='[data-aos-id-cta]'
                  >
                    {children}
                  </p>
                ),
              }}
            />

            {/* CTA button */}
            <div
              className='flex justify-center mb-8'
              data-aos='fade-up'
              data-aos-delay='400'
              data-aos-anchor='[data-aos-id-cta]'
            >
              <PrismicLink
                className='btn-sm text-white bg-purple-600 hover:bg-purple-700 mt-6'
                field={slice.primary.cta_link}
                target='_blank'
              >
                {slice.primary.cta_text}
              </PrismicLink>
            </div>

            {slice.primary.bullets && (
              <PrismicRichText
                field={slice.primary.bullets}
                components={{
                  list: ({ children }) => (
                    <ul className='flex flex-wrap justify-center text-lg text-gray-400 -mx-2 -my-1'>
                      {children}
                    </ul>
                  ),
                  listItem: ({ children }) => (
                    <li
                      className='flex items-center mx-3 my-1'
                      data-aos='fade-up'
                      data-aos-delay='600'
                      data-aos-anchor='[data-aos-id-cta]'
                    >
                      <TickIcon />
                      <span>{children}</span>
                    </li>
                  ),
                }}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Cta1
