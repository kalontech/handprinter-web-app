import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import { bindActionCreators, compose } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Button, Form, Select, Icon, Tabs, Popover } from 'antd'
import { injectIntl, FormattedMessage } from 'react-intl'
import { animateScroll } from 'react-scroll'
import { withRouter } from 'react-router-dom'

import notification from 'antd/lib/notification'

import CloseIcon from 'assets/icons/CloseIcon'
import profileLeavesBackgroundImage from 'assets/images/profileLeavesBackgroundImage.png'
import arrowDownIcon from 'assets/icons/arrowDown.svg'

import { Creators as UserCreators } from 'redux/userStore'
import colors from 'config/colors'
import {
  convertBase64ToFile,
  croppResizeProfilePhoto,
  convertBytesToMegabytes,
} from 'utils/file'
import getValidationRules from 'config/validationRules'
import {
  PROFILE_PHOTO_SIZE_LIMIT,
  PROFILE_PHOTO_WEIGHT_LIMIT,
  ACCEPT_IMAGE_FORMATS,
} from 'config/files'
import handleFormError from 'utils/handleFormError'
import decodeError from 'utils/decodeError'
import { logOut } from 'redux/accountStore'
import hexToRgba from 'utils/hexToRgba'
import media from 'utils/mediaQueryTemplate'
import { GROUPS_SUBSETS, MEMBER_GROUP_ROLES } from 'utils/constants'
import {
  FormItem,
  Input,
  PrimaryButton,
  DefaultButton,
  Modal,
  Checkbox,
  CloseButton,
  FingerPrint,
  ModalContent,
} from 'components/Styled'
import GroupCreateForm from 'components/GroupCreateForm'
import PageMetadata from 'components/PageMetadata'
import ConfidentialitySettings from 'components/ConfidentialitySettings'
import * as apiGroups from 'api/groups'
import * as apiUser from 'api/user'
import { getUserInitialAvatar } from 'api'

const { TabPane } = Tabs

export const Wrapper = styled.div`
  background-color: ${colors.lightGray};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-bottom: 100px;
  ${media.tablet`
    padding-bottom: 60px;
  `}
`

export const TabContent = styled.div`
  background-color: ${colors.white};
  padding: 25px 20px;
  border-radius: 5px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.3);
  width: 575px;
  ${media.phone`
    padding: 15px;
    width: 290px;
  `}
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
  position: absolute;
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
  left: 3px;
  z-index: 2;
`

export const SaveButton = styled(PrimaryButton)`
  width: 50%;
  ${media.phone`
    width: 100%;
  `}
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
  border: none;
  color: ${colors.ocean};
  cursor: pointer;
  font-weight: bold;
  padding: 10px 25px;
  width: 100%;
  &:focus,
  &:active {
    outline: none;
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
  ${media.phone`
    flex-direction: column-reverse;
  `}
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
  ${media.phone`
    width: 100%;
    margin-top: 10px;
  `}
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

export const DeleteButtonWrap = styled.div`
  text-align: center;
  margin-top: 10px;
  ${media.tablet`
    margin-top: 20px;
  `}
  ${media.phone`
    margin-top: 10px;
  `}
  .ant-btn-loading {
    padding: 0 100px !important; // use important to rewrite original styles
  }
`

export const DeleteAccountButton = styled(DefaultButton)`
  background-color: white;
  display: inline-block;
  padding: 0 100px;
  color: ${colors.orange};
  ${media.phone`
    padding: 0 95px;
  `}

  &&:hover,
  &&:focus {
    background-color: ${hexToRgba(colors.orange, 0.18)};
    color: ${colors.orange};
  }
  &&.active,
  &&:active {
    background-color: ${hexToRgba(colors.orange, 0.26)};
    color: ${colors.orange};
  }
`

export const GroupMemberOptionButton = styled(DeleteAccountButton)`
  padding: 0 30px;
  height: 30px;
  width: 100%;
`

const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 68px;
  padding: 0 7px;
`

const GroupsList = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  position: relative;
  height: 273px;
  width: 100%;
  overflow-y: auto;
  padding: 0;
`

const MyGroupItem = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`

const MyGroupPicture = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 12px;
`

const MyGroupInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: baseline;
`

const MyGroupInfoName = styled.span`
  line-height: 1.1;
  font-size: 16px;
  color: ${colors.dark};
`

const MyGroupInfoMyRole = styled.span`
  font-size: 14px;
  color: ${colors.darkGray};
`

const StyledTabs = styled(Tabs)`
  .ant-tabs-nav-container,
  .ant-tabs-tab {
    background: ${colors.lightBlack} !important;
  }

  .ant-tabs-nav {
    display: flex;
    justify-content: center;
  }

  .ant-tabs-tab {
    border: none !important;
    color: ${colors.darkGray};
    font-weight: bold;
    font-family: Noto Sans, sans-serif;
  }

  .ant-tabs-tab-active,
  .ant-tabs-tab:hover {
    color: ${colors.white} !important;
  }

  .ant-tabs-bar {
    margin: 0;
  }

  .ant-tabs-nav-container {
    height: 51px !important;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }

  .ant-tabs-nav-wrap {
    height: 51px;
    line-height: 3.5;
  }
`

const MyGroupsOptionButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;

  &:focus,
  &:active,
  &:hover {
    outline: none;
  }

  i {
    font-size: 25px;
    color: ${colors.dark};
  }
`

const GroupsNotFoundWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const CreateGroupButton = styled(PrimaryButton)`
  width: 100%;
  color: ${colors.white};
  background-color: ${colors.green};
  &:hover {
    color: ${colors.white};
  }
`

const MyGroupItemRightSide = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`

const GroupMemberOptionWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const PROFILE_MODAL_TYPES = {
  DELETE_ACCOUNT_CONFIRMATION: 'DELETE_ACCOUNT_CONFIRMATION',
  DELETE_ACCOUNT_FAILURE: 'DELETE_ACCOUNT_FAILURE',
  DELETE_MY_GROUP: 'DELETE_MY_GROUP',
  GROUP_ADMIN_TO_MEMBERL: 'GROUP_ADMIN_TO_MEMBER',
  LEAVE_GROUP: 'LEAVE_GROUP',
  RESET_PROFILE_PHOTO: 'RESET_PROFILE_PHOTO',
}

const PROFILE_TABS_KEYS = {
  GENERAL: 'GENERAL',
  MY_GROUPS: 'MY_GROUPS',
  CONFIDENTIALITY: 'CONFIDENTIALITY',
}

async function getMyGroupsList() {
  return apiGroups.fetchGroupsList({
    subset: GROUPS_SUBSETS.MY,
  })
}

class ProfilePage extends Component {
  state = {
    showChangePasswordSection: false,
    uploadImageError: null,
    formInfoChanged: false,
    countryChanged: false,
    isDeletingAccount: false,
    tabActiveKey: PROFILE_TABS_KEYS.GENERAL,
    myGroups: [],
    showMyGroupsOptionPopover: false,
    activeMyGroupsOptionPopover: undefined,
    createGroupModalVisible: false,
    isResettingPhoto: false,
  }

  canvasRef = React.createRef()
  uploadProfilePictureRef = React.createRef()

  componentDidMount() {
    animateScroll.scrollToTop()
  }

  componentDidUpdate(prevProps, prevState) {
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
      this.setState({ formInfoChanged: false })
  }

  fetchDeleteAccount = () => {
    this.setState({ isDeletingAccount: true })

    return apiUser
      .deleteMe()
      .then(() => {
        this.setState({
          isDeletingAccount: false,
        })
        logOut({ redirectUrl: '/' })
      })
      .catch(error => {
        console.error(error)
        this.showModal({
          type: PROFILE_MODAL_TYPES.DELETE_ACCOUNT_FAILURE,
          payload: {
            errorMessage: decodeError(error),
          },
        })
        this.setState({
          isDeletingAccount: false,
        })
      })
  }

  fetchResetPhoto = () => {
    this.setState({ isResettingPhoto: true })

    return apiUser
      .updateMe({ photo: null })
      .then(() => {
        this.props.getMeRequest()
        this.setState({
          isResettingPhoto: false,
        })
      })
      .catch(error => {
        console.error(error)
        this.setState({
          isResettingPhoto: false,
        })
      })
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
    } = this.props

    validateFields(['email', 'fullName', 'country'], (err, values) => {
      if (!err) {
        const { email, fullName, country } = values

        updateMeInfoRequest({ email, fullName, country })
      }
    })
  }

  toggleShowChangePasswordSection = () => {
    this.setState({
      showChangePasswordSection: !this.state.showChangePasswordSection,
    })
  }

  createGroup = async values => {
    const body = new FormData()

    if (values.picture && values.picture.file) {
      body.append('picture', values.picture.file)
    }

    body.append('description', values.description)
    body.append('name', values.name)
    body.append('private', values.private)

    const response = await apiGroups.fetchCreateGroup(body)

    this.setState({
      myGroups: [response.group, ...this.state.myGroups],
      createGroupModalVisible: false,
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
          validateTrigger: 'onBlur',
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
          validateTrigger: 'onBlur',
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
      this.setState({ uploadImageError: null })
      if (photo) {
        const file = await convertBase64ToFile(photo)
        const body = new FormData()
        body.append('file', file)
        this.props.updateMePhotoRequest(body)
      }
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

  showModal = ({ type, payload }) => {
    const {
      intl: { formatMessage },
    } = this.props

    switch (type) {
      case PROFILE_MODAL_TYPES.DELETE_ACCOUNT_CONFIRMATION:
        Modal.confirm({
          title: formatMessage({
            id: 'app.profilePage.deleteAccountModal.title',
          }),
          content: formatMessage({
            id: 'app.profilePage.deleteAccountModal.context',
          }),
          okText: formatMessage({
            id: 'app.profilePage.deleteAccountModal.confirmButton',
          }),
          cancelText: formatMessage({
            id: 'app.profilePage.deleteAccountModal.cancelButton',
          }),
          okType: 'danger',
          className: 'ant-modal-confirm_profile-page',
          centered: true,
          confirmLoading: this.state.isDeletingAccount,
          onOk: this.fetchDeleteAccount,
        })
        break
      case PROFILE_MODAL_TYPES.DELETE_ACCOUNT_FAILURE:
        Modal.error({
          title: formatMessage({
            id: 'app.profilePage.deleteAccount',
          }),
          content: formatMessage({
            id: payload.errorMessage,
          }),
          okText: formatMessage({
            id: 'app.profilePage.deleteAccountModal.closeButton',
          }),
          okType: 'danger',
          className: 'ant-modal-confirm_profile-page',
          centered: true,
        })
        break
      case PROFILE_MODAL_TYPES.DELETE_MY_GROUP:
        Modal.confirm({
          title: formatMessage({ id: 'app.actions.card.delete' }),
          content: formatMessage({ id: 'app.pages.groups.confirm' }),
          okText: formatMessage({
            id: 'app.profilePage.deleteAccountModal.confirmButton',
          }),
          cancelText: formatMessage({
            id: 'app.profilePage.deleteAccountModal.cancelButton',
          }),
          okType: 'danger',
          className: 'ant-modal-confirm_profile-page',
          centered: true,
          onOk: async () => {
            await apiGroups.fetchDeleteGroup(payload.groupId)
            const { groups } = await getMyGroupsList()
            this.setState({ myGroups: groups.docs })
          },
        })
        break
      case PROFILE_MODAL_TYPES.GROUP_ADMIN_TO_MEMBER:
        Modal.confirm({
          title: formatMessage({ id: 'app.profilePage.leaveAdminPosition' }),
          content: formatMessage({
            id: 'app.profilePage.leaveAdminPositionContent',
          }),
          okText: formatMessage({
            id: 'app.profilePage.leaveAdminPositionSubmitButton',
          }),
          cancelText: formatMessage({
            id: 'app.profilePage.leaveAdminPositionCancelButton',
          }),
          okType: 'danger',
          className: 'ant-modal-confirm_profile-page',
          centered: true,
          onOk: async () => {
            await apiGroups.fetchUpdateGroupMember({
              id: payload.groupId,
              memberId: this.props.user._id,
              body: { role: MEMBER_GROUP_ROLES.MEMBER },
            })
            const { groups } = await getMyGroupsList()
            this.setState({ myGroups: groups.docs })
          },
        })
        break
      case PROFILE_MODAL_TYPES.LEAVE_GROUP:
        Modal.confirm({
          title: formatMessage({ id: 'app.profilePage.leaveGroup' }),
          content: formatMessage({ id: 'app.profilePage.leaveGroupContent' }),
          okText: formatMessage({
            id: 'app.profilePage.leaveAdminPositionSubmitButton',
          }),
          cancelText: formatMessage({
            id: 'app.profilePage.leaveAdminPositionCancelButton',
          }),
          okType: 'danger',
          className: 'ant-modal-confirm_profile-page',
          centered: true,
          onOk: async () => {
            await apiGroups.fetchLeaveGroup(payload.groupId)
            this.setState({
              myGroups: this.state.myGroups.filter(
                myGroup => String(myGroup._id) !== String(payload.groupId),
              ),
            })
          },
        })
        break
      case PROFILE_MODAL_TYPES.RESET_PROFILE_PHOTO:
        Modal.confirm({
          title: formatMessage({
            id: 'app.profilePage.resetProfilePhotoModal.title',
          }),
          content: formatMessage({
            id: 'app.profilePage.resetProfilePhotoModal.context',
          }),
          okText: formatMessage({
            id: 'app.profilePage.resetProfilePhotoModal.confirmButton',
          }),
          cancelText: formatMessage({
            id: 'app.profilePage.resetProfilePhotoModal.cancelButton',
          }),
          okType: 'danger',
          className: 'ant-modal-confirm_profile-page',
          centered: true,
          confirmLoading: this.state.isResettingPhoto,
          onOk: this.fetchResetPhoto,
        })
        break
    }
  }

  handleTabClick = async key => {
    const { myGroups, tabActiveKey } = this.state

    if (key === tabActiveKey) return

    let updatedMyGroupsList

    if (key === PROFILE_TABS_KEYS.MY_GROUPS) {
      const { groups } = await getMyGroupsList()
      updatedMyGroupsList = groups.docs
    }

    this.setState({
      tabActiveKey: key,
      myGroups: updatedMyGroupsList || myGroups,
    })
  }

  handlePrivateGroupChange = e => {
    const [, groupId] = e.target.name.split('-')

    apiGroups
      .fetchUpdateGroup(groupId, {
        private: e.target.checked,
      })
      .catch(error => {
        console.error(error)
        notification.error({
          message: this.props.intl.formatMessage({ id: decodeError(error) }),
        })
      })
  }

  render() {
    const {
      countries,
      form: { getFieldDecorator },
      intl: { formatMessage },
      isUpdatingMeInfo,
      isUpdatingMePassword,
      user,
      history,
    } = this.props
    const {
      showChangePasswordSection,
      formInfoChanged,
      isDeletingAccount,
      myGroups,
      tabActiveKey,
      activeMyGroupsOptionPopover,
      showMyGroupsOptionPopover,
      createGroupModalVisible,
    } = this.state

    return (
      <Fragment>
        <PageMetadata pageName="profilePage" />
        <Wrapper>
          <AppleBackgroundSection />

          <ProfileImgWrap
            onClick={() => this.uploadProfilePictureRef.current.click()}
          >
            <LeavesTopBackgroundImage src={profileLeavesBackgroundImage} />

            {user.photo && (
              <OuterPlusButton>
                <Icon type="plus" />
              </OuterPlusButton>
            )}

            <ProfileImgBackground>
              {(user.photo ? user.photo : null) && (
                <ProfileImg src={user.photo ? user.photo : null} />
              )}
              {!user.photo && (
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

          <StyledTabs
            type="card"
            onTabClick={this.handleTabClick}
            activeKey={tabActiveKey}
          >
            <TabPane
              tab={formatMessage({
                id: 'app.profilePage.tabs.general',
              })}
              key={PROFILE_TABS_KEYS.GENERAL}
            >
              <TabContent>
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
                        placeholder={formatMessage({
                          id: 'app.forms.fullName',
                        })}
                      />,
                    )}
                  </FormItem>
                  <FormItem>
                    {getFieldDecorator('email', {
                      rules: getValidationRules(formatMessage).email,
                    })(
                      <Input
                        type="email"
                        placeholder={formatMessage({
                          id: 'app.forms.email',
                        })}
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
                        suffixIcon={
                          <img src={arrowDownIcon} alt="arrowDownIcon" />
                        }
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
                    </FormItem>
                    <FormItem>
                      {getFieldDecorator('errorPhoto')(<Input type="hidden" />)}
                    </FormItem>
                  </ErrorItemWrap>

                  {formInfoChanged && (
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

                  <ChangePasswordButton
                    type="primary"
                    onClick={() =>
                      this.showModal({
                        type: PROFILE_MODAL_TYPES.RESET_PROFILE_PHOTO,
                      })
                    }
                  >
                    <FormattedMessage id="app.profilePage.resetProfilePhoto" />
                  </ChangePasswordButton>
                </Form>
              </TabContent>
            </TabPane>

            <TabPane
              tab={formatMessage({
                id: 'app.profilePage.tabs.confidentiality',
              })}
              key={PROFILE_TABS_KEYS.CONFIDENTIALITY}
            >
              <TabContent>
                <ConfidentialitySettings />
              </TabContent>
            </TabPane>

            <TabPane
              tab={formatMessage({
                id: 'app.profilePage.tabs.myGroups',
              })}
              key={PROFILE_TABS_KEYS.MY_GROUPS}
            >
              <TabContent>
                <GroupsList>
                  {myGroups.map((group, index) => {
                    let options
                    switch (group.info.memberRole) {
                      case MEMBER_GROUP_ROLES.OWNER:
                        options = {
                          buttonTitleId: 'app.profilePage.deleteMyGroup',
                          modalType: PROFILE_MODAL_TYPES.DELETE_MY_GROUP,
                        }
                        break
                      case MEMBER_GROUP_ROLES.ADMIN:
                        options = {
                          buttonTitleId: 'app.profilePage.leaveAdminPosition',
                          modalType: PROFILE_MODAL_TYPES.GROUP_ADMIN_TO_MEMBER,
                        }
                        break
                    }

                    return (
                      <ListItem key={group._id}>
                        <MyGroupItem
                          onClick={() =>
                            history.push(`/groups/view/${group._id}/statistics`)
                          }
                        >
                          <MyGroupPicture
                            src={
                              group.picture || getUserInitialAvatar(group.name)
                            }
                            alt="Group picture"
                          />
                          <MyGroupInfo>
                            <MyGroupInfoName>{group.name}</MyGroupInfoName>
                            <MyGroupInfoMyRole>
                              <FormattedMessage
                                id={
                                  {
                                    MEMBER: 'app.pages.groups.member',
                                    OWNER: 'app.pages.groups.owner',
                                    ADMIN: 'app.pages.groups.admin',
                                  }[group.info.memberRole]
                                }
                              />
                            </MyGroupInfoMyRole>
                          </MyGroupInfo>
                        </MyGroupItem>
                        <MyGroupItemRightSide>
                          {group.info.memberRole !==
                            MEMBER_GROUP_ROLES.MEMBER && (
                            <Checkbox
                              onChange={this.handlePrivateGroupChange}
                              name={`isPrivateGroupe-${group._id}`}
                              defaultChecked={group.private}
                            >
                              <FormattedMessage id="app.pages.groups.createGroupPrivate" />
                            </Checkbox>
                          )}
                          <Popover
                            trigger="click"
                            placement="bottomRight"
                            getPopupContainer={() =>
                              this[`$myGroupsOptionButton_${index}`]
                            }
                            visible={
                              showMyGroupsOptionPopover &&
                              activeMyGroupsOptionPopover === index
                            }
                            onVisibleChange={() => {
                              if (showMyGroupsOptionPopover) {
                                this.setState({
                                  showMyGroupsOptionPopover: false,
                                })
                              }
                            }}
                            content={
                              <GroupMemberOptionWrap>
                                {options && (
                                  <GroupMemberOptionButton
                                    type="primary"
                                    onClick={() => {
                                      this.showModal({
                                        type: options.modalType,
                                        payload: {
                                          groupId: group._id,
                                        },
                                      })

                                      this.setState({
                                        activeMyGroupsOptionPopover: undefined,
                                        showMyGroupsOptionPopover: false,
                                      })
                                    }}
                                  >
                                    <FormattedMessage
                                      id={options.buttonTitleId}
                                    />
                                  </GroupMemberOptionButton>
                                )}
                                {group.info.memberRole !==
                                  MEMBER_GROUP_ROLES.OWNER && (
                                  <GroupMemberOptionButton
                                    type="primary"
                                    onClick={() => {
                                      this.showModal({
                                        type: PROFILE_MODAL_TYPES.LEAVE_GROUP,
                                        payload: {
                                          groupId: group._id,
                                        },
                                      })
                                      this.setState({
                                        activeMyGroupsOptionPopover: undefined,
                                        showMyGroupsOptionPopover: false,
                                      })
                                    }}
                                  >
                                    <FormattedMessage id="app.profilePage.leaveGroup" />
                                  </GroupMemberOptionButton>
                                )}
                              </GroupMemberOptionWrap>
                            }
                          >
                            <MyGroupsOptionButton
                              ref={ref => {
                                this[`$myGroupsOptionButton_${index}`] = ref
                              }}
                              onClick={() => {
                                this.setState({
                                  activeMyGroupsOptionPopover: index,
                                  showMyGroupsOptionPopover: true,
                                })
                              }}
                            >
                              <Icon type="ellipsis" rotate={90} />
                            </MyGroupsOptionButton>
                          </Popover>
                        </MyGroupItemRightSide>
                      </ListItem>
                    )
                  })}

                  {myGroups.length === 0 && (
                    <GroupsNotFoundWrapper>
                      <span>
                        <FormattedMessage id="app.pages.groups.emptyGroupsList" />
                      </span>
                    </GroupsNotFoundWrapper>
                  )}
                </GroupsList>
                <CreateGroupButton
                  onClick={() =>
                    this.setState({ createGroupModalVisible: true })
                  }
                >
                  <FormattedMessage id="app.profilePage.createGroupButton" />
                </CreateGroupButton>
              </TabContent>
            </TabPane>
          </StyledTabs>

          <DeleteButtonWrap>
            <DeleteAccountButton
              type="primary"
              loading={isDeletingAccount}
              onClick={() =>
                this.showModal({
                  type: PROFILE_MODAL_TYPES.DELETE_ACCOUNT_CONFIRMATION,
                })
              }
            >
              <FormattedMessage id="app.profilePage.deleteAccount" />
            </DeleteAccountButton>
          </DeleteButtonWrap>

          <Modal
            visible={createGroupModalVisible}
            closable={false}
            onCancel={() => this.setState({ createGroupModalVisible: false })}
            centered
            footer={null}
            width="auto"
            destroyOnClose
          >
            <ModalContent>
              <CloseButton
                onClick={() =>
                  this.setState({ createGroupModalVisible: false })
                }
              >
                <CloseIcon />
              </CloseButton>

              <FingerPrint />

              <GroupCreateForm onSubmit={this.createGroup} />
            </ModalContent>
          </Modal>
        </Wrapper>
      </Fragment>
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
      getMeRequest: () => UserCreators.getMeRequest(),
    },
    dispatch,
  )

ProfilePage.propTypes = {
  countries: PropTypes.array.isRequired,
  form: PropTypes.object.isRequired,
  intl: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
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
  setGroupsList: PropTypes.func.isRequired,
  getMeRequest: PropTypes.func.isRequired,
}

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  Form.create({
    mapPropsToFields: props => ({
      country: Form.createFormField({ value: props.user.country }),
      email: Form.createFormField({ value: props.user.email }),
      fullName: Form.createFormField({ value: props.user.fullName }),
    }),
  }),
  injectIntl,
)(ProfilePage)
