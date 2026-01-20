import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const envCheck = {
      hasResendKey: !!process.env.RESEND_API_KEY,
      resendKeyPrefix: process.env.RESEND_API_KEY ? process.env.RESEND_API_KEY.substring(0, 5) + '...' : 'Not set',
      adminEmail: process.env.ADMIN_EMAIL || 'Not set',
      siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'Not set',
      nodeEnv: process.env.NODE_ENV || 'Not set',
      timestamp: new Date().toISOString()
    }

    console.log('🔍 Environment Variables Check:', envCheck)

    return NextResponse.json({
      ok: true,
      message: 'Environment variables check completed',
      data: envCheck
    })
  } catch (error) {
    console.error('❌ Environment check error:', error)
    return NextResponse.json(
      {
        ok: false,
        message: 'Environment check failed',
        error: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}
