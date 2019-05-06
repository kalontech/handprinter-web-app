import React from 'react'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import styled from 'styled-components'
import { injectIntl, intlShape } from 'react-intl'
import Form from 'antd/lib/form'
import Upload from 'antd/lib/upload'

import { MAX_DESCRIPTION_LENGTH } from 'config/common'
import { GROUPS_STATUSES } from 'utils/constants'
import media from 'utils/mediaQueryTemplate'
import { ACCEPT_IMAGE_FORMATS } from 'config/files'
import colors from 'config/colors'
import { required } from 'config/validationRules'
import {
  FormItem as FormItemDefault,
  Input,
  SecondaryButton,
} from 'components/Styled'
import { getUserInitialAvatar } from 'api'

const FormStyled = styled(Form)`
  position: relative;
  padding: 70px 0 20px;
  width: 100%;
  max-width: 580px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`

const UploadWrap = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
`

const Preview = styled.img`
  width: 110px;
  height: 110px;
  object-fit: cover;
  display: inline-block;
  border-radius: 50%;
`

const Name = styled.h4`
  line-height: 35px;
  font-size: 28px;
  text-align: center;
  color: ${colors.dark};
  margin-bottom: 6px;
`

const Counter = styled.span`
  line-height: 20px;
  font-size: 14px;
  text-align: center;
  color: ${colors.darkGray};
  margin-bottom: 14px;
`

const Description = styled.p`
  color: ${colors.dark};
  line-height: 28px;
  font-size: 16px;
  text-align: center;
`

const FormItem = styled(FormItemDefault)`
  width: 100%;
  margin: 0 auto 12px;
`

const TextArea = styled(Input.TextArea)`
  resize: none;
  margin-bottom: 10px;
`

const TitleWrap = styled.div`
  position: relative;
`

const ButtonDeleted = styled(SecondaryButton)`
  position: absolute;
  top: 50%;
  right: 0;
  transform: translateX(100%) translateX(20px) translateY(-50%) translateY(-3px);
  border: 1px solid ${colors.orange};
  color: ${colors.orange};
  font-size: 10px;
  background-color: transparent;
  text-transform: uppercase;
  min-width: 98px;
  height: 28px;
  pointer-events: none;

  ${media.phone`
    min-width: 48px;
    padding: 0 10px;  
  `}
`

class GroupDetailedForm extends React.PureComponent {
  static displayName = 'GroupDetailedForm'

  static propTypes = {
    intl: intlShape.isRequired,
    initialValues: PropTypes.shape({
      picture: PropTypes.string,
      name: PropTypes.string,
      description: PropTypes.string,
    }),
    onSubmit: PropTypes.func.isRequired,
    form: PropTypes.object.isRequired,
    counter: PropTypes.string,
    disabled: PropTypes.bool,
  }

  static defaultProps = {
    disabled: true,
  }

  state = {
    editingField: undefined,
  }

  $button = React.createRef()

  triggerSubmit = () => {
    this.$button.current.click()
  }

  handleSubmit = e => {
    e.preventDefault()

    const { form, onSubmit } = this.props

    form.validateFields((errors, values) => {
      if (errors) return

      this.setState({ editingField: undefined })

      onSubmit(values)
    })
  }

  toggleFieldVisibility = filedName => () => {
    this.setState({ editingField: this.props.disabled ? undefined : filedName })
  }

  render() {
    const { editingField } = this.state
    const {
      form,
      intl,
      initialValues,
      counter,
      disabled,
      onSubmit,
    } = this.props

    return (
      <FormStyled onSubmit={this.handleSubmit}>
        <UploadWrap>
          <Upload
            accept={Object.values(ACCEPT_IMAGE_FORMATS).join()}
            showUploadList={false}
            beforeUpload={() => false}
            disabled={disabled}
            onChange={e => {
              onSubmit({
                picture: { file: e.file, fileUrl: URL.createObjectURL(e.file) },
              })
            }}
          >
            <Preview
              src={
                initialValues.picture ||
                getUserInitialAvatar(initialValues.name)
              }
              alt="preview"
            />
          </Upload>
        </UploadWrap>

        {editingField === 'name' ? (
          <FormItem>
            {form.getFieldDecorator('name', {
              initialValue: initialValues.name,
              rules: [
                required(intl.formatMessage({ id: 'app.errors.isRequired' })),
                {
                  max: 100,
                  message: intl.formatMessage(
                    { id: 'app.errors.maxLength' },
                    { count: 100 },
                  ),
                },
              ],
            })(
              <Input
                autoFocus
                type="text"
                placeholder={intl.formatMessage({
                  id: 'app.pages.groups.createGroupNameYours',
                })}
                onBlur={this.triggerSubmit}
              />,
            )}
          </FormItem>
        ) : (
          <TitleWrap>
            <Name onClick={this.toggleFieldVisibility('name')}>
              {initialValues.name}
            </Name>

            {initialValues.status === GROUPS_STATUSES.DELETED && (
              <ButtonDeleted>
                {intl.formatMessage({ id: 'app.groups.delete' })}
              </ButtonDeleted>
            )}
          </TitleWrap>
        )}

        <Counter>{counter}</Counter>

        {editingField === 'description' ? (
          <FormItem>
            {form.getFieldDecorator('description', {
              initialValue: initialValues.description,
              rules: [
                {
                  max: MAX_DESCRIPTION_LENGTH,
                  message: intl.formatMessage(
                    { id: 'app.errors.maxLength' },
                    { count: MAX_DESCRIPTION_LENGTH },
                  ),
                },
              ],
            })(
              <TextArea
                autoFocus
                rows={6}
                placeholder={intl.formatMessage({
                  id: 'app.forms.actionDescription',
                })}
                onBlur={this.triggerSubmit}
              />,
            )}
          </FormItem>
        ) : (
          <Description onClick={this.toggleFieldVisibility('description')}>
            {initialValues.description}
          </Description>
        )}

        <button ref={this.$button} hidden type="submit" />
      </FormStyled>
    )
  }
}

export default compose(
  Form.create(),
  injectIntl,
)(GroupDetailedForm)
