import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Icon } from 'antd'
import PropTypes from 'prop-types'
import { injectIntl, FormattedPlural, FormattedMessage } from 'react-intl'

import colors from 'config/colors'
import hexToRgba from 'utils/hexToRgba'
import media from 'utils/mediaQueryTemplate'
import { IMPACT_CATEGORIES, TimeValueAbbreviations } from 'utils/constants'
import Tooltip from 'components/Tooltip'

import icons from './icons'

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
  border-color: ${({ variant, unit }) =>
    unit === TimeValueAbbreviations.DAYS && variant === 'positive'
      ? hexToRgba(`${colors.blue}`, 0.3)
      : unit === TimeValueAbbreviations.HOURS && variant === 'positive'
      ? hexToRgba(`${colors.ocean}`, 0.3)
      : unit === TimeValueAbbreviations.MINUTES && variant === 'positive'
      ? hexToRgba(`${colors.green}`, 0.3)
      : unit === TimeValueAbbreviations.MEMBERS && variant === 'positive'
      ? hexToRgba(`${colors.blue}`, 0.3)
      : unit === TimeValueAbbreviations.ACTIONS_TAKEN && variant === 'positive'
      ? hexToRgba(`${colors.green}`, 0.3)
      : hexToRgba(`${colors.darkGray}`, 0.3)};
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;
  font-family: 'Noto Sans';
  :last-child {
    margin-right: 0;
  }
  ${media.phone`
    width: 52px;
    height: 32px;
    margin-right: 3px;
  `}
`

const Category = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  background-color: ${({ unit, variant }) =>
    unit === TimeValueAbbreviations.DAYS && variant === 'positive'
      ? hexToRgba(`${colors.blue}`, 0.1)
      : unit === TimeValueAbbreviations.HOURS && variant === 'positive'
      ? hexToRgba(`${colors.ocean}`, 0.1)
      : unit === TimeValueAbbreviations.MINUTES && variant === 'positive'
      ? hexToRgba(`${colors.green}`, 0.1)
      : unit === TimeValueAbbreviations.MEMBERS && variant === 'positive'
      ? hexToRgba(`${colors.blue}`, 0.1)
      : unit === TimeValueAbbreviations.ACTIONS_TAKEN && variant === 'positive'
      ? hexToRgba(`${colors.green}`, 0.1)
      : hexToRgba(`${colors.darkGray}`, 0.1)};

  ${media.phone`
    width: 20px;
  `}

  .anticon {
    color: ${({ unit, variant }) =>
      unit === TimeValueAbbreviations.DAYS && variant === 'positive'
        ? `${colors.blue}`
        : unit === TimeValueAbbreviations.HOURS && variant === 'positive'
        ? `${colors.ocean}`
        : unit === TimeValueAbbreviations.MINUTES && variant === 'positive'
        ? `${colors.green}`
        : unit === TimeValueAbbreviations.MEMBERS && variant === 'positive'
        ? `${colors.blue}`
        : unit === TimeValueAbbreviations.ACTIONS_TAKEN &&
          variant === 'positive'
        ? `${colors.green}`
        : `${colors.darkGray}`};
  }
`

const Caption = styled.div`
  text-transform: uppercase;
  color: ${({ unit, variant }) =>
    unit === TimeValueAbbreviations.DAYS && variant === 'positive'
      ? `${colors.blue}`
      : unit === TimeValueAbbreviations.HOURS && variant === 'positive'
      ? `${colors.ocean}`
      : unit === TimeValueAbbreviations.MINUTES && variant === 'positive'
      ? `${colors.green}`
      : unit === TimeValueAbbreviations.MEMBERS && variant === 'positive'
      ? `${colors.blue}`
      : unit === TimeValueAbbreviations.NETWORK_MEMBERS &&
        variant === 'positive'
      ? `${colors.blue}`
      : unit === TimeValueAbbreviations.ACTIONS_TAKEN && variant === 'positive'
      ? `${colors.green}`
      : `${colors.darkGray}`};
  font-size: 10px;
  font-weight: bold;
  line-height: 1.4;
  text-align: center;
`
const Value = styled.div`
  font-weight: 400;
  font-size: 14px;
  color: ${colors.dark};
`

const Impact = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  line-height: 1;
`

const ActionCardLabel = ({
  category,
  value,
  variant,
  unit,
  hideTooltip,
  intl: { formatMessage },
  largeLabel,
  labelWidth,
  hideTooltipTitle,
  hasTakenActions,
  ...otherProp
}) => {
  const tooltipProps = {}
  if (hideTooltip) tooltipProps.visible = false

  const impactsInModeling = false
  return (
    <Tooltip
      {...tooltipProps}
      title={() => (
        <TooltipContainer>
          {!hideTooltipTitle && (
            <FormattedMessage
              id={
                impactsInModeling
                  ? 'app.actionCardLabel.tooltip.modeling'
                  : 'app.actionCardLabel.tooltip.text'
              }
              values={{
                value: value,
                unit: (
                  <FormattedPlural
                    value={value}
                    one={formatMessage({
                      id: `app.actions.timeValues.one.${unit}`,
                    })}
                    other={formatMessage({
                      id: `app.actions.timeValues.other.${unit}`,
                    })}
                  />
                ),
                category: category,
              }}
            />
          )}
          {!impactsInModeling && (
            <div>
              <Link to="/pages/measurement-units">
                <FormattedMessage id="app.actionCardLabel.tooltip.link" />
              </Link>
            </div>
          )}
        </TooltipContainer>
      )}
      mouseEnterDelay={1}
    >
      <LabelContainer
        style={
          largeLabel && {
            width: labelWidth || 81,
            height: 68,
            marginleft: 10,
            marginRight: 10,
            marginTop: 5,
          }
        }
        unit={unit}
        variant={variant}
      >
        <Category unit={unit} variant={variant}>
          <Icon component={() => icons[variant][category]} {...otherProp} />
        </Category>
        {impactsInModeling ? (
          <Impact>?</Impact>
        ) : (
          <Impact>
            <Caption unit={unit} variant={variant}>
              <FormattedPlural
                value={value}
                one={formatMessage({
                  id: `app.actions.timeValues.one.${unit}`,
                })}
                other={formatMessage({
                  id: `app.actions.timeValues.other.${unit}`,
                })}
              />
            </Caption>
            <Value>{value}</Value>
          </Impact>
        )}
      </LabelContainer>
    </Tooltip>
  )
}

ActionCardLabel.propTypes = {
  category: PropTypes.oneOf(Object.values(IMPACT_CATEGORIES)).isRequired,
  unit: PropTypes.oneOf(Object.values(TimeValueAbbreviations)).isRequired,
  variant: PropTypes.oneOf(['positive', 'negative']).isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  powInd: PropTypes.number,
  hasTakenActions: PropTypes.bool,
}

export default injectIntl(ActionCardLabel)
