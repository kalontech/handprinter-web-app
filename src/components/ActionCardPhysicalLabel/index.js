import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Icon } from 'antd'
import PropTypes from 'prop-types'
import { injectIntl, FormattedPlural, FormattedMessage } from 'react-intl'

import colors from 'config/colors'
import hexToRgba from 'utils/hexToRgba'
import media from 'utils/mediaQueryTemplate'
import { IMPACT_CATEGORIES } from 'utils/constants'
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
    variant === 'positive'
      ? hexToRgba(`${colors.ocean}`, 0.3)
      : hexToRgba(`${colors.darkGray}`, 0.3)};
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;
  font-family: 'Noto Sans';
  :last-child {
    margin-right: 0;
  }
`

const Category = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  background-color: ${({ unit, variant }) =>
    variant === 'positive'
      ? hexToRgba(`${colors.ocean}`, 0.1)
      : hexToRgba(`${colors.darkGray}`, 0.1)};

  ${media.phone`
    width: 20px;
  `}

  .anticon {
    color: ${({ unit, variant }) =>
      variant === 'positive' ? `${colors.ocean}` : `${colors.darkGray}`};
  }
`

const Caption = styled.div`
  /* text-transform: uppercase; */
  color: ${({ unit, variant }) =>
    variant === 'positive' ? `${colors.ocean}` : `${colors.darkGray}`};
  font-size: 10px;
  font-weight: bold;
  line-height: 1.4;
`
const Value = styled.div`
  font-weight: 400;
  color: ${colors.dark};

  sup {
    font-size: 8px;
  }
`

const Impact = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  flex-grow: 1;
  line-height: 1;
`

const ActionCardPhysicalLabel = ({
  category,
  value,
  variant,
  unit,
  hideTooltip,
  intl: { formatMessage },
  ...otherProp
}) => {
  const tooltipProps = {}
  if (hideTooltip) tooltipProps.visible = false
  const [num, power] = value

  return (
    <Tooltip
      {...tooltipProps}
      title={() => (
        <TooltipContainer>
          <FormattedMessage
            id="app.actionCardLabel.tooltip.text"
            values={{
              value: value,
              unit: (
                <FormattedPlural
                  value={value}
                  one={formatMessage({
                    id: `app.actions.physicalValues.one.${unit}`,
                  })}
                  other={formatMessage({
                    id: `app.actions.physicalValues.other.${unit}`,
                  })}
                />
              ),
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
      <LabelContainer unit={unit} variant={variant}>
        <Category unit={unit} variant={variant}>
          <Icon component={() => icons[variant][category]} {...otherProp} />
        </Category>
        <Impact>
          <Caption unit={unit} variant={variant}>
            <FormattedPlural
              value={value}
              one={
                `${formatMessage({
                  id: `app.actions.physicalValues.other.${unit}`,
                })}` === 'M' ? (
                  <p>
                    M<sup>3</sup>
                  </p>
                ) : (
                  formatMessage({
                    id: `app.actions.physicalValues.other.${unit}`,
                  })
                )
              }
              other={
                `${formatMessage({
                  id: `app.actions.physicalValues.other.${unit}`,
                })}` === 'M' ? (
                  <p>
                    M<sup>3</sup>
                  </p>
                ) : (
                  formatMessage({
                    id: `app.actions.physicalValues.other.${unit}`,
                  })
                )
              }
            />
          </Caption>
          <Value>
            {num}
            {power > 3 ? <sup>-{power}</sup> : null}
          </Value>
        </Impact>
      </LabelContainer>
    </Tooltip>
  )
}

ActionCardPhysicalLabel.propTypes = {
  category: PropTypes.oneOf(Object.values(IMPACT_CATEGORIES)).isRequired,
  unit: PropTypes.string.isRequired,
  variant: PropTypes.oneOf(['positive', 'negative']).isRequired,
  value: PropTypes.array.isRequired,
  powInd: PropTypes.number,
}

export default injectIntl(ActionCardPhysicalLabel)
