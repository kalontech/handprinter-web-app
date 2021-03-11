import React from 'react'
import { FormattedMessage } from 'react-intl'
import moment from 'moment'
import _ from 'lodash'

import {
  Container,
  Name,
  Text,
  StyledIcon,
  ImpactText,
  Row,
  Impacts,
  ImpactDaysText,
  HowCalculated,
} from './styled'
import { IMPACTS } from '../../../utils/constants'

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

export default function NetPositiveDays(props) {
  const { user, ratio } = props
  const netPositiveDays = calculateNetPositiveDays(ratio, IMPACTS)

  return (
    <Container whiteBG>
      <Name>
        <FormattedMessage id="netPositiveStatus" />
      </Name>
      <Text>
        <FormattedMessage
          id="netPositiveDaysSince"
          values={{
            days: netPositiveDays.summNetDays || 0,
            date: moment(new Date(new Date().getFullYear(), 0, 1)).format(
              'MMM YYYY',
            ),
          }}
        />
      </Text>

      <Impacts>
        {IMPACTS.map((impact, index) => (
          <Row key={impact.name} darkBG={index % 2 === 0}>
            <StyledIcon component={() => impact.icon} />
            <ImpactText>
              <FormattedMessage id={`app.impactCategories.${impact.name}`} />
            </ImpactText>
            <ImpactDaysText>
              <FormattedMessage
                id="netPositiveDaysCount"
                values={{
                  days: impact.days || 0,
                }}
              />
            </ImpactDaysText>
          </Row>
        ))}
      </Impacts>
      <HowCalculated to={'/pages/measurement-units'}>
        <FormattedMessage id="netPositiveDaysHowCalculated" />
      </HowCalculated>
    </Container>
  )
}

NetPositiveDays.propTypes = {
  user: Object,
  ratio: Object,
}
