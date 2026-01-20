import Link from 'next/link'
import { Shield, Users, Award, Clock, CheckCircle, Star, ArrowRight, Target, Heart, Zap } from 'lucide-react'

export default function AboutPage() {
  const values = [
    {
      icon: Heart,
      title: '고객 중심',
      description: '고객의 만족이 우리의 최우선 가치입니다. 모든 서비스는 고객의 관점에서 설계됩니다.'
    },
    {
      icon: Shield,
      title: '신뢰와 안전',
      description: '검증된 인력과 체계적인 관리 시스템으로 안전하고 신뢰할 수 있는 서비스를 제공합니다.'
    },
    {
      icon: Zap,
      title: '혁신과 효율',
      description: '최신 기술과 효율적인 프로세스로 더 나은 청소 서비스를 지속적으로 개발합니다.'
    },
    {
      icon: Target,
      title: '품질 보장',
      description: '일정한 품질 기준을 유지하며, 지속적인 개선을 통해 최고의 서비스를 추구합니다.'
    }
  ]

  const features = [
    {
      icon: Users,
      title: '이중 서비스 모델',
      description: '직접 청소와 업체 연결 서비스를 통해 다양한 고객 니즈에 대응합니다.',
      details: ['다해드리오 직접 청소 서비스', '검증된 파트너 업체 연결', '고객 선택권 최대화']
    },
    {
      icon: Shield,
      title: '철저한 품질 관리',
      description: '체계적인 품질 관리 시스템으로 일정한 서비스 수준을 보장합니다.',
      details: ['정기적인 서비스 품질 점검', '고객 피드백 시스템', '지속적인 개선 프로세스']
    },
    {
      icon: Clock,
      title: '신속한 대응',
      description: '24시간 내 견적 제공과 빠른 서비스 매칭으로 고객 편의를 제공합니다.',
      details: ['24시간 내 견적 제공', '긴급 청소 서비스 대응', '유연한 스케줄링']
    },
    {
      icon: Award,
      title: '검증된 전문성',
      description: '경험 많은 전문가들과 검증된 파트너사들로 구성된 신뢰할 수 있는 네트워크입니다.',
      details: ['전문 교육 이수 직원', '보험 가입 완료', '정기적인 재평가 시스템']
    }
  ]

  const stats = [
    { number: '5,000+', label: '누적 서비스 건수' },
    { number: '200+', label: '검증된 파트너 업체' },
    { number: '4.8/5.0', label: '고객 만족도' },
    { number: '24시간', label: '평균 응답 시간' }
  ]

  return (
    <div className="bg-white">
      {/* 히어로 섹션 */}
      <section className="relative bg-gradient-to-br from-primary-50 to-primary-100 py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              믿을 수 있는 청소 서비스
              <span className="block text-primary-600">다해드리오</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              2020년부터 시작된 다해드리오는 고객의 다양한 청소 니즈에 맞춰 
              직접 서비스와 업체 연결 서비스를 제공하는 종합 청소 플랫폼입니다.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/quote"
                className="bg-primary-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary-700 transition-colors inline-flex items-center justify-center"
              >
                서비스 이용하기
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <a
                href="tel:010-6445-5367"
                className="border-2 border-primary-600 text-primary-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary-50 transition-colors"
              >
                전화 상담: 010-6445-5367
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 통계 섹션 */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-primary-600 mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 핵심 가치 */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              다해드리오의 핵심 가치
            </h2>
            <p className="text-xl text-gray-600">
              우리가 추구하는 가치와 원칙들입니다
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 text-center shadow-sm hover:shadow-md transition-shadow">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <value.icon className="h-8 w-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 서비스 특징 */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              다해드리오만의 특별함
            </h2>
            <p className="text-xl text-gray-600">
              차별화된 서비스로 고객 만족을 실현합니다
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {features.map((feature, index) => (
              <div key={index} className="flex items-start">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mr-6 flex-shrink-0">
                  <feature.icon className="h-6 w-6 text-primary-600" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 mb-4">{feature.description}</p>
                  <ul className="space-y-2">
                    {feature.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-center text-sm text-gray-600">
                        <CheckCircle className="h-4 w-4 text-primary-600 mr-2 flex-shrink-0" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 회사 연혁 */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              다해드리오의 성장 과정
            </h2>
            <p className="text-xl text-gray-600">
              지속적인 성장과 발전을 통해 더 나은 서비스를 제공합니다
            </p>
          </div>

          <div className="space-y-8">
            <div className="flex items-center">
              <div className="w-24 h-24 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-8 flex-shrink-0">
                2020
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">다해드리오 설립</h3>
                <p className="text-gray-600">고객 중심의 청소 서비스 제공을 목표로 회사 설립</p>
              </div>
            </div>

            <div className="flex items-center">
              <div className="w-24 h-24 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-8 flex-shrink-0">
                2021
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">직접 청소 서비스 시작</h3>
                <p className="text-gray-600">전문 직원을 통한 직접 청소 서비스 본격 시작</p>
              </div>
            </div>

            <div className="flex items-center">
              <div className="w-24 h-24 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-8 flex-shrink-0">
                2022
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">파트너 업체 네트워크 구축</h3>
                <p className="text-gray-600">검증된 청소업체들과의 파트너십을 통한 중개 서비스 시작</p>
              </div>
            </div>

            <div className="flex items-center">
              <div className="w-24 h-24 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-8 flex-shrink-0">
                2023
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">서비스 지역 확대</h3>
                <p className="text-gray-600">수도권 전체로 서비스 지역 확대 및 파트너 업체 200곳 돌파</p>
              </div>
            </div>

            <div className="flex items-center">
              <div className="w-24 h-24 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold text-lg mr-8 flex-shrink-0">
                2024
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">디지털 플랫폼 고도화</h3>
                <p className="text-gray-600">온라인 견적 시스템 및 고객 관리 시스템 구축으로 서비스 품질 향상</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 인증 및 보장 */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              신뢰할 수 있는 서비스
            </h2>
            <p className="text-xl text-gray-600">
              각종 인증과 보험으로 안전한 서비스를 보장합니다
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center bg-gray-50 rounded-2xl p-8">
              <Shield className="h-16 w-16 text-primary-600 mx-auto mb-6" />
              <h3 className="text-xl font-bold text-gray-900 mb-4">배상책임보험</h3>
              <p className="text-gray-600">
                모든 서비스에 대해 배상책임보험에 가입하여 
                만약의 사고에도 안전하게 보장합니다.
              </p>
            </div>

            <div className="text-center bg-gray-50 rounded-2xl p-8">
              <Award className="h-16 w-16 text-primary-600 mx-auto mb-6" />
              <h3 className="text-xl font-bold text-gray-900 mb-4">사업자 등록</h3>
              <p className="text-gray-600">
                정식 사업자등록을 완료한 합법적인 
                청소 서비스 업체입니다.
              </p>
            </div>

            <div className="text-center bg-gray-50 rounded-2xl p-8">
              <Star className="h-16 w-16 text-primary-600 mx-auto mb-6" />
              <h3 className="text-xl font-bold text-gray-900 mb-4">품질 보증</h3>
              <p className="text-gray-600">
                서비스에 만족하지 않으실 경우 
                무료 재청소를 제공합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="py-20 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            다해드리오와 함께 깨끗한 공간을 만들어보세요
          </h2>
          <p className="text-xl text-primary-100 mb-8">
            믿을 수 있는 청소 서비스로 여러분의 소중한 공간을 관리해드립니다
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/quote"
              className="bg-white text-primary-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors inline-flex items-center justify-center"
            >
              무료 견적 받기
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <a
              href="tel:010-6445-5367"
              className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors"
            >
              전화 상담: 010-6445-5367
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
