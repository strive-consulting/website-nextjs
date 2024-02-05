'use client'
import { useState } from 'react'
import Link from 'next/link'

//Used to capture user data for a deferred cost calculator quote.
//Similar underlying data capture

interface BusinessFormationCostProps {
  businessActivityId: string
  visas: number
  redirectUrl: string
}

interface FormData {
  formName: string
  name: string
  nameValid: boolean
  email: string
  emailValid: boolean
  phoneNumber: string
  phoneNumberValid: boolean
  utmCampaign?: string
  utmMedium?: string
  utmSource?: string
  deferedDataCapture?: boolean
}

export default function UserDataCapture({
  searchParams,
}: {
  searchParams?: {
    formName: string
    businessActivity: string
    numberOfVisas: number
    name: string
    phoneNumber: string
    email: string
    utmCampaign?: string
    utmMedium?: string
    utmSource?: string
    complete?: string
    country?: string
    currency?: string
    deferedDataCapture?: string
  }
}) {
  const [formCompleted, setFormCompleted] = useState<boolean>(false)

  const utm = {
    utmCampaign: searchParams?.utmCampaign != 'undefined' ? searchParams?.utmCampaign : '',
    utmMedium: searchParams?.utmMedium != 'undefined' ? searchParams?.utmMedium : '',
    utmSource: searchParams?.utmSource != 'undefined' ? searchParams?.utmSource : '',
  }

  const [formData, setFormData] = useState<FormData>({
    formName: 'business-setup-calculator',
    name: '',
    nameValid: true,
    email: '',
    emailValid: true,
    phoneNumber: '',
    phoneNumberValid: true,
    utmCampaign: utm.utmCampaign,
    utmMedium: utm.utmMedium,
    utmSource: utm.utmSource,
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    setFormData({ ...formData })

    let error = false

    if (formData.name === '') {
      formData.nameValid = false
      setFormData({ ...formData })
      error = true
    }

    if (formData.email === '') {
      formData.emailValid = false
      setFormData({ ...formData })
      error = true
    }

    if (formData.phoneNumber === '') {
      formData.phoneNumberValid = false
      setFormData({ ...formData })
      error = true
    }

    if (error) return

    //Create a lead
    const formDataForSubmission = {
      name: formData.name,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      formName: formData.formName,
      dateTime: new Date().toISOString(),
      utm: utm,
    }

    setFormCompleted(true)

    await fetch(process.env.NEXT_PUBLIC_BASE_URL + '/api/forms/prefill', {
      method: 'POST',
      body: JSON.stringify(formData),
    })
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target

    //console.log(name, value)
    if (name === 'name') {
      formData.nameValid = true
    }
    if (name === 'email') {
      formData.emailValid = true
    }
    if (name === 'phoneNumber') {
      formData.phoneNumberValid = true
    }

    setFormData({ ...formData, [name]: value })
  }

  return (
    <>
      {!formCompleted && (
        <>
          <h3 className='h3'>Let&apos;s talk</h3>
          <p className='my-3'>
            Company formation and residency is core to us at Strive. When you to speak to us, you will be speaking to one of our senior management team, and not a sales rep. We&apos;ll advise you on
            the best structure for your new venture to help you to save money. As a{' '}
            <Link className='underline' href={`/uae-accountancy-service`} target='_blank'>
              Xero partner
            </Link>
            , we can even help ensure your financial compliance and accounting best practices in the UAE.
          </p>
          <p className='my-3'>Enter your details to get started.</p>
          <div className='w-full md:w-1/2 lg:w-3/4 mx-auto'>
            <form onSubmit={handleSubmit}>
              <div className='flex flex-wrap' data-aos='fade-up'>
                <div className='w-full mb-3'>
                  <label className='block text-gray-300 text-sm font-medium mb-1' htmlFor='name'>
                    Name
                  </label>
                  <input
                    type='text'
                    name='name'
                    value={formData.name}
                    onChange={onChange}
                    className='form-input w-full border-red-500 focus:border-red-500 text-gray-900'
                    placeholder='e.g Peter Jones'
                  />
                  {!formData.nameValid && <div className='text-red-500 text-sm mt-2'>Please enter your name</div>}
                </div>
                <div className='w-full mb-3'>
                  <label className='block text-gray-300 text-sm font-medium mb-1' htmlFor='first-name'>
                    Email
                  </label>
                  <input
                    type='email'
                    name='email'
                    value={formData.email}
                    onChange={onChange}
                    className='form-input w-full border-red-500 focus:border-red-500 text-gray-900'
                    placeholder='e.g name@domain.com'
                  />
                  {!formData.emailValid && <div className='text-red-500 text-sm mt-2'>Please enter your email address</div>}
                </div>
                <div className='w-full mb-3'>
                  <label className='block text-gray-300 text-sm font-medium mb-1' htmlFor='first-name'>
                    Phone
                  </label>
                  <input
                    type='tel'
                    name='phoneNumber'
                    value={formData.phoneNumber}
                    onChange={onChange}
                    className='form-input w-full border-red-500 focus:border-red-500 text-gray-900'
                    placeholder='e.g. 447961543221'
                  />
                  {!formData.phoneNumberValid && <div className='text-red-500 text-sm mt-2'>Please enter your phone number</div>}
                </div>
                <button type='submit' className='mt-3 btn text-white bg-purple-600 hover:bg-purple-700 w-full'>
                  Speak to advisor
                </button>
              </div>
            </form>
          </div>
        </>
      )}

      {formCompleted && (
        <>
          <h3 className='h3'>Thanks</h3>
          <p className='my-3'>We&apos;ve received your details and will be in touch soon. </p>
        </>
      )}
    </>
  )
}
