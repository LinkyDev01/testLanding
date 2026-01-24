"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ArrowLeft,
  ArrowRight,
  Calculator,
  Check,
  Clock,
  Plus,
  Minus,
  CheckCircle,
  ClipboardList,
  FileText,
} from "lucide-react"
import Link from "next/link"
import { AnimatedSection } from "@/components/animated-section"
import { CLEANING_ITEMS } from "@/constants/platform"
import { QuoteModal } from "@/components/platform/quote/quote-modal"

interface EstimateData {
  estimateName: string
  selectedItems: string[]
  adjustmentAmount: number
  notes: string
  isDefault: boolean
}

export default function EstimatePage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false)
  const [estimateData, setEstimateData] = useState<EstimateData>({
    estimateName: "",
    selectedItems: [],
    adjustmentAmount: 0,
    notes: "",
    isDefault: false,
  })

  const handleItemToggle = (itemId: string) => {
    setEstimateData((prev) => ({
      ...prev,
      selectedItems: prev.selectedItems.includes(itemId)
        ? prev.selectedItems.filter((id) => id !== itemId)
        : [...prev.selectedItems, itemId],
    }))
  }

  const calculatePrice = () => {
    const itemsTotal = estimateData.selectedItems.reduce((sum, itemId) => {
      const item = CLEANING_ITEMS.find((i) => i.id === itemId)
      return sum + (item?.price || 0)
    }, 0)
    return itemsTotal + estimateData.adjustmentAmount
  }

  const calculateTime = () => {
    return estimateData.selectedItems.reduce((sum, itemId) => {
      const item = CLEANING_ITEMS.find((i) => i.id === itemId)
      return sum + (item?.time || 0)
    }, 0)
  }

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    if (hours === 0) return `${mins}분`
    if (mins === 0) return `${hours}시간`
    return `${hours}시간 ${mins}분`
  }

  const nextStep = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
      window.scrollTo({ top: 0, behavior: "smooth" })
    }
  }

  const totalPrice = calculatePrice()
  const totalTime = calculateTime()

  const canProceed = () => {
    if (currentStep === 1) return estimateData.selectedItems.length > 0
    return true
  }

  const canSave = estimateData.estimateName.trim() !== "" && estimateData.selectedItems.length > 0

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link
              href="/platform"
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">돌아가기</span>
            </Link>
            <div className="flex items-center gap-2">
              <Calculator className="w-5 h-5 text-mint" />
              <span className="font-semibold">Linky 견적서 작성</span>
            </div>
            <div className="w-20" />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Bar */}
        <AnimatedSection className="mb-8">
          <div className="flex items-center justify-center">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                    step < currentStep
                      ? "bg-mint text-white"
                      : step === currentStep
                        ? "bg-mint text-white ring-4 ring-mint/20"
                        : "bg-secondary text-muted-foreground"
                  }`}
                >
                  {step < currentStep ? <Check className="w-5 h-5" /> : step}
                </div>
                {step < 4 && (
                  <div
                    className={`w-16 sm:w-24 h-1 mx-1 sm:mx-2 rounded transition-colors duration-300 ${
                      step < currentStep ? "bg-mint" : "bg-secondary"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-xs text-muted-foreground px-2">
            <span>작업 선택</span>
            <span>금액 조정</span>
            <span>정보 입력</span>
            <span>완료</span>
          </div>
        </AnimatedSection>

        {/* Step 1: Item Selection */}
        {currentStep === 1 && (
          <AnimatedSection>
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ClipboardList className="w-5 h-5 text-mint" />
                  작업 항목 선택
                </CardTitle>
                <p className="text-sm text-muted-foreground break-keep">필요한 청소 항목을 선택하세요</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {CLEANING_ITEMS.map((item) => (
                    <div
                      key={item.id}
                      className={`flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                        estimateData.selectedItems.includes(item.id)
                          ? "border-mint bg-mint-light"
                          : "border-border hover:border-mint/50"
                      }`}
                      onClick={() => handleItemToggle(item.id)}
                    >
                      <Checkbox
                        checked={estimateData.selectedItems.includes(item.id)}
                        onCheckedChange={() => handleItemToggle(item.id)}
                        className="data-[state=checked]:bg-mint data-[state=checked]:border-mint"
                      />
                      <div className="flex-1">
                        <p className="font-medium break-keep">{item.name}</p>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>{item.price.toLocaleString()}원</span>
                          <span>·</span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {item.time}분
                          </span>
                        </div>
                      </div>
                      {estimateData.selectedItems.includes(item.id) && (
                        <div className="w-6 h-6 rounded-full bg-mint flex items-center justify-center">
                          <Check className="w-4 h-4 text-white" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {estimateData.selectedItems.length > 0 && (
                  <div className="p-4 bg-mint/10 rounded-xl border border-mint/20">
                    <p className="text-sm">
                      <span className="font-medium">{estimateData.selectedItems.length}개</span> 항목 선택됨
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </AnimatedSection>
        )}

        {/* Step 2: Adjustment Amount */}
        {currentStep === 2 && (
          <AnimatedSection>
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-mint" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  조정 금액 설정
                </CardTitle>
                <p className="text-sm text-muted-foreground break-keep">할인 또는 추가 금액을 입력하세요</p>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* 선택된 항목 요약 */}
                <div className="p-4 bg-secondary/30 rounded-xl">
                  <h4 className="font-medium text-sm mb-3 break-keep">선택된 작업 항목</h4>
                  <div className="space-y-2">
                    {estimateData.selectedItems.map((itemId) => {
                      const item = CLEANING_ITEMS.find((i) => i.id === itemId)
                      if (!item) return null
                      return (
                        <div key={itemId} className="flex justify-between text-sm">
                          <span>{item.name}</span>
                          <span className="text-muted-foreground">{item.price.toLocaleString()}원</span>
                        </div>
                      )
                    })}
                    <div className="border-t border-border pt-2 mt-2 flex justify-between font-medium">
                      <span>소계</span>
                      <span>
                        {estimateData.selectedItems
                          .reduce((sum, itemId) => {
                            const item = CLEANING_ITEMS.find((i) => i.id === itemId)
                            return sum + (item?.price || 0)
                          }, 0)
                          .toLocaleString()}
                        원
                      </span>
                    </div>
                  </div>
                </div>

                {/* 조정 금액 입력 */}
                <div className="space-y-4">
                  <Label className="text-base font-medium">조정 금액</Label>
                  <div className="flex items-center gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => setEstimateData((prev) => ({ ...prev, adjustmentAmount: prev.adjustmentAmount - 5000 }))}
                      className="shrink-0 h-12 w-12"
                    >
                      <Minus className="w-5 h-5" />
                    </Button>
                    <div className="flex-1 relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground">₩</span>
                      <Input
                        type="number"
                        value={estimateData.adjustmentAmount}
                        onChange={(e) => setEstimateData((prev) => ({ ...prev, adjustmentAmount: Number(e.target.value) }))}
                        className="text-center text-lg font-bold h-12 pl-8"
                      />
                    </div>
                    <Button
                      type="button"
                      variant="outline"
                      size="icon"
                      onClick={() => setEstimateData((prev) => ({ ...prev, adjustmentAmount: prev.adjustmentAmount + 5000 }))}
                      className="shrink-0 h-12 w-12"
                    >
                      <Plus className="w-5 h-5" />
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground text-center">
                    음수: 할인 / 양수: 추가 금액
                  </p>
                </div>

                {/* 빠른 선택 버튼 */}
                <div className="grid grid-cols-3 gap-3">
                  {[-10000, -5000, 0, 5000, 10000, 20000].map((amount) => (
                    <button
                      key={amount}
                      onClick={() => setEstimateData((prev) => ({ ...prev, adjustmentAmount: amount }))}
                      className={`py-3 rounded-xl border-2 text-sm font-medium transition-all ${
                        estimateData.adjustmentAmount === amount
                          ? "border-mint bg-mint/10 text-mint"
                          : "border-border hover:border-mint/50"
                      }`}
                    >
                      {amount >= 0 ? "+" : ""}
                      {amount.toLocaleString()}원
                    </button>
                  ))}
                </div>

                {estimateData.adjustmentAmount !== 0 && (
                  <div
                    className={`p-4 rounded-xl border ${
                      estimateData.adjustmentAmount > 0
                        ? "bg-red-50 border-red-200 dark:bg-red-950/20 dark:border-red-900"
                        : "bg-mint/10 border-mint/20"
                    }`}
                  >
                    <p className="text-sm font-medium">
                      {estimateData.adjustmentAmount > 0 ? "추가 금액" : "할인 금액"}:{" "}
                      <span className={estimateData.adjustmentAmount > 0 ? "text-red-500" : "text-mint"}>
                        {estimateData.adjustmentAmount > 0 ? "+" : ""}
                        {estimateData.adjustmentAmount.toLocaleString()}원
                      </span>
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </AnimatedSection>
        )}

        {/* Step 3: Estimate Info */}
        {currentStep === 3 && (
          <AnimatedSection>
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-mint" />
                  견적서 정보 입력
                </CardTitle>
                <p className="text-sm text-muted-foreground break-keep">견적서 이름과 추가 정보를 입력하세요</p>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* 견적서명 입력 */}
                <div className="space-y-2">
                  <Label htmlFor="estimate-name" className="text-sm font-medium">
                    견적서명 <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="estimate-name"
                    placeholder="예: 스튜디오 A 기본 청소"
                    value={estimateData.estimateName}
                    onChange={(e) => setEstimateData((prev) => ({ ...prev, estimateName: e.target.value }))}
                    className="bg-background"
                  />
                </div>

                {/* 특이사항 */}
                <div className="space-y-2">
                  <Label htmlFor="notes" className="text-sm font-medium">
                    특이사항 <span className="text-muted-foreground">(선택)</span>
                  </Label>
                  <Textarea
                    id="notes"
                    placeholder="청소 시 참고해야 할 사항을 입력하세요"
                    value={estimateData.notes}
                    onChange={(e) => setEstimateData((prev) => ({ ...prev, notes: e.target.value }))}
                    className="bg-background min-h-30"
                  />
                </div>

                {/* 기본 견적서 여부 */}
                <div className="flex items-center justify-between p-4 rounded-xl bg-secondary/50">
                  <div>
                    <p className="text-sm font-medium break-keep">기본 견적서로 설정</p>
                    <p className="text-xs text-muted-foreground break-keep">공간당 1개만 지정 가능</p>
                  </div>
                  <Switch
                    checked={estimateData.isDefault}
                    onCheckedChange={(checked) => setEstimateData((prev) => ({ ...prev, isDefault: checked }))}
                    className="data-[state=checked]:bg-mint"
                  />
                </div>
              </CardContent>
            </Card>
          </AnimatedSection>
        )}

        {/* Step 4: Summary */}
        {currentStep === 4 && (
          <AnimatedSection>
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-mint" />
                  견적서 완성
                </CardTitle>
                <p className="text-sm text-muted-foreground break-keep">견적서 정보를 확인하고 저장하세요</p>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* 견적서명 */}
                <div className="p-4 bg-secondary/30 rounded-xl">
                  <p className="text-sm text-muted-foreground mb-1">견적서명</p>
                  <p className="font-semibold text-lg">
                    {estimateData.estimateName || <span className="text-muted-foreground">미입력</span>}
                  </p>
                </div>

                {/* 선택된 항목 */}
                <div className="p-4 bg-secondary/30 rounded-xl">
                  <p className="text-sm text-muted-foreground mb-3 break-keep">선택된 작업 항목</p>
                  {estimateData.selectedItems.length === 0 ? (
                    <p className="text-muted-foreground text-sm">항목을 선택해주세요</p>
                  ) : (
                    <div className="space-y-2">
                      {estimateData.selectedItems.map((itemId) => {
                        const item = CLEANING_ITEMS.find((i) => i.id === itemId)
                        if (!item) return null
                        return (
                          <div key={itemId} className="flex justify-between text-sm">
                            <span>{item.name}</span>
                            <span className="text-muted-foreground">{item.price.toLocaleString()}원</span>
                          </div>
                        )
                      })}
                      {estimateData.adjustmentAmount !== 0 && (
                        <div className="flex justify-between text-sm pt-2 border-t border-dashed border-border">
                          <span>{estimateData.adjustmentAmount > 0 ? "추가 금액" : "할인 금액"}</span>
                          <span className={estimateData.adjustmentAmount > 0 ? "text-red-500" : "text-mint"}>
                            {estimateData.adjustmentAmount > 0 ? "+" : ""}
                            {estimateData.adjustmentAmount.toLocaleString()}원
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* 총 금액 및 시간 */}
                <div className="p-5 bg-mint/10 rounded-2xl border border-mint/20 space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">예상 소요시간</span>
                    <span className="text-lg font-semibold flex items-center gap-2">
                      <Clock className="w-4 h-4 text-mint" />
                      {formatTime(totalTime)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">총 작업 금액</span>
                    <span className="text-2xl font-bold text-mint">{totalPrice.toLocaleString()}원</span>
                  </div>
                </div>

                {/* 특이사항 */}
                {estimateData.notes && (
                  <div className="p-4 bg-secondary/30 rounded-xl">
                    <p className="text-sm text-muted-foreground mb-1">특이사항</p>
                    <p className="text-sm">{estimateData.notes}</p>
                  </div>
                )}

                {/* 기본 견적서 표시 */}
                {estimateData.isDefault && (
                  <div className="flex items-center gap-2 text-mint">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm font-medium">기본 견적서로 설정됨</span>
                  </div>
                )}
              </CardContent>
            </Card>
          </AnimatedSection>
        )}

        {/* Bottom Price Summary & Navigation */}
        <div className="mt-6 p-4 bg-card border border-border rounded-2xl sticky bottom-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <Button
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="w-full sm:w-auto bg-transparent"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              이전
            </Button>

            <div className="text-center">
              <div className="text-2xl font-bold text-mint">{totalPrice.toLocaleString()}원</div>
              <div className="text-xs text-muted-foreground flex items-center justify-center gap-1">
                <Clock className="w-3 h-3" />
                예상 {formatTime(totalTime)}
              </div>
            </div>

            {currentStep < 4 ? (
              <Button
                onClick={nextStep}
                disabled={!canProceed()}
                className="w-full sm:w-auto bg-mint hover:bg-mint/90 text-white"
              >
                다음
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button
                disabled={!canSave}
                onClick={() => setIsQuoteModalOpen(true)}
                className="w-full sm:w-auto bg-mint hover:bg-mint/90 text-white"
              >
                <FileText className="w-4 h-4 mr-2" />
                견적서 확인
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Quote Modal */}
      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        totalPrice={totalPrice}
        totalTime={totalTime}
        estimateName={estimateData.estimateName}
        onPayment={() => {
          alert("결제 기능은 추후 구현 예정입니다.")
        }}
      />
    </main>
  )
}
