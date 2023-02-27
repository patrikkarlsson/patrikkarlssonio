import { useState, useEffect, useRef, useContext } from 'react'
import { useWindowSize } from 'react-use'
import { useScroll } from '@/hooks/use-scroll'
import styled, { css } from 'styled-components'
import { gsap } from 'gsap'
import { useRect, useMediaQuery } from '@studio-freight/hamo'
import HorizontalItem from './HorizontalItem'
import { clamp, mapRange } from '@/lib/maths'
import { AppContext } from '@thebond/storyblok-nextjs-helpers-components'

const HorizontalScroll = styled.div`
  ${({ theme }) => css`
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

    @media only screen and (min-width: ${theme.mq.tablet}) {
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


  @media only screen and (min-width: ${theme.mq.tablet}) {
    position: sticky;
    top: calc((100vh - 33.3vw) / 2);
  }

  @media only screen and (min-width: ${theme.mq.laptop}) {
    top: calc((100vh - 25vw) / 2);
  }

  @media only screen and (min-width: ${theme.mq.desktop}) {
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

export default ({ blok, theme }) => {

  const elementRef = useRef(null)
  const [wrapperRectRef, wrapperRect] = useRect()
  const [elementRectRef, elementRect] = useRect()
  const isMobile = useMediaQuery(`(max-width: 47.9375rem)`)
  const { height: windowHeight } = useWindowSize()
  const [windowWidth, setWindowWidth] = useState()

  const { DynamicComponent } = useContext(AppContext)

  useScroll(({ scroll }) => {
    if (!elementRect || !elementRef.current) return

    const start = wrapperRect.top - windowHeight
    const end = wrapperRect.top + wrapperRect.height - windowHeight

    let progress = mapRange(start + 600, end, scroll, 0, 1)
    progress = clamp(0, progress, 1)

    const x = progress * (elementRect.width - windowWidth)

    const cards = [...elementRef.current.children]

    gsap.to(cards, {
      x: -x,
      // stagger: 0.033,
      ease: 'none',
      duration: 0,
    })
  })

  useEffect(() => {
    const onResize = () => {
      setWindowWidth(
        Math.min(window.innerWidth, document.documentElement.offsetWidth)
      )
    }

    window.addEventListener('resize', onResize, false)
    onResize()

    return () => {
      window.removeEventListener('resize', onResize, false)
    }
  }, [])

  return (
    <HorizontalScroll
    theme={theme}
      ref={wrapperRectRef}
      style={
        elementRect && isMobile == false
          ? { height: elementRect.width + 'px' }
          : {}
      }
    >
      <Inner theme={theme}>
        <Intro>
          {DynamicComponent.render(blok.content[0], blok.content[0]._uid)}
        </Intro>
        <Overflow
          theme={theme}
          ref={(node) => {
            elementRef.current = node
            elementRectRef(node)
          }}
        >
          {blok.items ? blok.items.map((item, index) => (<HorizontalItem theme={theme} blok={item} key={index} />)) : null}
        </Overflow>
      </Inner>
    </HorizontalScroll>
  )
}