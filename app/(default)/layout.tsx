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
  let schema = [
    {
      '@type': 'Organization',
      url: Constants.SiteDomain,
      name: Constants.SiteTitle,
      logo: {
        '@type': 'ImageObject',
        url: Constants.SiteDomain + Constants.OpenGraphImage,
        height: 60,
        width: 60,
      },
    },
    {
      '@type': 'WebSite',
      url: Constants.SiteDomain,
      name: Constants.SiteTitle,
      encoding: 'UTF-8',
      image: {
        '@type': 'ImageObject',
        url: Constants.SiteDomain + Constants.OpenGraphImage,
        height: 60,
        width: 60,
      },
    },
  ]

  return (
    <>
      <AosInit />

      <main className='grow'>
        <PageIllustration />
        {children}
      </main>

      <Footer />

      <SchemaTag schemaJson={schema} />
    </>
  )
}
