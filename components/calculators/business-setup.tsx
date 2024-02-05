'use client'
import { useEffect, useState } from 'react'
import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { businessActivities } from '@/app/constants'
import { getVisitorGeoInfo, objectToQueryString } from '@/lib/helpers'
import { Loader } from '../loader'

interface FormData {
  formName: string

  businessActivity: string
  businessActivityValid: boolean
  //   premisesType: string
  numberOfVisas: number
  numberOfVisasValid: boolean
  numberOfPartners: number
  numberOfPartnersValid: boolean
  // firstName: string
  // firstNameValid: boolean
  // lastName: string
  // lastNameValid: boolean
  name: string
  nameValid: boolean
  email: string
  emailValid: boolean
  phoneNumber: string
  phoneNumberValid: boolean
  //   nationality: string
  utmCampaign?: string
  utmMedium?: string
  utmSource?: string
  deferedDataCapture?: boolean
  backUrl?: string
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
      <div className='flex flex-wrap' data-aos='fade-up'>
        <div className='w-full mb-3'>
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

        <div className='w-1/2 pr-3 mb-3 '>
          <label className='block text-gray-300 text-sm font-medium mb-1' htmlFor='first-name'>
            Number of visas
          </label>
          <input
            name='numberOfVisas'
            title='numberOfVisas'
            value={data.numberOfVisas}
            onChange={onChange}
            className='form-input w-full border-red-500 focus:border-red-500 text-gray-900'
            type='number'
            required
          />
          {!data.numberOfVisasValid && <div className='text-red-500 text-sm mt-2'>Please enter 0 or more visas</div>}
        </div>

        <div className='w-1/2 pl-3 mb-3 '>
          <label className='block text-gray-300 text-sm font-medium mb-1' htmlFor='first-name'>
            Shareholders
          </label>
          <input
            name='numberOfPartners'
            title='numberOfPartners'
            value={data.numberOfPartners}
            onChange={onChange}
            className='form-input w-full border-red-500 focus:border-red-500 text-gray-900'
            type='number'
            required
          />
          {!data.numberOfPartnersValid && <div className='text-red-500 text-sm mt-2'>Please enter 1 or more shareholders</div>}
        </div>
        <button type='submit' className='mt-3 btn text-white bg-purple-600 hover:bg-purple-700 w-full'>
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
      <div className='flex flex-wrap' data-aos='fade-up'>
        <div className='w-full mb-3'>
          <label className='block text-gray-300 text-sm font-medium mb-1' htmlFor='name'>
            Name
          </label>
          <input type='text' name='name' value={data.name} onChange={onChange} className='form-input w-full border-red-500 focus:border-red-500 text-gray-900' placeholder='e.g Peter Jones' />
          {!data.nameValid && <div className='text-red-500 text-sm mt-2'>Please enter your name</div>}
        </div>
        <div className='w-full mb-3'>
          <label className='block text-gray-300 text-sm font-medium mb-1' htmlFor='first-name'>
            Email
          </label>
          <input type='email' name='email' value={data.email} onChange={onChange} className='form-input w-full border-red-500 focus:border-red-500 text-gray-900' placeholder='e.g name@domain.com' />
          {!data.emailValid && <div className='text-red-500 text-sm mt-2'>Please enter your email address</div>}
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
            placeholder='e.g. 447961543221'
          />
          {!data.phoneNumberValid && <div className='text-red-500 text-sm mt-2'>Please enter your phone number</div>}
        </div>
        <button type='submit' className='mt-3 btn text-white bg-purple-600 hover:bg-purple-700 w-full'>
          Get Estimate
        </button>

        <div onClick={onPrevious} className='mt-5 text-sm'>
          Back
        </div>
      </div>
    </form>
  )
}

// Main Form Component
interface SetupProps {
  deferedDataCapture?: boolean
}

const BusinessSetupCalculator: React.FC<SetupProps> = ({ deferedDataCapture }: SetupProps) => {
  const router = useRouter()

  const searchParams = useSearchParams()

  //Create a Back url
  const pathname = usePathname()
  const backUrl = pathname + '?' + searchParams.toString()

  const utm = {
    utmCampaign: searchParams.get('utm_campaign') ?? undefined,
    utmMedium: searchParams.get('utm_medium') ?? undefined,
    utmSource: searchParams.get('utm_source') ?? undefined,
  }

  const [formData, setFormData] = useState<FormData>({
    formName: 'business-setup-calculator',
    businessActivity: '',
    businessActivityValid: true,
    numberOfVisas: 1,
    numberOfVisasValid: true,
    numberOfPartners: 1,
    numberOfPartnersValid: true,
    name: '',
    nameValid: true,
    email: '',
    emailValid: true,
    phoneNumber: '',
    phoneNumberValid: true,
    utmCampaign: utm.utmCampaign,
    utmMedium: utm.utmMedium,
    utmSource: utm.utmSource,
    deferedDataCapture: deferedDataCapture,
    backUrl: backUrl,
  })

  // State to track completion of Step 1
  const [step1Completed, setStep1Completed] = useState<boolean>(false)
  const [step2Completed, setStep2Completed] = useState<boolean>(false)

  const handleStep1Submit = () => {
    setFormData({ ...formData })

    let error = false

    if (formData.businessActivity == '') {
      formData.businessActivityValid = false
      setFormData({ ...formData })
      error = true
    }

    if (formData.numberOfVisas < 0) {
      formData.numberOfVisasValid = false
      setFormData({ ...formData })
      error = true
    }

    if (formData.numberOfPartners < 1) {
      formData.numberOfPartnersValid = false
      setFormData({ ...formData })
      error = true
    }

    if (error) return

    setStep1Completed(true)

    deferedDataCapture && handleRedirect()
  }

  const handleBack = () => {
    setFormData({ ...formData })
    setStep1Completed(false)
  }

  const handleStep2Submit = async () => {
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

    await handleRedirect()
  }

  const handleRedirect = async () => {
    setStep2Completed(true)

    await new Promise((f) => setTimeout(f, 5000))

    //All form data on the querystring
    router.push('/tools/cost-calculator/results?' + objectToQueryString(formData))
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target

    // console.log(name, value)
    if (name === 'businessActivity') {
      formData.businessActivityValid = true
    }
    if (name === 'numberOfVisas' && parseInt(value) >= 0) {
      formData.numberOfVisasValid = true
    }
    if (name === 'numberOfPartners' && parseInt(value) >= 1) {
      formData.numberOfPartnersValid = true
    }
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
      {!step1Completed && <Step1 onNext={handleStep1Submit} data={formData} onChange={handleChange} />}

      {step1Completed && !step2Completed && <Step2 onSubmit={handleStep2Submit} data={formData} onChange={handleChange} onPrevious={handleBack} />}

      {step2Completed && <Loader />}
    </>
  )
}

export default BusinessSetupCalculator
