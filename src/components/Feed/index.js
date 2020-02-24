/* eslint-disable react/display-name */

import React from 'react'
import { connect } from 'react-redux'
import {
  Activity,
  StreamApp,
  StatusUpdateForm,
  FlatFeed,
} from 'react-activity-feed'
import { compose } from 'redux'

import { ActivityFooter, ActivityHeader } from 'components/GetStreamComponents'

const Feed = ({ readFrom = {}, user = {}, writeTo = {} }) => {
  const {
    REACT_APP_GETSTREAM_API_KEY,
    REACT_APP_GETSTREAM_APP_ID,
  } = process.env

  return (
    <StreamApp
      apiKey={REACT_APP_GETSTREAM_API_KEY}
      appId={REACT_APP_GETSTREAM_APP_ID}
      token={user.feedToken}
    >
      <StatusUpdateForm
        feedGroup={writeTo.feedGroup || 'user'}
        modifyActivityData={data => ({
          ...data,
          to: [...(writeTo.cc || []), 'timeline:world'],
        })}
        userId={writeTo.userId}
      />
      <FlatFeed
        Activity={props => {
          return (
            <Activity
              {...props}
              Footer={() => {
                return <ActivityFooter {...props} />
              }}
              Header={() => {
                return <ActivityHeader {...props} />
              }}
            />
          )
        }}
        feedGroup={readFrom.feedGroup || 'user'}
        notify
        userId={readFrom.userId}
      />
    </StreamApp>
  )
}

const mapStateToProps = state => ({
  user: state.user.data,
})

export default compose(connect(mapStateToProps))(Feed)
