import { useRef, useState } from 'react'
import { useRect } from '@studio-freight/hamo'
import { useScroll } from '@/hooks/useScroll'
import { mapRange, clamp } from '@/lib/maths'
import { useWindowSize } from 'react-use'

import styled, { css } from 'styled-components'
import TimelinePoint from './TimelinePoint'
import { TimelinePointType, TimelineType } from '@/types'

const Timeline = styled.div`
  ${({ theme }) => css`
    display: flex;
    flex-direction: column;
    width: 100%;
    overflow: hidden;

    @media only screen and (min-width: ${theme.mq.tablet}) {
    }
  `}
`

const Line = styled.div.withConfig({
  shouldForwardProp: (prop) => !['loaded'].includes(prop),
})<{ loaded: boolean }>`
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

    @media only screen and (min-width: ${theme.mq.tablet.min}) {
      left: 50%;
      transtform: translateX(-50%), scaleY(100);
    }

  `}
`

type Props = {
  blok: TimelineType
}

export default function TimelineBlock ({ blok } : Props) {

  const [wrapperRectRef, wrapperRect] = useRect()
  const { height: windowHeight } = useWindowSize()
  const lineRef = useRef<HTMLDivElement|undefined>()
  const [loaded, setLoaded] = useState(false)
  const [scrollDirection, setScrollDirection] = useState(0)

  useScroll(({ scroll, direction }: { scroll: number, direction: number }) => {

    if (!lineRef.current) {
      return
    }

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
    <Timeline ref={wrapperRectRef}>
      <Line ref={lineRef} loaded={loaded} />
      {blok.points.map((point: TimelinePointType, index: number) => {
        return (
          <TimelinePoint blok={point} position={index % 2 == 1 ? 'right' : null } key={index} />
        )
      })}
    </Timeline>
  )
}