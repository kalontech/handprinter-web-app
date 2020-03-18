import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import ActionCardLabel from 'components/ActionCardLabel'
import ActionCardPhysicalLabel from 'components/ActionCardPhysicalLabel'
import media from 'utils/mediaQueryTemplate'

const CardLabelWrap = styled.div`
  display: flex;
  ${media.phone`
    ${props => props.mobileFixedWidth && 'max-width: 285px;'}
  `}
`

const ActionCardLabelSet = props => {
  const {
    impacts,
    impactsInUnits,
    hideTooltip,
    mobileFixedWidth,
    showPhysicalValues,
  } = props

  if (!impacts) return null

  const processedUnitValue = val => {
    if (val < 1) {
      let i = 0
      while (val < 1) {
        val *= 10
        i = i + 1
      }
      return [(Math.round(val * 100) / 100).toFixed(1), i]
    } else {
      return val > 100 ? [val, null] : [val.toFixed(1), null]
    }
  }

  if (showPhysicalValues === true) {
    return (
      <CardLabelWrap mobileFixedWidth={mobileFixedWidth}>
        {impactsInUnits.footprint &&
          Object.entries(impactsInUnits.footprint)
            .filter(([category, value]) => value > 0)
            .map(([category, value], index) => (
              <ActionCardPhysicalLabel
                hideTooltip={hideTooltip}
                key={index}
                category={category}
                unit={category}
                value={processedUnitValue(value)}
                variant={value >= 0 ? 'positive' : 'negative'}
              />
            ))}
        {impactsInUnits.handprint &&
          Object.entries(impactsInUnits.handprint)
            .filter(([category, value]) => value > 0)
            .map(([category, value], index) => (
              <ActionCardPhysicalLabel
                key={index}
                category={category}
                unit={category}
                value={processedUnitValue(value)}
                variant={value >= 0 ? 'positive' : 'negative'}
              />
            ))}
      </CardLabelWrap>
    )
  } else {
    return (
      <CardLabelWrap mobileFixedWidth={mobileFixedWidth}>
        {impacts.footprint &&
          Object.entries(impacts.footprint)
            .filter(([category, timeValue]) => timeValue.minutes > 0)
            .map(([category, timeValue], index) => (
              <ActionCardLabel
                hideTooltip={hideTooltip}
                key={index}
                category={category}
                unit={timeValue.humanReadable.unit}
                value={timeValue.humanReadable.value}
                variant={
                  timeValue.humanReadable.value >= 0 ? 'positive' : 'negative'
                }
              />
            ))}
        {impacts.handprint &&
          Object.entries(impacts.handprint)
            .filter(([category, timeValue]) => timeValue.minutes > 0)
            .map(([category, timeValue], index) => (
              <ActionCardLabel
                key={index}
                category={category}
                unit={timeValue.humanReadable.unit}
                value={timeValue.humanReadable.value}
                variant={
                  timeValue.humanReadable.value >= 0 ? 'positive' : 'negative'
                }
              />
            ))}
      </CardLabelWrap>
    )
  }
}

ActionCardLabelSet.propTypes = {
  impacts: PropTypes.object.isRequired,
  impactsInUnits: PropTypes.object.isRequired,
  hideTooltip: PropTypes.bool,
  mobileFixedWidth: PropTypes.bool,
  showPhysicalValues: PropTypes.bool,
}

export default ActionCardLabelSet
