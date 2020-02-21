/** @jsx jsx */

import _ from 'lodash'
import moment from 'moment'
import React, { useState } from 'react'
import { CommentField, CommentList, LikeButton } from 'react-activity-feed'
import { Avatar, Box, Flex, jsx, Text } from 'theme-ui'

import ActionCardLabelSet from 'components/ActionCardLabelSet'

export const ActivityFooter = props => {
  const [isShowComments, setIsShowComments] = useState(false)

  return (
    <Box
      sx={{
        p: 3,
      }}
    >
      <Flex>
        <LikeButton {...props} />
        <Text
          onClick={() => {
            setIsShowComments(value => !value)
          }}
        >
          Comments
        </Text>
      </Flex>
      {isShowComments && (
        <Box>
          <CommentField
            activity={props.activity}
            onAddReaction={props.onAddReaction}
          />
          <CommentList activityId={props.activity.id} />
        </Box>
      )}
    </Box>
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
            <Text as="span">{userName}</Text>
            {isDidAction && (
              <Text as="span">{` did action ${actionName}`}</Text>
            )}
          </Box>
          <Box>{createdAt}</Box>
        </Box>
      </Flex>
      <Box>
        {actionImpacts && <ActionCardLabelSet impacts={actionImpacts} />}
      </Box>
    </Flex>
  )
}
