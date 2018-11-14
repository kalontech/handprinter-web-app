import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Button, Form } from 'antd'
import { Link } from 'react-router-dom'
import { injectIntl, FormattedMessage } from 'react-intl'

import { Creators as AccountCreators } from './../../redux/accountStore'
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
} from './../../components/Styled'

import loginActionCardImage from './../../assets/images/loginActionCard.jpg'
import eyeFillIcon from './../../assets/icons/eyeFill.svg'
import eyeSlashFillIcon from './../../assets/icons/eyeSlashFill.svg'

class LoginPage extends Component {
  state = {
    showPassword: false,
  }

  handleSubmit = e => {
    e.preventDefault()
    const {
      form: { validateFields },
      logInRequest,
    } = this.props
    validateFields((err, values) => {
      if (!err) {
        const { email, password } = values
        logInRequest(email, password)
      }
    })
  }

  toggleShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword })
  }

  componentDidUpdate = prevProps => {
    const {
      form: { setFields },
      intl: { formatMessage },
      logInError,
    } = this.props
    if (prevProps.logInError !== logInError) {
      setFields({
        error: {
          errors: logInError
            ? [new Error(formatMessage({ id: logInError }))]
            : [],
        },
      })
    }
  }

  render() {
    const {
      form: { getFieldDecorator },
      intl: { formatMessage },
      isLoggingIn,
    } = this.props
    const { showPassword } = this.state
    return (
      <ActionCardWrapper>
        <ActionCard>
          <ActionCardLeftHalf span={12}>
            <img src={loginActionCardImage} />
          </ActionCardLeftHalf>
          <ActionCardRightHalf span={12}>
            <ActionCardFormWrapper>
              <ActionCardTitle>
                <FormattedMessage id="app.loginPage.title" />
              </ActionCardTitle>
              <Form onSubmit={this.handleSubmit}>
                <FormItem>
                  {getFieldDecorator('email', {
                    rules: [
                      {
                        required: true,
                        message: formatMessage({
                          id: 'app.forms.email.required',
                        }),
                      },
                      {
                        type: 'email',
                        message: formatMessage({
                          id: 'app.forms.email.invalid',
                        }),
                      },
                    ],
                  })(
                    <Input
                      type="email"
                      placeholder={formatMessage({ id: 'app.forms.email' })}
                    />,
                  )}
                </FormItem>
                <FormItem>
                  {getFieldDecorator('password', {
                    rules: [
                      {
                        required: true,
                        message: formatMessage({
                          id: 'app.forms.password.required',
                        }),
                      },
                      {
                        min: 8,
                        message: formatMessage({
                          id: 'app.forms.password.tooShort',
                        }),
                      },
                      {
                        max: 64,
                        message: formatMessage({
                          id: 'app.forms.password.tooLong',
                        }),
                      },
                    ],
                  })(
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      placeholder={formatMessage({ id: 'app.forms.password' })}
                      suffix={
                        <img
                          onClick={this.toggleShowPassword}
                          src={showPassword ? eyeFillIcon : eyeSlashFillIcon}
                          style={{ cursor: 'pointer' }}
                        />
                      }
                    />,
                  )}
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
                  Login
                </Button>
                <FormItem>
                  {getFieldDecorator('error')(<Input type="hidden" />)}
                </FormItem>
                <ActionCardRegisterBlock>
                  <span>
                    <FormattedMessage id="app.loginPage.doNotHaveAnAccount" />{' '}
                    <Link to="/account/register">
                      <FormattedMessage id="app.loginPage.register" />
                    </Link>
                  </span>
                </ActionCardRegisterBlock>
              </Form>
            </ActionCardFormWrapper>
          </ActionCardRightHalf>
        </ActionCard>
      </ActionCardWrapper>
    )
  }
}

const mapStateToProps = state => ({
  isLoggingIn: state.account.isLoggingIn,
  logInError: state.account.logInError,
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      logInRequest: (email, password) =>
        AccountCreators.logInRequest(email, password),
    },
    dispatch,
  )

LoginPage.propTypes = {
  form: PropTypes.object.isRequired,
  intl: PropTypes.object.isRequired,
  isLoggingIn: PropTypes.bool.isRequired,
  logInError: PropTypes.string,
  logInRequest: PropTypes.func.isRequired,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Form.create()(injectIntl(LoginPage)))
