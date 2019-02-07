import React from 'react'
import { connect } from 'react-redux'
import { compose } from 'redux'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Upload, Form, Icon } from 'antd'
import { injectIntl, intlShape, FormattedMessage } from 'react-intl'

import CloseIcon from 'assets/icons/CloseIcon'
import { FormItem, Input, PrimaryButton } from 'components/Styled'
import Spinner from 'components/Spinner'
import { ACCEPT_IMAGE_FORMATS, FILE_SIZE_LIMIT } from 'config/files'
import { MAX_DESCRIPTION_LENGTH } from 'config/common'
import colors from 'config/colors'
import { required, fileSize } from 'config/validationRules'
import media from 'utils/mediaQueryTemplate'
import fetch, { configDefault as fetchConfigDefault } from 'utils/fetch'
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
    overflow-y: scroll;
  `}
`

const CloseButton = styled.button`
  border: 0;
  outline: 0;
  background-color: transparent;
  align-items: center;
  cursor: pointer;
  display: flex;
  height: 50px;
  justify-content: center;
  position: absolute;
  right: 17px;
  top: 10px;
  width: 50px;
  z-index: 12;
  transition: color 0.3s;
  color: ${colors.darkGray};
  &:hover {
    color: ${colors.dark};
  }
  ${media.phone`
    color: ${colors.white};
    top: 2px;
    right: 2px;
    &:hover {
     color: ${colors.white};
     opacity: 0.2;
    }
 `}
`

const StyledForm = styled(Form)`
  width: 100%;
  height: 580px;
  display: flex;
  justify-content: space-between;
  ${({ submitSucceeded }) => (submitSucceeded ? 'min-height: 450px;' : '')}

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
  display: flex;
  flex-direction: column;
  justify-content: space-between ${media.tablet`
    width: 100%;
    padding: 24px 0 0;
  `} ${media.phone`
    padding: 24px 20px;
  `};
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
    width: auto;
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

const Loader = styled.section`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  background-color: ${colors.white};
  display: flex;
  justify-content: center;
  align-items: center;
`

const getValueFromEvent = ({ file }) => ({
  file,
  fileUrl: URL.createObjectURL(file),
})

async function fetchIdeas({ match, token }) {
  const data = await api.fetchAction({ slug: match.params.slug, token })

  return data.action
}

class ActionCreatePage extends React.PureComponent {
  state = {
    isSubmitting: false,
    submitFailed: false,
    submitSucceeded: false,
  }

  handleSubmit = e => {
    e.preventDefault()

    const { form, history, match, token, _id } = this.props

    form.validateFields((errors, values) => {
      if (errors) return

      const body = new FormData()

      if (values.photo && values.photo.file)
        body.append('picture', values.photo.file)

      body.append('description', values.description)
      body.append('name', values.name)

      let request = api.fetchProposedAction

      if (match.params.slug) request = api.fetchAction

      this.setState({ isSubmitting: true }, async () => {
        return request({
          body,
          token,
          id: _id,
          method: match.params.slug ? 'PUT' : 'POST',
        })
          .then(() => {
            this.setState(
              {
                isSubmitting: false,
                submitFailed: false,
                submitSucceeded: true,
              },
              () => {
                history.push(
                  `/account/submit-succeeded/${match.params.slug || ''}`,
                )
              },
            )
          })
          .catch(error => {
            console.error(error)
            this.setState({
              isSubmitting: false,
              submitFailed: error,
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
      match,
      loading,
    } = this.props
    const { submitFailed, isSubmitting } = this.state

    const { fileUrl: photoPreviewUrl } = getFieldValue('photo') || {}
    const photoError = getFieldError('photo')

    return (
      <Container>
        {loading && (
          <Loader>
            <Spinner />
          </Loader>
        )}

        <CloseButton onClick={closeModal}>
          <CloseIcon />
        </CloseButton>

        <StyledForm onSubmit={this.handleSubmit}>
          <UploadWrap>
            {getFieldDecorator('photo', {
              getValueFromEvent,
              validateFirst: true,
              rules: [
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
                          {photoError ? (
                            <PhotoError inButton>{photoError}</PhotoError>
                          ) : (
                            <ButtonAddPhotoContent>
                              <Icon type="camera" />
                              <span>
                                <FormattedMessage id="app.actionCreatePage.addPhoto" />
                              </span>
                            </ButtonAddPhotoContent>
                          )}
                        </ButtonAddPhoto>
                        <AddPhotoBlockText>
                          <FormattedMessage id="app.actionCreatePage.uploadImageDescription" />
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
                  id: match.params.slug
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

            <ButtonsWrapper>
              <ButtonCancel onClick={closeModal}>
                {formatMessage({ id: 'app.actionCreatePage.cancel' })}
              </ButtonCancel>

              <SaveButton
                type="primary"
                htmlType="submit"
                loading={isSubmitting}
              >
                {formatMessage({
                  id: match.params.slug
                    ? 'app.actions.card.edit'
                    : 'app.actionCreatePage.title',
                })}
              </SaveButton>
            </ButtonsWrapper>

            {submitFailed && (
              <FormError>
                {formatMessage({
                  id: `app.errors.${
                    [19, 20].includes(Number(submitFailed.code))
                      ? submitFailed.code
                      : 'unknown'
                  }`,
                })}
              </FormError>
            )}
          </MainFields>
        </StyledForm>
      </Container>
    )
  }
}

ActionCreatePage.propTypes = {
  closeModal: PropTypes.func,
  form: PropTypes.object,
  intl: intlShape.isRequired,
  history: PropTypes.object,
  match: PropTypes.object,
  loading: PropTypes.bool,
  token: PropTypes.string,
  _id: PropTypes.string,
}

const mapStateToProps = state => ({
  token: state.account.token,
})

export default compose(
  connect(mapStateToProps),
  fetch(fetchIdeas, {
    ...fetchConfigDefault,
    filter: ({ match }) => Boolean(match.params.slug),
    loader: false,
  }),
  Form.create({
    mapPropsToFields({ name, description, picture: fileUrl }) {
      return {
        name: Form.createFormField({ value: name }),
        description: Form.createFormField({ value: description }),
        photo: Form.createFormField({ value: { fileUrl } }),
      }
    },
  }),
  injectIntl,
)(ActionCreatePage)
