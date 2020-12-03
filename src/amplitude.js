import amplitude from 'amplitude-js'
import env from 'config/env'

const { REACT_APP_APLITUDE_API_KEY } = env

export const EVENT_TYPES = {
  USER_LOGIN: 'User login',
  USER_REGISTRATION: 'User registration',
  ACTION_TAKEN: 'Action is taken',
  ACTIONS_VISITED: 'Visited actions list',
  ACTION_OPENED: 'Action is opened',
  ACTION_SEARCHED: 'Action is searched',
  ACTION_MARKED_HABIT: 'Action is marked habit',
  ACTION_FILTERED: 'Actions are filtered',
  ACTION_ADDED_POST: 'User added a post to activity after action taking',
  ACTION_SUGGESTED: 'Action is suggested',
  ACTION_PROPOSED: 'Action is proposed',
  CHALLENGES_OPENED: 'Opened Challenges tab',
  CHALLENGES_REVIEW_CAMPAIGN: 'Review a Campaign',
  CHALLENGES_PARTICIPATE_CAMPAIGN: 'Participation in a Campaign',
  GROUP_CREATED: 'Created a group',
  GROUP_OPENED: 'Opened Group',
  GROUPS_TAB_OPENED: 'Opened Group tab',
  GROUPS_INVITED: 'Invited to the group',
  GROUPS_DELETED: 'Deleted his group',
  ORGANIZATION_CREATED: 'Organization creation',
  ORGANIZATION_VISITED: 'Organization dashboard is visited',
  ORGANIZATION_INFO_ADDED: 'Organization information is added',
  LANDINGPAGE_VISITED: 'Landing page is visited',
  ACTIVITY_VISITED_IN_GROUPS: 'Visited his activity in Groups',
  ACTIVITY_ADDED_POST_TO_GROUP: 'Added a post to Group activity',
  ACTIVITY_ADDED_POST_TO_DASHBOARD: 'Added a post to User Dashboard activity',
  ACTIVITY_ADDED_POST_TO_ORGANIZATION: 'Added a post to Organization activity',
  ACTIVITY_ADDED_POST_TO_CAMPAIGN: 'Added a post to Campaign activity',
  ACTIVITY_ADDED_POST_TO_COMPETITION: 'Added a post to Competition activity',
  ACTIVITY_ADDED_REACTION: 'Added reaction',
  ACTIVITY_ADDED_COMMENT: 'Added Comment',
  PROFILE_VISITED: 'Profile page is visited (personal)',
  PROFILE_CHANGED_GENERAL: 'Changed general information',
  PROFILE_CHANGED_CONFIDENTIALITY: 'Changed confidentiality',
  PROFILE_CHECKED_GROUPS: 'Checked groups',
  PROFILE_CUSTOMIZED_FOOTPRINT: 'Customized foortprint',
  STATIC_DONATION_VISITED: 'Donation page is visited',
  STATIC_DONATION_SENT: 'Donation sent',
  STATIC_INCREASE_HP_VISITED: 'Increase handprint page is visited',
  STATIC_INVITATION_SENT: 'Invitation is sent',
}

const init = () => {
  amplitude.getInstance().init(REACT_APP_APLITUDE_API_KEY)
}

export const logEvent = (type, data) => {
  if (type) {
    amplitude.getInstance().logEvent(type, data)
  }
}

export const setUserId = email => {
  if (email) {
    amplitude.getInstance().setUserId(email)
  }
}

export default init
