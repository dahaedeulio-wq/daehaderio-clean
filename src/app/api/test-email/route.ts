import { NextRequest, NextResponse } from 'next/server'
import { sendTestEmail, sendQuoteNotificationEmail } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    console.log('🧪 Starting email test...')
    
    // 관리자 이메일로 고정 (dahaedeulio@gmail.com)
    const adminEmail = process.env.ADMIN_EMAIL || 'dahaedeulio@gmail.com'
    console.log('📧 Test email will be sent to:', adminEmail)
    console.log('📧 From address: onboarding@resend.dev (Resend 무료 플랜)')

    const { type } = await request.json().catch(() => ({ type: 'quote' }))

    let success = false

    if (type === 'test') {
      // 간단한 테스트 이메일 - 관리자 이메일로 발송
      success = await sendTestEmail(adminEmail)
    } else {
      // 견적 알림 이메일 테스트 - 관리자 이메일로 발송
      success = await sendQuoteNotificationEmail({
        name: '오다윗',
        phone: '010-6445-5367',
        address: '서울 서초구 서초중앙로5길 10-8',
        serviceType: 'direct',
        cleaningType: '일반 가정 청소 (테스트)',
        additionalInfo: '이것은 다해드리오 이메일 발송 테스트입니다. 시스템이 정상적으로 작동하고 있습니다.',
        submittedAt: new Date().toISOString(),
        quoteId: 'TEST_' + Date.now()
      })
    }

    if (success) {
      return NextResponse.json({
        success: true,
        message: `테스트 이메일이 ${adminEmail}로 성공적으로 전송되었습니다.`,
        details: {
          to: adminEmail,
          from: 'onboarding@resend.dev',
          type: type || 'quote'
        }
      })
    } else {
      return NextResponse.json(
        { 
          error: '이메일 전송에 실패했습니다. Resend API 키를 확인해주세요.',
          details: {
            to: adminEmail,
            from: 'onboarding@resend.dev'
          }
        },
        { status: 500 }
      )
    }

  } catch (error) {
    console.error('Test email error:', error)
    return NextResponse.json(
      { error: '이메일 테스트 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}
