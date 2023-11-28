'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { businessActivities } from '@/app/constants'

interface FormData {
  businessActivity: string
  businessActivityValid: boolean
  companyName: string
  companyNameValid: boolean
  firstName: string
  firstNameValid: boolean
  lastName: string
  lastNameValid: boolean
  email: string
  emailValid: boolean
  phoneNumber: string
  phoneNumberValid: boolean
}

// Step 1 component
const Step1: React.FC<{
  onNext: () => void
  data: FormData
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
}> = ({ onNext, data, onChange }) => {
  const handleNext = (e: React.FormEvent) => {
    e.preventDefault()
    onNext()
  }

  const businessActivitiesSorted = businessActivities.sort((a, b) => a.label.localeCompare(b.label))

  return (
    <form onSubmit={handleNext}>
      <div className='flex flex-wrap lg:w-3/4'>
        
        <div className='w-full md:w-1/2 pr-3 mb-3 '>
          <label className='block text-gray-300 text-sm font-medium mb-1' htmlFor='first-name'>
            Company name
          </label>
          <input
            name='companyName'
            title='companyName'
            value={data.companyName}
            onChange={onChange}
            className='form-input w-full border-red-500 focus:border-red-500 text-gray-900'
            required
          />
          {!data.companyNameValid && <div className='text-red-500 text-sm mt-2'>Please enter a company name</div>}
        </div>
        <div className='md:w-1/2 mb-3'>
          <label className='block text-gray-300 text-sm font-medium mb-1' htmlFor='first-name'>
            Your Business Activity
          </label>
          <select
            name='businessActivity'
            title='businessActivity'
            value={data.businessActivity}
            onChange={onChange}
            className='form-input w-full border-red-500 focus:border-red-500 text-gray-900'
            required
          >
            <option>Please select</option>
            {businessActivitiesSorted.map((x) => {
              return (
                <option key={x.id} value={x.id}>
                  {x.label}
                </option>
              )
            })}
          </select>

          {!data.businessActivityValid && <div className='text-red-500 text-sm mt-2'>Please select a business activity</div>}
        </div>

        

        
        <button
          type='submit'
          className='mt-3 btn text-white bg-purple-600 hover:bg-purple-700 w-full'
        >
          Continue
        </button>
      </div>
    </form>
  )
}

// Step 2 component
const Step2: React.FC<{
  onSubmit: () => void
  data: FormData
  onPrevious: () => void
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
}> = ({ onSubmit, data, onChange, onPrevious }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit()
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className='flex flex-wrap lg:w-3/4'>
        <div className='w-full mb-3'>
          <label className='block text-gray-300 text-sm font-medium mb-1' htmlFor='first-name'>
            First Name
          </label>
          <input
            type='text'
            name='firstName'
            value={data.firstName}
            onChange={onChange}
            className='form-input w-full border-red-500 focus:border-red-500 text-gray-900'
          />
          {!data.firstNameValid && <div style={{ color: 'red' }}>Invalid</div>}
        </div>
        <div className='w-full mb-3'>
          <label className='block text-gray-300 text-sm font-medium mb-1' htmlFor='first-name'>
            Last Name
          </label>
          <input
            type='text'
            name='lastName'
            value={data.lastName}
            onChange={onChange}
            className='form-input w-full border-red-500 focus:border-red-500 text-gray-900'
          />
          {!data.lastNameValid && <div style={{ color: 'red' }}>Invalid</div>}
        </div>
        <div className='w-full mb-3'>
          <label className='block text-gray-300 text-sm font-medium mb-1' htmlFor='first-name'>
            Email
          </label>
          <input
            type='email'
            name='email'
            value={data.email}
            onChange={onChange}
            className='form-input w-full border-red-500 focus:border-red-500 text-gray-900'
          />
          {!data.emailValid && <div style={{ color: 'red' }}>Invalid</div>}
        </div>
        <div className='w-full mb-3'>
          <label className='block text-gray-300 text-sm font-medium mb-1' htmlFor='first-name'>
            Phone
          </label>
          <input
            type='tel'
            name='phoneNumber'
            value={data.phoneNumber}
            onChange={onChange}
            className='form-input w-full border-red-500 focus:border-red-500 text-gray-900'
          />
          {!data.phoneNumberValid && <div style={{ color: 'red' }}>Invalid</div>}
        </div>
      </div>

      <button
        onClick={onPrevious}
        className='mt-3 btn text-white bg-gray-600 hover:bg-purple-700 w-1/2'
      >
        Previous
      </button>
      <button
        type='submit'
        className='mt-3 btn text-white bg-purple-600 hover:bg-purple-700 w-1/2 ml-3'
      >
        Get Estimate
      </button>
    </form>
  )
}

// Main Form Component
const CompanyNameChecker: React.FC = () => {
  const router = useRouter()
  const [formData, setFormData] = useState<FormData>({
    businessActivity: '',
    businessActivityValid: true,
    companyName: '',
    companyNameValid: true,
    firstName: '',
    firstNameValid: true,
    lastName: '',
    lastNameValid: true,
    email: '',
    emailValid: true,
    phoneNumber: '',
    phoneNumberValid: true,
  })

  // State to track completion of Step 1
  const [step1Completed, setStep1Completed] = useState<boolean>(false)

  const handleStep1Submit = () => {
    setFormData({ ...formData })

    //console.log('formData.numberOfVisas', formData.numberOfVisas === 0)

    let error = false

    if (formData.businessActivity == '') {
      formData.businessActivityValid = false
      setFormData({ ...formData })
      error = true
    }

    if (formData.companyName == '') {
      formData.companyNameValid = false
      setFormData({ ...formData })
      error = true
    }

    if (error) return

    setStep1Completed(true)
  }

  const handleBack = () => {
    setFormData({ ...formData })
    setStep1Completed(false)
  }

  const handleStep2Submit = () => {
    console.log('submit step 2')
    setFormData({ ...formData })
    console.log(formData)

    let error = false

    if (formData.firstName === '') {
      formData.firstNameValid = false
      setFormData({ ...formData })
      error = true
    }

    if (formData.lastName === '') {
      formData.lastNameValid = false
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

    //All form data on the querystring
    router.push('/calculator/company-name-checker/results?' + objectToQueryString(formData))
  }

  function objectToQueryString(obj) {
    const params = new URLSearchParams()

    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        params.append(key, obj[key])
      }
    }

    return params.toString()
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target

    console.log(name, value)
    if (name === 'businessActivity') {
      formData.businessActivityValid = true
    }
    if (name === 'companyName') {
      formData.companyNameValid = true
    }

    if (name === 'firstName') {
      formData.firstNameValid = true
    }
    if (name === 'lastName') {
      formData.lastNameValid = true
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
    <div>
      {/* Render Step 1 */}
      {!step1Completed && (
        <Step1 onNext={handleStep1Submit} data={formData} onChange={handleChange} />
      )}

      {step1Completed && (
        <Step2
          onSubmit={handleStep2Submit}
          data={formData}
          onChange={handleChange}
          onPrevious={handleBack}
        />
      )}
    </div>
  )
}

export default CompanyNameChecker
