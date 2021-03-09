import React from 'react'
import { FormattedMessage } from 'react-intl'

import { Container, Name, Text } from './styled'
import {
  DashboardHeaderUserInfoValue,
  DashboardHeaderUserSince,
  HeaderUserInfoRowCol,
} from '../../DashboardPage/header'

export default function UserName(props) {
  const { user, isReturnUser, personalStats } = props
  if (!user) return null
  return (
    <Container whiteBG={true}>
      <Name>{user.fullName}</Name>
      {isReturnUser ? (
        <div style={{ display: 'flex' }} />
      ) : (
        <Text>
          <FormattedMessage id="netPositiveStatusPlaceholder" />
        </Text>
      )}
    </Container>
  )
}

UserName.propTypes = {
  user: Object,
  isReturnUser: Boolean,
  actionsTakenCount: Number,
  personalStats: Object,
}
