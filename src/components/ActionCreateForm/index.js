import React from 'react'
import { compose } from 'redux'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Upload, Form, Icon, Select } from 'antd'
import { injectIntl, intlShape } from 'react-intl'

import { FormItem, Input, PrimaryButton } from 'components/Styled'
import { ACCEPT_IMAGE_FORMATS, FILE_SIZE_LIMIT } from 'config/files'
import { MAX_DESCRIPTION_LENGTH } from 'config/common'
import colors from 'config/colors'
import { required, fileSize } from 'config/validationRules'
import media from 'utils/mediaQueryTemplate'
import decodeError from 'utils/decodeError'
import hexToRgba from 'utils/hexToRgba'

import { categories } from '../../pages/ActionsPage/ActionFilter/filterData'

const { Option } = Select

const StyledForm = styled(Form)`
  margin: 10px 40px;
  height: 580px;
  width: 93vw;
  max-width: 920px;
  display: flex;
  flex-grow: 1;
  justify-content: space-between;
  background-color: ${colors.white};
  border-radius: 4px;

  ${media.tablet`
    margin: 10px 20px;
    flex-direction: column;
    align-items: center;
    max-height: 100%;
    justify-content: flex-start;
   `}

  ${media.phone`
    margin: 10px;
  `}
`

const UploadWrap = styled.div`
  width: 50%;
  border-radius: 4px;
  overflow: hidden;

  ${media.tablet`
    width: 100%;
   `}
`

const MainFields = styled.div`
  width: 50%;
  padding: 44px 60px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  ${media.tablet`
    width: 100%;
    padding: 24px 20px;
  `}
`

const Title = styled.header`
  font-size: 28px;
  line-height: 35px;
  text-align: center;
  margin-bottom: 12px;
  text-transform: capitalize;
`

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`

const SaveButton = styled(PrimaryButton)`
  min-width: 50%;
  text-transform: capitalize;
`

const ButtonCancel = styled(PrimaryButton)`
  min-width: 47%;
  color: ${colors.ocean};
  background-color: ${hexToRgba(colors.ocean, 0.1)};

  &:active,
  &:focus,
  &:hover {
    color: ${colors.ocean};
    background-color: ${hexToRgba(colors.ocean, 0.3)};
  }
`

const TextArea = styled(Input.TextArea)`
  resize: none;
`

const StyledUpload = styled(Upload)`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: stretch;

  .ant-upload {
    flex-grow: 1;
    max-width: 100%;
  }
`

const UploadContent = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${colors.lightGray};
`

const Preview = styled.div`
  position: relative;
  height: 100%;
  flex-grow: 1;
  overflow: hidden;
  max-width: 100%;

  ${media.tablet`
    max-height: 250px;
    width: auto;
  `}

  ${media.phone`
    max-height: 210px;
    height: 210px;
  `}
`

const PhotoError = styled.article`
  position: absolute;
  bottom: ${props => (props.inButton ? '-66%' : '0')};
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  min-width: 200px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${props => (props.inButton ? colors.orange : colors.lightGray)};
  font-size: ${props => (props.inButton ? '10px' : '14px')};

  background-color: ${props =>
    props.inButton ? 'transparent' : hexToRgba(colors.white, 0.9)};

  font-weight: bold;
  line-height: 19px;
  text-shadow: ${props =>
    props.inButton ? 'none' : `0 0 10px ${hexToRgba(colors.white, 0.3)}`};
  text-transform: uppercase;
  white-space: pre-line;
  text-align: center;
`

const PreviewStyled = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

const PreviewButton = styled.button`
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  height: 50px;
  outline: 0;
  border: 0;
  cursor: pointer;
  background-color: ${hexToRgba(colors.gray, 0.5)};
  color: ${colors.white};
  font-size: 14px;
  font-weight: bold;
  line-height: 19px;
  text-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
`

const AddPhotoBlockWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${colors.darkGray};
  ${media.tablet`
    padding: 30px 0;
  `}
`

const AddPhotoBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

const ButtonAddPhoto = styled.button`
  position: relative;
  outline: 0;
  border: 1px solid ${colors.gray};
  border-radius: 50%;
  background-color: transparent;
  width: 100px;
  height: 100px;
  cursor: pointer;
`

const FormError = styled.span`
  width: 100%;
  display: flex;
  font-size: 10px;
  font-weight: bold;
  margin-top: 5px;
  text-transform: uppercase;
  color: ${colors.orange};
`

const AddPhotoBlockText = styled.div`
  max-width: 210px;
  text-align: center;
  margin-top: 15px;
  font-size: 14px;
`

const ButtonAddPhotoContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  i {
    font-size: 22px;
  }
  span {
    text-transform: uppercase;
    font-size: 10px;
    margin-top: 4px;
    font-weight: bold;
  }
`

class ActionCreatePage extends React.PureComponent {
  static propTypes = {
    form: PropTypes.object,
    intl: intlShape.isRequired,
    initialValues: PropTypes.object,
    onCancel: PropTypes.func,
    onSubmit: PropTypes.func,
  }

  state = {
    isSubmitting: false,
    submitFailed: false,
    submitSucceeded: false,
  }

  _submitPromise = undefined

  componentWillUnmount() {
    this._submitPromise = undefined
  }

  handleSubmit = e => {
    e.preventDefault()

    const { form, onSubmit, intl } = this.props

    form.validateFields(async (errors, values) => {
      if (errors) return

      this.setState({ isSubmitting: true })

      try {
        this._submitPromise = onSubmit(values)

        await this._submitPromise

        if (this._submitPromise) {
          this.setState({
            isSubmitting: false,
            submitFailed: false,
            submitSucceeded: true,
          })
        }
      } catch (error) {
        if (this._submitPromise) {
          console.error(error)
          this.setState({
            isSubmitting: false,
            submitFailed: intl.formatMessage({ id: decodeError(error) }),
            submitSucceeded: false,
          })
        }
      } finally {
        this._submitPromise = undefined
      }
    })
  }

  render() {
    const {
      form: { getFieldDecorator, getFieldError, getFieldValue },
      intl: { formatMessage },
      initialValues,
      onCancel,
    } = this.props
    const { submitFailed, isSubmitting } = this.state

    const { fileUrl: photoPreviewUrl } = getFieldValue('photo') || {}
    const photoError = getFieldError('photo')

    return (
      <StyledForm onSubmit={this.handleSubmit}>
        <UploadWrap>
          {getFieldDecorator('photo', {
            getValueFromEvent: ({ file }) => ({
              file,
              fileUrl: URL.createObjectURL(file),
            }),
            rules: [
              required(formatMessage({ id: 'app.errors.image.required' })),
              {
                validator: fileSize({
                  message: formatMessage(
                    { id: 'app.errors.maxFileSize' },
                    { size: '10MB' },
                  ),
                  maxSize: FILE_SIZE_LIMIT,
                }),
              },
            ],
          })(
            <StyledUpload
              accept={Object.values(ACCEPT_IMAGE_FORMATS).join()}
              showUploadList={false}
              beforeUpload={() => false}
            >
              <UploadContent>
                {photoPreviewUrl ? (
                  <Preview>
                    <PreviewStyled
                      src={photoPreviewUrl}
                      alt="action photo preview"
                    />

                    {photoError && <PhotoError>{photoError}</PhotoError>}

                    <PreviewButton type="button">
                      {formatMessage({ id: 'app.forms.updatePhoto' })}
                    </PreviewButton>
                  </Preview>
                ) : (
                    <AddPhotoBlockWrap>
                      <AddPhotoBlock>
                        <ButtonAddPhoto type="button">
                          <ButtonAddPhotoContent>
                            <Icon type="camera" />
                            <span>
                              {formatMessage({
                                id: 'app.actionCreatePage.addPhoto',
                              })}
                            </span>
                          </ButtonAddPhotoContent>
                        </ButtonAddPhoto>
                        <AddPhotoBlockText>
                          {formatMessage({
                            id: 'app.actionCreatePage.uploadImageDescription',
                          })}
                        </AddPhotoBlockText>
                      </AddPhotoBlock>
                    </AddPhotoBlockWrap>
                  )}
              </UploadContent>
            </StyledUpload>,
          )}
        </UploadWrap>

        <MainFields>
          <div>
            <Title>
              {formatMessage({
                id: initialValues
                  ? 'app.actions.card.edit'
                  : 'app.actionCreatePage.title',
              })}
            </Title>

            <FormItem>
              {getFieldDecorator('name', {
                rules: [
                  required(formatMessage({ id: 'app.errors.isRequired' })),
                ],
              })(
                <Input
                  type="text"
                  placeholder={formatMessage({ id: 'app.forms.actionName' })}
                />,
              )}
            </FormItem>

            <FormItem>
              {getFieldDecorator('category', {
                rules: [
                  required(formatMessage({ id: 'app.errors.isRequired' })),
                ],
              })(
                <Select
                  placeholder={formatMessage({
                    id: 'app.forms.actionCategory',
                  })}
                  mode="default"
                  style={{ width: '100%' }}
                  onChange={null}
                  menuItemSelectedIcon={<Icon />}
                >
                  {categories.map(category => {
                    return (
                      <Option key={category.id} value={category.name}>
                        {category.name}
                      </Option>
                    )
                  })}
                </Select>,
              )}
            </FormItem>

            <FormItem>
              {getFieldDecorator('description', {
                rules: [
                  required(formatMessage({ id: 'app.errors.isRequired' })),
                  {
                    max: MAX_DESCRIPTION_LENGTH,
                    message: formatMessage(
                      { id: 'app.errors.maxLength' },
                      { count: MAX_DESCRIPTION_LENGTH },
                    ),
                  },
                ],
              })(
                <TextArea
                  rows={4}
                  placeholder={formatMessage({
                    id: 'app.forms.actionDescription',
                  })}
                />,
              )}
            </FormItem>
          </div>

          <div>
            <ButtonsWrapper>
              <ButtonCancel onClick={onCancel}>
                {formatMessage({ id: 'app.actionCreatePage.cancel' })}
              </ButtonCancel>

              <SaveButton
                type="primary"
                htmlType="submit"
                loading={isSubmitting}
              >
                {formatMessage({
                  id: initialValues
                    ? 'app.form.submit'
                    : 'app.actionCreatePage.title',
                })}
              </SaveButton>
            </ButtonsWrapper>

            {(photoError || submitFailed) && (
              <FormError>{photoError || submitFailed}</FormError>
            )}
          </div>
        </MainFields>
      </StyledForm>
    )
  }
}

export default compose(
  Form.create({
    mapPropsToFields({ initialValues = {} }) {
      const { name, description, category, picture: fileUrl } = initialValues

      return {
        name: Form.createFormField({ value: name }),
        category: Form.createFormField({ value: category }),
        description: Form.createFormField({ value: description }),
        photo: Form.createFormField(
          fileUrl ? { value: { fileUrl } } : undefined,
        ),
      }
    },
  }),
  injectIntl,
)(ActionCreatePage)
