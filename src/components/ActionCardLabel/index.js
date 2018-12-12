import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Icon, Tooltip } from 'antd'
import colors from './../../config/colors'
import icons from './icons'
import hexToRgba from './../../utils/hexToRgba'
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl'
import PropTypes from 'prop-types'

export const TimeValueAbbreviations = {
  MINUTES: 'MINS',
  HOURS: 'HRS',
  DAYS: 'DAYS',
  MONTHS: 'MTHS',
  YEARS: 'YRS',
}

const ActionCardLabel = props => {
  const { category, value, variant, unit } = props

  const TooltipContainer = styled.div`
    line-height: 20px;
    text-align: center;
    a {
      color: ${colors.green};
      -webkit-text-stroke-color: currentColor;
      :hover {
        text-decoration: underline;
      }
    }
  `

  const LabelContainer = styled.div`
    display: flex;
    width: 63px;
    height: 34px;
    background-color: ${colors.white};
    border: 1px solid transparent;
    margin-right: 6px;
    border-color: ${() =>
      unit === TimeValueAbbreviations.DAYS && variant === 'positive'
        ? hexToRgba(`${colors.blue}`, 0.3)
        : unit === TimeValueAbbreviations.HOURS && variant === 'positive'
        ? hexToRgba(`${colors.ocean}`, 0.3)
        : unit === TimeValueAbbreviations.MINUTES && variant === 'positive'
        ? hexToRgba(`${colors.green}`, 0.3)
        : hexToRgba(`${colors.darkGray}`, 0.3)};
    border-radius: 4px;
    overflow: hidden;
    cursor: pointer;

    :last-child {
      margin-right: 0;
    }
  `

  const Category = styled.div`
  display: flex;
  align-items: center
  justify-content: center;
  width: 26px;
  background-color: ${() =>
    unit === TimeValueAbbreviations.DAYS && variant === 'positive'
      ? hexToRgba(`${colors.blue}`, 0.1)
      : unit === TimeValueAbbreviations.HOURS && variant === 'positive'
      ? hexToRgba(`${colors.ocean}`, 0.1)
      : unit === TimeValueAbbreviations.MINUTES && variant === 'positive'
      ? hexToRgba(`${colors.green}`, 0.1)
      : hexToRgba(`${colors.darkGray}`, 0.1)};
      
    .anticon {
      color: ${() =>
        unit === TimeValueAbbreviations.DAYS && variant === 'positive'
          ? `${colors.blue}`
          : unit === TimeValueAbbreviations.HOURS && variant === 'positive'
          ? `${colors.ocean}`
          : unit === TimeValueAbbreviations.MINUTES && variant === 'positive'
          ? `${colors.green}`
          : `${colors.darkGray}`}
  }
`

  const Caption = styled.div`
    text-transform: uppercase;
    color: ${() =>
      unit === TimeValueAbbreviations.DAYS && variant === 'positive'
        ? `${colors.blue}`
        : unit === TimeValueAbbreviations.HOURS && variant === 'positive'
        ? `${colors.ocean}`
        : unit === TimeValueAbbreviations.MINUTES && variant === 'positive'
        ? `${colors.green}`
        : `${colors.darkGray}`};
    font-size: 10px;
    font-weight: bold;
    line-height: 1.4;
  `

  const Impact = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex-grow: 1;
    line-height: 1;
  `

  return (
    <Tooltip
      title={() => (
        <TooltipContainer>
          <FormattedHTMLMessage
            id="app.actionCardLabel.tooltip.text"
            values={{
              value: value,
              unit: unit,
              category: category,
            }}
          />
          <div>
            <Link to="/pages/measurement-units">
              <FormattedMessage id="app.actionCardLabel.tooltip.link" />
            </Link>
          </div>
        </TooltipContainer>
      )}
      mouseEnterDelay={1}
    >
      <LabelContainer>
        <Category>
          <Icon component={() => icons[variant][category]} {...props} />
        </Category>
        <Impact>
          <Caption>{unit}</Caption>
          <div>{value}</div>
        </Impact>
      </LabelContainer>
    </Tooltip>
  )
}

ActionCardLabel.propTypes = {
  category: PropTypes.oneOf([
    'health',
    'climate',
    'ecosystem',
    'water',
    'waste',
  ]).isRequired,
  unit: PropTypes.oneOf([
    TimeValueAbbreviations.MINUTES,
    TimeValueAbbreviations.HOURS,
    TimeValueAbbreviations.DAYS,
    TimeValueAbbreviations.MONTHS,
    TimeValueAbbreviations.YEARS,
  ]).isRequired,
  variant: PropTypes.oneOf(['positive', 'negative']).isRequired,
  value: PropTypes.string.isRequired,
}

export default ActionCardLabel
