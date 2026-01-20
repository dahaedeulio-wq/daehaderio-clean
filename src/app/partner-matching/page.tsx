import Link from 'next/link'
import { CheckCircle, Users, Search, Star, Shield, Clock, ArrowRight, Award, MapPin } from 'lucide-react'

export default function PartnerMatchingPage() {
  const partnerTypes = [
    {
      icon: Users,
      title: '전문 청소업체',
      description: '다년간의 경험을 가진 전문 청소업체',
      features: ['5년 이상 업계 경험', '전문 장비 보유', '다양한 청소 서비스', '합리적인 가격'],
      count: '50+'
    },
    {
      icon: Award,
      title: '인증 업체',
      description: '각종 인증을 보유한 신뢰할 수 있는 업체',
      features: ['사업자등록 확인', '보험 가입 완료', '자격증 보유', '고객 평점 4.5점 이상'],
      count: '30+'
    },
    {
      icon: MapPin,
      title: '지역 전문업체',
      description: '지역별 특성을 잘 아는 로컬 전문업체',
      features: ['지역 맞춤 서비스', '빠른 출장 가능', '지역 특화 경험', '합리적 출장비'],
      count: '100+'
    }
  ]

  const matchingProcess = [
    { step: '01', title: '요청서 작성', description: '청소 유형과 조건을 상세히 입력해주세요' },
    { step: '02', title: '업체 매칭', description: '조건에 맞는 검증된 파트너 업체를 선별합니다' },
    { step: '03', title: '견적 비교', description: '여러 업체의 견적을 비교하여 선택하세요' },
    { step: '04', title: '업체 선택', description: '가격과 조건을 고려하여 최적의 업체를 선택합니다' },
    { step: '05', title: '서비스 진행', description: '선택한 업체가 직접 방문하여 청소를 수행합니다' }
  ]

  const benefits = [
    {
      icon: Search,
      title: '다양한 선택권',
      description: '여러 업체 중에서 조건에 맞는 최적의 업체를 선택할 수 있습니다.'
    },
    {
      icon: Star,
      title: '검증된 품질',
      description: '다해드리오가 직접 검증한 우수한 파트너 업체만을 연결해드립니다.'
    },
    {
      icon: Shield,
      title: '안전한 거래',
      description: '모든 거래는 다해드리오가 중간에서 관리하여 안전을 보장합니다.'
    },
    {
      icon: Clock,
      title: '빠른 매칭',
      description: '요청 후 24시간 내에 적합한 파트너 업체를 매칭해드립니다.'
    }
  ]

  return (
    <div className="bg-white">
      {/* 히어로 섹션 */}
      <section className="relative bg-gradient-to-br from-green-50 to-green-100 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center bg-green-600 text-white px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Users className="h-4 w-4 mr-2" />
              검증된 파트너 업체 연결
            </div>
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              최적의 청소업체를
              <span className="block text-green-600">다해드리오가 찾아드립니다</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              엄선된 파트너 청소업체 중에서 고객님의 조건에 가장 적합한 업체를 매칭해드립니다. 
              다양한 선택권과 경쟁력 있는 가격으로 만족스러운 청소 서비스를 경험하세요.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/quote?service=partner"
                className="bg-green-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-700 transition-colors inline-flex items-center justify-center"
              >
                업체 매칭 요청하기
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <a
                href="tel:010-6445-5367"
                className="border-2 border-green-600 text-green-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-green-50 transition-colors"
              >
                전화 상담: 010-6445-5367
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 파트너 업체 유형 */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              다해드리오 파트너 업체
            </h2>
            <p className="text-xl text-gray-600">
              엄격한 검증 과정을 거친 신뢰할 수 있는 청소업체들과 함께합니다
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {partnerTypes.map((type, index) => (
              <div key={index} className="bg-white rounded-2xl border border-gray-200 p-8 hover:shadow-lg transition-shadow">
                <div className="text-center mb-6">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <type.icon className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{type.title}</h3>
                  <p className="text-gray-600">{type.description}</p>
                </div>

                <ul className="space-y-3 mb-6">
                  {type.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center text-gray-700">
                      <CheckCircle className="h-5 w-5 text-green-600 mr-3 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <div className="border-t pt-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm text-gray-500">등록 업체 수</span>
                    <span className="text-2xl font-bold text-green-600">{type.count}</span>
                  </div>
                  <Link
                    href={`/quote?service=partner&type=${type.title}`}
                    className="w-full bg-green-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-700 transition-colors text-center block"
                  >
                    매칭 요청하기
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 매칭 프로세스 */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              업체 매칭 프로세스
            </h2>
            <p className="text-xl text-gray-600">
              간단한 5단계로 최적의 청소업체를 만나보세요
            </p>
          </div>

          <div className="grid md:grid-cols-5 gap-8">
            {matchingProcess.map((item, index) => (
              <div key={index} className="text-center relative">
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold text-lg">{item.step}</span>
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.description}</p>
                {index < matchingProcess.length - 1 && (
                  <div className="hidden md:block absolute top-8 left-full w-full -z-10">
                    <div className="w-full h-0.5 bg-green-200 mt-8"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 중개 서비스의 장점 */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              업체 연결 서비스의 장점
            </h2>
            <p className="text-xl text-gray-600">
              다해드리오 중개 서비스만의 특별한 혜택을 경험하세요
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <benefit.icon className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 파트너 업체 검증 기준 */}
      <section className="py-20 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-6">
                엄격한 파트너 업체 검증
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                다해드리오는 고객님께 최고의 서비스를 제공하기 위해 
                모든 파트너 업체를 엄격하게 검증합니다.
              </p>
              <div className="space-y-6">
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-4 mt-1">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">사업자 등록 및 보험 확인</h3>
                    <p className="text-gray-600">정식 사업자등록과 배상책임보험 가입을 필수로 확인합니다.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-4 mt-1">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">서비스 품질 평가</h3>
                    <p className="text-gray-600">실제 서비스 품질을 직접 평가하여 기준을 통과한 업체만 선별합니다.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-4 mt-1">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">고객 만족도 관리</h3>
                    <p className="text-gray-600">지속적인 고객 피드백 수집으로 서비스 품질을 관리합니다.</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-4 mt-1">
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">정기 재평가</h3>
                    <p className="text-gray-600">6개월마다 파트너 업체를 재평가하여 지속적인 품질을 보장합니다.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <div className="text-center">
                <Shield className="h-16 w-16 text-green-600 mx-auto mb-6" />
                <h3 className="text-2xl font-bold text-gray-900 mb-4">다해드리오 품질 보증</h3>
                <p className="text-gray-600 mb-6">
                  파트너 업체 서비스에 문제가 있을 경우, 
                  다해드리오가 직접 해결책을 제시합니다.
                </p>
                <div className="space-y-4">
                  <div className="bg-green-50 rounded-lg p-4">
                    <div className="flex items-center justify-center text-green-600 mb-2">
                      <Star className="h-5 w-5 mr-2" />
                      <span className="font-semibold">평균 만족도 4.8/5.0</span>
                    </div>
                    <p className="text-sm text-gray-600">고객 만족도 기준</p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-4">
                    <div className="flex items-center justify-center text-green-600 mb-2">
                      <Users className="h-5 w-5 mr-2" />
                      <span className="font-semibold">월 평균 1,000+ 매칭</span>
                    </div>
                    <p className="text-sm text-gray-600">성공적인 매칭 건수</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="py-20 bg-green-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            지금 바로 최적의 청소업체를 찾아보세요
          </h2>
          <p className="text-xl text-green-100 mb-8">
            검증된 파트너 업체 중에서 가장 적합한 업체를 매칭해드립니다
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/quote?service=partner"
              className="bg-white text-green-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
            >
              업체 매칭 요청하기
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <a
              href="tel:010-6445-5367"
              className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-green-600 transition-colors"
            >
              전화 상담: 010-6445-5367
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
