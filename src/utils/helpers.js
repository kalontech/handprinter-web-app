import { webAppBaseUrl } from '../api'

export const getInvitationLink = code =>
  `${webAppBaseUrl}/account/register/${code}`
