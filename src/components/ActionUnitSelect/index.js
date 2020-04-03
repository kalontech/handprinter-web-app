import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { Select, Icon } from 'antd'
import { FormattedMessage } from 'react-intl'

import atom from '../../assets/unit-icons/atom.png'
import clock from '../../assets/unit-icons/clock.png'
import { UNITS } from '../../utils/constants'
import { UIContextSettings } from '../../context/uiSettingsContext'

const { Option } = Select

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
        <span role="img">
          <img src={atom} style={{ marginRight: '10px' }} />
          <FormattedMessage id="app.actions.units.select.PhysicalUnits" />
        </span>
      </Option>
      <Option key={UNITS.timeUnits} onClick={e => props.toggleUnits(e)}>
        <span role="img">
          <img src={clock} style={{ marginRight: '10px' }} />
          <FormattedMessage id="app.actions.units.select.TimeUnits" />
        </span>
      </Option>
    </Select>
  )
}

ActionUnitSelect.propTypes = {
  toggleUnits: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
}

export default ActionUnitSelect
