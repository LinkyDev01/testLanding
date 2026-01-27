"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import {
  loadPaymentWidget,
  PaymentWidgetInstance,
} from "@tosspayments/payment-widget-sdk";
import { nanoid } from "nanoid";

// 테스트용 클라이언트 키 (비회원 결제용)
const TOSS_CLIENT_KEY = "test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm";

const packageNames: Record<string, string> = {
  basic: "Basic - 간단한 정리",
  standard: "Standard - 파티룸 정리",
  premium: "Premium - 토탈 케어",
};

export default function CheckoutView() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  // URL 파라미터에서 결제 정보 가져오기
  const packageType = searchParams.get("package") || "standard";
  const amount = parseInt(searchParams.get("amount") || "22000");
  const areaSize = searchParams.get("area") || "10";

  const paymentWidgetRef = useRef<PaymentWidgetInstance | null>(null);
  const paymentMethodsWidgetRef = useRef<ReturnType<
    PaymentWidgetInstance["renderPaymentMethods"]
  > | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // 고객 정보 상태
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");

  useEffect(() => {
    const initPaymentWidget = async () => {
      try {
        setIsLoading(true);
        const customerKey = `ANONYMOUS_${nanoid()}`;
        
        const paymentWidget = await loadPaymentWidget(
          TOSS_CLIENT_KEY,
          customerKey
        );

        paymentWidgetRef.current = paymentWidget;

        // 결제 수단 위젯 렌더링
        const paymentMethodsWidget = paymentWidget.renderPaymentMethods(
          "#payment-methods",
          { value: amount },
          { variantKey: "DEFAULT" }
        );

        paymentMethodsWidgetRef.current = paymentMethodsWidget;

        // 이용약관 위젯 렌더링
        paymentWidget.renderAgreement("#agreement", {
          variantKey: "AGREEMENT",
        });

        setIsReady(true);
      } catch (error) {
        console.error("결제 위젯 초기화 실패:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initPaymentWidget();
  }, [amount]);

  // 결제 요청
  const handlePayment = async () => {
    if (!paymentWidgetRef.current) {
      alert("결제 위젯이 준비되지 않았습니다.");
      return;
    }

    if (!customerName.trim()) {
      alert("이름을 입력해주세요.");
      return;
    }

    if (!customerPhone.trim()) {
      alert("연락처를 입력해주세요.");
      return;
    }

    setIsProcessing(true);

    try {
      const orderId = nanoid();
      const orderName =
        packageNames[packageType] + ` (${areaSize}평)`;

      await paymentWidgetRef.current.requestPayment({
        orderId,
        orderName,
        customerName: customerName.trim(),
        customerEmail: customerEmail.trim() || undefined,
        customerMobilePhone: customerPhone.replace(/-/g, ""),
        successUrl: `${window.location.origin}/payment/success`,
        failUrl: `${window.location.origin}/payment/fail`,
      });
    } catch (error) {
      console.error("결제 요청 실패:", error);
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F5] pt-20">
      {/* 헤더 */}
      <div className="fixed top-0 left-0 right-0 bg-white border-b border-[#E2E8F0] py-4 px-5 z-[100]">
        <div className="max-w-[600px] mx-auto flex items-center">
          <button
            onClick={() => router.back()}
            className="p-2 -ml-2 text-[#666666] hover:text-[#05182F]"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
          </button>
          <h1 className="flex-1 text-center text-lg font-bold text-[#05182F] pr-8">
            결제하기
          </h1>
        </div>
      </div>

      <div className="max-w-[600px] mx-auto p-5">
        {/* 주문 정보 */}
        <div className="bg-white rounded-xl p-5 mb-4 shadow-sm">
          <h2 className="text-base font-bold text-[#05182F] mb-4">주문 정보</h2>
          
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-[#666666]">서비스</span>
              <span className="font-medium text-[#05182F]">
                {packageNames[packageType]}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#666666]">공간 크기</span>
              <span className="font-medium text-[#05182F]">{areaSize}평</span>
            </div>
            <div className="flex justify-between pt-3 border-t border-[#E2E8F0]">
              <span className="font-semibold text-[#05182F]">결제 금액</span>
              <span className="font-bold text-[#00C896] text-lg">
                {amount.toLocaleString()}원
              </span>
            </div>
          </div>
        </div>

        {/* 고객 정보 입력 */}
        <div className="bg-white rounded-xl p-5 mb-4 shadow-sm">
          <h2 className="text-base font-bold text-[#05182F] mb-4">고객 정보</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#05182F] mb-1.5">
                이름 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                placeholder="홍길동"
                className="w-full px-4 py-3 border border-[#E2E8F0] rounded-lg text-sm outline-none transition-colors focus:border-[#00C896]"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-[#05182F] mb-1.5">
                연락처 <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                placeholder="010-1234-5678"
                className="w-full px-4 py-3 border border-[#E2E8F0] rounded-lg text-sm outline-none transition-colors focus:border-[#00C896]"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-[#05182F] mb-1.5">
                이메일 <span className="text-[#94A3B8]">(선택)</span>
              </label>
              <input
                type="email"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                placeholder="example@email.com"
                className="w-full px-4 py-3 border border-[#E2E8F0] rounded-lg text-sm outline-none transition-colors focus:border-[#00C896]"
              />
            </div>
          </div>
        </div>

        {/* 결제 수단 위젯 */}
        <div className="bg-white rounded-xl p-5 mb-4 shadow-sm">
          <h2 className="text-base font-bold text-[#05182F] mb-4">결제 수단</h2>
          
          {isLoading ? (
            <div className="flex items-center justify-center py-10">
              <div className="flex flex-col items-center gap-3">
                <div className="w-8 h-8 border-[3px] border-[#00C896] border-t-transparent rounded-full animate-spin" />
                <p className="text-sm text-[#666666]">
                  결제 수단을 불러오는 중...
                </p>
              </div>
            </div>
          ) : (
            <div id="payment-methods" className="min-h-[300px]" />
          )}
        </div>

        {/* 이용약관 위젯 */}
        <div className="bg-white rounded-xl p-5 mb-4 shadow-sm">
          <div id="agreement" className="min-h-[50px]" />
        </div>

        {/* 안내 문구 */}
        <div className="bg-[rgba(184,234,221,0.2)] border-l-4 border-[#00C896] rounded-lg p-4 mb-6">
          <p className="text-xs text-[#05182F] leading-relaxed">
            💡 결제 완료 후 카카오톡 채널을 통해 상담사가 연락드립니다.
            <br />
            서비스 일정은 상담 후 확정됩니다.
          </p>
        </div>

        {/* 결제 버튼 */}
        <button
          onClick={handlePayment}
          disabled={!isReady || isProcessing}
          className="w-full py-4 bg-[#00C896] text-white rounded-xl text-base font-bold transition-all hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(0,200,150,0.4)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none disabled:hover:shadow-none"
        >
          {isProcessing ? (
            <span className="flex items-center justify-center gap-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              결제 처리 중...
            </span>
          ) : (
            `${amount.toLocaleString()}원 결제하기`
          )}
        </button>

        {/* 하단 여백 */}
        <div className="h-10" />
      </div>
    </div>
  );
}
