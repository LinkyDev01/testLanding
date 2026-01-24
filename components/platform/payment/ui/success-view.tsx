"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";

// 시크릿 키 (서버 사이드에서만 사용해야 함 - 실제로는 API Route에서 처리)
const TOSS_SECRET_KEY =
  process.env.TOSS_SECRET_KEY || "test_sk_zXLkKEypNArWmo50nX3lmeaxYG5R";

interface PaymentConfirmResponse {
  paymentKey: string;
  orderId: string;
  status: string;
  totalAmount: number;
  method: string;
  requestedAt: string;
  approvedAt: string;
  orderName: string;
}

export default function PaymentSuccessView() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const paymentKey = searchParams.get("paymentKey");
  const orderId = searchParams.get("orderId");
  const amount = searchParams.get("amount");

  const [isLoading, setIsLoading] = useState(true);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [paymentInfo, setPaymentInfo] = useState<PaymentConfirmResponse | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const confirmPayment = async () => {
      if (!paymentKey || !orderId || !amount) {
        setError("결제 정보가 올바르지 않습니다.");
        setIsLoading(false);
        return;
      }

      try {
        // 실제로는 서버 API Route를 통해 결제 승인을 처리해야 합니다
        const response = await fetch("/api/payment/confirm", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            paymentKey,
            orderId,
            amount: parseInt(amount),
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "결제 승인에 실패했습니다.");
        }

        const data = await response.json();
        console.log("결제 승인 성공:", data);
        setPaymentInfo(data);
        setIsConfirmed(true);
      } catch (err) {
        console.error("결제 승인 실패:", err);
        // 테스트 모드에서는 성공으로 처리
        if (process.env.NODE_ENV === "development") {
          console.log("결제 승인 에러 발생, 개발 모드 fallback 사용:", err);
          setPaymentInfo({
            paymentKey: paymentKey || "",
            orderId: orderId || "",
            status: "DONE",
            totalAmount: parseInt(amount || "0"),
            method: "토스페이",
            requestedAt: new Date().toISOString(),
            approvedAt: new Date().toISOString(),
            orderName: "Linky 서비스",
          });
          setIsConfirmed(true);
        } else {
          setError(
            err instanceof Error ? err.message : "결제 승인에 실패했습니다."
          );
        }
      } finally {
        setIsLoading(false);
      }
    };

    confirmPayment();
  }, [paymentKey, orderId, amount]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-[3px] border-[#00C896] border-t-transparent rounded-full animate-spin" />
          <p className="text-[#666666]">결제를 확인하고 있습니다...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center p-5">
        <div className="max-w-[400px] w-full text-center">
          <div className="w-20 h-20 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
            <svg
              className="w-10 h-10 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-[#05182F] mb-2">
            결제 승인 실패
          </h1>
          <p className="text-[#666666] mb-6">{error}</p>
          <Link
            href="/pricing"
            className="inline-block px-6 py-3 bg-[#00C896] text-white rounded-lg font-semibold hover:-translate-y-0.5 transition-all"
          >
            다시 시도하기
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5] pt-10 pb-20">
      <div className="max-w-[500px] mx-auto p-5">
        {/* 성공 아이콘 */}
        <div className="text-center mb-8">
          <div className="w-24 h-24 mx-auto mb-6 bg-[#00C896] rounded-full flex items-center justify-center animate-[bounceIn_0.5s_ease-out]">
            <svg
              className="w-12 h-12 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-[#05182F] mb-2">
            결제가 완료되었습니다!
          </h1>
          <p className="text-[#666666]">
            곧 카카오톡으로 상담사가 연락드릴 예정입니다.
          </p>
        </div>

        {/* 결제 정보 */}
        <div className="bg-white rounded-xl p-6 shadow-sm mb-4">
          <h2 className="text-base font-bold text-[#05182F] mb-4 pb-4 border-b border-[#E2E8F0]">
            결제 정보
          </h2>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-[#666666]">주문번호</span>
              <span className="font-medium text-[#05182F] font-mono text-xs">
                {paymentInfo?.orderId}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#666666]">서비스</span>
              <span className="font-medium text-[#05182F]">
                {paymentInfo?.orderName}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#666666]">결제 수단</span>
              <span className="font-medium text-[#05182F]">
                {paymentInfo?.method || "정보 없음"}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[#666666]">결제 일시</span>
              <span className="font-medium text-[#05182F]">
                {paymentInfo?.approvedAt
                  ? new Date(paymentInfo.approvedAt).toLocaleString("ko-KR")
                  : "-"}
              </span>
            </div>
            <div className="flex justify-between pt-3 border-t border-[#E2E8F0]">
              <span className="font-semibold text-[#05182F]">결제 금액</span>
              <span className="font-bold text-[#00C896] text-lg">
                {paymentInfo?.totalAmount.toLocaleString()}원
              </span>
            </div>
          </div>
        </div>

        {/* 안내 사항 */}
        <div className="bg-gradient-to-br from-[#FFF9E6] to-[#FFF5D6] border border-[#F5E100] rounded-xl p-5 mb-6">
          <h3 className="text-sm font-bold text-[#5A4A00] mb-3 flex items-center gap-2">
            📋 다음 단계 안내
          </h3>
          <ul className="text-xs text-[#5A4A00] space-y-2 leading-relaxed">
            <li className="flex items-start gap-2">
              <span className="w-5 h-5 bg-[#F5E100] rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">
                1
              </span>
              <span>상담사가 카카오톡으로 연락드립니다 (영업일 기준 1시간 내)</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-5 h-5 bg-[#F5E100] rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">
                2
              </span>
              <span>서비스 일정 및 상세 요청사항을 확정합니다</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="w-5 h-5 bg-[#F5E100] rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5">
                3
              </span>
              <span>확정된 일정에 전문 파트너가 방문하여 서비스를 제공합니다</span>
            </li>
          </ul>
        </div>

        {/* 버튼 그룹 */}
        <div className="space-y-3">
          <a
            href="https://pf.kakao.com/_cuWDn"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-4 bg-[#FEE500] text-[#3A1D1D] rounded-xl text-base font-bold transition-all hover:-translate-y-0.5 hover:shadow-lg"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 3C6.48 3 2 6.584 2 10.92c0 2.711 1.746 5.098 4.395 6.51-.19.705-.688 2.545-.788 2.936-.125.488.18.483.378.351.155-.103 2.466-1.665 3.464-2.334.512.075 1.038.117 1.551.117 5.52 0 10-3.584 10-7.92S17.52 3 12 3z" />
            </svg>
            카카오톡 채널 바로가기
          </a>

          <Link
            href="/"
            className="flex items-center justify-center w-full py-4 bg-white text-[#666666] border border-[#E2E8F0] rounded-xl text-base font-semibold transition-all hover:bg-[#F5F5F5]"
          >
            홈으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
}
