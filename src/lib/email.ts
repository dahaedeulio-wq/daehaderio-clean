import { Resend } from 'resend'

// Resend 인스턴스를 지연 생성하여 환경변수 없을 때 에러 방지
let resend: Resend | null = null

function getResendInstance(): Resend | null {
  if (!process.env.RESEND_API_KEY) {
    console.warn('⚠️ RESEND_API_KEY not found, email functionality disabled')
    return null
  }
  
  if (!resend) {
    try {
      resend = new Resend(process.env.RESEND_API_KEY)
      console.log('✅ Resend instance created successfully')
    } catch (error) {
      console.error('❌ Failed to create Resend instance:', error)
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
}

export async function sendQuoteNotificationEmail(data: QuoteEmailData): Promise<boolean> {
  try {
    console.log('📧 Starting email notification process...')
    
    const adminEmail = process.env.ADMIN_EMAIL || 'dahaedeulio@gmail.com'
    console.log('📧 Admin email:', adminEmail)
    console.log('📧 From address: onboarding@resend.dev (Resend 무료 플랜)')
    console.log('📧 Reply-to address: dahaedeulio@gmail.com')
    
    if (!adminEmail) {
      console.error('❌ ADMIN_EMAIL environment variable is not set')
      return false
    }

    const resendInstance = getResendInstance()
    if (!resendInstance) {
      console.error('❌ Resend instance not available')
      return false
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

    const result = await resendInstance.emails.send({
      from: 'onboarding@resend.dev',
      to: [adminEmail],
      reply_to: 'dahaedeulio@gmail.com',
      subject: '[다해드리오] 새로운 견적 요청이 도착했습니다',
      html: emailHtml,
      text: emailText,
    })

    console.log('Email sent successfully:', result.data?.id)
    return true

  } catch (error) {
    console.error('Failed to send email notification:', error)
    return false
  }
}

export async function sendTestEmail(to: string): Promise<boolean> {
  try {
    const resendInstance = getResendInstance()
    if (!resendInstance) {
      console.error('❌ Resend instance not available for test email')
      return false
    }

    const result = await resendInstance.emails.send({
      from: 'onboarding@resend.dev',
      to: [to],
      reply_to: 'dahaedeulio@gmail.com',
      subject: '[다해드리오] 이메일 테스트',
      html: `
        <h1>이메일 설정 테스트</h1>
        <p>다해드리오 이메일 알림 시스템이 정상적으로 작동합니다.</p>
        <p>테스트 시간: ${new Date().toLocaleString('ko-KR')}</p>
        <p><strong>회신 주소:</strong> dahaedeulio@gmail.com</p>
      `,
      text: `이메일 설정 테스트\n\n다해드리오 이메일 알림 시스템이 정상적으로 작동합니다.\n테스트 시간: ${new Date().toLocaleString('ko-KR')}\n\n회신 주소: dahaedeulio@gmail.com`
    })

    console.log('Test email sent successfully:', result.data?.id)
    return true

  } catch (error) {
    console.error('Failed to send test email:', error)
    return false
  }
}
