"use client"

import type React from "react"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, MapPin } from "lucide-react"
import { SectionHeader, CTAButton } from "@/components/common"
import { trackStandard } from "@/lib/meta-pixel"

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const subject = encodeURIComponent(`[링키 문의] ${formData.name}님의 문의`)
    const body = encodeURIComponent(
      `이름: ${formData.name}\n이메일: ${formData.email}\n\n문의 내용:\n${formData.message}`
    )

    trackStandard("Lead", { content_name: "메인_문의폼" })
    window.location.href = `mailto:qkrwhd1122@gmail.com?subject=${subject}&body=${body}`
  }

  return (
    <section id="contact" data-track-section="메인_문의하기" className="py-24 bg-secondary/50">
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
                  <p className="font-medium">contact@linkykorea.com</p>
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
