'use client'

const styling = `
  .logo-storyblok,
  .login__header {
    display: none;
  }

  .login__container {
    position: relative;
  }

  .login__container::before {
    content: '';
    position: absolute;
    top: -70px;
    left: calc(50% - 100px);
    width: 200px;
    height: 60px;
    background-size: contain;
    background-repeat: no-repeat;
    background-image: url("/pk.svg");
    background-position: center;

  }
`

export default function RootLayout(props: React.PropsWithChildren) {

  return (    
    <html lang="en">
      <head>
        <style
          id="holderStyle"
          dangerouslySetInnerHTML={{
            __html: styling,
          }}/>
      </head>
      <body>
        {props.children}
      </body>
    </html>
  )
}
