import React from 'react'
import { FormattedMessage } from 'react-intl'

import { Container, Name, Text, HowCalculated } from './styled'
import Achievements from '../Achievements'

export default function Campaigns(props) {
  const { user } = props
  const achievements = user?.achievements
  const hasAchievements = achievements?.length > 0
  return (
    <Container whiteBG>
      <Name>
        <FormattedMessage
          id={`${
            hasAchievements
              ? 'completedCampaigns'
              : 'app.actionsPage.tabs.campaigns'
          }`}
        />
      </Name>
      <Text>
        <FormattedMessage
          id={`${hasAchievements ? 'havingImpact' : 'actionsAndUp'}`}
        />
      </Text>
      {hasAchievements && (
        <Achievements intl={props.intl} achievements={achievements} />
      )}
      <HowCalculated to={'/challenges'}>
        <FormattedMessage id="seeAllCampaigns" />
      </HowCalculated>
    </Container>
  )
}

Campaigns.propTypes = {
  user: Object,
  intl: Object,
}
