'use client'
import { PopupButton, InlineWidget } from 'react-calendly'
import { useEffect, useState } from 'react'

interface CalendarProps {
  url: string
  popup: boolean
  ctaid: string
}

export default function Calendly({ url, popup, ctaid }: CalendarProps) {
  const [rootElement, setRootElement] = useState(null)

  useEffect(() => {
    // Wait for the component to be mounted before setting the rootElement
    if (typeof window !== 'undefined') {
      setRootElement(document.getElementById('__next'))
    }
  }, [])
  return (
    <>
      {popup === false && <InlineWidget url={url} />}
      {popup === true && (
        <div
          className='flex justify-center mb-8'
          data-aos='fade-up'
          data-aos-delay='400'
          data-aos-anchor='[data-aos-id-cta]'
        >
          <PopupButton
            className={`${ctaid} btn text-white bg-purple-600 hover:bg-purple-600 w-full sm:w-auto sm:ml-4`}
            url={url}
            rootElement={rootElement}
            text='Book Call Back'
          />
        </div>
      )}
    </>
  )
}
