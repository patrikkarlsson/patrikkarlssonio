import styled, { css } from 'styled-components'
import { storyblokEditable } from '@storyblok/react/rsc'
import { ContentType, TypeAnimationType } from '@/types'
import { render } from 'storyblok-rich-text-react-renderer'
import TypeAnimation from './TypeAnimation'

const Content = styled.div.withConfig({
  shouldForwardProp: (prop) => ![
    'textColor',
    'textAlign'
  ].includes(prop),
})<{
  textColor?: string,
  textAlign?: string,
}>`
  ${({
    textColor,
    textAlign,
  } : { 
    textColor?: string,
    textAlign?: string,
  }) => css`
  
    color: ${textColor};
    text-align: ${textAlign};

    > * {
      margin-top: 0;

      &:last-child {
        margin-bottom: 0;
      }
    }
  `}
`

type Props = {
  blok: ContentType
}

export default function ContentBlock ({
  blok,
} : Props) {
  return (
    <Content
      {...storyblokEditable(blok)}
      textColor={blok.text_color.value}
      textAlign={blok.text_align}
    >
      {render(blok.content,
        {
          blokResolvers: {
            'type_animation': (blok: TypeAnimationType) => (<TypeAnimation blok={blok} />)
          }
        })}
    </Content>
  )
}


