import { Divider } from '@/components/divider'
import TeamQuote from '@/components/team-quote'
import TickIcon from '@/components/tickIcon'
import { AuthorDocument, DescriptionQuoteSlice } from '@/prismicio-types'
import { Content, isFilled } from '@prismicio/client'
import { PrismicRichText, SliceComponentProps } from '@prismicio/react'

/**
 * Props for `DescriptionQuote`.
 */
export type DescriptionQuoteProps = SliceComponentProps<Content.DescriptionQuoteSlice>

function loadAuthorWithQuote(slice: DescriptionQuoteSlice) {
  if (
    isFilled.contentRelationship<
      'author',
      string,
      Pick<AuthorDocument['data'], 'name' | 'job_title' | 'linkedin_url' | 'avatar'>
    >(slice.primary.quote_author)
  ) {
    //console.log("NAME", slice.primary.quote_author.data?.name)

    return (
      <TeamQuote
        name={slice.primary.quote_author.data?.name ?? ''}
        jobTitle={slice.primary.quote_author.data?.job_title ?? ''}
        quote={slice.primary.quote_description}
        avatar={slice.primary.quote_author.data?.avatar}
      />
    )
  }

  return <></>
}
/**
 * Component for "DescriptionQuote" Slices.
 */
const DescriptionQuote = ({ slice }: DescriptionQuoteProps): JSX.Element => {
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
                    <p className='my-6 text-lg text-gray-400 prose-a:underline prose-a:text-gray-200 hover:prose-a:no-underline mb-4'>
                      {children}
                    </p>
                  ),
                  list: ({ children }) => <ul>{children}</ul>,
                  listItem: ({ children }) => (
                    <li className='flex items-center text-lg'>
                      <TickIcon />
                      {children}
                    </li>
                  ),
                  oList: ({ children }) => <ul>{children}</ul>,
                  oListItem: ({ children }) => (
                    <li className='flex items-center text-lg'>
                      <TickIcon />
                      {children}
                    </li>
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
              {loadAuthorWithQuote(slice)}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default DescriptionQuote
