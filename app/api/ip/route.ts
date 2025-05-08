import { NextResponse, NextRequest } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  try {
    const clientIp = req.headers.get('x-forwarded-for') || req.ip ///|| req.connection.remoteAddress

    return NextResponse.json({ ip: clientIp })
    //     // Add headers to disable compression and provide user-agent
    //     const response = await fetch('https://jsonip.com', {
    //       headers: {
    //         'Accept-Encoding': 'identity',
    //         'User-Agent': 'Mozilla/5.0 Next.js API Route',
    //       },
    //       cache: 'no-store', // Prevent caching issues
    //     })

    //     // Get text first to avoid decompression errors
    //     const textData = await response.text()
    //     // Parse the text data to JSON
    //     const data = JSON.parse(textData)

    //     return NextResponse.json({ ip: data.ip })
  } catch (error: any) {
    console.error('Error:', error)
    return NextResponse.json(error.message)
  }
}
