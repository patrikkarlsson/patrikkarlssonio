import { storyblokInit, apiPlugin } from '@storyblok/react/rsc'
import { Playfair_Display, Heebo } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { unstable_setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'

import StoryblokProvider from '@/provider/StoryblokProvider'
import StyledProviders from '@/provider/StyledProviders'
import LenisProvider from '@/provider/LenisProvider'
import GlobalStyles from '@/styles/GlobalStyles'

import { i18n } from '@/i18n.config'

storyblokInit({
  accessToken: process.env.STORYBLOK_TOKEN,
  use: [apiPlugin],
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '700'],
  variable: '--heading',
})

const heebo = Heebo({
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '700'],
  variable: '--body',
})

export async function generateStaticParams() {
  return i18n.locales.map((locale) => {
    return {
      locale,
    }
  })
}

async function getMessages(locale: string) {
  try {
    return (await import(`../../../public/messages/${locale}.json`)).default
  } catch (error) {
    notFound()
  }
}


type Props = {
  params: {
    locale: string
  },
  children: string | JSX.Element | JSX.Element[]
}

export default async function RootLayout({ 
  params: { 
    locale,
  },
  children,
} : Props) {

  unstable_setRequestLocale(locale)
  const messages = await getMessages(locale)

  return (
    <StoryblokProvider>
      <LenisProvider>
        <html lang={locale} className={`${heebo.variable} ${playfair.variable}`}>
          <body>
            <StyledProviders>
              <GlobalStyles />
              <NextIntlClientProvider locale={locale} messages={messages}>
                {children}
              </NextIntlClientProvider>
            </StyledProviders>
          </body>
        </html>
      </LenisProvider>
    </StoryblokProvider>
  )
}
