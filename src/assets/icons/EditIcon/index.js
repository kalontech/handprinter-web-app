import React from 'react'
import { Icon } from 'antd'

const EditSvg = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g>
      <mask
        id="asdasdqwddasdasd"
        mask-type="alpha"
        maskUnits="userSpaceOnUse"
        x="3"
        y="2"
        width="19"
        height="19"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M3 17.25V21H6.75L17.81 9.94L14.06 6.19L3 17.25ZM20.71 7.04C21.1 6.65 21.1 6.02 20.71 5.63L18.37 3.29C17.98 2.9 17.35 2.9 16.96 3.29L15.13 5.12L18.88 8.87L20.71 7.04Z"
          fill="white"
        />
      </mask>
      <g mask="url(#asdasdqwddasdasd)">
        <rect x="-13" y="-13" width="50" height="50" fill="currentColor" />
        <mask
          id="198237891273aksd"
          mask-type="alpha"
          maskUnits="userSpaceOnUse"
          x="-13"
          y="-13"
          width="50"
          height="50"
        >
          <rect x="-13" y="-13" width="50" height="50" fill="currentColor" />
        </mask>
        <g mask="url(#198237891273aksd)" />
      </g>
    </g>
  </svg>
)

const EditIcon = props => <Icon component={EditSvg} {...props} />

export default EditIcon
