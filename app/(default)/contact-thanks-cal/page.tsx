import Link from 'next/link'

export const metadata = {
  title: 'Thanks',
  description: 'Thanks for booking your consultation',
}

export default function Contact() {
  return (
    <>
      <section className='relative'>
        <div className='max-w-6xl mx-auto px-4 sm:px-6 relative'>
          <div className='pt-32 pb-12 md:pt-40 md:pb-20'>
            {/* Page header */}
            <div className='max-w-3xl mx-auto text-center pb-12 md:pb-16'>
              <h1 className='h1 mb-4' data-aos='fade-up'>
                Thanks
              </h1>
              <p className='text-xl text-gray-400' data-aos='fade-up' data-aos-delay='200'>
                Your meeting is booked. One of our experienced consultants look forward to discussing your plans. Thank you for choosing Strive!
              </p>
            </div>
            <div className='flex justify-center mb-8' data-aos='fade-up' data-aos-delay='400' data-aos-anchor='[data-aos-id-cta]'>
              <Link className='btn-sm text-white bg-purple-600 hover:bg-purple-700 mt-6' href='/'>
                Back to home
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* <CtaContact /> */}
    </>
  )
}
