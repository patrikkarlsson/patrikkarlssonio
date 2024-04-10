import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import favicon from './../../../../public/pk.svg'
import { getStoryblokApi, StoryblokStory } from '@storyblok/react/rsc'
import { SBLinkType } from '@/types'

type Props = {
  params: { locale: string, slug: string[] }
}

export async function fetchData(isEnabled:boolean, slug: string) {
  const storyblokApi = getStoryblokApi()
  const version = (isEnabled || process.env.NODE_ENV == 'development') ? 'draft' : 'published'
  return storyblokApi.get(`cdn/stories/${slug}`,
    {
      version: version,
      cv: version == 'draft' ? Date.now() : null,
    })
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {

  if (!params.slug) {
    params.slug = []
  }

  const { isEnabled } = draftMode()
  const { data } = await fetchData(isEnabled,
    `${params.locale}/${params.slug.join('/')}`)

  if (!data.story?.content?.meta) {
    return {
      title: '',
      description: '',
      icons: {
        icon: favicon.src,
      }
    }
  }

  const { title, description } = data.story.content.meta

  return {
    title,
    description,
  }
}

export async function generateStaticParams() {

  const storyblokApi = getStoryblokApi()

  const data = await storyblokApi.getAll('cdn/links',
    {
      version: 'published',
    })

  return data.map((item: SBLinkType) => {
    if (!item.slug || item.is_folder || item.name == 'Global') {
      return
    }
    const splittedSlug = item.slug.split('/').filter((item: string) => item !== '')
    const locale = splittedSlug[0]
    if (splittedSlug.length === 1 && item.is_startpage) {
      return
    }
    splittedSlug.shift()
    return { slug: splittedSlug,
      locale: locale }
  })
}

export default async function Page({ params }: Props) {

  const { isEnabled } = draftMode()
  
  if (!params.slug) {
    params.slug = []
  }

  const { data } = await fetchData(isEnabled,
    `${params.locale}/${params.slug.join('/')}`)

  if (!data.story) {
    return notFound()
  }
  
  return (
    <StoryblokStory
      story={data.story}
      name={data.story.name}
      slug={params.slug}
      bridgeOptions={{ customParent: process.env.CUSTOM_DOMAIN,
        preventClicks: true }}
    />
  )
}

