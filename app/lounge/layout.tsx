import type React from "react"
import type { Metadata } from "next"
import { Header } from "@/components/header"
import { LoungeFooter } from "@/components/lounge"

export const metadata: Metadata = {
  title: "링키 라운지 - 사람을 잇는 오프라인 커뮤니티 공간",
  description:
    "링키 라운지는 단순한 파티룸이 아닌, 목적 있는 만남이 자연스럽게 이루어지는 커뮤니티 라운지입니다. 회화 스터디, 와인 파티, 몰입의 밤 등 다양한 프로그램을 경험해보세요.",
  openGraph: {
    title: "링키 라운지 - 사람을 잇는 오프라인 커뮤니티 공간",
    description:
      "목적 있는 만남이 자연스럽게 이루어지는 커뮤니티 라운지. 회화 스터디, 와인 파티, 몰입의 밤 등 다양한 프로그램을 경험해보세요.",
  },
  icons: {
    icon: "/favicon/favicon_lounge.svg",
  },
}

export default function LoungeLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <Header variant="lounge" />
      {children}
      <LoungeFooter />
    </>
  )
}
