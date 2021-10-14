import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import _ from 'lodash'

import ActionCardLabel from 'components/ActionCardLabel'
import ActionCardPhysicalLabel from 'components/ActionCardPhysicalLabel'
import media from 'utils/mediaQueryTemplate'

const CardLabelWrap = styled.div`
  display: flex;
  justify-content: flex-start;

  ${media.largeDesktop`
    ${props => props.mobileFixedWidth && 'max-width: 285px;'}
    margin-right: 5px;
    position: relative;
  `}

  ${media.phone`
    margin-right: 0px;
    position: relative;
    flex-wrap: wrap;
    left: 0;
  `}
`

// this func loop throw incoming value and if it less then 1 it multiple val to 10 to minimize it length
export const processedUnitValue = val => {
  if (!val) return [0, null]
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
      : [(Number(val) || 0).toFixed(1), null]
  }
}

const ActionCardLabelSet = props => {
  const {
    impacts,
    impactsInUnits,
    hideTooltip,
    mobileFixedWidth,
    showPhysicalValues,
    largeLabel,
    justify,
    hideTooltipTitle,
    impactsInModeling,
  } = props

  if (!impacts) return null

  if (showPhysicalValues && impactsInUnits) {
    console.log(impactsInUnits)
    return (
      <CardLabelWrap
        mobileFixedWidth={mobileFixedWidth}
        style={{ justifyContent: justify ? 'center' : 'flex-start' }}
      >
        {impactsInUnits.footprint &&
          Object.entries(impactsInUnits.footprint)
            .filter(([category, value]) => impactsInModeling || value > 0)
            .map(([category, value], index) => (
              <ActionCardPhysicalLabel
                hideTooltipTitle={hideTooltipTitle}
                largeLabel={largeLabel}
                hideTooltip={hideTooltip}
                key={index}
                category={category}
                unit={category}
                value={processedUnitValue(value)}
                impactsInModeling={impactsInModeling}
              />
            ))}
        {impactsInUnits.handprint &&
          Object.entries(impactsInUnits.handprint)
            .filter(([category, value]) => impactsInModeling || value > 0)
            .map(([category, value], index) => (
              <ActionCardPhysicalLabel
                hideTooltipTitle={hideTooltipTitle}
                key={index}
                largeLabel={largeLabel}
                category={category}
                unit={category}
                value={processedUnitValue(value)}
                impactsInModeling={impactsInModeling}
              />
            ))}
      </CardLabelWrap>
    )
  } else {
    return (
      <CardLabelWrap
        mobileFixedWidth={mobileFixedWidth}
        style={{
          justifyContent: justify ? 'center' : 'flex-start',
          flexWrap: 'wrap',
        }}
      >
        {impacts.footprint &&
          Object.entries(impacts.footprint)
            .filter(
              ([category, timeValue]) =>
                impactsInModeling || timeValue.minutes > 0,
            )
            .filter(([category, timeValue]) => category !== 'ecosystem')
            .map(([category, timeValue], index) => (
              <ActionCardLabel
                hideTooltipTitle={hideTooltipTitle}
                largeLabel={largeLabel}
                hideTooltip={hideTooltip}
                key={index}
                category={category}
                unit={_.get(timeValue, 'humanReadable.unit', '')}
                value={_.get(timeValue, 'humanReadable.value', '')}
                variant={
                  _.get(timeValue, 'humanReadable.value', 0) >= 0
                    ? 'positive'
                    : 'negative'
                }
                impactsInModeling={impactsInModeling}
              />
            ))}
        {impacts.handprint &&
          Object.entries(impacts.handprint)
            .filter(
              ([category, timeValue]) =>
                impactsInModeling || timeValue.minutes > 0,
            )
            .filter(([category, timeValue]) => category !== 'ecosystem')
            .map(([category, timeValue], index) => (
              <ActionCardLabel
                hideTooltipTitle={hideTooltipTitle}
                key={index}
                largeLabel={largeLabel}
                category={category}
                unit={_.get(timeValue, 'humanReadable.unit', '')}
                value={_.get(timeValue, 'humanReadable.value', '')}
                variant={
                  _.get(timeValue, 'humanReadable.value', 0) >= 0
                    ? 'positive'
                    : 'negative'
                }
                impactsInModeling={impactsInModeling}
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
  justify: PropTypes.bool,
  hasTakenActions: PropTypes.bool,
}

export default ActionCardLabelSet
