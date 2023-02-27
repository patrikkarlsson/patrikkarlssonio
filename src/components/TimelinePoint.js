import styled, { css } from 'styled-components'
import { AppContext } from '@thebond/storyblok-nextjs-helpers-components'
import { useContext, useState } from 'react'
import { useRect } from '@studio-freight/hamo'
import { useWindowSize } from 'react-use'
import { useScroll } from '@/hooks/use-scroll'
import { mapRange, clamp } from '@/lib/maths'

const TimelinePoint = styled.div`
  ${({ theme, position }) => css`
    display: flex;
    width: 100%;
    min-height: 30vh;
    width: 100%;
    flex-wrap: wrap;
    padding: 2rem;

    @media only screen and (min-width: ${theme.mq.tablet}) {
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

const Label = styled.div`
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

    @media only screen and (min-width: ${theme.mq.tablet}) {
      transform: translateX(-50%) scale(.4);
      position: absolute;
      left: 50%;

      ${visible && `
        transform: translateX(-50%) scale(1);
      `
      }
    }

    ${visible && `
        opacity: 1;
    `
    }
  `}
`

const Content = styled.div`
  ${({ theme, visible, scrollDirection, position }) => css`
  `}
`

const Holder = styled.div`
  ${({ theme, visible, scrollDirection, position }) => css`
    display: flex;
    flex-direction: column;
    opacity: 0;
    transform: 'translateX(100px)';
    transition: opacity .5s ease-in-out, transform .5s ease-in-out;
    margin: 2rem 0;
    width: 100%;

    @media only screen and (min-width: ${theme.mq.tablet}) {
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
    ${({ theme }) => css`
      display: flex;
      flex-wrap: wrap;
      width: 100%;
    `}
`


const Tag = styled.div`
    ${({ theme }) => css`
      font-style: italic;
      font-size: 0.875rem;
      display: flex;
      margin-top: 0.625rem;
      align-items: center;
    `}
`

export default ({ blok, position, scrollDirection, theme }) => {

  const { DynamicComponent } = useContext(AppContext)
  const [wrapperRectRef, wrapperRect] = useRect()
  const { height: windowHeight } = useWindowSize()
  const [isVisible, setIsVisible] = useState(0)
  
  useScroll(({ scroll }) => {
    const start = wrapperRect.top - windowHeight
    const end = wrapperRect.top + wrapperRect.height - windowHeight
    let progress = mapRange(start + 200, end + 200, scroll, 0, 1)
    progress = clamp(0, progress, 1)
    if (progress > 0 && isVisible == 0) {
      setIsVisible(1)
    } else if (progress == 0 && isVisible == 1) {
      setIsVisible(0)
    }
  })

  return (
    <TimelinePoint theme={theme} position={position} ref={wrapperRectRef}>
        <Label theme={theme} visible={isVisible} >
          {blok.date}
      </Label>
      <Holder theme={theme} visible={isVisible} direction={scrollDirection} position={position}>
        <Content>
          {DynamicComponent.render(blok.content[0], blok.content[0]._uid)}
        </Content>
        <Tags>
        {blok.tags ? blok.tags.map((tag, index) => {
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