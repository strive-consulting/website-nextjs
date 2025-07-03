'use client'
import { LinkField, asLink } from '@prismicio/client'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { linkResolver } from '@/prismicio'
import { Constants } from '@/app/constants'

interface ContactFormSimpleProps {
  label?: string
  redirect?: LinkField
}

export default function ContactFormSimple({ label = 'Form', redirect }: ContactFormSimpleProps) {
  const router = useRouter()

  const utm = {
    utmCampaign: '',
    utmMedium: '',
    utmSource: '',
    utmTerm: '',
    gclid: '',
    fbclid: '',
  }

  const [submitted, setSubmitted] = useState(false)

  const [formData, setFormData] = useState({
    formName: 'contact-form',
    name: '',
    email: '',
    phoneNumber: '',
    dateTime: new Date().toISOString(),
    utm: utm,
    label: label,
    btnStateClass: 'bg-purple-300',
    btnDisabled: true,
  })


  useEffect(() => {
    const utmParamsFromLocalStorage = JSON.parse(localStorage.getItem('utmParams') || '{}')
  
    utm.utmCampaign = utmParamsFromLocalStorage['utm_campaign'] ?? undefined
    utm.utmMedium = utmParamsFromLocalStorage['utm_medium'] ?? undefined
    utm.utmSource = utmParamsFromLocalStorage['utm_source'] ?? undefined
    utm.utmTerm = utmParamsFromLocalStorage['utm_term'] ?? undefined
    utm.gclid = utmParamsFromLocalStorage['gclid'] ?? undefined
    utm.fbclid = utmParamsFromLocalStorage['fbclid'] ?? undefined
    
    setFormData({
      ...formData,
      utm: utm
    })
    
  }, [])


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

    console.log('Form data', formData)

    await fetch('/api/forms/prefill', {
      method: 'POST',
      body: JSON.stringify(formData),
    })

    //Handle optional redirect
    //console.log(redirect)
    if (redirect) {
      if (redirect?.link_type == 'Web') {
        //console.log('Web redirect', Constants.SiteDomain + asLink(redirect))

        window.location.replace('' + asLink(redirect))
      } else {
        //console.log('Prismic redirect', Constants.SiteDomain + linkResolver(redirect))

        window.location.replace('' + linkResolver(redirect))
      }
    }
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
                <button type='submit' className={`btn-sm text-white ${formData.btnStateClass} hover:bg-purple-700 w-full mt-2 ${label}_conversion`} disabled={formData.btnDisabled}>
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
