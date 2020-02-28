/* eslint-disable no-unused-vars */
/* eslint-disable camelcase */
/* eslint-disable react/prop-types */
/** @jsx jsx */

import _ from 'lodash'
import moment from 'moment'
import React, { useState } from 'react'
import {
  CommentField,
  CommentList,
  ReactionToggleIcon,
} from 'react-activity-feed'
import { Avatar, Box, Flex, jsx, Text } from 'theme-ui'

import ActionCardLabelSet from 'components/ActionCardLabelSet'

import CommentDefault from './CommentDefault.svg'
import CommentFilled from './CommentFilled.svg'
import LikeDefault from './LikeDefault.svg'
import LikeFilled from './LikeFilled.svg'

export const ActivityFooter = props => {
  const [isShowComments, setIsShowComments] = useState(false)

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
          <LikeButton {...props} />
          <Box p={2} />
          <CommentButton
            {...props}
            filled={isShowComments}
            onPress={() => {
              setIsShowComments(value => !value)
            }}
          />
        </Flex>
        <Box sx={{ display: isShowComments ? 'block' : 'none' }}>
          <CommentField
            activity={props.activity}
            onAddReaction={props.onAddReaction}
          />
          <CommentList activityId={props.activity.id} />
        </Box>
      </Box>
    </>
  )
}

export const ActivityHeader = props => {
  const activity = _.get(props, 'activity')
  const isDidAction = _.get(activity, 'verb') === 'do action'

  const actionImpacts = _.get(activity, 'context.action.impacts')
  const actionName = _.get(activity, 'context.action.name', 'Unknown action')
  const createdAt = moment(activity.time).fromNow()
  const userName = _.get(activity, 'actor.data.name', 'Unknown user')

  return (
    <Flex
      sx={{
        alignItems: 'center',
        justifyContent: 'space-between',
        p: 3,
      }}
    >
      <Flex
        sx={{
          alignItems: 'center',
        }}
      >
        <Avatar
          src={_.get(activity, 'actor.data.profileImage')}
          sx={{ mr: 2 }}
        />
        <Box>
          <Box>
            <Text as="span">
              <strong>{userName}</strong>
            </Text>
            {isDidAction && (
              <Text as="span">
                {' did action '}
                <strong>{actionName}</strong>
              </Text>
            )}
          </Box>
          <Box sx={{ opacity: 0.5 }}>{createdAt}</Box>
        </Box>
      </Flex>
      <Box>
        {actionImpacts && <ActionCardLabelSet impacts={actionImpacts} />}
      </Box>
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
      counts={counts}
      own_reactions={own_reactions}
      kind="comment"
      onPress={onPress}
      activeIcon={filled ? CommentFilled : CommentDefault}
      inactiveIcon={filled ? CommentFilled : CommentDefault}
      labelSingle="comment"
      labelPlural="comments"
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

    if (reaction && onToggleChildReaction) {
      return onToggleChildReaction('like', reaction, {}, {})
    }
    return onToggleReaction('like', activity, {}, {})
  }

  return (
    <ReactionToggleIcon
      counts={counts}
      own_reactions={own_reactions}
      kind="like"
      onPress={handleOnPress}
      activeIcon={LikeFilled}
      inactiveIcon={LikeDefault}
      labelSingle="like"
      labelPlural="likes"
    />
  )
}
