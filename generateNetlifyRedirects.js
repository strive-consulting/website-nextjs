const fs = require('fs')
const path = require('path')
const { redirects } = require('./next.config.js') // Replace with the correct path to your next.config.js

async function generateRedirectsFile() {
  const redirectsArray = await redirects()

  const lines = redirectsArray.map(({ source, destination, permanent }) => {
    const redirectType = permanent ? '301' : '302'
    return `${source} ${destination} ${redirectType}`
  })

  return lines.join('\n')
}

async function main() {
  try {
    const redirectsConfig = await generateRedirectsFile()
    const outputPath = path.join(__dirname, 'public', '_redirects')

    fs.writeFileSync(outputPath, redirectsConfig)

    console.log('Generated _redirects file in the "public" directory.')
  } catch (error) {
    console.error('Error generating _redirects file:', error)
  }
}

main()
