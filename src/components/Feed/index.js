/* eslint-disable react/display-name */

import _ from 'lodash'
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
              key={`root-${props.activity.id}`}
              Content={
                _.get(props, 'activity.object') !== '...' && props.Content
              }
              Footer={() => {
                return (
                  <ActivityFooter
                    key={`footer-${props.activity.id}`}
                    {...props}
                  />
                )
              }}
              Header={() => {
                return (
                  <ActivityHeader
                    key={`header-${props.activity.id}`}
                    {...props}
                  />
                )
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
