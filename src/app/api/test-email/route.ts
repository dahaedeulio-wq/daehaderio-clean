import { NextRequest, NextResponse } from 'next/server'
import { sendTestEmail, sendQuoteNotificationEmail } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const { type, email } = await request.json()

    if (!email) {
      return NextResponse.json(
        { error: '이메일 주소가 필요합니다.' },
        { status: 400 }
      )
    }

    let success = false

    if (type === 'test') {
      // 간단한 테스트 이메일
      success = await sendTestEmail(email)
    } else if (type === 'quote') {
      // 견적 알림 이메일 테스트
      success = await sendQuoteNotificationEmail({
        name: '오다윗',
        phone: '010-6445-5367',
        address: '서울 서초구 서초중앙로5길 10-8',
        serviceType: 'direct',
        cleaningType: '일반 가정 청소',
        additionalInfo: '거실과 침실 청소 부탁드립니다. 애완동물이 있어서 친환경 세제 사용해주세요.',
        submittedAt: new Date().toISOString(),
        quoteId: 'TEST_' + Date.now()
      })
    } else {
      return NextResponse.json(
        { error: '유효하지 않은 테스트 타입입니다.' },
        { status: 400 }
      )
    }

    if (success) {
      return NextResponse.json({
        success: true,
        message: '테스트 이메일이 성공적으로 전송되었습니다.'
      })
    } else {
      return NextResponse.json(
        { error: '이메일 전송에 실패했습니다. 환경변수를 확인해주세요.' },
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
