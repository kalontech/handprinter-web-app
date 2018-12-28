import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { updateIntl } from 'react-intl-redux'
import { FormattedMessage } from 'react-intl'
import ExpandMoreIcon from '../../assets/icons/ExpandMoreIcon'
import styled from 'styled-components'
import colors from './../../config/colors'
import * as Ant from 'antd'
import hexToRgba from '../../utils/hexToRgba'

const FooterDropdown = styled(Ant.Dropdown)`
  margin-top: -2px;
  max-width: 148px;
  width: 100%;
  cursor: pointer;
  margin-left: 25px;
`

const LangTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 34px;
  border-radius: 4px;
  padding: 0 10px;
  background-color: ${colors.footerDropdownBg};
  color: ${hexToRgba(colors.white, 0.6)};
  > div {
    display: flex;
    align-items: center;
  }
`

const FooterDropdownMenu = styled(Ant.Menu)`
  background: ${colors.dark};
  padding: 5px 0;
`

const FooterDropdownItem = styled(Ant.Menu.Item)`
  line-height: 40px;
  margin: 0 5px;
  padding: 0;
  border-radius: 4px;
  font-size: 16px;
  color: ${hexToRgba(colors.white, 0.6)};
  &.ant-dropdown-menu-item-selected,
  &:hover {
    background-color: ${colors.footerDropdownBg};
    color: ${colors.white};
  }
`

const Wrapper = styled.div`
  padding: 0 4px;
`

const Image = styled.img`
  margin-right: 6px;
`

const FooterLanguageSelector = ({ intl, setLocale, className }) => {
  return (
    <FooterDropdown
      className={className}
      trigger={['click']}
      overlay={
        <FooterDropdownMenu
          onClick={item => setLocale(item.key, intl.locales[item.key])}
        >
          {Object.keys(intl.locales).map(locale => (
            <FooterDropdownItem key={locale}>
              <Wrapper>
                <Image
                  src={require(`../../assets/languages/${locale}.svg`)}
                  alt="icon"
                />
                <FormattedMessage id={`app.languages.${locale}`} />
              </Wrapper>
            </FooterDropdownItem>
          ))}
        </FooterDropdownMenu>
      }
    >
      <LangTitle>
        <div>
          <Image
            src={require(`../../assets/languages/${intl.locale}.svg`)}
            alt="icon"
          />
          <FormattedMessage id={`app.languages.${intl.locale}`} />
        </div>
        <ExpandMoreIcon />
      </LangTitle>
    </FooterDropdown>
  )
}

FooterLanguageSelector.propTypes = {
  intl: PropTypes.object.isRequired,
  setLocale: PropTypes.func.isRequired,
  className: PropTypes.string,
}

const mapStateToProps = state => ({
  intl: state.intl,
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setLocale: (locale, messages) => updateIntl({ locale, messages }),
    },
    dispatch,
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FooterLanguageSelector)
