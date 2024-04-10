import styled, { css } from 'styled-components'
import { StoryblokComponent, storyblokEditable } from '@storyblok/react/rsc'
import { SectionType } from '@/types'


const Section = styled.div.withConfig({
  shouldForwardProp: (prop) => ![
    'backgroundColor',
  ].includes(prop),
})<{
  backgroundColor?: string,
}>`
  ${({ backgroundColor }) => css`
    width: 100%;
    height: 100%;
    padding: 2rem;
    box-sizing: border-box;
    position: relative;
    ${backgroundColor && css`
      background-color: ${backgroundColor};
    `}
  `}
`

type Props = {
  blok: SectionType
}

const SectionBlock = ({ blok }: Props) => {
  return (
    <Section
      {...storyblokEditable(blok)}
      backgroundColor={blok.background_color.value}
    >
      {blok.body.map((nestedBlok:any) => (
        <StoryblokComponent
          blok={nestedBlok}
          key={nestedBlok._uid}
        />
      ))}
    </Section>
  )
}

export default SectionBlock