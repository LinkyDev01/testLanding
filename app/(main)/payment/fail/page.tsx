import { Suspense } from "react";
import PaymentFailView from "@/src/views/payment/ui/fail-view";

export default function PaymentFailPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-8 h-8 border-[3px] border-[#00C896] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <PaymentFailView />
    </Suspense>
  );
}
