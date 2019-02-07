import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Button, Form } from 'antd'
import { injectIntl, FormattedMessage } from 'react-intl'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { animateScroll } from 'react-scroll'

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
import PageMetadata from '../../components/PageMetadata'

class SetNewPasswordPage extends React.PureComponent {
  state = {
    showPassword: false,
  }

  componentDidMount() {
    animateScroll.scrollToTop()
  }

  componentDidUpdate = prevProps => {
    handleFormError('setNewPasswordError', 'formError', prevProps, this.props)
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

  render() {
    const {
      form: { getFieldDecorator },
      intl: { formatMessage },
      settingNewPassword,
    } = this.props
    return (
      <Fragment>
        <PageMetadata pageName="resetPasswordPage" />
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
                    validateTrigger: 'onBlur',
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
      </Fragment>
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
