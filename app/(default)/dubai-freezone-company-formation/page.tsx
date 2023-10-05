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
import HeroMain, { HeaderEnum } from '@/components/hero-main'

export default function Features() {
  return (
    <>
      <HeroMain align={HeaderEnum.Left} title={'Set up a Free Zone Company in Dubai'} subTitle={'Your one-stop shop for company formations & business banking consultancy in the UAE'} showBackgroundIllustration={false} showCta={false}/>
      <Stats />
      <Zigzag />
      <Blocks />
      <CaseStudies />
      <Cta />
    </>
  )
}