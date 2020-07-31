/* eslint-disable react/prop-types */

import React from 'react'
import _ from 'lodash'

import {
  MilestonePicture,
  MilestoneDescription,
  MilestoneTitle,
  MilestoneLabels,
  MilestoneWrapper,
  MilestoneNoPicture,
  MilestonePictureWrapper,
  Line,
} from './styled'
import { getOrdinalNumber } from '../../utils/helpers'
import { IMPACT_CATEGORIES } from '../../utils/constants'
import ActionCardLabel from '../../components/ActionCardLabel'

export default function renderMilestones(props) {
  const { milestones, currentProgress } = props
  if (!milestones) return null

  const completedMilestones = milestones.filter(milestone => {
    let match = Object.keys(currentProgress).length > 0
    Object.keys(currentProgress).forEach(category => {
      if (currentProgress[category] < milestone[category]) {
        match = false
      }
    })
    return match
  })

  const activeMilestoneIndex = Math.min(
    completedMilestones.length,
    milestones.length - 1,
  )

  return (
    <div>
      {milestones.map((i, index) => {
        const milestoneBlocked = index > activeMilestoneIndex
        const milestoneLineGray = index > activeMilestoneIndex - 1
        const active = activeMilestoneIndex === index
        const ordinalNumber = getOrdinalNumber(index + 1)
        return (
          <Milestone
            key={i.name}
            milestone={i}
            ordinalNumber={ordinalNumber}
            disabled={milestoneBlocked}
            isLast={milestones.length - 1 === index}
            milestoneLineGray={milestoneLineGray}
            active={active}
            currentProgress={currentProgress}
          />
        )
      })}
    </div>
  )
}

export function Milestone(props) {
  const {
    milestone,
    disabled,
    ordinalNumber,
    isLast,
    milestoneLineGray,
    active,
    currentProgress,
  } = props
  const logo = _.get(milestone, 'logo.src')
  return (
    <MilestoneWrapper id={active ? 'active-milestone' : undefined}>
      <MilestonePictureWrapper>
        {logo ? (
          <MilestonePicture disabled={disabled} alt={'milestone'} src={logo} />
        ) : (
          <MilestoneNoPicture disabled={disabled}>
            {ordinalNumber}
          </MilestoneNoPicture>
        )}
        {!isLast && <Line disabled={milestoneLineGray} />}
      </MilestonePictureWrapper>
      <MilestoneLabels>
        <MilestoneTitle disabled={disabled}>{milestone.name}</MilestoneTitle>
        <MilestoneDescription disabled={disabled}>
          {milestone.description}
        </MilestoneDescription>
        {active && (
          <div style={{ display: 'flex' }}>
            {Object.keys(IMPACT_CATEGORIES).map(key => {
              const category = IMPACT_CATEGORIES[key]
              return (
                <MilestoneImpactProgress
                  key={category}
                  impact={milestone[category]}
                  category={category}
                  currentProgress={currentProgress[category]}
                />
              )
            })}
          </div>
        )}
      </MilestoneLabels>
    </MilestoneWrapper>
  )
}

export function MilestoneImpactProgress(props) {
  const { impact, category, currentProgress = 0 } = props
  if (!impact || !category) return null

  const percent = Math.min((currentProgress * 100) / impact, 100)
  return (
    <div>
      <ActionCardLabel
        largeLabel
        hideTooltip
        labelWidth={75}
        category={category}
        unit={category.toUpperCase()}
        value={`${Math.round(percent)}%`}
        variant={'positive'}
      />
    </div>
  )
}
