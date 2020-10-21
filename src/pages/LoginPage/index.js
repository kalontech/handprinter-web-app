import React, { Component, Fragment } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Button, Form } from 'antd'
import { Link } from 'react-router-dom'
import { injectIntl, FormattedMessage } from 'react-intl'
import styled from 'styled-components'
import { animateScroll } from 'react-scroll/modules'
import queryString from 'query-string'

import { Creators as AccountCreators } from 'redux/accountStore'
import {
  ActionCard,
  ActionCardLeftHalf,
  ActionCardRightHalf,
  ActionCardWrapper,
  ActionCardTitle,
  ActionCardForgotPasswordBlock,
  ActionCardRegisterBlock,
  ActionCardFormWrapper,
  FormItem,
  Input,
} from 'components/Styled'
import getValidationRules from 'config/validationRules'
import InputForPassword from 'components/InputForPassword'
import handleFormError from 'utils/handleFormError'
import PageMetadata from 'components/PageMetadata'
import loginActionCardImage from 'assets/images/loginActionCard.jpg'
import loginActionCardImageTablet from 'assets/images/loginActionCardTablet.jpg'
import media from 'utils/mediaQueryTemplate'
import OrganizationCreationSteps from 'components/OrganizationCreationSteps'

const CatImgDesktop = styled.img`
  display: block;
  ${media.desktop`
    display: none;
  `}
`

const CatImgTablet = styled.img`
  display: none;
  ${media.desktop`
    display: block;
  `}
`

const StyledActionCardWrapper = styled(ActionCardWrapper)`
  align-items: stretch;
  height: 100%;
  flex-grow: 1;
  overflow-y: auto;
  ${media.tablet`
    padding: 0px;
  `}
`

class LoginPage extends Component {
  state = {
    createOrganizationFlow: undefined,
    loginWithEmailPassword: false,
  }

  componentDidMount() {
    animateScroll.scrollToTop()
    const { logInWithCodeRequest } = this.props
    const {
      location: { search },
    } = this.props
    if (queryString.parse(search).createOrganization) {
      this.setState({ createOrganizationFlow: true })
    }
    if (queryString.parse(search).code) {
      logInWithCodeRequest(queryString.parse(search).code)
    }
  }

  componentDidUpdate = prevProps => {
    handleFormError('logInError', 'formError', prevProps, this.props)
  }

  handleSubmit = e => {
    e.preventDefault()
    const {
      form: { validateFields },
      logInRequest,
    } = this.props
    const createOrganizationFlow = this.state.createOrganizationFlow
    validateFields((err, values) => {
      if (!err) {
        const { email, password } = values
        logInRequest(email, password, createOrganizationFlow)
      }
    })
  }

  handlePasswordlessSubmit = e => {
    e.preventDefault()
    const {
      form: { validateFields },
      logInEmailRequest,
    } = this.props
    const createOrganizationFlow = this.state.createOrganizationFlow
    validateFields((err, values) => {
      if (!err) {
        const { email } = values
        logInEmailRequest(email, createOrganizationFlow)
      }
    })
  }

  render() {
    const {
      form: { getFieldDecorator },
      intl: { formatMessage },
      isLoggingIn,
    } = this.props
    const { loginWithEmailPassword } = this.state
    const createOrganizationFlow = this.state.createOrganizationFlow
    return (
      <Fragment>
        <PageMetadata pageName="loginPage" />
        <StyledActionCardWrapper>
          <ActionCard>
            <ActionCardLeftHalf span={12} hideOnTablet>
              <CatImgTablet src={loginActionCardImageTablet} />
              <CatImgDesktop src={loginActionCardImage} />
            </ActionCardLeftHalf>
            <ActionCardRightHalf span={12}>
              {createOrganizationFlow && (
                <OrganizationCreationSteps steps={3} active={1} />
              )}
              <ActionCardFormWrapper>
                <ActionCardTitle>
                  <FormattedMessage id={'app.loginPage.title'} />
                </ActionCardTitle>
                {!loginWithEmailPassword ? (
                  <>
                    <Form onSubmit={this.handlePasswordlessSubmit}>
                      <FormItem>
                        {getFieldDecorator('email', {
                          rules: getValidationRules(formatMessage).email,
                          validateTrigger: 'onBlur',
                        })(
                          <Input
                            type="email"
                            placeholder={formatMessage({
                              id: 'app.forms.email',
                            })}
                          />,
                        )}
                      </FormItem>
                      <Button
                        type="primary"
                        htmlType="submit"
                        style={{ width: '100%' }}
                        loading={isLoggingIn}
                      >
                        <FormattedMessage id={'app.loginPage.loginWithEmail'} />
                      </Button>
                      <FormItem>
                        {getFieldDecorator('formError')(
                          <Input type="hidden" />,
                        )}
                      </FormItem>
                      <ActionCardRegisterBlock>
                        <span>
                          <FormattedMessage id="app.loginPage.loginLink" />
                          <a
                            onClick={() =>
                              this.setState({ loginWithEmailPassword: true })
                            }
                          >
                            <FormattedMessage
                              id={'app.loginPage.loginManually'}
                            />
                          </a>
                        </span>
                      </ActionCardRegisterBlock>
                    </Form>
                  </>
                ) : (
                  <Form onSubmit={this.handleSubmit}>
                    <FormItem>
                      {getFieldDecorator('email', {
                        rules: getValidationRules(formatMessage).email,
                        validateTrigger: 'onBlur',
                      })(
                        <Input
                          type="email"
                          placeholder={formatMessage({ id: 'app.forms.email' })}
                        />,
                      )}
                    </FormItem>
                    <FormItem>
                      {getFieldDecorator('password', {
                        rules: getValidationRules(formatMessage).password,
                        validateTrigger: 'onBlur',
                      })(<InputForPassword />)}
                    </FormItem>
                    <ActionCardForgotPasswordBlock>
                      <Link to="/account/reset-password">
                        <FormattedMessage id="app.loginPage.forgotPassword" />
                      </Link>
                    </ActionCardForgotPasswordBlock>
                    <Button
                      type="primary"
                      htmlType="submit"
                      style={{ width: '100%' }}
                      loading={isLoggingIn}
                    >
                      <FormattedMessage id={'app.loginPage.login'} />
                    </Button>
                    <FormItem>
                      {getFieldDecorator('formError')(<Input type="hidden" />)}
                    </FormItem>
                    <ActionCardRegisterBlock>
                      <span>
                        <FormattedMessage id="app.loginPage.doNotHaveAnAccount" />{' '}
                        <Link to="/account/register">
                          <FormattedMessage id={'app.loginPage.register'} />
                        </Link>
                      </span>
                    </ActionCardRegisterBlock>
                  </Form>
                )}
              </ActionCardFormWrapper>
            </ActionCardRightHalf>
          </ActionCard>
        </StyledActionCardWrapper>
      </Fragment>
    )
  }
}

LoginPage.propTypes = {
  form: PropTypes.object.isRequired,
  intl: PropTypes.object.isRequired,
  isLoggingIn: PropTypes.bool.isRequired,
  logInError: PropTypes.string,
  logInWithCodeRequest: PropTypes.func.isRequired,
  logInEmailRequest: PropTypes.func.isRequired,
  logInRequest: PropTypes.func.isRequired,
  overrides: PropTypes.object,
  location: PropTypes.shape({
    search: PropTypes.string,
  }),
}

export default compose(
  connect(
    state => ({
      isLoggingIn: state.account.isLoggingIn,
      logInError: state.account.logInError,
    }),
    {
      logInRequest: AccountCreators.logInRequest,
      logInEmailRequest: AccountCreators.logInEmailRequest,
      logInWithCodeRequest: AccountCreators.logInWithCodeRequest,
    },
  ),
  Form.create(),
  injectIntl,
)(LoginPage)
