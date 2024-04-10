import styled, { css } from 'styled-components'
import { StoryblokComponent, storyblokEditable } from '@storyblok/react/rsc'
import { HorizontalItemType } from '@/types'

const HorizontalItem = styled.div`
${({ theme }) => css`
  display: flex;
  aspect-ratio: 1 / 1;
  width: 50vw;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;

  ${theme.fluidType(
    'padding',
    theme.mq.mobile.max,
    theme.mq.desktop.min,
    '1rem',
    '8rem'
  )}


  [class^="Picture__PictureWrapper-sc"] {
    display: flex;
    align-items: center;
  }

  @media only screen and (min-width: ${theme.mq.tablet.min}) {
    width: 33.3vw;
  }

  @media only screen and (min-width: ${theme.mq.laptop.min}) {
    width: 25vw;
  }

  @media only screen and (min-width: ${theme.mq.desktop.min}) {
    width: 20vw;
  }
  `
}
`

type Props = {
  blok: HorizontalItemType
}

const HorizontalItemBlock = ({ 
  blok 
} : Props) => {
  return (
    <HorizontalItem {...storyblokEditable(blok)}>
      {
        blok.body && blok.body.map((blok: any) => <StoryblokComponent blok={blok} key={blok._uid} />)
      }
    </HorizontalItem>
  )
}

export default HorizontalItemBlock