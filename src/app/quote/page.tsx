'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { CheckCircle, Phone, Mail, Clock, User, MapPin, MessageSquare, ExternalLink, ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface FormData {
  serviceType: 'direct' | 'partner' | ''
  cleaningType: string
  contact: {
    name: string
    phone: string
  }
  location: {
    address: string
  }
  additionalInfo: string
}

export default function QuotePage() {
  const searchParams = useSearchParams()
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [submittedQuoteId, setSubmittedQuoteId] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string>('')
  const [formData, setFormData] = useState<FormData>({
    serviceType: '',
    cleaningType: '',
    contact: {
      name: '',
      phone: ''
    },
    location: {
      address: ''
    },
    additionalInfo: ''
  })

  useEffect(() => {
    const service = searchParams.get('service')
    const type = searchParams.get('type')
    
    if (service) {
      setFormData(prev => ({
        ...prev,
        serviceType: service as 'direct' | 'partner',
        cleaningType: type || ''
      }))
    }
  }, [searchParams])

  const handleInputChange = (field: string, value: string) => {
    if (field === 'name' || field === 'phone') {
      setFormData(prev => ({
        ...prev,
        contact: {
          ...prev.contact,
          [field]: value
        }
      }))
    } else if (field === 'address') {
      setFormData(prev => ({
        ...prev,
        location: {
          address: value
        }
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')
    
    // 클라이언트 사이드 검증
    if (!formData.serviceType || !formData.cleaningType || !formData.contact.name || !formData.contact.phone || !formData.location.address) {
      setError('모든 필수 항목을 입력해주세요.')
      setIsLoading(false)
      return
    }
    
    try {
      const response = await fetch('/api/quotes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          submittedAt: new Date().toISOString()
        }),
      })

      const result = await response.json()

      if (result.ok) {
        setSubmittedQuoteId(result.id || '')
        setIsSubmitted(true)
        // 폼 초기화
        setFormData({
          serviceType: '',
          cleaningType: '',
          contact: { name: '', phone: '' },
          location: { address: '' },
          additionalInfo: ''
        })
      } else {
        // Resend 실제 에러 메시지를 빨간색으로 표시
        const errorMsg = result.message || result.emailError || '견적 요청 처리 중 문제가 발생했습니다.'
        setError(`🚨 RESEND 에러: ${errorMsg}`)
      }
    } catch (error) {
      console.error('Error submitting quote:', error)
      console.error('Error details:', {
        message: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? error.stack : 'No stack trace'
      })
      setError('네트워크 연결에 문제가 있습니다. 인터넷 연결을 확인하고 다시 시도해주세요.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      {/* 제출 완료 모달 */}
      {isSubmitted && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                접수 완료!
              </h2>
              <p className="text-gray-600 mb-6">
                관리자가 곧 연락드리겠습니다.
                {submittedQuoteId && (
                  <span className="block mt-2 text-sm text-gray-500">
                    요청번호: {submittedQuoteId}
                  </span>
                )}
              </p>
              <div className="space-y-3">
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="w-full bg-gray-900 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-800 transition-colors"
                >
                  확인
                </button>
                <Link
                  href="/admin/quotes"
                  className="w-full border-2 border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors inline-flex items-center justify-center"
                  onClick={() => setIsSubmitted(false)}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  관리자 페이지에서 확인하기
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="bg-gray-50 min-h-screen py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* 헤더 */}
          <div className="text-center mb-12">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              ⚡ 3분 견적 요청
            </h1>
            <p className="text-lg text-gray-600">
              간단한 정보만 입력하시면 빠르게 견적을 받아보실 수 있습니다
            </p>
          </div>

          {/* 폼 */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            {/* 에러 메시지 */}
            {error && (
              <div className="mb-6 p-4 bg-red-100 border-2 border-red-500 rounded-lg">
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <svg className="h-6 w-6 text-red-600" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-base text-red-900 font-bold">{error}</p>
                  </div>
                  <div className="ml-auto">
                    <button
                      type="button"
                      onClick={() => setError('')}
                      className="text-red-400 hover:text-red-600"
                    >
                      <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* 서비스 선택 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  어떤 서비스를 원하시나요? <span className="text-red-500">*</span>
                </label>
                <div className="grid md:grid-cols-2 gap-4">
                  <div 
                    className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                      formData.serviceType === 'direct' 
                        ? 'border-gray-900 bg-gray-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => handleInputChange('serviceType', 'direct')}
                  >
                    <div className="flex items-center mb-2">
                      <input
                        type="radio"
                        name="serviceType"
                        value="direct"
                        checked={formData.serviceType === 'direct'}
                        onChange={(e) => handleInputChange('serviceType', e.target.value)}
                        className="mr-3"
                        required
                      />
                      <h3 className="font-semibold text-gray-900">다해드리오 직접 청소</h3>
                    </div>
                    <p className="text-sm text-gray-600">전문 직원이 직접 방문</p>
                  </div>

                  <div 
                    className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                      formData.serviceType === 'partner' 
                        ? 'border-gray-900 bg-gray-50' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => handleInputChange('serviceType', 'partner')}
                  >
                    <div className="flex items-center mb-2">
                      <input
                        type="radio"
                        name="serviceType"
                        value="partner"
                        checked={formData.serviceType === 'partner'}
                        onChange={(e) => handleInputChange('serviceType', e.target.value)}
                        className="mr-3"
                        required
                      />
                      <h3 className="font-semibold text-gray-900">검증된 업체 연결</h3>
                    </div>
                    <p className="text-sm text-gray-600">엄선된 파트너 업체 매칭</p>
                  </div>
                </div>
              </div>

              {/* 청소 유형 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  청소 유형 <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.cleaningType}
                  onChange={(e) => handleInputChange('cleaningType', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
                  required
                >
                  <option value="">청소 유형을 선택해주세요</option>
                  <option value="일반 가정 청소">일반 가정 청소</option>
                  <option value="입주/이사 청소">입주/이사 청소</option>
                  <option value="사무실 청소">사무실 청소</option>
                  <option value="상가 청소">상가 청소</option>
                  <option value="기타">기타</option>
                </select>
              </div>

              {/* 이름 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  이름 <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={formData.contact.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="오다윗"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
                    required
                  />
                </div>
              </div>

              {/* 연락처 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  연락처 <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="tel"
                    value={formData.contact.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    placeholder="010-1234-5678"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
                    required
                  />
                </div>
              </div>

              {/* 지역 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  지역 <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    value={formData.location.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    placeholder="서울시 강남구"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
                    required
                  />
                </div>
              </div>

              {/* 요청내용 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  요청내용
                </label>
                <div className="relative">
                  <MessageSquare className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <textarea
                    value={formData.additionalInfo}
                    onChange={(e) => handleInputChange('additionalInfo', e.target.value)}
                    placeholder="청소 범위, 특별 요청사항 등을 간단히 적어주세요"
                    rows={4}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-gray-500"
                  />
                </div>
              </div>

              {/* 제출 버튼 */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-gray-900 text-white py-4 px-6 rounded-lg text-lg font-semibold hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed inline-flex items-center justify-center"
                >
                  {isLoading ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                      접수 중...
                    </>
                  ) : (
                    <>
                      ⚡ 견적 요청하기
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </>
                  )}
                </button>
              </div>
            </form>

            {/* 신뢰성 문구 */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <div className="space-y-3 text-center">
                <div className="flex items-center justify-center text-green-600">
                  <Clock className="h-5 w-5 mr-2" />
                  <span className="font-semibold">접수 후 30분 내 연락드립니다</span>
                </div>
                <div className="flex items-center justify-center text-gray-600">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  <span className="text-sm">개인정보는 견적 안내 목적 외 사용하지 않습니다</span>
                </div>
              </div>
            </div>
          </div>

          {/* 연락처 정보 */}
          <div className="mt-8 bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-bold text-gray-900 mb-4 text-center">
              급하시다면 바로 전화주세요
            </h3>
            <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-8">
              <div className="flex items-center">
                <Phone className="h-5 w-5 text-gray-600 mr-2" />
                <span className="text-lg font-semibold text-gray-900">010-6445-5367</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-5 w-5 text-gray-600 mr-2" />
                <span className="text-gray-600">평일 09:00 - 18:00</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}