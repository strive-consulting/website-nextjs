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
            <div className=''>
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
                 <p className='mb-6 text-sm'>
                <strong>Disclaimer</strong>: All business setup and residency visa services are facilitated through legal, approved channels in strict compliance with UAE laws.
Timeframes, approvals, and tax benefits vary by business activity, licensing body, and client readiness. Speak to one of our specialists for accurate, up-to-date guidance tailored to your specific needs.
               </p>
              </div>
            </div>
          </div>
        </div>

        <div className='text-gray-400 text-xs text-center w-full'>
          &copy; 2025 Strive Corporate Services Provider L.L.C. All rights reserved. Licensed under DED, UAE. License no 1256278
              <br />
              Strive Consultants is an independent business consultancy that provides advisory and administrative support for company formation, residency visa applications, and corporate services.
              <br />
              We are not affiliated with any UAE government or immigration agency. 
        </div>
      </div>
    </footer>
  )
}

export default FooterSimple
