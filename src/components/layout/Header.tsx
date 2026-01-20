'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Menu, X, Phone } from 'lucide-react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navigation = [
    { name: '홈', href: '/' },
    { name: '직접 청소', href: '/direct-cleaning' },
    { name: '업체 연결', href: '/partner-matching' },
    { name: '회사 소개', href: '/about' },
  ]

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* 브랜드 로고 */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="relative w-10 h-10 md:w-12 md:h-12">
                <Image
                  src="/brand/mascot.png"
                  alt="다해드리오 마스코트"
                  fill
                  className="object-contain group-hover:scale-105 transition-transform duration-200"
                />
              </div>
              <div className="relative h-7 w-24 md:h-9 md:w-32">
                <Image
                  src="/brand/logo.png"
                  alt="다해드리오 로고"
                  fill
                  className="object-contain"
                />
              </div>
            </Link>
          </div>

          {/* 데스크톱 네비게이션 */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-brand-700 hover:text-accent-600 px-3 py-2 text-sm font-medium transition-colors"
              >
                {item.name}
              </Link>
              ))}
            </div>
          </div>

          {/* 연락처 및 견적 요청 버튼 */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="flex items-center text-sm text-gray-600">
              <Phone className="h-4 w-4 mr-1" />
              <span>010-6445-5367</span>
            </div>
            <Link
              href="/quote"
              className="bg-accent-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-accent-700 transition-colors"
            >
              견적 요청
            </Link>
          </div>

          {/* 모바일 메뉴 버튼 */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-brand-700 hover:text-accent-600 p-2"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* 모바일 메뉴 */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-brand-700 hover:text-accent-600 block px-3 py-2 text-base font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="border-t pt-3 mt-3">
                <div className="flex items-center px-3 py-2 text-sm text-gray-600">
                  <Phone className="h-4 w-4 mr-2" />
                  <span>010-6445-5367</span>
                </div>
                <Link
                  href="/quote"
                  className="block mx-3 mt-2 bg-accent-600 text-white px-4 py-2 rounded-md text-sm font-medium text-center hover:bg-accent-700 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  견적 요청
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
