'use client'
import { storyblokInit, apiPlugin } from '@storyblok/react/rsc'
import Page from '@/components/Page'
import Section from '@/components/Section'
import Content from '@/components/Content'
import Intro from '@/components/Intro'
import Picture from '@/components/Picture'
import HorizontalScroll from '@/components/HorizontalScroll'
import Timeline from '@/components/Timeline'
import Connect from '@/components/Connect'

const components = {
  page: Page,
  section: Section,
  content: Content,
  intro: Intro,
  picture: Picture,
  horizontal_scroll: HorizontalScroll,
  timeline: Timeline,
  connect: Connect,
}

storyblokInit({
  accessToken: process.env.STORYBLOK_TOKEN,
  use: [apiPlugin],
  components,
})

export default function StoryblokProvider({ children }: { children: React.ReactNode }) {
  return children
}