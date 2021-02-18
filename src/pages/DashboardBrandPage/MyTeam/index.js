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
  const { user } = props
  const [team, setTeam] = useState()
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
  if (loading) return <CustomSkeleton rows={6} />
  if (!team) return null
  const { picture, name, info } = team
  return (
    <Container whiteBG>
      <Name>
        <FormattedMessage id="myTeam" />
      </Name>
      <TeamIcon src={picture} />
      {/* TODO */}
      <Heading>#1</Heading>
      <Heading>{name}</Heading>
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
          {/* TODO */}
          <InfoCount>{85}</InfoCount>
        </InfoRow>
      </Info>
    </Container>
  )
}

MyTeam.propTypes = {
  user: Object,
}
