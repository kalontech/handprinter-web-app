import React from 'react'
import PropTypes from 'prop-types'

const ExpandMoreIcon = props => {
  const { id, iconColor } = props
  return (
    <i style={{ color: iconColor, maxHeight: '20px' }}>
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <mask
          id={id}
          maskUnits="userSpaceOnUse"
          x="6"
          y="8"
          width="12"
          height="9"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M18 10.0001L16.59 8.59009L12 13.1701L7.41 8.59009L6 10.0001L12 16.0001L18 10.0001Z"
            fill="white"
          />
        </mask>
        <g mask={`url(#${id})`}>
          <rect
            x="37"
            y="-13"
            width="50"
            height="50"
            transform="rotate(90 37 -13)"
            fill="currentColor"
          />
        </g>
      </svg>
    </i>
  )
}

ExpandMoreIcon.defaultProps = {
  id: 'expandMoreIcon',
  iconColor: 'inherit',
}

ExpandMoreIcon.propTypes = {
  id: PropTypes.string,
  iconColor: PropTypes.string,
}

export default ExpandMoreIcon
