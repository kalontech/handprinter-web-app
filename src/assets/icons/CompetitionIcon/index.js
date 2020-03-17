import React from 'react'
import { Icon } from 'antd'

const CampaignSvg = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M14.25 3.75H12.75V2.25H5.25V3.75H3.75C2.925 3.75 2.25 4.425 2.25 5.25V6C2.25 7.9125 3.69 9.4725 5.5425 9.705C6.015 10.83 7.0275 11.6775 8.25 11.925V14.25H5.25V15.75H12.75V14.25H9.75V11.925C10.9725 11.6775 11.985 10.83 12.4575 9.705C14.31 9.4725 15.75 7.9125 15.75 6V5.25C15.75 4.425 15.075 3.75 14.25 3.75ZM5.25 8.115C4.38 7.8 3.75 6.975 3.75 6V5.25H5.25V8.115ZM14.25 6C14.25 6.975 13.62 7.8 12.75 8.115V5.25H14.25V6Z"
      fill="currentColor"
    />
  </svg>
)

const CampaignIcon = props => <Icon component={CampaignSvg} {...props} />

export default CampaignIcon
