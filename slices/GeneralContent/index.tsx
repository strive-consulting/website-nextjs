import TickIcon from '@/components/tickIcon'
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
      <div className='max-w-3xl mx-auto px-4 sm:px-6 relative'>
        <div className='pt-5 pb-5'>
          <PrismicRichText
            field={slice.primary.body}
            components={{
              paragraph: ({ children }) => <p className='my-6 text-lg'>{children}</p>,
              heading2: ({ children }) => <h2 className='h2 my-6'>{children}</h2>,
              heading3: ({ children }) => <h3 className='h3 my-6'>{children}</h3>,
              heading4: ({ children }) => <h4 className='h4 my-6'>{children}</h4>,
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
    </section>
  )
}

export default GeneralContent
