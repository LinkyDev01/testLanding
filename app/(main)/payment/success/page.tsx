import { Suspense } from "react";
import PaymentSuccessView from "@/components/platform/payment/ui/success-view";

export default function PaymentSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <div className="w-8 h-8 border-[3px] border-[#00C896] border-t-transparent rounded-full animate-spin" />
            <p className="text-[#666666]">결제를 확인하고 있습니다...</p>
          </div>
        </div>
      }
    >
      <PaymentSuccessView />
    </Suspense>
  );
}
