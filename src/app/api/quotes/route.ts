import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import { sendQuoteNotificationEmail } from '@/lib/email'

interface QuoteRequest {
  serviceType: 'direct' | 'partner'
  cleaningType: string
  location: {
    address: string
    detailAddress?: string
    floor?: string
  }
  space?: {
    type: string
    size: string
    rooms: string
  }
  schedule?: {
    preferredDate: string
    preferredTime: string
    urgency: string
  }
  contact: {
    name: string
    phone: string
    email?: string
  }
  additionalInfo: string
  submittedAt: string
}

export async function POST(request: NextRequest) {
  let quoteId: string | null = null
  
  try {
    // 요청 데이터 파싱 with 안전 처리
    let data: QuoteRequest
    try {
      data = await request.json()
    } catch (jsonError) {
      console.error('❌ JSON parsing error:', jsonError)
      return NextResponse.json(
        { 
          ok: false,
          message: '요청 데이터 형식이 올바르지 않습니다. 페이지를 새로고침 후 다시 시도해주세요.'
        },
        { status: 400 }
      )
    }
    
    // 데이터 구조 안전성 검증 및 기본값 설정
    const safeData = {
      serviceType: data.serviceType || '',
      cleaningType: data.cleaningType || '',
      contact: {
        name: data.contact?.name || '',
        phone: data.contact?.phone || '',
        email: data.contact?.email || ''
      },
      location: {
        address: data.location?.address || '',
        detailAddress: data.location?.detailAddress || '',
        floor: data.location?.floor || ''
      },
      space: data.space || { type: '', size: '', rooms: '' },
      schedule: data.schedule || { preferredDate: '', preferredTime: '', urgency: '' },
      additionalInfo: data.additionalInfo || '',
      submittedAt: data.submittedAt || new Date().toISOString()
    }
    
    // 필수 데이터 검증
    if (!safeData.serviceType || !safeData.cleaningType || !safeData.contact.name || !safeData.contact.phone) {
      return NextResponse.json(
        { 
          ok: false,
          message: '필수 정보가 누락되었습니다. 이름, 연락처, 서비스 유형, 청소 유형을 모두 입력해주세요.'
        },
        { status: 400 }
      )
    }

    // 연락처 형식 검증 (안전 처리)
    try {
      const phoneRegex = /^[0-9-+\s()]{8,20}$/
      const cleanPhone = safeData.contact.phone.replace(/\s/g, '')
      if (!phoneRegex.test(cleanPhone)) {
        return NextResponse.json(
          { 
            ok: false,
            message: '올바른 연락처 형식을 입력해주세요.'
          },
          { status: 400 }
        )
      }
    } catch (phoneError) {
      console.error('❌ Phone validation error:', phoneError)
      return NextResponse.json(
        { 
          ok: false,
          message: '연락처 검증 중 오류가 발생했습니다.'
        },
        { status: 400 }
      )
    }

    // 견적 요청 ID 생성 (안전 처리)
    try {
      quoteId = `QUOTE_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    } catch (idError) {
      console.error('❌ Quote ID generation error:', idError)
      quoteId = `QUOTE_${Date.now()}_fallback`
    }
    
    // 견적 요청 데이터 구성
    const quoteData = {
      id: quoteId,
      serviceType: safeData.serviceType,
      cleaningType: safeData.cleaningType,
      contact: safeData.contact,
      location: safeData.location,
      space: safeData.space,
      schedule: safeData.schedule,
      additionalInfo: safeData.additionalInfo,
      status: 'new', // new, contacted, in_progress, completed, cancelled
      createdAt: new Date().toISOString(),
      submittedAt: safeData.submittedAt
    }

    // === 견적 저장 (무조건 성공하도록 방어 코드) ===
    const dataDir = path.join(process.cwd(), 'data')
    const quotesFile = path.join(dataDir, 'quotes.json')

    try {
      // data 디렉토리 생성 (안전 처리)
      try {
        if (!fs.existsSync(dataDir)) {
          fs.mkdirSync(dataDir, { recursive: true })
          console.log(`📁 Created data directory: ${dataDir}`)
        }
      } catch (dirError) {
        console.error('❌ Failed to create data directory:', dirError)
        throw new Error('데이터 디렉토리 생성 실패')
      }

      // 기존 견적 데이터 읽기 (안전 처리)
      let quotes: any[] = []
      if (fs.existsSync(quotesFile)) {
        try {
          const fileContent = fs.readFileSync(quotesFile, 'utf8')
          quotes = JSON.parse(fileContent)
          
          // 배열이 아닌 경우 빈 배열로 초기화
          if (!Array.isArray(quotes)) {
            console.warn('⚠️ Invalid quotes data format, initializing as empty array')
            quotes = []
          }
        } catch (parseError) {
          console.error('❌ Failed to parse existing quotes, starting with empty array:', parseError)
          quotes = []
        }
      }

      // 새 견적 추가
      quotes.push(quoteData)

      // 파일 저장 (안전 처리)
      try {
        fs.writeFileSync(quotesFile, JSON.stringify(quotes, null, 2), 'utf8')
        console.log(`✅ Quote saved successfully: ${quoteId}`)
      } catch (writeError) {
        console.error('❌ Failed to write quotes file:', writeError)
        throw new Error('견적 데이터 저장 실패')
      }
      
    } catch (saveError) {
      console.error('❌ Quote save process failed:', saveError)
      return NextResponse.json(
        { 
          ok: false,
          message: '견적 요청 저장 중 문제가 발생했습니다. 잠시 후 다시 시도해주세요.'
        },
        { status: 500 }
      )
    }

    // === 이메일 알림 전송 (완전 분리, 실패해도 API는 성공) ===
    const hasEmailConfig = process.env.RESEND_API_KEY && process.env.ADMIN_EMAIL
    
    if (hasEmailConfig) {
      // 이메일 전송을 별도 함수로 분리하여 안전 처리
      setImmediate(async () => {
        try {
          await sendQuoteNotificationEmail({
            name: safeData.contact.name,
            phone: safeData.contact.phone,
            address: safeData.location.address || '주소 미입력',
            serviceType: safeData.serviceType as 'direct' | 'partner',
            cleaningType: safeData.cleaningType,
            additionalInfo: safeData.additionalInfo,
            submittedAt: quoteData.submittedAt,
            quoteId: quoteId!
          })
          console.log(`✅ Email notification sent successfully for quote: ${quoteId}`)
        } catch (emailError) {
          console.error(`❌ Email notification failed for quote: ${quoteId}`, emailError)
          // 이메일 실패는 로그만 남기고 API 응답에는 영향 없음
        }
      })
    } else {
      console.warn(`⚠️ Email notification skipped for quote ${quoteId}: Missing RESEND_API_KEY or ADMIN_EMAIL`)
    }

    // 성공 응답 (이메일과 무관하게 항상 성공)
    return NextResponse.json({
      ok: true,
      message: '견적 요청이 성공적으로 접수되었습니다. 곧 연락드리겠습니다.',
      id: quoteId
    }, { status: 201 })

  } catch (error) {
    console.error('❌ Unexpected error in POST /api/quotes:', error)
    
    return NextResponse.json(
      { 
        ok: false,
        message: '견적 요청 처리 중 일시적인 문제가 발생했습니다. 잠시 후 다시 시도해주세요.'
      },
      { status: 500 }
    )
  }
}

// 견적 요청 목록 조회 (관리자용)
export async function GET(request: NextRequest) {
  try {
    let searchParams
    let format = null
    
    // URL 파싱 안전 처리
    try {
      searchParams = new URL(request.url).searchParams
      format = searchParams.get('format')
    } catch (urlError) {
      console.error('❌ URL parsing error:', urlError)
      format = null
    }
    
    const dataDir = path.join(process.cwd(), 'data')
    const quotesFile = path.join(dataDir, 'quotes.json')

    // 파일 존재 확인
    if (!fs.existsSync(quotesFile)) {
      console.log('📄 Quotes file does not exist, returning empty data')
      
      if (format === 'csv') {
        return new NextResponse('접수시간,이름,연락처,지역,서비스,청소유형,요청내용,상태\n', {
          headers: {
            'Content-Type': 'text/csv; charset=utf-8',
            'Content-Disposition': 'attachment; filename="quotes_empty.csv"'
          }
        })
      }
      return NextResponse.json({ 
        ok: true,
        quotes: [] 
      })
    }

    // 파일 읽기 및 JSON 파싱 안전 처리
    let quotes: any[] = []
    try {
      const fileContent = fs.readFileSync(quotesFile, 'utf8')
      quotes = JSON.parse(fileContent)
      
      // 배열이 아닌 경우 빈 배열로 처리
      if (!Array.isArray(quotes)) {
        console.warn('⚠️ Invalid quotes data format in GET, using empty array')
        quotes = []
      }
    } catch (readError) {
      console.error('❌ Failed to read/parse quotes file:', readError)
      quotes = []
    }

    // CSV 형식으로 내보내기
    if (format === 'csv') {
      try {
        const csvHeader = '접수시간,이름,연락처,지역,서비스,청소유형,요청내용,상태\n'
        const csvRows = quotes.map((quote: any) => {
          try {
            const serviceType = quote.serviceType === 'direct' ? '직접청소' : '업체연결'
            const status = getStatusText(quote.status || 'new')
            const address = quote.location?.address || '주소없음'
            const detailAddress = quote.location?.detailAddress || ''
            const region = `"${address} ${detailAddress}".trim()`
            const additionalInfo = `"${(quote.additionalInfo || '').replace(/"/g, '""')}"`
            const createdAt = quote.createdAt ? new Date(quote.createdAt).toLocaleString('ko-KR') : '날짜없음'
            
            return [
              createdAt,
              quote.contact?.name || '이름없음',
              quote.contact?.phone || '연락처없음',
              region,
              serviceType,
              quote.cleaningType || '유형없음',
              additionalInfo,
              status
            ].join(',')
          } catch (rowError) {
            console.error('❌ Error processing CSV row:', rowError)
            return '오류,오류,오류,오류,오류,오류,오류,오류'
          }
        }).join('\n')

        const csvContent = csvHeader + csvRows
        
        return new NextResponse(csvContent, {
          headers: {
            'Content-Type': 'text/csv; charset=utf-8',
            'Content-Disposition': `attachment; filename="quotes_${new Date().toISOString().split('T')[0]}.csv"`
          }
        })
      } catch (csvError) {
        console.error('❌ CSV generation error:', csvError)
        return NextResponse.json(
          { 
            ok: false,
            message: 'CSV 생성 중 오류가 발생했습니다.' 
          },
          { status: 500 }
        )
      }
    }

    // JSON 응답
    return NextResponse.json({ 
      ok: true,
      quotes: quotes
    })
    
  } catch (error) {
    console.error('❌ Unexpected error in GET /api/quotes:', error)
    return NextResponse.json(
      { 
        ok: false,
        message: '견적 요청 조회 중 오류가 발생했습니다.' 
      },
      { status: 500 }
    )
  }
}

function getStatusText(status: string): string {
  const statusMap: { [key: string]: string } = {
    new: '새요청',
    contacted: '연락완료',
    in_progress: '진행중',
    completed: '완료',
    cancelled: '취소'
  }
  return statusMap[status] || '새요청'
}
