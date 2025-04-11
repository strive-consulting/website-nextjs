import { Divider } from '@/components/divider'
import TickIcon from '@/components/tickIcon'
import { Content } from '@prismicio/client'
import { PrismicLink, PrismicRichText, SliceComponentProps } from '@prismicio/react'
import { icons } from '../../lib/icons'

/**
 * Props for `GridBlocks`.
 */
export type GridBlocksProps = SliceComponentProps<Content.GridBlocksSlice>

/**
 * Component for "GridBlocks" Slices.
 */
const GridBlocks = ({ slice }: GridBlocksProps): JSX.Element => {
  const gridItems = slice.items?.map((block) => {
    const selectedIcon = icons.find((icon) => icon.name === block.icon?.toLowerCase())

    return (
      <div key={block.title} className='relative flex flex-col items-center' data-aos='fade-up' data-aos-anchor='[data-aos-id-blocks]'>
        {selectedIcon ? selectedIcon?.icon : <></>}
        <h3 className='h4 mb-2 text-center'>{block.title}</h3>
        <p className='text-lg text-gray-400 text-center'>{block.description}</p>

        {block.bullets && (
          <ul className='max-w-md space-y-2 text-gray-500 list-inside dark:text-gray-400 py-5 px-5'>
            <PrismicRichText
              field={block.bullets}
              components={{
                listItem: ({ children }) => (
                  <li className='flex items-start'>
                    <TickIcon />
                    {children}
                  </li>
                ),
              }}
            />
          </ul>
        )}

        {block.cta_text && (
          <PrismicLink className='btn-sm text-white bg-purple-600 hover:bg-purple-700 mt-6' field={block.cta_link} target='_blank'>
            <span className='text-sm'>{block.cta_text}</span>
            <svg className='w-3 h-3 fill-current text-purple-400 shrink-0 ml-2' viewBox='0 0 12 12' xmlns='http://www.w3.org/2000/svg'>
              <path d='M6 5H0v2h6v4l6-5-6-5z' />
            </svg>
          </PrismicLink>
        )}
      </div>
    )
  })

  return (
    <section>
      <div className='max-w-6xl mx-auto px-4 sm:px-6'>
        <Divider />
        <div className=''>
          <div className='max-w-3xl mx-auto text-center pb-12 md:pb-20'>
            <h2 className='h2 mb-4'>{slice.primary.title}</h2>

            <PrismicRichText
              field={slice.primary.description}
              components={{
                paragraph: ({ children }) => <p className='text-xl text-gray-400'>{children}</p>,
              }}
            />
          </div>

          {/* Items */}
          <div className='max-w-sm mx-auto grid gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-16 items-start md:max-w-2xl lg:max-w-none' data-aos-id-blocks>
            {gridItems}
          </div>
        </div>
      </div>
    </section>
  )
}

export default GridBlocks
