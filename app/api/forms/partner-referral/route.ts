import { NextRequest, NextResponse } from 'next/server'

export async function POST(data: NextRequest) {
  try {
    let formData = await data.json()

    const response = await fetch(process.env.WEBHOOK_REFER_TO_PARTNER ?? '', {
      method: 'POST',
      body: JSON.stringify(formData),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const jsonResponse = await response.json()
    console.log(jsonResponse)
    return NextResponse.json(jsonResponse)
  } catch (error: any) {
    console.error('Error:', error.message)
    return NextResponse.json(error.message)
  }
}
