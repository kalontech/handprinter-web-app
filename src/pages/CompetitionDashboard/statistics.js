import React, { Fragment, useContext } from 'react'
import Spinner from 'components/Spinner'
import { FormattedMessage } from 'react-intl'
import MemberCard from 'components/MemberCard'
import moment from 'moment'

import {
  StatisticsScroll,
  StatisticsContainer,
  StatisticsMain,
  StatisticsScrollTitle,
} from './styled'

import { getUserInitialAvatar } from '../../api'
import AccomplishedAction from './accomplishedAction'
import { getGroups } from './participants'
import { calcImpactsCompetitionStatistic } from '../../utils/calcImpactsInUnits'
import { UIContextSettings } from '../../context/uiSettingsContext'

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

function getSortedGroups(groups) {
  return groups.sort((a, b) => {
    const accomplishedCurr = a.participants.reduce(
      (acc, curr) => acc + curr.accomplishedActions.length,
      0,
    )
    const actionsTakenPerMemberCurr = accomplishedCurr / a.participants.length

    const accomplishedNext = b.participants.reduce(
      (acc, curr) => acc + curr.accomplishedActions.length,
      0,
    )
    const actionsTakenPerMemberNext = accomplishedNext / b.participants.length
    if (a.group.info.isMember && !b.group.info.isMember) {
      return -1
    }
    if (actionsTakenPerMemberCurr > actionsTakenPerMemberNext) {
      return -1
    }
    return 1
  })
}

export default function renderStatistics(props) {
  const UIContextData = useContext(UIContextSettings)
  const {
    loading,
    intl,
    competition,
    participants,
    allInvitations,
    accomplishedUserActions,
  } = props
  const total = competition.actions.length
  const accomplished = accomplishedUserActions.length
  const expired = moment().isAfter(competition.dateTo)

  const numberToComplete = competition.actionsNumberToComplete || total

  const sortedActions = getSortedActions(props)

  const groups = getGroups(participants, allInvitations)
  const sortedGroups = getSortedGroups(Object.values(groups))

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

  const progressProps = {
    total,
    successCount: numberToComplete,
    accomplished,
    endDate: competition.dateTo,
    expired,
    tooltipText,
  }

  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <Fragment>
          {/* Can be uncommented */}
          {/* <StatisticsHeaderDropdown>
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
          </StatisticsHeaderDropdown> */}
          <StatisticsMain>
            <StatisticsContainer>
              <StatisticsScrollTitle>
                {sortedGroups.length !== 0 ? (
                  <FormattedMessage id="app.campaignPage.participants" />
                ) : (
                  <FormattedMessage id="app.campaignPage.noparticipants" />
                )}
              </StatisticsScrollTitle>
              <StatisticsScroll>
                {sortedGroups.map(i => {
                  const accomplished =
                    i.participants.reduce(
                      (acc, curr) => acc + curr.accomplishedActions.length,
                      0,
                    ) || 0
                  const participantsCount = i.participants.length || 1
                  let totalActions = total * participantsCount
                  const percentAccomplished =
                    (accomplished / totalActions) * 100
                  return (
                    <MemberCard
                      key={i.group._id}
                      to={`/groups/view/${i.group._id}/statistics`}
                      fullName={i.group.name}
                      photo={
                        i.group.picture || getUserInitialAvatar(i.group.name)
                      }
                      counter={intl.formatMessage(
                        { id: 'app.campaignPage.progress.accomplished' },
                        { accomplished, total: totalActions },
                      )}
                      progressBarPercent={percentAccomplished}
                      actionsTakenPerMember={Number(
                        accomplished / participantsCount,
                      ).toFixed(1)}
                      impacts={{ handprint: i.group.impacts }}
                      impactsInUnits={calcImpactsCompetitionStatistic(
                        i.participants,
                      )}
                      showPhysicalValues={UIContextData.showPhysicalValues}
                      {...progressProps}
                    />
                  )
                })}
              </StatisticsScroll>
            </StatisticsContainer>
            <StatisticsContainer>
              <StatisticsScrollTitle>
                {sortedActions.length !== 0 ? (
                  <FormattedMessage id="app.header.menu.actions" />
                ) : (
                  <FormattedMessage id="app.header.menu.noactions" />
                )}
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
  allInvitations: Array,
  intl: Object,
  competition: Object,
  history: Object,
  user: Object,
  accomplishedUserActions: Array,
}
