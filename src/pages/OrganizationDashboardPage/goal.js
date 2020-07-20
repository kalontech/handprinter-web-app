import React, { Fragment } from 'react'
import Spinner from 'components/Spinner'
import { FormattedMessage } from 'react-intl'
import { CircularProgressbar } from 'react-circular-progressbar'
import _ from 'lodash'

import {
  StatisticsScroll,
  StatisticsContainer,
  StatisticsMain,
  StatisticsScrollTitle,
  Separator,
  ActionLabelsTitle,
  GoalHeaderWrapper,
  CircularProgressbarContainer,
  GoalTitle,
  GoalDescription,
  GoalTitleContainer,
} from './styled'
import ImpactProgress from '../../components/ImpactProgress'
import { IMPACT_CATEGORIES } from '../../utils/constants'

function calculateTotalPercent(goal, current) {
  if (!goal || !current) return 0
  const categories = Object.keys(IMPACT_CATEGORIES).map(
    key => IMPACT_CATEGORIES[key],
  )
  let totalCurrent = 0
  let totalGoal = 0
  categories.forEach(category => {
    if (current[category]) totalCurrent += current[category]
    if (goal[category]) totalGoal += goal[category]
  })
  return Math.min(100, Math.round((totalCurrent * 100) / totalGoal))
}

export default function renderGoal(props) {
  const { group, user } = props
  if (!group || !user) return null

  const loading = false
  const goal = group.goal
  const currentProgress = _.get(
    group,
    'userImpacts.impactsInUnits.footprint',
    {},
  )
  const totalPercent = calculateTotalPercent(goal, currentProgress)

  if (!goal) return <h1>No Goal</h1>
  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <StatisticsMain>
          <StatisticsContainer>
            <StatisticsScrollTitle>
              <FormattedMessage id="app.organization.current.goal" />
            </StatisticsScrollTitle>
            <StatisticsScroll>
              <GoalHeaderWrapper>
                <CircularProgressbarContainer>
                  <CircularProgressbar
                    value={totalPercent}
                    text={`${totalPercent}%`}
                  />
                </CircularProgressbarContainer>
                <GoalTitleContainer>
                  <GoalTitle>{goal.name}</GoalTitle>
                  {!!goal.description && (
                    <GoalDescription>{goal.description}</GoalDescription>
                  )}
                </GoalTitleContainer>
              </GoalHeaderWrapper>
              <Separator />
              <StatisticsScrollTitle style={{ textAlign: 'center' }}>
                <FormattedMessage id="app.organization.goal.progress.categories" />
              </StatisticsScrollTitle>
              {Object.keys(IMPACT_CATEGORIES).map(key => {
                const category = IMPACT_CATEGORIES[key]
                return (
                  <ImpactProgress
                    key={key}
                    category={category}
                    current={currentProgress[category]}
                    total={goal[category]}
                  />
                )
              })}
              <ActionLabelsTitle style={{ marginTop: 28 }}>
                <p>
                  <FormattedMessage id="app.organization.goal.great.place" />
                </p>
                <p>
                  <FormattedMessage id="app.organization.goal.can.foster" />
                </p>
              </ActionLabelsTitle>
            </StatisticsScroll>
          </StatisticsContainer>
          <StatisticsContainer>
            <StatisticsScrollTitle>
              <FormattedMessage id="app.organization.milestones" />
            </StatisticsScrollTitle>
            <Separator />
            <StatisticsScroll>1</StatisticsScroll>
          </StatisticsContainer>
        </StatisticsMain>
      )}
    </Fragment>
  )
}

renderGoal.propTypes = {
  group: Object,
  user: Object,
}
