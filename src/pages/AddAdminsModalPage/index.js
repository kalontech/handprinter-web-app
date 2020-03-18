import React, { Component, Fragment } from 'react'
import { Row, Button, Form, Popover } from 'antd'
import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'
import { FormattedMessage, injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { getUserInitialAvatar } from 'api'

import colors from 'config/colors'
import Spinner from 'components/Spinner'

import media, { sizes } from 'utils/mediaQueryTemplate'

import CloseIcon from 'assets/icons/CloseIcon'
import MoreIcon from 'assets/icons/ic_more_vert.svg'

import * as apiUsers from 'api/user'
import {
  addAdmins,
  getAdmins,
  removeAdmin,
  getOrganization,
} from 'api/organization'

import SearchableInput from '../../components/SearchableInput'

const Container = styled(Row)`
  align-items: center;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  overflow: auto;

  ${props =>
    props.height
      ? `
    height: ${props.height};
  `
      : `
    height: 580px;
  `}

  ${props =>
    props.width === 'small' &&
    css`
      width: 320px;
    `};
  ${props =>
    props.width === 'medium' &&
    css`
      width: 592px;
      ${media.tablet`
        max-width: 100%;
        width: 100%;
      `}
    `};
  ${props =>
    props.width === 'large' &&
    css`
      width: 592px;
      ${media.desktop`
        max-width: 700px;
      `}
      ${media.tablet`
        max-width: 100%;
        height: initial;
        flex-direction: column;
        justify-content: flex-start;
      `}
    `};
`

const CloseButton = styled.button`
  width: 50px;
  height: 50px;
  position: absolute;
  background-color: transparent;
  outline: 0;
  border: 0;
  right: 17px;
  top: 10px;
  display: flex;
  justify-content: center;
  font-size: 20px;
  align-items: center;
  transition: all 0.3s;
  cursor: pointer;
  &:hover {
    color: ${colors.dark};
  }
  ${props =>
    props.color
      ? `
        color: ${props.color};
      `
      : `
        color: ${colors.darkGray};
      `}
  ${media.tablet`
    color: ${colors.white};
    top: 2px;
    right: 2px;
    &:hover {
     color: ${colors.white};
     opacity: 0.2;
  }
  `}
`

const ActionName = styled.h1`
  color: ${colors.dark};
  font-size: 28px;
  margin-top: 58px;
`

const ActionDescription = styled.p`
  color: ${colors.darkGray};
  font-size: 14px;
  margin: 0px 104px;
  text-align: center;
`

const ModalContentWrap = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  overflow: auto;

  @media screen and (max-width: ${sizes.phone}px) {
    padding-bottom: ${({ isIphone }) => (isIphone ? '0' : '96px')};
  }

  @media screen and (max-width: ${sizes.phone}px) and (orientation: landscape) {
    padding-bottom: 0;
  }
`

const AdminList = styled.div`
  margin: 0px 60px;
  border: 1px solid ${colors.gray};
  border-radius: 4px;
  height: 218px;
  overflow: scroll;
  width: calc(100% - 120px);
`

const AddAdminSection = styled.div`
  padding: 30px 60px;
  background-color: ${colors.lightGray};
  width: 100%;
`

const ButtonWrapper = styled(Button)`
  width: 88px;
  height: 46px;
  margin-left: 6px;
  ${media.phone`
    width: 100%;
    margin-left: 0px;
  `}
`

const InviteTitleText = styled.p`
  font-size: 19px;
  color: ${colors.dark};
  margin-bottom: 10px;
`

const AddAdminRow = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  flex-direction: row;

  ${media.phone`
    flex-direction: column;
  `}
`

const AdminContainer = styled.div`
  height: 72px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`

const AdminPhoto = styled.img`
  width: 44px;
  height: 44px;
  border-radius: 22px;
  object-fit: cover;
  margin: 14px;
`

const AdminNameWrapper = styled.div`
  width: 100%;
`

const AdminName = styled.p`
  font-size: 16px;
  font-family: Noto Sans;
  color: ${colors.dark};
`

const AdminEmail = styled.p`
  font-size: 14px;
  font-family: Noto Sans;
  color: ${colors.darkGray};
`

const DeleteAdminLabel = styled.p`
  font-size: 14px;
  font-family: Noto Sans;
  color: ${colors.orange};
  cursor: pointer;
`

const UserRoleLabel = styled.p`
  font-size: 16px;
  font-family: Noto Sans;
  color: ${colors.darkGray};
  margin-right: 10px;
`

const DeleteAdminButton = styled.img`
  margin-right: 30px;
  cursor: pointer;
`

const ModalPageSteps = {
  LOADING: 'LOADING',
  ADD_ADMINS: 'ADD_ADMINS',
}

const isSafariMobile = window.navigator.userAgent.match(/iPhone/i)
class AddAdminsModalPage extends Component {
  state = {
    step: ModalPageSteps.LOADING,
    query: '',
    admins: [],
    existingAdmins: [],
    suggestions: [],
    popoverVisibleAdmin: null,
  }

  componentDidMount() {
    this.fetchOrganization()
  }

  fetchOrganization = async () => {
    const { match } = this.props
    const organizationId = match.params.organizationId
    if (!organizationId) return
    try {
      const admins = await getAdmins(organizationId)
      const res = await getOrganization(organizationId)
      let organizationOwner = null
      if (res && res.organization) {
        organizationOwner = await apiUsers.getUser({
          userId: res.organization.owner,
        })
      }
      if (admins) {
        // Add organization owner at start of list
        let existingAdmins = organizationOwner
          ? [{ ...organizationOwner.user, organizationOwner: true }]
          : []
        existingAdmins = existingAdmins.concat(admins)
        this.setState({
          existingAdmins,
          step: ModalPageSteps.ADD_ADMINS,
        })
      }
    } catch (error) {
      console.error(error)
    }
  }

  handleSend = async () => {
    try {
      const { match } = this.props
      const organizationId = match.params.organizationId
      await addAdmins({ admins: this.state.admins, organizationId })
      await this.fetchOrganization()
      this.setState({ admins: [] })
    } catch (error) {
      console.error(error)
    }
  }

  searchByUser = async query => {
    try {
      const matchedUsers = await apiUsers.search(query)
      this.setState({
        suggestions: matchedUsers.users,
      })
    } catch (error) {
      console.error(error)
    }
  }

  handleSearch = query => {
    this.searchByUser(query)
  }

  handleAdminsChange = admins => {
    this.setState({ admins })
  }

  hideDeletePopover = () => {
    this.setState({
      popoverVisible: false,
    })
  }

  handleVisibleChange = (popoverVisible, adminId) => {
    this.setState({ popoverVisibleAdmin: popoverVisible && adminId })
  }

  handleDeleteAdmin = async adminId => {
    try {
      const { match } = this.props
      const organizationId = match.params.organizationId
      await removeAdmin(organizationId, adminId)
      this.setState({ popoverVisibleAdmin: null })
      this.fetchOrganization()
    } catch (error) {
      console.error(error)
    }
  }

  renderAddAdminsView = () => {
    const {
      intl: { formatMessage },
    } = this.props
    const { admins, suggestions, query, existingAdmins } = this.state

    return this.renderInContainer({
      children: (
        <Fragment>
          <ModalContentWrap isIphone={isSafariMobile}>
            <ActionName>
              <FormattedMessage id={'app.organization.adminUsers'} />
            </ActionName>
            <ActionDescription>
              <FormattedMessage id={'app.organization.adminUsersDescription'} />
            </ActionDescription>
            <AdminList>
              {existingAdmins &&
                existingAdmins.map(admin => (
                  <AdminContainer key={admin._id}>
                    <AdminPhoto
                      src={admin.photo || getUserInitialAvatar(admin.fullName)}
                    />
                    <AdminNameWrapper>
                      <AdminName>{admin.fullName}</AdminName>
                      <AdminEmail>{admin.email}</AdminEmail>
                    </AdminNameWrapper>
                    <UserRoleLabel>
                      <FormattedMessage
                        id={
                          admin.organizationOwner
                            ? 'app.pages.groups.owner'
                            : 'app.pages.groups.admin'
                        }
                      />
                    </UserRoleLabel>
                    <Popover
                      content={
                        <DeleteAdminLabel
                          onClick={() => this.handleDeleteAdmin(admin._id)}
                        >
                          <FormattedMessage
                            id={
                              'app.profilePage.deleteAccountModal.confirmButton'
                            }
                          />
                        </DeleteAdminLabel>
                      }
                      trigger="click"
                      visible={
                        this.state.popoverVisibleAdmin === admin._id &&
                        !admin.organizationOwner
                      }
                      onVisibleChange={visible =>
                        this.handleVisibleChange(visible, admin._id)
                      }
                    >
                      <DeleteAdminButton src={MoreIcon} />
                    </Popover>
                  </AdminContainer>
                ))}
            </AdminList>
            <AddAdminSection>
              <InviteTitleText>
                <FormattedMessage id={'app.organization.addAdminUsers'} />
              </InviteTitleText>
              <AddAdminRow>
                <SearchableInput
                  values={admins}
                  onValuesChange={this.handleAdminsChange}
                  suggestions={suggestions}
                  query={query}
                  onSearch={this.handleSearch}
                  placeholder={
                    admins.length === 0
                      ? formatMessage({
                          id: 'app.createOrganization.inviteAdminsSearch',
                        })
                      : ''
                  }
                />
                <ButtonWrapper onClick={this.handleSend} type="primary">
                  <FormattedMessage id="app.resetPasswordPage.send" />
                </ButtonWrapper>
              </AddAdminRow>
            </AddAdminSection>
          </ModalContentWrap>
        </Fragment>
      ),
      width: 'large',
    })
  }

  renderInContainer = ({ children, width, height, closeBtnColor }) => {
    const { closeModal, history } = this.props

    return (
      <Container width={width} height={height}>
        {children}
        <CloseButton
          style={{ color: closeBtnColor }}
          onClick={() => {
            history.length > 1 ? history.goBack() : closeModal()
          }}
        >
          <CloseIcon />
        </CloseButton>
      </Container>
    )
  }

  renderLoading = () => {
    return this.renderInContainer({
      children: <Spinner />,
      width: 'large',
    })
  }

  render() {
    switch (this.state.step) {
      case ModalPageSteps.LOADING:
        return this.renderLoading()
      case ModalPageSteps.ADD_ADMINS:
        return this.renderAddAdminsView()
    }
  }
}

AddAdminsModalPage.propTypes = {
  closeModal: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
  location: PropTypes.object,
  match: PropTypes.object,
  history: PropTypes.object,
}

const mapStateToProps = state => ({
  user: state.user.data,
})

export default compose(
  connect(mapStateToProps),
  Form.create(),
  injectIntl,
)(AddAdminsModalPage)
