import '../styles/app.scss'
import Head from 'next/head'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { appWithTranslation } from 'next-i18next'
import { storyblokInit, apiPlugin } from '@storyblok/react'
import { useScroll } from '@/hooks/use-scroll'
import { useStore } from '@/lib/store'
import { useLayoutEffect } from 'react'
import { 
  DefaultTheme,
  ThemeProvider,
  generateColors,
  generateTypographySettings,
  generateFontNames,
  generateSpacing,
  generateFontFaces,
  generateMQ,
} from '@thebond/storyblok-nextjs-helpers-components'
import { DefaultGlobals } from '../theme/defaultGlobals'
import { useEffect } from 'react'

gsap.registerPlugin(ScrollTrigger)

gsap.ticker.remove(gsap.updateRoot)


storyblokInit({
  accessToken: process.env.STORYBLOK_TOKEN,
  use: [apiPlugin],
  draft: true
})

function App({ pageProps, Component }) {

  const lenis = useStore(({ lenis }) => lenis)
  const overflow = useStore(({ overflow }) => overflow)

  useScroll(ScrollTrigger.update)

  useEffect(() => {

    function raf(time) {
      gsap.updateRoot(time / 1000)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
  }, [])

  useEffect(() => {
    if (overflow) {
      lenis?.start()
      document.documentElement.style.removeProperty('overflow')
    } else {
      lenis?.stop()
      document.documentElement.style.setProperty('overflow', 'hidden')
    }
  }, [lenis, overflow])

  useLayoutEffect(() => {
    if (lenis) ScrollTrigger.refresh()
  }, [lenis])

  const colors = generateColors({
    body: '#000',
    black: '#000',
    white: '#fff',
    gray: '#393E46',
    manatee: '#929AAB',
    gallery: '#eeeeee',
  })

  const mq = generateMQ({
    mobile: '1rem',
    tablet: '48rem',
    laptop: '64.0625rem',
    desktop: '120rem',
  })

  const headline = 'Playfair Display'
  const body = 'Heboo'

  // name, filePath, weight, style
  const fonts = [
    generateFontFaces({
      name: headline,
      filePath: '/fonts/PlayfairDisplay-Italic.ttf',
      weight: 400,
      style: 'italic'
    }),
    generateFontFaces({
      name: headline,
      filePath: '/fonts/PlayfairDisplay-Regular.ttf',
      weight: 400,
      style: 'normal'
    }),
    generateFontFaces({
      name: body,
      filePath: '/fonts/Heebo-Bold.ttf',
      weight: 700,
      style: 'normal'
    }),
    generateFontFaces({
      name: body,
      filePath: '/fonts/Heebo-Regular.ttf',
      weight: 400,
      style: 'normal'
    }),
    generateFontFaces({
      name: body,
      filePath: '/fonts/Heebo-Thin.ttf',
      weight: 300,
      style: 'normal'
    })
  ]

  const typographySpacing = generateSpacing({
    min: '1.25rem',
    max: '1.75rem'
  })

  const typography = {
    h1: generateTypographySettings({ minSize: '2.125rem', maxSize: '3.5rem', minLineHeight: '2.5rem', maxLineHeight: '3.875rem', letterSpacing: 0, weight: 400 }),
    h2: generateTypographySettings({ minSize: '1.625rem', maxSize: '3rem', minLineHeight: '1.375rem', maxLineHeight: '3.375rem', letterSpacing: 0, weight: 400 }),
    h3: generateTypographySettings({ minSize: '1.5rem', maxSize: '2.5rem', minLineHeight: '1.875rem', maxLineHeight: '2.875rem', letterSpacing: 0, weight: 400 }),
    h4: generateTypographySettings({ minSize: '1.25rem', maxSize: '2.125rem', minLineHeight: '1.625rem', maxLineHeight: '2.5rem', letterSpacing: 0, weight: 400 }),
    h5: generateTypographySettings({ minSize: '1.125rem', maxSize: '1.5rem', minLineHeight: '1.5rem', maxLineHeight: '1.875rem', letterSpacing: 0, weight: 400 }),
    h6: generateTypographySettings({ minSize: '1.125rem', maxSize: '1.5rem', minLineHeight: '1.5rem', maxLineHeight: '1.875rem', letterSpacing: 0, weight: 400 }),
    p: generateTypographySettings({ minSize: '1.125rem', maxSize: '1.125rem', minLineHeight: '1.7rem', maxLineHeight: '1.9rem', letterSpacing: 0, weight: 400 }),
  }

  const fontNames = generateFontNames({ headline, body })

  const theme = DefaultTheme({ colors, fontNames, mq, typography, typographySpacing })

  theme.menuHeight = '5rem';

  return (
    <ThemeProvider theme={theme}>
      <Head>
        {
          fonts.map((font, index) => {
            return (
              <link
                rel="preload"
                href={font.filePath}
                key={index}
                as="font"
                type="font/ttf"
                crossOrigin="anonymous"
              />
            )
          })
        }
      </Head>
      <DefaultGlobals theme={theme} fonts={fonts} />
      <Component {...pageProps} theme={theme} />
    </ThemeProvider>
  )
}

export default appWithTranslation(App)
