import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Select, Icon } from 'antd'

import colors from 'config/colors'

import { TabsSelectWrapper, SelectButtonWrapper, SelectButton } from './styled'

const { Option } = Select

const TabsSelect = props => {
  const {
    defaultSelectVal,
    isMobile,
    data,
    history,
    formatMessage,
    isActionsPage,
  } = props

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
              <Option
                key={1}
                style={{ background: `${colors.dark}` }}
                value={tabOpt.text}
              >
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
        {isActionsPage && (
          <Option
            key={5}
            style={{
              background: `${colors.dark}`,
              cursor: 'unset',
            }}
            disabled
          >
            <SelectButtonWrapper>
              <SelectButton
                onClick={() => {
                  history.push('/account/actions/create')
                }}
              >
                <p style={{ opacity: '1' }}>
                  {formatMessage({ id: 'app.headerActions.addAction' })}
                </p>
              </SelectButton>
            </SelectButtonWrapper>
          </Option>
        )}
      </Select>
    </TabsSelectWrapper>
  )
}

TabsSelect.propTypes = {
  defaultSelectVal: PropTypes.node,
  isMobile: PropTypes.bool,
  data: PropTypes.array,
  history: PropTypes.object,
  formatMessage: PropTypes.func,
  isActionsPage: PropTypes.bool,
}

export default TabsSelect
