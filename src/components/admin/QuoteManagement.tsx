'use client'

import { useState, useEffect, useMemo } from 'react'
import { 
  Search, Filter, Download, Copy, Eye, ChevronDown, 
  Calendar, User, Phone, MapPin, Briefcase, MessageSquare,
  CheckCircle, Clock, AlertCircle, XCircle, Pause, PhoneCall
} from 'lucide-react'

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

interface QuoteManagementProps {
  initialQuotes: QuoteData[]
}

export default function QuoteManagement({ initialQuotes }: QuoteManagementProps) {
  const [quotes, setQuotes] = useState<QuoteData[]>(initialQuotes)
  const [searchTerm, setSearchTerm] = useState('')
  const [serviceFilter, setServiceFilter] = useState<'all' | 'direct' | 'partner'>('all')
  const [statusFilter, setStatusFilter] = useState<'all' | 'new' | 'contacted' | 'in_progress' | 'completed' | 'cancelled'>('all')
  const [selectedQuote, setSelectedQuote] = useState<QuoteData | null>(null)
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null)
  const [newQuotesCount, setNewQuotesCount] = useState(0)

  // 새 요청 카운트 업데이트
  useEffect(() => {
    const newCount = quotes.filter(q => q.status === 'new').length
    setNewQuotesCount(newCount)
  }, [quotes])

  // 토스트 표시 함수
  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  // 복사 함수
  const copyToClipboard = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text)
      showToast(`${label}이(가) 복사되었습니다.`)
    } catch (error) {
      showToast('복사에 실패했습니다.', 'error')
    }
  }

  // 상태 업데이트 함수
  const updateStatus = async (quoteId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/quotes/${quoteId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      })

      if (response.ok) {
        const result = await response.json()
        setQuotes(prev => prev.map(quote => 
          quote.id === quoteId 
            ? { ...quote, status: newStatus as any, updatedAt: new Date().toISOString() }
            : quote
        ))
        showToast('상태가 업데이트되었습니다.')
      } else {
        showToast('상태 업데이트에 실패했습니다.', 'error')
      }
    } catch (error) {
      showToast('상태 업데이트 중 오류가 발생했습니다.', 'error')
    }
  }

  // CSV 다운로드 함수
  const downloadCSV = async () => {
    try {
      const response = await fetch('/api/quotes?format=csv')
      if (response.ok) {
        const blob = await response.blob()
        const url = window.URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = `quotes_${new Date().toISOString().split('T')[0]}.csv`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        window.URL.revokeObjectURL(url)
        showToast('CSV 파일이 다운로드되었습니다.')
      } else {
        showToast('CSV 다운로드에 실패했습니다.', 'error')
      }
    } catch (error) {
      showToast('CSV 다운로드 중 오류가 발생했습니다.', 'error')
    }
  }

  // CSV 생성 함수
  const generateCSV = (data: QuoteData[]): string => {
    const headers = ['접수시간', '이름', '연락처', '지역', '서비스', '청소유형', '요청내용', '상태']
    const csvRows = [
      headers.join(','),
      ...data.map(quote => [
        new Date(quote.createdAt).toLocaleString('ko-KR'),
        quote.contact.name,
        quote.contact.phone,
        `"${quote.location.address} ${quote.location.detailAddress || ''}".trim()`,
        quote.serviceType === 'direct' ? '직접청소' : '업체연결',
        quote.cleaningType,
        `"${(quote.additionalInfo || '').replace(/"/g, '""')}"`,
        getStatusText(quote.status)
      ].join(','))
    ]
    return csvRows.join('\n')
  }

  // 상태 우선순위 정의
  const getStatusPriority = (status: string): number => {
    const priorities = {
      pending: 1,      // 새요청 (최우선)
      contacted: 2,    // 연락완료
      in_progress: 3,  // 진행중
      completed: 4,    // 완료
      cancelled: 5     // 취소 (최하위)
    }
    return priorities[status as keyof typeof priorities] || 999
  }

  // 필터링 및 정렬된 견적 목록
  const getFilteredQuotes = (): QuoteData[] => {
    const filtered = quotes.filter(quote => {
      const matchesSearch = searchTerm === '' || 
        quote.contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        quote.contact.phone.includes(searchTerm) ||
        quote.location.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (quote.additionalInfo || '').toLowerCase().includes(searchTerm.toLowerCase())

      const matchesService = serviceFilter === 'all' || quote.serviceType === serviceFilter
      const matchesStatus = statusFilter === 'all' || quote.status === statusFilter

      return matchesSearch && matchesService && matchesStatus
    })

    // 상태 우선순위 + 최신순 정렬
    return filtered.sort((a, b) => {
      const priorityA = getStatusPriority(a.status)
      const priorityB = getStatusPriority(b.status)
      
      // 상태 우선순위가 다르면 우선순위로 정렬
      if (priorityA !== priorityB) {
        return priorityA - priorityB
      }
      
      // 같은 상태면 최신순 정렬
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    })
  }

  const filteredQuotes = useMemo(() => getFilteredQuotes(), [quotes, searchTerm, serviceFilter, statusFilter])

  // 상태 텍스트 변환
  const getStatusText = (status: string): string => {
    const statusMap: { [key: string]: string } = {
      pending: '새요청',
      contacted: '연락완료',
      in_progress: '진행중',
      completed: '완료',
      cancelled: '취소'
    }
    return statusMap[status] || '새요청'
  }

  // 상태 배지 컴포넌트 (운영 친화적 색상)
  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { text: '새요청', color: 'bg-red-100 text-red-800 border border-red-200', icon: Clock },
      contacted: { text: '연락완료', color: 'bg-blue-100 text-blue-800 border border-blue-200', icon: Phone },
      in_progress: { text: '진행중', color: 'bg-purple-100 text-purple-800 border border-purple-200', icon: AlertCircle },
      completed: { text: '완료', color: 'bg-green-100 text-green-800 border border-green-200', icon: CheckCircle },
      cancelled: { text: '취소', color: 'bg-gray-100 text-gray-800 border border-gray-200', icon: XCircle }
    }
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending
    const IconComponent = config.icon
    
    return (
      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${config.color}`}>
        <IconComponent className="h-3 w-3 mr-1" />
        {config.text}
      </span>
    )
  }

  // 요청내용 줄이기
  const truncateText = (text: string, maxLines: number = 2): string => {
    if (!text) return ''
    const words = text.split(' ')
    const maxWords = maxLines * 10 // 대략적인 계산
    if (words.length <= maxWords) return text
    return words.slice(0, maxWords).join(' ') + '...'
  }

  return (
    <div className="space-y-6">
      {/* 토스트 메시지 */}
      {toast && (
        <div className={`fixed top-4 right-4 z-50 px-4 py-2 rounded-lg shadow-lg ${
          toast.type === 'success' ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
        }`}>
          {toast.message}
        </div>
      )}

      {/* 새요청 알림 */}
      {newQuotesCount > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <AlertCircle className="h-5 w-5 text-red-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-red-800">
                새로운 견적 요청 {newQuotesCount}건이 있습니다! 빠른 연락을 부탁드립니다.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 검색 및 필터 */}
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex flex-col lg:flex-row gap-4">
          {/* 검색창 */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="이름, 연락처, 지역, 요청내용으로 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              />
            </div>
          </div>

          {/* 필터 */}
          <div className="flex gap-3">
            <select
              value={serviceFilter}
              onChange={(e) => setServiceFilter(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="all">전체 서비스</option>
              <option value="direct">직접청소</option>
              <option value="partner">업체연결</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="all">전체 상태</option>
              <option value="pending">새요청</option>
              <option value="contacted">연락완료</option>
              <option value="in_progress">진행중</option>
              <option value="completed">완료</option>
              <option value="cancelled">취소</option>
            </select>

            <button
              onClick={downloadCSV}
              className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Download className="h-4 w-4 mr-2" />
              CSV 다운로드
            </button>
          </div>
        </div>

        {/* 검색 결과 요약 */}
        <div className="mt-4 text-sm text-gray-600">
          총 {quotes.length}개 중 {filteredQuotes.length}개 표시
        </div>
      </div>

      {/* 테이블 */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        {filteredQuotes.length === 0 ? (
          <div className="text-center py-12">
            <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              {searchTerm || serviceFilter !== 'all' || statusFilter !== 'all' 
                ? '검색 결과가 없습니다' 
                : '아직 접수된 견적이 없습니다'
              }
            </h3>
            <p className="text-gray-500">
              {searchTerm || serviceFilter !== 'all' || statusFilter !== 'all' 
                ? '다른 검색어나 필터를 시도해보세요' 
                : '견적 요청이 들어오면 여기에 표시됩니다'
              }
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    접수시간
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    고객정보
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    지역
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    서비스
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    청소유형
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    요청내용
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    상태
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    액션
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredQuotes.map((quote) => (
                  <tr key={quote.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                        <div>
                          <div>{new Date(quote.createdAt).toLocaleDateString('ko-KR')}</div>
                          <div className="text-xs text-gray-500">
                            {new Date(quote.createdAt).toLocaleTimeString('ko-KR', { 
                              hour: '2-digit', 
                              minute: '2-digit' 
                            })}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex flex-col">
                        <div className="flex items-center text-sm font-medium text-gray-900">
                          <User className="h-4 w-4 text-gray-400 mr-2" />
                          {quote.contact.name}
                        </div>
                        <div className="flex items-center text-sm text-gray-500 mt-1">
                          <Phone className="h-4 w-4 text-gray-400 mr-2" />
                          <span className="mr-2">{quote.contact.phone}</span>
                          <div className="flex gap-1">
                            <button
                              onClick={() => copyToClipboard(quote.contact.phone, '연락처')}
                              className="text-primary-600 hover:text-primary-800 p-1 rounded hover:bg-primary-50"
                              title="연락처 복사"
                            >
                              <Copy className="h-3 w-3" />
                            </button>
                            <a
                              href={`tel:${quote.contact.phone}`}
                              className="text-green-600 hover:text-green-800 p-1 rounded hover:bg-green-50"
                              title="전화 걸기"
                            >
                              <PhoneCall className="h-3 w-3" />
                            </a>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-start text-sm text-gray-900">
                        <MapPin className="h-4 w-4 text-gray-400 mr-2 mt-0.5 flex-shrink-0" />
                        <div className="max-w-xs">
                          <div className="font-medium">{quote.location.address}</div>
                          {quote.location.detailAddress && (
                            <div className="text-gray-500 text-xs">{quote.location.detailAddress}</div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        quote.serviceType === 'direct' 
                          ? 'bg-blue-100 text-blue-800' 
                          : 'bg-green-100 text-green-800'
                      }`}>
                        <Briefcase className="h-3 w-3 mr-1" />
                        {quote.serviceType === 'direct' ? '직접청소' : '업체연결'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {quote.cleaningType}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 max-w-xs">
                      {quote.additionalInfo ? (
                        <div className="space-y-2">
                          <div className="line-clamp-2">
                            {truncateText(quote.additionalInfo, 2)}
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => {
                                setSelectedQuote(quote)
                                setShowDetailModal(true)
                              }}
                              className="text-primary-600 hover:text-primary-800 text-xs"
                            >
                              <Eye className="h-3 w-3 inline mr-1" />
                              보기
                            </button>
                            <button
                              onClick={() => copyToClipboard(quote.additionalInfo, '요청내용')}
                              className="text-primary-600 hover:text-primary-800 text-xs"
                            >
                              <Copy className="h-3 w-3 inline mr-1" />
                              복사
                            </button>
                          </div>
                        </div>
                      ) : (
                        <span className="text-gray-400 italic">요청사항 없음</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {getStatusBadge(quote.status)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={quote.status}
                        onChange={(e) => updateStatus(quote.id, e.target.value)}
                        className="text-sm border border-gray-300 rounded px-2 py-1 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      >
                        <option value="pending">새요청</option>
                        <option value="contacted">연락완료</option>
                        <option value="in_progress">진행중</option>
                        <option value="completed">완료</option>
                        <option value="cancelled">취소</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* 상세 모달 */}
      {showDetailModal && selectedQuote && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold text-gray-900">요청 상세 내용</h2>
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <XCircle className="h-6 w-6" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">고객명</label>
                    <p className="text-gray-900">{selectedQuote.contact.name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">연락처</label>
                    <div className="flex items-center gap-2">
                      <p className="text-gray-900">{selectedQuote.contact.phone}</p>
                      <button
                        onClick={() => copyToClipboard(selectedQuote.contact.phone, '연락처')}
                        className="text-primary-600 hover:text-primary-800"
                      >
                        <Copy className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">주소</label>
                  <p className="text-gray-900">
                    {selectedQuote.location.address} {selectedQuote.location.detailAddress}
                  </p>
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">서비스 유형</label>
                    <p className="text-gray-900">
                      {selectedQuote.serviceType === 'direct' ? '직접청소' : '업체연결'}
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">청소 유형</label>
                    <p className="text-gray-900">{selectedQuote.cleaningType}</p>
                  </div>
                </div>
                
                {selectedQuote.additionalInfo && (
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <label className="block text-sm font-medium text-gray-700">요청 내용</label>
                      <button
                        onClick={() => copyToClipboard(selectedQuote.additionalInfo, '요청내용')}
                        className="text-primary-600 hover:text-primary-800 text-sm"
                      >
                        <Copy className="h-4 w-4 inline mr-1" />
                        복사
                      </button>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <p className="text-gray-900 whitespace-pre-wrap">{selectedQuote.additionalInfo}</p>
                    </div>
                  </div>
                )}
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">접수 시간</label>
                  <p className="text-gray-900">
                    {new Date(selectedQuote.createdAt).toLocaleString('ko-KR')}
                  </p>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                >
                  닫기
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

