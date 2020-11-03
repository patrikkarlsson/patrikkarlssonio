import React from 'react'
import { Link } from 'gatsby'
import Navigation from './Navigation'

import logo from '../assets/logo.svg'

const Header = () => {
  return (
    <header>
      <Link to="/"><img className="logo" src={logo} alt="Patrik Karlsson logo"/></Link>
      <Navigation />
    </header>
  )
}

export default Header