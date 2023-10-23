const { withContentlayer } = require('next-contentlayer')

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
        source: '/client-information-request-form',
        destination: 'https://form.jotform.com/striveconsultants/client-information-request-form',
        permanent: true,
      },
      {
        source: '/call-back',
        destination: 'https://calendly.com/d/4cz-qzm-kdp/strive-consultants-dubai-discovery-call',
        permanent: true,
      },
    ]
  },
}

module.exports = withContentlayer(nextConfig)
