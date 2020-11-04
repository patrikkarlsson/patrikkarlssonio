import React from 'react'

const FullWidthImage = ({ children }) => {

  return (
    <div className="full-width-image">
      <div className="image">
        {children}
      </div>
    </div>
  )
}

export default FullWidthImage