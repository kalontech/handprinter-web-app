import React, { useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import SuggestedIcon from 'assets/icons/SuggestedIcon'
import gobletImg from 'assets/icons/goblet.svg'

import {
  Container,
  Name,
  Heading,
  Info,
  InfoRow,
  InfoText,
  InfoCount,
  TeamIcon,
  IconStyled,
} from './styled'

export default function MyTeam(props) {
  const { user, teams } = props
  const team = user.myTeam
  const [ranking, setRanking] = useState(0)

  useEffect(() => {
    if (teams) {
      setRanking(teams.findIndex(t => t._id === team._id) + 1)
    }
  }, [teams, team])
  if (!team) return null
  const { picture, name, info, netPositiveDays } = team
  return (
    <Container whiteBG>
      <Name>
        <FormattedMessage id="myTeam" />
      </Name>
      {picture && <TeamIcon src={picture} />}
      <Heading>
        {ranking > 0 && `#${ranking} `}
        {name}
      </Heading>
      <Info>
        <InfoRow>
          <SuggestedIcon />
          <InfoText>
            <FormattedMessage id="app.actions.timeValues.other.MEMBERS" />
          </InfoText>
          <InfoCount>{info.membersCount}</InfoCount>
        </InfoRow>
        <InfoRow>
          <IconStyled src={gobletImg} />
          <InfoText>
            <FormattedMessage id="netPostiveDays" />
          </InfoText>
          <InfoCount>{Math.round(netPositiveDays.climate)}</InfoCount>
        </InfoRow>
      </Info>
    </Container>
  )
}

MyTeam.propTypes = {
  user: Object,
  teams: Object,
}
