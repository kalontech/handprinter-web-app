import React, { Component } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { Slider, Icon } from 'antd'
import { FormattedPlural, injectIntl } from 'react-intl'

import colors from '../../../config/colors'
import hexToRgba from '../../../utils/hexToRgba'
import media from '../../../utils/mediaQueryTemplate'
import { TimeValueAbbreviations, } from '../../../utils/constants'

const SliderWrap = styled.div`
  max-width: 95%;
  margin: 0 0 0 5%;

  .ant-slider-rail {
    background: ${colors.gray};

    // TODO:
    // its styles equal to design
    // we don't use it now
    // background: -webkit-linear-gradient(
    //   left, 
    //   ${colors.green} 0%, 
    //   ${colors.green} 30%, 
    //   white 30%,
    //   white 31%,
    //   ${colors.ocean} 31%,
    //   ${colors.ocean} 60%,
    //   white 60%,
    //   white 61%,
    //   ${colors.blue} 61%,
    //   blue
    // );
  }
  .ant-slider-track {
    background-color: ${colors.ocean};
  }
  .ant-slider {
    margin: 5px 0 32px 15px
    ${media.desktop`
      margin: 5px 0 32px 25px
    `}
    ${media.tablet`
      margin: 5px 0 32px 45px
    `}
    &:hover {
      .ant-slider-track {
        background-color: ${colors.ocean};
      }
    }
  }
  .ant-slider-dot, ant-slider-dot-active {
    border: none;
    background-color: transparent;
  }
  .ant-tooltip-arrow {
    display: none;
  }
  .ant-tooltip  {
    padding: 5px;
    text-align: center;
    top: 46px;
    position: relative;
  }
  .ant-slider-handle{
    &:focus {
      box-shadow: none;
    }
  }
`

const TooltipValue = styled.div`
  font-size: 14px;
  color: ${colors.dark};
  font-weight: bold;
  text-align: center;
  width: 70px;
  left: -40px;
  height: 30px;
  top: -14px;
  left: -15px;
  position: relative;
  padding: 3px 10px !important;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${props => props.colors.bg || colors.gentlyGreen};
  color: ${colors.darkGray};
  box-shadow: none;
  border-radius: 30px;
  cursor: pointer;
  span {
    font-size: 10px;
    text-transform: uppercase;
    font-weight: bold
    color: ${({ colors }) => colors.unit};
    margin-left: 1px;
  }
`

const Wrap = styled.div`
  position: relative;
  margin-bottom: 30px;
`

const StyledIcon = styled(Icon)`
  position: absolute;
  top: -5px;
  color: ${colors.darkGray}};
  svg {
    width: 22px;
    height: 22px;
  }
`

class ImpactSlider extends Component {
  renderTooltip = dotValue => {
    const { intl: { formatMessage }, timeValues } = this.props
    const TooltipValueColor = {}

    const timeValue = timeValues[dotValue]

    switch (timeValue.humanReadable.unit) {
      case TimeValueAbbreviations.MINUTES:
        TooltipValueColor.unit = colors.green
        TooltipValueColor.bg = colors.gentlyGreen

        break
      case TimeValueAbbreviations.HOURS:
        TooltipValueColor.unit = colors.ocean
        TooltipValueColor.bg = colors.gentlyGreen

        break
      case TimeValueAbbreviations.DAYS:
        TooltipValueColor.unit = colors.blue
        TooltipValueColor.bg = colors.gentlyBlue

        break
    }

    return (
      <TooltipValue colors={TooltipValueColor}>
        <div>
          {timeValue.humanReadable.value}
          <span>
            <FormattedPlural
              value={timeValues[dotValue].humanReadable.value}
              one={formatMessage({ 
                id: `app.actions.timeValues.one.${timeValue.humanReadable.unit}` 
              })}
              other={formatMessage({ 
                id: `app.actions.timeValues.other.${timeValue.humanReadable.unit}`
              })}
            />
          </span>
        </div>
      </TooltipValue>
    )
  }

  slider = React.createRef()

  render() {
    const {
      icon,
      onAfterChange,
      onChange,
      value,
      timeValues,
    } = this.props

    return (
      <Wrap>
        <StyledIcon component={() => icon} />
        <SliderWrap>
          <Slider
            dots
            range
            value={value}
            max={Object.keys(timeValues).length - 1}
            tipFormatter={this.renderTooltip}
            onAfterChange={() => {
              this.slider.current.blur()
              onAfterChange()
            }}
            onChange={onChange}
            tooltipVisible
            ref={this.slider}
          />
        </SliderWrap>
      </Wrap>
    )
  }
}


ImpactSlider.propTypes = {
  defaultValue: PropTypes.array,
  icon: PropTypes.element.isRequired,
  onAfterChange: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.array.isRequired,
}

export default injectIntl(ImpactSlider)
