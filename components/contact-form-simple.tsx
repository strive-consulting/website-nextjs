'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

export default function ContactFormSimple() {
  const router = useRouter()

  const searchParams = useSearchParams()

  const utm = {
    utmCampaign: searchParams.get('utm_campaign') ?? undefined,
    utmMedium: searchParams.get('utm_medium') ?? undefined,
    utmSource: searchParams.get('utm_source') ?? undefined,
  }

  const [submitted, setSubmitted] = useState(false)

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
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

    setSubmitted(true)

    // await fetch('/api/forms/prefill', {
    //   method: 'POST',
    //   body: JSON.stringify(formData),
    // })
  }

  return (
    <>
      {submitted && (
        <>
          <div className='flex flex-wrap'>
            <div className='w-full text-center '>Thanks. We&apos;ve received your enquiry. One of our experienced consultants will contact you shortly.</div>
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
              <div className='w-full mb-2'>
                <button type='submit' className={`btn-sm text-white bg-purple-600 hover:bg-purple-700 w-full mt-2`}>
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
