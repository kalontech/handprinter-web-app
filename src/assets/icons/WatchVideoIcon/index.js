import React from 'react'
import { Icon } from 'antd'

const WatchVideoSvg = () => (
  <svg width="24" height="24" viewBox="0 0 24 24">
    <defs>
      <path
        id="a3"
        d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z"
      />
      <path id="c3" d="M0 0h50v50H0z" />
    </defs>
    <g fill="none" fillRule="evenodd">
      <mask id="b3" fill="#fff">
        <use xlinkHref="#a3" />
      </mask>
      <g mask="url(#b3)">
        <use
          fill="currentColor"
          transform="translate(-13 -13)"
          xlinkHref="#c3"
        />
      </g>
    </g>
  </svg>
)

const WatchVideoIcon = props => <Icon component={WatchVideoSvg} {...props} />

export default WatchVideoIcon
