import styled, { css } from 'styled-components'
import { useRect } from '@studio-freight/hamo'
import { useWindowSize } from 'react-use'
import { useScroll } from '@/hooks/UseScroll'
import { mapRange, clamp } from '@/lib/maths'
import { ContentType, TagType, TimelinePointType } from '@/types'
import { useState } from 'react'
import { StoryblokComponent } from '@storyblok/react/rsc'

const TimelinePoint = styled.div.withConfig({
  shouldForwardProp: (prop) => !['position'].includes(prop),
})<{ position: string }>`
  ${({ theme, position }) => css`
    display: flex;
    width: 100%;
    min-height: 30vh;
    width: 100%;
    flex-wrap: wrap;
    padding: 2rem;

    @media only screen and (min-width: ${theme.mq.tablet.min}) {
      justify-content: flex-end;
      margin-right: auto;
      max-width: 40%;
      flex-direction: row;

      ${position === 'right' && `
        margin-left: auto;
        margin-right: 0;
        justify-content: flex-start;
      `}
    }
  `}
`

const Label = styled.div.withConfig({
  shouldForwardProp: (prop) => !['visible'].includes(prop),
})<{ visible: number}>`
  ${({ visible, theme }) => css`    
    color: #fff;
    display: flex;
    position: relative;
    align-items: center;
    background-color: #000;
    padding: 5px 10px;
    opacity: 0;
    transition: opacity .5s ease-in-out, transform .5s ease-in-out;
    z-index: 200;

    @media only screen and (min-width: ${theme.mq.tablet.min}) {
      transform: translateX(-50%) scale(.4);
      position: absolute;
      left: 50%;

      ${visible && `
        transform: translateX(-50%) scale(1);
      `}
    }

    ${visible && `
        opacity: 1;
    `
}
  `}
`

const Content = styled.div`
  ${() => css`
  `}
`

const Holder = styled.div.withConfig({
  shouldForwardProp: (prop) => ![
    'visible',
    'position'
  ].includes(prop),
})<{
  visible: number
  position: string
}>`
  ${({ theme, visible, position }) => css`
    display: flex;
    flex-direction: column;
    opacity: 0;
    transform: 'translateX(100px)';
    transition: opacity .5s ease-in-out, transform .5s ease-in-out;
    margin: 2rem 0;
    width: 100%;

    @media only screen and (min-width: ${theme.mq.tablet.min}) {
      margin-top: 0;
      transform: ${position == 'right' ? 'translateX(-100px)' : 'translateX(100px)' };

      ${visible && `
        opacity: 1;
        transform: translateX(0);
      `}
    }

    ${visible && `
      opacity: 1;
    `}
  `}
`

const Tags = styled.div`
    ${() => css`
      display: flex;
      flex-wrap: wrap;
      width: 100%;
    `}
`


const Tag = styled.div`
    ${() => css`
      font-style: italic;
      font-size: 0.875rem;
      display: flex;
      margin-top: 0.625rem;
      align-items: center;
    `}
`

type Props = {
  blok: TimelinePointType
  position: string
}

const TimelinePointBlock = ({ 
  blok,
  position,
} : Props) => {

  const [wrapperRectRef, wrapperRect] = useRect()
  const { height: windowHeight } = useWindowSize()
  const [isVisible, setIsVisible] = useState(0)
  
  useScroll(({ scroll } : { scroll: number }) => {
    const start = wrapperRect.top - windowHeight
    const end = wrapperRect.top + wrapperRect.height - windowHeight
    let progress = mapRange(
      start + 200,
      end + 200,
      scroll,
      0,
      1
    )
    progress = clamp(
      0,
      progress,
      1
    )
    if (progress > 0 && isVisible == 0) {
      setIsVisible(1)
    } else if (progress == 0 && isVisible == 1) {
      setIsVisible(0)
    }
  })

  return (
    <TimelinePoint position={position} ref={wrapperRectRef}>
      <Label visible={isVisible} >
        {blok.date}
      </Label>
      <Holder visible={isVisible} position={position}>
        <Content>
          {blok.content && blok.content.map((content: ContentType, index: number) => <StoryblokComponent blok={content} key={index} />) }
        </Content>
        <Tags>
          {blok.tags ? blok.tags.map((tag: TagType, index: number) => {
            if (index === (blok.tags.length - 1)) {
              return (
                <Tag key={index}>
                  {tag.text}
                </Tag>
              )
            }
            return (
              <Tag key={index}>
                {tag.text}&nbsp;&#x2022;&nbsp;
              </Tag>
            )
          }) : null}
        </Tags>
      </Holder>
    </TimelinePoint>
  )
}

export default TimelinePointBlock