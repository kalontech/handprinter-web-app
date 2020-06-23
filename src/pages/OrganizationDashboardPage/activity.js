/* eslint-disable react/prop-types */

import React from 'react'

import Feed from 'components/Feed'

import { FeedWrapper } from './styled'

export default function renderActivity(props) {
  const { group, user, members } = props

  if (!group || !user) return null
  return (
    <FeedWrapper>
      <Feed
        readFrom={{
          feedGroup: 'timeline',
          userId: `brand-${user.belongsToBrand}`,
        }}
        writeTo={{
          feedGroup: 'timeline',
          userId: `brand-${user.belongsToBrand}`,
        }}
        history={props.history}
        participants={members && members.docs}
      />
    </FeedWrapper>
  )
}
