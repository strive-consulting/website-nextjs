import Image from 'next/image'

import TeamImage01 from '@/public/images/team-member-pali.png'
import TeamImage02 from '@/public/images/team-member-raj.png'
import TeamImage03 from '@/public/images/team-member-rachael.png'
import TeamImage04 from '@/public/images/team-member-narendra.png'
import Link from 'next/link'
// import TeamImage05 from '@/public/images/team-member-05.jpg'
// import TeamImage06 from '@/public/images/team-member-06.jpg'
// import TeamImage07 from '@/public/images/team-member-07.jpg'
// import TeamImage08 from '@/public/images/team-member-08.jpg'

export default function Team() {
  return (
    <section>
      <div className='max-w-6xl mx-auto px-4 sm:px-6'>
        <div className='py-12 md:py-20 border-t border-gray-800'>
          {/* Section header */}
          <div className='max-w-3xl mx-auto text-center pb-12 md:pb-20'>
            <h2 className='h2 mb-4'>Management Team</h2>
            <p className='text-xl text-gray-400'>
              Our leadership team comprises accomplished entrepreneurs with a rich international background spanning the United Kingdom, Middle East, and Australia
            </p>
          </div>

          {/* Team members */}
          <div className='sm:flex sm:flex-wrap sm:justify-center -my-4 sm:-my-8 sm:-mx-3' data-aos-id-team>
            {/* 1st member */}
            <div className='sm:w-1/2 md:w-1/3 lg:w-1/4 py-4 sm:py-8 sm:px-3' data-aos='fade-up' data-aos-anchor='[data-aos-id-team]'>
              <div className='flex flex-col items-center'>
                <Image className='rounded-full mb-4' src={TeamImage01} width={120} height={120} alt='Pali Banwait' />
                <h4 className='text-xl font-medium mb-1'>Pali Banwait</h4>
                <div className='text-gray-500 mb-1'>CEO & Founder</div>
                {/* <a className="block text-purple-600 hover:text-gray-200 transition duration-150 ease-in-out" href="#0">LinkedIn</a> */}
                <Link
                  href='https://www.linkedin.com/company/strive-consultants/'
                  className='flex justify-center items-center text-purple-600 bg-gray-800 hover:text-gray-100 hover:bg-purple-600 rounded-full transition duration-150 ease-in-out'
                  aria-label='Linkedin'
                >
                  <svg className='w-8 h-8 fill-current' viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'>
                    <path d='M23.3 8H8.7c-.4 0-.7.3-.7.7v14.7c0 .3.3.6.7.6h14.7c.4 0 .7-.3.7-.7V8.7c-.1-.4-.4-.7-.8-.7zM12.7 21.6h-2.3V14h2.4v7.6h-.1zM11.6 13c-.8 0-1.4-.7-1.4-1.4 0-.8.6-1.4 1.4-1.4.8 0 1.4.6 1.4 1.4-.1.7-.7 1.4-1.4 1.4zm10 8.6h-2.4v-3.7c0-.9 0-2-1.2-2s-1.4 1-1.4 2v3.8h-2.4V14h2.3v1c.3-.6 1.1-1.2 2.2-1.2 2.4 0 2.8 1.6 2.8 3.6v4.2h.1z' />
                  </svg>
                </Link>
              </div>
            </div>

            {/* 2nd member */}
            <div className='sm:w-1/2 md:w-1/3 lg:w-1/4 py-4 sm:py-8 sm:px-3' data-aos='fade-up' data-aos-delay='100' data-aos-anchor='[data-aos-id-team]'>
              <div className='flex flex-col items-center'>
                <Image className='rounded-full mb-4' src={TeamImage02} width={120} height={120} alt='Raj Karwal' />
                <h4 className='text-xl font-medium mb-1'>Raj Karwal</h4>
                <div className='text-gray-500 mb-1'>CTO & Head of UK</div>
                {/* <a className="block text-purple-600 hover:text-gray-200 transition duration-150 ease-in-out" href="#0">@marie_moon</a> */}
                <Link
                  href='https://www.linkedin.com/company/strive-consultants/'
                  className='flex justify-center items-center text-purple-600 bg-gray-800 hover:text-gray-100 hover:bg-purple-600 rounded-full transition duration-150 ease-in-out'
                  aria-label='Linkedin'
                >
                  <svg className='w-8 h-8 fill-current' viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'>
                    <path d='M23.3 8H8.7c-.4 0-.7.3-.7.7v14.7c0 .3.3.6.7.6h14.7c.4 0 .7-.3.7-.7V8.7c-.1-.4-.4-.7-.8-.7zM12.7 21.6h-2.3V14h2.4v7.6h-.1zM11.6 13c-.8 0-1.4-.7-1.4-1.4 0-.8.6-1.4 1.4-1.4.8 0 1.4.6 1.4 1.4-.1.7-.7 1.4-1.4 1.4zm10 8.6h-2.4v-3.7c0-.9 0-2-1.2-2s-1.4 1-1.4 2v3.8h-2.4V14h2.3v1c.3-.6 1.1-1.2 2.2-1.2 2.4 0 2.8 1.6 2.8 3.6v4.2h.1z' />
                  </svg>
                </Link>
              </div>
            </div>

            {/* 3rd member */}
            <div className='sm:w-1/2 md:w-1/3 lg:w-1/4 py-4 sm:py-8 sm:px-3' data-aos='fade-up' data-aos-delay='200' data-aos-anchor='[data-aos-id-team]'>
              <div className='flex flex-col items-center'>
                <Image className='rounded-full mb-4' src={TeamImage03} width={120} height={120} alt='Rachael McMohan' />
                <h4 className='text-xl font-medium mb-1'>Rachael McMohan</h4>
                <div className='text-gray-500 mb-1'>Legal & Head of Asia Pacific</div>
                {/* <a className="block text-purple-600 hover:text-gray-200 transition duration-150 ease-in-out" href="#0">@mr_sebastian</a> */}
                <Link
                  href='https://www.linkedin.com/company/strive-consultants/'
                  className='flex justify-center items-center text-purple-600 bg-gray-800 hover:text-gray-100 hover:bg-purple-600 rounded-full transition duration-150 ease-in-out'
                  aria-label='Linkedin'
                >
                  <svg className='w-8 h-8 fill-current' viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'>
                    <path d='M23.3 8H8.7c-.4 0-.7.3-.7.7v14.7c0 .3.3.6.7.6h14.7c.4 0 .7-.3.7-.7V8.7c-.1-.4-.4-.7-.8-.7zM12.7 21.6h-2.3V14h2.4v7.6h-.1zM11.6 13c-.8 0-1.4-.7-1.4-1.4 0-.8.6-1.4 1.4-1.4.8 0 1.4.6 1.4 1.4-.1.7-.7 1.4-1.4 1.4zm10 8.6h-2.4v-3.7c0-.9 0-2-1.2-2s-1.4 1-1.4 2v3.8h-2.4V14h2.3v1c.3-.6 1.1-1.2 2.2-1.2 2.4 0 2.8 1.6 2.8 3.6v4.2h.1z' />
                  </svg>
                </Link>
              </div>
            </div>

            {/* 4th member */}
            <div className='sm:w-1/2 md:w-1/3 lg:w-1/4 py-4 sm:py-8 sm:px-3' data-aos='fade-up' data-aos-delay='300' data-aos-anchor='[data-aos-id-team]'>
              <div className='flex flex-col items-center'>
                <Image className='rounded-full mb-4' src={TeamImage04} width={120} height={120} alt='Narendra Punwaney' />
                <h4 className='text-xl font-medium mb-1'>Narendra Punwaney</h4>
                <div className='text-gray-500 mb-1'>CFO</div>
                {/* <a className="block text-purple-600 hover:text-gray-200 transition duration-150 ease-in-out" href="#0">@timothychandran</a> */}
                <Link
                  href='https://www.linkedin.com/company/strive-consultants/'
                  className='flex justify-center items-center text-purple-600 bg-gray-800 hover:text-gray-100 hover:bg-purple-600 rounded-full transition duration-150 ease-in-out'
                  aria-label='Linkedin'
                >
                  <svg className='w-8 h-8 fill-current' viewBox='0 0 32 32' xmlns='http://www.w3.org/2000/svg'>
                    <path d='M23.3 8H8.7c-.4 0-.7.3-.7.7v14.7c0 .3.3.6.7.6h14.7c.4 0 .7-.3.7-.7V8.7c-.1-.4-.4-.7-.8-.7zM12.7 21.6h-2.3V14h2.4v7.6h-.1zM11.6 13c-.8 0-1.4-.7-1.4-1.4 0-.8.6-1.4 1.4-1.4.8 0 1.4.6 1.4 1.4-.1.7-.7 1.4-1.4 1.4zm10 8.6h-2.4v-3.7c0-.9 0-2-1.2-2s-1.4 1-1.4 2v3.8h-2.4V14h2.3v1c.3-.6 1.1-1.2 2.2-1.2 2.4 0 2.8 1.6 2.8 3.6v4.2h.1z' />
                  </svg>
                </Link>
              </div>
            </div>

            {/* 5th member */}
            {/* <div className="sm:w-1/2 md:w-1/3 lg:w-1/4 py-4 sm:py-8 sm:px-3" data-aos="fade-up" data-aos-delay="400" data-aos-anchor="[data-aos-id-team]">
              <div className="flex flex-col items-center">
                <Image className="rounded-full mb-4" src={TeamImage05} width={120} height={120} alt="Team member 05" />
                <h4 className="text-xl font-medium mb-1">Dominik Prasad</h4>
                <div className="text-gray-500 mb-1">Backend Lead</div>
                <a className="block text-purple-600 hover:text-gray-200 transition duration-150 ease-in-out" href="#0">@dominikprasad</a>
              </div>
            </div> */}

            {/* 6th member */}
            {/* <div className="sm:w-1/2 md:w-1/3 lg:w-1/4 py-4 sm:py-8 sm:px-3" data-aos="fade-up" data-aos-delay="500" data-aos-anchor="[data-aos-id-team]">
              <div className="flex flex-col items-center">
                <Image className="rounded-full mb-4" src={TeamImage06} width={120} height={120} alt="Team member 06" />
                <h4 className="text-xl font-medium mb-1">Darya Semenova</h4>
                <div className="text-gray-500 mb-1">Backend Developer</div>
                <a className="block text-purple-600 hover:text-gray-200 transition duration-150 ease-in-out" href="#0">@daryamagic</a>
              </div>
            </div> */}

            {/* 7th member */}
            {/* <div className="sm:w-1/2 md:w-1/3 lg:w-1/4 py-4 sm:py-8 sm:px-3" data-aos="fade-up" data-aos-delay="600" data-aos-anchor="[data-aos-id-team]">
              <div className="flex flex-col items-center">
                <Image className="rounded-full mb-4" src={TeamImage07} width={120} height={120} alt="Team member 07" />
                <h4 className="text-xl font-medium mb-1">Quentin Renvoye</h4>
                <div className="text-gray-500 mb-1">Product Designer</div>
                <a className="block text-purple-600 hover:text-gray-200 transition duration-150 ease-in-out" href="#0">@quentinrenvoye</a>
              </div>
            </div> */}

            {/* 8th member */}
            {/* <div className="sm:w-1/2 md:w-1/3 lg:w-1/4 py-4 sm:py-8 sm:px-3" data-aos="fade-up" data-aos-delay="700" data-aos-anchor="[data-aos-id-team]">
              <div className="flex flex-col items-center">
                <Image className="rounded-full mb-4" src={TeamImage08} width={120} height={120} alt="Team member 08" />
                <h4 className="text-xl font-medium mb-1">Alyssa Chuzeville</h4>
                <div className="text-gray-500 mb-1">Community Lead</div>
                <a className="block text-purple-600 hover:text-gray-200 transition duration-150 ease-in-out" href="#0">@hello_chuzeville</a>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </section>
  )
}
