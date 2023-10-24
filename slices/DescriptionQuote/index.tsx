import { Divider } from '@/components/divider'
import TeamQuote from '@/components/team-quote'
import { createClient } from '@/prismicio'
import { AuthorDocument, AuthorDocumentData } from '@/prismicio-types'
import { Content, ContentRelationshipField } from '@prismicio/client'
import { PrismicNextLink } from '@prismicio/next'
import { PrismicRichText, SliceComponentProps } from '@prismicio/react'
import { PrismicContext } from '@prismicio/react/dist/PrismicProvider'

/**
 * Props for `DescriptionQuote`.
 */
export type DescriptionQuoteProps = SliceComponentProps<Content.DescriptionQuoteSlice>

/**
 * Component for "DescriptionQuote" Slices.
 */
const DescriptionQuote = ({ slice }: DescriptionQuoteProps): JSX.Element => {
  // console.log(slice.primary.quote_author.link_type)

  // const author : AuthorDocumentData = slice.primary.quote_author;

  return (
    <section>
      <div className='max-w-6xl mx-auto px-4 sm:px-6'>
        <Divider />

        <div className='grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 items-center'>
          <div className='max-w-xl md:max-w-none md:w-full mx-auto md:col-span-7 lg:col-span-7 sm:order-1'>
            <div className='md:pr-4 lg:pr-12 xl:pr-16' data-aos='fade-right'>
              {/* <div className='font-architects-daughter text-xl text-purple-600 mb-2'>
          Let us take the confusion out
        </div> */}
              <h2 className='h3 mb-3'>{slice.primary.title}</h2>
              {/* <PrismicRichText field={slice.primary.description} /> */}

              <PrismicRichText
                field={slice.primary.description}
                components={{
                  paragraph: ({ children }) => (
                    <p className='text-xl text-gray-400 prose-a:underline prose-a:text-gray-200 hover:prose-a:no-underline mb-4'>
                      {children}
                    </p>
                  ),
                }}
              />
            </div>
          </div>
          <div className='order-2 md:order-2 md:col-span-5 pt-10'>
            <div
              className='max-w-xl md:max-w-none md:w-full mx-auto col-span-12 md:col-span-5 lg:col-span-5 mb-8 md:mb-0 sm:order-2'
              data-aos='fade-up'
            >
              <TeamQuote
                name={slice.primary.quote_author_name}
                jobTitle={slice.primary.quote_author_job_title}
                quote={slice.primary.quote_description}
                avatar={slice.primary.quote_author_avatar}
              />

              {/* {slice.primary} */}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DescriptionQuote
