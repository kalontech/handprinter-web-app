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
    margin-right: 5px;
    position: relative;
    left: 4%;
  `}
`

const ActionCardLabelSet = props => {
  const {
    impacts,
    impactsInUnits,
    hideTooltip,
    mobileFixedWidth,
    showPhysicalValues,
    largeLabel,
  } = props

  if (!impacts) return null

  // this func loop throw incoming value and if it less then 1 it multiple val to 10 to minimize it length
  const processedUnitValue = val => {
    if (val < 1) {
      let i = 0
      while (val < 1) {
        val *= 10
        i = i + 1
      }
      // if incoming val is not bigger then 1 we should do while loop and return array
      // with rounded result with 1 number after dot and i as count of numbers after dot
      // 0.0001 -> [1.0, 4]
      // 0.12345 -> [1.2, 1]
      return [(Math.round(val * 100) / 100).toFixed(1), i]
    } else {
      // if incoming val greater then 100 we don't want to show numbers after dot
      // if val greater then 100 we return val as it comes if val smaller then 100 we fixed it to 1 number after dot
      // 1.23 -> [1.2, null]
      // 1231.10 -> [1231, null]
      return val > 100
        ? [Math.round(val * 100) / 100, null]
        : [val.toFixed(1), null]
    }
  }

  if (showPhysicalValues) {
    return (
      <CardLabelWrap mobileFixedWidth={mobileFixedWidth}>
        {impactsInUnits.footprint &&
          Object.entries(impactsInUnits.footprint)
            .filter(([category, value]) => value > 0)
            .map(([category, value], index) => (
              <ActionCardPhysicalLabel
                largeLabel={largeLabel}
                hideTooltip={hideTooltip}
                key={index}
                category={category}
                unit={category}
                value={processedUnitValue(value)}
              />
            ))}
        {impactsInUnits.handprint &&
          Object.entries(impactsInUnits.handprint)
            .filter(([category, value]) => value > 0)
            .map(([category, value], index) => (
              <ActionCardPhysicalLabel
                key={index}
                largeLabel={largeLabel}
                category={category}
                unit={category}
                value={processedUnitValue(value)}
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
                largeLabel={largeLabel}
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
                largeLabel={largeLabel}
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
