import React from 'react'
import { FormattedMessage } from 'react-intl'

import { Container, Name } from './styled'
import Feed from '../../../components/Feed'

export default function TeamActivity(props) {
  const { user, history } = props
  const team = user.myTeam
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
