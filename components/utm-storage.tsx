'use client'
import { useEffect } from 'react'

//Stores any UTM params to local storage so they are used as the source for any lead gen.
//Any new params coming in on the querystring will update the local storage.
//No expiry set on local storage
const UtmStorage = () => {
  useEffect(() => {
    
    const getUTMParamsFromURL = (): Record<string, string> => {
      const urlParams = new URLSearchParams(window.location.search)
      const utmParams: Record<string, string> = {}
      urlParams.forEach((value, key) => {
        if (key.startsWith('utm_')) {
          utmParams[key] = value
        }
      })
      return utmParams
    }

    
    const storeUTMParams = (data: Record<string, string>): void => {
      const existingUTMParams = JSON.parse(localStorage.getItem('utmParams') || '{}')
      console.log('existingUTMParams in LS', existingUTMParams)

      const mergedUTMParams = { ...existingUTMParams, ...data }
      localStorage.setItem('utmParams', JSON.stringify(mergedUTMParams))
    }

    // Call the function to store UTM parameters when the page loads
    const utmParamsFromURL = getUTMParamsFromURL()
    if (Object.keys(utmParamsFromURL).length > 0) {
      storeUTMParams(utmParamsFromURL)
    }
  }, [])

  return null
}

export default UtmStorage
