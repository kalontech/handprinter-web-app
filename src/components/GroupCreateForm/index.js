import React from 'react'
import { compose } from 'redux'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Upload from 'antd/lib/upload'
import AntForm from 'antd/lib/form'
import Icon from 'antd/lib/icon'
import AntCheckbox from 'antd/lib/checkbox'
import { injectIntl, intlShape } from 'react-intl'

import { MAX_DESCRIPTION_LENGTH } from 'config/common'
import decodeError from 'utils/decodeError'
import colors from 'config/colors'
import { ACCEPT_IMAGE_FORMATS, FILE_SIZE_LIMIT } from 'config/files'
import { required, fileSize } from 'config/validationRules'
import {
  FormItem as FormItemDefault,
  Input,
  PrimaryButton,
} from 'components/Styled'
import media, { sizes } from 'utils/mediaQueryTemplate'

const Form = styled(AntForm)`
  padding: 0 0 70px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: ${colors.white};
  position: relative;

  ${media.phone`
    padding: 0 10px 0;
    flex-grow: 1;
    min-height: 570px;
  `}
`

const UploadWrap = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);

  @media screen and (max-height: ${sizes.phone}px) {
    transform: translateX(-50%) translateY(10%);
  }

  .ant-upload {
    cursor: pointer;
  }
`

const UploadFile = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 110px;
  height: 110px;
  color: ${colors.darkGray};
  border-radius: 50%;
  background: ${colors.lightGray};
  border: 1px solid ${colors.gray};

  span {
    font-size: 10px;
    font-weight: 600;
    text-transform: uppercase;
    padding-top: 2px;
  }
`

const Preview = styled.img`
  width: 110px;
  height: 110px;
  object-fit: cover;
  display: inline-block;
  border-radius: 50%;
`

const Title = styled.h2`
  margin: 70px auto 18px;
  text-align: center;
  line-height: 35px;
  font-size: 28px;
  color: ${colors.dark};

  @media screen and (max-height: ${sizes.phone}px) {
    margin: 130px auto 18px;
  }

  ${media.phone`
    margin-bottom: 2px;
  `}
`

const SubTitle = styled.h3`
  line-height: 20px;
  font-size: 14px;
  text-align: center;
  color: ${colors.darkGray};
  margin-bottom: 30px;

  ${media.phone`
    margin-bottom: 10px;
  `}
`

const TextArea = styled(Input.TextArea)`
  resize: none;
  margin-bottom: 10px;
`

const Checkbox = styled(AntCheckbox)`
  color: ${colors.dark};

  .ant-checkbox {
    color: ${colors.green};
  }
`

const ButtonSubmit = styled(PrimaryButton)`
  width: 100%;
  max-width: 410px;
  min-height: 50px;
  text-transform: capitalize;
  margin: 0 auto;
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

const FormItem = styled(FormItemDefault)`
  max-width: 410px;
  width: 100%;
  margin: 0 auto 12px;
`

const getValueFromEvent = ({ file }) => ({
  file,
  fileUrl: URL.createObjectURL(file),
})

class GroupCreateForm extends React.PureComponent {
  static displayName = 'GroupCreateForm'

  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
    form: PropTypes.object.isRequired,
    intl: intlShape.isRequired,
  }

  state = {
    isSubmitting: false,
    submitError: undefined,
  }

  handleSubmit = e => {
    e.preventDefault()

    const { form, onSubmit, intl } = this.props

    form.validateFields((errors, values) => {
      if (errors) return

      this.setState({ isSubmitting: true }, () => {
        onSubmit(values)
          .then(() => {
            this.setState({ isSubmitting: false, submitError: undefined })
          })
          .catch(error => {
            this.setState({
              isSubmitting: false,
              submitError: intl.formatMessage({
                id: decodeError(error),
              }),
            })
          })
      })
    })
  }

  render() {
    const { submitError } = this.state
    const { form, intl } = this.props

    const { fileUrl: photoPreviewUrl } = form.getFieldValue('picture') || {}
    const fileError = form.getFieldError('picture')

    return (
      <Form onSubmit={this.handleSubmit}>
        <UploadWrap>
          {form.getFieldDecorator('picture', {
            getValueFromEvent,
            rules: [
              {
                validator: fileSize({
                  message: intl.formatMessage(
                    { id: 'app.errors.maxFileSize' },
                    { size: '10MB' },
                  ),
                  maxSize: FILE_SIZE_LIMIT,
                }),
              },
            ],
          })(
            <Upload
              accept={Object.values(ACCEPT_IMAGE_FORMATS).join()}
              showUploadList={false}
              beforeUpload={() => false}
            >
              {photoPreviewUrl ? (
                <Preview src={photoPreviewUrl} alt="preview" />
              ) : (
                <UploadFile>
                  <Icon type="camera" style={{ fontSize: '22px' }} />

                  <span>
                    {intl.formatMessage({
                      id: 'app.actionCreatePage.addPhoto',
                    })}
                  </span>
                </UploadFile>
              )}
            </Upload>,
          )}
        </UploadWrap>

        <Title>
          {intl.formatMessage({ id: 'app.pages.groups.createGroup' })}
        </Title>
        <SubTitle>
          {intl.formatMessage({ id: 'app.pages.groups.createGroupSubTitle' })}
        </SubTitle>

        <FormItem>
          {form.getFieldDecorator('name', {
            rules: [
              required(intl.formatMessage({ id: 'app.errors.isRequired' })),
              {
                max: 15,
                message: intl.formatMessage(
                  { id: 'app.errors.maxLength' },
                  { count: 15 },
                ),
              },
            ],
          })(
            <Input
              type="text"
              placeholder={intl.formatMessage({
                id: 'app.pages.groups.createGroupNameYours',
              })}
            />,
          )}
        </FormItem>

        <FormItem>
          {form.getFieldDecorator('description', {
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
              rows={6}
              placeholder={intl.formatMessage({
                id: 'app.forms.actionDescription',
              })}
            />,
          )}
        </FormItem>

        <FormItem>
          {form.getFieldDecorator('private', {
            initialValue: false,
            rules: [
              required(intl.formatMessage({ id: 'app.errors.isRequired' })),
            ],
          })(
            <Checkbox>
              {intl.formatMessage({
                id: 'app.pages.groups.createGroupPrivate',
              })}
            </Checkbox>,
          )}
        </FormItem>

        <ButtonSubmit
          type="primary"
          htmlType="submit"
          loading={this.state.isSubmitting}
        >
          {intl.formatMessage({
            id: 'app.form.submit',
          })}
        </ButtonSubmit>

        {(fileError || submitError) && (
          <FormError>{fileError || submitError}</FormError>
        )}
      </Form>
    )
  }
}

export default compose(
  Form.create(),
  injectIntl,
)(GroupCreateForm)
