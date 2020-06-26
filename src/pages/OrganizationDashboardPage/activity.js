/* eslint-disable react/prop-types */

import React from 'react'

import Feed from 'components/Feed'

import { FeedWrapper } from './styled'

export default function renderActivity(props) {
  const { group, user, members } = props

  if (!group || !user) return null
  const isMember =
    group.members.includes(user._id) || group.admins.includes(user._id)
  return (
    <FeedWrapper>
      <Feed
        readFrom={{
          feedGroup: 'timeline',
          userId: `brand-${group.name.toLowerCase()}`,
        }}
        writeTo={{
          feedGroup: 'timeline',
          userId: `brand-${group.name.toLowerCase()}`,
        }}
        history={props.history}
        participants={members && members.docs}
        hideUpdateForm={!isMember}
      />
    </FeedWrapper>
  )
}
