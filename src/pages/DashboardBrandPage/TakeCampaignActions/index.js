import React, { useContext, useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import moment from 'moment'
import { Col, Row } from 'antd'

import ActionCard from 'components/ActionCard'

import { ACTION_STATES } from 'utils/constants'
import Tooltip from 'components/Tooltip'

import { fetchCampaignsList, getCampaign } from '../../../api/campaigns'
import ActionCardLabelSet from '../../../components/ActionCardLabelSet'
import { UIContextSettings } from '../../../context/uiSettingsContext'

import {
  Container,
  Heading,
  Title,
  Text,
  ImageStyled,
  Dates,
  CampaignTitle,
  TextHeading,
  SeeAllActions,
} from './styled'
import { EVENT_TYPES, logEvent } from '../../../amplitude'
import CustomSkeleton from '../Skeleton'
import { ImpactButton } from '../../ActionsPage/styled'

export default function TakeCampaignActions({ campaigns, takenActions, intl }) {
  const [campaign, setCampaign] = useState()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetch() {
      try {
        const latestCampaing = await getCampaign(campaigns[0]._id)
        setCampaign(latestCampaing?.campaign)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    fetch()
  }, [campaigns])
  if (loading || !campaigns || !campaign) return <CustomSkeleton rows={20} />
  return (
    <Container>
      <Title>
        <FormattedMessage id={'app.actions.takeAction'} />
      </Title>
      <Heading>
        <FormattedMessage id={'hsLatestCampaign'} />
      </Heading>
      <ImageStyled src={campaign.banner.src} />
      <Text>{campaign.description}</Text>
      <Dates>
        <FormattedMessage
          id="campaignRuns"
          values={{
            dates: `${moment(campaign.dateFrom).format('MMM D')} - ${moment(
              campaign.dateFrom,
            ).format('MMMM D, YYYY')}`,
          }}
        />
      </Dates>
      <CampaignTitle>
        <FormattedMessage id="campaignActions" />
      </CampaignTitle>
      <TextHeading>
        <FormattedMessage id="takeOneAction" />
      </TextHeading>
      <Text>
        <FormattedMessage id="weCanDoTwoOrAll" />
      </Text>
      {campaign.actions.length > 0 && (
        <div style={{ margin: '0 40px', marginBottom: 16 }}>
          <Row gutter={16} style={{ flexGrow: '1' }}>
            {campaign.actions.map(action => (
              <Col key={action.slug} lg={8} md={24} xs={24}>
                <ActionCard
                  takenAlready={
                    takenActions &&
                    takenActions.filter(tA => tA.action._id === action._id)
                      .length > 0
                  }
                  onClick={() =>
                    logEvent(EVENT_TYPES.CHALLENGES_PARTICIPATE_CAMPAIGN)
                  }
                  compact={true}
                  to={`/actions/discover/${action.slug}`}
                  picture={action.picture}
                  name={action.name}
                  suggestedBy={action.suggestedBy}
                  isHabit={action.isHabit}
                />
              </Col>
            ))}
          </Row>
        </div>
      )}
    </Container>
  )
}

TakeCampaignActions.propTypes = {
  takenActions: Object,
  intl: Object,
}
