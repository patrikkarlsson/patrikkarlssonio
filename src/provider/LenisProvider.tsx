'use client'
import { useFrame } from '@studio-freight/hamo'
import Lenis from '@studio-freight/lenis'
import { useEffect } from 'react'
import { useStore } from '@/lib/store'


const LenisProvider = (props: React.PropsWithChildren) => {

  const [lenis, setLenis] = useStore<any[]>((state) => [state.lenis, state.setLenis])

  useEffect(() => {
    const lenis = new Lenis({
      syncTouch: false,
    })
    setLenis(lenis)

    return () => {
      lenis.destroy()
      setLenis(null)
    }
  },
  [setLenis])

  useFrame((time:any) => {
    if (lenis) {
      lenis.raf(time)  
    }
  })
  
  return (
    <>
      {props.children} 
    </>
  )
}

export default LenisProvider