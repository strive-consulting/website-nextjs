'use client'
import { useEffect, useState } from 'react'
import { LinkField } from '@prismicio/client'
import { useRouter, useSearchParams } from 'next/navigation'
import { objectToQueryString } from '@/lib/helpers'
import { Loader } from '../loader'

interface ContactFormSimpleProps {
  label?: string
  redirect?: LinkField
}

const UkCorpTaxCalculator = ({ label = 'Form', redirect }: ContactFormSimpleProps) => {
  const router = useRouter()

  const [isSubmitted, setIsSubmitted] = useState(false)
  const [utm, setUtm] = useState<any>()
  const [showError, setShowError] = useState(false)
  const [formData, setFormData] = useState({
    yearlyTurnOver: undefined,
    yearlyExpenses: undefined,
    utmCampaign: '',
    utmMedium: '',
    utmSource: '',
    utmTerm: '',
    label: label,
  })

  useEffect(() => {
    const utmParamsFromLocalStorage = JSON.parse(localStorage.getItem('utmParams') || '{}')
    setUtm({
      utmCampaign: utmParamsFromLocalStorage['utm_campaign'] ?? undefined,
      utmMedium: utmParamsFromLocalStorage['utm_medium'] ?? undefined,
      utmSource: utmParamsFromLocalStorage['utm_source'] ?? undefined,
      utmTerm: utmParamsFromLocalStorage['utm_term'] ?? undefined,
    })
  }, [])

  const isFormComplete = () => {
    return formData.yearlyExpenses !== undefined && formData.yearlyTurnOver !== undefined && formData.yearlyTurnOver > 0 && formData.yearlyExpenses > 0
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    const turnOver = Number(formData.yearlyTurnOver || 0)
    const expenses = Number(formData.yearlyExpenses || 0)

    if (turnOver <= expenses) {
      setShowError(true)
      return
    }

    setIsSubmitted(true)

    formData.utmCampaign = utm['utm_campaign']
    formData.utmMedium = utm['utm_medium']
    formData.utmSource = utm['utm_source']
    formData.utmTerm = utm['utmTerm']

    await new Promise((f) => setTimeout(f, 2000))

    router.push('/tools/uk-corp-tax-calculator/results?' + objectToQueryString(formData))
  }

  const handleFormDataChange = (fieldKey: string, fieldValue: string) => {
    setFormData({
      ...formData,
      [fieldKey]: fieldValue,
    })
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className='flex flex-wrap'>
          <div className='w-full mb-3 '>
            <label className='block text-gray-300 text-sm font-medium' htmlFor='yearlyTurnOver'>
              Annual Turnover (£)
            </label>
            <input
              type='number'
              name='yearlyTurnOver'
              className='mt-1 form-input w-full text-gray-900'
              value={formData.yearlyTurnOver}
              onChange={(e) => {
                handleFormDataChange('yearlyTurnOver', e.target.value)
              }}
              placeholder='e.g. 100000'
              required
              autoComplete='true'
            />
          </div>
          {showError && <div className='text-red-500 text-sm mt-2'>The turnover value must be greater than the expenses</div>}
          <div className='w-full mb-3 '>
            <label className='block text-gray-300 text-sm font-medium' htmlFor='yearlyExpenses'>
              Annual Expenses (£)
            </label>
            <input
              type='number'
              name='yearlyExpenses'
              className='mt-1 form-input w-full text-gray-900'
              value={formData.yearlyExpenses}
              onChange={(e) => {
                handleFormDataChange('yearlyExpenses', e.target.value)
              }}
              placeholder='e.g. 5000'
              required
              autoComplete='true'
            />
          </div>
          <div className='w-full mb-2'>
            {!isSubmitted ? (
              <button type='submit' className={`btn-sm text-white bg-purple-${isFormComplete() ? 600 : 300} hover:bg-purple-700 w-full mt-2 ${label}_conversion`} disabled={!isFormComplete()}>
                Submit
              </button>
            ) : (
              <Loader />
            )}
          </div>
        </div>
      </form>
    </>
  )
}

export default UkCorpTaxCalculator
