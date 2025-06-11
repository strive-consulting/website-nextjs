'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'

export default function HrForm() {
  const router = useRouter()

  const searchParams = useSearchParams()

  const utm = {
    utmCampaign: searchParams.get('utm_campaign') ?? undefined,
    utmMedium: searchParams.get('utm_medium') ?? undefined,
    utmSource: searchParams.get('utm_source') ?? undefined,
    utmTerm: searchParams.get('utm_term') ?? undefined,
    gclid: searchParams.get('gclid') ?? undefined,
    fbclid: searchParams.get('fbclid') ?? undefined,
  }

  const [submitted, setSubmitted] = useState(false)

  const [formData, setFormData] = useState({
    formName: 'hr-contact-form',
    name: '',
    nameValid: false,
    email: '',
    emailValid: false,
    phoneNumber: '',
    phoneNumberValid: false,
    employees: '',
    employeesValid: false,
    dateTime: new Date().toISOString(),
    note: '',
    utm: utm,
    dataChanged: false,
    label: 'HR',
  })

  const handleChange = (e: any) => {
    //Construct note
    let note = 'HR Employees: ' + formData.employees
    formData.note = note

    formData.dataChanged = true

    const { name, value } = e.target
    if (name === 'name') {
      formData.nameValid = true
    }
    if (name === 'email') {
      formData.emailValid = true
    }
    if (name === 'phoneNumber') {
      formData.phoneNumberValid = true
    }
    if (name === 'employees') {
      formData.employeesValid = true
    }

    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()

    setSubmitted(true)

    await fetch('/api/forms/prefill', {
      method: 'POST',
      body: JSON.stringify(formData),
    })
  }

  return (
    <>
      {submitted && (
        <>
          <div className='flex flex-wrap'>
            <div className='w-full text-center '>Thanks. We&apos;ve received your enquiry. One of our experienced HR consultants will contact you shortly.</div>
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
                <input type='text' name='name' value={formData.name} onChange={handleChange} className='mt-1 form-input w-full text-gray-900' placeholder='e.g. Peter Jones' autoComplete='true' />
                {formData.dataChanged && !formData.nameValid && <div className='text-red-500 text-sm mt-2'>Please enter your name</div>}
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
                  autoComplete='true'
                />
                {formData.dataChanged && !formData.emailValid && <div className='text-red-500 text-sm mt-2'>Please enter your email address</div>}
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
                  autoComplete='true'
                />
                {formData.dataChanged && !formData.phoneNumberValid && <div className='text-red-500 text-sm mt-2'>Please enter your phone number</div>}
              </div>
              <div className='w-full mb-4'>
                <label className='block text-gray-300 text-sm font-medium' htmlFor='phoneNumber'>
                  Number of employees
                </label>
                <select name='employees' title='employees' value={formData.employees} onChange={handleChange} className='mt-1 form-input w-full text-gray-900' required>
                  <option value=''>Please select</option>
                  <option value='1'>1-5</option>
                  <option value='1'>5-10</option>
                  <option value='1'>10-20</option>
                  <option value='1'>20+</option>
                </select>
                {formData.dataChanged && !formData.employeesValid && <div className='text-red-500 text-sm mt-2'>Please select number of employees</div>}
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
