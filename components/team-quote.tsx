import Image from 'next/image'

import { PrismicRichText } from '@prismicio/react'
import { ImageField, KeyTextField, RichTextField } from '@prismicio/client'
import { PrismicNextImage } from '@prismicio/next'

interface Props {
  name: KeyTextField
  jobTitle: KeyTextField
  quote: RichTextField
  avatar: ImageField
}

export default async function TeamQuote({ name, jobTitle, quote, avatar }: Props) {
  return (
    <div className='flex items-center justify-center px-5 py-5 '>
      <div className='w-full mx-auto rounded-lg bg-gray-800 shadow-lg px-5 pt-5 pb-7 text-gray-800'>
        <div className='w-full pt-1 pb-5'>
          <div className='-mt-20 mx-auto flex justify-center'>
            <PrismicNextImage field={avatar} className='rounded-full' width={100} height={100} />
          </div>
        </div>
        <blockquote className='text-lg text-gray-400 grow relative'>
          <PrismicRichText
            field={quote}
            components={{
              paragraph: ({ children }) => (
                <p className='text-lg text-gray-400 grow relative'>{children}</p>
              ),
            }}
          />
        </blockquote>
        <div className='text-gray-700 font-medium mt-6 pt-5 border-t border-gray-700 flex flex-col items-end'>
          <cite className='text-gray-200 not-italic'>{name}</cite>
          <a
            className='text-purple-600 hover:text-gray-200 transition duration-150 ease-in-out'
            href='#0'
          >
            <div>{jobTitle}</div>
          </a>
        </div>
      </div>
    </div>
  )
}
