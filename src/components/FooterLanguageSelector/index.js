import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { updateIntl } from 'react-intl-redux'
import { FormattedMessage } from 'react-intl'
import ExpandMoreIcon from 'assets/icons/ExpandMoreIcon'

import {
  FooterDropdownMenu,
  FooterDropdownItem,
  FooterDropdown,
  Wrapper,
  Image,
  LangTitle,
} from './styled'

const FooterLanguageSelector = props => {
  const { intl, setLocale, className } = props
  console.log('LANDS', props)
  return (
    <FooterDropdown
      className={className}
      trigger={['click']}
      overlay={
        <FooterDropdownMenu
          {...props}
          onClick={item => setLocale(item.key, intl.locales[item.key])}
        >
          {Object.keys(intl.locales).map(locale => (
            <FooterDropdownItem key={locale} {...props}>
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
        <ExpandMoreIcon id={'langSelectorIcon' + String(Math.random())} />
      </LangTitle>
    </FooterDropdown>
  )
}

FooterLanguageSelector.propTypes = {
  intl: PropTypes.object.isRequired,
  setLocale: PropTypes.func.isRequired,
  className: PropTypes.string,
  bg: PropTypes.string,
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
