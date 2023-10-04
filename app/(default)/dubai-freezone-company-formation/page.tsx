export const metadata = {
  title: 'Features - Open PRO',
  description: 'Page description',
}

import Hero from '@/components/hero-features'
import Stats from '@/components/stats'
import Zigzag from '@/components/zigzag'
import Blocks from '@/components/blocks'
import CaseStudies from '@/components/case-studies'
import Cta from '@/components/cta'

export default function Features() {
  return (
    <>
    <h1>Dubai company setup</h1>
      <Hero />
      <Stats />
      <Zigzag />
      <Blocks />
      <CaseStudies />
      <Cta />
    </>
  )
}