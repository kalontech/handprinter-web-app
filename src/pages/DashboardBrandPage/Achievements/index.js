import React from 'react'
import { Col, Row } from 'antd'

import { Icon } from 'antd'
import { Link } from 'react-router-dom'

import { AchievementImageWrapper, AchievementImage, Container } from './styled'

export default function Achievements(props) {
  const { campaigns, achievements, intl } = props

  return (
    <Container>
      <Row style={{ flexGrow: '1' }}>
        {campaigns.map(campaign => (
          <Link
            key={campaign?._id}
            to={`/challenges/campaigns/dashboard/${campaign._id}`}
          >
            <Achievement
              intl={intl}
              completed={
                achievements.filter(a => a.campaign._id === campaign?._id)
                  .length > 0
              }
              campaign={campaign}
            />
          </Link>
        ))}
      </Row>
    </Container>
  )
}

function Achievement(props) {
  const { campaign, completed } = props

  return (
    <Col lg={8} md={12} xs={12}>
      <AchievementImageWrapper>
        <div style={{ position: 'relative' }}>
          <AchievementImage src={campaign.logo.src} />
          <div
            style={{
              position: 'absolute',
              top: 0,
              zIndex: 3,
              width: '100%',
              height: '100%',
            }}
          >
            {completed && (
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  display: 'flex',
                  backgroundColor: 'grey',
                  opacity: 0.8,
                }}
              >
                <Icon
                  type="check-circle"
                  style={{ fontSize: 30, color: 'white' }}
                />
              </div>
            )}
            {!completed && campaign.status !== 'available' && (
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  alignItems: 'center',
                  justifyContent: 'center',
                  display: 'flex',
                  backgroundColor: 'grey',
                  opacity: 0.8,
                }}
              />
            )}
          </div>
        </div>
      </AchievementImageWrapper>
    </Col>
  )
}

Achievements.propTypes = {
  achievements: Array,
  intl: Object,
  campaigns: Array,
}

Achievement.propTypes = {
  achievement: Object,
  campaign: Object,
  intl: Object,
  completed: Boolean,
}
