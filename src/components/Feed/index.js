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
import * as apiActions from 'api/actions'
import { ActivityFooter, ActivityHeader } from 'components/GetStreamComponents'
import Mention from 'components/GetStreamComponents/Mention.svg'
import AttachAction from 'components/GetStreamComponents/AttachAction.svg'
import env from 'config/env'
import CloseIcon from 'assets/icons/CloseIcon'

import useDefaultFeeds from './useDefaultFeeds'
import { EVENT_TYPES, logEvent } from '../../amplitude'

function logFeedPostEvents(data) {
  const feedChannel = _.get(data, 'actor.id', '')
  if (feedChannel.includes('group')) {
    logEvent(EVENT_TYPES.ACTIVITY_ADDED_POST_TO_GROUP)
  } else if (feedChannel.includes('user')) {
    logEvent(EVENT_TYPES.ACTIVITY_ADDED_POST_TO_DASHBOARD)
  } else if (feedChannel.includes('organization')) {
    logEvent(EVENT_TYPES.ACTIVITY_ADDED_POST_TO_ORGANIZATION)
  } else if (feedChannel.includes('campaign')) {
    logEvent(EVENT_TYPES.ACTIVITY_ADDED_POST_TO_CAMPAIGN)
  } else if (feedChannel.includes('competition')) {
    logEvent(EVENT_TYPES.ACTIVITY_ADDED_POST_TO_COMPETITION)
  }
}

const Feed = ({
  readFrom = {},
  user = {},
  writeTo = {},
  hideFlatFeed = false,
  hideUpdateForm = false,
  onSuccess,
  verb,
  context,
  participants,
  history,
}) => {
  const [isStatusUpdateFormExpanded, setIsStatusUpdateFormExpanded] = useState(
    false,
  )
  const [mentions, setMentions] = useState([])
  const [attachActionFormExpanded, setAttachActionFormExpanded] = useState(
    false,
  )
  const [actions, setActions] = useState([])
  const defaultFeeds = useDefaultFeeds(user)

  const { REACT_APP_GETSTREAM_API_KEY, REACT_APP_GETSTREAM_APP_ID } = env

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

  const promiseActionOptions = inputValue => {
    return new Promise(resolve => {
      if (inputValue.length >= 3) {
        apiActions.search(inputValue).then(({ actions }) => {
          resolve(
            actions.map(action => {
              return {
                label: action.name,
                photo: action.picture,
                value: action._id,
              }
            }),
          )
        })
      } else {
        resolve([])
      }
    })
  }

  let modifiedDataProps = {}
  if (verb) modifiedDataProps.verb = verb
  if (context) modifiedDataProps.context = context

  return (
    <StreamApp
      apiKey={REACT_APP_GETSTREAM_API_KEY}
      appId={REACT_APP_GETSTREAM_APP_ID}
      token={user.feedToken}
    >
      {!hideUpdateForm && (
        <div
          className={
            isStatusUpdateFormExpanded || attachActionFormExpanded
              ? 'status-update-form--expanded'
              : ''
          }
        >
          <StatusUpdateForm
            onSuccess={() => {
              setIsStatusUpdateFormExpanded(false)
              setAttachActionFormExpanded(false)
              onSuccess && onSuccess()
            }}
            feedGroup={writeTo.feedGroup || 'user'}
            modifyActivityData={data => {
              logFeedPostEvents(data)
              return {
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
                attachedActions: attachActionFormExpanded
                  ? actions.map(action => {
                      return {
                        foreignId: action.value,
                        name: action.label,
                        profileImage: action.photo,
                      }
                    })
                  : [],
                to: [...(writeTo.cc || []), ...defaultFeeds],
                ...modifiedDataProps,
              }
            }}
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
                    marginTop: hideFlatFeed ? '15px' : '-12px',
                    width: '26px',
                  }}
                />
                {isStatusUpdateFormExpanded && (
                  <div
                    style={{
                      alignItems: 'center',
                      backgroundColor: 'rgb(250, 250, 250)',
                      bottom: '85px',
                      display: 'flex',
                      left: '0px',
                      padding: '16px',
                      position: 'absolute',
                      width: '100%',
                      zIndex: 1,
                    }}
                  >
                    <div style={{ width: '100%' }}>
                      <AsyncSelect
                        cacheOptions
                        defaultOptions
                        placeholder={'Select Person...'}
                        isMulti
                        loadOptions={promiseOptions}
                        onChange={value => {
                          setMentions(value)
                        }}
                      />
                      <CloseIcon
                        style={{ alignSelf: 'center' }}
                        onClick={() => setIsStatusUpdateFormExpanded(false)}
                      />
                    </div>
                  </div>
                )}
                <img
                  onClick={() => {
                    setAttachActionFormExpanded(value => !value)
                  }}
                  src={AttachAction}
                  style={{
                    cursor: 'pointer',
                    height: '26px',
                    marginLeft: '32px',
                    marginTop: hideFlatFeed ? '15px' : '-12px',
                    width: '26px',
                  }}
                />
                {attachActionFormExpanded && (
                  <div
                    style={{
                      alignItems: 'center',
                      backgroundColor: 'rgb(250, 250, 250)',
                      bottom: '85px',
                      display: 'flex',
                      left: '0px',
                      padding: '16px',
                      position: 'absolute',
                      width: '100%',
                    }}
                  >
                    <div style={{ width: '100%' }}>
                      <AsyncSelect
                        placeholder={'Select Action...'}
                        cacheOptions
                        defaultOptions
                        isMulti
                        loadOptions={promiseActionOptions}
                        onChange={value => {
                          setActions(value)
                        }}
                      />
                      <CloseIcon
                        style={{ alignSelf: 'center' }}
                        onClick={() => setAttachActionFormExpanded(false)}
                      />
                    </div>
                  </div>
                )}
              </>
            }
          />
        </div>
      )}
      {!hideFlatFeed && (
        <FlatFeed
          Activity={props => {
            const userName = _.get(
              props,
              'activity.actor.data.name',
              'Unknown user',
            )
            if (userName === 'Unknown user') {
              return null
            }
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
                      participants={participants}
                      history={history}
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
      )}
    </StreamApp>
  )
}

const mapStateToProps = state => ({
  user: state.user.data,
})

export default compose(connect(mapStateToProps))(Feed)
