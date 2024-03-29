import React, { Fragment } from 'react'
import _ from 'lodash'
import qs from 'qs'
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router-dom'
import { Menu, Select } from 'antd'
import MemberCard from 'components/MemberCard'
import { PrimaryButton, DefaultButton } from 'components/Styled'
import styled from 'styled-components'
import colors from 'config/colors'
import moment from 'moment'
import media from 'utils/mediaQueryTemplate'

import { getGroups } from './participants'
import { getUserInitialAvatar } from '../../api'
import { MenuStyled } from './styled'
import { INVITATION_STATUSES } from '../IncreaseHandprintPage'
import { acceptInvitation, denyInvitation } from '../../api/competitions'

const { Option } = Select

const Main = styled.div`
  width: 100%;
  max-height: 600px;
  overflow: scroll;
  background-color: ${colors.white};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  ${media.largeDesktop`
    padding: 20px 0px; 
    flex-direction: row;
    justify-content: flex-start;
    flex-wrap: wrap;
  `}

  ${media.phone`
    padding: 20px 3px; 
  `}
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
  const {
    invitations,
    competition,
    intl,
    accomplishedUserActions,
    isMobile,
    isTablet,
  } = props

  const accomplished = accomplishedUserActions.length
  const expired = moment().isAfter(competition.dateTo)

  const total = competition.actions.length
  const numberToComplete = competition.actionsNumberToComplete || total

  const tooltipText =
    accomplished >= numberToComplete
      ? props.intl.formatMessage({
          id: 'app.competitions.you.reached.challenge',
        })
      : props.intl.formatMessage(
          { id: 'app.competitions.you.need.take' },
          {
            numberToComplete: numberToComplete - accomplished,
          },
        )

  if (!invitations || invitations.length === 0) return null
  const search = _.get(props, 'location.search', '')
  const { tabIndex } = qs.parse(search, { ignoreQueryPrefix: true })
  const invitation = invitations[tabIndex]
  let groupParticipants = getGroupParticipants(props, invitation)

  const accomplishedInGroup = groupParticipants
    .map(item => {
      return item.accomplishedActions.length
    })
    .reduce((sum, curr) => {
      return sum + curr
    }, 0)

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

  const progressGroupProps = {
    total,
    successCount: numberToComplete,
    accomplished: accomplishedInGroup,
    endDate: competition.dateTo,
    expired,
    tooltipText,
    isTablet,
  }

  const progressProps = {
    total,
    successCount: numberToComplete,
    accomplished,
    endDate: competition.dateTo,
    expired,
    tooltipText,
    isTablet,
  }

  return (
    <Fragment>
      {!isTablet && !isMobile && (
        <MenuStyled mode="horizontal" inlineIndent={0} selectedKeys={[search]}>
          {invitations.map((invitation, index) => (
            <Menu.Item key={`?view=groups&tabIndex=${index}`}>
              <Link to={`?view=groups&tabIndex=${index}`}>
                <span>{invitation.group.name}</span>
              </Link>
            </Menu.Item>
          ))}
        </MenuStyled>
      )}
      {(isTablet || isMobile) && (
        <Select
          style={{ width: '100%' }}
          defaultValue={invitations[0].group.name}
        >
          {invitations.map((invitation, index) => (
            <Option key={index}>{invitation.group.name}</Option>
          ))}
        </Select>
      )}
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
          {!isMobile &&
            !isTablet &&
            renderGroup({ ...props, ...progressGroupProps }, groupParticipants)}
          {groupParticipants.map(participant => {
            const accomplished = participant.accomplishedActions.length
            const total = competition.actions.length
            const percent = (accomplished / total) * 100
            return (
              <MemberCard
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
                hasTakenActions={accomplished > 0}
                {...progressProps}
              />
            )
          })}
        </ParticipantsMain>
      )}
    </Fragment>
  )
}

function renderGroup(props, groupParticipants) {
  const {
    intl,
    allInvitations,
    total,
    accomplished = 0,
    endDate,
    expired,
    tooltipText,
  } = props
  const groups = getGroups(groupParticipants, allInvitations)
  const cg = groups && Object.values(groups)[0] // competition group
  if (!cg || _.isEmpty(cg.participants)) return null
  const participantsCount = cg.participants.length || 1
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
      total={props.total}
      accomplished={accomplished}
      endDate={endDate}
      expired={expired}
      tooltipText={tooltipText}
      hasTakenActions={accomplished > 0}
    />
  )
}

renderGroups.propTypes = {
  invitations: Array,
  competition: Object,
  intl: Object,
  accomplishedUserActions: Array,
  isTablet: Boolean,
  isMobile: Boolean,
}

renderGroup.propTypes = {
  competition: Object,
  intl: Object,
  allInvitations: Array,
  total: Number,
  accomplished: Number,
  endDate: Date,
  expired: Boolean,
  tooltipText: String,
}
