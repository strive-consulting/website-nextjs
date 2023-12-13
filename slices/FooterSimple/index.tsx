import { getFooter } from '@/lib/cms'
import { Content } from '@prismicio/client'
import { PrismicRichText, SliceComponentProps } from '@prismicio/react'
import Image from 'next/image'
import Link from 'next/link'
/**
 * Props for `FooterSimple`.
 */
export type FooterSimpleProps = SliceComponentProps<Content.FooterSimpleSlice>

/**
 * Component for "FooterSimple" Slices.
 */
const FooterSimple = async ({ slice }: FooterSimpleProps): Promise<JSX.Element> => {
  const footer = await getFooter()

  return (
    <footer>
      <div className='py-12 md:py-16'>
        <div className='max-w-6xl mx-auto px-4 sm:px-6'>
          <div className='flex flex-wrap mb-4'>
            <div className='md:flex-1'>
              <div className='mb-2'>
                <Link href='/' className='inline-block' aria-label='Strive Consultants'>
                  <Image src='/images/logo/strive_logo.png' alt='Strive Consultants' width={150} height={55} />
                </Link>
              </div>
            </div>
            <div className='md:flex-1 md:text-right'>
              <div className='text-gray-400'>
                <PrismicRichText
                  field={footer.data.description}
                  components={{
                    paragraph: ({ children }) => <p className='mb-6 text-sm'>{children}</p>,
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        <div className='text-gray-400 text-sm text-center w-full'>&copy; strive.ae. All rights reserved.</div>
      </div>
    </footer>
  )
}

export default FooterSimple
