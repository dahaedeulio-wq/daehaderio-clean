import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

interface QuoteData {
  id: string
  serviceType: 'direct' | 'partner'
  cleaningType: string
  location: {
    address: string
    detailAddress: string
    floor: string
  }
  space: {
    type: string
    size: string
    rooms: string
  }
  schedule: {
    preferredDate: string
    preferredTime: string
    urgency: string
  }
  contact: {
    name: string
    phone: string
    email: string
  }
  additionalInfo: string
  status: 'pending' | 'contacted' | 'in_progress' | 'completed' | 'cancelled'
  createdAt: string
  submittedAt: string
  updatedAt?: string
}

// 상태 업데이트 API
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { status } = await request.json()
    const quoteId = params.id

    if (!status || !['pending', 'contacted', 'in_progress', 'completed', 'cancelled'].includes(status)) {
      return NextResponse.json(
        { error: '유효하지 않은 상태값입니다.' },
        { status: 400 }
      )
    }

    const dataDir = path.join(process.cwd(), 'data')
    const quotesFile = path.join(dataDir, 'quotes.json')

    if (!fs.existsSync(quotesFile)) {
      return NextResponse.json(
        { error: '견적 데이터를 찾을 수 없습니다.' },
        { status: 404 }
      )
    }

    // 기존 데이터 읽기
    const fileContent = fs.readFileSync(quotesFile, 'utf8')
    const quotes: QuoteData[] = JSON.parse(fileContent)

    // 해당 견적 찾기
    const quoteIndex = quotes.findIndex(quote => quote.id === quoteId)
    if (quoteIndex === -1) {
      return NextResponse.json(
        { error: '해당 견적을 찾을 수 없습니다.' },
        { status: 404 }
      )
    }

    // 상태 업데이트
    quotes[quoteIndex].status = status
    quotes[quoteIndex].updatedAt = new Date().toISOString()

    // 파일에 저장
    fs.writeFileSync(quotesFile, JSON.stringify(quotes, null, 2))

    return NextResponse.json({
      success: true,
      message: '상태가 성공적으로 업데이트되었습니다.',
      quote: quotes[quoteIndex]
    })

  } catch (error) {
    console.error('Status update error:', error)
    return NextResponse.json(
      { error: '상태 업데이트 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}

// 개별 견적 조회 API
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const quoteId = params.id
    const dataDir = path.join(process.cwd(), 'data')
    const quotesFile = path.join(dataDir, 'quotes.json')

    if (!fs.existsSync(quotesFile)) {
      return NextResponse.json(
        { error: '견적 데이터를 찾을 수 없습니다.' },
        { status: 404 }
      )
    }

    const fileContent = fs.readFileSync(quotesFile, 'utf8')
    const quotes: QuoteData[] = JSON.parse(fileContent)
    const quote = quotes.find(q => q.id === quoteId)

    if (!quote) {
      return NextResponse.json(
        { error: '해당 견적을 찾을 수 없습니다.' },
        { status: 404 }
      )
    }

    return NextResponse.json({ quote })

  } catch (error) {
    console.error('Quote fetch error:', error)
    return NextResponse.json(
      { error: '견적 조회 중 오류가 발생했습니다.' },
      { status: 500 }
    )
  }
}

