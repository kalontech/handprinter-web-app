import React from 'react'

import { Container, Name } from './styled'
import Feed from '../../../components/Feed'

export default function TeamActivity(props) {
  const { user, history } = props
  if (!user.organization) return null
  return (
    <Container>
      <Name>Organization Activity</Name>
      <Feed
        readFrom={{
          feedGroup: 'timeline',
          userId: `brand-${user.organization.name.toLowerCase()}`,
        }}
        writeTo={{
          feedGroup: 'timeline',
          userId: `brand-${user.organization.name.toLowerCase()}`,
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
