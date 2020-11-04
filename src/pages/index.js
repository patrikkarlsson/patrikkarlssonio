import React from 'react'
import { graphql } from 'gatsby'
import Img from "gatsby-image"

import Layout from '../components/Layout'
import Hero from '../components/Hero'
import Section from '../components/Section'
import FullWidthImage from '../components/FullWidthImage'

const Home = ({ data }) => {
  return (
    <Layout>
      <Section>
        <Hero>
          <h1>Hi!</h1>
          <p>My name is Patrik Karlsson. I'm a web developer based in Stenungsund, Sweden.</p>
        </Hero>
        <FullWidthImage>
          <Img
            fluid={data.file.childImageSharp.fluid}
            alt="Patrik Karlsson"
          />
        </FullWidthImage>
      </Section>
    </Layout>
  )
}

export default Home

export const query = graphql`
  query MyQuery {
    file(relativePath: { eq: "me.jpg" }) {
      childImageSharp {
        fluid {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`