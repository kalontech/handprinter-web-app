import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { updateIntl } from 'react-intl-redux'
import styled from 'styled-components'
import colors from './../../config/colors'
import { FormattedMessage } from 'react-intl'
import { Menu, Popover } from 'antd'
import { HeaderPopover } from '../../components/Styled'
import ExpandMoreIcon from '../../assets/icons/ExpandMoreIcon'

const PopoverTitle = styled.div`
  display: flex;
  align-items: center;
  line-height: 1;
  margin-right: 40px;
  color: ${colors.menuLink};
  cursor: pointer;

  &.ant-popover-open {
    color: ${colors.dark};
  }
`

const Image = styled.img`
  margin-right: 12px;
`

const HeaderLanguageSelector = ({ intl, setLocale }) => {
  return (
    <Popover
      placement="bottomLeft"
      content={
        <HeaderPopover
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
      <PopoverTitle>
        <FormattedMessage id={`app.languages.${intl.locale}`}>
          {message => <span>{message.substr(0, 3)}</span>}
        </FormattedMessage>
        <ExpandMoreIcon />
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
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(HeaderLanguageSelector)
