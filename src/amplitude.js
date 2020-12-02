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
  CHALLENGES_OPENED: 'Opened Challenges tab',
  CHALLENGES_REVIEW_CAMPAIGN: 'Review a Campaign',
  CHALLENGES_PARTICIPATE_CAMPAIGN: 'Participation in a Campaign',
  GROUP_CREATED: 'Created a group',
  GROUP_OPENED: 'Opened Group',
  GROUPS_TAB_OPENED: 'Opened Group tab',
  GROUPS_INVITED: 'Invited to the group',
  ORGANIZATION_CREATED: 'Organization creation',
  ORGANIZATION_VISITED: 'Organization dashboard is visited',
  ORGANIZATION_INFO_ADDED: 'Organization information is added',
  LANDINGPAGE_VISITED: 'Landing page is visited',
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
