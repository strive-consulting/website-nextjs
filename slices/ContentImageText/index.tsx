import { Content } from '@prismicio/client'
import { PrismicNextImage } from '@prismicio/next'
import { PrismicRichText, SliceComponentProps } from '@prismicio/react'

/**
 * Props for `ContentImageText`.
 */
export type ContentImageTextProps = SliceComponentProps<Content.ContentImageTextSlice>

/**
 * Component for "ContentImageText" Slices.
 */
const ContentImageText = ({ slice }: ContentImageTextProps): JSX.Element => {
  const imageOrdering = slice.primary.image_align
    ? slice.primary.image_align === 'Left'
      ? 'order-first'
      : 'order-last'
    : 'order-last'
  const textOrdering = slice.primary.image_align
    ? slice.primary.image_align === 'Left'
      ? 'order-last'
      : 'order-first'
    : 'order-last'
  const textPadding = slice.primary.image_align
    ? slice.primary.image_align === 'Left'
      ? 'md:pl-4 lg:pl-12 xl:pl-16'
      : 'md:pr-4 lg:pr-12 xl:pr-16'
    : 'md:pl-4 lg:pl-12 xl:pl-16'

  console.log(slice.primary.image_align)
  return (
    <section>
      <div className='max-w-6xl mx-auto px-4 sm:px-6'>
        <div className='py-12 md:py-20 border-t border-gray-800'>
          {/* Section header */}
          <div className='max-w-3xl mx-auto text-center pb-12 md:pb-20'>
            <h2 className='h2' data-aos='fade-up'>
              {slice.primary.title}
            </h2>
          </div>

          {/* Items */}
          <div className='grid gap-20' data-aos-id-target>
            {/* Item */}
            <div className='md:grid md:grid-cols-12 md:gap-6 items-center'>
              {/* Image */}
              <div
                className={`max-w-xl md:max-w-none md:w-full mx-auto md:col-span-5 lg:col-span-6 mb-8 md:mb-0 rtl ${imageOrdering}`}
                data-aos='fade-right'
                data-aos-delay='200'
                data-aos-anchor='[data-aos-id-target]'
              >
                <PrismicNextImage
                  className='mx-auto md:max-w-none'
                  field={slice.primary.image}
                  width={540}
                  height={520}
                />
              </div>

              {/* Content */}
              <div
                className={`max-w-xl md:max-w-none md:w-full mx-auto md:col-span-7 lg:col-span-6 ${textOrdering}`}
              >
                <div className={textPadding}>
                  <PrismicRichText
                    field={slice.primary.sub_text}
                    components={{
                      paragraph: ({ children }) => (
                        <p className='text-lg text-gray-400'>{children}</p>
                      ),
                    }}
                  />

                  {slice.items.length > 0 &&
                    slice.items.map((item) => {
                      return (
                        <>
                          <div
                            className='mt-6'
                            data-aos='fade-left'
                            data-aos-delay='200'
                            data-aos-anchor='[data-aos-id-target]'
                          >
                            <h4 className='h4 mb-2'>
                              <span className='text-purple-600'>.</span> {item.bullet_title}
                            </h4>
                            <p className='text-lg text-gray-400'>{item.bullet_text}</p>
                          </div>
                        </>
                      )
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContentImageText
