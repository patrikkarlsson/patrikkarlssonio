import styled, { css } from 'styled-components'
import { StoryblokComponent, storyblokEditable } from '@storyblok/react/rsc'
import { ContentType, IntroType, PictureType } from '@/types'

const Intro = styled.div`
  ${({ 
    theme 
  }) => css`
    max-width: ${theme.maxContentWidth};
    margin: 0 auto;
    display: grid;
    align-items: flex-start;
    grid-gap: 10rem;
    @media screen and (min-width: ${theme.mq.tablet.min}) {
      grid-template-columns: 1fr 1fr;
    }
  `}
`

const Content = styled.div`
  ${() => css`
  
  `}
`

const Image = styled.div`
`

type Props = {
  blok: IntroType
}

export default function IntroBlock ({ blok } : Props) {
  return (
    <Intro
      {...storyblokEditable(blok)}
    >
      <Content>
        {blok.content.map((content: ContentType) => (
          <StoryblokComponent
            blok={content}
            key={content._uid}
          />
        ))}
      </Content>
      <Image>
        {blok.image.map((image: PictureType) => (
          <StoryblokComponent
            blok={image}
            key={image._uid}
          />
        ))}
      </Image>
    </Intro>
  )
}


