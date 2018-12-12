import React, { Component } from 'react'
import styled from 'styled-components'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Button, Form, Select, Icon } from 'antd'
import { injectIntl, FormattedMessage } from 'react-intl'

import { Creators as UserCreators } from './../../redux/userStore'
import {
  FormItem,
  Input,
  PrimaryButton,
  DefaultButton,
} from './../../components/Styled'
import colors from './../../config/colors'
import {
  convertBase64ToFile,
  croppResizeProfilePhoto,
  convertBytesToMegabytes,
} from '../../utils/file'
import getValidationRules from './../../config/validationRules'
import {
  PROFILE_PHOTO_SIZE_LIMIT,
  PROFILE_PHOTO_WEIGHT_LIMIT,
  ACCEPT_IMAGE_FORMATS,
} from '../../config/files'
import handleFormError from './../../utils/handleFormError'

import profileLeavesBackgroundImage from '../../assets/images/profileLeavesBackgroundImage.png'
import arrowDownIcon from './../../assets/icons/arrowDown.svg'

export const Wrapper = styled.div`
  background-color: ${colors.lightGray};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-bottom: 100px;
`

export const FormWrapper = styled.div`
  background-color: ${colors.white};
  padding: 25px 28px;
  border-radius: 5px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  min-width: 575px;
`

export const ProfileImgWrap = styled.div`
  position: relative;
  cursor: pointer;
  top: -92px;
`

export const LeavesTopBackgroundImage = styled.img`
  position: absolute;
  top: -48px;
  left: -45px;
`

export const ProfileImg = styled.img`
  object-fit: cover;
  height: 185px;
  width: 185px;
`

export const ProfileImgBackground = styled.div`
  height: 185px;
  width: 185px;
  background: white;
  border-radius: 50%;
  overflow: hidden;
  border: 3px solid white;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
`

export const AddPhotoHint = styled.div`
  position absolute;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: ${colors.green};
  font-weight: bold;
`

export const OuterPlusButton = styled.div`
  height: 42px;
  width: 42px;
  background-color: white;
  border-radius: 50%;
  border: 2px solid ${colors.green};
  color: ${colors.green};
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 13px;
  left: 3px
  z-index: 2;
`

export const SaveButton = styled(PrimaryButton)`
  width: 50%;
`

export const InnerPlusButton = styled.div`
  height: 40px;
  width: 40px;
  background-color: ${colors.greenHoneyDew};
  border-radius: 50%;
  color: ${colors.green};
  display: flex;
  align-items: center;
  justify-content: center;
`

export const AppleBackgroundSection = styled.div`
  background-color: ${colors.ocean};
  height: 140px;
  width: 100%;
`

export const ChangePasswordButton = styled.button`
  background-color: white;
  border: none
  color: ${colors.ocean};
  cursor: pointer
  font-weight: bold;
  padding: 10px 25px
  width: 100%;
  &:focus,&:active {
    outline: none
  }
`

export const ChangePasswordSectionHorizontalLile = styled.div`
  background-color: ${colors.gray};
  height: 1px;
  margin: 20px 0;
  width: 100%;
`

export const ChangePasswordButtonsWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
`

export const FormSectionHeading = styled.div`
  font-size: 16px;
  margin: 10px 0;
`

export const ChangePssswordSectionHeading = styled(FormSectionHeading)`
  margin: 22px 0 9px;
`

export const CancelButton = styled(DefaultButton)`
  margin-right: 15px;
  width: 50%;
`

export const HiddenPictureCanvas = styled.canvas`
  display: none;
`

export const HiddenUploadPictureInput = styled.input`
  display: none;
`

export const ErrorItemWrap = styled.div`
  * {
    margin: 0;
  }
`

export const StyledSaveChangesButton = styled(Button)`
  height: 44px;
`

class ProfilePage extends Component {
  state = {
    showChangePasswordSection: false,
    photoToUpload: null,
    uploadImageError: null,
    formInfoChanged: false,
    countryChanged: false,
  }

  componentDidUpdate = (prevProps, prevState) => {
    const {
      form: { setFields },
      intl: { formatMessage },
      isUpdatingMeInfo,
      updateMeInfoError,
    } = this.props
    const { uploadImageError } = this.state

    handleFormError('updateMePhotoError', 'errorPhoto', prevProps, this.props)
    handleFormError('updateMeInfoError', 'errorInfo', prevProps, this.props)
    handleFormError(
      'updateMePasswordError',
      'errorPassword',
      prevProps,
      this.props,
    )

    if (prevState.uploadImageError !== uploadImageError) {
      setFields({
        errorPhoto: {
          errors: uploadImageError
            ? [new Error(formatMessage({ id: uploadImageError }))]
            : [],
        },
      })
    }

    if (
      prevProps.isUpdatingMeInfo &&
      !isUpdatingMeInfo &&
      updateMeInfoError === null
    )
      this.setState({ formInfoChanged: false, photoToUpload: null })
  }

  handleChangePasswordSubmit = e => {
    e.preventDefault()
    const {
      updateMePasswordRequest,
      form: { validateFields },
    } = this.props

    validateFields(['currentPassword', 'newPassword'], (err, values) => {
      if (!err) {
        const { currentPassword, newPassword } = values
        updateMePasswordRequest({ currentPassword, newPassword })
      }
    })
  }

  handleInfoSubmit = e => {
    e.preventDefault()
    const {
      form: { validateFields },
      updateMeInfoRequest,
      updateMePhotoRequest,
    } = this.props
    const { photoToUpload } = this.state

    validateFields(['email', 'fullName', 'country'], async (err, values) => {
      if (!err) {
        const { email, fullName, country } = values

        if (photoToUpload) {
          const file = await convertBase64ToFile(photoToUpload)
          updateMePhotoRequest({ file })
        }

        updateMeInfoRequest({ email, fullName, country })
      }
    })
  }

  toggleShowChangePasswordSection = () => {
    this.setState({
      showChangePasswordSection: !this.state.showChangePasswordSection,
    })
  }

  renderChangePasswordSection = ({
    getFieldDecorator,
    formatMessage,
    isUpdatingMePassword,
  }) => (
    <section>
      <ChangePasswordSectionHorizontalLile />
      <ChangePssswordSectionHeading>
        <FormattedMessage id="app.profilePage.changePassword" />
      </ChangePssswordSectionHeading>
      <FormItem>
        {getFieldDecorator('currentPassword', {
          rules: getValidationRules(formatMessage).password,
        })(
          <Input
            type={'password'}
            placeholder={formatMessage({
              id: 'app.profilePage.form.password',
            })}
          />,
        )}
      </FormItem>
      <FormItem>
        {getFieldDecorator('newPassword', {
          rules: getValidationRules(formatMessage).password,
        })(
          <Input
            type={'password'}
            placeholder={formatMessage({
              id: 'app.profilePage.form.newPassword',
            })}
          />,
        )}
      </FormItem>
      <ErrorItemWrap>
        <FormItem>
          {getFieldDecorator('errorPassword')(<Input type="hidden" />)}
        </FormItem>
      </ErrorItemWrap>
      <ChangePasswordButtonsWrapper>
        <CancelButton onClick={this.toggleShowChangePasswordSection}>
          <FormattedMessage id="app.profilePage.changePassword.cancel" />
        </CancelButton>
        <SaveButton
          type="primary"
          loading={isUpdatingMePassword}
          onClick={this.handleChangePasswordSubmit}
        >
          <FormattedMessage id="app.profilePage.changePassword.saveNewPassword" />
        </SaveButton>
      </ChangePasswordButtonsWrapper>
    </section>
  )

  handleUploadImage = async ({ target: { files } }) => {
    const file = files[0]

    if (!file) return

    if (convertBytesToMegabytes(file.size, 0) > PROFILE_PHOTO_WEIGHT_LIMIT) {
      this.setState({ uploadImageError: 'app.errors.image.wrongWeight' })
      return
    }

    const { error, photo } = await croppResizeProfilePhoto({
      file,
      size: PROFILE_PHOTO_SIZE_LIMIT,
      canvas: this.canvasRef.current,
    })

    if (error) {
      this.setState({ uploadImageError: error })
    } else {
      this.setState({ photoToUpload: photo, uploadImageError: null })
    }
  }

  handleCountryChange = value => {
    if (this.props.user.country !== value && !this.state.countryChanged) {
      this.setState({ formInfoChanged: true })
    }
  }

  handleFormChange = () => {
    const {
      form: { isFieldsTouched },
    } = this.props
    const { formInfoChanged } = this.state

    if (isFieldsTouched(['email', 'fullName', 'country']) && !formInfoChanged) {
      this.setState({ formInfoChanged: true })
    }
  }

  canvasRef = React.createRef()

  uploadProfilePictureRef = React.createRef()

  renderProfilePictureBlock = ({ photoToUpload, user }) => (
    <div>
      <ProfileImgWrap
        onClick={() => this.uploadProfilePictureRef.current.click()}
      >
        <LeavesTopBackgroundImage src={profileLeavesBackgroundImage} />

        {!photoToUpload && user.photo && (
          <OuterPlusButton>
            <Icon type="plus" />
          </OuterPlusButton>
        )}

        <ProfileImgBackground>
          {((photoToUpload && photoToUpload) ||
            (user.photo ? user.photo : null)) && (
            <ProfileImg
              src={
                (photoToUpload && photoToUpload) ||
                (user.photo ? user.photo : null)
              }
            />
          )}
          {!photoToUpload && !user.photo && (
            <AddPhotoHint>
              <InnerPlusButton>
                <Icon type="plus" />
              </InnerPlusButton>
              <div>
                <FormattedMessage id="app.profilePage.addPhoto" />
              </div>
            </AddPhotoHint>
          )}
        </ProfileImgBackground>
      </ProfileImgWrap>

      <HiddenPictureCanvas ref={this.canvasRef} />
      <HiddenUploadPictureInput
        type="file"
        accept={Object.values(ACCEPT_IMAGE_FORMATS).join()}
        ref={this.uploadProfilePictureRef}
        onChange={this.handleUploadImage}
      />
    </div>
  )

  render() {
    const {
      countries,
      form: { getFieldDecorator },
      intl: { formatMessage },
      isUpdatingMeInfo,
      isUpdatingMePassword,
      user,
    } = this.props
    const {
      showChangePasswordSection,
      photoToUpload,
      formInfoChanged,
    } = this.state

    return (
      <Wrapper>
        <AppleBackgroundSection />
        {this.renderProfilePictureBlock({ photoToUpload, user })}
        <div>
          <FormWrapper>
            <Form onChange={this.handleFormChange}>
              <FormSectionHeading>
                <FormattedMessage id="app.profilePage.generalInformation" />
              </FormSectionHeading>
              <FormItem>
                {getFieldDecorator('fullName', {
                  rules: getValidationRules(formatMessage).fullName,
                })(
                  <Input
                    type="text"
                    placeholder={formatMessage({ id: 'app.forms.fullName' })}
                  />,
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator('email', {
                  rules: getValidationRules(formatMessage).email,
                })(
                  <Input
                    type="email"
                    placeholder={formatMessage({ id: 'app.forms.email' })}
                  />,
                )}
              </FormItem>
              <FormItem>
                {getFieldDecorator('country', {
                  rules: getValidationRules(formatMessage).country,
                })(
                  <Select
                    onChange={this.handleCountryChange}
                    showSearch
                    placeholder={formatMessage({
                      id: 'app.forms.country',
                    })}
                    optionFilterProp="children"
                    className="ant-select__override-for__register-page"
                    dropdownClassName="ant-select__override-for__register-page"
                    suffixIcon={<img src={arrowDownIcon} />}
                  >
                    {countries.map(country => (
                      <Select.Option key={country._id} value={country._id}>
                        {country.name}
                      </Select.Option>
                    ))}
                  </Select>,
                )}
              </FormItem>
              <ErrorItemWrap>
                <FormItem>
                  {getFieldDecorator('errorInfo')(<Input type="hidden" />)}
                  {/* {uploadImageError && uploadImageError} */}
                </FormItem>
                <FormItem>
                  {getFieldDecorator('errorPhoto')(<Input type="hidden" />)}
                </FormItem>
              </ErrorItemWrap>

              {(photoToUpload || formInfoChanged) && (
                <StyledSaveChangesButton
                  type="primary"
                  onClick={this.handleInfoSubmit}
                  style={{ width: '100%' }}
                  loading={isUpdatingMeInfo}
                >
                  <FormattedMessage id="app.profilePage.saveChanges" />
                </StyledSaveChangesButton>
              )}

              {showChangePasswordSection ? (
                this.renderChangePasswordSection({
                  getFieldDecorator,
                  formatMessage,
                  isUpdatingMePassword,
                })
              ) : (
                <ChangePasswordButton
                  type="primary"
                  onClick={this.toggleShowChangePasswordSection}
                >
                  <FormattedMessage id="app.profilePage.changePassword" />
                </ChangePasswordButton>
              )}
            </Form>
          </FormWrapper>
        </div>
      </Wrapper>
    )
  }
}

const mapStateToProps = state => ({
  countries: state.app.countries,
  user: state.user.data,
  isUpdatingMeInfo: state.user.isUpdatingMeInfo,
  isUpdatingMePassword: state.user.isUpdatingMePassword,
  isUpdatingMePhoto: state.user.isUpdatingMePhoto,
  updateMePasswordError: state.user.updateMePasswordError,
  updateMeInfoError: state.user.updateMeInfoError,
  updateMePhotoError: state.user.updateMePhotoError,
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      updateMeInfoRequest: data => UserCreators.updateMeInfoRequest(data),
      updateMePasswordRequest: data =>
        UserCreators.updateMePasswordRequest(data),
      updateMePhotoRequest: data => UserCreators.updateMePhotoRequest(data),
    },
    dispatch,
  )

ProfilePage.propTypes = {
  countries: PropTypes.array.isRequired,
  form: PropTypes.object.isRequired,
  intl: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  isUpdatingMeInfo: PropTypes.bool.isRequired,
  isUpdatingMePassword: PropTypes.bool.isRequired,
  isUpdatingMePhoto: PropTypes.bool.isRequired,
  updateMePasswordError: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
  ]),
  updateMePhotoError: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  updateMeInfoError: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  updateMeInfoRequest: PropTypes.func.isRequired,
  updateMePasswordRequest: PropTypes.func.isRequired,
  updateMePhotoRequest: PropTypes.func.isRequired,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(
  Form.create({
    mapPropsToFields: props => ({
      country: Form.createFormField({ value: props.user.country }),
      email: Form.createFormField({ value: props.user.email }),
      fullName: Form.createFormField({ value: props.user.fullName }),
    }),
  })(injectIntl(ProfilePage)),
)
