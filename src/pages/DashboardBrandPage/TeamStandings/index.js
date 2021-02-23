import React from 'react'
import { FormattedMessage } from 'react-intl'
import SuggestedIcon from 'assets/icons/SuggestedIcon'
import gobletImg from 'assets/icons/goblet.svg'

import CustomSkeleton from '../Skeleton'
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

export default function TeamStandings(props) {
  const { teams } = props
  if (!teams) return <CustomSkeleton rows={6} />
  return (
    <Container whiteBG>
      <Name>
        <FormattedMessage id="teamStandings" />
      </Name>
      {teams &&
        teams.map((team, key) => (
          <div key={key}>
            {team.picture && key < 3 && <TeamIcon src={team.picture} />}
            <Heading>
              #{key + 1} {team.name}
            </Heading>
            {key < 3 && (
              <Info>
                <InfoRow>
                  <SuggestedIcon />
                  <InfoText>
                    <FormattedMessage id="app.actions.timeValues.other.MEMBERS" />
                  </InfoText>
                  <InfoCount>{team.info.membersCount}</InfoCount>
                </InfoRow>
                <InfoRow>
                  <IconStyled src={gobletImg} />
                  <InfoText>
                    <FormattedMessage id="netPostiveDays" />
                  </InfoText>
                  <InfoCount>
                    {Math.round(team.netPositiveDays.climate)}
                  </InfoCount>
                </InfoRow>
              </Info>
            )}
          </div>
        ))}
    </Container>
  )
}

TeamStandings.propTypes = {
  teams: Object,
}
