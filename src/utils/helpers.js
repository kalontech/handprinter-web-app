import { webAppBaseUrl } from 'api'

const eatonCode = 'EarthDay2019'

export const getInvitationLink = code =>
  `${webAppBaseUrl}/account/register/${code}`

export const getInvitationLinkEaton = code => {
  const encValue = Buffer.from(eatonCode).toString('base64')
  return `${webAppBaseUrl}/account/register/${code}/${encValue}`
}
