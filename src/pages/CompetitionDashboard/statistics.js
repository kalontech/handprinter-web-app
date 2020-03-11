import React, { Fragment } from 'react'
import Spinner from 'components/Spinner'
import { FormattedMessage } from 'react-intl'
import arrowDownIcon from 'assets/icons/arrowDown.svg'
import MemberCard from 'components/MemberCard'

import { Select } from 'antd'

import {
  StatisticsScroll,
  StatisticsContainer,
  StatisticsMain,
  StatisticsScrollTitle,
  StatisticsHeaderDropdown,
} from './styled'

import { getUserInitialAvatar } from '../../api'
import AccomplishedAction from './accomplishedAction'
import { INVITATION_STATUSES } from '../IncreaseHandprintPage'

function getSortedActions({ participants }) {
  // Group by slug
  const res = participants.reduce((acc, curr) => {
    const accomplished = curr.accomplishedActions
    accomplished.forEach(action => {
      if (!acc[action.slug]) acc[action.slug] = {}
      acc[action.slug] = {
        action,
        count: acc[action.slug].count ? acc[action.slug].count + 1 : 1,
      }
    })
    return acc
  }, {})
  // Convert to array and sort by accimplished actions count
  return Object.keys(res)
    .map(key => res[key])
    .sort((a, b) => b.count - a.count)
}

function getSortedParticipants(props) {
  return props.participants.sort((a, b) => {
    if (
      a.user._id === props.user._id ||
      a.accomplishedActions.length > b.accomplishedActions.length
    ) {
      return -1
    }
    return 1
  })
}

export default function renderStatistics(props) {
  const { loading, intl, competition, invitations } = props

  const sortedParticipants = getSortedParticipants(props)
  const sortedActions = getSortedActions(props)

  const total = competition.actions.length
  const myGroups = invitations.filter(
    i => i.status === INVITATION_STATUSES.ACCEPTED,
  )
  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          <StatisticsHeaderDropdown>
            <Select
              defaultValue={myGroups[0] && myGroups[0].group.name}
              style={{ width: '100%' }}
              optionFilterProp="children"
              className="ant-select__override-for__register-page"
              dropdownClassName="ant-select__override-for__register-page"
              onSelect={value => {
                // setSelectedGroupId(value)
              }}
              suffixIcon={<img src={arrowDownIcon} />}
            >
              {myGroups.map(i => (
                <Select.Option key={i._id} value={i._id}>
                  {i.group.name}
                </Select.Option>
              ))}
            </Select>
          </StatisticsHeaderDropdown>

          <StatisticsMain>
            <StatisticsContainer>
              <StatisticsScrollTitle>
                <FormattedMessage id="app.campaignPage.participants" />
              </StatisticsScrollTitle>
              <StatisticsScroll>
                {sortedParticipants.map(participant => {
                  const accomplished = participant.accomplishedActions.length
                  const percentAccomplished = (accomplished / total) * 100
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
                        { accomplished, total },
                      )}
                      impacts={{ handprint: participant.userInfo.impacts }}
                      progressBarPercent={percentAccomplished}
                    />
                  )
                })}
              </StatisticsScroll>
            </StatisticsContainer>
            <StatisticsContainer>
              <StatisticsScrollTitle>
                <FormattedMessage id="app.header.menu.actions" />
              </StatisticsScrollTitle>
              <StatisticsScroll>
                {sortedActions.map(accomplished => (
                  <AccomplishedAction
                    key={accomplished.action._id}
                    accomplished={accomplished}
                  />
                ))}
              </StatisticsScroll>
            </StatisticsContainer>
          </StatisticsMain>
        </Fragment>
      )}
    </Fragment>
  )
}

renderStatistics.propTypes = {
  loading: Boolean,
  participants: Array,
  invitations: Array,
  intl: Object,
  competition: Object,
  history: Object,
  user: Object,
}
