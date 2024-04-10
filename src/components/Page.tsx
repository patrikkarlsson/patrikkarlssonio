
import { StoryblokComponent } from '@storyblok/react/rsc'
import Layout from './Layout'
import Header from './Header'
import styled, { css } from 'styled-components'
import { PageType, SectionType } from '@/types'

const Main = styled.main`
  ${() => css`
  height: 100%;
  min-height: calc(var(--vh, 1vh) * 100);
  `}
`

type Props = {
  blok: PageType
}

const Page = ({
  blok,
} : Props) => {
  return (
    <>
      <Layout>
        <Header />
        <Main>
          {blok.body && blok.body.map((nestedBlok: SectionType) => (
            <StoryblokComponent blok={nestedBlok} key={nestedBlok._uid} />
          ))}
        </Main>
      </Layout>
    </>
  )
}
 
export default Page