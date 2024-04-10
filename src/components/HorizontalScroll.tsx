import { useState, useEffect, useRef } from 'react'
import { useWindowSize } from 'react-use'
import { useScroll } from '@/hooks/useScroll'
import styled, { css } from 'styled-components'
import { gsap } from 'gsap'
import { useRect, useMediaQuery } from '@studio-freight/hamo'
import HorizontalItem from './HorizontalItem'
import { clamp, mapRange } from '@/lib/maths'
import { HorizontalItemType, HorizontalScrollType } from '@/types'
import { StoryblokComponent } from '@storyblok/react/rsc'

const HorizontalScroll = styled.div`
  ${() => css`
    width: 100vw;
    position: relative;
    left: 50%;
    right: 50%;
    margin-left: -50vw;
    margin-right: -50vw;
  `}
`

const Overflow = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    @media only screen and (min-width: ${theme.mq.tablet.min}) {
      flex-wrap: nowrap;
    }
  `}
`

const Inner = styled.div`
${({ theme }) => css`
  overflow: hidden;
  width: 100%;
  display: flex;
  flex-wrap: wrap;


  @media only screen and (min-width: ${theme.mq.tablet.min}) {
    position: sticky;
    top: calc((100vh - 33.3vw) / 2);
  }

  @media only screen and (min-width: ${theme.mq.laptop.min}) {
    top: calc((100vh - 25vw) / 2);
  }

  @media only screen and (min-width: ${theme.mq.desktop.min}) {
    top: calc((100vh - 20vw) / 2);
  }

`}
`

const Intro = styled.div`
  width: 100%;
  position: relative;
  max-width: 650px;
  margin: 0 auto;
`

type Props = {
  blok: HorizontalScrollType
}

const HorizontalScrollBlock = ({ blok } : Props) => {

  const elementRef = useRef(null)
  const [wrapperRectRef, wrapperRect] = useRect()
  const [elementRectRef, elementRect] = useRect()
  const isMobile = useMediaQuery('(max-width: 47.9375rem)')
  const { height: windowHeight } = useWindowSize()
  const [windowWidth, setWindowWidth] = useState<number>()

  useScroll(({ scroll } : { scroll: number }) => {
    if (!elementRect || !elementRef.current) return

    const start = wrapperRect.top - windowHeight
    const end = wrapperRect.top + wrapperRect.height - windowHeight

    let progress = mapRange(
      start + 600,
      end,
      scroll,
      0,
      1
    )
    progress = clamp(
      0,
      progress,
      1
    )

    const x = progress * (elementRect.width - windowWidth)

    const cards = [...elementRef.current.children]

    gsap.to(cards,
      {
        x: -x,
        ease: 'none',
        duration: 0,
      })
  })

  useEffect(() => {
    const onResize = () => {
      setWindowWidth(Math.min(window.innerWidth,
        document.documentElement.offsetWidth))
    }

    window.addEventListener(
      'resize',
      onResize,
      false
    )
    onResize()

    return () => {
      window.removeEventListener(
        'resize',
        onResize,
        false
      )
    }
  },
  [])

  return (
    <HorizontalScroll
      ref={wrapperRectRef}
      style={
        elementRect && !isMobile
          ? { height: elementRect.width + 'px' }
          : {}
      }
    >
      <Inner>
        <Intro>
          {
            blok.content ? blok.content.map((item, index) => (
              <StoryblokComponent blok={item} key={index} />
            )) : null
          }
        </Intro>
        <Overflow
          ref={(node) => {
            elementRef.current = node
            elementRectRef(node)
          }}
        >
          {blok.items ? blok.items.map((item: HorizontalItemType, index: number) => (
            <HorizontalItem blok={item} key={index} />
          )) : null}
        </Overflow>
      </Inner>
    </HorizontalScroll>
  )
}

export default HorizontalScrollBlock