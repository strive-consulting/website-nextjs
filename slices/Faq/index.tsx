import { Divider } from '@/components/divider'
import { Content } from '@prismicio/client'
import { PrismicRichText, SliceComponentProps } from '@prismicio/react'

/**
 * Props for `Faq`.
 */
export type FaqProps = SliceComponentProps<Content.FaqSlice>

/**
 * Component for "Faq" Slices.
 */
const Faq = ({ slice }: FaqProps): JSX.Element => {
  return (
    <section>
      <div className='max-w-6xl mx-auto px-4 sm:px-6'>
        <Divider />
        <div>
          {/* Section header */}
          <div className='max-w-3xl mx-auto text-center pb-12'>
            <h2 className='h2'>{slice.primary.title}</h2>
          </div>
          <ul className='grid gap-8 md:grid-cols-2 xl:gap-x-16 lg:gap-y-12 md:pb-16'>
            {slice.items.map((item) => {
              return (
                <li key={item.question}>
                  <h3 className='text-xl font-medium mb-2'>{item.question}</h3>
                  <p className='text-lg text-gray-400'>
                    <PrismicRichText
                      field={item.answer}
                      components={{
                        paragraph: ({ children }) => <p>{children}</p>,
                      }}
                    />
                  </p>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}

export default Faq
