import React from 'react'
import { Icon } from 'antd'

const CompetitionSvg = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M2 2.92544V16.0036L6.12797 15.2561V2.09595L2 2.92544Z"
      fill="currentColor"
    />
    <path
      d="M11.0602 11.7008V2.79322L6.94922 2.08618V15.2463L11.0602 15.9075V12.5593C10.5284 12.4155 10.0653 12.1729 9.69049 11.8377C8.9602 11.1847 8.58993 10.2303 8.58993 9.00088V7.37691H9.41031V9.00088C9.41031 10.6751 10.2089 11.4017 11.0602 11.7008ZM9.00774 6.33094L8.47738 6.8613L7.8973 6.28122L8.42766 5.75086L7.8973 5.22051L8.47738 4.64043L9.00774 5.17078L9.53809 4.64043L10.1182 5.22051L9.58784 5.75086L10.1182 6.28122L9.53809 6.8613L9.00774 6.33094Z"
      fill="currentColor"
    />
    <path
      d="M11.8799 2.78433V11.8746C12.024 11.8882 12.1622 11.8936 12.29 11.8936H13.156V12.7139H12.29C12.1504 12.7139 12.0137 12.7086 11.8799 12.6981V15.8982L16 15.1234V2L11.8799 2.78433ZM14.9335 12.714H14.0948V11.8936H14.9335V12.714Z"
      fill="currentColor"
    />
  </svg>
)

const CompetitionIcon = props => <Icon component={CompetitionSvg} {...props} />

export default CompetitionIcon