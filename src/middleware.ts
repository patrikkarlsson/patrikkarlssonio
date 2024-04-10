import createMiddleware from 'next-intl/middleware'

export default createMiddleware({
  locales: ['en'],
  defaultLocale: 'en',
  localePrefix: 'always',
})

export const config = {
  // Skip all paths that should not be internationalized
  matcher: ['/', '/((?!api|admin|_next|_vercel|.*\\..*).*)', '/(en)/:path*']
}
