import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Select, Icon } from 'antd'

import colors from 'config/colors'

import { TabsSelectWrapper } from './styled'

const { Option } = Select

const TabsSelect = ({ defaultSelectVal, isMobile, data }) => {
  return (
    <TabsSelectWrapper>
      <Select
        mode="default"
        defaultValue={defaultSelectVal}
        dropdownMenuStyle={{
          background: `${colors.dark}`,
          marginTop: '-3px',
          paddingLeft: isMobile ? '8px' : '18px',
        }}
      >
        {data.map(tabOpt => {
          if (tabOpt) {
            return (
              <Option key={1} style={{ background: `${colors.dark}` }}>
                <Link to={tabOpt.to} style={{ color: `${colors.white}` }}>
                  <Icon
                    component={tabOpt.icon}
                    style={{ marginRight: '10px' }}
                  />
                  {tabOpt.text}
                </Link>
              </Option>
            )
          }
        })}
      </Select>
    </TabsSelectWrapper>
  )
}

TabsSelect.propTypes = {
  defaultSelectVal: PropTypes.node,
  isMobile: PropTypes.bool,
  data: PropTypes.array,
}

export default TabsSelect
