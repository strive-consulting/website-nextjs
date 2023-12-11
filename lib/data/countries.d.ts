declare module 'countries.json' {
  type CountryData = {
    type: string
    currency: string
    rate: number
  }

  type CountryObject = {
    [key: string]: CountryData
  }

  const data: CountryObject
  export default data
}
