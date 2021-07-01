import React from 'react'

import { Container, Name } from './styled'
import Feed from '../../../components/Feed'

export default function TeamActivity(props) {
  const { user, history } = props
  const organization =
    (user.organization && user.organization.name) ||
    user.belongsToOrganization ||
    user.belongsToBrand
  if (!organization) return null
  return (
    <Container>
      <Name>Organization Activity</Name>
      <Feed
        readFrom={{
          feedGroup: 'timeline',
          userId: `brand-${organization.toLowerCase()}`,
        }}
        writeTo={{
          feedGroup: 'timeline',
          userId: `brand-${organization.toLowerCase()}`,
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
