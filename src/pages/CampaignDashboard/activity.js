/* eslint-disable react/prop-types */

import React from 'react'

import Feed from 'components/Feed'

export default function renderActivity(props) {
  const { campaign } = props

  return (
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
  )
}
