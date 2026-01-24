"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, ArrowRight, Calculator, Check, Clock, Sparkles, AlertCircle, FileText } from "lucide-react"
import Link from "next/link"
import { AnimatedSection } from "@/components/animated-section"
import { QuoteModal } from "@/components/platform/quote/quote-modal"
import { useRouter } from "next/navigation";

type PackageType = "basic" | "standard" | "premium"

interface PricingData {
  estimateName: string
  packageType: PackageType
  areaSize: number
  additionalOptions: string[]
  customRequests: Array<{ name: string; price: number }>
  notes: string
  isDefault: boolean
}

const packages = {
  basic: {
    name: "Basic",
    price: 12000,
    description: "청소 뉴비",
    features: ["청소 매뉴얼 제공", "소품 원위치", "테이블 정리 및 닦기", "바닥 쓰레기 정리", "일회용품 보충"],
    time: 30, // 분
    areaMultiplier: 200,
  },
  standard: {
    name: "Standard",
    price: 18000,
    description: "청소 중급자",
    features: ["Basic 모든 기능", "바닥 청소기", "설거지 점검(식기 오염 제거)", "화장실 정리", "분리수거"],
    time: 60,
    areaMultiplier: 500,
    popular: true,
  },
  premium: {
    name: "Premium",
    price: 35000,
    description: "청소 마스터",
    features: ["Standard 모든 기능", "어질러진 공간 대청소"],
    time: 120,
    areaMultiplier: 1000,
  },
}

const additionalOptions = [
  { id: "floor_cleaning", name: "바닥 청소기", price: 2000, time: 10 },
  { id: "trash_separation", name: "분리수거", price: 3000, time: 15 },
  { id: "dishes", name: "설거지", price: 3000, time: 20 },
  { id: "toilet_cleaning", name: "화장실 정리", price: 2000, time: 15 },
  { id: "mop_cleaning", name: "바닥 물걸레", price: 2000, time: 15 },
  { id: "window_cleaning", name: "창문 청소", price: 5000, time: 20 },
  { id: "bedding_change", name: "침구 교체", price: 5000, time: 15 },
  { id: "urgent_24h", name: "24시간 내 요청", price: 5000, time: 0 },
  { id: "urgent_4h", name: "4시간 내 긴급 요청", price: 10000, time: 0 },
]

export default function CalculatorPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false)
  const [pricingData, setPricingData] = useState<PricingData>({
    estimateName: "",
    packageType: "standard",
    areaSize: 10,
    additionalOptions: [],
    customRequests: [],
    notes: "",
    isDefault: false,
  })

  const router = useRouter();

  const calculatePrice = () => {
    let totalPrice = packages[pricingData.packageType].price

    // 평수 추가 비용 (10평 초과 시)
    const areaExtra = pricingData.areaSize - 10
    if (areaExtra > 0) {
      totalPrice += areaExtra * packages[pricingData.packageType].areaMultiplier
    }

    // 추가 옵션
    const selectedOptions = additionalOptions.filter((option) => pricingData.additionalOptions.includes(option.id))
    totalPrice += selectedOptions.reduce((sum, option) => sum + option.price, 0)

    // 커스텀 요청
    totalPrice += pricingData.customRequests.reduce((sum, request) => sum + request.price, 0)

    return totalPrice
  }

  const calculateTime = () => {
    let totalTime = packages[pricingData.packageType].time

    // 평수 추가 시간 (10평 초과 시 평당 5분 추가)
    const areaExtra = pricingData.areaSize - 10
    if (areaExtra > 0) {
      totalTime += areaExtra * 5
    }

    // 추가 옵션 시간
    const selectedOptions = additionalOptions.filter((option) => pricingData.additionalOptions.includes(option.id))
    totalTime += selectedOptions.reduce((sum, option) => sum + option.time, 0)

    return totalTime
  }

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    if (hours === 0) return `${mins}분`
    if (mins === 0) return `${hours}시간`
    return `${hours}시간 ${mins}분`
  }

  const toggleAdditionalOption = (optionId: string) => {
    setPricingData((prev) => ({
      ...prev,
      additionalOptions: prev.additionalOptions.includes(optionId)
        ? prev.additionalOptions.filter((id) => id !== optionId)
        : [...prev.additionalOptions, optionId],
    }))
  }

  const addCustomRequest = () => {
    setPricingData((prev) => ({
      ...prev,
      customRequests: [...prev.customRequests, { name: "", price: 0 }],
    }))
  }

  const updateCustomRequest = (index: number, field: "name" | "price", value: string | number) => {
    setPricingData((prev) => ({
      ...prev,
      customRequests: prev.customRequests.map((request, i) => (i === index ? { ...request, [field]: value } : request)),
    }))
  }

  const removeCustomRequest = (index: number) => {
    setPricingData((prev) => ({
      ...prev,
      customRequests: prev.customRequests.filter((_, i) => i !== index),
    }))
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
    if (currentStep === 1) return true
    if (currentStep === 2) return true
    if (currentStep === 3) return true
    return true
  }

  const canSave = pricingData.estimateName.trim() !== ""

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
              <Calculator className="w-5 h-5 text-[#00C896]" />
              <span className="font-semibold">Linky 요금 계산기</span>
            </div>
            <div className="w-20" />
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Bar */}
        <AnimatedSection className="mb-8 max-w-[500px] mx-auto">
          <div className="flex items-center justify-center">
            {[1, 2, 3, 4].map((step) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                    step < currentStep
                      ? "bg-[#00C896] text-white"
                      : step === currentStep
                        ? "bg-[#00C896] text-white ring-4 ring-[#00C896]/20"
                        : "bg-secondary text-muted-foreground"
                  }`}
                >
                  {step < currentStep ? <Check className="w-5 h-5" /> : step}
                </div>
                {step < 4 && (
                  <div
                    className={`w-16 sm:w-24 h-1 mx-1 sm:mx-2 rounded transition-colors duration-300 ${
                      step < currentStep ? "bg-[#00C896]" : "bg-secondary"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2 text-xs text-muted-foreground px-2">
            <span>패키지</span>
            <span>공간</span>
            <span>옵션</span>
            <span>완료</span>
          </div>
        </AnimatedSection>

        {/* Step 1: Package Selection */}
        {currentStep === 1 && (
          <AnimatedSection>
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-[#00C896]" />
                  서비스 패키지 선택
                </CardTitle>
                <p className="text-sm text-muted-foreground break-keep">청소 난이도와 범위에 맞는 패키지를 선택하세요</p>
              </CardHeader>
              <CardContent className="space-y-4">
                {(Object.entries(packages) as [PackageType, (typeof packages)[PackageType]][]).map(([type, pkg]) => (
                  <div
                    key={type}
                    className={`relative p-5 border-2 rounded-2xl cursor-pointer transition-all duration-300 ${
                      pricingData.packageType === type
                        ? "border-[#00C896] bg-[#00C896]/5 shadow-lg"
                        : "border-border hover:border-[#00C896]/50 hover:shadow-md"
                    }`}
                    onClick={() => setPricingData((prev) => ({ ...prev, packageType: type }))}
                  >
                    {"popular" in pkg && pkg.popular && (
                      <div className="absolute -top-3 left-4 px-3 py-1 bg-[#00C896] text-white text-xs font-medium rounded-full">
                        인기
                      </div>
                    )}
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="font-bold text-lg">{pkg.name}</h3>
                          <span className="text-sm text-muted-foreground break-keep">· {pkg.description}</span>
                        </div>
                        <div className="flex flex-wrap gap-2 mt-3">
                          {pkg.features.map((feature, idx) => (
                            <span key={idx} className="px-2 py-1 bg-secondary text-xs rounded-lg text-muted-foreground break-keep">
                              {feature}
                            </span>
                          ))}
                        </div>
                        <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />약 {formatTime(pkg.time)}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-[#00C896]">₩{pkg.price.toLocaleString()}</div>
                        <div className="text-xs text-muted-foreground">기본 10평 기준</div>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </AnimatedSection>
        )}

        {/* Step 2: Area Size */}
        {currentStep === 2 && (
          <AnimatedSection>
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#00C896]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
                    />
                  </svg>
                  공간 크기 설정
                </CardTitle>
                <p className="text-sm text-muted-foreground break-keep">
                  청소할 공간의 연면적을 설정하세요 (10평 초과 시 평당 추가 요금)
                </p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-4">
                    <Label className="text-base font-medium">연면적</Label>
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        min="10"
                        max="100"
                        value={pricingData.areaSize}
                        onChange={(e) =>
                          setPricingData((prev) => ({
                            ...prev,
                            areaSize: Math.max(10, Math.min(100, Number.parseInt(e.target.value) || 10)),
                          }))
                        }
                        className="w-20 text-center font-bold text-lg"
                      />
                      <span className="text-muted-foreground">평</span>
                    </div>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={pricingData.areaSize}
                    onChange={(e) => setPricingData((prev) => ({ ...prev, areaSize: Number.parseInt(e.target.value) }))}
                    className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer accent-[#00C896]"
                  />
                  <div className="flex justify-between text-sm text-muted-foreground mt-2">
                    <span>10평</span>
                    <span>50평</span>
                    <span>100평</span>
                  </div>
                </div>

                {pricingData.areaSize > 10 && (
                  <div className="p-4 bg-[#00C896]/10 rounded-xl border border-[#00C896]/20">
                    <div className="flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-[#00C896] shrink-0 mt-0.5" />
                      <div>
                        <p className="font-medium text-sm break-keep">평수 추가 요금</p>
                        <p className="text-sm text-muted-foreground mt-1 break-keep">
                          {pricingData.areaSize - 10}평 추가 × ₩
                          {packages[pricingData.packageType].areaMultiplier.toLocaleString()} ={" "}
                          <span className="font-semibold text-[#00C896]">
                            ₩
                            {(
                              (pricingData.areaSize - 10) *
                              packages[pricingData.packageType].areaMultiplier
                            ).toLocaleString()}
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-3 gap-3">
                  {[10, 20, 30].map((size) => (
                    <button
                      key={size}
                      onClick={() => setPricingData((prev) => ({ ...prev, areaSize: size }))}
                      className={`py-3 rounded-xl border-2 text-sm font-medium transition-all ${
                        pricingData.areaSize === size
                          ? "border-[#00C896] bg-[#00C896]/10 text-[#00C896]"
                          : "border-border hover:border-[#00C896]/50"
                      }`}
                    >
                      {size}평
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </AnimatedSection>
        )}

        {/* Step 3: Additional Options */}
        {currentStep === 3 && (
          <AnimatedSection>
            <Card className="border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-[#00C896]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                  추가 옵션 선택
                </CardTitle>
                <p className="text-sm text-muted-foreground break-keep">필요한 추가 서비스를 선택하세요 (선택사항)</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {additionalOptions.map((option) => (
                    <div
                      key={option.id}
                      className={`flex items-center gap-3 p-4 border-2 rounded-xl cursor-pointer transition-all ${
                        pricingData.additionalOptions.includes(option.id)
                          ? "border-[#00C896] bg-[#00C896]/5"
                          : "border-border hover:border-[#00C896]/50"
                      }`}
                      onClick={() => toggleAdditionalOption(option.id)}
                    >
                      <Checkbox
                        checked={pricingData.additionalOptions.includes(option.id)}
                        onCheckedChange={() => toggleAdditionalOption(option.id)}
                        className="data-[state=checked]:bg-[#00C896] data-[state=checked]:border-[#00C896]"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-sm break-keep">{option.name}</p>
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span>+₩{option.price.toLocaleString()}</span>
                          {option.time > 0 && (
                            <>
                              <span>·</span>
                              <span>+{option.time}분</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Custom Requests */}
                <div className="pt-4 border-t border-border">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="font-medium break-keep">추가 요청 사항</h4>
                      <p className="text-xs text-muted-foreground break-keep">별도의 작업이 필요하면 추가하세요</p>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={addCustomRequest}
                      className="text-[#00C896] border-[#00C896] hover:bg-[#00C896]/10 bg-transparent"
                    >
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                      항목 추가
                    </Button>
                  </div>
                  {pricingData.customRequests.length > 0 && (
                    <div className="space-y-3">
                      {pricingData.customRequests.map((request, index) => (
                        <div key={index} className="flex gap-2">
                          <Input
                            placeholder="작업 내용"
                            value={request.name}
                            onChange={(e) => updateCustomRequest(index, "name", e.target.value)}
                            className="flex-1"
                          />
                          <div className="relative">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">
                              ₩
                            </span>
                            <Input
                              type="number"
                              placeholder="가격"
                              value={request.price || ""}
                              onChange={(e) =>
                                updateCustomRequest(index, "price", Number.parseInt(e.target.value) || 0)
                              }
                              className="w-28 pl-7"
                            />
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeCustomRequest(index)}
                            className="shrink-0 text-muted-foreground hover:text-destructive"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
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
                  <Check className="w-5 h-5 text-[#00C896]" />
                  견적서 완성
                </CardTitle>
                <p className="text-sm text-muted-foreground break-keep">견적서 정보를 확인하고 저장하세요</p>
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
                    value={pricingData.estimateName}
                    onChange={(e) => setPricingData((prev) => ({ ...prev, estimateName: e.target.value }))}
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
                    value={pricingData.notes}
                    onChange={(e) => setPricingData((prev) => ({ ...prev, notes: e.target.value }))}
                    className="bg-background min-h-[80px]"
                  />
                </div>

                {/* 견적 상세 내역 */}
                <div className="p-5 bg-secondary/30 rounded-2xl space-y-3">
                  <h4 className="font-semibold mb-4 break-keep">견적 상세 내역</h4>

                  <div className="flex justify-between text-sm">
                    <span>{packages[pricingData.packageType].name} 패키지</span>
                    <span>₩{packages[pricingData.packageType].price.toLocaleString()}</span>
                  </div>

                  {pricingData.areaSize > 10 && (
                    <div className="flex justify-between text-sm">
                      <span>평수 추가 ({pricingData.areaSize - 10}평)</span>
                      <span>
                        ₩
                        {(
                          (pricingData.areaSize - 10) *
                          packages[pricingData.packageType].areaMultiplier
                        ).toLocaleString()}
                      </span>
                    </div>
                  )}

                  {pricingData.additionalOptions.map((optionId) => {
                    const option = additionalOptions.find((opt) => opt.id === optionId)
                    return option ? (
                      <div key={optionId} className="flex justify-between text-sm">
                        <span>{option.name}</span>
                        <span>₩{option.price.toLocaleString()}</span>
                      </div>
                    ) : null
                  })}

                  {pricingData.customRequests
                    .filter((req) => req.name && req.price > 0)
                    .map((request, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span>{request.name}</span>
                        <span>₩{request.price.toLocaleString()}</span>
                      </div>
                    ))}

                  <div className="border-t border-border pt-3 mt-3 flex justify-between font-bold text-lg">
                    <span>총 예상 금액</span>
                    <span className="text-[#00C896]">₩{totalPrice.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>예상 소요시간</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {formatTime(totalTime)}
                    </span>
                  </div>
                </div>
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
              <div className="text-2xl font-bold text-[#00C896]">₩{totalPrice.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground flex items-center justify-center gap-1">
                <Clock className="w-3 h-3" />
                예상 {formatTime(totalTime)}
              </div>
            </div>

            {currentStep < 4 ? (
              <Button
                onClick={nextStep}
                disabled={!canProceed()}
                className="w-full sm:w-auto bg-[#00C896] hover:bg-[#00B085] text-white"
              >
                다음
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button
                disabled={!canSave}
                onClick={() => setIsQuoteModalOpen(true)}
                className="w-full sm:w-auto bg-[#00C896] hover:bg-[#00B085] text-white"
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
        estimateName={pricingData.estimateName}
        packageName={pricingData.packageType}
        areaSize={pricingData.areaSize}
        onPayment={() => {
          // 결제 페이지로 이동
          const params = new URLSearchParams({
            package: pricingData.packageType,
            amount: totalPrice.toString(),
            area: pricingData.areaSize.toString(),
          });
          router.push(`/payment/checkout?${params.toString()}`);
        }}
      />
    </main>
  )
}
