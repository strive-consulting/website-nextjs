import { createClient } from '@/prismicio'
import { components } from '@/slices'
import { notFound } from 'next/navigation'

// export const metadata: Metadata = {
//   title: 'Set Up a Company in Dubai Within Minutes | Strive.ae',
//   description:
//     'Strive is your one-stop shop for company formation and set up in UAE. Get your Mainland & Free zone company set up in Dubai today at low cost',
//   alternates: {
//     canonical: '/',
//   },
// }

import { Metadata } from 'next'
import { SliceZone } from '@prismicio/react'

export default async function Home() {
  const client = createClient()
  const page = await client.getByUID('servicepage', 'home-test').catch(() => notFound())

  return <SliceZone slices={page.data.slices} components={components} />

  // return (
  //   <>
  //     <HeroMain isHomePage={true} title='Test' subTitle='dsfhsdkfj' backgroundImagePath='' />
  //     {/* <Hero /> */}
  //     <Process />
  //     <Testimonials count={3} />
  //     <FeaturesHome />
  //     <Tabs />
  //     <Target />
  //     <News />
  //     {/* <Newsletter />       */}
  //   </>
  // )
}

export async function generateMetadata(): Promise<Metadata> {
  const client = createClient()
  const page = await client.getByUID('servicepage', 'home-test').catch(() => notFound())

  return {
    title: page.data.meta_title,
    description: page.data.meta_description,
    alternates: {
      canonical: '/',
    },
  }
}
