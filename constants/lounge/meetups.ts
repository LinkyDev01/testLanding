import type { Meetup } from "@/types"

export const MEETUPS: Meetup[] = [
  {
    id: 1,
    title: "신년 와인 테이스팅",
    date: "2026-01-18",
    day: 18,
    time: "19:00 - 21:30",
    category: "wine",
    capacity: 12,
    current: 8,
    price: "35,000원",
    description:
      "소믈리에와 함께하는 신년 특별 와인 테이스팅. 3종의 프리미엄 와인과 페어링 안주를 즐겨보세요.",
    image: "/wine-tasting-elegance.png",
  },
  {
    id: 2,
    title: "1월 독서 모임 - 인생의 의미",
    date: "2026-01-22",
    day: 22,
    time: "14:00 - 16:00",
    category: "book",
    capacity: 10,
    current: 6,
    price: "15,000원",
    description:
      "빅터 프랭클의 '죽음의 수용소에서'를 함께 읽고 이야기 나누는 시간.",
    image: "/cozy-book-club-meeting-with-warm-lighting.jpg",
  },
  {
    id: 3,
    title: "크리에이터 네트워킹 나이트",
    date: "2026-01-25",
    day: 25,
    time: "18:30 - 21:00",
    category: "network",
    capacity: 20,
    current: 15,
    price: "20,000원",
    description:
      "프리랜서, 크리에이터를 위한 네트워킹 이벤트. 가벼운 음료와 함께 새로운 인연을 만나보세요.",
    image: "/professional-networking-event-with-people-chatting.jpg",
  },
  {
    id: 4,
    title: "설날 특별 소셜 파티",
    date: "2026-01-28",
    day: 28,
    time: "17:00 - 20:00",
    category: "party",
    capacity: 15,
    current: 10,
    price: "25,000원",
    description:
      "설 연휴를 맞아 진행되는 소셜 파티. 다양한 사람들과 함께 즐거운 시간을 보내세요.",
    image: "/social-party-celebration-with-festive-decorations.jpg",
  },
]
