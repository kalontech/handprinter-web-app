import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Button, Form, Select, Tooltip } from 'antd'
import { Link } from 'react-router-dom'
import { injectIntl, FormattedMessage } from 'react-intl'

import { Creators as AccountCreators } from './../../redux/accountStore'
import {
  ActionCard,
  ActionCardLeftHalf,
  ActionCardRightHalf,
  ActionCardWrapper,
  ActionCardTitle,
  ActionCardRegisterBlock,
  Input,
  FormItem,
} from './../../components/Styled'
import getValidationRules from './../../config/validationRules'
import InputForPassword from './../../components/InputForPassword'
import handleFormError from './../../utils/handleFormError'

import registerActionCardImage from './../../assets/images/registerActionCard.jpg'
import arrowDownIcon from './../../assets/icons/arrowDown.svg'
import infoFillIcon from './../../assets/icons/infoFill.svg'
import infoOutlineIcon from './../../assets/icons/infoOutline.svg'

class RegisterPage extends Component {
  state = {
    showInvitationCodeTooltip: false,
  }

  handleSubmit = e => {
    e.preventDefault()
    const {
      form: { validateFields },
      registerRequest,
    } = this.props
    validateFields((err, values) => {
      if (!err) {
        delete values.formError
        const { email, password, fullName, country, invitationCode } = values
        registerRequest(email, password, fullName, country, invitationCode)
      }
    })
  }

  toggleInvitationCodeTooltip = showInvitationCodeTooltip => {
    this.setState({ showInvitationCodeTooltip })
  }

  componentDidUpdate = prevProps => {
    handleFormError('registerError', 'formError', prevProps, this.props)
  }

  render() {
    const {
      countries,
      form: { getFieldDecorator },
      intl: { formatMessage },
      isRegistering,
    } = this.props
    const { showInvitationCodeTooltip } = this.state

    return (
      <ActionCardWrapper>
        <ActionCard>
          <ActionCardLeftHalf span={12}>
            <img src={registerActionCardImage} />
          </ActionCardLeftHalf>
          <ActionCardRightHalf span={12}>
            <div style={{ width: '300px' }}>
              <ActionCardTitle>
                <FormattedMessage id="app.registerPage.title" />
              </ActionCardTitle>
              <Form onSubmit={this.handleSubmit} className="login-form">
                <FormItem>
                  {getFieldDecorator('fullName', {
                    rules: getValidationRules(formatMessage).fullName,
                  })(
                    <Input
                      type="text"
                      placeholder={formatMessage({
                        id: 'app.forms.fullName',
                      })}
                    />,
                  )}
                </FormItem>
                <FormItem>
                  {getFieldDecorator('email', {
                    rules: getValidationRules(formatMessage).email,
                  })(
                    <Input
                      type="email"
                      placeholder={formatMessage({
                        id: 'app.forms.email',
                      })}
                    />,
                  )}
                </FormItem>
                <FormItem>
                  {getFieldDecorator('password', {
                    rules: getValidationRules(formatMessage).password,
                  })(<InputForPassword />)}
                </FormItem>
                <FormItem style={{ marginTop: '-3px' }}>
                  {getFieldDecorator('country', {
                    rules: getValidationRules(formatMessage).country,
                  })(
                    <Select
                      showSearch
                      placeholder={formatMessage({
                        id: 'app.forms.country',
                      })}
                      optionFilterProp="children"
                      className="ant-select__override-for__register-page"
                      dropdownClassName="ant-select__override-for__register-page"
                      suffixIcon={<img src={arrowDownIcon} />}
                    >
                      {countries.map(country => (
                        <Select.Option key={country._id} value={country._id}>
                          {country.name}
                        </Select.Option>
                      ))}
                    </Select>,
                  )}
                </FormItem>
                <FormItem>
                  {getFieldDecorator('invitationCode')(
                    <Input
                      type="text"
                      placeholder={formatMessage({
                        id: 'app.forms.invitationCode',
                      })}
                      suffix={
                        <Tooltip
                          onVisibleChange={this.toggleInvitationCodeTooltip}
                          placement="top"
                          title={formatMessage({
                            id: 'app.forms.invitationCode.hint',
                          })}
                        >
                          <img
                            src={
                              showInvitationCodeTooltip
                                ? infoFillIcon
                                : infoOutlineIcon
                            }
                            style={{ cursor: 'pointer' }}
                          />
                        </Tooltip>
                      }
                    />,
                  )}
                </FormItem>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ width: '100%' }}
                  loading={isRegistering}
                >
                  <FormattedMessage id="app.registerPage.register" />
                </Button>
                <FormItem>
                  {getFieldDecorator('formError')(<Input type="hidden" />)}
                </FormItem>
                <ActionCardRegisterBlock>
                  <span>
                    <FormattedMessage id="app.registerPage.alreadyHaveAnAccount" />{' '}
                    <Link to="/account/login">
                      <FormattedMessage id="app.registerPage.login" />
                    </Link>
                  </span>
                </ActionCardRegisterBlock>
              </Form>
            </div>
          </ActionCardRightHalf>
        </ActionCard>
      </ActionCardWrapper>
    )
  }
}

const mapStateToProps = state => ({
  isRegistering: state.account.isRegistering,
  registerError: state.account.registerError,
  countries: state.app.countries,
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      registerRequest: (email, password, fullName, country, invitationCode) =>
        AccountCreators.registerRequest(
          email,
          password,
          fullName,
          country,
          invitationCode,
        ),
    },
    dispatch,
  )

RegisterPage.propTypes = {
  countries: PropTypes.array.isRequired,
  form: {
    setFields: PropTypes.func.isRequired,
  },
  intl: PropTypes.object.isRequired,
  isRegistering: PropTypes.bool.isRequired,
  registerError: PropTypes.string,
  registerRequest: PropTypes.func.isRequired,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Form.create()(injectIntl(RegisterPage)))
