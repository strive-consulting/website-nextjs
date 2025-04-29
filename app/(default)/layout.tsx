import 'aos/dist/aos.css'
import PageIllustration from '@/components/page-illustration'
import Footer from '@/components/ui/footer'
import { Metadata } from 'next'
import AosInit from '@/components/aos-init'
import { Constants } from '../constants'
import SchemaTag from '@/components/schema'
import Header from '@/components/ui/header'

export const metadata: Metadata = {
  metadataBase: new URL(Constants.SiteDomain),
  // title: Constants.SiteTitle,
  // description: Constants.SiteDescription,
  robots: { index: true, follow: true },
  authors: [{ name: 'strivedubai.com' }],
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#000000',
  // alternates: {
  //   canonical: Constants.SiteDomain,
  // },
  // openGraph: {
  //   title: Constants.SiteTitle,
  //   description: Constants.SiteDescription,
  //   images: [Constants.SiteDomain + Constants.OpenGraphImage],
  // },
  // twitter: {
  //   card: 'summary_large_image',
  //   title: Constants.SiteTitle,
  //   description: Constants.SiteDescription,
  //   siteId: '',
  //   images: [Constants.SiteDomain + Constants.OpenGraphImage],
  // },
}

export default function DefaultLayout({ children }: { children: React.ReactNode }) {
  let schemaOrg = {
    '@context': 'https://schema.org',
    '@type': ['Organization', 'LegalService'],
    url: Constants.SiteDomain,
    name: Constants.SiteTitle,
    description:
      'Dubai company formation consultancy based in the UAE. We help businesses of all sizes to set up and operate in the UAE. We offer a wide range of services, including company registration, visa processing, business setup consulting, and accounting.',
    email: 'info@strive.ae',
    telephone: '+971581073581',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '21314-001 IFZA Business Park',
      addressLocality: 'Dubai',
      addressRegion: 'AE',
      addressCountry: 'United Arab Emirates',
    },
    openingHours: 'Mo,Tu,We,Th,Fr 09:00-18:00',
    sameAs: ['https://www.facebook.com/strivedubai', 'https://www.instagram.com/strive_dubai/', 'https://www.linkedin.com/company/strive-consultants/', 'https://www.tiktok.com/@strive_dubai'],
    logo: {
      '@type': 'ImageObject',
      url: Constants.SiteDomain + '/' + Constants.OpenGraphImage,
      height: 60,
      width: 60,
    },
  }

  let schemaWeb = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    url: Constants.SiteDomain,
    name: Constants.SiteTitle,
    encoding: 'UTF-8',
    image: {
      '@type': 'ImageObject',
      url: Constants.SiteDomain + '/' + Constants.OpenGraphImage,
      height: 60,
      width: 60,
    },
  }

  return (
    <>
      <main className='grow'>
        <Header />
        <PageIllustration />
        {children}
        {/* This seems to need to be here for animations from slicezone (loaded in Children) to work. Doesn't like it from the layout pages */}
        <AosInit />
      </main>

      <Footer />

      <SchemaTag schemaJson={schemaOrg} />
      <SchemaTag schemaJson={schemaWeb} />

    </>
  )
}
