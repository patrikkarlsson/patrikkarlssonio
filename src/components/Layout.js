import styled, { css } from 'styled-components'
import Lenis from '@studio-freight/lenis'
import { useFrame } from '@studio-freight/hamo'
import { useStore } from '@/lib/store'
import { useLayoutEffect } from 'react'

const Main = styled.main`
  ${({ theme }) => css`
    min-height: 100vh;
  `}
`

export default ({ children }) => {
  const [lenis, setLenis] = useStore((state) => [state.lenis, state.setLenis])

  useLayoutEffect(() => {
    const lenis = new Lenis()
    window.lenis = lenis
    setLenis(lenis)

    return () => {
      lenis.destroy()
      setLenis(null)
    }
  }, [])

  useFrame((time) => {
    lenis?.raf(time)
  }, [])

  return (
    <Main className="container">
      {children}
    </Main>
  )
}
