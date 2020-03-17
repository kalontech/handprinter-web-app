import React, { Fragment } from 'react'
import _ from 'lodash'
import qs from 'qs'
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router-dom'
import { Menu } from 'antd'
import MemberCard from 'components/MemberCard'

import { PrimaryButton, DefaultButton } from 'components/Styled'

import styled from 'styled-components'

import colors from 'config/colors'

import { getGroups } from './participants'

import { getUserInitialAvatar } from '../../api'

import { MenuStyled } from './styled'
import { INVITATION_STATUSES } from '../IncreaseHandprintPage'
import { acceptInvitation, denyInvitation } from '../../api/competitions'

const Main = styled.div`
  width: 100%;
  height: 600px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const ParticipantsMain = styled(Main)`
  justify-content: flex-start;
  align-items: center;
  padding: 30px;
`

const Text = styled.span`
  margin-bottom: 60px;
  font-family: Noto Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 28px;
  line-height: 35px;
  color: ${colors.dark};
  width: 450px;
  text-align: center;
`

const Description = styled.span`
  margin-bottom: 60px;
  font-family: Noto Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  color: ${colors.darkGray};
`

// Returns group members which are accepted competition invitation
function getGroupParticipants(props, invitation) {
  const { ownGroupsList, participants } = props
  const selectedGroup = ownGroupsList.find(i => i._id === invitation.group._id)

  if (selectedGroup) {
    const groupMembers = selectedGroup.members
    if (groupMembers) {
      return participants.filter(
        participant =>
          !!groupMembers.map(i => i.user._id).includes(participant.user._id),
      )
    }
    return []
  }
  return []
}

export default function renderGroups(props) {
  const { invitations, competition, intl } = props
  if (!invitations || invitations.length === 0) return null
  const search = _.get(props, 'location.search', '')
  const { tabIndex } = qs.parse(search, { ignoreQueryPrefix: true })
  const invitation = invitations[tabIndex]
  let groupParticipants = getGroupParticipants(props, invitation)

  const joinCompetition = intl.formatMessage(
    { id: 'app.competitions.join' },
    {
      group: invitation.group.name,
      competition: competition.name,
    },
  )

  const dinedInvitation = intl.formatMessage(
    { id: 'app.competitions.denied' },
    {
      group: invitation.group.name,
      competition: competition.name,
    },
  )

  return (
    <Fragment>
      <MenuStyled mode="horizontal" inlineIndent={0} selectedKeys={[search]}>
        {invitations.map((invitation, index) => (
          <Menu.Item key={`?view=groups&tabIndex=${index}`}>
            <Link to={`?view=groups&tabIndex=${index}`}>
              <span>{invitation.group.name}</span>
            </Link>
          </Menu.Item>
        ))}
      </MenuStyled>
      {invitation.status === INVITATION_STATUSES.PENDING && (
        <Main>
          <Text>{joinCompetition}</Text>
          <div>
            <DefaultButton
              style={{ width: 200, margin: 5 }}
              onClick={() => {
                denyInvitation(invitation.competition)
                window.location.reload()
              }}
            >
              <FormattedMessage id="app.pages.groups.deny" />
            </DefaultButton>

            <PrimaryButton
              style={{ width: 200, margin: 5 }}
              onClick={() => {
                acceptInvitation(invitation.competition)
                window.location.reload()
              }}
              type="primary"
            >
              <FormattedMessage id="app.pages.groups.join" />
            </PrimaryButton>
          </div>
        </Main>
      )}
      {invitation.status === INVITATION_STATUSES.DENIED && (
        <Main>
          <Text>{dinedInvitation}</Text>
          <Description>
            <FormattedMessage id="app.competitions.deniedDescription" />
          </Description>
        </Main>
      )}
      {invitation.status === INVITATION_STATUSES.ACCEPTED && (
        <ParticipantsMain>
          {renderGroup(props, groupParticipants)}
          {groupParticipants.map(participant => {
            const accomplished = participant.accomplishedActions.length
            const total = competition.actions.length
            const percent = (accomplished / total) * 100
            return (
              <MemberCard
                containerStyle={{ width: '95%' }}
                key={participant.user._id}
                to={`/account/${participant.user._id}`}
                fullName={participant.user.fullName}
                photo={
                  participant.user.photo ||
                  getUserInitialAvatar(participant.user.fullName)
                }
                counter={intl.formatMessage(
                  { id: 'app.campaignPage.progress.accomplished' },
                  {
                    accomplished,
                    total,
                  },
                )}
                impacts={{ handprint: participant.userInfo.impacts }}
                progressBarPercent={percent}
              />
            )
          })}
        </ParticipantsMain>
      )}
    </Fragment>
  )
}

function renderGroup(props, groupParticipants) {
  const { competition, intl, allInvitations } = props
  const total = competition.actions.length
  const groups = getGroups(groupParticipants, allInvitations)
  const cg = groups && Object.values(groups)[0] // competition group
  if (!cg || _.isEmpty(cg.participants)) return null
  const accomplished = cg.participants.reduce(
    (acc, curr) =>
      acc +
      (curr && curr.accomplishedActions ? curr.accomplishedActions.length : 0),
    0,
  )
  const participantsCount = cg.participants.length
  let totalActions = total * participantsCount
  const percentAccomplished = (accomplished / totalActions) * 100
  return (
    <MemberCard
      key={cg.group._id}
      to={`/groups/view/${cg.group._id}/statistics`}
      fullName={cg.group.name}
      photo={cg.group.picture || getUserInitialAvatar(cg.group.name)}
      counter={intl.formatMessage(
        { id: 'app.campaignPage.progress.accomplished' },
        { accomplished, total: totalActions },
      )}
      progressBarPercent={percentAccomplished}
      actionsTakenPerMember={Number(accomplished / participantsCount).toFixed(
        1,
      )}
      impacts={{ handprint: cg.group.impacts }}
      containerStyle={{ width: '100%' }}
    />
  )
}

renderGroups.propTypes = {
  invitations: Array,
  competition: Object,
  intl: Object,
}

renderGroup.propTypes = {
  competition: Object,
  intl: Object,
  allInvitations: Array,
}
