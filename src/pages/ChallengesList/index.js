import React from 'react'

import ChallengesListHeader from 'components/ChallengesListHeader'

import Spinner from 'components/Spinner'
import Row from 'antd/lib/row'

import CampaignCard from 'components/CampaignCard'

import { DefaultButton } from 'components/Styled'

import { FormattedMessage } from 'react-intl'

import { Block, Column, Container } from './styled'
import { acceptInvitation } from '../../api/competitions'

import useCampaignsList from './useCampaignsList'
import useCompetitionsList from './useCompetitionsList'

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
  return challenges
}

export default function ChallengesList(props) {
  const [campaigns, loading] = useCampaignsList(props)
  const [competitions, compLoading] = useCompetitionsList(props)
  const challenges = getChallengies(campaigns, competitions)

  return (
    <Block>
      <ChallengesListHeader />
      <Container>
        {loading || compLoading ? (
          <Spinner />
        ) : (
          <Row gutter={{ md: 20 }} style={{ flexGrow: '1' }}>
            {challenges.map(item => (
              <Column key={item._id} xl={8} lg={12} md={12} xs={24}>
                {item.type === CHALLENGIES.CAMPAIGNS ? (
                  <CampaignCard
                    to={`/challenges/campaigns/dashboard/${item._id}`}
                    name={item.name}
                    picture={item.logo.src}
                  />
                ) : (
                  <CampaignCard
                    to={`/challenges/competitions/dashboard/${item._id}`}
                    name={item.name}
                    picture={item.logo.src}
                    button={() =>
                      item.pendingInvitation ? (
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
                )}
              </Column>
            ))}
          </Row>
        )}
      </Container>
    </Block>
  )
}
