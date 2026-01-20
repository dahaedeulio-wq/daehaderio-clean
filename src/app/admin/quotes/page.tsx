import fs from 'fs'
import path from 'path'
import Link from 'next/link'
import { ArrowLeft, ClipboardList, Calendar, User, Briefcase } from 'lucide-react'
import QuoteManagement from '@/components/admin/QuoteManagement'

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
  status: 'new' | 'contacted' | 'in_progress' | 'completed' | 'cancelled'
  createdAt: string
  submittedAt: string
  updatedAt?: string
}

// 상태 우선순위 정의
function getStatusPriority(status: string): number {
  const priorities = {
    new: 1,          // 새요청 (최우선)
    contacted: 2,    // 연락완료
    in_progress: 3,  // 진행중
    completed: 4,    // 완료
    cancelled: 5     // 취소 (최하위)
  }
  return priorities[status as keyof typeof priorities] || 999
}

async function getQuotes(): Promise<QuoteData[]> {
  try {
    const dataDir = path.join(process.cwd(), 'data')
    const quotesFile = path.join(dataDir, 'quotes.json')

    if (!fs.existsSync(quotesFile)) {
      return []
    }

    const fileContent = fs.readFileSync(quotesFile, 'utf8')
    const quotes = JSON.parse(fileContent) as QuoteData[]
    
    // 상태 우선순위 + 최신순 정렬
    return quotes.sort((a, b) => {
      const priorityA = getStatusPriority(a.status)
      const priorityB = getStatusPriority(b.status)
      
      // 상태 우선순위가 다르면 우선순위로 정렬
      if (priorityA !== priorityB) {
        return priorityA - priorityB
      }
      
      // 같은 상태면 최신순 정렬
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    })
  } catch (error) {
    console.error('Error reading quotes:', error)
    return []
  }
}

function getStatusStats(quotes: QuoteData[]) {
  return {
    total: quotes.length,
    new: quotes.filter(q => q.status === 'new').length,
    contacted: quotes.filter(q => q.status === 'contacted').length,
    inProgress: quotes.filter(q => q.status === 'in_progress').length,
    completed: quotes.filter(q => q.status === 'completed').length,
    cancelled: quotes.filter(q => q.status === 'cancelled').length,
    direct: quotes.filter(q => q.serviceType === 'direct').length,
    partner: quotes.filter(q => q.serviceType === 'partner').length,
  }
}

export default async function AdminQuotesPage() {
  const quotes = await getQuotes()
  const stats = getStatusStats(quotes)

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 헤더 */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">견적 요청 관리</h1>
              <p className="text-gray-600">접수된 견적 요청을 확인하고 관리할 수 있습니다.</p>
            </div>
            <Link
              href="/"
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              메인으로
            </Link>
          </div>
        </div>

        {/* 통계 대시보드 */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
          {/* 전체 견적 */}
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <ClipboardList className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-3">
                <p className="text-xs font-medium text-gray-500 uppercase">전체</p>
                <p className="text-xl font-bold text-gray-900">{stats.total}</p>
              </div>
            </div>
          </div>
          
          {/* 새요청 */}
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Calendar className="h-6 w-6 text-yellow-600" />
              </div>
              <div className="ml-3">
                <p className="text-xs font-medium text-gray-500 uppercase">새요청</p>
                <p className="text-xl font-bold text-gray-900">{stats.new}</p>
              </div>
            </div>
          </div>
          
          {/* 진행중 */}
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <User className="h-6 w-6 text-purple-600" />
              </div>
              <div className="ml-3">
                <p className="text-xs font-medium text-gray-500 uppercase">진행중</p>
                <p className="text-xl font-bold text-gray-900">{stats.contacted + stats.inProgress}</p>
              </div>
            </div>
          </div>
          
          {/* 완료 */}
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Briefcase className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-3">
                <p className="text-xs font-medium text-gray-500 uppercase">완료</p>
                <p className="text-xl font-bold text-gray-900">{stats.completed}</p>
              </div>
            </div>
          </div>
          
          {/* 직접청소 */}
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <Briefcase className="h-6 w-6 text-blue-600" />
              </div>
              <div className="ml-3">
                <p className="text-xs font-medium text-gray-500 uppercase">직접청소</p>
                <p className="text-xl font-bold text-gray-900">{stats.direct}</p>
              </div>
            </div>
          </div>
          
          {/* 업체연결 */}
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <User className="h-6 w-6 text-green-600" />
              </div>
              <div className="ml-3">
                <p className="text-xs font-medium text-gray-500 uppercase">업체연결</p>
                <p className="text-xl font-bold text-gray-900">{stats.partner}</p>
              </div>
            </div>
          </div>
        </div>

        {/* 견적 관리 컴포넌트 */}
        <QuoteManagement initialQuotes={quotes} />

        {/* 하단 정보 */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>데이터는 data/quotes.json 파일에 저장됩니다.</p>
          <p className="mt-1">상태 변경 시 실시간으로 파일에 반영됩니다.</p>
        </div>
      </div>
    </div>
  )
}