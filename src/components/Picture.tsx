import { storyblokEditable } from '@storyblok/react/rsc'
import styled, { css, useTheme } from 'styled-components'
import NextImage from 'next/image'
import { PictureType } from '@/types'
import PictureSize from './PictureSize'

const Img = styled(NextImage)`
  ${() => css`
    width: 100%;
    height: auto;
    object-fit: cover;
  `})}
`

const PictureWrapper = styled.div`
  ${() => css`
    width: 100%;
    height: 100%;
  `})}
`

type Props = {
  blok: PictureType,
  priority: boolean
}

const Picture = ({ 
  blok,
  priority = false 
} : Props) => {

  const theme = useTheme()
  
  if (!blok.mobile) return null
  
  const [width, height] = blok.mobile.filename.split('/')[5].split('x')
  
  return (
    <PictureWrapper>
      <picture>
        {blok.desktop && (
          <PictureSize 
            filename={blok.desktop.filename}
            media={`(min-width: ${theme.mq.desktop.min})`}
          />
        )}
        {blok.tablet && (
          <PictureSize 
            filename={blok.tablet.filename}
            media={`(min-width: ${theme.mq.tablet.min})`}
          />
        )}
        <PictureSize
          filename={blok.mobile.filename}
          media={`(min-width: ${theme.mq.mobile.min})`}
        />
        <Img
          {...storyblokEditable(blok)}
          src={blok.mobile.filename}
          width={parseInt(width)}
          height={parseInt(height)}
          alt={blok.mobile.alt}
          priority={priority}
          quality={100}
        />
      </picture>
    </PictureWrapper>
  )
}

export default Picture