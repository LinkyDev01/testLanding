import { NextRequest, NextResponse } from "next/server";

// 테스트용 시크릿 키
const TOSS_SECRET_KEY = "test_sk_zXLkKEypNArWmo50nX3lmeaxYG5R";

export async function POST(request: NextRequest) {
  try {
    const { paymentKey, orderId, amount } = await request.json();

    // 필수 파라미터 검증
    if (!paymentKey || !orderId || !amount) {
      return NextResponse.json(
        { message: "필수 파라미터가 누락되었습니다." },
        { status: 400 }
      );
    }

    // 토스페이먼츠 결제 승인 API 호출
    const response = await fetch(
      "https://api.tosspayments.com/v1/payments/confirm",
      {
        method: "POST",
        headers: {
          Authorization: `Basic ${Buffer.from(TOSS_SECRET_KEY + ":").toString(
            "base64"
          )}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          paymentKey,
          orderId,
          amount,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("토스페이먼츠 결제 승인 실패:", data);
      return NextResponse.json(
        {
          message: data.message || "결제 승인에 실패했습니다.",
          code: data.code,
        },
        { status: response.status }
      );
    }

    // 결제 성공 시 DB에 저장하는 로직 추가 가능
    // await savePaymentToDatabase(data);

    return NextResponse.json(data);
  } catch (error) {
    console.error("결제 승인 API 오류:", error);
    return NextResponse.json(
      { message: "서버 오류가 발생했습니다." },
      { status: 500 }
    );
  }
}
