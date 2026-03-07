"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin } from "lucide-react"
import { CTAButton } from "@/components/common"

export function PlatformFooter() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log(formData)
  }

  return (
    <footer className="bg-foreground text-background py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Info */}
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-2">문의하기</h3>
              <p className="text-background/70 leading-relaxed">
                링키케어에 대해 궁금한 점이 있으시면 언제든 문의해 주세요.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-background/10 flex items-center justify-center">
                  <Mail className="w-5 h-5 text-background/80" />
                </div>
                <div>
                  <p className="text-sm text-background/60">이메일</p>
                  <p className="font-medium">contact@linkykorea.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-background/10 flex items-center justify-center">
                  <Phone className="w-5 h-5 text-background/80" />
                </div>
                <div>
                  <p className="text-sm text-background/60">전화</p>
                  <p className="font-medium">010-7444-5790</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-lg bg-background/10 flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-background/80" />
                </div>
                <div>
                  <p className="text-sm text-background/60">주소</p>
                  <p className="font-medium">서울특별시 강남구</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-background/10 rounded-2xl p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="footer-name" className="text-sm font-medium text-background/80">
                    이름
                  </label>
                  <Input
                    id="footer-name"
                    placeholder="홍길동"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-background/10 border-background/20 text-background placeholder:text-background/50"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="footer-email" className="text-sm font-medium text-background/80">
                    이메일
                  </label>
                  <Input
                    id="footer-email"
                    type="email"
                    placeholder="example@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-background/10 border-background/20 text-background placeholder:text-background/50"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="footer-message" className="text-sm font-medium text-background/80">
                  메시지
                </label>
                <Textarea
                  id="footer-message"
                  placeholder="문의 내용을 작성해 주세요"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="bg-background/10 border-background/20 text-background placeholder:text-background/50 resize-none"
                  required
                />
              </div>

              <CTAButton type="submit" className="w-full" ctaVariant="mint">
                문의하기
              </CTAButton>
            </form>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-background/20 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-background/50 text-sm">© 2025 Linky Care. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/platform/terms" className="text-background/50 hover:text-background text-sm transition-colors">
              이용약관
            </Link>
            <Link href="/platform/privacy" className="text-background/50 hover:text-background text-sm transition-colors">
              개인정보처리방침
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
