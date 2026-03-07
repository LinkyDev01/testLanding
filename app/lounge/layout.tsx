import type React from "react"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "링키라운지 | 사람을 잇는 오프라인 커뮤니티 공간",
  description:
    "링키라운지는 사람과 사람이 연결되는 공간입니다. 공간에서 나누는 시간이 오래 남는 기억이 될 수 있도록, 연결의 순간을 더 특별하게 만듭니다.",
  openGraph: {
    title: "링키라운지 - 사람을 잇는 오프라인 커뮤니티 공간",
    description:
      "목적 있는 만남이 자연스럽게 이루어지는 커뮤니티 라운지. 회화 스터디, 와인 파티, 몰입의 밤 등 다양한 프로그램을 경험해보세요.",
    images: ["/landing02.png"],
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
  return <>{children}</>
}
