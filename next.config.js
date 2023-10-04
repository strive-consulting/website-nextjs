const { withContentlayer } = require('next-contentlayer')

/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
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