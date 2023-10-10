export const metadata: Metadata = {
  title: 'Set Up a Company in Dubai Within Minutes | Strive.ae',
  description:
    'Strive is your one-stop shop for company formation and set up in UAE. Get your Mainland & Free zone company set up in Dubai today at low cost',
  alternates: {
    canonical: '/',
  },
}

import Hero from '@/components/hero-home'
import Process from '@/components/process'
import FeaturesHome from '@/components/features'
import Tabs from '@/components/tabs'
import Target from '@/components/target'
import News from '@/components/news'
import { Metadata } from 'next'
import HeroMain from '@/components/hero-main'
import Testimonials from '@/components/testimonials'

export default function Home() {
  return (
    <>
      <HeroMain isHomePage={true} title='Test' subTitle='dsfhsdkfj' backgroundImagePath='' />
      {/* <Hero /> */}
      <Process />
      <Testimonials count={3} />
      <FeaturesHome />
      <Tabs />
      <Target />
      <News />
      {/* <Newsletter />       */}
    </>
  )
}
