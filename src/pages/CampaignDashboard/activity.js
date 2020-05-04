/* eslint-disable react/prop-types */

import React from 'react'

import Feed from 'components/Feed'

import { FeedWrapper } from './styled'

export default function renderActivity(props) {
  const { campaign } = props

  return (
    <FeedWrapper>
      <Feed
        readFrom={{
          feedGroup: 'timeline',
          userId: `campaign-${campaign._id}`,
        }}
        writeTo={{
          feedGroup: 'timeline',
          userId: `campaign-${campaign._id}`,
        }}
      />
    </FeedWrapper>
  )
}
