'use client'
import { fluidType } from './helper/FluidType'

export const colors = {
  black: '#000000',
  white: '#ffffff',
}

const DefaultTheme = () => {
  const mq = {
    mobile: {
      min: '23.4375rem',
      max: '47.9375rem',
    },
    tablet: {
      min: '48rem',
      max: '64rem',
    },
    laptop: {
      min: '64.0625rem',
      max: '107.9375rem',
    },
    desktop: {
      min: '108rem',
      max: '159.9375rem',
    },
  }

  const gutterNumericPixels = 10
  const gutter = '0.625rem'
  const maxContentWidth = '94.5rem'
  const maxContentWidthNumericPixels = 1512
  const menuHeight = '5rem'

  return {
    menuHeight,
    mq,
    gutterNumericPixels,
    gutter,
    maxContentWidth,
    maxContentWidthNumericPixels,
    colors,
    fluidType,
    numericToRem: (value: number) => {
      return `${value / 16}rem`
    },
    remToNumeric: (value: string) => {
      return `${(parseInt(value) ?? 0) * 16}px`
    },
    viewPortHeight: () => {
      return `
        height: 100vh;
        height: calc(var(--vh, 1vh) * 100);
      `
    },
    fullwidthOutsideContainer: () => {
      return `
        width: 100vw;
        position: relative;
        left: 50%;
        right: 50%;
        margin-left: -50vw;
        margin-right: -50vw;
      `
    },
    resetFullwidthOutsideContainer: () => {
      return `
        width: auto;
        position: relative;
        left: auto;
        right: auto;
        margin-left: 0;
        margin-right: 0;
      `
    },
    holder: () => {
      return `
        position: relative;
        margin-left: auto;
        margin-right: auto;
        max-width: ${maxContentWidth};
        width: 100%;
        padding: 0 calc(${gutter} * 2);
        box-sizing: border-box;
      `
    },
  }
}

export default DefaultTheme
