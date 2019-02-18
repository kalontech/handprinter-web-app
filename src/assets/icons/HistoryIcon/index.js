import React from 'react'
import { Icon } from 'antd'

const HistorySvg = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 10 16"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <title>ic_History</title>
    <desc>Created with Sketch.</desc>
    <defs>
      <polygon
        id="path-1_History"
        points="4.5 1.5 4.5 6 4.5075 6 4.5 6.0075 7.5 9 4.5 12 4.5075 12.0075 4.5 12.0075 4.5 16.5 13.5 16.5 13.5 12.0075 13.4925 12.0075 13.5 12 10.5 9 13.5 6.0075 13.4925 6 13.5 6 13.5 1.5"
      />
      <rect id="path-3_History" x="0" y="0" width="38" height="38" />
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
        transform="translate(-550.000000, -107.000000)"
      >
        <g id="Group-15" transform="translate(0.000000, 90.000000)">
          <g id="Group-14" transform="translate(131.000000, 15.000000)">
            <g id="Group-13" transform="translate(415.000000, 0.000000)">
              <g
                id="ic_hourglass_full"
                transform="translate(0.000000, 1.000000)"
              >
                <mask id="mask-2_History" fill="white">
                  <use xlinkHref="#path-1_History" />
                </mask>
                <g id="Mask" />
                <g id="Colors/Black-Copy-6" mask="url(#mask-2_History)">
                  <g transform="translate(-9.750000, -9.750000)">
                    <mask id="mask-4_History" fill="white">
                      <use xlinkHref="#path-3_History" />
                    </mask>
                    <use
                      id="Black"
                      stroke="none"
                      fill="currentColor"
                      fillRule="evenodd"
                      xlinkHref="#path-3_History"
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

const HistoryIcon = props => <Icon component={HistorySvg} {...props} />

export default HistoryIcon
