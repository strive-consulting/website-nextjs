'use client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

interface FormData {
  formName: string
  name: string
  nameValid: boolean
  email: string
  emailValid: boolean
  phoneNumber: string
  phoneNumberValid: boolean
  note: string
  message: string
  interested_company_formation: boolean
  interested_residency: boolean
  interested_banking: boolean
  interested_accounting: boolean
  interested_other: boolean
}

export default function EnquiryForm() {
  const router = useRouter()

  const [formData, setFormData] = useState<FormData>({
    formName: 'website-contact-form',
    name: '',
    nameValid: true,
    email: '',
    emailValid: true,
    phoneNumber: '',
    phoneNumberValid: true,
    note: '',
    message: '',
    interested_company_formation: false,
    interested_residency: false,
    interested_banking: false,
    interested_accounting: false,
    interested_other: false,
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
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

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { checked, name, value } = e.target

    // console.log(name, value, checked)
    // console.log('val', checked)

    setFormData({ ...formData, [name]: checked })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormData({ ...formData })

    console.log(formData)

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

    //Construct note
    let note = 'Additional info: ' + formData.message
    note = formData.interested_company_formation ? note + ', interested_company_formation' : note
    note = formData.interested_residency ? note + ', interested_residency' : note
    note = formData.interested_banking ? note + ', interested_banking' : note
    note = formData.interested_accounting ? note + ', interested_accounting' : note
    note = formData.interested_other ? note + ', interested_other' : note
    //console.log(note)

    if (error) return

    //Create a lead contaning some notes
    const formSubmissionData = {
      name: formData.name,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
      formName: formData.formName,
      dateTime: new Date().toISOString(),
      note: note,
    }

    console.log(formSubmissionData)
    await fetch('/api/forms/prefill', {
      method: 'POST',
      body: JSON.stringify(formSubmissionData),
    })

    router.push('/contact-thanks-form')
  }

  return (
    <div className='w-full lg:w-3/4 mx-auto'>
      <form onSubmit={handleSubmit}>
        <div className='flex flex-wrap'>
          <div className='w-full mb-3'>
            <label className='block text-gray-300 text-sm font-medium mb-1' htmlFor='name'>
              Name
            </label>
            <input
              type='text'
              name='name'
              value={formData.name}
              onChange={handleChange}
              className='form-input w-full border-red-500 focus:border-red-500 text-gray-900'
              placeholder='e.g Peter Jones'
            />
            {!formData.nameValid && (
              <div className='text-red-500 text-sm mt-2'>Please enter your name</div>
            )}
          </div>
          <div className='w-full mb-3'>
            <label className='block text-gray-300 text-sm font-medium mb-1' htmlFor='first-name'>
              Email
            </label>
            <input
              type='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              className='form-input w-full border-red-500 focus:border-red-500 text-gray-900'
              placeholder='e.g name@domain.com'
            />
            {!formData.emailValid && (
              <div className='text-red-500 text-sm mt-2'>Please enter your email address</div>
            )}
          </div>
          <div className='w-full mb-3'>
            <label className='block text-gray-300 text-sm font-medium mb-1' htmlFor='first-name'>
              Phone
            </label>
            <input
              type='tel'
              name='phoneNumber'
              value={formData.phoneNumber}
              onChange={handleChange}
              className='form-input w-full border-red-500 focus:border-red-500 text-gray-900'
              placeholder='e.g. 447961543221'
            />
            {!formData.phoneNumberValid && (
              <div className='text-red-500 text-sm mt-2'>Please enter your phone number</div>
            )}
          </div>

          <div className='w-full'>
            <label className='block text-gray-300 text-sm font-medium mb-1'>
              I am interested in
            </label>

            <label className='flex items-center mb-2'>
              {formData.interested_company_formation}
              <input
                type='checkbox'
                className='form-checkbox'
                name='interested_company_formation'
                onChange={handleCheckboxChange}
                defaultChecked={false}
              />

              <span className='text-gray-300 ml-2'>UAE Company Formation</span>
            </label>

            <label className='flex items-center mb-2'>
              <input
                type='checkbox'
                className='form-checkbox'
                name='interested_residency'
                onChange={handleCheckboxChange}
                defaultChecked={false}
              />
              <span className='text-gray-300 ml-2'>UAE Residency &amp; Visa</span>
            </label>
            <label className='flex items-center mb-2'>
              <input
                type='checkbox'
                className='form-checkbox'
                name='interested_banking'
                onChange={handleCheckboxChange}
                checked={formData.interested_banking}
              />
              <span className='text-gray-300 ml-2'>UAE Business Banking</span>
            </label>
            <label className='flex items-center mb-2'>
              <input
                type='checkbox'
                className='form-checkbox'
                name='interested_accounting'
                onChange={handleCheckboxChange}
                checked={formData.interested_accounting}
              />
              <span className='text-gray-300 ml-2'>UAE Accounting Services</span>
            </label>
            <label className='flex items-center mb-2'>
              <input
                type='checkbox'
                className='form-checkbox'
                name='interested_other'
                onChange={handleCheckboxChange}
                checked={formData.interested_other}
              />
              <span className='text-gray-300 ml-2'>Other</span>
            </label>
          </div>

          <div className='w-full my-3'>
            <label className='block text-gray-300 text-sm font-medium mb-1' htmlFor='message'>
              Additional Information
            </label>
            <textarea
              id='message'
              name='message'
              rows={4}
              className='form-input w-full border-red-500 focus:border-red-500 text-gray-900'
              placeholder='Please provide any other relevant information which could be useful for our team to help with your enquiry'
              onChange={handleChange}
              value={formData.message}
            ></textarea>
          </div>

          <button
            type='submit'
            className='mt-3 btn text-white bg-purple-600 hover:bg-purple-700 w-full'
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}
