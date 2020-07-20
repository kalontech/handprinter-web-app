import colors from '../config/colors'

export const IMPACT_CATEGORIES = {
  HEALTH: 'health',
  CLIMATE: 'climate',
  ECOSYSTEM: 'ecosystem',
  WATER: 'water',
  WASTE: 'waste',
  MEMBERS: 'members',
  NETWORK_MEMBERS: 'networkMembers',
  ACTIONS_TAKEN: 'actionsTaken',
}

export const IMPACT_CATEGORIES_COLORS = {
  HEALTH: colors.blue,
  CLIMATE: colors.ocean,
  ECOSYSTEM: colors.green,
  WATER: colors.green,
  WASTE: colors.ocean,
  MEMBERS: colors.ocean,
  NETWORK_MEMBERS: colors.ocean,
  ACTIONS_TAKEN: colors.ocean,
}

export const TimeValueAbbreviations = {
  MINUTES: 'MINS',
  HOURS: 'HRS',
  DAYS: 'DAYS',
  MONTHS: 'MTHS',
  YEARS: 'YRS',
  MEMBERS: 'MEMBERS',
  NETWORK_MEMBERS: 'NETWORK MEMBERS',
  ACTIONS_TAKEN: 'ACTIONS TAKEN',
}

export const ACTIONS_SUBSETS = {
  DISCOVER: 'discover',
  SUGGESTED: 'suggested',
  MY_IDEAS: 'my_ideas',
  TAKEN: 'history',
  MODELING: 'modeling',
}

export const GROUPS_STATUSES = {
  DELETED: 'DELETED',
  ACTIVE: 'ACTIVE',
}

export const GROUPS_SUBSETS = {
  DISCOVER: 'discover',
  TEAMS: 'teams',
  MY: 'my',
  FEATURED: 'featured',
}

export const CHALLENGES_SUBSETS = {
  CAMPAIGNS: 'campaigns',
  COMPETITIONS: 'competitions',
}

export const USER_GROUP_STATUSES = {
  INVITED: 'INVITED',
  REQUESTING: 'REQUESTING',
  ACTIVE: 'ACTIVE',
}

export const MEMBER_GROUP_ROLES = {
  ADMIN: 'ADMIN',
  MEMBER: 'MEMBER',
  OWNER: 'OWNER',
}

export const ACTION_STATES = {
  PROPOSED: 'PROPOSED',
  MODELING: 'MODELING',
  PUBLISHED: 'PUBLISHED',
  DENIED: 'DENIED',
}

export const QUESTIONS_ANCHOR = {
  WHAT_CALENDAR_SHOWING: 'question_calendar_10',
  WHAT_SCALE_SHOWING: 'question_scales_11',
  WHAT_NETWORK_SHOWING: 'question_network_12',
}

export const CONTACT_DATA = {
  EMAIL: 'mailto:greg@newearthb.com',
}

export const METRICS = {
  TONS: 'Metric tons',
  KG: 'kg CO2',
}

export const ORGANIZATION_SUBSETS = {
  DISCOVER: 'discover',
  MY: 'my',
}

export const UNITS = {
  timeUnits: 'TimeUnits',
  physicalUnits: 'PhysicalUnits',
}
