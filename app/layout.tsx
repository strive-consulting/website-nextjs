import './css/style.css'

import { Inter, Architects_Daughter } from 'next/font/google'

import Header from '@/components/ui/header'
import Script from 'next/script'
import { PrismicPreview } from '@prismicio/next'
import { repositoryName } from '@/prismicio'
import UtmStorage from '@/components/utm-storage'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const architects_daughter = Architects_Daughter({
  subsets: ['latin'],
  variable: '--font-architects-daughter',
  weight: '400',
  display: 'swap',
})

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <head>
        <Script id='google-tag-manager' strategy='afterInteractive'>
          {`
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTM}');
        `}
        </Script>

        {/* <Script
          id='google-analytics222'
          strategy='afterInteractive'
        >{`
          window.addEventListener('load', function() {
            console.log('LOADED);
          });
        `}</Script> */}

        <script async defer src='https://static.cdn.prismic.io/prismic.js?new=true&repo=strive'></script>

      </head>
      <body className={`${inter.variable} ${architects_daughter.variable} font-inter antialiased bg-gray-900 text-gray-200 tracking-tight`}>
        <div className='flex flex-col min-h-screen overflow-hidden'>
          {children}
          <PrismicPreview repositoryName={repositoryName} />
        </div>

        <UtmStorage />

        <noscript
          dangerouslySetInnerHTML={{
            __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM}" height="0" width="0" style="display: none; visibility: hidden;"></iframe>`,
          }}
        />
      </body>
    </html>
  )
}
