"use client"

import { X, Download, MessageCircle, CreditCard, FileText, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

interface QuoteModalProps {
  isOpen: boolean
  onClose: () => void
  totalPrice: number
  totalTime: number
  estimateName: string
  packageName?: string
  areaSize?: number
  onPayment?: () => void
}

const packageNames: Record<string, string> = {
  basic: "Basic",
  standard: "Standard",
  premium: "Premium",
}

function generateQuoteNumber() {
  const date = new Date()
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, "0")
  const day = String(date.getDate()).padStart(2, "0")
  const hour = String(date.getHours()).padStart(2, "0")
  const minute = String(date.getMinutes()).padStart(2, "0")
  const second = String(date.getSeconds()).padStart(2, "0")
  return `LQ${year}${month}${day}${hour}${minute}${second}`
}

function formatTime(minutes: number) {
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  if (hours === 0) return `${mins}분`
  if (mins === 0) return `${hours}시간`
  return `${hours}시간 ${mins}분`
}

export function QuoteModal({
  isOpen,
  onClose,
  totalPrice,
  totalTime,
  estimateName,
  packageName,
  areaSize,
  onPayment,
}: QuoteModalProps) {
  if (!isOpen) return null

  const quoteNumber = generateQuoteNumber()

  const handleDownloadQuote = () => {
    alert("견적서 다운로드 기능은 추후 구현 예정입니다.")
  }

  const handleGoToKakao = () => {
    let quoteSummary = `🏠 Linky 견적 요청\n`
    quoteSummary += `━━━━━━━━━━━━━━━━\n`
    quoteSummary += `📝 견적서 번호: ${quoteNumber}\n`
    quoteSummary += `📋 견적서명: ${estimateName}\n`
    if (packageName) {
      quoteSummary += `📦 패키지: ${packageNames[packageName] || packageName}\n`
    }
    if (areaSize) {
      quoteSummary += `📐 공간 크기: ${areaSize}평\n`
    }
    quoteSummary += `⏱️ 예상 소요시간: ${formatTime(totalTime)}\n`
    quoteSummary += `💰 예상 견적: ${totalPrice.toLocaleString()}원\n`
    quoteSummary += `━━━━━━━━━━━━━━━━\n`

    navigator.clipboard.writeText(quoteSummary).then(() => {
      window.open("https://pf.kakao.com/_cuWDn", "_blank")
    })
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm overflow-y-auto py-5 flex items-center justify-center animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="bg-card rounded-2xl max-w-[500px] w-[90%] max-h-[90vh] mx-auto shadow-2xl animate-in slide-in-from-bottom-4 duration-300 flex flex-col relative border border-border"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 닫기 버튼 */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 flex items-center justify-center transition-colors"
        >
          <X className="w-5 h-5 text-white" />
        </button>

        {/* 헤더 */}
        <div className="bg-gradient-to-br from-[#00C896] to-[#00A878] text-white p-6 rounded-t-2xl text-center">
          <div className="w-16 h-16 mx-auto mb-3 rounded-full bg-white/20 flex items-center justify-center">
            <FileText className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-bold mb-1 break-keep">견적서 준비 완료!</h2>
          <p className="text-sm opacity-90 break-keep">서비스 용역계약서가 포함된 견적서를 확인하세요</p>
        </div>

        {/* 바디 */}
        <div className="p-6 overflow-y-auto flex-1 max-h-[calc(90vh-200px)]">
          {/* 견적서 요약 */}
          <div className="bg-[#00C896]/10 border border-[#00C896]/20 rounded-xl p-4 mb-5">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm text-muted-foreground">견적서 번호</span>
              <span className="text-sm font-mono font-medium">{quoteNumber}</span>
            </div>
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm text-muted-foreground">견적서명</span>
              <span className="text-sm font-medium break-keep">{estimateName}</span>
            </div>
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm text-muted-foreground">예상 소요시간</span>
              <span className="text-sm font-medium">{formatTime(totalTime)}</span>
            </div>
            <div className="border-t border-[#00C896]/20 pt-3 mt-3">
              <div className="flex justify-between items-center">
                <span className="font-medium">총 예상 금액</span>
                <span className="text-2xl font-bold text-[#00C896]">{totalPrice.toLocaleString()}원</span>
              </div>
            </div>
          </div>

          {/* 진행 단계 */}
          <div className="space-y-4 mb-6">
            <h3 className="font-semibold text-sm text-muted-foreground break-keep">다음 단계</h3>
            {[
              { step: 1, title: "견적서 확인", desc: "견적 내용을 검토해주세요" },
              { step: 2, title: "결제 진행", desc: "안전한 결제를 진행합니다" },
              { step: 3, title: "서비스 예약", desc: "원하시는 일정에 서비스를 예약합니다" },
            ].map((item) => (
              <div key={item.step} className="flex items-start gap-3">
                <div className="w-6 h-6 bg-[#00C896] text-white rounded-full flex items-center justify-center text-xs font-bold shrink-0">
                  {item.step}
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium break-keep">{item.title}</p>
                  <p className="text-xs text-muted-foreground break-keep">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* 버튼 */}
          <div className="space-y-3">

            <div className="grid grid-cols-2 gap-3">
              <Button
                onClick={onPayment}
                className="w-full bg-[#00C896] hover:bg-[#00B085] text-white py-6 text-base font-semibold"
              >
                <CreditCard className="w-5 h-5 mr-2" />
                결제하기
              </Button>
              <button
                onClick={handleGoToKakao}
                className="flex-1 rounded-[10px] text-[15px] font-semibold cursor-pointer transition-all bg-[#FEE500] text-[#3A1D1D] flex items-center justify-center gap-2 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(254,229,0,0.4)]"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 3C6.48 3 2 6.584 2 10.92c0 2.711 1.746 5.098 4.395 6.51-.19.705-.688 2.545-.788 2.936-.125.488.18.483.378.351.155-.103 2.466-1.665 3.464-2.334.512.075 1.038.117 1.551.117 5.52 0 10-3.584 10-7.92S17.52 3 12 3z" />
                </svg>
                상담하기
              </button>
            </div>

            <Button variant="secondary" onClick={onClose} className="w-full text-muted-foreground">
              나중에 하기
            </Button>
          </div>

          {/* 이용약관 요약 */}
          <div className="mt-6 p-4 bg-secondary/50 rounded-xl">
            <h4 className="text-sm font-semibold mb-2 flex items-center gap-2 break-keep">
              <CheckCircle className="w-4 h-4 text-[#00C896]" />
              환불 규정 안내
            </h4>
            <ul className="text-xs text-muted-foreground space-y-1 break-keep">
              <li>• 서비스 2일 전까지: 100% 환불</li>
              <li>• 서비스 24시간 전: 50% 환불</li>
              <li>• 서비스 15시간 전부터: 환불 불가</li>
            </ul>
          </div>

          {/* 법적 고지 */}
          <p className="text-xs text-muted-foreground text-center mt-4 break-keep">
            결제 시 서비스 이용약관 및 개인정보 처리방침에 동의하게 됩니다
          </p>
        </div>
      </div>
    </div>
  )
}
