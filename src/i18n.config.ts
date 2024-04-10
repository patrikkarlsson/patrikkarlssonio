export const i18n = {
  defaultLocale: 'sv',
  locales: ['sv', 'en'],
}

export const getStoryLang = (locale: string) => {
  return locale == i18n.defaultLocale ? 'default' : locale
}

export type Locale = (typeof i18n)['locales'][number]