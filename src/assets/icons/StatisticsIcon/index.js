import React from 'react'
import { Icon } from 'antd'

const Svg = () => (
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
      x="2"
      y="2"
      width="14"
      height="14"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M14.25 2.25H3.75C2.925 2.25 2.25 2.925 2.25 3.75V14.25C2.25 15.075 2.925 15.75 3.75 15.75H14.25C15.075 15.75 15.75 15.075 15.75 14.25V3.75C15.75 2.925 15.075 2.25 14.25 2.25ZM6.75 12.75H5.25V7.5H6.75V12.75ZM9.75 12.75H8.25V5.25H9.75V12.75ZM12.75 12.75H11.25V9.75H12.75V12.75Z"
        fill="white"
      />
    </mask>
    <g mask="url(#mask0)">
      <rect x="-9.75" y="-9.75" width="37.5" height="37.5" fill="#858F8E" />
    </g>
  </svg>
)

const StatisticIcon = props => <Icon component={Svg} {...props} />

export default StatisticIcon
