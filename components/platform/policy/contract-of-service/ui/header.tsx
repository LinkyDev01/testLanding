"use client"

import type React from "react"
import Link from "next/link"
import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // 마운트 전에는 기본 스타일로 렌더링
  if (!isMounted) {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-[70px]">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/logos/logo.png" 
                alt="Linky Logo"
                width={120}
                height={40}
                className="h-10 w-auto object-contain"
                priority
              />
            </Link>
          </div>
        </div>
      </header>
    )
  }

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setIsOpen(false) // 모바일 메뉴 닫기
    
    const targetId = href.substring(1)
    const targetElement = document.getElementById(targetId)
    
    if (targetElement) {
      const headerOffset = 70
      const elementPosition = targetElement.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      })
    }
  }

  return (
    <header 
      className={`
        fixed top-0 left-0 right-0 z-50 
        transition-all duration-300 ease-in-out
        ${isScrolled 
          ? 'bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100' 
          : 'bg-white'
        }
      `}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-[70px]">
          
          {/* 로고 */}
          <Link 
            href="/"
            className="flex items-center gap-2 group"
          >
            <Image
                src="/logos/logo.png" 
                alt="Linky Logo"
                width={120}
                height={100}
                className="h-[70px] w-auto object-contain"
                priority
              />
          </Link>

          {/* 데스크톱 CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Button 
              variant="outlineSecondary"
              className='font-bold'
              asChild
            >
              <Link href="#contact" onClick={(e) => handleScroll(e, "#contact")}>
                파트너 지원
              </Link>
            </Button>
            <Button 
              variant="default"
              className="
                px-6 py-2 rounded-lg font-bold
                shadow-sm hover:shadow-md
                transition-all duration-200
              "
              asChild
            >
              <Link href="#contact" onClick={(e) => handleScroll(e, "#contact")}>
                로그인
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}