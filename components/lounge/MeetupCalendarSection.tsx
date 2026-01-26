"use client"

import { useState, useEffect } from "react"
import {
  ArrowRight,
  Users,
  Clock,
  Calendar,
  ChevronLeft,
  ChevronRight,
  X,
  Loader2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { AnimatedSection } from "@/components/animated-section"
import { SectionHeader, CTAButton } from "@/components/common"
import { CATEGORY_STYLES } from "@/constants/lounge"
import { useGoogleCalendarMeetups } from "@/hooks/use-google-calendar-meetups"
import type { Meetup } from "@/types"

export function MeetupCalendarSection() {
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 0, 1))
  const [selectedDay, setSelectedDay] = useState<number | null>(null)

  const { meetups: currentMonthMeetups, isLoading } = useGoogleCalendarMeetups(
    currentMonth.getFullYear(),
    currentMonth.getMonth()
  )

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()
    return { firstDay, daysInMonth }
  }

  const getMeetupsForDay = (day: number) => {
    return currentMonthMeetups.filter((m) => m.day === day)
  }

  const selectedMeetups = selectedDay ? getMeetupsForDay(selectedDay) : []

  const { firstDay, daysInMonth } = getDaysInMonth(currentMonth)
  const monthName = currentMonth.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
  })

  const prevMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
    )
    setSelectedDay(null)
  }

  const nextMonth = () => {
    setCurrentMonth(
      new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
    )
    setSelectedDay(null)
  }

  const handleDayClick = (day: number) => {
    const dayMeetups = getMeetupsForDay(day)
    if (dayMeetups.length > 0) {
      setSelectedDay(selectedDay === day ? null : day)
    }
  }

  return (
    <section className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection>
          <SectionHeader
            label="Monthly Meetups"
            title="이번 달 모임"
            description="다양한 모임에 참여하고 새로운 인연을 만들어보세요"
            labelColor="rose"
          />
        </AnimatedSection>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* 달력 */}
          <AnimatedSection className="lg:col-span-2">
            <div className="bg-card rounded-2xl border border-border p-6">
              <div className="flex items-center justify-between mb-6">
                <button
                  onClick={prevMonth}
                  className="p-2 hover:bg-secondary rounded-lg transition-colors"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-sage" />
                  {monthName}
                </h3>
                <button
                  onClick={nextMonth}
                  className="p-2 hover:bg-secondary rounded-lg transition-colors"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* 요일 헤더 */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {["일", "월", "화", "수", "목", "금", "토"].map((day) => (
                  <div
                    key={day}
                    className="text-center text-sm text-muted-foreground py-2"
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* 날짜 */}
              <div className="grid grid-cols-7 gap-1">
                {Array.from({ length: firstDay }).map((_, i) => (
                  <div key={`empty-${i}`} className="aspect-square" />
                ))}
                {Array.from({ length: daysInMonth }).map((_, i) => {
                  const day = i + 1
                  const dayMeetups = getMeetupsForDay(day)
                  const hasMeetup = dayMeetups.length > 0
                  const isSelected = selectedDay === day
                  return (
                    <div
                      key={day}
                      onClick={() => handleDayClick(day)}
                      className={`aspect-square flex flex-col items-center justify-start pt-1 rounded-lg text-sm relative transition-all ${
                        isSelected
                          ? "bg-sage text-white ring-2 ring-sage ring-offset-2"
                          : hasMeetup
                            ? "bg-secondary cursor-pointer hover:bg-secondary/80"
                            : "hover:bg-secondary"
                      }`}
                    >
                      <span
                        className={`${hasMeetup ? "font-medium" : ""} ${isSelected ? "text-white" : ""}`}
                      >
                        {day}
                      </span>
                      {hasMeetup && (
                        <div className="flex flex-wrap gap-0.5 justify-center mt-0.5 px-0.5">
                          {dayMeetups.map((meetup) => (
                            <span
                              key={meetup.id}
                              className={`w-2 h-2 rounded-full ${
                                isSelected
                                  ? "bg-white/80"
                                  : CATEGORY_STYLES[meetup.category].dot
                              }`}
                              title={CATEGORY_STYLES[meetup.category].label}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>

              {/* 범례 */}
              <div className="mt-6 pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground mb-3">카테고리</p>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(CATEGORY_STYLES).map(([key, value]) => (
                    <span
                      key={key}
                      className={`px-3 py-1 rounded-full text-xs ${value.bg} ${value.text}`}
                    >
                      {value.label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </AnimatedSection>

          {/* 모임 리스트 */}
          <div className="lg:col-span-3 space-y-4">
            {isLoading ? (
              <div className="bg-card rounded-2xl border border-border p-12 text-center">
                <Loader2 className="w-12 h-12 mx-auto text-sage mb-4 animate-spin" />
                <p className="text-muted-foreground">모임 정보를 불러오는 중...</p>
              </div>
            ) : selectedDay && selectedMeetups.length > 0 ? (
              <SelectedDayMeetups
                currentMonth={currentMonth}
                selectedDay={selectedDay}
                meetups={selectedMeetups}
                onClearSelection={() => setSelectedDay(null)}
              />
            ) : (
              <AllMeetupsList
                currentMonth={currentMonth}
                meetups={currentMonthMeetups}
                onSelectDay={setSelectedDay}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

interface SelectedDayMeetupsProps {
  currentMonth: Date
  selectedDay: number
  meetups: Meetup[]
  onClearSelection: () => void
}

function SelectedDayMeetups({
  currentMonth,
  selectedDay,
  meetups,
  onClearSelection,
}: SelectedDayMeetupsProps) {
  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <p className="text-lg font-semibold">
          {currentMonth.getMonth() + 1}월 {selectedDay}일 모임{" "}
          <span className="text-sage">({meetups.length}개)</span>
        </p>
        <button
          onClick={onClearSelection}
          className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="w-4 h-4" />
          전체 보기
        </button>
      </div>
      <div className="grid gap-6">
        {meetups.map((meetup, index) => (
          <AnimatedSection key={meetup.id} delay={index * 100}>
            <MeetupDetailCard meetup={meetup} />
          </AnimatedSection>
        ))}
      </div>
    </>
  )
}

interface AllMeetupsListProps {
  currentMonth: Date
  meetups: Meetup[]
  onSelectDay: (day: number) => void
}

const ITEMS_PER_PAGE = 3

function AllMeetupsList({
  currentMonth,
  meetups,
  onSelectDay,
}: AllMeetupsListProps) {
  const [currentPage, setCurrentPage] = useState(1)

  // 월이 바뀌면 페이지 리셋
  useEffect(() => {
    setCurrentPage(1)
  }, [meetups])

  const totalPages = Math.ceil(meetups.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedMeetups = meetups.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  if (meetups.length === 0) {
    return (
      <div className="bg-card rounded-2xl border border-border p-12 text-center">
        <Calendar className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
        <p className="text-lg font-medium mb-2">
          이번 달은 예정된 모임이 없어요
        </p>
        <p className="text-muted-foreground text-sm">다른 달을 확인해보세요!</p>
      </div>
    )
  }

  return (
    <>
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-muted-foreground">
          날짜를 클릭하면 해당 날짜의 모임을 확인할 수 있어요
        </p>
        {totalPages > 1 && (
          <p className="text-sm text-muted-foreground">
            {currentPage} / {totalPages}
          </p>
        )}
      </div>

      <div className="space-y-4">
        {paginatedMeetups.map((meetup, index) => (
          <AnimatedSection key={meetup.id} delay={index * 100}>
            <MeetupListItem
              meetup={meetup}
              currentMonth={currentMonth}
              onClick={() => onSelectDay(meetup.day)}
            />
          </AnimatedSection>
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2 mt-6">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-lg hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i + 1}
              onClick={() => setCurrentPage(i + 1)}
              className={`w-9 h-9 rounded-lg text-sm font-medium transition-colors ${
                currentPage === i + 1
                  ? "bg-sage text-white"
                  : "hover:bg-secondary"
              }`}
            >
              {i + 1}
            </button>
          ))}

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="p-2 rounded-lg hover:bg-secondary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </>
  )
}

interface MeetupDetailCardProps {
  meetup: Meetup
}

function MeetupDetailCard({ meetup }: MeetupDetailCardProps) {
  const categoryStyle = CATEGORY_STYLES[meetup.category]

  return (
    <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col lg:flex-row">
      <div className="h-64 lg:h-auto lg:w-40 lg:flex-shrink-0 relative overflow-hidden">
        <img
          src={meetup.image || "/placeholder.svg"}
          alt={meetup.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 left-3">
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${categoryStyle.bg} ${categoryStyle.text} backdrop-blur-sm bg-white/80`}
          >
            {categoryStyle.label}
          </span>
        </div>
      </div>
      <div className="p-4 flex flex-col justify-between flex-1 min-w-0">
        <div>
          <h4 className="font-semibold text-base mb-2 truncate">
            {meetup.title}
          </h4>
          <p className="text-muted-foreground text-sm mb-3 leading-relaxed line-clamp-2">
            {meetup.description}
          </p>
          <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mb-3">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {meetup.time}
            </span>
            <span className="flex items-center gap-1">
              <Users className="w-3 h-3" />
              {meetup.current}/{meetup.capacity}명
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between pt-3 border-t border-border">
          <span className="text-base font-bold text-rose">{meetup.price}</span>
          {meetup.registrationUrl ? (
            <CTAButton
              size="sm"
              ctaVariant="sage"
              className="text-xs"
              asChild
            >
              <a href={meetup.registrationUrl} target="_blank" rel="noopener noreferrer">
                신청하기
                <ArrowRight className="ml-1 w-3 h-3" />
              </a>
            </CTAButton>
          ) : (
            <CTAButton size="sm" ctaVariant="sage" className="text-xs">
              신청하기
              <ArrowRight className="ml-1 w-3 h-3" />
            </CTAButton>
          )}
        </div>
      </div>
    </div>
  )
}

interface MeetupListItemProps {
  meetup: Meetup
  currentMonth: Date
  onClick: () => void
}

function MeetupListItem({ meetup, currentMonth, onClick }: MeetupListItemProps) {
  const categoryStyle = CATEGORY_STYLES[meetup.category]

  return (
    <div
      className="bg-card rounded-2xl border border-border p-6 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group cursor-pointer"
      onClick={onClick}
    >
      <div className="flex flex-col sm:flex-row sm:items-start gap-4">
        {/* 날짜 박스 */}
        <div className="flex-shrink-0 w-16 h-16 bg-sage rounded-xl flex flex-col items-center justify-center text-white">
          <span className="text-2xl font-bold">{meetup.day}</span>
          <span className="text-xs">{currentMonth.getMonth() + 1}월</span>
        </div>

        {/* 모임 정보 */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-4">
            <div>
              <span
                className={`inline-block px-2 py-0.5 rounded-full text-xs mb-2 ${categoryStyle.bg} ${categoryStyle.text}`}
              >
                {categoryStyle.label}
              </span>
              <h4 className="font-semibold text-lg group-hover:text-sage transition-colors">
                {meetup.title}
              </h4>
            </div>
            <span className="text-lg font-bold text-rose whitespace-nowrap">
              {meetup.price}
            </span>
          </div>

          <p className="text-muted-foreground text-sm mt-2 line-clamp-2">
            {meetup.description}
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-4 gap-3">
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {meetup.time}
              </span>
              <span className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                {meetup.current}/{meetup.capacity}명
              </span>
            </div>

            {meetup.registrationUrl ? (
              <CTAButton
                size="sm"
                ctaVariant="sage"
                asChild
                onClick={(e: React.MouseEvent) => e.stopPropagation()}
              >
                <a href={meetup.registrationUrl} target="_blank" rel="noopener noreferrer">
                  신청하기
                  <ArrowRight className="ml-1 w-3 h-3" />
                </a>
              </CTAButton>
            ) : (
              <CTAButton
                size="sm"
                ctaVariant="sage"
                onClick={(e: React.MouseEvent) => e.stopPropagation()}
              >
                신청하기
                <ArrowRight className="ml-1 w-3 h-3" />
              </CTAButton>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
