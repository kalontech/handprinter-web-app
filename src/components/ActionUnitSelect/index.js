import React from 'react'
import PropTypes from 'prop-types'
import { Select, Icon } from 'antd'
import { FormattedMessage, injectIntl } from 'react-intl'

import atom from '../../assets/unit-icons/atom.svg'
import clock from '../../assets/unit-icons/clock.svg'

const { Option } = Select

function ActionUnitSelect(props) {
  const {
    toggleUnits,
    intl: { formatMessage },
  } = props
  return (
    <Select
      mode="default"
      style={{ width: '100%' }}
      onChange={null}
      defaultValue={formatMessage({
        id: 'app.actions.units.select.PhysicalUnits',
      })}
      menuItemSelectedIcon={<Icon />}
    >
      <Option key="PhysicalUnits" onClick={e => toggleUnits(e)}>
        <span role="img">
          <img src={atom} style={{ marginRight: '10px' }} />
          <FormattedMessage id="app.actions.units.select.PhysicalUnits" />
        </span>
      </Option>
      <Option key="TimeUnits" onClick={e => props.toggleUnits(e)}>
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

export default injectIntl(ActionUnitSelect)
