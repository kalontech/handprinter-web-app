import React from 'react'
import { Icon } from 'antd'

const expandMoreSvg = () => (
  <svg width="24" height="24" viewBox="0 0 24 24">
    <defs>
      <path id="a" d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
      <path id="c" d="M0 0h50v50H0z" />
    </defs>
    <g fill="none" fillRule="evenodd">
      <mask id="b" fill="#fff">
        <use xlinkHref="#a" />
      </mask>
      <g mask="url(#b)">
        <use
          fill="currentColor"
          transform="translate(-13 -13)"
          xlinkHref="#c"
        />
      </g>
    </g>
  </svg>
)

const ExpandMoreIcon = () => <Icon component={expandMoreSvg} />

export default ExpandMoreIcon
