import React from 'react'
import { Icon } from 'antd'

const DeleteSvg = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g>
      <mask
        id="mask0123123asd"
        maskUnits="userSpaceOnUse"
        x="5"
        y="3"
        width="14"
        height="18"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M6 19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V7H6V19ZM19 4H15.5L14.5 3H9.5L8.5 4H5V6H19V4Z"
          fill="white"
        />
      </mask>
      <g mask="url(#mask0123123asd)">
        <rect x="-13" y="-13" width="50" height="50" fill="currentColor" />
        <mask
          id="mask0123123asdasd"
          mask-type="alpha"
          maskUnits="userSpaceOnUse"
          x="-13"
          y="-13"
          width="50"
          height="50"
        >
          <rect x="-13" y="-13" width="50" height="50" fill="currentColor" />
        </mask>
        <g mask="url(#mask0123123asdasd)" />
      </g>
    </g>
  </svg>
)

const DeleteIcon = props => <Icon component={DeleteSvg} {...props} />

export default DeleteIcon
