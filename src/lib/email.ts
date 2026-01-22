import { Resend } from 'resend'

// 환경변수 강제 체크 및 상세 로깅
function checkEnvironmentVariables(): { apiKey: string | null, adminEmail: string | null } {
  console.log('🔍 환경변수 강제 체크 시작...')
  
  // 모든 환경변수 키 확인
  const allEnvKeys = Object.keys(process.env)
  console.log('- 전체 환경변수 개수:', allEnvKeys.length)
  console.log('- RESEND 관련 키들:', allEnvKeys.filter(key => key.includes('RESEND')))
  console.log('- EMAIL 관련 키들:', allEnvKeys.filter(key => key.includes('EMAIL')))
  
  // RESEND_API_KEY 체크
  const apiKey = process.env.RESEND_API_KEY
  console.log('📧 RESEND_API_KEY 상세 분석:')
  console.log('- 존재 여부:', !!apiKey)
  console.log('- 타입:', typeof apiKey)
  console.log('- 길이:', apiKey?.length || 0)
  console.log('- 첫 3글자:', apiKey?.substring(0, 3) || 'N/A')
  console.log('- re_ 시작 여부:', apiKey?.startsWith('re_') || false)
  console.log('- 공백 포함 여부:', apiKey?.includes(' ') || false)
  
  // ADMIN_EMAIL 체크
  const adminEmail = process.env.ADMIN_EMAIL
  console.log('📧 ADMIN_EMAIL 상세 분석:')
  console.log('- 존재 여부:', !!adminEmail)
  console.log('- 타입:', typeof adminEmail)
  console.log('- 값:', adminEmail || 'N/A')
  
  // 비어있는 환경변수 목록
  const missingVars = []
  if (!apiKey || apiKey.trim() === '') missingVars.push('RESEND_API_KEY')
  if (!adminEmail || adminEmail.trim() === '') missingVars.push('ADMIN_EMAIL')
  
  if (missingVars.length > 0) {
    console.error('❌ 비어있는 환경변수들:', missingVars)
  } else {
    console.log('✅ 모든 필수 환경변수 확인됨')
  }
  
  return { apiKey, adminEmail }
}

// 단순화된 Resend 인스턴스 생성
function createResendInstance(apiKey: string): Resend | null {
  try {
    console.log('🚀 Resend 인스턴스 생성 중...')
    const resendInstance = new Resend(apiKey)
    console.log('✅ Resend 인스턴스 생성 성공')
    return resendInstance
  } catch (error: any) {
    console.error('❌ Resend 인스턴스 생성 실패:', error)
    console.error('- Error name:', error?.name)
    console.error('- Error message:', error?.message)
    return null
  }
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
    console.log('📧 견적 이메일 발송 시작 - Quote ID:', data.quoteId)
    
    // 환경변수 강제 체크
    const { apiKey, adminEmail } = checkEnvironmentVariables()
    
    if (!apiKey || apiKey.trim() === '') {
      const errorMsg = 'RESEND_API_KEY 환경변수가 비어있습니다.'
      console.error('❌', errorMsg)
      throw new Error(errorMsg)
    }
    
    // Resend 인스턴스 생성
    const resendInstance = createResendInstance(apiKey)
    if (!resendInstance) {
      const errorMsg = 'Resend 인스턴스 생성에 실패했습니다.'
      console.error('❌', errorMsg)
      throw new Error(errorMsg)
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

    // 발신자/수신자 강제 고정 및 이메일 발송
    console.log('📤 이메일 발송 설정:')
    console.log('- From (강제 고정): DahaeDrio <onboarding@resend.dev>')
    console.log('- To (강제 고정): dahaedeulio@gmail.com')
    console.log('- ReplyTo: 고객 이메일 또는 지점장 이메일')
    
    const result = await resendInstance.emails.send({
      from: 'DahaeDrio <onboarding@resend.dev>', // 발신자 강제 고정
      to: ['dahaedeulio@gmail.com'], // 수신자 강제 고정
      replyTo: data.customerEmail || 'dahaedeulio@gmail.com', // 회신 주소 설정
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

    console.log('✅ 이메일 발송 성공!')
    console.log('- Email ID:', result.data?.id)
    console.log('- Result:', result)
    return true

  } catch (error: any) {
    // 환경변수 재확인 및 상세 에러 로깅
    console.error('❌ 이메일 발송 실패 - 상세 분석:')
    
    // 환경변수 상태 재확인
    const { apiKey, adminEmail } = checkEnvironmentVariables()
    console.error('🔍 실패 시점 환경변수 상태:')
    console.error('- RESEND_API_KEY 존재:', !!apiKey)
    console.error('- ADMIN_EMAIL 존재:', !!adminEmail)
    
    // 에러 상세 정보
    console.error('📋 에러 상세 정보:')
    console.error('- Error Name:', error?.name || 'Unknown')
    console.error('- Error Message:', error?.message || 'No message')
    console.error('- Error Code:', error?.code || 'NO_CODE')
    console.error('- Error Status:', error?.status || 'NO_STATUS')
    console.error('- Error Type:', typeof error)
    console.error('- Full Error:', JSON.stringify(error, null, 2))
    
    // 구체적인 에러 정보를 포함한 에러 객체 생성
    const detailedError = new Error(error?.message || '이메일 발송 실패')
    detailedError.name = error?.name || 'EmailSendError'
    ;(detailedError as any).code = error?.code || 'UNKNOWN_ERROR'
    ;(detailedError as any).status = error?.status
    ;(detailedError as any).originalError = error
    
    throw detailedError;
  }
}

export async function sendTestEmail(to: string): Promise<boolean> {
  try {
    console.log('📧 테스트 이메일 발송 시작')
    
    // 환경변수 강제 체크
    const { apiKey, adminEmail } = checkEnvironmentVariables()
    
    if (!apiKey || apiKey.trim() === '') {
      const errorMsg = 'RESEND_API_KEY 환경변수가 비어있습니다.'
      console.error('❌', errorMsg)
      throw new Error(errorMsg)
    }
    
    // Resend 인스턴스 생성
    const resendInstance = createResendInstance(apiKey)
    if (!resendInstance) {
      const errorMsg = 'Resend 인스턴스 생성에 실패했습니다.'
      console.error('❌', errorMsg)
      throw new Error(errorMsg)
    }

    // 테스트 이메일 발송
    const result = await resendInstance.emails.send({
      from: 'DahaeDrio <onboarding@resend.dev>', // 발신자 강제 고정
      to: ['dahaedeulio@gmail.com'], // 수신자 강제 고정
      subject: '[다해드리오] 테스트 이메일',
      html: `<h1>테스트 이메일</h1><p>발송 시간: ${new Date().toLocaleString('ko-KR')}</p>`,
      text: `테스트 이메일\n발송 시간: ${new Date().toLocaleString('ko-KR')}`
    })

    console.log('✅ 테스트 이메일 발송 성공:', result.data?.id)
    return true

  } catch (error: any) {
    // 환경변수 재확인 및 상세 에러 로깅
    console.error('❌ 테스트 이메일 발송 실패 - 상세 분석:')
    
    // 환경변수 상태 재확인
    const { apiKey, adminEmail } = checkEnvironmentVariables()
    console.error('🔍 실패 시점 환경변수 상태:')
    console.error('- RESEND_API_KEY 존재:', !!apiKey)
    console.error('- ADMIN_EMAIL 존재:', !!adminEmail)
    
    // 에러 상세 정보
    console.error('📋 테스트 이메일 에러 상세:')
    console.error('- Error Name:', error?.name || 'Unknown')
    console.error('- Error Message:', error?.message || 'No message')
    console.error('- Error Code:', error?.code || 'NO_CODE')
    console.error('- Full Error:', JSON.stringify(error, null, 2))
    
    throw error;
  }
}
