import Link from "next/link"
import { Instagram } from "lucide-react"

export function LoungeFooter() {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* 좌측: 사업자정보 */}
          <div>
            <h4 className="font-semibold mb-4">사업자정보</h4>
            <ul className="space-y-2 text-background/70 text-sm">
              <li>주식회사 링키</li>
              <li>대표 : 안동민 | 개인정보관리책임자 : 안동민</li>
              <li>사업자등록번호 : 402-87-03145</li>
              <li>주소 : 경기도 남양주시 별내3로 322, 404호</li>
              <li>이메일 : linkylounge@gmail.com | 대표번호 : 010-7444-5790</li>
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
                <span className="text-background/70">문의 : linkylounge@gmail.com</span>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/linky_lounge"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-background/70 hover:text-background transition-colors inline-flex items-center gap-1"
                >
                  <Instagram className="w-4 h-4" />
                  Instagram
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/20 mt-8 pt-6">
          <p className="text-background/50 text-sm text-center">
            © 2025 Linky Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
