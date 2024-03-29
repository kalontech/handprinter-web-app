import React, { useEffect } from 'react'

import ChallengesListHeader from 'components/ChallengesListHeader'

import Spinner from 'components/Spinner'
import Row from 'antd/lib/row'

import CompetitionCard from 'components/CompetitionCard'

import { DefaultButton } from 'components/Styled'

import { FormattedMessage, injectIntl } from 'react-intl'

import { compose } from 'redux'

import { Block, Column, Container } from './styled'
import { acceptInvitation } from '../../api/competitions'

import useCampaignsList from './useCampaignsList'
import useCompetitionsList from './useCompetitionsList'
import { challengeStatuses } from '../../components/CompetitionCard'
import { EVENT_TYPES, logEvent } from '../../amplitude'

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
  challenges = challenges.filter(
    c =>
      c.status === challengeStatuses.available ||
      c.status === challengeStatuses.in_progress ||
      new Date(c.dateTo) > new Date().getTime() - 30 * 24 * 60 * 60 * 1000,
  )
  return challenges.sort((a, b) => {
    if (a.status === challengeStatuses.available) return -1
    if (b.status === challengeStatuses.available) return 1
    if (a.status === challengeStatuses.in_progress) return -1
    if (b.status === challengeStatuses.in_progress) return 1
    return 0
  })
}

function ChallengesList(props) {
  const [campaigns, loadingCampaigns] = useCampaignsList(props)
  const [competitions, loadingCompetitions] = useCompetitionsList(props)
  const challenges = getChallengies(campaigns, competitions)

  useEffect(() => {
    logEvent(EVENT_TYPES.CHALLENGES_OPENED)
  }, [])

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
              const name =
                item?.translatedName?.[props.intl.locale] || item.name
              return (
                <Column key={item._id} xl={8} lg={12} md={12} xs={24}>
                  <CompetitionCard
                    onClick={() =>
                      logEvent(EVENT_TYPES.CHALLENGES_REVIEW_CAMPAIGN)
                    }
                    to={to}
                    name={name}
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

ChallengesList.propTypes = {
  intl: Object,
}

export default compose(injectIntl)(ChallengesList)
