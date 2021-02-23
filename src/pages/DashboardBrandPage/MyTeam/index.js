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
import { fetchGroupsList } from '../../../api/groups'
import { GROUPS_SUBSETS } from '../../../utils/constants'
import CustomSkeleton from '../Skeleton'

export default function MyTeam(props) {
  const { user, teams } = props
  const [team, setTeam] = useState()
  const [ranking, setRanking] = useState(0)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    async function fetch() {
      try {
        const userGroups = await fetchGroupsList({
          subset: GROUPS_SUBSETS.MY,
        })
        const userTeams =
          userGroups?.groups?.docs?.filter(
            group =>
              group.belongsToBrand &&
              group.belongsToBrand === user?.belongsToBrand,
          ) || []
        setTeam(userTeams[0])
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    fetch()
  }, [])
  useEffect(() => {
    if (teams && team) {
      setRanking(teams.findIndex(t => t._id === team._id) + 1)
    }
  }, [teams, team])
  if (loading) return <CustomSkeleton rows={6} />
  if (!team) return null
  const { picture, name, info, netPositiveDays } = team
  return (
    <Container whiteBG>
      <Name>
        <FormattedMessage id="myTeam" />
      </Name>
      {picture && <TeamIcon src={picture} />}
      <Heading>
        #{ranking} {name}
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
          <InfoCount>{netPositiveDays.climate}</InfoCount>
        </InfoRow>
      </Info>
    </Container>
  )
}

MyTeam.propTypes = {
  user: Object,
  teams: Object,
}
