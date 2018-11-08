import React from 'react'
import { Dropdown, Menu, Icon } from 'antd'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { updateIntl } from 'react-intl-redux'

const LocaleSelector = ({ intl, setLocale }) => (
  <Dropdown
    overlay={
      <Menu onClick={item => setLocale(item.key, intl.locales[item.key])}>
        {Object.keys(intl.locales).map(locale => (
          <Menu.Item key={locale}>{locale}</Menu.Item>
        ))}
      </Menu>
    }
  >
    <a className="ant-dropdown-link" href="#">
      {intl.locale} <Icon type="down" />
    </a>
  </Dropdown>
)

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

LocaleSelector.propTypes = {
  intl: PropTypes.object.isRequired,
  setLocale: PropTypes.func.isRequired,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LocaleSelector)
