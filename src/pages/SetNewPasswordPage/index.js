import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Button, Form } from 'antd'
import { injectIntl, FormattedMessage } from 'react-intl'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import {
  FormItem,
  Input,
  OceanContainer,
  OceanModal,
  OceanTitle,
  OceanForm,
} from './../../components/Styled'
import { Creators as AccountCreators } from './../../redux/accountStore'
import getValidationRules from './../../config/validationRules'
import InputForPassword from './../../components/InputForPassword'
import handleFormError from './../../utils/handleFormError'

class SetNewPasswordPage extends Component {
  state = {
    showPassword: false,
  }

  handleSubmit = e => {
    e.preventDefault()
    const {
      form: { validateFields },
      match: {
        params: { code },
      },
      setNewPasswordRequest,
    } = this.props
    validateFields((err, values) => {
      if (!err) {
        delete values.formError
        const { password } = values
        setNewPasswordRequest(code, password)
      }
    })
  }

  componentDidUpdate = prevProps => {
    handleFormError('setNewPasswordError', 'formError', prevProps, this.props)
  }

  render() {
    const {
      form: { getFieldDecorator },
      intl: { formatMessage },
      settingNewPassword,
    } = this.props
    return (
      <OceanContainer>
        <OceanModal>
          <OceanTitle>
            <FormattedMessage id="app.setNewPasswordPage.title" />
          </OceanTitle>
          <OceanForm>
            <Form onSubmit={this.handleSubmit}>
              <FormItem>
                {getFieldDecorator('password', {
                  rules: getValidationRules(formatMessage).password,
                })(<InputForPassword />)}
              </FormItem>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: '100%' }}
                loading={settingNewPassword}
              >
                <FormattedMessage id="app.setNewPasswordPage.changePassword" />
              </Button>
              <FormItem>
                {getFieldDecorator('formError')(<Input type="hidden" />)}
              </FormItem>
            </Form>
          </OceanForm>
        </OceanModal>
      </OceanContainer>
    )
  }
}

const mapStateToProps = state => ({
  setNewPasswordError: state.account.setNewPasswordError,
  settingNewPassword: state.account.settingNewPassword,
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setNewPasswordRequest: (code, password) =>
        AccountCreators.setNewPasswordRequest(code, password),
    },
    dispatch,
  )

SetNewPasswordPage.propTypes = {
  form: PropTypes.object.isRequired,
  intl: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  setNewPasswordError: PropTypes.string,
  setNewPasswordRequest: PropTypes.func.isRequired,
  settingNewPassword: PropTypes.bool.isRequired,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Form.create()(injectIntl(SetNewPasswordPage)))
