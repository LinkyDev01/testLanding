"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function PaymentFailView() {
  const searchParams = useSearchParams();

  const errorCode = searchParams.get("code");
  const errorMessage = searchParams.get("message");
  const orderId = searchParams.get("orderId");

  // 에러 코드별 사용자 친화적 메시지
  const getErrorDescription = (code: string | null) => {
    switch (code) {
      case "PAY_PROCESS_CANCELED":
        return "결제가 취소되었습니다.";
      case "PAY_PROCESS_ABORTED":
        return "결제 진행 중 문제가 발생했습니다.";
      case "REJECT_CARD_COMPANY":
        return "카드사에서 결제를 거절했습니다.";
      case "INVALID_CARD_NUMBER":
        return "카드 정보가 올바르지 않습니다.";
      case "INVALID_CARD_EXPIRY":
        return "카드 유효기간이 만료되었습니다.";
      case "EXCEED_MAX_DAILY_PAYMENT_COUNT":
        return "일일 결제 한도를 초과했습니다.";
      case "EXCEED_MAX_PAYMENT_AMOUNT":
        return "결제 금액 한도를 초과했습니다.";
      case "NOT_SUPPORTED_CARD_TYPE":
        return "지원하지 않는 카드입니다.";
      default:
        return errorMessage || "결제 처리 중 오류가 발생했습니다.";
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-5">
      <div className="max-w-[400px] w-full text-center">
        {/* 실패 아이콘 */}
        <div className="w-24 h-24 mx-auto mb-6 bg-red-100 rounded-full flex items-center justify-center">
          <svg
            className="w-12 h-12 text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        </div>

        <h1 className="text-2xl font-bold text-[#05182F] mb-2">
          결제에 실패했습니다
        </h1>
        <p className="text-[#666666] mb-6">{getErrorDescription(errorCode)}</p>

        {/* 에러 상세 정보 */}
        {(errorCode || orderId) && (
          <div className="bg-[#F5F5F5] rounded-lg p-4 mb-6 text-left">
            <p className="text-xs text-[#94A3B8] mb-2">오류 정보</p>
            {errorCode && (
              <p className="text-sm text-[#666666]">
                <span className="font-medium">에러 코드:</span> {errorCode}
              </p>
            )}
            {orderId && (
              <p className="text-sm text-[#666666] mt-1">
                <span className="font-medium">주문 번호:</span>{" "}
                <span className="font-mono text-xs">{orderId}</span>
              </p>
            )}
          </div>
        )}

        {/* 도움말 */}
        <div className="bg-[rgba(184,234,221,0.2)] border-l-4 border-[#00C896] rounded-lg p-4 mb-6 text-left">
          <p className="text-xs text-[#05182F] leading-relaxed">
            💡 결제 문제가 계속되면 아래 방법을 시도해보세요:
          </p>
          <ul className="text-xs text-[#666666] mt-2 space-y-1">
            <li>• 다른 카드로 결제 시도</li>
            <li>• 카드사 앱에서 결제 한도 확인</li>
            <li>• 브라우저 캐시 삭제 후 재시도</li>
          </ul>
        </div>

        {/* 버튼 그룹 */}
        <div className="space-y-3">
          <Link
            href="/pricing"
            className="flex items-center justify-center w-full py-4 bg-[#00C896] text-white rounded-xl text-base font-bold transition-all hover:-translate-y-0.5 hover:shadow-[0_6px_20px_rgba(0,200,150,0.4)]"
          >
            다시 시도하기
          </Link>

          <a
            href="https://pf.kakao.com/_cuWDn"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 w-full py-4 bg-[#FEE500] text-[#3A1D1D] rounded-xl text-base font-semibold transition-all hover:-translate-y-0.5"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 3C6.48 3 2 6.584 2 10.92c0 2.711 1.746 5.098 4.395 6.51-.19.705-.688 2.545-.788 2.936-.125.488.18.483.378.351.155-.103 2.466-1.665 3.464-2.334.512.075 1.038.117 1.551.117 5.52 0 10-3.584 10-7.92S17.52 3 12 3z" />
            </svg>
            문의하기
          </a>

          <Link
            href="/"
            className="flex items-center justify-center w-full py-3 text-[#666666] text-sm transition-colors hover:text-[#05182F]"
          >
            홈으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
}
