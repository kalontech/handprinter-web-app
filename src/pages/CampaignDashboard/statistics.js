import React, { Fragment, useContext } from 'react'
import Spinner from 'components/Spinner'
import { FormattedMessage } from 'react-intl'
import moment from 'moment'
import MemberCard from 'components/MemberCard'
import _ from 'lodash'

import {
  StatisticsScroll,
  StatisticsContainer,
  StatisticsMain,
  StatisticsScrollTitle,
} from './styled'
import { getUserInitialAvatar } from '../../api'
import AccomplishedAction from './accomplishedAction'

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
  const UIContextData = useContext(UIContextSettings)

  const { participantsLoading, intl, campaign } = props
  const sortedParticipants = getSortedParticipants(props)
  const sortedActions = getSortedActions(props)
  const total = campaign.actions.length
  const dateTo = campaign.dateTo
  const numberToComplete = campaign.actionsNumberToComplete
  const expired = moment().isAfter(dateTo)

  return (
    <Fragment>
      {participantsLoading ? (
        <Spinner />
      ) : (
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
                    impactsInUnits={_.get(
                      participant,
                      'user.impactsInUnits',
                      {},
                    )}
                    progressBarPercent={percentAccomplished}
                    total={total}
                    numberToComplete={numberToComplete}
                    dateTo={dateTo}
                    expired={expired}
                    tooltipText={
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
                    }
                    accomplished={accomplished}
                    showPhysicalValues={UIContextData.showPhysicalValues}
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
      )}
    </Fragment>
  )
}

renderStatistics.propTypes = {
  participantsLoading: Boolean,
  participants: Array,
  intl: Object,
  campaign: Object,
  history: Object,
  user: Object,
}
