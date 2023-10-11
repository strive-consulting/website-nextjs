import Image from 'next/image'

import { getTestimonials } from '@/lib/cms'
import { PrismicRichText } from '@prismicio/react'

interface Props {
  count?: number
}

export default async function TeamQuote({ count }: Props) {
  const testimonials = await getTestimonials(count)

  return (
    <div className='flex items-center justify-center px-5 py-5 '>
      <div className='w-full mx-auto rounded-lg bg-gray-800 shadow-lg px-5 pt-5 pb-10 text-gray-800'>
        <div className='w-full pt-1 pb-5'>
          <div className='-mt-20 mx-auto flex justify-center'>
            <Image
              className='rounded-full'
              src={`/images/team/raj.jpg`}
              width={100}
              height={100}
              alt={`Raj from Strive Consultants`}
            />
          </div>
        </div>
        <blockquote className='text-lg text-gray-400 grow relative'>
          <p className='text-center px-5 text-gray-400 grow'>
            Choosing the correct type of company formation is vital to ensure your business is
            structured the correct way for your future growth plans. We&apos;re here to navigate the
            landmines and make sure your compliant from day one.
          </p>
        </blockquote>
        <div className='text-gray-700 font-medium mt-6 pt-5 border-t border-gray-700'>
          <cite className='text-gray-200 not-italic'>Raj K</cite> -{' '}
          <a
            className='text-purple-600 hover:text-gray-200 transition duration-150 ease-in-out'
            href='#0'
          >
            <div>Head of UK / CTO - Strive Consultants</div>
          </a>
        </div>
      </div>
    </div>
  )
}
