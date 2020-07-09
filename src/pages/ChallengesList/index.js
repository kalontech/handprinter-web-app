import React from 'react'

import ChallengesListHeader from 'components/ChallengesListHeader'

import Spinner from 'components/Spinner'
import Row from 'antd/lib/row'

import CompetitionCard from 'components/CompetitionCard'

import { DefaultButton } from 'components/Styled'

import { FormattedMessage } from 'react-intl'

import { Block, Column, Container } from './styled'
import { acceptInvitation } from '../../api/competitions'

import useCampaignsList from './useCampaignsList'
import useCompetitionsList from './useCompetitionsList'
import { challengeStatuses } from '../../components/CompetitionCard'

export const CHALLENGIES = {
  CAMPAIGNS: 'campaigns',
  COMPETITIONS: 'competitions',
}

function getChallengies(campaigns, competitions) {
  let challenges = []
  campaigns.forEach(campaign => {
    challenges.push({
      ...campaign,
      type: CHALLENGIES.CAMPAIGNS,
    })
  })
  competitions.forEach(competition => {
    challenges.push({
      ...competition,
      type: CHALLENGIES.COMPETITIONS,
    })
  })
  return challenges.sort((a, b) => {
    if (a.status === challengeStatuses.available) return -1
    if (b.status === challengeStatuses.available) return 1
    if (a.status === challengeStatuses.in_progress) return -1
    if (b.status === challengeStatuses.in_progress) return 1
    return 0
  })
}

export default function ChallengesList(props) {
  const [campaigns, loadingCampaigns] = useCampaignsList(props)
  const [competitions, loadingCompetitions] = useCompetitionsList(props)
  const challenges = getChallengies(campaigns, competitions)

  return (
    <Block>
      <ChallengesListHeader />
      <Container>
        {loadingCampaigns && loadingCompetitions ? (
          <Spinner />
        ) : (
          <Row gutter={{ md: 20 }} style={{ flexGrow: '1' }}>
            {challenges.map(item => {
              const isCampaign = item.type === CHALLENGIES.CAMPAIGNS
              const to = isCampaign
                ? `/challenges/campaigns/dashboard/${item._id}`
                : `/challenges/competitions/dashboard/${item._id}`
              return (
                <Column key={item._id} xl={8} lg={12} md={12} xs={24}>
                  <CompetitionCard
                    to={to}
                    name={item.name}
                    picture={item.logo.src}
                    isCampaign={isCampaign}
                    dateTo={item.dateTo}
                    status={item.status}
                    button={() =>
                      isCampaign ? null : item.pendingInvitation ? (
                        <DefaultButton
                          onClick={() => {
                            acceptInvitation(item._id)
                          }}
                        >
                          <FormattedMessage id="app.competitions.invite.group.accept" />
                        </DefaultButton>
                      ) : null
                    }
                  />
                </Column>
              )
            })}
          </Row>
        )}
      </Container>
    </Block>
  )
}
