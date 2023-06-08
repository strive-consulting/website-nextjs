export const metadata : Metadata = {
  metadataBase: new URL("https://www.strive.aeYO"),
  title: 'Set Up a Company in Dubai Within Minutes | Strive.ae',
  description: 'Strive is your one-stop shop for company formation and set up in UAE • Get your Mainland & Free zone company set up in Dubai today at low cost',
  openGraph : {},
  alternates: {
    canonical: ""
  }
}

import 'aos/dist/aos.css'
import PageIllustration from '@/components/page-illustration'
import Footer from '@/components/ui/footer'
import { Metadata } from 'next'
import AosInit from '@/components/aos-init'

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode
}) {  


  return (
    <>
      <AosInit/>

      <main className="grow">

        <PageIllustration />

        {children}

      </main>

      <Footer />
    </>
  )
}
