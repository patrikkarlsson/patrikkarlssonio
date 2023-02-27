import { useRef, useEffect } from 'react'
import TypeIt from 'typeit-react'

export default ({ blok, theme }) => {

  const Component = blok.heading_type

  const phrases = blok.phrases.map((phrase) => {
    return phrase.text
  })

  return (
    <Component>
    <TypeIt
        element={"h3"}
        getBeforeInit={(instance) => {
          phrases.forEach((phrase) => {
            instance.type(phrase).pause(750).delete()
          })
          return instance
        }}
        options={{
          speed: 100,
          loop: true,
        }}
      />
      </Component>
  )
}

