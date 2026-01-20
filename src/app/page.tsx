import Link from "next/link";
import Image from "next/image";
import { CheckCircle, Users, Shield, Clock, Star, ArrowRight, UserPlus } from "lucide-react";



export default function Home() {
  return (
    <div className="bg-white">
      {/* 히어로 섹션 */}
      <section className="relative bg-gradient-to-br from-brand-50 to-brand-100 py-20 lg:py-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* 텍스트 콘텐츠 */}
            <div className="text-center lg:text-left lg:ml-8">
              <h1 className="text-4xl lg:text-6xl font-bold text-brand-900 mb-6 leading-tight">
                청소,
                <span className="block text-accent-600">다해드리오가</span>
                <span className="block">다 해드립니다</span>
              </h1>
              <p className="text-xl text-brand-600 mb-10 max-w-2xl">
                직접 청소부터 믿을 수 있는 업체 연결까지
              </p>
              <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start items-center sm:items-start">
                {/* 메인 CTA - 3분 견적 받기 */}
                <div className="relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl blur opacity-40 animate-pulse"></div>
                  <Link
                    href="/quote"
                    className="relative bg-gray-900 text-white px-12 py-6 rounded-xl text-xl font-bold hover:bg-gray-800 transition-all duration-300 inline-flex items-center justify-center shadow-2xl hover:shadow-3xl transform hover:scale-105 border-2 border-gray-700 group"
                  >
                    <span className="mr-3 text-2xl">⚡</span>
                    <span className="tracking-wide">3분 견적 받기</span>
                    <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-1 transition-transform duration-200" />
                  </Link>
                </div>
                
                {/* 서브 CTA - 파트너 모집 */}
                <Link
                  href="/partner-matching"
                  className="border-2 border-brand-300 text-brand-600 px-6 py-3 rounded-lg text-base font-medium hover:bg-brand-50 hover:border-brand-400 transition-all duration-200 inline-flex items-center justify-center"
                >
                  <UserPlus className="mr-2 h-4 w-4" />
                  파트너 모집
                </Link>
              </div>
            </div>
            
            {/* 마스코트 이미지 */}
            <div className="flex justify-center lg:justify-center lg:-ml-24 relative">
              {/* 배경 로고 */}
              <div className="absolute inset-0 flex items-center justify-center opacity-10 z-0">
                <div className="relative w-[40rem] h-[40rem] lg:w-[50rem] lg:h-[50rem]">
                  <Image
                    src="/brand/logo.png"
                    alt="다해드리오 배경 로고"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
              
              {/* 메인 마스코트 이미지 */}
              <div className="relative w-[26rem] h-[26rem] lg:w-[32rem] lg:h-[32rem] z-10">
                <Image
                  src="/brand/mascot.png"
                  alt="다해드리오 마스코트"
                  fill
                  className="object-contain animate-pulse"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
        
        {/* 배경 장식 */}
        <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-accent-50 to-transparent opacity-50"></div>
      </section>

      {/* 서비스 선택 섹션 */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              어떤 서비스가 필요하신가요?
            </h2>
            <p className="text-xl text-gray-600">
              상황에 맞는 최적의 청소 서비스를 선택하세요
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* 직접 청소 서비스 */}
            <div className="bg-gradient-to-br from-accent-50 to-accent-100 rounded-2xl p-8 lg:p-10 border border-accent-200">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-accent-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  다해드리오 직접 청소
                </h3>
                <p className="text-gray-600">
                  다해드리오가 직접 수행하는 프리미엄 청소 서비스
                </p>
              </div>

              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-brand-700">
                  <CheckCircle className="h-5 w-5 text-accent-600 mr-3 flex-shrink-0" />
                  <span>다해드리오 직원이 직접 방문</span>
                </li>
                <li className="flex items-center text-brand-700">
                  <CheckCircle className="h-5 w-5 text-accent-600 mr-3 flex-shrink-0" />
                  <span>일정한 품질 보장</span>
                </li>
                <li className="flex items-center text-brand-700">
                  <CheckCircle className="h-5 w-5 text-accent-600 mr-3 flex-shrink-0" />
                  <span>책임감 있는 A/S</span>
                </li>
                <li className="flex items-center text-brand-700">
                  <CheckCircle className="h-5 w-5 text-accent-600 mr-3 flex-shrink-0" />
                  <span>투명한 가격 정책</span>
                </li>
              </ul>

              <Link
                href="/direct-cleaning"
                className="w-full bg-accent-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-accent-700 transition-colors text-center block"
              >
                직접 청소 서비스 보기
              </Link>
            </div>

            {/* 중개 서비스 */}
            <div className="bg-gradient-to-br from-brand-50 to-brand-100 rounded-2xl p-8 lg:p-10 border border-brand-200">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-brand-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  검증된 업체 연결
                </h3>
                <p className="text-gray-600">
                  엄선된 파트너 청소업체와 연결해드리는 중개 서비스
                </p>
              </div>

              <ul className="space-y-3 mb-8">
                <li className="flex items-center text-brand-700">
                  <CheckCircle className="h-5 w-5 text-brand-600 mr-3 flex-shrink-0" />
                  <span>검증된 파트너 업체만 선별</span>
                </li>
                <li className="flex items-center text-brand-700">
                  <CheckCircle className="h-5 w-5 text-brand-600 mr-3 flex-shrink-0" />
                  <span>다양한 업체 중 선택 가능</span>
                </li>
                <li className="flex items-center text-brand-700">
                  <CheckCircle className="h-5 w-5 text-brand-600 mr-3 flex-shrink-0" />
                  <span>경쟁력 있는 가격</span>
                </li>
                <li className="flex items-center text-brand-700">
                  <CheckCircle className="h-5 w-5 text-brand-600 mr-3 flex-shrink-0" />
                  <span>다해드리오가 품질 관리</span>
                </li>
              </ul>

              <Link
                href="/partner-matching"
                className="w-full bg-brand-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-brand-700 transition-colors text-center block"
              >
                업체 연결 서비스 보기
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 특징 섹션 */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              왜 다해드리오를 선택해야 할까요?
            </h2>
            <p className="text-xl text-gray-600">
              고객 만족을 위한 다해드리오만의 특별함
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-accent-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">빠른 대응</h3>
              <p className="text-gray-600">
                견적 요청 후 24시간 내 연락드리며, 
                최대한 빠른 일정으로 서비스를 제공합니다.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-accent-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">안전 보장</h3>
              <p className="text-gray-600">
                모든 직원과 파트너 업체는 보험 가입 및 
                신원 확인을 완료한 검증된 인력입니다.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-accent-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <Star className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-4">품질 관리</h3>
              <p className="text-gray-600">
                체계적인 품질 관리 시스템으로 
                항상 일정한 수준의 서비스를 보장합니다.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA 섹션 */}
      <section className="py-20 bg-brand-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            지금 바로 견적을 받아보세요
          </h2>
          <p className="text-xl text-brand-200 mb-8">
            무료 견적 상담으로 최적의 청소 서비스를 찾아보세요
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/quote"
              className="bg-gray-900 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-800 transition-colors inline-flex items-center justify-center shadow-lg"
            >
              ⚡ 3분 견적 받기
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <a
              href="tel:010-6445-5367"
              className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-brand-800 transition-colors"
            >
              전화 상담: 010-6445-5367
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
