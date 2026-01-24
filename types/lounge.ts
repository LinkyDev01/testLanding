export type MeetupCategory = "wine" | "book" | "network" | "party"

export interface Meetup {
  id: number
  title: string
  date: string
  day: number
  time: string
  category: MeetupCategory
  capacity: number
  current: number
  price: string
  description: string
  image: string
}

export interface CategoryStyle {
  bg: string
  text: string
  label: string
  dot?: string
}

export interface SpaceInfo {
  name: string
  capacity: string
  description: string
  highlights: string[]
}
