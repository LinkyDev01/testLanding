import { Users, Wine, Book, Sparkles, Heart, MapPin, Clock } from "lucide-react"
import type { Feature, SpaceInfo } from "@/types"

export const LOUNGE_FEATURES: Feature[] = [
  {
    icon: Users,
    title: "소규모 파티",
    description: "친밀한 분위기에서 의미 있는 만남을 가질 수 있는 프라이빗 파티룸",
  },
  {
    icon: Wine,
    title: "와인 파티",
    description: "소믈리에가 추천하는 와인과 함께하는 특별한 테이스팅 경험",
  },
  {
    icon: Book,
    title: "독서 모임",
    description: "같은 책을 읽고 깊이 있는 대화를 나누는 독서 커뮤니티",
  },
  {
    icon: Sparkles,
    title: "네트워킹 모임",
    description: "크리에이터, 프리랜서를 위한 전문 네트워킹 이벤트",
  },
]

export const LOUNGE_GOALS: Feature[] = [
  {
    icon: Heart,
    title: "경험의 공간",
    description: "모임이 필요한 사람에게 특별한 경험을 선사합니다",
  },
  {
    icon: Users,
    title: "목적 있는 만남",
    description: "취향과 관심사를 공유하는 사람들과의 연결",
  },
  {
    icon: MapPin,
    title: "최적의 위치",
    description: "접근성이 좋은 도심 속 프라이빗 공간",
  },
  {
    icon: Clock,
    title: "유연한 운영",
    description: "다양한 시간대와 형태의 모임 지원",
  },
]

export const SPACE_INFO: SpaceInfo = {
  name: "링키 라운지",
  capacity: "5-20명",
  description:
    "소규모 파티부터 네트워킹 모임까지, 다양한 목적에 맞게 활용할 수 있는 유연한 공간입니다.",
  highlights: [
    "따뜻한 세이지 그린 톤의 인테리어",
    "최대 20명까지 수용 가능",
    "와인 파티, 독서 모임 등 다양한 프로그램 운영",
    "프라이빗한 분위기 보장",
  ],
}
