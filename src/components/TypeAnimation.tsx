import TypeIt from 'typeit-react'
import { 
  TypeAnimationType,
  PhraseType,
} from '@/types'

type Props = {
  blok: TypeAnimationType
}

const TypeAnimation = ({ blok } : Props) => {

  const Component = blok.heading_type as keyof JSX.IntrinsicElements

  const phrases = blok.phrases.map((phrase: PhraseType) => {
    return phrase.text
  })

  return (
    <Component>
      <TypeIt
        element={'h3'}
        getBeforeInit={(instance) => {
          phrases.forEach((phrase: string) => {
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

export default TypeAnimation