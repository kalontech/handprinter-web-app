import React, { Component } from 'react'
import PropTypes from 'prop-types'

class CollapsedMenu extends Component {
  componentDidMount() {
    document.body.style.overflow = 'hidden'
  }

  componentWillUnmount() {
    document.body.style.overflow = 'visible'
  }

  render() {
    const { className, children } = this.props
    return <div className={className}>{children}</div>
  }
}

CollapsedMenu.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
}

export default CollapsedMenu
