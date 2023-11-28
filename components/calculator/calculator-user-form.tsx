'use client'

import { useContext, useEffect, useState } from 'react'
import { CountryDropdown } from 'react-country-region-selector'

import PhoneInput from 'react-phone-input-2'
import 'react-phone-input-2/lib/style.css'

import Select from 'react-select'
import CalculatorContext from '../../context/CalculatorContext'
import { timelineOptions } from '@/app/constants'
import { useRouter } from 'next/navigation'

type Props = {
  afterQuote: boolean
}

const CalculatorUserForm: React.FC<Props> = ({ afterQuote }) => {
  const router = useRouter()

  const context = useContext(CalculatorContext)
  console.log(context)

  useEffect(() => {
    console.log(context)
  }),
    [context]

  const timeLineFromPrevious = context.inputs.timeline

  const [selectedTimeline, setSelectedTimeline] = useState(timeLineFromPrevious)

  const [firstNameValid, setFirstNameValid] = useState(true)
  const [lastNameValid, setLastNameValid] = useState(true)
  const [emailValid, setEmailValid] = useState(true)
  const [phoneValid, setPhoneValid] = useState(true)
  const [countryValid, setCountryValid] = useState(true)
  const [timelineValid, setTimelineValid] = useState(true)

  const handleChange = (e) => {
    console.log(e.target.name, e.target.value)
    context.setInputs({ ...context.inputs, [e.target.name]: e.target.value })
    //console.log(inputs);
    console.log('context', context)
  }

  //Select controlled

  const handleTimelineChange = (selection) => {
    console.log(selection)
    context.setInputs({
      ...context.inputs,
      timeline: selection,
      timelineSelected: selection.label,
    })
    // context.setInputs({ ...context.inputs, timelineSelected: selection.label });
    setSelectedTimeline(selection) //react-select expects an object of name and value
    setTimelineValid(true)
  }

  const handlePhoneNumberChange = (value) => {
    context.setInputs({ ...context.inputs, phonenumber: value })
    setPhoneValid(true)
  }

  const handleCountryChange = (value) => {
    context.setInputs({ ...context.inputs, nationality: value })
    setCountryValid(true)
  }

  function resetValidatorMessages() {
    setFirstNameValid(true)
    setLastNameValid(true)
    setPhoneValid(true)
    setEmailValid(true)
    setCountryValid(true)
    setTimelineValid(true)
  }
  function SubmitForm(e) {
    resetValidatorMessages()

    if (context.inputs.firstname === '') {
      setFirstNameValid(false)
      return
    }

    if (context.inputs.lastname === '') {
      setLastNameValid(false)
      return
    }

    if (context.inputs.phonenumber === '') {
      setPhoneValid(false)
      return
    }

    const regexpEmail = new RegExp(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    )
    if (context.inputs.email === '' || !regexpEmail.test(context.inputs.email)) {
      setEmailValid(false)
      return
    }

    if (context.inputs.nationality === '') {
      setCountryValid(false)
      return
    }

    if (!context.inputs.timeline) {
      setTimelineValid(false)
      return
    }

    console.log('Submitting form with ')
    console.log(context.inputs)

    if (afterQuote) {
      //Flag form submission as higher priority
      context.setInputs({
        ...context.inputs,
        callback: true,
      })
    }

    // Post to netlify. Note, using content (not form) which matches the dummy form initialised on the Calculator component
    fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({ 'form-name': 'estimate', ...context.inputs }),
    })
      .then(() => console.log('Success!'))
      .catch((error) => alert(error))

    //First submission
    if (!afterQuote) router.push('/your-estimate')

    if (afterQuote) router.push('/your-estimate-thanks')
  }

  function encode(data) {
    return Object.keys(data)
      .map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
      .join('&')
  }

  return (
    <>
      <hr />
      <form name='estimate' data-netlify='true'>
        <input type='hidden' name='form-name' value='estimate'></input>

        {/* {after second submission} */}
        {afterQuote && <input type='hidden' name='callback' value='true' />}
        <div className='row'>
          <div className='col-12 mb-20'>
            <label>First Name</label>
            <input
              type='text'
              className='form-control'
              name='firstname'
              value={context.inputs.firstname}
              onChange={handleChange}
            />
            <div className='validator' style={{ display: firstNameValid ? 'none' : 'block' }}>
              Please enter your first name
            </div>
          </div>
          <div className='col-12 mb-20'>
            <label>Last Name</label>
            <input
              type='text'
              className='form-control'
              name='lastname'
              value={context.inputs.lastname}
              onChange={handleChange}
              required
            />
            <div className='validator' style={{ display: lastNameValid ? 'none' : 'block' }}>
              Please enter your last name
            </div>
          </div>
          <div className='col-12 mb-20'>
            <label>Phone</label>
            <PhoneInput
              placeholder='Enter phone number'
              country={'ae'}
              inputProps={{
                name: 'phonenumber',
                required: true,
              }}
              value={context.inputs.phonenumber}
              onChange={handlePhoneNumberChange}
            />
            <div className='validator' style={{ display: phoneValid ? 'none' : 'block' }}>
              Please enter your phone number
            </div>
          </div>
          <div className='col-12 mb-20'>
            <label>Email</label>
            <input
              type='email'
              className='form-control'
              name='email'
              value={context.inputs.email}
              onChange={handleChange}
              required
            />
            <div className='validator' style={{ display: emailValid ? 'none' : 'block' }}>
              Please enter your email
            </div>
          </div>
          <div className='col-12 mb-20'>
            <label>Nationality</label>
            <CountryDropdown
              value={context.inputs.nationality}
              name='nationality'
              onChange={handleCountryChange}
              classes='form-control'
            />
            <div className='validator' style={{ display: countryValid ? 'none' : 'block' }}>
              Please select your nationality
            </div>
          </div>

          <div className='col-12 mb-20'>
            <label>How soon do you plan to set up?</label>

            <Select
              className='react-select-form-control'
              classNamePrefix='react-select-inner-form-control'
              value={selectedTimeline}
              name='timeline'
              onChange={handleTimelineChange}
              options={timelineOptions}
            />
            <div className='validator' style={{ display: timelineValid ? 'none' : 'block' }}>
              Please select
            </div>
          </div>

          {/* <div className="col-6 mb-20">
            <button type="button" className="theme-btn border-btn" onClick={() => setFormStep(1)}>
              Back
            </button>
          </div> */}
          <div className='col-12 mb-20'>
            <button type='button' className='theme-btn border-btn' onClick={(e) => SubmitForm(e)}>
              {afterQuote ? 'Request Call Back' : 'Get Estimate'}
            </button>
          </div>
        </div>
      </form>
    </>
  )
}

export default CalculatorUserForm
