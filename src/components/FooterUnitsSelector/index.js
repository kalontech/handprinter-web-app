import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import ExpandMoreIcon from 'assets/icons/ExpandMoreIcon'

import atom from '../../assets/unit-icons/atom.svg'
import clock from '../../assets/unit-icons/clock.svg'
import { UIContextSettings } from '../../context/uiSettingsContext'

import {
  FooterDropdownMenu,
  FooterDropdownItem,
  FooterDropdown,
  Wrapper,
  Image,
  LangTitle,
} from './styled'

const FooterUnitSelector = props => {
  const UIContextData = useContext(UIContextSettings)

  return (
    <FooterDropdown
      trigger={['click']}
      overlay={
        <FooterDropdownMenu {...props}>
          <FooterDropdownItem
            key={'locale'}
            {...props}
            onClick={() => UIContextData.setShowPhysicalValues(true)}
          >
            <Wrapper>
              <Image src={atom} alt="icon" />
              <FormattedMessage id="app.actions.units.select.PhysicalUnits" />
            </Wrapper>
          </FooterDropdownItem>
          <FooterDropdownItem
            key={'locale'}
            {...props}
            onClick={() => UIContextData.setShowPhysicalValues(false)}
          >
            <Wrapper>
              <Image src={clock} alt="icon" />
              <FormattedMessage id="app.actions.units.select.TimeUnits" />
            </Wrapper>
          </FooterDropdownItem>
        </FooterDropdownMenu>
      }
    >
      <LangTitle>
        <div>
          <Image
            src={UIContextData.showPhysicalValues ? atom : clock}
            style={{ color: 'white' }}
            alt="icon"
          />
          {UIContextData.showPhysicalValues ? (
            <FormattedMessage id="app.actions.units.select.PhysicalUnits" />
          ) : (
            <FormattedMessage id="app.actions.units.select.TimeUnits" />
          )}
        </div>
        <ExpandMoreIcon id={'langSelectorIcon' + String(Math.random())} />
      </LangTitle>
    </FooterDropdown>
  )
}

FooterUnitSelector.propTypes = {
  intl: PropTypes.object.isRequired,
  setLocale: PropTypes.func.isRequired,
  className: PropTypes.string,
  bg: PropTypes.string,
}

export default FooterUnitSelector
