import TickIcon from '@/components/tickIcon'
import { Content } from '@prismicio/client'
import { PrismicImage, PrismicRichText, SliceComponentProps } from '@prismicio/react'

/**
 * Props for `ZigZag`.
 */
export type ZigZagProps = SliceComponentProps<Content.ZigZagSlice>

/**
 * Component for "ZigZag" Slices.
 */
const ZigZag = ({ slice }: ZigZagProps): JSX.Element => {
  return (

    <section>
      <div className='max-w-6xl mx-auto px-4 sm:px-6'>
        <div className='py-12 md:py-20 border-t border-gray-800'>
          {/* Section header */}
          <div className='max-w-3xl mx-auto text-center pb-12 md:pb-16'>
            <div className='max-w-3xl mx-auto text-center pb-12 md:pb-20'>
              <h2 className='h2 mb-4' data-aos='fade-up'>
                {slice.primary.title}
              </h2>
              <PrismicRichText
                field={slice.primary.description}
                components={{
                  paragraph: ({ children }) => <p className='my-6 text-lg prose-a:underline prose-a:text-gray-200 hover:prose-a:no-underline'>{children}</p>,
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

          {/* Items */}
          <div className='grid gap-20'>
            {slice.items.map((item, index) => {
              const leftRightClass = index % 2 === 0 ? 'md:order-1' : 'rtl'
              const imageWidth = item.image.dimensions?.width && item.image.dimensions?.width <= 540 ? item.image.dimensions?.width : 540
              const imageHeight = item.image.dimensions?.height && item.image.dimensions?.height <= 405 ? item.image.dimensions?.height : 405

              return (
                <>
                  <div className='md:grid md:grid-cols-12 md:gap-6 items-center'>
                    <div className={`max-w-xl md:max-w-none md:w-full mx-auto md:col-span-5 lg:col-span-6 mb-8 md:mb-0 ${leftRightClass}`} data-aos='fade-up'>
                      <PrismicImage className='max-w-full mx-auto md:max-w-none h-auto' field={item.image} width={imageWidth} height={imageHeight} />
                    </div>

                    <div className='max-w-xl md:max-w-none md:w-full mx-auto md:col-span-7 lg:col-span-6' data-aos='fade-right'>
                      <div className='md:pr-4 lg:pr-12 xl:pr-16'>
                        {/* <div className='font-architects-daughter text-xl text-purple-600 mb-2'>Most Popular</div> */}
                        <h3 className='h3 mb-3'>{item.title}</h3>

                        <PrismicRichText
                          field={item.description}
                          components={{
                            paragraph: ({ children }) => <p className='my-6 text-lg prose-a:underline prose-a:text-gray-200 hover:prose-a:no-underline'>{children}</p>,
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
                  </div>
                </>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ZigZag
