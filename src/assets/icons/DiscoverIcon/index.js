import React from 'react'
import { Icon } from 'antd'

const DiscoverSvg = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 16 16"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <title>ic_discover</title>
    <desc>Created with Sketch.</desc>
    <defs>
      <path
        d="M9,8.175 C8.5425,8.175 8.175,8.5425 8.175,9 C8.175,9.4575 8.5425,9.825 9,9.825 C9.4575,9.825 9.825,9.4575 9.825,9 C9.825,8.5425 9.4575,8.175 9,8.175 L9,8.175 Z M9,1.5 C4.86,1.5 1.5,4.86 1.5,9 C1.5,13.14 4.86,16.5 9,16.5 C13.14,16.5 16.5,13.14 16.5,9 C16.5,4.86 13.14,1.5 9,1.5 L9,1.5 Z M10.6425,10.6425 L4.5,13.5 L7.3575,7.3575 L13.5,4.5 L10.6425,10.6425 L10.6425,10.6425 Z"
        id="path-1_Discover"
      />
      <rect id="path-3_Discover" x="0" y="0" width="38" height="38" />
    </defs>
    <g
      id="Registered"
      stroke="none"
      strokeWidth="1"
      fill="none"
      fillRule="evenodd"
    >
      <g
        id="Handprinter---Actions-Page---History"
        transform="translate(-132.000000, -107.000000)"
      >
        <g id="Group-15" transform="translate(0.000000, 90.000000)">
          <g id="Group-14" transform="translate(131.000000, 15.000000)">
            <g id="Group-4">
              <g id="ic_explore" transform="translate(0.000000, 1.000000)">
                <mask id="mask-2_Discover" fill="white">
                  <use xlinkHref="#path-1_Discover" />
                </mask>
                <g id="Mask" />
                <g id="Colors/Black-Copy-4" mask="url(#mask-2_Discover)">
                  <g transform="translate(-9.750000, -9.750000)">
                    <mask id="mask-4_Discover" fill="white">
                      <use xlinkHref="#path-3_Discover" />
                    </mask>
                    <use
                      id="Black"
                      stroke="none"
                      fill="currentColor"
                      fillRule="evenodd"
                      xlinkHref="#path-3_Discover"
                    />
                  </g>
                </g>
              </g>
            </g>
          </g>
        </g>
      </g>
    </g>
  </svg>
)

const DiscoverIcon = props => <Icon component={DiscoverSvg} {...props} />

export default DiscoverIcon
