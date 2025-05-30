'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { getVisitorGeoInfo } from '@/lib/helpers'

export const CorpTaxCalculatorAnnouncement = () => {
  const [showAnnouncement, setShowAnnouncement] = useState(false)

  useEffect(() => {
    const checkUserLocation = async () => {

      if (!localStorage.getItem('isUserFromUk')) {
        const geoInfo = await getVisitorGeoInfo()
        if (geoInfo && geoInfo.countryCode === 'GB') {
          localStorage.setItem('isUserFromUk', 'true')
          setShowAnnouncement(true)
        } else {
          localStorage.setItem('isUserFromUk', 'false')
        }
      } else if (localStorage.getItem('isUserFromUk') === 'true') {
        setShowAnnouncement(true)
      }
    }

    checkUserLocation()


  }, [])

  if (!showAnnouncement) return null

  return (
    <div className='corp-tax-calculator-announcement w-full text-center bg-gray-600 py-2'>
      <Link href='/uk-corporate-tax-calculator' className='text-white'>
        Check out our <span className="underline">UK vs Dubai Tax Calculator</span>
      </Link>
    </div>
  )
}
