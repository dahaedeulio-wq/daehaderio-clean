import { Resend } from 'resend'

// Resend 인스턴스를 지연 생성하여 환경변수 없을 때 에러 방지
let resend: Resend | null = null

function getResendInstance(): Resend | null {
  // 환경변수 호출 방식 보강 - 확실한 인식을 위해 직접 접근
  const apiKey = process.env.RESEND_API_KEY
  
  console.log('🔍 RESEND_API_KEY 환경변수 점검:')
  console.log('- API Key exists:', !!apiKey)
  console.log('- API Key length:', apiKey?.length || 0)
  console.log('- API Key starts with re_:', apiKey?.startsWith('re_') || false)
  
  if (!apiKey || apiKey.trim() === '') {
    console.error('❌ RESEND_API_KEY not found or empty')
    console.error('- process.env.RESEND_API_KEY:', process.env.RESEND_API_KEY)
    console.error('- All env keys:', Object.keys(process.env).filter(key => key.includes('RESEND')))
    return null
  }
  
  if (!resend) {
    try {
      console.log('🚀 Creating Resend instance with API key...')
      resend = new Resend(apiKey)
      console.log('✅ Resend instance created successfully')
      console.log('- Instance type:', typeof resend)
      console.log('- Instance methods:', Object.getOwnPropertyNames(Object.getPrototypeOf(resend)))
    } catch (error) {
      console.error('❌ Failed to create Resend instance:', error)
      console.error('- Error name:', (error as Error)?.name)
      console.error('- Error message:', (error as Error)?.message)
      return null
    }
  }
  
  return resend
}

interface QuoteEmailData {
  name: string
  phone: string
  address: string
  serviceType: 'direct' | 'partner'
  cleaningType: string
  additionalInfo?: string
  submittedAt: string
  quoteId: string
  customerEmail?: string
}

export async function sendQuoteNotificationEmail(data: QuoteEmailData): Promise<boolean> {
  try {
    console.log('📧 SIMPLE EMAIL START - Quote:', data.quoteId)
    
    const resendInstance = getResendInstance()
    if (!resendInstance) {
      console.error('❌ Resend instance failed')
      throw new Error('Resend 인스턴스 생성 실패')
    }
    
    console.log('✅ Resend instance ready, preparing email...')

    const serviceTypeText = data.serviceType === 'direct' ? '다해드리오 직접 청소' : '검증된 업체 연결'
    const submittedTime = new Date(data.submittedAt).toLocaleString('ko-KR', {
      timeZone: 'Asia/Seoul',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })

    const emailHtml = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <title>새로운 견적 요청</title>
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: linear-gradient(135deg, #1f2937, #374151); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
          .content { background: #f9fafb; padding: 20px; border: 1px solid #e5e7eb; }
          .footer { background: #1f2937; color: white; padding: 15px; border-radius: 0 0 8px 8px; text-align: center; }
          .info-row { margin: 10px 0; padding: 10px; background: white; border-radius: 6px; border-left: 4px solid #3b82f6; }
          .label { font-weight: bold; color: #374151; }
          .value { color: #1f2937; margin-top: 5px; }
          .urgent { background: #fef2f2; border-left-color: #ef4444; }
          .quote-id { background: #eff6ff; padding: 10px; border-radius: 6px; font-family: monospace; text-align: center; margin: 15px 0; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1 style="margin: 0; font-size: 24px;">🎯 새로운 견적 요청</h1>
            <p style="margin: 5px 0 0 0; opacity: 0.9;">다해드리오 관리자님, 새로운 견적 요청이 접수되었습니다.</p>
          </div>
          
          <div class="content">
            <div class="quote-id">
              <strong>요청번호: ${data.quoteId}</strong>
            </div>
            
            <div class="info-row urgent">
              <div class="label">⚡ 긴급 알림</div>
              <div class="value">30분 내 연락 약속 - 빠른 대응이 필요합니다!</div>
            </div>
            
            <div class="info-row">
              <div class="label">👤 고객명</div>
              <div class="value">${data.name}</div>
            </div>
            
            <div class="info-row">
              <div class="label">📞 연락처</div>
              <div class="value"><a href="tel:${data.phone}" style="color: #3b82f6; text-decoration: none;">${data.phone}</a></div>
            </div>
            
            <div class="info-row">
              <div class="label">📍 지역</div>
              <div class="value">${data.address}</div>
            </div>
            
            <div class="info-row">
              <div class="label">🏠 서비스 유형</div>
              <div class="value">${serviceTypeText}</div>
            </div>
            
            <div class="info-row">
              <div class="label">🧹 청소 유형</div>
              <div class="value">${data.cleaningType}</div>
            </div>
            
            ${data.additionalInfo ? `
            <div class="info-row">
              <div class="label">💬 요청 내용</div>
              <div class="value">${data.additionalInfo.replace(/\n/g, '<br>')}</div>
            </div>
            ` : ''}
            
            <div class="info-row">
              <div class="label">⏰ 접수 시간</div>
              <div class="value">${submittedTime}</div>
            </div>
          </div>
          
          <div class="footer">
            <p style="margin: 0;">
              <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3005'}/admin/quotes" 
                 style="color: #60a5fa; text-decoration: none;">
                📊 관리자 페이지에서 확인하기
              </a>
            </p>
            <p style="margin: 5px 0 0 0; font-size: 14px; opacity: 0.8;">
              다해드리오 | 믿을 수 있는 청소 서비스
            </p>
            <p style="margin: 5px 0 0 0; font-size: 12px; opacity: 0.7;">
              회신: dahaedeulio@gmail.com
            </p>
          </div>
        </div>
      </body>
      </html>
    `

    const emailText = `
[다해드리오] 새로운 견적 요청이 도착했습니다

요청번호: ${data.quoteId}

=== 고객 정보 ===
이름: ${data.name}
연락처: ${data.phone}
지역: ${data.address}

=== 서비스 정보 ===
서비스 유형: ${serviceTypeText}
청소 유형: ${data.cleaningType}

=== 요청 내용 ===
${data.additionalInfo || '특별한 요청사항 없음'}

=== 접수 정보 ===
접수 시간: ${submittedTime}

⚡ 30분 내 연락 약속 - 빠른 대응이 필요합니다!

관리자 페이지: ${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3005'}/admin/quotes

회신 주소: dahaedeulio@gmail.com
    `

    // Resend 무료 플랜 보안 규칙 100% 준수
    const result = await resendInstance.emails.send({
      from: 'DahaeDrio <onboarding@resend.dev>', // 발신자 완전 고정 (Resend 무료 플랜 필수)
      to: ['dahaedeulio@gmail.com'], // 수신자 완전 고정
      replyTo: data.customerEmail || 'dahaedeulio@gmail.com', // 고객 이메일을 회신 주소로 설정
      subject: '[다해드리오] 새로운 견적 요청',
      html: `
        <h2>새로운 견적 요청</h2>
        <p><strong>이름:</strong> ${data.name}</p>
        <p><strong>연락처:</strong> ${data.phone}</p>
        <p><strong>주소:</strong> ${data.address}</p>
        <p><strong>서비스:</strong> ${data.serviceType}</p>
        <p><strong>청소유형:</strong> ${data.cleaningType}</p>
        <p><strong>요청사항:</strong> ${data.additionalInfo || '없음'}</p>
        <p><strong>견적ID:</strong> ${data.quoteId}</p>
      `,
      text: `새로운 견적 요청\n이름: ${data.name}\n연락처: ${data.phone}\n주소: ${data.address}\n서비스: ${data.serviceType}\n청소유형: ${data.cleaningType}\n요청사항: ${data.additionalInfo || '없음'}\n견적ID: ${data.quoteId}`
    })

    console.log('✅ SIMPLE EMAIL SUCCESS:', result.data?.id)
    return true

  } catch (error: any) {
    // 디버깅 강화 - Resend 에러 전체 출력
    console.error('❌ RESEND ERROR FULL DETAILS:')
    console.error('- Error Object:', error)
    console.error('- Error Name:', error?.name)
    console.error('- Error Message:', error?.message)
    console.error('- Error Code:', error?.code)
    console.error('- Error Status:', error?.status)
    console.error('- Error Response:', error?.response)
    console.error('- Error Data:', error?.response?.data)
    console.error('- Full Error JSON:', JSON.stringify(error, null, 2))
    
    // 구체적인 에러 정보를 포함한 에러 객체 생성
    const detailedError = new Error(error?.message || 'Resend API 호출 실패')
    detailedError.name = error?.name || 'ResendError'
    ;(detailedError as any).code = error?.code || 'UNKNOWN'
    ;(detailedError as any).status = error?.status
    ;(detailedError as any).response = error?.response
    
    throw detailedError;
  }
}

export async function sendTestEmail(to: string): Promise<boolean> {
  try {
    const resendInstance = getResendInstance()
    if (!resendInstance) {
      console.error('❌ Test email - Resend instance failed')
      throw new Error('Resend 인스턴스 생성 실패')
    }

    // 단순한 테스트 이메일 발송
    const result = await resendInstance.emails.send({
      from: 'DahaeDrio <onboarding@resend.dev>', // 무조건 고정
      to: ['dahaedeulio@gmail.com'], // 무조건 고정
      subject: '[다해드리오] 테스트',
      html: `<h1>테스트 이메일</h1><p>시간: ${new Date().toLocaleString('ko-KR')}</p>`,
      text: `테스트 이메일\n시간: ${new Date().toLocaleString('ko-KR')}`
    })

    console.log('✅ TEST EMAIL SUCCESS:', result.data?.id)
    return true

  } catch (error: any) {
    // 디버깅 강화 - Resend 에러 전체 출력
    console.error('❌ TEST EMAIL RESEND ERROR FULL DETAILS:')
    console.error('- Error Object:', error)
    console.error('- Error Message:', error?.message)
    console.error('- Error Code:', error?.code)
    console.error('- Error Status:', error?.status)
    console.error('- Error Response:', error?.response)
    console.error('- Error Data:', error?.response?.data)
    console.error('- Full Error JSON:', JSON.stringify(error, null, 2))
    
    throw error;
  }
}
