import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { updateIntl } from 'react-intl-redux'
import { FormattedMessage } from 'react-intl'
import ExpandMoreIcon from '../../assets/icons/ExpandMoreIcon'
import styled from 'styled-components'
import colors from './../../config/colors'
import { Menu } from 'antd'
const SubMenu = Menu.SubMenu

const LangTitle = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: Arial;
  font-size: 16px;
`

const Image = styled.img`
  margin-right: 6px;
`

const CollapseLanguageSelector = ({ intl, setLocale }) => {
  return (
    <Menu
      mode="inline"
      inlineIndent={0}
      onClick={item => setLocale(item.key, intl.locales[item.key])}
    >
      <SubMenu
        key="lang"
        style={{ borderBottom: 'none' }}
        title={
          <LangTitle>
            <div>
              <Image
                src={require(`../../assets/languages/${intl.locale}.svg`)}
                alt="icon"
              />
              <FormattedMessage id={`app.languages.${intl.locale}`} />
            </div>
            <ExpandMoreIcon
              style={{ color: `${colors.darkBlue}`, transform: 'none' }}
            />
          </LangTitle>
        }
      >
        {Object.keys(intl.locales).map(locale => (
          <Menu.Item key={locale}>
            <Image
              src={require(`../../assets/languages/${locale}.svg`)}
              alt="icon"
            />
            <FormattedMessage id={`app.languages.${locale}`} />
          </Menu.Item>
        ))}
      </SubMenu>
    </Menu>
  )
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

CollapseLanguageSelector.propTypes = {
  intl: PropTypes.object.isRequired,
  setLocale: PropTypes.func.isRequired,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CollapseLanguageSelector)
