import React from 'react'
import PropTypes from 'prop-types'
import styled, { keyframes } from 'styled-components'
import { Upload, Form } from 'antd'
import { injectIntl, intlShape } from 'react-intl'

import CloseIcon from 'assets/icons/CloseIcon'
import { FormItem, Input, PrimaryButton } from 'components/Styled'
import { ACCEPT_IMAGE_FORMATS, FILE_SIZE_LIMIT } from 'config/files'
import { MAX_DESCRIPTION_LENGTH } from 'config/common'
import colors from 'config/colors'
import { required, fileSize } from 'config/validationRules'
import media from 'utils/mediaQueryTemplate'
import api from 'api'
import hexToRgba from 'utils/hexToRgba'

const Container = styled.section`
  align-items: center;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  overflow: hidden;
  width: 93vw;
  max-width: 930px;
  position: relative;

  ${media.tablet`
    width: 100%;
    height: 100%;
  `}
`

const CloseButton = styled.button`
  background-color: transparent;
  border: 0;
  align-items: center;
  cursor: pointer;
  display: flex;
  height: 50px;
  justify-content: center;
  position: absolute;
  right: 0;
  top: 0;
  width: 50px;
  z-index: 2;
`

const StyledForm = styled(Form)`
  width: 100%;
  height: 100%;
  max-height: 580px;
  display: flex;
  justify-content: space-between;

  ${media.tablet`
    padding-bottom: 24px;
    width: 425px;
    flex-direction: column;
    align-items: center;
    max-height: 100%;
    justify-content: center;
   `}

  ${media.phone`
    width: 100%;
    justify-content: flex-start;
  `}
`

const UploadWrap = styled.div`
  width: 50%;

  ${media.tablet`
    width: 100%;
   `}
`

const MainFields = styled.div`
  width: 50%;
  padding: 44px 60px;

  ${media.tablet`
    width: 100%;
    padding: 24px 0 0;
  `}
`

const Title = styled.header`
  font-size: 28px;
  line-height: 35px;
  text-align: center;
  margin-bottom: 12px;
`

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`

const SaveButton = styled(PrimaryButton)`
  min-width: 50%;
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

  .ant-upload-select {
    flex-grow: 1;
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
  display: flex;
  align-items: center;
  justify-content: center;
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

  ${media.tablet`
    max-height: 40vh;
  `}
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
  text-shadow: 0 0 10px ${hexToRgba(colors.lightGray, 0.8)};
`

const AddPhotoBlock = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
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

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 26px;
    height: 2px;
    background-color: ${colors.gray};
  }

  &::after {
    width: 2px;
    height: 26px;
  }

  ${media.tablet`
    margin: 30px 0;
  `}
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

const SubmitSucceeded = styled.article`
  position: absolute;
  width: 100%;
  height: 100%;
  padding: 14px 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: ${colors.white};
  animation: ${keyframes`
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  `};

  ${media.tablet`
    padding: 14px 5%;
  `}

  h3 {
    width: 100%;
    color: ${colors.dark};
    font-size: 28px;
    line-height: 35px;
    text-align: center;
    margin-bottom: 14px;
  }

  p {
    margin: 0 auto 30px;
    max-width: 410px;
    color: ${colors.darkGray};
    font-size: 14px;
    line-height: 20px;
    text-align: center;
  }
`

const ButtonSuccess = styled(PrimaryButton)`
  width: 300px;
  margin: 0 auto;
`

const getValueFromEvent = ({ file }) => ({
  file,
  fileUrl: URL.createObjectURL(file),
})

class ActionCreatePage extends React.PureComponent {
  state = {
    isSubmitting: false,
    submitFailed: false,
    submitSucceeded: false,
  }

  handleSubmit = e => {
    e.preventDefault()

    const { form } = this.props

    form.validateFields((errors, values) => {
      if (errors) return

      const body = new FormData()
      body.append('picture', values.photo.file)
      body.append('description', values.description)
      body.append('name', values.name)

      this.setState({ isSubmitting: true }, async () => {
        return api
          .addActionRequest(body)
          .then(() => {
            this.setState({
              isSubmitting: false,
              submitFailed: false,
              submitSucceeded: true,
            })
          })
          .catch(error => {
            console.error(error)
            this.setState({
              isSubmitting: false,
              submitFailed: true,
              submitSucceeded: false,
            })
          })
      })
    })
  }

  render() {
    const {
      form: { getFieldDecorator, getFieldError, getFieldValue },
      intl: { formatMessage },
      closeModal,
    } = this.props
    const { submitFailed, submitSucceeded, isSubmitting } = this.state

    const { fileUrl: photoPreviewUrl } = getFieldValue('photo') || {}
    const photoError = getFieldError('photo')

    return (
      <Container>
        <CloseButton onClick={closeModal}>
          <CloseIcon />
        </CloseButton>

        <StyledForm onSubmit={this.handleSubmit}>
          <UploadWrap>
            {getFieldDecorator('photo', {
              getValueFromEvent,
              validateFirst: true,
              rules: [
                required(formatMessage({ id: 'app.errors.isRequired' })),
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
                    <AddPhotoBlock>
                      <ButtonAddPhoto type="button">
                        {photoError && (
                          <PhotoError inButton>{photoError}</PhotoError>
                        )}
                      </ButtonAddPhoto>
                    </AddPhotoBlock>
                  )}
                </UploadContent>
              </StyledUpload>,
            )}
          </UploadWrap>

          <MainFields>
            <Title>{formatMessage({ id: 'app.actionCreatePage.title' })}</Title>

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

            <ButtonsWrapper>
              <ButtonCancel onClick={closeModal}>
                {formatMessage({ id: 'app.actionCreatePage.cancel' })}
              </ButtonCancel>

              <SaveButton
                type="primary"
                htmlType="submit"
                loading={isSubmitting}
              >
                {formatMessage({ id: 'app.actionCreatePage.title' })}
              </SaveButton>
            </ButtonsWrapper>

            {submitFailed && (
              <FormError>
                {formatMessage({ id: 'app.errors.unknown' })}
              </FormError>
            )}
          </MainFields>
        </StyledForm>

        {submitSucceeded && (
          <SubmitSucceeded>
            <h3>
              {formatMessage({
                id: 'app.actionCreatePage.submitSucceededTitle',
              })}
            </h3>
            <p>
              {formatMessage({
                id: 'app.actionCreatePage.submitSucceededDescription',
              })}
            </p>

            <ButtonSuccess type="primary" onClick={closeModal}>
              {formatMessage({
                id: 'app.actionCreatePage.submitSucceededGoBack',
              })}
            </ButtonSuccess>
          </SubmitSucceeded>
        )}
      </Container>
    )
  }
}

ActionCreatePage.propTypes = {
  closeModal: PropTypes.func,
  form: PropTypes.object,
  intl: intlShape.isRequired,
}

export default Form.create()(injectIntl(ActionCreatePage))
