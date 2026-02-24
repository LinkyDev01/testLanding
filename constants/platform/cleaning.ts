import type { CleaningItem } from "@/types"

export const CLEANING_ITEMS: CleaningItem[] = [
  { id: "basic", name: "기본 청소", price: 30000, time: 60 },
  { id: "bathroom", name: "화장실 청소", price: 3000, time: 30 },
  { id: "kitchen", name: "주방 청소", price: 20000, time: 40 },
  { id: "window", name: "창문 청소", price: 10000, time: 20 },
  { id: "floor", name: "바닥 왁스", price: 25000, time: 45 },
  { id: "bedding", name: "침구 교체", price: 15000, time: 20 },
  { id: "laundry", name: "세탁물 정리", price: 10000, time: 15 },
  { id: "trash", name: "쓰레기 분리수거", price: 5000, time: 10 },
]
