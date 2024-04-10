import 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    gutterNumericPixels: number,
    gutter: string,
    maxContentWidth: string,
    maxContentWidthNumericPixels: number,
    menuHeight: string,
    mq: {
      mobile: {
        min: string,
        max: string,
      },
      tablet: {
        min: string,
        max: string,
      },
      laptop: {
        min: string,
        max: string,
      },
      desktop: {
        min: string,
        max: string,
      },
    },
    colors: {
      white: string,
      black: string,
    },
    fluidType: (property:string, minVW:string, maxVW:string, minSize:string, maxSize:string) => string,
    numericToRem: (px:number) => string,
    remToNumeric: (rem:string) => string,
    viewPortHeight: () => string,
    fullwidthOutsideContainer: () => string,
    resetFullwidthOutsideContainer: () => string,
    holder: () => string,
  }
}