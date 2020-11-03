import React from 'react'
import Header from './Header'


import '../assets/scss/main.scss'

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main>
        {children}
      </main>
    </>
  )
}

export default Layout