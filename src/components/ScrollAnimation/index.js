import React from 'react'
import PropTypes from 'prop-types'
import Fade from 'react-reveal/Fade'

const ScrollAnimation = props => {
  const { children, ...rest } = props
  const settings = {
    distance: '10px',
    style: {
      transition: 'all 0.2s cubic-bezier(0.215, 0.61, 0.355, 1)',
    },
  }
  return (
    <Fade {...settings} {...rest}>
      {children}
    </Fade>
  )
}

ScrollAnimation.propTypes = {
  children: PropTypes.node,
}

export default ScrollAnimation
