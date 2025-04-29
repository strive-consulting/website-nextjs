'use client'
import { LinkField, asLink } from '@prismicio/client'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { linkResolver } from '@/prismicio'
import { Constants } from '@/app/constants'

interface PartnerReferralFormProps {
  pipeDriveLabel?: string
}

export default function PartnerReferralForm({ pipeDriveLabel }: PartnerReferralFormProps) {
  const router = useRouter()

  const searchParams = useSearchParams()

  const utm = {
    utmCampaign: searchParams.get('utm_campaign') ?? undefined,
    utmMedium: searchParams.get('utm_medium') ?? undefined,
    utmSource: searchParams.get('utm_source') ?? undefined,
    utmTerm: searchParams.get('utm_term') ?? undefined,
  }

  const [submitted, setSubmitted] = useState(false)

  const [formData, setFormData] = useState({
    formName: 'partner-referral-form',
    name: '',
    email: '',
    phoneNumber: '',
    message: '',
    dateTime: new Date().toISOString(),
    utm: utm,
    label: 'Ref To: ' + pipeDriveLabel,
    btnStateClass: 'bg-purple-300',
    btnDisabled: true,
  })

  console.log('Form data', formData)

  const handleChange = (e: any) => {
    formData.btnStateClass = isFormComplete() ? 'bg-purple-600' : 'bg-purple-300'
    formData.btnDisabled = !isFormComplete()

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const isFormComplete = () => {
    return formData.name !== '' && formData.phoneNumber !== '' && formData.email !== ''
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    setSubmitted(true)

    await fetch('/api/forms/partner-referral', {
      method: 'POST',
      body: JSON.stringify(formData),
    })

  }

  return (
    <>
      {submitted && (
        <>
          <div className='flex flex-wrap'>
            <div className='w-full text-center '>Thanks. We&apos;ve received your enquiry and have shared this with our partner.</div>
          </div>
        </>
      )}
      {!submitted && (
        <>
          <form onSubmit={handleSubmit}>
            <div className='flex flex-wrap'>
              <div className='w-full mb-3 '>
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
              <div className='w-full mb-3'>
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
              <div className='w-full mb-4'>
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
              <div className='w-full mb-4'>
                <label className='block text-gray-300 text-sm font-medium mb-1' htmlFor='message'>
                  Additional Information
                </label>
                <textarea
                  id='message'
                  name='message'
                  rows={4}
                  className='form-input w-full border-red-500 focus:border-red-500 text-gray-900'
                  placeholder={`Please provide any other relevant information which could be useful to share with the partner`}
                  onChange={handleChange}
                  value={formData.message}
                ></textarea>
              </div>
              <div className='w-full mb-2'>
                <button type='submit' className={`btn-sm text-white ${formData.btnStateClass} hover:bg-purple-700 w-full mt-2`} disabled={formData.btnDisabled}>
                  Submit
                </button>
              </div>
            </div>
          </form>
        </>
      )}
    </>
  )
}
