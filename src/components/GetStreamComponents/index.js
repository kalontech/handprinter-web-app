/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
/** @jsx jsx */

import _ from 'lodash'
import moment from 'moment-timezone'
import React, { useState, useContext, useEffect } from 'react'
import {
  CommentField,
  CommentList,
  ReactionToggleIcon,
  CommentItem,
  InfiniteScrollPaginator,
} from 'react-activity-feed'
import { Avatar, Box, Flex, jsx, Text } from 'theme-ui'
import styled from 'styled-components'
import ActionCardLabelSet from 'components/ActionCardLabelSet'
import colors from 'config/colors'
import media, { sizes } from 'utils/mediaQueryTemplate'
import { Popover, Icon, Divider } from 'antd'

import { FormattedMessage } from 'react-intl'

import { connect } from 'getstream'

import CommentDefault from './CommentDefault.svg'
import CommentFilled from './CommentFilled.svg'
import LikeDefault from './LikeDefault.svg'
import LikeFilled from './LikeFilled.svg'
import { UIContextSettings } from '../../context/uiSettingsContext'
import { EVENT_TYPES, logEvent } from '../../amplitude'

var flatten = require('flat')

const UserName = styled.span`
  font-family: Noto Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 20px;
  color: ${colors.dark};

  ${media.largeDesktop`
    display: flex;
    justify-content: flex-start;
  `}

  ${media.phone`
    width: 180px;
    flex-direction: row;
    flex-wrap: wrap;
  `}
`

const CreatedAtText = styled.span`
  font-family: Noto Sans;
  font-style: italic;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  color: ${colors.darkGray};
`

const DeletePostText = styled.span`
  font-family: Noto Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  color: ${colors.red};
  cursor: pointer;
`

export const ActivityFooter = props => {
  // props.onToggleChildReaction()
  const numberOfComments = _.get(props, 'activity.reaction_counts.comment', 0)
  const numberOfLikes = _.get(props, 'activity.reaction_counts.like', 0)
  const [isShowComments, setIsShowComments] = useState(numberOfComments > 0)

  return (
    <>
      {props.activity.mentions && props.activity.mentions.length > 0 && (
        <Box sx={{ p: 3 }}>
          <Text sx={{ fontStyle: 'italic', mb: 1 }}>Mentions:</Text>
          <Flex sx={{ alignItems: 'center' }}>
            {props.activity.mentions.map(mention => {
              return (
                <Flex
                  key={mention.foreignId}
                  sx={{
                    alignItems: 'center',
                    borderRadius: '5px',
                    bg: 'rgb(240, 240, 240)',
                    mr: 2,
                    p: 2,
                  }}
                >
                  <Avatar
                    src={mention.profileImage}
                    sx={{ height: '30px', mr: 2, width: '30px' }}
                  />
                  <Text>{mention.name}</Text>
                </Flex>
              )
            })}
          </Flex>
        </Box>
      )}
      {props.activity.attachedActions &&
        props.activity.attachedActions.length > 0 && (
          <Box sx={{ p: 3 }}>
            <Text sx={{ fontStyle: 'italic', mb: 1 }}>Actions:</Text>
            <Flex sx={{ alignItems: 'center' }}>
              {props.activity.attachedActions.map(attachedAction => {
                return (
                  <Flex
                    key={attachedAction.foreignId}
                    sx={{
                      alignItems: 'center',
                      borderRadius: '5px',
                      bg: 'rgb(240, 240, 240)',
                      mr: 2,
                      p: 2,
                    }}
                  >
                    <Avatar
                      src={attachedAction.profileImage}
                      sx={{ height: '30px', mr: 2, width: '30px' }}
                    />
                    <Text>{attachedAction.name}</Text>
                  </Flex>
                )
              })}
            </Flex>
          </Box>
        )}
      <Box
        sx={{
          p: 3,
        }}
      >
        <Flex>
          {numberOfLikes > 0 ? (
            <Popover
              disabled={numberOfLikes > 0}
              content={
                <Box>
                  {_.get(props, 'activity.latest_reactions.like', []).map(l => (
                    <p
                      key={l.user.id}
                      onClick={() =>
                        props.history.push(
                          `/account/${l.user.id.replace('user-', '')}`,
                        )
                      }
                      style={{ cursor: 'pointer' }}
                    >
                      {l.user.data.name}
                      <br />
                    </p>
                  ))}
                </Box>
              }
            >
              <Flex sx={{ flexDirection: 'row' }}>
                <LikeButton {...props} />
                <span style={{ alignSelf: 'center' }}>{numberOfLikes}</span>
              </Flex>
            </Popover>
          ) : (
            <LikeButton {...props} />
          )}

          <Box p={2} />
          <CommentButton
            {...props}
            filled={isShowComments}
            onPress={() => {
              logEvent(EVENT_TYPES.ACTIVITY_ADDED_COMMENT)
              setIsShowComments(value => !value)
            }}
          />
          {numberOfComments > 0 && (
            <span style={{ alignSelf: 'center' }}>{numberOfComments}</span>
          )}
        </Flex>
        <Box sx={{ display: isShowComments ? 'block' : 'none' }}>
          <CommentField
            activity={props.activity}
            onAddReaction={props.onAddReaction}
          />
          <CommentList
            activityId={props.activity.id}
            CommentItem={itemProps => (
              <React.Fragment>
                <CommentItem {...itemProps} />
                {/* <LikeButton reaction={itemProps.comment} {...props} /> */}
              </React.Fragment>
            )}
          />
        </Box>
      </Box>
      <Divider style={{ margin: '10px 0px 0px 0px' }} />
    </>
  )
}

export const ActivityHeader = props => {
  const [width, setWidth] = useState(window.innerWidth)
  const UIContextData = useContext(UIContextSettings)

  const activity = _.get(props, 'activity')
  const isDidAction = _.get(activity, 'verb') === 'do action'
  const isCommentedAction = _.get(activity, 'verb') === 'comment action'

  const actionImpacts = _.get(activity, 'context.action.impacts')
  const actionImpactsInUnits = _.get(activity, 'context.action.impactsInUnits')
  const actionName = _.get(activity, 'context.action.name', 'Unknown action')
  const actionSlug = _.get(activity, 'context.action.slug')
  const createdAt = moment.tz(activity.time, 'UTC').fromNow()
  const userName = _.get(activity, 'actor.data.name', 'Unknown user')
  const userId = _.get(activity, 'actor.id', 'user-').replace('user-', '')

  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange)
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange)
    }
  }, [])

  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth)
  }

  const isTablet = width < sizes.largeDesktop
  const isMobile = width < sizes.tablet

  const selectedUserId = (participants, actor) => {
    participants &&
      participants.filter(item => {
        if (item.user.fullName === actor) {
          return props.history.push(`/account/${item.user._id}`)
        }
      })
  }

  const navigateToAction = () => {
    if (props.history) {
      props.history.push(`/actions/discover/${actionSlug}`)
    }
  }

  const navigateToUser = () => {
    if (props.history) {
      props.history.push(`/account/${userId}`)
    }
  }

  const noImpacts =
    actionImpacts &&
    Object.values(flatten(actionImpacts, { safe: true })).filter(
      v => v !== 'MINS' && v !== 0,
    ).length === 0
  return (
    <Flex
      sx={{
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        p: 3,
      }}
    >
      {!isMobile && !isTablet && (
        <Flex
          sx={{
            alignItems: 'center',
          }}
        >
          <Avatar
            src={_.get(activity, 'actor.data.profileImage')}
            sx={{ mr: 2 }}
            onClick={() =>
              selectedUserId(props.participants, activity.actor.data.name)
            }
            style={{ cursor: 'pointer' }}
          />
          <Box>
            <Box style={{ maxWidth: !noImpacts ? 280 : 'unset' }}>
              <UserName onClick={navigateToUser} style={{ cursor: 'pointer' }}>
                <strong>{userName}</strong>
              </UserName>
              {isDidAction && (
                <UserName style={{ cursor: 'pointer' }}>
                  {' did action '}
                  <strong onClick={navigateToAction}>{actionName}</strong>
                </UserName>
              )}
              {isCommentedAction && (
                <UserName style={{ cursor: 'pointer' }}>
                  {' did action '}
                  <strong onClick={navigateToAction}>{actionName}</strong>
                  {' and the related post below'}
                </UserName>
              )}
            </Box>
            <CreatedAtText>{createdAt}</CreatedAtText>
          </Box>
        </Flex>
      )}
      {(isMobile || isTablet) && (
        <Flex
          sx={{
            flexDirection: 'column',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}
        >
          <Box>
            <Box>
              <Box
                style={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-start',
                  marginBottom: '20px',
                  marginLeft: '8px',
                  width: isTablet ? '100%' : 'none',
                  cursor: 'pointer',
                }}
              >
                <Avatar
                  src={_.get(activity, 'actor.data.profileImage')}
                  sx={{ mr: 2 }}
                />
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    marginLeft: '12px',
                  }}
                >
                  <UserName>
                    <strong onClick={navigateToUser}>{userName}&nbsp;</strong>
                    {isDidAction && (
                      <span>
                        {' did action '}
                        <strong onClick={navigateToAction}>{actionName}</strong>
                      </span>
                    )}
                    {isCommentedAction && (
                      <p>
                        {' commented on action '}
                        <strong onClick={navigateToAction}>{actionName}</strong>
                      </p>
                    )}
                  </UserName>
                  <CreatedAtText>{createdAt}</CreatedAtText>
                </div>
              </Box>
            </Box>

            {actionImpacts && (
              <ActionCardLabelSet
                impacts={actionImpacts}
                impactsInUnits={actionImpactsInUnits}
                showPhysicalValues={UIContextData.showPhysicalValues}
              />
            )}
          </Box>
        </Flex>
      )}
      {!isMobile && !isTablet && (
        <Box>
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {actionImpacts && (
              <ActionCardLabelSet
                impacts={actionImpacts}
                impactsInUnits={actionImpactsInUnits}
                showPhysicalValues={UIContextData.showPhysicalValues}
              />
            )}
            {props.feedGroup === 'network' && (
              <Popover
                content={
                  <DeletePostText
                    onClick={() => props.onRemoveActivity(activity.id)}
                  >
                    <FormattedMessage id="app.actions.card.delete" />
                  </DeletePostText>
                }
              >
                <Icon type="ellipsis" rotate={90} />
              </Popover>
            )}
          </div>
        </Box>
      )}
      {(isMobile || isTablet) && props.feedGroup === 'network' && (
        <Box>
          <Popover
            content={
              <DeletePostText
                onClick={() => props.onRemoveActivity(activity.id)}
              >
                <FormattedMessage id="app.actions.card.delete" />
              </DeletePostText>
            }
          >
            <Icon type="ellipsis" rotate={90} />
          </Popover>
        </Box>
      )}
    </Flex>
  )
}

export const CommentButton = props => {
  const { activity, filled, onPress, reaction } = props
  let counts, own_reactions

  if (reaction && props.onToggleChildReaction) {
    counts = reaction.children_counts
    own_reactions = reaction.own_children
  } else {
    if (reaction) {
      console.warn(
        'reaction is passed to the CommentButton but ' +
          'onToggleChildReaction is not, falling back to commenting the activity',
      )
    }
    counts = activity.reaction_counts
    own_reactions = activity.own_reactions
  }

  return (
    <ReactionToggleIcon
      own_reactions={own_reactions}
      kind="comment"
      onPress={onPress}
      activeIcon={filled ? CommentFilled : CommentDefault}
      inactiveIcon={filled ? CommentFilled : CommentDefault}
    />
  )
}

export const LikeButton = props => {
  const { activity, reaction } = props
  let counts, own_reactions

  if (reaction && props.onToggleChildReaction) {
    counts = reaction.children_counts
    own_reactions = reaction.own_children
  } else {
    if (reaction) {
      console.warn(
        'reaction is passed to the LikeButton but ' +
          'onToggleChildReaction is not, falling back to liking the activity',
      )
    }
    counts = activity.reaction_counts
    own_reactions = activity.own_reactions
  }

  const handleOnPress = () => {
    const {
      activity,
      reaction,
      onToggleReaction,
      onToggleChildReaction,
    } = props
    logEvent(EVENT_TYPES.ACTIVITY_ADDED_REACTION)
    if (reaction && onToggleChildReaction) {
      return onToggleChildReaction('like', reaction, {}, {})
    }
    return onToggleReaction('like', activity, {}, {})
  }

  return (
    <ReactionToggleIcon
      own_reactions={own_reactions}
      kind="like"
      onPress={handleOnPress}
      activeIcon={LikeFilled}
      inactiveIcon={LikeDefault}
    />
  )
}
