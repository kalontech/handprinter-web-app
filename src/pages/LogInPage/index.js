import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'

import { Creators as AccountCreators } from './../../redux/accountStore'
import LocaleSelector from './../../components/LocaleSelector'

const LogInPage = ({ isLoggingIn, logInRequest, token }) => (
  <div>
    <h1>
      <FormattedMessage id="app.logInPage.title" />
    </h1>
    <LocaleSelector />
    <p>
      Token: <code>{token || 'N/A'}</code>
    </p>
    <button
      onClick={() => logInRequest('andriy.tsaryov@eleken.co', 'qwerty123')}
    >
      {isLoggingIn ? 'Logging in...' : 'Log in'}
    </button>
  </div>
)

const mapStateToProps = state => ({
  isLoggingIn: state.account.isLoggingIn,
  token: state.account.token,
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      logInRequest: (email, password) =>
        AccountCreators.logInRequest(email, password),
    },
    dispatch,
  )

LogInPage.propTypes = {
  isLoggingIn: PropTypes.bool.isRequired,
  logInRequest: PropTypes.func.isRequired,
  token: PropTypes.string,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LogInPage)
