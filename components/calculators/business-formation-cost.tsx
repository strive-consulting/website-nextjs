'use client'
import { useEffect, useState } from 'react'
import { convertCurrency, getCurrencyRates, getVisitorGeoInfo } from '@/lib/helpers'

import { businessActivities } from '@/app/constants'
import { useRouter, useSearchParams } from 'next/navigation'

interface BusinessFormationCostProps {
  businessActivityId: string
  visas: number
  redirectUrl: string
}

export default function BusinessFormationCost({ businessActivityId, visas, redirectUrl }: BusinessFormationCostProps) {
  const [complete, setComplete] = useState<boolean>(false)
  const [currencyCode, setCurrencyCode] = useState<string>('USD')
  const [mainlandPriceLower, setMainlandPriceLower] = useState<number>(0)
  const [mainlandPriceLowerConverted, setMainlandPriceLowerConverted] = useState<number | string>(0)
  const [mainlandPriceUpper, setMainlandPriceUpper] = useState<number>(0)
  const [mainlandPriceUpperConverted, setMainlandPriceUpperConverted] = useState<number | string>(0)
  const [freezonePriceLower, setFreezonePriceLower] = useState<number>(0)
  const [freezonePriceLowerConverted, setFreezonePriceLowerConverted] = useState<number | string>(0)
  const [freezonePriceUpper, setFreezonePriceUpper] = useState<number>(0)
  const [freezonePriceUpperConverted, setFreezonePriceUpperConverted] = useState<number | string>(0)

  const router = useRouter()

  const searchParams = useSearchParams()
  const rangeBand = 3000

  useEffect(() => {
    const calculate = async () => {
      try {
        if (!complete) {
          let visitorInfo = await getVisitorGeoInfo()

          if (visitorInfo && !visitorInfo.error) {
            setCurrencyCode(visitorInfo?.currencyCode ?? 'USD')
            setComplete(true)
          }
        }

        const businessActivity = businessActivities.find((obj) => obj.id === parseInt(businessActivityId ?? '0'))

        //Push 'complete=true to the url so future browser refreshes do not post to the webhook on the results page
        if (searchParams.get('complete') != 'true') {
          router.push(redirectUrl + '&complete=true')
        }

        if (businessActivity) {
          const mainlandPriceCalculated = businessActivity.mainlandPrice + visas * businessActivity.additionalVisaPrice + businessActivity.serviceFee
          const mainlandPriceLowerCalculated = mainlandPriceCalculated - rangeBand
          const mainlandPriceUpperCalculated = mainlandPriceCalculated + rangeBand
          setMainlandPriceLower(mainlandPriceLowerCalculated)
          setMainlandPriceUpper(mainlandPriceUpperCalculated)

          const freezonePriceCalculated = businessActivity.freeZonePrice + visas * businessActivity.additionalVisaPrice + businessActivity.serviceFee
          const freezonePriceLowerCalculated = freezonePriceCalculated - rangeBand
          const freezonePriceUpperCalculated = freezonePriceCalculated + rangeBand
          setFreezonePriceLower(freezonePriceLowerCalculated)
          setFreezonePriceUpper(freezonePriceUpperCalculated)

          //Fetch rates once
          const currencyRates = await getCurrencyRates()

          setMainlandPriceLowerConverted(await convertCurrency(currencyRates, mainlandPriceLowerCalculated, 'AED', currencyCode))

          setMainlandPriceUpperConverted(await convertCurrency(currencyRates, mainlandPriceUpperCalculated, 'AED', currencyCode))

          setFreezonePriceLowerConverted(await convertCurrency(currencyRates, freezonePriceLowerCalculated, 'AED', currencyCode))

          setFreezonePriceUpperConverted(await convertCurrency(currencyRates, freezonePriceUpperCalculated, 'AED', currencyCode))
        }
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    calculate()
  }, [businessActivityId, complete, currencyCode, redirectUrl, router, searchParams, visas])

  return (
    <>
      <div className='h5 md:h3 mb-1'>
        Mainland
        <br />
        AED {mainlandPriceLower.toLocaleString()} - AED {mainlandPriceUpper.toLocaleString()}
      </div>
      {currencyCode && (
        <div className='mb-5 text-lg italic'>
          Approx {currencyCode} {mainlandPriceLowerConverted} - {currencyCode} {mainlandPriceUpperConverted}
        </div>
      )}
      <div className='h5 md:h3 mb-1'>
        Free zone
        <br />
        AED {freezonePriceLower.toLocaleString()} - AED {freezonePriceUpper.toLocaleString()}
      </div>
      {currencyCode && (
        <div className='mb-5 text-lg italic'>
          Approx {currencyCode} {freezonePriceLowerConverted} - {currencyCode} {freezonePriceUpperConverted}
        </div>
      )}
    </>
  )
}
