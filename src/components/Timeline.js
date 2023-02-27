import { useRef, useState } from 'react'
import { useRect } from '@studio-freight/hamo'
import { useScroll } from '@/hooks/use-scroll'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { mapRange, clamp } from '@/lib/maths'
import { useWindowSize } from 'react-use'

import styled, { css } from 'styled-components'
import TimelinePoint from './TimelinePoint'

const Timeline = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    width: 100%;
    overflow: hidden;

    @media only screen and (min-width: ${theme.mq.tablet}) {
      ${theme.spacing(['all'])}
    }
  `}
`

const Line = styled.div`
  ${({ theme, loaded }) => css`
    position: absolute;
    width: 6px;
    height: 100%;
    top: 0;
    left: 1.25rem;
    transtform: translateX(0), scaleY(100);
    background-color: #000;
    transform-origin: 50% 0;
    opacity: 0;

    ${loaded && `
      opacity: 1;
    `}

    @media only screen and (min-width: ${theme.mq.tablet}) {
      left: 50%;
      transtform: translateX(-50%), scaleY(100);
    }

  `}
`

export default ({ blok, theme }) => {

  const [wrapperRectRef, wrapperRect] = useRect()
  const { height: windowHeight } = useWindowSize()
  const lineRef = useRef()
  const [loaded, setLoaded] = useState(false)
  const [scrollDirection, setScrollDirection] = useState(0)

  useScroll(({ scroll, direction }) => {
    const start = wrapperRect.top - windowHeight
    const end = wrapperRect.top + wrapperRect.height - windowHeight
  
    let progress = mapRange(start + 200, end + 200, scroll, 0, 1)
    progress = clamp(0, progress, 1)

    if (progress > 0 && !loaded) {
      setLoaded(true)  
    } else if (progress == 0 && loaded) {
      setLoaded(false)
    }
       
    lineRef.current.style.transform = `scaleY(${progress})`

    if (direction != scrollDirection) {
      setScrollDirection(direction)
    }
  })

  return (
    <Timeline ref={wrapperRectRef} theme={theme}>
      <Line theme={theme} ref={lineRef} loaded={loaded} />
      {blok.points.map((point, index) => {
        return (
          <TimelinePoint theme={theme} scrollDirection={scrollDirection} blok={point} position={index % 2 == 1 ? 'right' : null } key={index} />
        )
      })}
    </Timeline>
  )
}