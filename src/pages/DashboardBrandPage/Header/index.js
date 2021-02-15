import React from 'react'

import { getUserInitialAvatar } from 'api'

import { Container, Avatar, Banner, AvatarOrg } from './styled'

export default function Header(props) {
  const { user, organization } = props
  return (
    <Container>
      <Avatar src={user.photo || getUserInitialAvatar(user.fullName)} />
      {organization && (
        <Banner image={organization.banner.src}>
          <AvatarOrg src={organization.logo.src} />
        </Banner>
      )}
    </Container>
  )
}

Header.propTypes = {
  user: Object,
  organization: Object,
}
