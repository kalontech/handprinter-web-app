import React from 'react'
import { Icon } from 'antd'

const SuggestedSvg = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 12"
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
  >
    <title>ic_Suggested</title>
    <desc>Created with Sketch.</desc>
    <defs>
      <path
        d="M12,8.25 C13.245,8.25 14.2425,7.245 14.2425,6 C14.2425,4.755 13.245,3.75 12,3.75 C10.755,3.75 9.75,4.755 9.75,6 C9.75,7.245 10.755,8.25 12,8.25 L12,8.25 Z M6,8.25 C7.245,8.25 8.2425,7.245 8.2425,6 C8.2425,4.755 7.245,3.75 6,3.75 C4.755,3.75 3.75,4.755 3.75,6 C3.75,7.245 4.755,8.25 6,8.25 L6,8.25 Z M6,9.75 C4.2525,9.75 0.75,10.6275 0.75,12.375 L0.75,14.25 L11.25,14.25 L11.25,12.375 C11.25,10.6275 7.7475,9.75 6,9.75 L6,9.75 Z M12,9.75 C11.7825,9.75 11.535,9.765 11.2725,9.7875 C12.1425,10.4175 12.75,11.265 12.75,12.375 L12.75,14.25 L17.25,14.25 L17.25,12.375 C17.25,10.6275 13.7475,9.75 12,9.75 L12,9.75 Z"
        id="path-1_Suggested"
      />
      <rect id="path-2_Suggested" x="0" y="0" width="38" height="38" />
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
        transform="translate(-264.000000, -109.000000)"
      >
        <g id="Group-15" transform="translate(0.000000, 90.000000)">
          <g id="Group-14" transform="translate(131.000000, 15.000000)">
            <g id="Group-10" transform="translate(133.000000, 0.000000)">
              <g id="ic_group" transform="translate(0.000000, 1.000000)">
                <mask id="mask-2_Suggested" fill="white">
                  <use xlinkHref="#path-1_Suggested" />
                </mask>
                <g id="Mask" />
                <g id="Colors/Black-Copy-4" mask="url(#mask-2_Suggested)">
                  <g transform="translate(-9.750000, -9.750000)">
                    <mask id="mask-4_Suggested" fill="white">
                      <use xlinkHref="#path-2_Suggested" />
                    </mask>
                    <use
                      id="Black"
                      stroke="none"
                      fill="currentColor"
                      fillRule="evenodd"
                      xlinkHref="#path-2_Suggested"
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

const SuggestedIcon = props => <Icon component={SuggestedSvg} {...props} />

export default SuggestedIcon
