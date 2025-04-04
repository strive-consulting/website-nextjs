export const metadata = {
  title: 'Contact Strive: Your Partner for Setting up a Company in Dubai',
  description: 'Reach out to Strive for professional assistance in setting up a company in Dubai. We guide you through every step of the process from company formation to visas.',
  alternates: {
    canonical: Constants.SiteDomain + '/contact',
  },
  openGraph: {
    title: 'Contact Us',
    description: 'Contact Strive Consultants to discuss your company formation and residency visa plans for the UAE',
    images: [Constants.SiteDomain + Constants.OpenGraphImage],
    url: Constants.SiteDomain + '/contact',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us',
    description: 'Contact Strive Consultants to discuss your company formation and residency visa plans for the UAE',
    siteId: '',
    images: [Constants.SiteDomain + Constants.OpenGraphImage],
  },
}

import { Constants } from '@/app/constants'
import EnquiryForm from '@/components/enquiry-form'

export default function Contact() {
  return (
    <>
      <section className='relative'>
        <div className='max-w-3xl mx-auto px-4 sm:px-6 relative'>
          <div className='pt-32 pb-12 md:pt-40 md:pb-20'>
            {/* Page header */}
            <div className='max-w-3xl mx-auto text-center mb-5'>
              <h1 className='h1 mb-4'>Contact Us for Setting up a Company in Dubai</h1>
              <p className='text-xl text-gray-400'>Complete the form and our team will be in touch usually within minutes 🚀</p>
            </div>

            <EnquiryForm />

            <div className='mt-5 max-w-sm mx-auto grid gap-8 md:grid-cols-3 lg:gap-16 items-start md:max-w-none bg-gray-800 py-10 px-8'>
              <div className='relative flex flex-col items-left' data-aos='fade-up'>
                <h5 className='h5 mb-2'>Contact Us</h5>
                <p className='text-lg text-gray-400 text-left text-base'>
                  <strong>Phone/WhatsApp</strong>
                  <br />
                  <a href='tel:+971 4 439 6282'>+971 4 439 6282</a>
                  <br />
                  <br />
                  <strong>Email</strong>
                  <br />
                  <a href='mailto:info@strive.ae'>info@strive.ae</a>
                </p>
              </div>
              <div className='relative flex flex-col items-left' data-aos='fade-up'>
                <h5 className='h5 mb-2'>UAE Office</h5>
                <p className='text-lg text-gray-400 text-left text-base'>
                  <address>38th Floor, Media One Tower, Dubai Media City</address>
                </p>
              </div>
              <div className='relative flex flex-col items-left' data-aos='fade-up'>
                <h5 className='h5 mb-2'>UK Office</h5>
                <p className='text-lg text-gray-400 text-left text-base'>
                  <address>167-169 Great Portland Street, 5th Floor, London, W1W 5PF</address>
                </p>
              </div>
            </div>

            {/* Contact form */}
            {/* <form className="max-w-xl mx-auto">
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
                  <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="first-name">First Name <span className="text-red-600">*</span></label>
                  <input id="first-name" type="text" className="form-input w-full text-gray-300 border-red-500 focus:border-red-500" placeholder="Enter your first name" required />
                  <p className="text-red-500 text-sm mt-2">This field is required</p>
                </div>
                <div className="w-full md:w-1/2 px-3">
                  <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="last-name">Last Name <span className="text-red-600">*</span></label>
                  <input id="last-name" type="text" className="form-input w-full text-gray-300" placeholder="Enter your last name" required />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="email">Email <span className="text-red-600">*</span></label>
                  <input id="email" type="email" className="form-input w-full text-gray-300" placeholder="Enter your email address" required />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="subject">Subject <span className="text-red-600">*</span></label>
                  <input id="subject" type="text" className="form-input w-full text-gray-300" placeholder="How can we help you?" required />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="country">Country</label>
                  <select id="country" className="form-select w-full text-gray-300">
                    <option>United States</option>
                    <option>United Kingdom</option>
                    <option>Germany</option>
                  </select>
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <label className="block text-gray-300 text-sm font-medium mb-1" htmlFor="message">Message</label>
                  <textarea id="message" rows={4} className="form-textarea w-full text-gray-300" placeholder="Write your message"></textarea>
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <label className="flex items-center">
                    <input type="checkbox" className="form-checkbox" />
                    <span className="text-gray-400 ml-2">I agree to the privacy policy</span>
                  </label>
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mt-6">
                <div className="w-full px-3">
                  <button className="btn text-white bg-purple-600 hover:bg-purple-700 w-full">Send</button>
                </div>
              </div>
            </form> */}
          </div>
        </div>
      </section>
    </>
  )
}
