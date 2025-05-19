import { NextResponse, NextRequest } from 'next/server'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  try {
    const forwarded = req.headers.get('x-forwarded-for') || req.ip
    const clientIp = forwarded?.split(',')[0]?.trim() || 'unknown'

    return NextResponse.json({ ip: clientIp })
  } catch (error: any) {
    console.error('Error:', error)
    return NextResponse.json(error.message)
  }
}
