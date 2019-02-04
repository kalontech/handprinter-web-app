import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { updateIntl } from 'react-intl-redux'
import styled from 'styled-components'
import { FormattedMessage } from 'react-intl'
import { Menu, Popover } from 'antd'

import { HeaderPopover, PopoverTitle } from 'components/Styled'
import ExpandMoreIcon from 'assets/icons/ExpandMoreIcon'
import colors from 'config/colors'

const Image = styled.img`
  margin-right: 12px;
`

const Icon = styled(ExpandMoreIcon)`
  color: ${({ iconColor }) => iconColor || colors.green};
`

const HeaderLanguageSelector = props => {
  const { intl, setLocale } = props
  return (
    <Popover
      placement="bottomLeft"
      content={
        <HeaderPopover
          {...props}
          mode="vertical"
          theme="light"
          onClick={item => setLocale(item.key, intl.locales[item.key])}
        >
          {Object.keys(intl.locales).map(locale => (
            <Menu.Item key={locale}>
              <Image
                src={require(`../../assets/languages/${locale}.svg`)}
                alt=""
              />
              <FormattedMessage id={`app.languages.${locale}`} />
            </Menu.Item>
          ))}
        </HeaderPopover>
      }
    >
      <PopoverTitle {...props}>
        <FormattedMessage id={`app.languages.${intl.locale}`}>
          {message => <span>{message.substr(0, 3)}</span>}
        </FormattedMessage>
        <Icon {...props} />
      </PopoverTitle>
    </Popover>
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

HeaderLanguageSelector.propTypes = {
  intl: PropTypes.object.isRequired,
  setLocale: PropTypes.func.isRequired,
  color: PropTypes.string,
  overrides: PropTypes.object,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HeaderLanguageSelector)
