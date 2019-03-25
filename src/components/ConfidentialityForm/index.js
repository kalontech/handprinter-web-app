import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import styled from 'styled-components'
import { injectIntl, intlShape } from 'react-intl'
import debounce from 'lodash/debounce'

import Form from 'antd/lib/form'
import notification from 'antd/lib/notification'

import colors from 'config/colors'
import decodeError from 'utils/decodeError'
import { Checkbox } from 'components/Styled'

const SubFields = styled.div`
  padding-left: 32px;
  margin-top: -10px;
  margin-bottom: 10px;
  display: ${({ display = 'initial' }) => display};
`

const CheckboxStyled = styled(Checkbox)`
  border-top: 1px solid ${({ borderColor = colors.gray }) => borderColor};
  width: 100%;
  padding: ${({ padding = '22px 0 22px 10px' }) => padding};
`

const FormItem = styled(Form.Item)`
  margin-bottom: 0;
`

const DIRECT_CONTACTS_FIELD = 'SHARE_ONLY_WITH_DIRECT_CONTACTS'
const USERS_SUGGESTIONS_FIELD = 'SHARE_WITH_USERS_SUGGESTIONS'
const GROUP_MEMBERS_FIELD = 'SHARE_WITH_GROUP_MEMBERS'
const SECONDARY_CONTACTS_FIELD = 'SHARE_WITH_SECONDARY_CONTACTS'
const THIRD_TIER_CONTACTS_FIELD = 'SHARE_WITH_THIRD_TIER_CONTACTS'
const REGISTRED_USERS_FIELD = 'SHARE_WITH_REGISTRED_USERS'
const WEBSITE_VISITORS_FIELD = 'SHARE_WITH_WEBSITE_VISITORS'

const SUB_FIELDS = [
  {
    name: USERS_SUGGESTIONS_FIELD,
    label: 'app.confidentialityForm.suggestions',
  },
  {
    name: GROUP_MEMBERS_FIELD,
    label: 'app.confidentialityForm.groupMembers',
  },
  {
    name: SECONDARY_CONTACTS_FIELD,
    label: 'app.confidentialityForm.secondaryContacts',
  },
  {
    name: THIRD_TIER_CONTACTS_FIELD,
    label: 'app.confidentialityForm.thirdTierContacts',
  },
]

class ConfidentialityForm extends React.PureComponent {
  static propTypes = {
    intl: intlShape.isRequired,
    form: PropTypes.object.isRequired,
    onSubmit: PropTypes.func.isRequired,
    initialValues: PropTypes.shape({
      [DIRECT_CONTACTS_FIELD]: PropTypes.bool,
      [USERS_SUGGESTIONS_FIELD]: PropTypes.bool,
      [GROUP_MEMBERS_FIELD]: PropTypes.bool,
      [SECONDARY_CONTACTS_FIELD]: PropTypes.bool,
      [THIRD_TIER_CONTACTS_FIELD]: PropTypes.bool,
      [REGISTRED_USERS_FIELD]: PropTypes.bool,
      [WEBSITE_VISITORS_FIELD]: PropTypes.bool,
    }),
  }

  handleChangeSubFields = ({ target }) => {
    this.props.form.setFieldsValue({
      [SECONDARY_CONTACTS_FIELD]: target.checked,
      [THIRD_TIER_CONTACTS_FIELD]: target.checked,
      [USERS_SUGGESTIONS_FIELD]: target.checked,
      [GROUP_MEMBERS_FIELD]: target.checked,
    })
  }

  render() {
    const { intl, form, initialValues } = this.props
    const directContacts = form.getFieldValue(DIRECT_CONTACTS_FIELD)

    return (
      <Form>
        <FormItem>
          {form.getFieldDecorator(WEBSITE_VISITORS_FIELD, {
            valuePropName: 'checked',
          })(
            <CheckboxStyled borderColor="transparent">
              {intl.formatMessage({
                id: 'app.confidentialityForm.allUsers',
              })}
            </CheckboxStyled>,
          )}
        </FormItem>

        <FormItem>
          {form.getFieldDecorator(REGISTRED_USERS_FIELD, {
            valuePropName: 'checked',
          })(
            <CheckboxStyled>
              {intl.formatMessage({
                id: 'app.confidentialityForm.registeredUsers',
              })}
            </CheckboxStyled>,
          )}
        </FormItem>

        <FormItem>
          {form.getFieldDecorator(DIRECT_CONTACTS_FIELD, {
            initialValue: initialValues[DIRECT_CONTACTS_FIELD],
            valuePropName: 'checked',
            onChange: this.handleChangeSubFields,
          })(
            <CheckboxStyled>
              {intl.formatMessage({
                id: 'app.confidentialityForm.directContacts',
              })}
            </CheckboxStyled>,
          )}
        </FormItem>

        <SubFields display={directContacts ? 'block' : 'none'}>
          {SUB_FIELDS.map(field => (
            <FormItem key={field.name}>
              {form.getFieldDecorator(field.name, {
                valuePropName: 'checked',
              })(
                <CheckboxStyled borderColor="transparent" padding="11px 0">
                  {intl.formatMessage({
                    id: field.label,
                  })}
                </CheckboxStyled>,
              )}
            </FormItem>
          ))}
        </SubFields>
      </Form>
    )
  }
}

async function handleSubmit(props, changedValues, allValues) {
  const { onSubmit, intl } = props

  try {
    await onSubmit(allValues)
  } catch (error) {
    notification.error({
      message: intl.formatMessage({ id: decodeError(error) }),
    })
  }
}

export default compose(
  injectIntl,
  Form.create({
    mapPropsToFields({ initialValues }) {
      return Object.keys(initialValues).reduce(
        (acc, key) => ({
          ...acc,
          [key]: Form.createFormField({ value: initialValues[key] }),
        }),
        {},
      )
    },
    onValuesChange: debounce(handleSubmit, 500),
  }),
)(ConfidentialityForm)
