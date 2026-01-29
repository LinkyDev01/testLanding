"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface HeaderProps {
  variant?: "main" | "lounge" | "platform"
}

export function Header({ variant = "main" }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const config = {
    main: {
      logo: { href: "/", image: "/logos/linky_platform_logo_business.svg", width: 120, height: 30, className: "h-8 w-auto" },
      navItems: [
        { href: "/lounge", label: "링키 라운지" },
        { href: "/platform", label: "링키 플랫폼" },
        { href: "#contact", label: "문의하기" },
      ],
      ctaButton: { bg: "bg-[#9CB7A4] hover:bg-[#8AA594]", text: "시작하기" },
    },
    lounge: {
      logo: { href: "/lounge", image: "/linky_lounge_logo.svg", width: 180, height: 60, className: "h-15 w-auto bg-white rounded-md px-2 py-1" },
      navItems: [
        { href: "/lounge", label: "공간 소개" },
        { href: "/lounge#features", label: "특징" },
        { href: "/lounge#pricing", label: "이용 안내" },
        { href: "/", label: "Linky 홈" },
      ],
      ctaButton: { bg: "bg-[#9CB7A4] hover:bg-[#8AA594]", text: "예약하기" },
    },
    platform: {
      logo: { href: "/platform", image: "/logos/linky_platform_logo_business.svg", width: 120, height: 30, className: "h-8 w-auto" },
      navItems: [
        { href: "/platform", label: "서비스 소개" },
        { href: "/platform#features", label: "기능" },
        { href: "/platform#how-it-works", label: "이용 방법" },
        { href: "/", label: "Linky 홈" },
      ],
      ctaButton: { bg: "bg-[#00C896] hover:bg-[#00B085]", text: "앱 다운로드" },
    },
  }

  const { logo, navItems, ctaButton } = config[variant]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href={logo.href} className="flex items-center">
            <Image
              src={logo.image}
              alt={variant === "lounge" ? "Linky Lounge" : "Linky"}
              width={logo.width}
              height={logo.height}
              className={logo.className}
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button className={`${ctaButton.bg} text-white`}>{ctaButton.text}</Button>
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="메뉴 토글">
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-muted-foreground hover:text-foreground transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <Button className={`${ctaButton.bg} text-white w-full mt-2`}>{ctaButton.text}</Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
