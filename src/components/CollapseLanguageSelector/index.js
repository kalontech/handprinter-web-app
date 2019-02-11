import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { updateIntl } from 'react-intl-redux'
import { FormattedMessage } from 'react-intl'
import styled from 'styled-components'
import { Menu } from 'antd'

import media from 'utils/mediaQueryTemplate'
import colors from 'config/colors'
import ExpandMoreIcon from 'assets/icons/ExpandMoreIcon'

const SubMenu = Menu.SubMenu

const LangTitle = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  padding: 0 45px;
  ${media.phone`
    padding: 0 15px;
  `}
`

const Image = styled.img`
  margin-right: 6px;
`
const LangMenu = styled(Menu)`
  .ant-menu-sub {
    padding-left: 105px;
    ${media.phone`
      padding-left: 30px;
    `}
  }
`

const Icon = styled(ExpandMoreIcon)`
  color: ${({ color }) => color || colors.green};
`

const CollapseLanguageSelector = props => {
  const { intl, setLocale, className } = props
  return (
    <LangMenu
      className={className}
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
            <Icon {...props} />
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
    </LangMenu>
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
  className: PropTypes.string,
  overrides: PropTypes.object,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CollapseLanguageSelector)
