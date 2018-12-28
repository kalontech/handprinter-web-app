import React from 'react'
import { Icon } from 'antd'

const MenuSvg = () => (
  <svg width={24} height={25} fill="none">
    <g opacity={0.4}>
      <mask
        id="prefix__a"
        maskUnits="userSpaceOnUse"
        x={3}
        y={6}
        width={18}
        height={13}
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M3 18.321h18V16.37H3v1.951zm0-4.879h18v-1.951H3v1.951zm0-6.83v1.952h18V6.612H3z"
          fill="#fff"
        />
      </mask>
      <g mask="url(#prefix__a)">
        <path fill="currentColor" d="M-13-11.927h50v48.788h-50z" />
        <mask
          id="prefix__b"
          maskUnits="userSpaceOnUse"
          x={-13}
          y={-12}
          width={50}
          height={49}
        >
          <path fill="#fff" d="M-13-11.927h50v48.788h-50z" />
        </mask>
      </g>
    </g>
  </svg>
)

const MenuIcon = props => <Icon component={MenuSvg} {...props} />

export default MenuIcon
