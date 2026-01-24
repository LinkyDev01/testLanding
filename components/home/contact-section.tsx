"use client"

import type React from "react"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin } from "lucide-react"
import { SectionHeader, CTAButton } from "@/components/common"

export function ContactSection() {
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
    <section id="contact" className="py-24 bg-secondary/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div className="space-y-8">
            <SectionHeader
              label="Contact"
              title="무엇이든 물어보세요"
              labelColor="rose"
              align="left"
            />
            <p className="text-muted-foreground leading-relaxed -mt-8">
              링키 서비스에 대해 궁금한 점이 있으시면 언제든 문의해 주세요. 빠른
              시일 내에 답변 드리겠습니다.
            </p>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-sage-light flex items-center justify-center">
                  <Mail className="w-5 h-5 text-sage" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">이메일</p>
                  <p className="font-medium">hello@linky.kr</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-mint-light flex items-center justify-center">
                  <Phone className="w-5 h-5 text-mint" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">전화</p>
                  <p className="font-medium">02-1234-5678</p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-mustard-light flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-mustard" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">주소</p>
                  <p className="font-medium">서울특별시 강남구</p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-card rounded-3xl p-8 border border-border">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    이름
                  </label>
                  <Input
                    id="name"
                    placeholder="홍길동"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    이메일
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="example@email.com"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  메시지
                </label>
                <Textarea
                  id="message"
                  placeholder="문의 내용을 작성해 주세요"
                  className="h-[150px]"
                  rows={6}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  required
                />
              </div>

              <CTAButton type="submit" size="lg" className="w-full" ctaVariant="sage">
                문의하기
              </CTAButton>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}
