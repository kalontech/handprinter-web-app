import React, { useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'

import { Container, Name } from './styled'
import { fetchGroupsList } from '../../../api/groups'
import { GROUPS_SUBSETS } from '../../../utils/constants'
import CustomSkeleton from '../Skeleton'
import Feed from '../../../components/Feed'

export default function TeamActivity(props) {
  const { user, history } = props
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
  return (
    <Container>
      <Name>
        <FormattedMessage id="teamActivity" />
      </Name>
      <Feed
        readFrom={{
          feedGroup: 'timeline',
          userId: `group-${team._id}`,
        }}
        writeTo={{
          feedGroup: 'timeline',
          userId: `group-${team._id}`,
        }}
        history={history}
      />
    </Container>
  )
}

TeamActivity.propTypes = {
  user: Object,
  history: Object,
}
