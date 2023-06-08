export const metadata : Metadata = {
  title: 'About Us',
  description: 'Strive is your one-stop shop for company formation and set up in UAE • Get your Mainland & Free zone company set up in Dubai today at low cost',
  alternates: {
    canonical: "about"
  },
}
import HeroAbout from '@/components/hero-about'
import TeamImages from '@/components/team-images'
import Timeline from '@/components/timeline'
import Team from '@/components/team'
import TestimonialsCarousel from '@/components/testimonials-carousel'
import Career from '@/components/career'
import Clients from '@/components/clients'
import Newsletter from '@/components/newsletter'
import { Metadata } from 'next'

export default function About() {
  return (
    <>
      <HeroAbout />
      <TeamImages />
      <Timeline />
      <Team />
      <TestimonialsCarousel />
      <Career />
      <Clients />
      <Newsletter />
    </>
  )
}