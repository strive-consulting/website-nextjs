import { Content } from '@prismicio/client'
import { PrismicLink, SliceComponentProps } from '@prismicio/react'
import Link from 'next/link'
import Image from 'next/image'

/**
 * Props for `StickyNavigation`.
 */
export type StickyNavigationProps = SliceComponentProps<Content.StickyNavigationSlice>

/**
 * Component for "StickyNavigation" Slices.
 */
const StickyNavigation = ({ slice }: StickyNavigationProps): JSX.Element => {
  return (
    <header className='bg-gray-900 fixed top-0 w-full z-30 shadow-md'>
      <div className='max-w-6xl mx-auto px-4 sm:px-6'>
        <div className='flex items-center justify-between h-20'>
          <div className='shrink-0 mr-4'>
            <Link href='/' className='block' aria-label='Strive Consultants'>
              <Image
                src='/images/logo/strive_logo.png'
                alt='Strive Consultants'
                width={120}
                height={44}
                priority={true}
              />
            </Link>
          </div>

          {slice.primary.cta_text && (
            <nav>
              <ul className='flex grow justify-end flex-wrap items-center'>
                <li>
                  <PrismicLink
                    field={slice.primary.cta_link}
                    className={`${slice.primary.cta_id} btn-sm text-white text-sm bg-purple-600 hover:bg-purple-700 ml-3`}
                  >
                    {slice.primary.cta_text}
                  </PrismicLink>
                </li>
              </ul>
            </nav>
          )}
        </div>
      </div>
    </header>
  )
}

export default StickyNavigation
