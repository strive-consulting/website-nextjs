import 'aos/dist/aos.css'
import PageIllustration from '@/components/page-illustration'
import Footer from '@/components/ui/footer'
import { Metadata } from 'next'
import AosInit from '@/components/aos-init'
import { Constants } from '../constants'
import { PrismicPreview } from '@prismicio/next'
import { repositoryName } from '@/prismicio'

export const metadata : Metadata = {
  metadataBase: new URL(Constants.SiteDomain),
  title: Constants.SiteTitle,
  description: Constants.SiteDescription,
  robots: {index: true, follow: true },
  authors: [{name: "strive.ae"}],
  viewport: "width=device-width, initial-scale=1",
  themeColor: "#000000",
  alternates: {
    canonical: Constants.SiteDomain
  },
  openGraph : {
    title: Constants.SiteTitle,
    description: Constants.SiteDescription,
    images: [Constants.SiteDomain + Constants.OpenGraphImage],
  },
  twitter: {
    card: "summary_large_image",
    title: Constants.SiteTitle,
    description: Constants.SiteDescription,
    siteId: "",
    images: [Constants.SiteDomain + Constants.OpenGraphImage],
  }, 
}

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

        <PrismicPreview repositoryName={repositoryName} />
      </main>

      <Footer />
    </>
  )
}
