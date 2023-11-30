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

    //Important step to store the details as a deal, particularly if the user does not complete the Calendly form.
    await postToZapier(formData)

    if (redirectUrl) {
      router.push(redirectUrl)
    } else {
      router.push(url)
    }
  }

  const postToZapier = async (data: any) => {
    try {
      const response = await fetch(process.env.NEXT_PUBLIC_WEBHOOK_FORM_PREFILL ?? '', {
        method: 'POST',
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }

      const jsonResponse = await response.json()
    } catch (error: any) {
      console.error('Error:', error.message)
    }
  }

  return (
    <div className='max-w-xl mx-auto p-4'>
      <form onSubmit={handleSubmit}>
        <div className='flex flex-wrap -mx-3 mb-4'>
          <h2 className='h5 px-3 mb-3 text-center md:text-left w-full mt-5 md:mt-0'>
            Talk to an Expert
          </h2>
          <div className='w-full px-3 mb-4 md:mb-0'>
            <label>
              <input
                type='text'
                name='name'
                value={formData.name}
                onChange={handleChange}
                className='mt-2 form-input w-full text-gray-900'
                placeholder='e.g. Peter Jones'
                required
              />
            </label>
          </div>
          <div className='w-full px-3 mb-4 md:mb-0'>
            <label className=''>
              <input
                type='email'
                name='email'
                value={formData.email}
                onChange={handleChange}
                className='mt-2 form-input w-full text-gray-900'
                placeholder='e.g. name@domain.com'
                required
              />
            </label>
          </div>
          <div className='w-full px-3 mb-4 md:mb-0'>
            <label className='flex-1'>
              <input
                type='tel'
                name='phoneNumber'
                value={formData.phoneNumber}
                onChange={handleChange}
                className='mt-2 form-input w-full text-gray-900'
                placeholder='e.g. 447961543221'
                required
              />
            </label>
          </div>
          <div className='w-full px-3 mb-4 md:mb-0'>
            <button
              type='submit'
              className={`${ctaid} btn-sm text-white bg-purple-600 hover:bg-purple-700 w-full mt-2`}
            >
              Schedule Call
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}
