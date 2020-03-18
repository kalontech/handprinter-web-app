/* eslint-disable react/prop-types */

import React from 'react'

import Feed from 'components/Feed'

export default function renderActivity(props) {
  const { campaign } = props

  return (
    <div style={{ paddingLeft: 130, paddingRight: 130 }}>
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
    </div>
  )
}
