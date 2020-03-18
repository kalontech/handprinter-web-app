/* eslint-disable react/prop-types */

import React from 'react'

import Feed from 'components/Feed'

export default function renderActivity(props) {
  const { competition } = props

  return (
    <div style={{ paddingLeft: 130, paddingRight: 130 }}>
      <Feed
        readFrom={{
          feedGroup: 'timeline',
          userId: `competition-${competition._id}`,
        }}
        writeTo={{
          feedGroup: 'timeline',
          userId: `competition-${competition._id}`,
        }}
      />
    </div>
  )
}
