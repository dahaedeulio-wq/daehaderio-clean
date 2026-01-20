import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import FloatingAdBanner from '@/components/common/FloatingAdBanner'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '다해드리오 | 믿을 수 있는 청소 서비스',
  description: '다해드리오는 직접 청소와 검증된 업체 중개를 제공합니다.',
  keywords: '청소, 청소업체, 입주청소, 사무실청소, 가정청소, 다해드리오, 중개플랫폼',
  other: {
    'naver-site-verification': '49546d7a2f6a4ff5d686732196c21b79341319c3',
  },
  openGraph: {
    title: '다해드리오 | 믿을 수 있는 청소 서비스',
    description: '다해드리오는 직접 청소와 검증된 업체 중개를 제공합니다.',
    type: 'website',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: '다해드리오 | 믿을 수 있는 청소 서비스',
    description: '다해드리오는 직접 청소와 검증된 업체 중개를 제공합니다.',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <Header />
          
          <main className="flex-1">
            {children}
          </main>
          
          <Footer />
          
          {/* 플로팅 광고 배너 */}
          <FloatingAdBanner position="left" />
          <FloatingAdBanner position="right" />
        </div>
      </body>
    </html>
  )
}
