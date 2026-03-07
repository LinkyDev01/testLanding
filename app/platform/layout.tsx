import type React from "react"
import { Header } from "@/components/header"
import { PlatformFooter } from "@/components/platform"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "링키케어 | 파티룸·에어비앤비 청소 전문 서비스",
  description:
    "파티룸·에어비앤비 사장님의 청소 걱정, 링키케어가 대신합니다. 체계적인 청소 관리로 사장님은 매출에만 집중하세요.",
  openGraph: {
    title: "링키케어 | 파티룸·에어비앤비 청소 전문 서비스",
    description: "파티룸·에어비앤비 사장님의 청소 걱정, 링키케어가 대신합니다. 체계적인 청소 관리로 사장님은 매출에만 집중하세요.",
    images: ["/main/main04_og.png"],
  },
}




export default function PlatformLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header variant="platform" />
      {children}
      <PlatformFooter />
    </>
  )
}
