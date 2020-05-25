import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { injectIntl, FormattedMessage, FormattedHTMLMessage } from 'react-intl'

import colors from 'config/colors'
import hexToRgba from 'utils/hexToRgba'
import media from 'utils/mediaQueryTemplate'
import { IMPACT_CATEGORIES } from 'utils/constants'
import Tooltip from 'components/Tooltip'

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
  height: 34px;
  background-color: ${colors.white};
  border: 1px solid transparent;
  margin-right: 6px;
  border-color: ${hexToRgba(`${colors.ocean}`, 0.3)};
  border-radius: 8px;
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
  width: 50%;
  background-color: ${hexToRgba(`${colors.ocean}`, 0.1)};

  ${media.phone`
    width: 20px;
  `}

  .anticon {
    color: ${colors.ocean};
  }
`

const Caption = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 10px;
  color: ${colors.ocean};
  font-family: Noto Sans;
  font-style: normal;
  font-weight: bold;
  font-size: 10px;
  line-height: 12px;
`

const Value = styled.div`
  font-family: Noto Sans;
  font-style: normal;
  font-weight: bold;
  font-size: 10px;
  line-height: 20px;
  display: flex;
  align-items: center;
  text-align: center;
  text-transform: uppercase;
  color: ${colors.ocean};

  sup {
    font-size: 8px;
  }
`

const Impact = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  line-height: 1;
  padding: 1.5px 1.6px 1.5px 1.5px;
`

const impactHeaderPhysicalLabel = ({
  category,
  value,
  variant,
  unit,
  hideTooltip,
  intl: { formatMessage },
  largeLabel,
  labelWidth,
  headerLabel,
}) => {
  const tooltipProps = {}
  if (hideTooltip) tooltipProps.visible = false
  if (!value) return null
  const [num, power] = value

  return (
    <Tooltip
      {...tooltipProps}
      title={() => (
        <TooltipContainer>
          <FormattedMessage
            id="app.actionCardLabel.tooltip.text"
            values={{
              value: `${num} ${power ? `e-${power}` : ''}`,
              unit: (
                <FormattedHTMLMessage
                  id={`app.actions.physicalValues.one.${unit}`}
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
      <LabelContainer
        style={
          largeLabel && {
            width: labelWidth || 81,
            height: headerLabel ? 30 : 68,
            marginleft: 10,
            marginRight: 10,
          }
        }
        unit={unit}
      >
        <Category unit={unit}>
          <Caption unit={unit}>
            <FormattedHTMLMessage
              id={`app.actions.physicalValues.one.climate.kg`}
            />
            <FormattedHTMLMessage
              id={`app.actions.physicalValues.one.climate.co2`}
            />
          </Caption>
        </Category>
        <Impact>
          <Value>
            {num}
            {power && <sup>-{power}</sup>}
          </Value>
        </Impact>
      </LabelContainer>
    </Tooltip>
  )
}

impactHeaderPhysicalLabel.propTypes = {
  category: PropTypes.oneOf(Object.values(IMPACT_CATEGORIES)).isRequired,
  unit: PropTypes.string.isRequired,
  value: PropTypes.array.isRequired,
  powInd: PropTypes.number,
}

export default injectIntl(impactHeaderPhysicalLabel)
