import React, { Fragment } from 'react'
import _ from 'lodash'
import Spinner from 'components/Spinner'
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router-dom'
import { Menu, Row } from 'antd'
import GroupCard from 'components/GroupCard'

import { MenuStyled, Column, EmptyList } from './styled'
import { getUserInitialAvatar } from '../../api'
import { INVITATION_STATUSES } from '../IncreaseHandprintPage'

export function getGroups(participants, invitations) {
  let groups = {}
  invitations
    .filter(i => i.status === INVITATION_STATUSES.ACCEPTED)
    .forEach(invitation => {
      const participant = participants.find(
        i => i.user._id.toString() === invitation.user.toString(),
      )
      if (!groups[invitation.group.name]) groups[invitation.group.name] = {}
      if (!groups[invitation.group.name].participants)
        groups[invitation.group.name].participants = []
      groups[invitation.group.name] = {
        group: invitation.group,
        participants: groups[invitation.group.name].participants.concat(
          participant,
        ),
      }
    })
  return groups
}

export default function renderParticipants(props) {
  const { loading, participants, intl, competition, invitations } = props

  const selectedKey = _.get(props, 'location.search', '').includes('finished')
    ? 'finished'
    : 'participants'
  const actionsNumberToComplete =
    competition.actionsNumberToComplete || competition.actions.length
  const groups = getGroups(participants, invitations)
  const filteredGroups =
    selectedKey === 'finished'
      ? Object.values(groups).filter(i => {
          const accomplishedActionsSum = i.participants.reduce(
            (acc, curr) => acc + curr.accomplishedActions.length,
            0,
          )
          return (
            accomplishedActionsSum >=
            actionsNumberToComplete * i.participants.length
          )
        })
      : Object.values(groups)

  return (
    <Fragment>
      <MenuStyled
        mode="horizontal"
        inlineIndent={0}
        selectedKeys={[selectedKey]}
      >
        <Menu.Item key="participants">
          <Link to="?view=participants">
            <FormattedMessage id="app.campaignPage.participants" />
          </Link>
        </Menu.Item>
        <Menu.Item key="finished">
          <Link to="?view=participants&tab=finished">
            <FormattedMessage id="app.campaignPage.finished" />
          </Link>
        </Menu.Item>
      </MenuStyled>

      {loading ? (
        <Spinner />
      ) : (
        <Row style={{ flexGrow: '1' }}>
          {filteredGroups.map(item => (
            <Column key={item._id} xl={8} lg={12} md={12} xs={24}>
              <GroupCard
                to={`/groups/view/${item.group._id}/statistics`}
                name={item.group.name}
                counter={intl.formatMessage(
                  { id: 'app.pages.groups.membersCount' },
                  { count: item.group.info.membersCount },
                )}
                picture={
                  item.group.picture || getUserInitialAvatar(item.group.name)
                }
              />
            </Column>
          ))}
          {filteredGroups.length === 0 && (
            <EmptyList>
              {intl.formatMessage({
                id: 'app.pages.groups.emptyParticipantsList',
              })}
            </EmptyList>
          )}
        </Row>
      )}
    </Fragment>
  )
}

renderParticipants.propTypes = {
  loading: Boolean,
  participants: Array,
  invitations: Array,
  intl: Object,
  competition: Object,
  user: Object,
}
