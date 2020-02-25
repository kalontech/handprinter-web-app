/* eslint-disable react/display-name */

import _ from 'lodash'
import React, { useState } from 'react'
import {
  Activity,
  StreamApp,
  StatusUpdateForm,
  FlatFeed,
} from 'react-activity-feed'
import { connect } from 'react-redux'
import AsyncSelect from 'react-select/async'
import { compose } from 'redux'

import * as apiUser from 'api/user'
import { ActivityFooter, ActivityHeader } from 'components/GetStreamComponents'
import Mention from 'components/GetStreamComponents/Mention.svg'

const Feed = ({ readFrom = {}, user = {}, writeTo = {} }) => {
  const [isStatusUpdateFormExpanded, setIsStatusUpdateFormExpanded] = useState(
    false,
  )
  const [mentions, setMentions] = useState([])

  const {
    REACT_APP_GETSTREAM_API_KEY,
    REACT_APP_GETSTREAM_APP_ID,
  } = process.env

  const promiseOptions = inputValue => {
    return new Promise(resolve => {
      if (inputValue.length >= 3) {
        apiUser.search(inputValue).then(({ users }) => {
          resolve(
            users.map(user => {
              return {
                label: user.fullName,
                photo: user.photo,
                value: user._id,
              }
            }),
          )
        })
      } else {
        resolve([])
      }
    })
  }

  return (
    <StreamApp
      apiKey={REACT_APP_GETSTREAM_API_KEY}
      appId={REACT_APP_GETSTREAM_APP_ID}
      token={user.feedToken}
    >
      <div
        className={
          isStatusUpdateFormExpanded ? 'status-update-form--expanded' : ''
        }
      >
        <StatusUpdateForm
          feedGroup={writeTo.feedGroup || 'user'}
          modifyActivityData={data => ({
            ...data,
            mentions: isStatusUpdateFormExpanded
              ? mentions.map(mention => {
                  return {
                    foreignId: mention.value,
                    name: mention.label,
                    profileImage: mention.photo,
                  }
                })
              : [],
            to: [...(writeTo.cc || []), 'timeline:world'],
          })}
          userId={writeTo.userId}
          FooterItem={
            <>
              <img
                onClick={() => {
                  setIsStatusUpdateFormExpanded(value => !value)
                }}
                src={Mention}
                style={{
                  cursor: 'pointer',
                  height: '26px',
                  marginLeft: '32px',
                  marginTop: '-12px',
                  width: '26px',
                }}
              />
              {isStatusUpdateFormExpanded && (
                <div
                  style={{
                    alignItems: 'center',
                    backgroundColor: 'rgb(250, 250, 250)',
                    bottom: '73px',
                    display: 'flex',
                    left: '0px',
                    padding: '16px',
                    position: 'absolute',
                    width: '100%',
                  }}
                >
                  <div style={{ width: '100%' }}>
                    <AsyncSelect
                      cacheOptions
                      defaultOptions
                      isMulti
                      loadOptions={promiseOptions}
                      onChange={value => {
                        setMentions(value)
                      }}
                    />
                  </div>
                </div>
              )}
            </>
          }
        />
      </div>
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
