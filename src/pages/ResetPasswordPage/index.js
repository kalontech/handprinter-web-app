import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Button, Form } from 'antd'
import { injectIntl, FormattedMessage } from 'react-intl'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { animateScroll } from 'react-scroll/modules'

import {
  FormItem,
  Input,
  OceanContainer,
  OceanModal,
  OceanTitle,
  OceanDescription,
  OceanForm,
} from 'components/Styled'
import { Creators as AccountCreators } from 'redux/accountStore'
import getValidationRules from 'config/validationRules'
import handleFormError from 'utils/handleFormError'
import PageMetadata from 'components/PageMetadata'

class ResetPasswordPage extends React.PureComponent {
  componentDidMount() {
    animateScroll.scrollToTop()
  }

  componentDidUpdate = prevProps => {
    handleFormError('resetPasswordError', 'formError', prevProps, this.props)
  }

  handleSubmit = e => {
    e.preventDefault()
    const {
      form: { validateFields },
      resetPasswordRequest,
    } = this.props
    validateFields((err, values) => {
      if (!err) {
        delete values.formError
        const { email } = values
        resetPasswordRequest(email)
      }
    })
  }

  render() {
    const {
      form: { getFieldDecorator },
      intl: { formatMessage },
      resettingPassword,
    } = this.props
    return (
      <Fragment>
        <PageMetadata pageName="resetPasswordPage" />
        <OceanContainer>
          <OceanModal>
            <OceanTitle>
              <FormattedMessage id="app.resetPasswordPage.title" />
            </OceanTitle>
            <OceanDescription>
              <FormattedMessage id="app.resetPasswordPage.description" />
            </OceanDescription>
            <OceanForm>
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
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ width: '100%' }}
                  loading={resettingPassword}
                >
                  <FormattedMessage id="app.resetPasswordPage.send" />
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
  resetPasswordError: state.account.resetPasswordError,
  resettingPassword: state.account.resettingPassword,
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      resetPasswordRequest: email =>
        AccountCreators.resetPasswordRequest(email),
    },
    dispatch,
  )

ResetPasswordPage.propTypes = {
  form: PropTypes.object.isRequired,
  intl: PropTypes.object.isRequired,
  resetPasswordError: PropTypes.string,
  resetPasswordRequest: PropTypes.func.isRequired,
  resettingPassword: PropTypes.bool.isRequired,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Form.create()(injectIntl(ResetPasswordPage)))
