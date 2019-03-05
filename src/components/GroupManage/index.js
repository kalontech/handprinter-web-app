import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import styled, { css } from 'styled-components'
import { compose } from 'redux'
import PropTypes from 'prop-types'
import Popover from 'antd/lib/popover'
import Icon from 'antd/lib/icon'
import notification from 'antd/lib/notification'
import { intlShape, injectIntl } from 'react-intl'

import colors from 'config/colors'
import { getInvitationLink } from 'utils/helpers'
import media from 'utils/mediaQueryTemplate'
import { USER_GROUP_STATUSES, USER_GROUP_ROLES } from 'utils/constants'
import fetch, { configDefault as fetchConfigDefault } from 'utils/fetch'
import hexToRgba from 'utils/hexToRgba'
import SendGroupInvitesForm from 'components/SendGroupInvitesForm'
import Spinner from 'components/Spinner'
import { getUserInitialAvatar } from 'api'
import {
  fetchGroupMembers,
  fetchUpdateGroupMember,
  fetchInvitationRequest,
  fetchInviteInGroup,
} from 'api/groups'

const Block = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding-top: 58px;
  background-color: ${colors.white};
  min-width: 592px;

  ${media.phone`
    min-width: initial; 
    width: 100%; 
    min-height: 100%; 
  `}
`

const Title = styled.h3`
  line-height: 35px;
  font-size: 28px;
  text-align: center;
  color: ${colors.dark};
  margin-bottom: 32px;
`

const MembersList = styled.ul`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
  position: relative;
  height: 292px;
  width: 100%;
  max-width: 472px;
  overflow-y: auto;
  margin-bottom: 40px;
  border: 1px solid ${colors.gray};
  border-radius: 4px;
  padding: 0;

  ${media.phone` 
    width: 90%;
    flex-grow: 1; 
  `}
`

const Loader = styled.li`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  z-index: 10;
`

const ListItem = styled.li`
  display: flex;
  justify-content: space-between;
  align-items: center;
  min-height: 68px;
  padding: 12px 14px;

  :hover {
    background-color: ${hexToRgba(colors.blue, 0.1)};
  }
`

const User = styled.div`
  display: flex;
  align-items: center;
`

const UserImg = styled.img`
  width: 44px;
  height: 44px;
  border-radius: 50%;
  object-fit: cover;
  margin-right: 12px;
`

const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: baseline;
`

const UserFIO = styled.span`
  line-height: 1.1;
  font-size: 16px;
  color: ${colors.dark};
`

const UserEmail = styled.span`
  line-height: 20px;
  font-size: 14px;
  color: ${colors.darkGray};
`

const ButtonRoleControl = styled.button`
  line-height: 22px;
  font-size: 16px;
  color: ${colors.darkGray};
  outline: 0;
  background-color: transparent;
  border: 0;
  cursor: pointer;
  position: relative;
  ${({ disabled }) =>
    disabled &&
    css`
      pointer-events: none;
    `}

  :hover,
  :focus {
    color: ${colors.blue};
  }

  .ant-popover-placement-bottomRight {
    padding-top: 14px;
  }

  .ant-popover-inner-content {
    padding: 0;
  }

  .ant-content-arrow {
    top: 0;
  }
`

const Role = styled.span`
  margin-right: 4px;
  text-transform: uppercase;
`

const RolesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  min-width: 120px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: stretch;
`

const ButtonRole = styled.button`
  padding: 14px 12px;
  line-height: 20px;
  font-size: 14px;
  color: ${colors.dark};
  outline: 0;
  background-color: transparent;
  border: 0;
  cursor: pointer;
  width: 100%;
  text-align: left;

  :hover,
  :focus,
  :active {
    background-color: ${colors.lightGray};
  }
`

async function getMembersList({ match }) {
  return fetchGroupMembers({ groupId: match.params.id, page: 1 })
}

class GroupManage extends React.PureComponent {
  static displayName = 'GroupManage'

  static propTypes = {
    intl: intlShape.isRequired,
    members: PropTypes.object,
    loading: PropTypes.bool,
    mutate: PropTypes.func,
    match: PropTypes.object,
  }

  state = {
    activePopover: undefined,
  }

  get roles() {
    const { intl } = this.props

    return [
      {
        label: intl.formatMessage({ id: 'app.pages.groups.admin' }),
        value: USER_GROUP_ROLES.ADMIN,
      },
      {
        label: intl.formatMessage({ id: 'app.pages.groups.member' }),
        value: USER_GROUP_ROLES.MEMBER,
      },
    ]
  }

  get invitations() {
    const { intl } = this.props

    return [
      {
        label: intl.formatMessage({ id: 'app.pages.groups.approve' }),
        value: 'approve',
        style: { color: colors.dark },
      },
      {
        label: intl.formatMessage({ id: 'app.pages.groups.deny' }),
        value: 'deny',
        style: { color: colors.orange },
      },
    ]
  }

  onVisibleChange = index => visible => {
    this.setState({
      activePopover: visible ? index : undefined,
    })
  }

  onRoleListItemClick = ({ id, value }) => () => {
    const { mutate, members, match } = this.props

    this.setState({ activePopover: undefined }, () => {
      const docs = members.docs
        .map(item => {
          if (id !== item.user._id) return item
          if (value === 'deny') return undefined

          return {
            ...item,
            groupInfo: {
              ...item.groupInfo,
              memberStatus:
                value === 'approve'
                  ? USER_GROUP_STATUSES.ACTIVE
                  : item.groupInfo.memberStatus,
              memberRole:
                value === 'approve' ? item.groupInfo.memberRole : value,
            },
          }
        })
        .filter(Boolean)

      mutate({ members: { ...members, docs } })
    })

    if (['approve', 'deny'].includes(value)) {
      fetchInvitationRequest({
        id: match.params.id,
        memberId: id,
        type: value,
      })
      return
    }

    fetchUpdateGroupMember({
      id: match.params.id,
      memberId: id,
      body: { role: value },
    })
  }

  onSubmit = async values => {
    const { match, user, intl } = this.props

    await fetchInviteInGroup(match.params.id, {
      ...values,
      invitationUrl: getInvitationLink(user.invitationCode),
    })

    notification.success({
      message: intl.formatMessage({ id: 'app.pages.groups.success' }),
      description: intl.formatMessage({
        id: 'app.pages.groups.invitationsSent',
      }),
    })
  }

  render() {
    const { activePopover } = this.state
    const { loading, members, intl } = this.props

    return (
      <Block>
        <Title>
          {intl.formatMessage({ id: 'app.pages.groups.yourMembers' })}
        </Title>

        <MembersList>
          {members &&
            members.docs.map(({ user, groupInfo }, index) => {
              const isActive =
                groupInfo.memberStatus === USER_GROUP_STATUSES.ACTIVE

              return (
                <ListItem key={user._id}>
                  <User>
                    <UserImg
                      src={user.photo || getUserInitialAvatar(user.fullName)}
                      alt="photo"
                    />

                    <UserInfo>
                      <UserFIO>{user.fullName}</UserFIO>
                      <UserEmail>{user.email}</UserEmail>
                    </UserInfo>
                  </User>

                  <Popover
                    trigger="click"
                    placement="bottomRight"
                    autoAdjustOverflow={false}
                    getPopupContainer={() => this[`$button_${index}`]}
                    visible={activePopover === index}
                    onVisibleChange={this.onVisibleChange(index)}
                    content={
                      <RolesList>
                        {(isActive ? this.roles : this.invitations).map(
                          item => (
                            <li key={item.value}>
                              <ButtonRole
                                style={item.style}
                                onClick={this.onRoleListItemClick({
                                  id: user._id,
                                  value: item.value,
                                })}
                              >
                                {item.label}
                              </ButtonRole>
                            </li>
                          ),
                        )}
                      </RolesList>
                    }
                  >
                    <ButtonRoleControl
                      ref={ref => {
                        this[`$button_${index}`] = ref
                      }}
                      disabled={
                        groupInfo.memberRole === USER_GROUP_ROLES.OWNER ||
                        groupInfo.memberStatus === USER_GROUP_STATUSES.INVITED
                      }
                    >
                      <Role>
                        {intl.formatMessage({
                          id: {
                            MEMBER: 'app.pages.groups.member',
                            OWNER: 'app.pages.groups.owner',
                            ADMIN: 'app.pages.groups.admin',
                            REQUESTING: 'app.pages.groups.pending',
                            INVITED: 'app.pages.groups.invited',
                          }[
                            isActive
                              ? groupInfo.memberRole
                              : groupInfo.memberStatus
                          ],
                        })}
                      </Role>

                      <Icon type="ellipsis" rotate={90} />
                    </ButtonRoleControl>
                  </Popover>
                </ListItem>
              )
            })}

          {loading && (
            <Loader>
              <Spinner />
            </Loader>
          )}
        </MembersList>

        <SendGroupInvitesForm onSubmit={this.onSubmit} />
      </Block>
    )
  }
}

export default compose(
  injectIntl,
  connect(state => ({
    user: state.user.data,
  })),
  withRouter,
  fetch(getMembersList, { ...fetchConfigDefault, loader: false }),
)(GroupManage)
