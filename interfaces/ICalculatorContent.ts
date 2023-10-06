export interface ICalculatorContent {
  currency: string
  callback: boolean
  businessactivity: ICalculatorSelectOption
  businessactivitySelected: string
  premises: ICalculatorSelectOption
  premisesSelected: string
  owners: string
  visas: string
  firstname: string
  lastname: string
  email: string
  phonenumber: string
  nationality: string
  timeline: ICalculatorSelectOption
  timelineSelected: string
}

export interface ICalculatorSelectOption {
  label: string
  value: number
  mainlandPrice?: number
  freeZonePrice?: number
  additionalVisaPrice?: number
}
