import React, { useState } from 'react'
import { Col, Popover, Row } from 'antd'

import { FormattedMessage } from 'react-intl'

import {
  AchievementImageWrapper,
  AchievementImage,
  PopoverText,
  PopoverTitle,
  PopoverWrapper,
  Container,
  AchievementModal,
  AchievementTitle,
  AchievementFooter,
  AchievementFooterButton,
  ModalContent,
} from './styled'
import { OtherAchievementsText } from '../../DashboardPage/header'

export default function Achievements(props) {
  const { achievements, intl } = props
  const [moreAchievesVisible, setMoreAchievesVisible] = useState(false)
  if (!achievements) return null

  return (
    <Container>
      <Row style={{ flexGrow: '1' }}>
        {achievements.slice(0, 5).map(achievement => (
          <Achievement
            key={achievement?._id}
            intl={intl}
            achievement={achievement}
          />
        ))}

        {achievements.length > 5 && (
          <Col lg={8} md={12} xs={12}>
            <AchievementImageWrapper
              onClick={() => setMoreAchievesVisible(true)}
              other
            >
              <OtherAchievementsText>
                +{achievements.length - 5}
              </OtherAchievementsText>
            </AchievementImageWrapper>
          </Col>
        )}
      </Row>

      <AchievementModal
        width={592}
        visible={moreAchievesVisible}
        closable
        onCancel={() => setMoreAchievesVisible(false)}
        centered
        destroyOnClose
        title={
          <AchievementTitle>
            <FormattedMessage id={'app.dashboardPage.achievements'} />
          </AchievementTitle>
        }
        footer={[
          <AchievementFooter key="submit">
            <AchievementFooterButton
              type="primary"
              onClick={() => {
                setMoreAchievesVisible(false)
              }}
            >
              OK
            </AchievementFooterButton>
          </AchievementFooter>,
        ]}
      >
        <ModalContent>
          <Row type="flex" justify="left">
            {achievements.map(achievement => (
              <Achievement
                key={achievement?._id}
                intl={intl}
                achievement={achievement}
              />
            ))}
          </Row>
        </ModalContent>
      </AchievementModal>
    </Container>
  )
}

function Achievement(props) {
  const { achievement, intl } = props
  if (!achievement) return null
  const { accomplishedActions, campaign } = achievement
  const accomplished = accomplishedActions?.length || 0
  const total = campaign?.actions?.length || 0
  const accomplishedLabel = intl.formatMessage(
    { id: 'app.campaignPage.progress.accomplished' },
    {
      accomplished: accomplished,
      total,
    },
  )

  return (
    <Col lg={8} md={12} xs={12}>
      <Popover
        overlayClassName={'achievements-popover'}
        content={
          <PopoverWrapper>
            <PopoverTitle>{campaign?.name}</PopoverTitle>
            <PopoverText>{accomplishedLabel}</PopoverText>
          </PopoverWrapper>
        }
      >
        <AchievementImageWrapper>
          <AchievementImage src={campaign.logo.src} />
        </AchievementImageWrapper>
      </Popover>
    </Col>
  )
}

Achievements.propTypes = {
  achievements: Array,
  intl: Object,
}

Achievement.propTypes = {
  achievement: Object,
  intl: Object,
}
