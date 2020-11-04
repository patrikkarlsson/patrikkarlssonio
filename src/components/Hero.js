import React from 'react'

const Hero = ({ children }) => {

  return (
    <div className="hero">
      <div className="content -text-center">
        {children}
      </div>
    </div>
  )
}

export default Hero