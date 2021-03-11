import React from 'react'
import { FormattedMessage } from 'react-intl'

import { Container, Name, Text } from './styled'
import Achievements from '../Achievements'
import CustomSkeleton from '../Skeleton'

export default function Campaigns(props) {
  const { user, campaigns } = props
  const achievements = user?.achievements
  const hasAchievements = achievements?.length > 0

  if (!campaigns) {
    return <CustomSkeleton rows={6} />
  }

  return (
    <Container whiteBG>
      <Name>
        <FormattedMessage id={'app.actionsPage.tabs.campaigns'} />
      </Name>
      <Text>
        <FormattedMessage
          id={`${hasAchievements ? 'havingImpact' : 'actionsAndUp'}`}
        />
      </Text>
      {campaigns && (
        <Achievements
          intl={props.intl}
          campaigns={campaigns}
          achievements={achievements}
        />
      )}
    </Container>
  )
}

Campaigns.propTypes = {
  user: Object,
  campaigns: Object,
  intl: Object,
}
