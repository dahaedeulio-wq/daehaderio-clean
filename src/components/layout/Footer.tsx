import Link from 'next/link'
import Image from 'next/image'
import { Phone, Mail, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* 회사 정보 */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-3 mb-4">
              <div className="relative w-8 h-8">
                <Image
                  src="/brand/mascot.png"
                  alt="다해드리오 마스코트"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="relative h-6 w-20">
                <Image
                  src="/brand/logo.png"
                  alt="다해드리오 로고"
                  fill
                  className="object-contain brightness-0 invert"
                />
              </div>
            </div>
            <p className="text-gray-300 mb-2 font-medium">
              직접 청소 및 중개 플랫폼
            </p>
            <p className="text-gray-400 mb-4 text-sm">
              믿을 수 있는 청소 서비스, 다해드리오가 모든 청소 고민을 해결해드립니다.
            </p>
            <div className="space-y-2">
              <div className="flex items-center text-sm text-gray-300">
                <Phone className="h-4 w-4 mr-2" />
                <span>010-6445-5367</span>
              </div>
              <div className="flex items-center text-sm text-gray-300">
                <Mail className="h-4 w-4 mr-2" />
                <span>contact@daehaderio.com</span>
              </div>
              <div className="flex items-center text-sm text-gray-300">
                <MapPin className="h-4 w-4 mr-2" />
                <span>서울 서초구 서초중앙로5길 10-8</span>
              </div>
            </div>
          </div>

          {/* 서비스 메뉴 */}
          <div>
            <h3 className="text-lg font-semibold mb-4">서비스</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/direct-cleaning" className="text-gray-300 hover:text-accent-400 transition-colors">
                  직접 청소 서비스
                </Link>
              </li>
              <li>
                <Link href="/partner-matching" className="text-gray-300 hover:text-accent-400 transition-colors">
                  업체 연결 서비스
                </Link>
              </li>
              <li>
                <Link href="/quote" className="text-gray-300 hover:text-accent-400 transition-colors">
                  견적 요청
                </Link>
              </li>
            </ul>
          </div>

          {/* 회사 메뉴 */}
          <div>
            <h3 className="text-lg font-semibold mb-4">회사</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-gray-300 hover:text-accent-400 transition-colors">
                  회사 소개
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="text-gray-300 hover:text-accent-400 transition-colors">
                  개인정보처리방침
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-300 hover:text-accent-400 transition-colors">
                  이용약관
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 다해드리오. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <span className="text-gray-400 text-sm">사업자등록번호: 123-45-67890</span>
              <span className="text-gray-400 text-sm">대표: 오다윗</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
