import React from 'react'
import { Icon } from 'antd'

const FlagSvg = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <mask
      id="mask0"
      mask-type="alpha"
      maskUnits="userSpaceOnUse"
      x="3"
      y="3"
      width="12"
      height="13"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M10.8 4.5L10.5 3H3.75V15.75H5.25V10.5H9.45L9.75 12H15V4.5H10.8Z"
        fill="currentColor"
      />
    </mask>
    <g mask="url(#mask0)">
      <rect
        x="-9.75"
        y="-9.75"
        width="37.5"
        height="37.5"
        fill="currentColor"
      />
    </g>
  </svg>
)

const FlagIcon = props => <Icon component={FlagSvg} {...props} />

export default FlagIcon
