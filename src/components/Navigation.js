import React from 'react'
import { Link } from 'gatsby'

const Navigation = () => {
  return (
    <nav>
      <Link to="/work">Work</Link>
      <Link to="/about">About</Link>
    </nav>
  )
}

export default Navigation