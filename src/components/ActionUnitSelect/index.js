import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { Select, Icon } from 'antd'
import { FormattedMessage } from 'react-intl'
import styled from 'styled-components'

import colors from '../../config/colors'
import { ReactComponent as Atom } from '../../assets/unit-icons/atom.svg'
import { ReactComponent as Clock } from '../../assets/unit-icons/clock.svg'
import { UNITS } from '../../utils/constants'
import { UIContextSettings } from '../../context/uiSettingsContext'

const { Option } = Select

const SVGWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  path {
    fill: ${props => props.color};
  }
  margin-right: 9px;
`

const UnitWrapper = styled.span`
  display: flex;
  justify-content: flex-start;
  align-items: center;
`

function ActionUnitSelect(props) {
  const UIContextData = useContext(UIContextSettings)
  const { toggleUnits } = props
  return (
    <Select
      mode="default"
      style={{ width: '100%' }}
      onChange={null}
      defaultValue={
        UIContextData.showPhysicalValues ? UNITS.physicalUnits : UNITS.timeUnits
      }
      menuItemSelectedIcon={<Icon />}
    >
      <Option key={UNITS.physicalUnits} onClick={e => toggleUnits(e)}>
        <UnitWrapper role="img">
          <SVGWrap color={colors.dark}>
            <Atom />
          </SVGWrap>
          <FormattedMessage id="app.actions.units.select.PhysicalUnits" />
        </UnitWrapper>
      </Option>
      <Option key={UNITS.timeUnits} onClick={e => props.toggleUnits(e)}>
        <UnitWrapper role="img">
          <SVGWrap color={colors.dark}>
            <Clock />
          </SVGWrap>
          <FormattedMessage id="app.actions.units.select.TimeUnits" />
        </UnitWrapper>
      </Option>
    </Select>
  )
}

ActionUnitSelect.propTypes = {
  toggleUnits: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
}

export default ActionUnitSelect
