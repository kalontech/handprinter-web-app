import React from 'react'
import { Icon } from 'antd'

const CloseSvg = () => (
  <svg width={24} height={24} fill="none" opacity={0.4}>
    <mask
      id="prefix__aa"
      maskUnits="userSpaceOnUse"
      x={5}
      y={5}
      width={14}
      height={14}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"
        fill="#fff"
      />
    </mask>
    <g mask="url(#prefix__aa)">
      <path fill="currentColor" d="M-13-13h50v50h-50z" />
      <mask
        id="prefix__bb"
        maskUnits="userSpaceOnUse"
        x={-13}
        y={-13}
        width={50}
        height={50}
      >
        <path fill="#fff" d="M-13-13h50v50h-50z" />
      </mask>
    </g>
  </svg>
)

const CloseIcon = props => <Icon component={CloseSvg} {...props} />

export default CloseIcon
