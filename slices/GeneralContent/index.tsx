import { Content } from '@prismicio/client'
import { PrismicRichText, SliceComponentProps } from '@prismicio/react'

/**
 * Props for `GeneralContent`.
 */
export type GeneralContentProps = SliceComponentProps<Content.GeneralContentSlice>

/**
 * Component for "GeneralContent" Slices.
 */
const GeneralContent = ({ slice }: GeneralContentProps): JSX.Element => {
  return (
    <section className='relative'>
      <div className='max-w-6xl mx-auto px-4 sm:px-6 relative'>
        <div className='pt-1 pb-12 md:pt-1 md:pb-20'>
          <PrismicRichText
            field={slice.primary.body}
            components={{
              paragraph: ({ children }) => <p className='mb-6'>{children}</p>,
              heading2: ({ children }) => <h2 className='h2 my-6'>{children}</h2>,
              heading3: ({ children }) => <h3 className='h3 my-6'>{children}</h3>,
            }}
          />
        </div>
      </div>
    </section>
  )
}

export default GeneralContent
