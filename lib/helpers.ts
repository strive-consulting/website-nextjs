export function objectToQueryString(obj: any) {
  const params = new URLSearchParams()

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      params.append(key, obj[key])
    }
  }

  return params.toString()
}

export async function getCurrencyRates(): Promise<any> {
  //Note, could be using this method serverside or client side
  const accessKey = process.env.EXCHANGERATES_CURRENCY_API_KEY || process.env.NEXT_PUBLIC_EXCHANGERATES_CURRENCY_API_KEY
  const apiUrl = `https://api.exchangeratesapi.io/v1/latest?access_key=${accessKey}&format=1`

  try {
    const response = await fetch(apiUrl)

    if (response.ok) {
      const data = await response.json()

      if (data.success) {
        return data.rates
      } else {
        return `Fixer Error: ${data.error.info}`
      }
    } else {
      return `Fixer Error: ${response.status} - ${response.statusText}`
    }
  } catch (error: any) {
    return `Fixer Error: ${error.message}`
  }
}

export async function convertCurrency(rates: any, amount: number, baseCurrency: string, targetCurrency: string): Promise<number | string> {
  try {
    if (baseCurrency in rates && targetCurrency in rates) {
      const convertedAmount = amount * (rates[targetCurrency] / rates[baseCurrency])

      // Round up to the nearest thousand
      const roundedAmount = Math.ceil(convertedAmount / 1000) * 1000

      return roundedAmount
    } else {
      return 'Unsupported currency'
    }
  } catch (error: any) {
    return `Error: ${error.message}`
  }
}

export function toTitleCase(str: string) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  })
}

import * as countriesJson from './data/countries.json'

type GeoVisitorInfo = {
  ip?: string
  city?: string
  countryCode?: string
  callingCode?: string
  currencyCode?: string
  error?: boolean
}

type LocationData = {
  ip: string
  type: string
  continent_code: string
  continent_name: string
  country_code: string
  country_name: string
  region_code: string
  region_name: string
  city: string
  zip: string
  latitude: number
  longitude: number
  location: {
    geoname_id: number
    capital: string
    languages: string[][] // Adjust the type if the actual structure is different
    country_flag: string
    country_flag_emoji: string
    country_flag_emoji_unicode: string
    calling_code: string
    is_eu: boolean
  }
  currency: {
    code: string
    name: string
    plural: string
    symbol: string
    symbol_native: string
  }
}

export async function getVisitorGeoInfo(): Promise<GeoVisitorInfo | undefined> {
  try {
    //Free IP lookup
    const ip = await fetch('https://jsonip.com', { mode: 'cors' })
      .then((resp) => resp.json())
      .then((ip) => {
        return ip
      })

    //console.log('IP', ip)

    //Note, could be using this method serverside or client side
    const ipStackKey = process.env.IP_STACK_API_KEY || process.env.NEXT_PUBLIC_IP_STACK_API_KEY
    const geoInfo: LocationData = await fetch(`https://api.ipstack.com/${ip.ip.toString()}?access_key=${ipStackKey}`)
      .then((resp) => resp.json())
      .then((geo) => {
        // console.log(geo);
        return geo
      })

    //console.log('Geo', geoInfo)

    // Alternative way to lookup currency code if not using a 3rd party service
    // // @ts-ignore
    // const currencyCode = countriesJson[geoInfo.country_code]

    //No need to return UAE
    if (geoInfo.country_code === 'AE') return { error: true }

    return {
      ip: ip.ip,
      city: geoInfo.city,
      countryCode: geoInfo.country_code,
      callingCode: geoInfo.location.calling_code,
      currencyCode: geoInfo.currency.code,
    }
  } catch (error) {
    return {
      error: true,
    }
  }
}

export function extractNames(fullName?: string): {
  firstName: string | undefined
  lastName: string | undefined
} {
  if (!fullName) {
    return { firstName: undefined, lastName: undefined }
  }
  const names = fullName.split(' ')

  // The first element will always be the first name
  const firstName = names[0]

  // If there is a last name, join the remaining elements to get it; otherwise, set it to null
  const lastName = names.length > 1 ? names.slice(1).join(' ') : undefined

  return { firstName, lastName }
}
