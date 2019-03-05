import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'
import styled from 'styled-components'
import notification from 'antd/lib/notification'

import Print from 'assets/icons/fingerprint-part.svg'
import FlagIconComponent from 'assets/icons/FlagIcon'
import StarIconComponent from 'assets/icons/StarIcon'
import DiscoverIconComponent from 'assets/icons/DiscoverIcon'
import CloseIcon from 'assets/icons/CloseIcon'

import { Creators } from 'redux/groups'
import colors from 'config/colors'
import { GROUPS_SUBSETS } from 'utils/constants'
import media, { sizes } from 'utils/mediaQueryTemplate'
import { getInvitationLink } from 'utils/helpers'
import { Modal } from 'components/Styled'
import TabsSecondary, { TABS_TYPES } from 'components/TabsSecondary'
import GroupCreateForm from 'components/GroupCreateForm'
import SendGroupInvitesForm from 'components/SendGroupInvitesForm'
import { fetchCreateGroup, fetchInviteInGroup } from 'api/groups'
import { getUserInitialAvatar } from 'api'

const ModalContent = styled.section`
  width: 550px;
  margin: 0 auto;
  position: relative;
  display: flex;
  justify-content: flex-start;
  box-shadow: 0 1px 10px rgba(52, 68, 66, 0.08);
  border-radius: 4px;
  background-color: ${colors.ocean};
  flex-direction: column;

  ${media.phone`
    width: 100%;
    height: 100%;
    overflow-y: auto;
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
  color: ${colors.white};

  &:hover {
    color: ${colors.white};
  }

  @media screen and (max-height: ${sizes.phone}px) {
    color: ${colors.gray};
  }
`

const FingerPrint = styled.div`
  height: 140px;
  width: 100%;
  background-color: ${colors.ocean};
  text-align: center;
  background: url(${Print}) no-repeat center bottom;
  background-size: initial;

  @media screen and (max-height: ${sizes.phone}px) {
    display: none;
  }
`

const GroupInfo = styled.div`
  background-color: ${colors.white};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  flex-grow: 1;
`

const GroupImg = styled.img`
  width: 110px;
  height: 110px;
  border-radius: 50%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
`

const GroupSubText = styled.p`
  margin: 74px 0 4px;
  line-height: 20px;
  font-size: 14px;
  text-align: center;
  color: ${colors.darkGray};
`

const GroupName = styled.h4`
  line-height: 35px;
  font-size: 28px;
  text-align: center;
  margin-bottom: 28px;
`

const MODAL_TYPES = {
  create: 'create',
  sendInvites: 'sendInvites',
}

class GroupsListHeader extends React.PureComponent {
  static displayName = 'GroupsListHeader'

  static propTypes = {
    intl: intlShape.isRequired,
    groups: PropTypes.object,
    match: PropTypes.object,
    setGroupsList: PropTypes.func,
  }

  state = {
    visibleTabs: false,
    tabsType:
      window.screen.availWidth <= sizes.tablet
        ? TABS_TYPES.select
        : TABS_TYPES.default,
    modalVisible: false,
    modalType: MODAL_TYPES.create,
  }

  get createdGroup() {
    return this.props.groups && (this.props.groups.docs || [])[0]
  }

  componentDidMount() {
    window.addEventListener('orientationchange', this.changeTabsType)
  }

  componentWillUnmount() {
    window.removeEventListener('orientationchange', this.changeTabsType)
  }

  changeTabsType = () => {
    this.setState({
      tabsType:
        window.screen.availWidth <= sizes.tablet
          ? TABS_TYPES.select
          : TABS_TYPES.default,
      visibleTabs: false,
    })
  }

  closeModal = () => {
    this.setState({
      modalVisible: false,
      modalType: MODAL_TYPES.create,
    })
  }

  createGroup = async values => {
    const body = new FormData()

    if (values.picture && values.picture.file)
      body.append('picture', values.picture.file)

    body.append('description', values.description)
    body.append('name', values.name)
    body.append('private', values.private)

    const response = await fetchCreateGroup(body)

    this.setState({ modalType: MODAL_TYPES.sendInvites }, () => {
      const { groups, match } = this.props

      if (match.params.subset !== GROUPS_SUBSETS.FEATURED) {
        this.props.setGroupsList({
          ...groups,
          docs: [response.group, ...groups.docs],
        })
      }
    })
  }

  inviteInGroup = async values => {
    const { user, intl } = this.props

    await fetchInviteInGroup(this.createdGroup._id, {
      ...values,
      invitationUrl: getInvitationLink(user.invitationCode),
    })

    this.closeModal()

    notification.success({
      message: intl.formatMessage({ id: 'app.pages.groups.success' }),
      description: intl.formatMessage({
        id: 'app.pages.groups.invitationsSent',
      }),
    })
  }

  render() {
    const { visibleTabs, tabsType, modalVisible, modalType } = this.state
    const { intl, match } = this.props

    return (
      <React.Fragment>
        <TabsSecondary
          list={[
            {
              to: `/groups/${GROUPS_SUBSETS.DISCOVER}`,
              icon: DiscoverIconComponent,
              text: intl.formatMessage({ id: 'app.actionsPage.tabs.discover' }),
              active: match.params.subset === GROUPS_SUBSETS.DISCOVER,
            },
            {
              to: `/groups/${GROUPS_SUBSETS.MY}`,
              icon: FlagIconComponent,
              text: intl.formatMessage({ id: 'app.pages.groups.myGroups' }),
              active: match.params.subset === GROUPS_SUBSETS.MY,
            },
            {
              to: `/groups/${GROUPS_SUBSETS.FEATURED}`,
              icon: StarIconComponent,
              text: intl.formatMessage({ id: 'app.pages.groups.featured' }),
              active: match.params.subset === GROUPS_SUBSETS.FEATURED,
            },
          ]}
          isOpen={visibleTabs}
          listType={tabsType}
          toggleVisible={visible => {
            this.setState({ visibleTabs: visible })
          }}
          button={{
            text: intl.formatMessage({ id: 'app.pages.groups.createGroup' }),
            onClick: () => {
              this.setState({ modalVisible: true })
            },
          }}
        />

        <Modal
          visible={modalVisible}
          closable={false}
          onCancel={this.closeModal}
          centered
          footer={null}
          width="auto"
          destroyOnClose
        >
          <ModalContent>
            <CloseButton onClick={this.closeModal}>
              <CloseIcon />
            </CloseButton>

            <FingerPrint />

            {
              {
                [MODAL_TYPES.create]: (
                  <GroupCreateForm onSubmit={this.createGroup} />
                ),
                [MODAL_TYPES.sendInvites]: this.createdGroup && (
                  <React.Fragment>
                    <GroupInfo>
                      <GroupImg
                        src={
                          this.createdGroup.picture ||
                          getUserInitialAvatar(this.createdGroup.name)
                        }
                        alt="group picture"
                      />

                      <GroupSubText>
                        {intl.formatMessage({
                          id: 'app.pages.groups.successCreated',
                        })}
                      </GroupSubText>

                      <GroupName>{this.createdGroup.name}</GroupName>
                    </GroupInfo>

                    <SendGroupInvitesForm
                      onSubmit={this.inviteInGroup}
                      cancel={{
                        onClick: this.closeModal,
                        text: intl.formatMessage({
                          id: 'app.pages.groups.skipForNow',
                        }),
                      }}
                    />
                  </React.Fragment>
                ),
              }[modalType]
            }
          </ModalContent>
        </Modal>
      </React.Fragment>
    )
  }
}

export default compose(
  injectIntl,
  withRouter,
  connect(
    state => ({
      user: state.user.data,
      groups: state.groups.list,
    }),
    { setGroupsList: Creators.setGroupsList },
  ),
)(GroupsListHeader)
