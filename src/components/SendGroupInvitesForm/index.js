import React from 'react'
import { compose } from 'redux'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Select from 'antd/lib/select'
import AntForm from 'antd/lib/form'
import { injectIntl, intlShape } from 'react-intl'

import { USER_GROUP_ROLES } from 'utils/constants'
import decodeError from 'utils/decodeError'
import colors from 'config/colors'
import { PrimaryButton, DefaultButton } from 'components/Styled'
import MultipleInput from 'components/MultipleInput'

const Form = styled(AntForm)`
  padding: 34px 20px 40px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: ${colors.lightGray};
`

const Title = styled.h2`
  line-height: 28px;
  font-size: 16px;
  color: ${colors.dark};
  margin-bottom: 10px;
  width: 100%;
  max-width: 410px;
`

const SelectField = styled.div`
  width: 100%;
  max-width: 410px;
  margin-bottom: 12px;

  .ant-select-selection--single {
    height: 44px;
  }

  .ant-select-dropdown-menu-item {
    padding: 10px 12px;
  }

  .ant-select-dropdown-menu-item:hover {
    background-color: ${colors.lightGray};
  }

  .ant-select-selection-selected-value {
    padding: 6px 20px 6px 0;
  }

  .ant-select-dropdown-menu-item-selected {
    background-color: ${colors.lightGray};
  }
`

const ButtonsWrap = styled.div`
  width: 100%;
  max-width: 410px;
  display: flex;
  justify-content: space-between;

  button {
    flex-grow: 1;
  }

  button:nth-last-child(2) {
    margin-right: 14px;
  }
`

const ButtonSubmit = styled(PrimaryButton)`
  color: ${colors.white};
  background-color: ${colors.green};

  :hover,
  :focus,
  :active {
    color: ${colors.white};
  }
`

const EmailsField = styled.div`
  max-width: 410px;
  width: 100%;

  > div {
    background-color: ${colors.white};
  }

  > div > div:first-child {
    min-height: 44px;
  }
`

const FormError = styled.span`
  width: 100%;
  max-width: 410px;
  display: flex;
  font-size: 10px;
  font-weight: bold;
  margin-top: 5px;
  text-transform: uppercase;
  color: ${colors.orange};
`

class SendGroupInvitesForm extends React.PureComponent {
  static displayName = 'SendGroupInvitesForm'

  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    form: PropTypes.object.isRequired,
    intl: intlShape.isRequired,
    cancel: PropTypes.shape({
      onCLick: PropTypes.func,
      text: PropTypes.string,
    }),
  }

  state = {
    isSubmitting: false,
    submitError: undefined,
    engageEmails: [],
    engageInputIsTyping: false,
  }

  $select = React.createRef()

  handleSubmit = e => {
    e.preventDefault()

    const { form, onSubmit, intl } = this.props

    form.validateFields((errors, values) => {
      if (errors) return

      this.setState({ isSubmitting: true }, async () => {
        try {
          await onSubmit({ ...values, emails: this.state.engageEmails })

          this.setState({
            isSubmitting: false,
            engageEmails: [],
            submitError: undefined,
          })
        } catch (error) {
          console.error(error)

          this.setState({
            isSubmitting: false,
            submitError: intl.formatMessage({
              id: decodeError(error),
            }),
          })
        }
      })
    })
  }

  render() {
    const {
      engageEmails,
      engageInputIsTyping,
      isSubmitting,
      submitError,
    } = this.state
    const { form, intl, cancel } = this.props

    return (
      <Form onSubmit={this.handleSubmit}>
        <Title>Invite team members</Title>

        <SelectField ref={this.$select}>
          {form.getFieldDecorator('role', {
            initialValue: USER_GROUP_ROLES.MEMBER,
          })(
            <Select getPopupContainer={() => this.$select.current}>
              <Select.Option value={USER_GROUP_ROLES.MEMBER}>
                {intl.formatMessage({ id: 'app.pages.groups.member' })}
              </Select.Option>

              <Select.Option value={USER_GROUP_ROLES.ADMIN}>
                {intl.formatMessage({ id: 'app.pages.groups.admin' })}
              </Select.Option>
            </Select>,
          )}
        </SelectField>

        <EmailsField>
          <MultipleInput
            values={engageEmails}
            onChange={(emails, isTyping) => {
              this.setState({
                engageEmails: emails,
                engageInputIsTyping: isTyping,
              })
            }}
          />
        </EmailsField>

        <ButtonsWrap>
          {cancel && (
            <DefaultButton onClick={cancel.onClick}>
              {cancel.text}
            </DefaultButton>
          )}

          <ButtonSubmit
            type="primary"
            htmlType="submit"
            disabled={engageEmails.length === 0 || engageInputIsTyping}
            loading={isSubmitting}
          >
            {intl.formatMessage({
              id: 'app.increaseHandprintPage.form.sendInvites',
            })}
          </ButtonSubmit>
        </ButtonsWrap>

        {submitError && <FormError>{submitError}</FormError>}
      </Form>
    )
  }
}

export default compose(
  Form.create(),
  injectIntl,
)(SendGroupInvitesForm)
