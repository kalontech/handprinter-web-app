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
import getValidationRules from './../../config/validationRules'
import InputForPassword from './../../components/InputForPassword'
import handleFormError from './../../utils/handleFormError'

import loginActionCardImage from './../../assets/images/loginActionCard.jpg'

class LoginPage extends Component {
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

  componentDidUpdate = prevProps => {
    handleFormError('logInError', 'formError', prevProps, this.props)
  }

  render() {
    const {
      form: { getFieldDecorator },
      intl: { formatMessage },
      isLoggingIn,
    } = this.props
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
                    rules: getValidationRules(formatMessage).email,
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
                  <FormattedMessage id="app.loginPage.login" />
                </Button>
                <FormItem>
                  {getFieldDecorator('formError')(<Input type="hidden" />)}
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
