import 'aos/dist/aos.css'
import PageIllustration from '@/components/page-illustration'
import Footer from '@/components/ui/footer'
import { Metadata } from 'next'
import AosInit from '@/components/aos-init'
import { Constants } from '../constants'
import SchemaTag from '@/components/schema'

export const metadata: Metadata = {
  metadataBase: new URL(Constants.SiteDomain),
  // title: Constants.SiteTitle,
  // description: Constants.SiteDescription,
  robots: { index: true, follow: true },
  authors: [{ name: 'strive.ae' }],
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
    phone: '+971581073581',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '21314-001 IFZA Business Park',
      addressLocality: 'Dubai',
      addressRegion: 'AE',
      addressCountry: 'United Arab Emirates',
    },
    openingHours: 'Mo,Tu,We,Th,Fr 09:00-18:00',
    sameAs: [
      'https://www.facebook.com/strivedubai',
      'https://www.instagram.com/strive_dubai/',
      'https://www.linkedin.com/company/strive-consultants/',
    ],
    industry: 'Legal Services',
    serviceArea: 'United Arab Emirates',
    serviceOfferings: [
      'Company Registration',
      'Visa Processing',
      'Business Setup Consulting',
      'Accounting',
    ],
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
      <AosInit />

      <main className='grow'>
        <PageIllustration />
        {children}
      </main>

      <Footer />

      <SchemaTag schemaJson={schemaOrg} />
      <SchemaTag schemaJson={schemaWeb} />
    </>
  )
}
