import { SbBlokData } from '@storyblok/react/rsc'
import { DefaultTheme as SCDefaultTheme } from 'styled-components'
export type ColorType = {
  value: string,
}

export type BlokBaseType = SbBlokData & {
  _editable: string,
  _uid: string,
}

export type SectionType = BlokBaseType & {
  body: object[],
  spacing: Array<'no-top-spacing' | 'no-bottom-spacing'>,
  background_color: ColorType,
}

export type FileType = {
  filename: string,
  alt: string,
  type: string,
}

export type LinkType = {
  cached_url: string,
  slug: string,
  linktype: string,
  id: number,
  url: string,
  
}

export type PageType = BlokBaseType & {
  body: Array<SectionType>,

}

export type PictureType = BlokBaseType & {
  mobile: FileType,
  tablet: FileType,
  desktop: FileType,
}

export type PhraseType = BlokBaseType & {
  text: string,
}

export type TypeAnimationType = BlokBaseType & {
  phrases: PhraseType[],
  heading_type: string,
}

export type IntroType = BlokBaseType & {
  content: ContentType[],
  image: PictureType[],
}

export type ContentType = BlokBaseType & {
  content: object,
  text_color: ColorType,
  text_align: 'left' | 'center' | 'right',
}

export type TagType = BlokBaseType & {
  text: string,
}

export type TimelineType = BlokBaseType & {
  points: TimelinePointType[],
}

export type TimelineTag = BlokBaseType & {
  text: string,
}

export type TimelinePointType = BlokBaseType & {
  date: string,
  content: ContentType[],
  tags: TimelineTag[],
  is_present: boolean,
}

export type HorizontalItemType = BlokBaseType & {
  body: Array<ContentType|PictureType>,
}

export type HorizontalScrollType = BlokBaseType & {
  content: ContentType[],
  items: HorizontalItemType[],
}

export type ConnectType = {
  text: string,
  github_url: LinkType,
  linkedin_url: LinkType,
}

export type SBLinkType = {
  id: number,
  slug: string,
  name: string,
  is_folder: boolean,
  parent_id: null|number,
  published: boolean,
  path: null|string,
  position: number,
  uuid: string,
  is_startpage: boolean,
  real_path: string,
}

