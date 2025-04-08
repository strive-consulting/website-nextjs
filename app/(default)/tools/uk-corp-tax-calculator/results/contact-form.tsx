'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader } from '@/components/loader'

interface Props {
  data: {
    yearlyTurnOver: number
    yearlyExpenses: number
    utmCampaign?: string
    utmMedium?: string
    utmSource?: string
    utmTerm?: string
    label: string
  }
}

const ContactForm = (props: Props) => {
  const router = useRouter()
  const [submittingData, setSubmittingData] = useState(false)

  const handleContactFormSubmit = async (e: any) => {
    e.preventDefault()

    setSubmittingData(true)

    const formData = {
      formName: 'uk-corp-tax-calculator',
      name: e.target.name.value,
      email: e.target.email.value,
      phoneNumber: e.target.phoneNumber.value,
      dateTime: new Date().toISOString(),
      utm: {
        utmCampaign: props.data.utmCampaign ?? undefined,
        utmMedium: props.data.utmMedium ?? undefined,
        utmSource: props.data.utmSource ?? undefined,
        utmTerm: props.data.utmTerm ?? undefined,
      },
      label: props.data.label,
      notes: 'Turnover: ' + props.data.yearlyTurnOver + ' | Expenses: ' + props.data.yearlyExpenses,
    }

    //All form data on the querystring
    await fetch(process.env.BASE_URL + '/api/forms/prefill', {
      method: 'POST',
      body: JSON.stringify(formData),
    })

    await new Promise((f) => setTimeout(f, 2000))

    router.push('/contact-thanks-form')
  }

  return (
    <form onSubmit={handleContactFormSubmit}>
      <div className='flex flex-wrap' data-aos='fade-up'>
        <div className='w-full mb-3'>
          <label className='block text-gray-300 text-sm font-medium mb-1' htmlFor='name'>
            Name
          </label>
          <input type='text' name='name' className='form-input w-full border-red-500 focus:border-red-500 text-gray-900' placeholder='e.g Peter Jones' required />
        </div>
        <div className='w-full mb-3'>
          <label className='block text-gray-300 text-sm font-medium mb-1' htmlFor='first-name'>
            Email
          </label>
          <input type='email' name='email' className='form-input w-full border-red-500 focus:border-red-500 text-gray-900' placeholder='e.g name@domain.com' required />
        </div>
        <div className='w-full mb-3'>
          <label className='block text-gray-300 text-sm font-medium mb-1' htmlFor='first-name'>
            Phone
          </label>
          <input type='tel' name='phoneNumber' className='form-input w-full border-red-500 focus:border-red-500 text-gray-900' placeholder='e.g. 447961543221' required />
        </div>
        {!submittingData ? (
          <button type='submit' className='mt-3 btn text-white bg-purple-600 hover:bg-purple-700 w-full'>
            Book a free consultation
          </button>
        ) : (
          <div className='mx-auto'>
            <Loader />
          </div>
        )}
      </div>
    </form>
  )
}

export default ContactForm
