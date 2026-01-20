import Link from 'next/link'
import { CheckCircle, Home, Building2, Sparkles, Clock, Shield, ArrowRight } from 'lucide-react'

export default function DirectCleaningPage() {
  const services = [
    {
      icon: Home,
      title: '일반 가정 청소',
      description: '아파트, 빌라, 주택의 정기적인 청소 서비스',
      features: ['거실, 침실, 주방, 화장실', '바닥 청소 및 걸레질', '먼지 제거 및 정리정돈', '쓰레기 처리'],
      price: '15만원부터'
    },
    {
      icon: Sparkles,
      title: '입주/이사 청소',
      description: '새 집 입주 전후 완벽한 청소 서비스',
      features: ['전체 공간 세밀 청소', '곰팡이 및 찌든 때 제거', '새집 냄새 제거', '입주 준비 완료'],
      price: '25만원부터'
    },
    {
      icon: Building2,
      title: '사무실 청소',
      description: '쾌적한 업무 환경을 위한 사무실 청소',
      features: ['사무 공간 전체 청소', '회의실 및 휴게실', '화장실 및 급수대', '정기 계약 가능'],
      price: '20만원부터'
    }
  ]

  const process = [
    { step: '01', title: '견적 요청', description: '온라인 또는 전화로 견적을 요청하세요' },
    { step: '02', title: '현장 확인', description: '전문가가 직접 방문하여 정확한 견적을 산출합니다' },
    { step: '03', title: '일정 협의', description: '고객님께 편리한 시간으로 청소 일정을 조율합니다' },
    { step: '04', title: '청소 진행', description: '다해드리오 전문 직원이 직접 청소를 수행합니다' },
    { step: '05', title: '완료 확인', description: '청소 완료 후 고객님과 함께 최종 점검을 진행합니다' }
  ]

  return (
    <div className="bg-white">
      {/* 히어로 섹션 */}
      <section className="relative bg-gradient-to-br from-blue-50 to-blue-100 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Shield className="h-4 w-4 mr-2" />
              다해드리오 직접 서비스
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              프리미엄 직접 청소
              <span className="block text-blue-600">다해드리오가 책임집니다</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              다해드리오 전문 직원이 직접 방문하여 최고 품질의 청소 서비스를 제공합니다. 
              일정한 품질과 책임감 있는 A/S로 고객 만족을 보장합니다.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/quote?service=direct"
                className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-700 transition-colors inline-flex items-center justify-center"
              >
                직접 청소 견적 받기
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <a
                href="tel:010-6445-5367"
                className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-blue-50 transition-colors"
              >
                전화 상담: 010-6445-5367
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 서비스 종류 */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              다해드리오 직접 청소 서비스
            </h2>
            <p className="text-xl text-gray-600">
              공간과 목적에 맞는 맞춤형 청소 서비스를 제공합니다
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={index} className="bg-white rounded-2xl border border-gray-200 p-8 hover:shadow-lg transition-shadow">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <service.icon className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </div>

                <ul className="space-y-3 mb-6">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-gray-700">
                      <CheckCircle className="h-5 w-5 text-blue-600 mr-3 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="border-t pt-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm text-gray-500">시작 가격</span>
                    <span className="text-2xl font-bold text-blue-600">{service.price}</span>
                  </div>
                  <Link
                    href={`/quote?service=direct&type=${service.title}`}
                    className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors text-center block"
                  >
                    견적 요청하기
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 서비스 프로세스 */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              서비스 진행 과정
            </h2>
            <p className="text-xl text-gray-600">
              체계적이고 투명한 프로세스로 최고의 서비스를 제공합니다
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-8">
            {process.map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-lg">{item.step}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
                {index < process.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-full w-full">
                    <ArrowRight className="h-6 w-6 text-blue-300 mx-auto" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 다해드리오 직접 서비스의 장점 */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                왜 다해드리오 직접 서비스인가요?
              </h2>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4 mt-1">
                    <CheckCircle className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">일정한 품질 보장</h3>
                    <p className="text-gray-600">다해드리오 직원이 직접 수행하여 항상 동일한 수준의 서비스를 제공합니다.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4 mt-1">
                    <CheckCircle className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">책임감 있는 A/S</h3>
                    <p className="text-gray-600">서비스 후 문제 발생 시 다해드리오가 직접 책임지고 해결해드립니다.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4 mt-1">
                    <CheckCircle className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">투명한 가격 정책</h3>
                    <p className="text-gray-600">숨겨진 비용 없이 명확하고 합리적인 가격으로 서비스를 제공합니다.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-4 mt-1">
                    <CheckCircle className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">전문 교육받은 직원</h3>
                    <p className="text-gray-600">체계적인 교육과 훈련을 받은 전문 청소 직원이 서비스를 수행합니다.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8">
              <div className="text-center">
                <Shield className="h-16 w-16 text-blue-600 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-gray-900 mb-4">다해드리오 품질 보증</h3>
                <p className="text-gray-600 mb-6">
                  모든 서비스에 대해 품질을 보증하며, 
                  만족하지 않으실 경우 무료 재청소를 제공합니다.
                </p>
                <div className="bg-white rounded-lg p-4">
                  <div className="flex items-center justify-center text-blue-600 mb-2">
                    <Clock className="h-5 w-5 mr-2" />
                    <span className="font-semibold">24시간 고객 지원</span>
                  </div>
                  <p className="text-sm text-gray-600">언제든지 문의하실 수 있습니다</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            다해드리오 직접 청소 서비스를 경험해보세요
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            전문가의 손길로 깨끗하고 쾌적한 공간을 만들어드립니다
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/quote?service=direct"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
            >
              무료 견적 받기
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <a
              href="tel:010-6445-5367"
              className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
            >
              전화 상담: 010-6445-5367
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
