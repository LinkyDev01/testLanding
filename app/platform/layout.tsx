import type React from "react"
import { Header } from "@/components/header"
import { PlatformFooter } from "@/components/platform"

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
