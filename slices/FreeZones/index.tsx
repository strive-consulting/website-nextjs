import { Divider } from '@/components/divider'
import { getFreeZones } from '@/lib/cms'
import { Content } from '@prismicio/client'
import { PrismicNextImage } from '@prismicio/next'
import { PrismicLink, PrismicRichText, SliceComponentProps } from '@prismicio/react'

/**
 * Props for `FreeZones`.
 */
export type FreeZonesProps = SliceComponentProps<Content.FreeZonesSlice>

/**
 * Component for "FreeZones" Slices.
 */
const FreeZones = async ({ slice }: FreeZonesProps): Promise<JSX.Element> => {
  const freeZones = await getFreeZones()

  return (
    <>
      <section>
        <div className='max-w-6xl mx-auto px-4 sm:px-6'>
          <Divider />
          <div>
            {/* Section header */}
            <div className='max-w-6xl mx-auto text-center pb-12 md:pb-20'>
              <h3 className='h2 mb-4'>{slice.primary.title}</h3>

              <PrismicRichText
                field={slice.primary.description}
                components={{
                  paragraph: ({ children }) => <p className='text-xl text-gray-400'>{children}</p>,
                }}
              />
            </div>

            <div className='max-w-sm mx-auto grid lg:grid-cols-4 grid-cols-2 lg:gap-6 gap-1 items-start lg:max-w-none'>
              {freeZones.map((fz) => {
                return (
                  <div key={fz.id} className='flex flex-col h-full p-6' data-aos='fade-up'>
                    <div>
                      <div className='relative inline-flex flex-col mb-4 bg-purple-200 p-2'>
                        {fz.data.logo.url && (
                          <PrismicLink field={fz.data.link}>
                            <PrismicNextImage field={fz.data.logo} className='p-2 bg-white' />
                          </PrismicLink>
                        )}
                      </div>
                    </div>
                    <h6 className='text-center'>
                      <PrismicLink field={fz.data.link}>{fz.data.name}</PrismicLink>
                    </h6>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default FreeZones
