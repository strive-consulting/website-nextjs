export function objectToQueryString(obj: any) {
  const params = new URLSearchParams()

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      params.append(key, obj[key])
    }
  }

  return params.toString()
}

export async function convertCurrency(
  amount: number,
  baseCurrency: string,
  targetCurrency: string,
): Promise<number | string> {
  const accessKey = process.env.FIXER_CURRENCY_API_KEY
  const apiUrl = `http://data.fixer.io/api/latest?access_key=${accessKey}&format=1`

  try {
    const response = await fetch(apiUrl)

    if (response.ok) {
      const data = await response.json()

      if (data.success) {
        const rates = data.rates

        if (baseCurrency in rates && targetCurrency in rates) {
          const convertedAmount = amount * (rates[targetCurrency] / rates[baseCurrency])
          // Round up to the nearest thousand
          const roundedAmount = Math.ceil(convertedAmount / 1000) * 1000

          return roundedAmount
        } else {
          return 'Unsupported currency'
        }
      } else {
        return `Error: ${data.error.info}`
      }
    } else {
      return `Error: ${response.status} - ${response.statusText}`
    }
  } catch (error: any) {
    return `Error: ${error.message}`
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