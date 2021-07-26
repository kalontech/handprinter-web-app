import React, { Fragment, useEffect } from 'react'
import Spinner from 'components/Spinner'
import { FormattedMessage } from 'react-intl'
import _ from 'lodash'

import {
  StatisticsScroll,
  StatisticsContainer,
  StatisticsMain,
  StatisticsScrollTitle,
  GoalHeaderWrapper,
  CircularProgressbarContainer,
  GoalTitle,
  GoalDescription,
  GoalTitleContainer,
  GoalPicture,
} from '../styled'
import ImpactProgress from '../../../components/ImpactProgress'
import { IMPACT_CATEGORIES } from '../../../utils/constants'
import renderMilestones from '../milestones'

// CAN BE UNCOMMENTED
// function calculateTotalPercent(goal, current) {
//   if (!goal || !current) return 0
//   const categories = Object.keys(IMPACT_CATEGORIES).map(
//     key => IMPACT_CATEGORIES[key],
//   )
//   let summaryPercent = 0
//   let categoriesCount = 0
//   categories.forEach(category => {
//     if (current[category] && goal[category]) {
//       summaryPercent += Math.min(
//         100,
//         (current[category] * 100) / goal[category],
//       )
//       categoriesCount += 1
//     }
//   })
//   return Math.min(
//     100,
//     Math.round(categoriesCount ? summaryPercent / categoriesCount : 0),
//   )
// }

export default function Goal(props) {
  const { group, user } = props

  useEffect(() => {
    const HEADER_HEIGHT = 600
    const parentElement = document.querySelector('#milestone-container')
    const activeMilestoneElement = document.querySelector('#active-milestone')
    if (parentElement && activeMilestoneElement) {
      parentElement.scrollTo({
        top: activeMilestoneElement.getBoundingClientRect().top - HEADER_HEIGHT,
      })
    }
  }, [])
  if (!group || !user) return null

  const loading = false
  const goal = group.goal
  const currentProgress = _.get(
    group,
    'userImpacts.impactsInUnits.footprint',
    {},
  )

  if (!goal) return <h1>No Goal</h1>
  const milestones = group.milestones || []
  const logo = _.get(group, 'goal.logo.src')
  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <StatisticsMain>
          <StatisticsContainer>
            <StatisticsScrollTitle>
              <FormattedMessage id="app.organization.milestones" />
            </StatisticsScrollTitle>
            <StatisticsScroll id={'milestone-container'}>
              {renderMilestones({ milestones, currentProgress })}
            </StatisticsScroll>
          </StatisticsContainer>
          <StatisticsContainer>
            <StatisticsScrollTitle>
              <FormattedMessage
                id="brandGoals"
                values={{
                  brand: group?.name,
                }}
              />
            </StatisticsScrollTitle>
            <StatisticsScroll>
              <GoalHeaderWrapper>
                <CircularProgressbarContainer>
                  <GoalPicture alt={'goalPicture'} src={logo} />
                </CircularProgressbarContainer>
                <GoalTitleContainer>
                  <GoalTitle>{goal.name}</GoalTitle>
                  {!!goal.description && (
                    <GoalDescription>{goal.description}</GoalDescription>
                  )}
                </GoalTitleContainer>
              </GoalHeaderWrapper>
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
            </StatisticsScroll>
          </StatisticsContainer>
        </StatisticsMain>
      )}
    </Fragment>
  )
}

Goal.propTypes = {
  group: Object,
  user: Object,
}
