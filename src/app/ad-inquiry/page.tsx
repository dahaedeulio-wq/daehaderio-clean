import Link from 'next/link'
import { ArrowLeft, MessageCircle, Users, TrendingUp, Star, CheckCircle, Mail, Phone } from 'lucide-react'

export default function AdInquiryPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 헤더 */}
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center text-gray-600 hover:text-accent-600 transition-colors mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            메인으로 돌아가기
          </Link>
          <h1 className="text-3xl lg:text-4xl font-bold text-brand-900 mb-4">
            🎯 광고 문의
          </h1>
          <p className="text-lg text-brand-600">
            다해드리오와 함께 더 많은 고객을 만나보세요
          </p>
        </div>

        {/* 메인 컨텐츠 */}
        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* 왼쪽: 광고 혜택 */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-accent-100 rounded-full flex items-center justify-center mr-4">
                <TrendingUp className="h-6 w-6 text-accent-600" />
              </div>
              <h2 className="text-2xl font-bold text-brand-900">
                광고 효과
              </h2>
            </div>

            <div className="space-y-4">
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-brand-800">높은 전환율</div>
                  <div className="text-sm text-brand-600">청소 서비스를 찾는 타겟 고객층에게 직접 노출</div>
                </div>
              </div>
              
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-brand-800">지역 맞춤 광고</div>
                  <div className="text-sm text-brand-600">서울, 경기 등 원하는 지역별 타겟팅 가능</div>
                </div>
              </div>
              
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-brand-800">합리적인 비용</div>
                  <div className="text-sm text-brand-600">클릭당 과금(CPC) 또는 노출당 과금(CPM) 선택</div>
                </div>
              </div>
              
              <div className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-500 mt-1 mr-3 flex-shrink-0" />
                <div>
                  <div className="font-semibold text-brand-800">실시간 성과 분석</div>
                  <div className="text-sm text-brand-600">광고 효과를 실시간으로 확인하고 최적화</div>
                </div>
              </div>
            </div>
          </div>

          {/* 오른쪽: 광고 위치 */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center mb-6">
              <div className="w-12 h-12 bg-brand-100 rounded-full flex items-center justify-center mr-4">
                <Users className="h-6 w-6 text-brand-600" />
              </div>
              <h2 className="text-2xl font-bold text-brand-900">
                광고 위치
              </h2>
            </div>

            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="font-semibold text-brand-800 mb-2">메인 페이지 배너</div>
                <div className="text-sm text-brand-600">
                  첫 화면 히어로 섹션 상단 또는 하단 배너 영역
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="font-semibold text-brand-800 mb-2">견적 페이지 사이드바</div>
                <div className="text-sm text-brand-600">
                  견적 요청 폼 옆 사이드바 광고 영역
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="font-semibold text-brand-800 mb-2">검색 결과 상단</div>
                <div className="text-sm text-brand-600">
                  업체 검색 결과 리스트 최상단 프리미엄 영역
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <div className="font-semibold text-brand-800 mb-2">플로팅 배너</div>
                <div className="text-sm text-brand-600">
                  화면 양쪽에 고정되는 플로팅 광고 (현재 위치)
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 통계 섹션 */}
        <div className="bg-gradient-to-r from-accent-600 to-accent-700 rounded-2xl shadow-xl p-8 mb-12 text-white">
          <h2 className="text-2xl font-bold mb-8 text-center">다해드리오 플랫폼 현황</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">1,200+</div>
              <div className="text-accent-100">월 방문자 수</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">350+</div>
              <div className="text-accent-100">월 견적 요청</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">95%</div>
              <div className="text-accent-100">고객 만족도</div>
            </div>
          </div>
        </div>

        {/* 문의 방법 */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-accent-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="h-8 w-8 text-accent-600" />
            </div>
            <h2 className="text-2xl font-bold text-brand-900 mb-2">
              광고 문의하기
            </h2>
            <p className="text-brand-600">
              아래 연락처로 문의주시면 맞춤형 광고 제안서를 보내드립니다
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <a
              href="mailto:dahaedeulio@gmail.com"
              className="flex items-center justify-center p-6 border-2 border-accent-200 rounded-xl hover:border-accent-400 hover:bg-accent-50 transition-all group"
            >
              <Mail className="h-6 w-6 text-accent-600 mr-3 group-hover:scale-110 transition-transform" />
              <div>
                <div className="font-semibold text-brand-800">이메일 문의</div>
                <div className="text-sm text-brand-600">dahaedeulio@gmail.com</div>
              </div>
            </a>

            <a
              href="tel:010-6445-5367"
              className="flex items-center justify-center p-6 border-2 border-brand-200 rounded-xl hover:border-brand-400 hover:bg-brand-50 transition-all group"
            >
              <Phone className="h-6 w-6 text-brand-600 mr-3 group-hover:scale-110 transition-transform" />
              <div>
                <div className="font-semibold text-brand-800">전화 문의</div>
                <div className="text-sm text-brand-600">010-6445-5367</div>
              </div>
            </a>
          </div>

          <div className="mt-8 text-center text-sm text-brand-500">
            <p>평일 09:00 - 18:00 (점심시간 12:00 - 13:00 제외)</p>
            <p>주말 및 공휴일 휴무</p>
          </div>
        </div>
      </div>
    </div>
  )
}
