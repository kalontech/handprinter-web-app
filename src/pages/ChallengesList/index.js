import React from 'react'

import ChallengesListHeader from 'components/ChallengesListHeader'

import { Block } from './styled'

import renderCampaigns from './campaigns'
import renderCompetitions from './competitions'

export const CHALLENGIES = {
  CAMPAIGNS: 'campaigns',
  COMPETITIONS: 'competitions',
}

function renderContent(props) {
  const { match } = props
  const subset = match.params.subset
  switch (subset) {
    case CHALLENGIES.CAMPAIGNS:
      return renderCampaigns(props)
    case CHALLENGIES.COMPETITIONS:
      return renderCompetitions(props)
    default:
      return null
  }
}

export default function ChallengesList(props) {
  return (
    <Block>
      <ChallengesListHeader />
      {renderContent(props)}
    </Block>
  )
}
