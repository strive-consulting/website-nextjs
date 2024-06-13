/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.prismic.io', 'i.ytimg.com'],
  },
  async redirects() {
    return [
      {
        source: '/home', //ensure prismic service page is only rendered in the default home location
        destination: '/',
        permanent: true,
      },
      {
        source: '/dubai-company-set-up',
        destination: '/setting-up-a-business-in-dubai',
        permanent: true,
      },
      {
        source: '/payment-link-generator',
        destination: 'https://form.jotform.com/striveconsultants/payment-link-generator',
        permanent: true,
      },
      {
        source: '/client-information-request-form',
        destination: 'https://form.jotform.com/striveconsultants/client-information-request-form',
        permanent: true,
      },
      {
        source: '/client-information-request-form-no-formation',
        destination: 'https://form.jotform.com/striveconsultants/client-information-request-form-nof',
        permanent: true,
      },
      {
        source: '/employee-information-request-form',
        destination: 'https://form.jotform.com/striveconsultants/employee-visa-information-request',
        permanent: true,
      },
      {
        source: '/accounting-information-request-form',
        destination: 'https://form.jotform.com/striveconsultants/accounting-information-request-form',
        permanent: true,
      },
      {
        source: '/sales-closure-form',
        destination: 'https://form.jotform.com/striveconsultants/sales-closure-form',
        permanent: true,
      },
      {
        source: '/amendment-request',
        destination: 'https://form.jotform.com/striveconsultants/amendment-request',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
