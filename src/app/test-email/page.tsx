'use client'

import { useState } from 'react'
import { CheckCircle, Mail, AlertCircle, Loader2 } from 'lucide-react'

export default function TestEmailPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [result, setResult] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const sendTestEmail = async (type: 'test' | 'quote') => {
    setIsLoading(true)
    setResult(null)
    setError(null)

    try {
      const response = await fetch('/api/test-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ type }),
      })

      const data = await response.json()

      if (response.ok) {
        setResult(data)
      } else {
        setError(data.error || '이메일 전송에 실패했습니다.')
      }
    } catch (err) {
      setError('네트워크 오류가 발생했습니다.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <Mail className="h-16 w-16 text-accent-600 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              이메일 테스트
            </h1>
            <p className="text-gray-600">
              다해드리오 이메일 발송 시스템을 테스트합니다
            </p>
          </div>

          <div className="space-y-4 mb-8">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h3 className="font-semibold text-blue-900 mb-2">📧 이메일 설정 정보</h3>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• <strong>From:</strong> onboarding@resend.dev (Resend 무료 플랜 전용)</li>
                <li>• <strong>To:</strong> dahaedeulio@gmail.com</li>
                <li>• <strong>Reply-To:</strong> dahaedeulio@gmail.com</li>
                <li>• <strong>Service:</strong> Resend Email API</li>
              </ul>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <button
              onClick={() => sendTestEmail('test')}
              disabled={isLoading}
              className="flex items-center justify-center px-6 py-4 border border-accent-600 text-accent-600 rounded-lg hover:bg-accent-50 transition-colors disabled:opacity-50"
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
              ) : (
                <Mail className="h-5 w-5 mr-2" />
              )}
              간단한 테스트 이메일
            </button>

            <button
              onClick={() => sendTestEmail('quote')}
              disabled={isLoading}
              className="flex items-center justify-center px-6 py-4 bg-accent-600 text-white rounded-lg hover:bg-accent-700 transition-colors disabled:opacity-50"
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 mr-2 animate-spin" />
              ) : (
                <CheckCircle className="h-5 w-5 mr-2" />
              )}
              견적 알림 이메일 테스트
            </button>
          </div>

          {result && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
              <div className="flex items-center mb-2">
                <CheckCircle className="h-5 w-5 text-green-600 mr-2" />
                <h3 className="font-semibold text-green-900">전송 성공!</h3>
              </div>
              <p className="text-green-800 mb-3">{result.message}</p>
              {result.details && (
                <div className="text-sm text-green-700 bg-green-100 p-3 rounded">
                  <p><strong>받는 사람:</strong> {result.details.to}</p>
                  <p><strong>보내는 사람:</strong> {result.details.from}</p>
                  <p><strong>타입:</strong> {result.details.type}</p>
                </div>
              )}
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
              <div className="flex items-center mb-2">
                <AlertCircle className="h-5 w-5 text-red-600 mr-2" />
                <h3 className="font-semibold text-red-900">전송 실패</h3>
              </div>
              <p className="text-red-800">{error}</p>
            </div>
          )}

          <div className="text-center text-sm text-gray-500">
            <p>이메일이 전송되지 않는다면:</p>
            <p>1. Vercel 환경 변수에서 RESEND_API_KEY 확인</p>
            <p>2. Resend 대시보드에서 API 키 상태 및 발송 로그 확인</p>
            <p>3. 스팸 폴더 확인</p>
            <p>4. From 주소가 onboarding@resend.dev인지 확인</p>
          </div>
        </div>
      </div>
    </div>
  )
}
