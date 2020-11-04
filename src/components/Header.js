import React from 'react'
import { Link } from 'gatsby'
import Navigation from './Navigation'

import logo from '../assets/logo.svg'

const Header = () => {
  return (
    <header>
      <div className="brand">
        <Link to="/"><img className="logo" src={logo} alt="Patrik Karlsson logo"/></Link>
      </div>
      <Navigation />
      <div className="actions"></div>
    </header>
  )
}

export default Header