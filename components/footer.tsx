import Link from "next/link"
import { Instagram } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[#9CB7A4] flex items-center justify-center">
                <span className="text-white font-bold text-lg">L</span>
              </div>
              <span className="text-xl font-bold">Linky</span>
            </div>
            <p className="text-background/70 leading-relaxed max-w-md mb-4">
              사람과 사람을 잇는 공간·플랫폼 서비스. 오프라인 공간과 온라인 플랫폼을 통해 사람, 공간, 일을 유기적으로
              연결합니다.
            </p>
            <div className="text-background/50 text-sm space-y-1">
              <p>주식회사 링키 | 대표 : 안동민</p>
              <p>사업자등록번호 : 402-87-03145</p>
              <p>경기도 남양주시 별내3로 322, 404호</p>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-semibold mb-4">서비스</h4>
            <ul className="space-y-3">
              <li>
                <Link href="/lounge" className="text-background/70 hover:text-background transition-colors">
                  링키 라운지
                </Link>
              </li>
              <li>
                <Link href="/platform" className="text-background/70 hover:text-background transition-colors">
                  링키 플랫폼
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-background/70">
              <li>linkylounge@gmail.com</li>
              <li>010-7444-5790</li>
              <li>
                <a
                  href="https://www.instagram.com/linky_lounge"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-background transition-colors inline-flex items-center gap-1"
                >
                  <Instagram className="w-4 h-4" />
                  @linky_lounge
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/20 mt-12 pt-8">
          <p className="text-background/50 text-sm text-center">
            © 2025 Linky Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
