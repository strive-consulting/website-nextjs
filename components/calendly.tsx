'use client'
import { PopupButton, InlineWidget } from 'react-calendly'
import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { Utm } from 'react-calendly/typings/calendly'

interface CalendarProps {
  url?: string
  popup?: boolean
  ctaid?: string
}

export default function Calendly({ url, popup, ctaid }: CalendarProps) {
  const input = document.getElementById('__next')
  const el1: HTMLElement = input as HTMLElement

  const [rootElement, setRootElement] = useState(el1)

  //Get UTM params and force in rather than relying on the plugin to detect them
  const searchParams = useSearchParams()

  const utm: Utm = {
    utmCampaign: searchParams.get('utm_campaign') ?? undefined,
    utmContent: '',
    utmMedium: searchParams.get('utm_medium') ?? undefined,
    utmSource: searchParams.get('utm_source') ?? undefined,
    utmTerm: '',
  }

  useEffect(() => {
    // Wait for the component to be mounted before setting the rootElement
    if (typeof window !== 'undefined') {
      // @ts-ignore
      setRootElement(input)
    }
  }, [input])

  // console.log('popup', popup)
  // console.log('popup', popup==false)
  return (
    <>
      {popup === false ||
        (popup == undefined && (
          <InlineWidget
            url={url ?? ''}
            utm={utm}
            styles={{ height: '750px' }}
            pageSettings={{ hideEventTypeDetails: true }}
          />
        ))}
      {popup === true && (
        <div className='flex justify-center mb-8'>
          <PopupButton
            className={`${ctaid} btn text-white bg-purple-600 hover:bg-purple-600 w-full sm:w-auto sm:ml-4`}
            url={url ?? ''}
            rootElement={rootElement}
            text='Book Call Back'
            utm={utm}
          />
        </div>
      )}
    </>
  )
}
