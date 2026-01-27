import type { MeetupCategory, CategoryStyle } from "@/types"

export const CATEGORY_STYLES: Record<MeetupCategory, CategoryStyle> = {
  gathering: {
    bg: "bg-rose-light",
    text: "text-rose",
    label: "게더링",
    dot: "bg-rose",
  },
  focus: {
    bg: "bg-sage-light",
    text: "text-sage",
    label: "몰입의 밤",
    dot: "bg-sage",
  },
  language: {
    bg: "bg-blue-100",
    text: "text-blue-600",
    label: "외국어 회화",
    dot: "bg-blue-500",
  },
}
