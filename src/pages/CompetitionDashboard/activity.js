/* eslint-disable react/prop-types */

import React from 'react'

import Feed from 'components/Feed'

import { FeedWrapper } from './styled'

export default function renderActivity(props) {
  const { competition } = props

  return (
    <FeedWrapper>
      <Feed
        readFrom={{
          feedGroup: 'timeline',
          userId: `competition-${competition._id}`,
        }}
        writeTo={{
          feedGroup: 'timeline',
          userId: `competition-${competition._id}`,
        }}
        participants={props.participants}
        history={props.history}
      />
    </FeedWrapper>
  )
}
