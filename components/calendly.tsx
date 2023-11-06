'use client'
import { PopupButton, InlineWidget } from 'react-calendly'
import { useEffect, useState } from 'react'

interface CalendarProps {
  url?: string
  popup: boolean
  ctaid?: string
}

export default function Calendly({ url, popup, ctaid }: CalendarProps) {

  const input = document.getElementById('__next');
  const el1: HTMLElement = input as HTMLElement;

  const [rootElement, setRootElement] = useState(el1)
  
  useEffect(() => {
    // Wait for the component to be mounted before setting the rootElement
    if (typeof window !== 'undefined') {
      // @ts-ignore
      setRootElement(input)
    }
  }, [input])
  return (
    <>
      {popup === false && <InlineWidget url={url ?? ""} />}
      {popup === true && (
        <div className='flex justify-center mb-8'>
          <PopupButton
            className={`${ctaid} btn text-white bg-purple-600 hover:bg-purple-600 w-full sm:w-auto sm:ml-4`}
            url={url ?? ""}
            rootElement={rootElement}
            text='Book Call Back'
          />
        </div>
      )}
    </>
  )
}
