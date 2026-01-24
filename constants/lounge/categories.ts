import type { MeetupCategory, CategoryStyle } from "@/types"

export const CATEGORY_STYLES: Record<MeetupCategory, CategoryStyle> = {
  wine: {
    bg: "bg-rose-light",
    text: "text-rose",
    label: "와인",
    dot: "bg-rose",
  },
  book: {
    bg: "bg-sage-light",
    text: "text-sage",
    label: "독서",
    dot: "bg-sage",
  },
  network: {
    bg: "bg-mustard-light",
    text: "text-mustard",
    label: "네트워킹",
    dot: "bg-mustard",
  },
  party: {
    bg: "bg-purple-100",
    text: "text-purple-600",
    label: "파티",
    dot: "bg-purple-500",
  },
}
