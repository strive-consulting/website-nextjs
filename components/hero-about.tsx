import Image from 'next/image'

import HeroImage from '@/public/images/about-hero.jpg'

export default function HeroAbout() {
  return (
    <section className='relative'>
      {/* Background image */}
      <div className='absolute inset-0'>
        <Image
          className='w-full h-full object-cover'
          src={HeroImage}
          width={1440}
          height={394}
          priority
          alt='About'
        />
        <div className='absolute inset-0 bg-gray-900 opacity-75' aria-hidden='true'></div>
      </div>

      {/* Hero content */}
      <div className='max-w-6xl mx-auto px-4 sm:px-6 relative'>
        <div className='pt-32 pb-12 md:pt-40 md:pb-20'>
          <div className='max-w-3xl mx-auto text-center'>
            <h1 className='h1 mb-4' data-aos='fade-up'>
              A Business Set Up & Consultancy Company Dedicated To Your Needs
            </h1>
            <p className='text-xl text-gray-400 mb-8' data-aos='fade-up' data-aos-delay='200'>
              We help businesses from Europe, North America and beyond expand into the Middle East
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
