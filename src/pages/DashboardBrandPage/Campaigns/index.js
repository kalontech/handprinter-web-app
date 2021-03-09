import React, { useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'

import { Container, Name, Text } from './styled'
import Achievements from '../Achievements'
import { fetchCampaignsList } from '../../../api/campaigns'

export default function Campaigns(props) {
  const { user } = props
  const achievements = user?.achievements
  const hasAchievements = achievements?.length > 0
  const [campaigns, setCampaigns] = useState()
  useEffect(() => {
    async function fetch() {
      try {
        const {
          campaigns: { docs: campaigns },
        } = await fetchCampaignsList({
          userId: user._id,
        })
        console.log(campaigns)
        const filteredCampaigns = campaigns.filter(
          c => new Date(c.dateFrom) > new Date(new Date().getFullYear(), 0, 1),
        )
        setCampaigns(filteredCampaigns)
      } catch (error) {
        console.error(error)
      }
    }

    fetch()
  }, [user])

  console.log(achievements)

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
  intl: Object,
}
