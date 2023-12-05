'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

interface CalendlyFormPrefillProps {
  calendarUrl?: string
  ctaid?: string
  formName?: string
  redirectUrl?: string
}
export default function CalendlyFormPrefill({
  calendarUrl,
  ctaid,
  formName,
  redirectUrl,
}: CalendlyFormPrefillProps) {
  const router = useRouter()

  const searchParams = useSearchParams()

  const utm = {
    utmCampaign: searchParams.get('utm_campaign') ?? undefined,
    utmMedium: searchParams.get('utm_medium') ?? undefined,
    utmSource: searchParams.get('utm_source') ?? undefined,
  }

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    formName: formName,
    dateTime: new Date().toISOString(),
    utm: utm,
  })

  const handleChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    // Build the URL using form values
    // Note 'a1' is the first custom question in this Calendly form
    const url = `${calendarUrl}?name=${encodeURIComponent(
      formData.name,
    )}&email=${encodeURIComponent(formData.email)}&a1=${encodeURIComponent(
      formData.phoneNumber,
    )}&utm_campaign=${utm.utmCampaign}&utm_medium=${utm.utmMedium}&utm_source=${utm.utmSource}`

    await fetch('/api/forms/prefill', {
      method: 'POST',
      body: JSON.stringify(formData),
    })

    if (redirectUrl) {
      router.push(redirectUrl)
    } else {
      router.push(url)
    }
  }

  return (
    <div className='max-w-xl mx-auto p-4'>
      <form onSubmit={handleSubmit}>
        <div className='flex flex-wrap -mx-3 mb-4 border border-4 py-4 px-2'>
          <h3 className='h3 mb-3 text-center w-full'>Talk to an expert</h3>
          <div className='w-full px-3 mb-4 '>
            <label className='block text-gray-300 text-sm font-medium' htmlFor='name'>
              Name
            </label>
            <input
              type='text'
              name='name'
              value={formData.name}
              onChange={handleChange}
              className='mt-1 form-input w-full text-gray-900'
              placeholder='e.g. Peter Jones'
              required
              autoComplete='true'
            />
          </div>
          <div className='w-full px-3 mb-4'>
            <label className='block text-gray-300 text-sm font-medium' htmlFor='email'>
              Email address
            </label>
            <input
              type='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              className='mt-1 form-input w-full text-gray-900'
              placeholder='e.g. name@domain.com'
              required
              autoComplete='true'
            />
          </div>
          <div className='w-full px-3 mb-4'>
            <label className='block text-gray-300 text-sm font-medium' htmlFor='phoneNumber'>
              Phone
            </label>
            <input
              type='tel'
              name='phoneNumber'
              value={formData.phoneNumber}
              onChange={handleChange}
              className='mt-1 form-input w-full text-gray-900'
              placeholder='e.g. 447961543221'
              required
              autoComplete='true'
            />
          </div>
          <div className='w-full px-3 mb-4'>
            <button
              type='submit'
              className={`${ctaid} btn-sm text-white bg-purple-600 hover:bg-purple-700 w-full mt-2`}
            >
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
