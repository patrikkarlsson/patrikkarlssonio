'use client'
import Script from 'next/script'

export default function Page() {

  return (
    <>
      <div id="app"></div>
      <Script src="https://app.storyblok.com/f/app-latest.js" />
    </>
  )
}