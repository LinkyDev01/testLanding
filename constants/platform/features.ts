import {
  Calendar,
  Clock,
  Star,
  MapPin,
  Shield,
  Zap,
  Sparkles,
} from "lucide-react"
import type { Feature, ProcessStep, StatItem } from "@/types"

export const FOR_BUSINESSES: Feature[] = [
  {
    icon: Calendar,
    title: "예약 기반 청소 요청",
    description: "공간 예약 일정에 맞춰 자동으로 청소를 배정받을 수 있습니다",
  },
  {
    icon: Clock,
    title: "정기 / 단기 / 긴급 매칭",
    description: "상황에 따라 유연하게 청소 서비스를 이용할 수 있습니다",
  },
  {
    icon: Star,
    title: "검증된 청소 인력",
    description: "평점 시스템으로 검증된 신뢰할 수 있는 긱워커를 만나보세요",
  },
]

export const FOR_WORKERS: Feature[] = [
  {
    icon: MapPin,
    title: "지역 기반 자동 매칭",
    description: "내 위치와 가까운 일감을 우선적으로 배정받습니다",
  },
  {
    icon: Clock,
    title: "유연한 일정 관리",
    description: "원하는 시간대에 맞춰 자유롭게 일할 수 있습니다",
  },
  {
    icon: Shield,
    title: "투명한 정산 구조",
    description: "명확하고 빠른 정산으로 안정적인 수입을 보장합니다",
  },
]

export const HOW_IT_WORKS: ProcessStep[] = [
  {
    step: "01",
    title: "청소 요청",
    description: "공간 대여 업자가 예약 일정에 맞춰 청소를 요청합니다",
  },
  {
    step: "02",
    title: "자동 매칭",
    description: "지역과 일정에 맞는 최적의 긱워커가 자동으로 배정됩니다",
  },
  {
    step: "03",
    title: "청소 완료",
    description: "긱워커가 청소를 완료하고 상태를 보고합니다",
  },
  {
    step: "04",
    title: "평가 및 정산",
    description: "상호 평가 후 투명하게 정산이 이루어집니다",
  },
]

export const EXTENDED_FEATURES: Feature[] = [
  {
    icon: Zap,
    title: "예약 연동 자동 배정",
    description: "공간 예약 시스템과 연동하여 청소를 자동으로 배정합니다",
  },
  {
    icon: Sparkles,
    title: "청소 이력 관리",
    description: "청소 이력과 공간 상태를 체계적으로 관리할 수 있습니다",
  },
  {
    icon: Star,
    title: "신뢰도 관리",
    description: "후기와 평가 기반으로 신뢰도를 관리하고 품질을 보장합니다",
  },
]

export const PLATFORM_STATS: StatItem[] = [
  { value: "200+", label: "파트너 공간" },
  { value: "1,000+", label: "등록 긱워커" },
  { value: "5,000+", label: "완료 서비스" },
]

export const BUSINESS_PROBLEMS = [
  "청소 인력 수급의 불안정",
  "갑작스러운 예약 변화에 따른 운영 부담",
  "청소 품질 관리의 어려움",
]

export const WORKER_PROBLEMS = [
  "신뢰 가능한 일감 부족",
  "유연한 일정의 일자리 부족",
  "불투명한 정산 구조",
]
