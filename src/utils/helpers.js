import { webAppBaseUrl } from 'api'
import moment from 'moment'

const eatonCode = 'EarthDay2019'

export const getInvitationLink = code =>
  `${webAppBaseUrl}/account/register/${code}`

export const getInvitationLinkEaton = code => {
  const encValue = Buffer.from(eatonCode).toString('base64')
  return `${webAppBaseUrl}/account/register/${code}/${encValue}`
}

export const getOrdinalNumber = number => moment.localeData().ordinal(number)

export const roundToFixed = (number, decimalCount = 2) =>
  Math.round((number + Number.EPSILON) * 10 ** decimalCount) /
  10 ** decimalCount
