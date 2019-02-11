import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Alert } from 'antd'
import styled from 'styled-components'
import * as Sentry from '@sentry/browser'
import { injectIntl, FormattedMessage } from 'react-intl'

import { DefaultButton } from 'components/Styled'

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-direction: column;

  button {
    margin-top: 15px;
  }
`

class ErrorCatcher extends Component {
  state = {
    error: null,
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error })
    Sentry.withScope(scope => {
      Object.keys(errorInfo).forEach(key => {
        scope.setExtra(key, errorInfo[key])
      })
      Sentry.captureException(error)
    })
  }

  handleSendReport() {
    Sentry.showReportDialog()
  }

  renderErrorHanlerView = () => (
    <Wrapper>
      <Alert
        message={this.props.intl.formatMessage({
          id: 'app.errorHandlerPage.pleaseSendReportAndReloadPage',
        })}
        type="error"
      />
      <DefaultButton onClick={this.handleSendReport}>
        <FormattedMessage id="app.errorHandlerPage.sendReport" />
      </DefaultButton>
    </Wrapper>
  )

  render() {
    if (this.state.error) {
      // render fallback UI
      return this.renderErrorHanlerView()
    }

    // when there's not an error, render children untouched
    return this.props.children
  }
}

ErrorCatcher.propTypes = {
  children: PropTypes.array,
  intl: PropTypes.object.isRequired,
}

export default injectIntl(ErrorCatcher)
