import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Icon } from 'antd'
import PropTypes from 'prop-types'
import { injectIntl, FormattedMessage, FormattedHTMLMessage } from 'react-intl'

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
  border-color: ${hexToRgba(`${colors.ocean}`, 0.3)};
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
  background-color: ${hexToRgba(`${colors.ocean}`, 0.1)};

  ${media.phone`
    width: 20px;
  `}

  .anticon {
    color: ${colors.ocean};
  }
`

const Caption = styled.div`
  color: ${colors.ocean};
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
  largeLabel,
  labelWidth,
  headerLabel,
  hideTooltipTitle,
  impactsInModeling,
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
          {!hideTooltipTitle && (
            <FormattedMessage
              id={
                impactsInModeling
                  ? 'app.actionCardLabel.tooltip.modeling'
                  : 'app.actionCardLabel.tooltip.text'
              }
              values={
                !impactsInModeling && {
                  value: `${num} ${power ? `e-${power}` : ''}`,
                  unit: (
                    <FormattedHTMLMessage
                      id={`app.actions.physicalValues.one.${unit}`}
                    />
                  ),
                  category: category,
                }
              }
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
            height: headerLabel ? 30 : 68,
            marginleft: 10,
            marginRight: 10,
            marginTop: 5,
          }
        }
        unit={unit}
      >
        <Category unit={unit}>
          <Icon component={() => icons['positive'][category]} {...otherProp} />
        </Category>
        {impactsInModeling ? (
          <Impact>?</Impact>
        ) : (
          <Impact>
            <Caption unit={unit}>
              <FormattedHTMLMessage
                id={`app.actions.physicalValues.one.${unit}`}
              />
            </Caption>
            <Value>
              {num}
              {power && <sup>-{power}</sup>}
            </Value>
          </Impact>
        )}
      </LabelContainer>
    </Tooltip>
  )
}

ActionCardPhysicalLabel.propTypes = {
  category: PropTypes.oneOf(Object.values(IMPACT_CATEGORIES)).isRequired,
  unit: PropTypes.string.isRequired,
  value: PropTypes.array.isRequired,
  powInd: PropTypes.number,
  impactsInModeling: PropTypes.bool,
}

export default injectIntl(ActionCardPhysicalLabel)
