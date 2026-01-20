'use client'

import { useState } from 'react'
import Link from 'next/link'
import { MessageCircle, X, ExternalLink } from 'lucide-react'

interface FloatingAdBannerProps {
  position: 'left' | 'right'
}

export default function FloatingAdBanner({ position }: FloatingAdBannerProps) {
  const [isVisible, setIsVisible] = useState(true)
  const [isHovered, setIsHovered] = useState(false)

  if (!isVisible) return null

  const positionClasses = position === 'left' 
    ? 'left-4 lg:left-6' 
    : 'right-4 lg:right-6'

  return (
    <div 
      className={`hidden lg:block fixed top-1/2 -translate-y-1/2 ${positionClasses} z-40 transition-all duration-300 ease-in-out ${
        isHovered ? 'scale-105' : 'scale-100'
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* 메인 배너 */}
      <div className="relative">
        {/* 닫기 버튼 */}
        <button
          onClick={() => setIsVisible(false)}
          className="absolute -top-2 -right-2 w-6 h-6 bg-gray-600 hover:bg-gray-700 text-white rounded-full flex items-center justify-center text-xs transition-colors z-10"
          aria-label="광고 배너 닫기"
        >
          <X className="w-3 h-3" />
        </button>

        {/* 배너 컨테이너 */}
        <Link
          href="/ad-inquiry"
          className="block bg-gradient-to-br from-accent-600 to-accent-700 text-white rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 overflow-hidden group"
        >
          {/* 배경 패턴 */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-20"></div>
          
          {/* 컨텐츠 */}
          <div className="relative p-4 lg:p-5">
            {/* 아이콘 */}
            <div className="flex justify-center mb-3">
              <div className="w-10 h-10 lg:w-12 lg:h-12 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors">
                <MessageCircle className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
              </div>
            </div>

            {/* 텍스트 */}
            <div className="text-center space-y-2">
              <div className="text-sm lg:text-base font-bold">
                광고 문의
              </div>
              <div className="text-xs lg:text-sm opacity-90 leading-tight">
                다해드리오와<br />
                함께하세요
              </div>
            </div>

            {/* 화살표 아이콘 */}
            <div className="flex justify-center mt-3">
              <ExternalLink className="w-4 h-4 text-white/80 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
            </div>

            {/* 호버 효과 */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </div>
        </Link>

        {/* 펄스 효과 */}
        <div className="absolute inset-0 rounded-2xl bg-accent-500 animate-pulse opacity-20 group-hover:opacity-30 transition-opacity"></div>
      </div>

      {/* 추가 정보 툴팁 (호버 시 표시) */}
      {isHovered && (
        <div className={`absolute top-0 ${position === 'left' ? 'left-full ml-4' : 'right-full mr-4'} 
          bg-white rounded-lg shadow-xl border border-gray-200 p-3 w-48 z-20
          transform transition-all duration-200 ease-out`}
        >
          <div className="text-sm text-gray-800 font-medium mb-1">
            🎯 광고 문의
          </div>
          <div className="text-xs text-gray-600 leading-relaxed">
            다해드리오 플랫폼에서 고객님의 서비스를 홍보해보세요
          </div>
          <div className="mt-2 text-xs text-accent-600 font-medium">
            클릭하여 자세히 보기 →
          </div>
          
          {/* 화살표 */}
          <div className={`absolute top-4 ${position === 'left' ? '-left-2' : '-right-2'} 
            w-4 h-4 bg-white border-l border-t border-gray-200 transform rotate-45 ${position === 'left' ? '-rotate-45' : 'rotate-45'}`}>
          </div>
        </div>
      )}
    </div>
  )
}
