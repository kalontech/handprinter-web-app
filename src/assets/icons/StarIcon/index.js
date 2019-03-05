import React from 'react'
import Icon from 'antd/lib/icon'

const StarSvg = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <mask
      id="mask0sssaaaaa"
      maskUnits="userSpaceOnUse"
      x="1"
      y="1"
      width="16"
      height="15"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M9 12.9525L13.635 15.75L12.405 10.4775L16.5 6.93L11.1075 6.4725L9 1.5L6.8925 6.4725L1.5 6.93L5.595 10.4775L4.365 15.75L9 12.9525Z"
        fill="white"
      />
    </mask>
    <g mask="url(#mask0sssaaaaa)">
      <rect
        x="-9.75"
        y="-9.75"
        width="37.5"
        height="37.5"
        fill="currentColor"
      />
      <mask
        id="mask1sssaaaaa"
        maskUnits="userSpaceOnUse"
        x="-10"
        y="-10"
        width="38"
        height="38"
      >
        <rect x="-9.75" y="-9.75" width="37.5" height="37.5" fill="white" />
      </mask>
      <g mask="url(#mask1sssaaaaa)" />
    </g>
  </svg>
)

const StarIcon = props => <Icon component={StarSvg} {...props} />

export default StarIcon
