import React from 'react'
import { FormattedMessage } from 'react-intl'
import moment from 'moment'
import _ from 'lodash'

import { IMPACTS } from '../../../utils/constants'
import { Container, Name, Text } from './styled'
import {
  DashboardHeaderUserInfoValue,
  DashboardHeaderUserSince,
  HeaderUserInfoRowCol,
} from '../../DashboardPage/header'

const YEAR = 365

function calculateNetPositiveDays(ratio, categories) {
  let summNetDays = 0
  for (let i = 0; i < categories.length; i++) {
    const category = categories[i]
    const footPrintReduction = ratio
      ? Math.floor(YEAR - _.get(ratio, `footprintDays.${category.name}`, YEAR))
      : 0
    const externalHandprint = ratio
      ? Math.floor(_.get(ratio, `handprintDays.${category.name}`, 0))
      : 0

    const netDays = footPrintReduction + externalHandprint
    category.days = netDays
    summNetDays += netDays
  }

  return { categories, summNetDays }
}

export default function UserName(props) {
  const { user, isReturnUser, ratio } = props
  const netPositiveDays = calculateNetPositiveDays(ratio, IMPACTS)
  const positiveDate = new Date(new Date().getFullYear(), 0, 1)
  positiveDate.setDate(
    positiveDate.getDate() + netPositiveDays.categories[0].days,
  )
  if (!user) return null
  return (
    <Container whiteBG={true}>
      <Name>{user.fullName}</Name>
      {isReturnUser ? (
        <div style={{ display: 'flex' }}>
          <FormattedMessage
            id="netPositiveDaysThisYear"
            values={{
              days: netPositiveDays.summNetDays || 0,
              date: moment(positiveDate).format('MMM DD, YYYY'),
            }}
          />
        </div>
      ) : (
        <Text>
          <FormattedMessage id="netPositiveStatusPlaceholder" />
        </Text>
      )}
    </Container>
  )
}

UserName.propTypes = {
  user: Object,
  isReturnUser: Boolean,
  actionsTakenCount: Number,
  personalStats: Object,
}
