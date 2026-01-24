import Link from "next/link"

export function LoungeFooter() {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* 좌측: 사업자정보 */}
          <div>
            <h4 className="font-semibold mb-4">사업자정보</h4>
            <ul className="space-y-2 text-background/70 text-sm">
              <li>상호명: 링키</li>
              <li>대표자: 홍길동</li>
              <li>사업자등록번호: 000-00-00000</li>
              <li>통신판매업신고번호: 제0000-서울강남-0000호</li>
              <li>주소: 서울특별시 강남구</li>
              <li>이메일: hello@linky.kr</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">고객지원</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link
                  href="/lounge/policy"
                  className="text-background/70 hover:text-background transition-colors"
                >
                  교환환불정책
                </Link>
              </li>
              <li>
                <span className="text-background/70">문의: hello@linky.kr</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/20 mt-8 pt-6">
          <p className="text-background/50 text-sm text-center">
            © 2025 Linky Lounge. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
