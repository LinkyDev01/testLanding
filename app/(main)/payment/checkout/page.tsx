import { Suspense } from "react";
import CheckoutView from "@/components/platform/payment/ui/checkout-view"

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <div className="w-8 h-8 border-[3px] border-[#00C896] border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <CheckoutView />
    </Suspense>
  );
}
