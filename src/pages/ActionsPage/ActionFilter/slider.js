import React, { Component, Fragment } from 'react'
import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'
import { Slider, Icon, Select } from 'antd'
import {
  FormattedPlural,
  injectIntl,
  intlShape,
  FormattedMessage,
} from 'react-intl'

import colors from 'config/colors'
import media from 'utils/mediaQueryTemplate'
import { Animate } from 'react-animate-mount'
import Tooltip from 'components/Tooltip'
import { IMPACT_CATEGORIES } from 'utils/constants'

const SliderWrap = styled.div`
  max-width: 95%;
  margin: 0 0 0 5%;

  ${media.phone`
    display: none;
  `}

  .ant-slider-rail {
    background: ${colors.gray};
  }
  .ant-slider-track {
    background-color: ${colors.lightGreen};
  }
  .ant-slider {
    margin-left: 316px;
    margin-bottom: 39px;
    ${media.tablet`
      margin-left: 246px;
    `}
    ${media.phone`
      display: none;
    `}
    &:hover {
      .ant-slider-track {
        background-color: ${colors.lightGreen};
      }
    }
  }
  .ant-slider-dot,
  ant-slider-dot-active {
    border: none;
    background-color: transparent;
  }

  .ant-slider-handle {
    &:focus {
      box-shadow: none;
    }
  }
`

const TooltipValue = styled.div`
  font-size: 14px;
`

const Wrap = styled.div`
  position: relative;
  margin-bottom: 30px;
  ${media.phone`
    max-width: 300px;
    width: 100%;
    margin-bottom: 8px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  `}
  .ant-select-selection {
    border: none;
  }
`

const StyledIcon = styled(Icon)`
  position: absolute;
  top: -5px;
  left: 8px;
  color: ${colors.lightGreen}};
  cursor: pointer;
  ${media.phone`
    position: initial;
    left: 8px;
  `}
  svg {
    width: 22px;
    height: 22px;
  }
`

const StyledSelectWrap = styled.div`
  position: absolute;
  top: -14px;
  left: 53px;
  color: ${colors.darkGray}};
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  ${media.phone`
    position: initial;
  `}
  svg {
    display: none;
  }
  .ant-select-dropdown-menu-item {
    &:hover {
      background-color: ${colors.lightGray};
    }
  }
  .ant-select-dropdown-menu-item-selected,
  .ant-select-dropdown-menu-item-selected:hover {
    background-color: ${colors.lightGray};
  }
`

const StyledDeviderWrap = styled.div`
  display: inline-block;
  height: 40px
  width: 45px;
  position: relative;
  top: 1px;
`

const StyledDevider = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`

const StyledSelect = styled(Select)`
  .ant-select-selection-selected-value {
    padding: 0;
  }
  .ant-select-selection__rendered {
    margin: 0;
  }
  .ant-select-selection {
    border-radius: 5px;
    padding: 0;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 117px;
    ${props =>
      props.right &&
      css`
        border-left: none;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
      `}
    ${props =>
      props.left &&
      css`
        border-right: none;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      `}
    ${media.tablet`
      width: 75px;
    `}
    ${media.phone`
      width: 102px;
    `}
  }
`

const DROPDOWN_TYPE = {
  FROM: 'FROM',
  TO: 'TO',
}

class ImpactSlider extends Component {
  renderTooltip = dotValue => {
    const { timeValues } = this.props
    const timeValue = timeValues[dotValue]

    return (
      <Animate show={this.props.showFilter} type="fade" duration={0}>
        <TooltipValue>{this.renderTimeValue(timeValue)}</TooltipValue>
      </Animate>
    )
  }

  renderTimeValue = timeValue => {
    const {
      intl: { formatMessage },
    } = this.props
    return (
      <Fragment>
        {timeValue.humanReadable.value}
        <span>
          &nbsp;
          <FormattedPlural
            value={timeValue.humanReadable.value}
            one={formatMessage({
              id: `app.actions.timeValues.one.${timeValue.humanReadable.unit}`,
            }).toLowerCase()}
            other={formatMessage({
              id: `app.actions.timeValues.other.${
                timeValue.humanReadable.unit
              }`,
            }).toLowerCase()}
          />
        </span>
      </Fragment>
    )
  }

  $slider = React.createRef()
  $dropdownWrap = React.createRef()

  async hanldleSelectChange(selectValue, type) {
    const { onChange, value } = this.props
    const values = [...value]
    if (type === DROPDOWN_TYPE.FROM) {
      if (selectValue > values[1]) return
      values.splice(0, 1, selectValue)
    } else {
      if (selectValue < values[0]) return
      values.splice(1, 1, selectValue)
    }
    onChange(values)
    this.$slider.current.blur()
  }

  render() {
    const { icon, onChange, value, timeValues, impactCategory } = this.props
    return (
      <Wrap>
        <Tooltip
          title={() => (
            <FormattedMessage id={`app.impactCategories.${impactCategory}`} />
          )}
          arrowPointAtCenter={true}
        >
          <StyledIcon component={() => icon} />
        </Tooltip>
        <StyledSelectWrap ref={this.$dropdownWrap}>
          <StyledSelect
            left
            value={value[0]}
            onChange={e => this.hanldleSelectChange(e, DROPDOWN_TYPE.FROM)}
            getPopupContainer={() => this.$dropdownWrap.current}
          >
            {timeValues.map((timeValue, i) => (
              <Select.Option value={i} key={i}>
                {this.renderTimeValue(timeValue)}
              </Select.Option>
            ))}
          </StyledSelect>
          <StyledDeviderWrap>
            <StyledDevider>~</StyledDevider>
          </StyledDeviderWrap>
          <StyledSelect
            right
            value={value[1]}
            onChange={e => this.hanldleSelectChange(e, DROPDOWN_TYPE.TO)}
            getPopupContainer={() => this.$dropdownWrap.current}
          >
            {timeValues.map((timeValue, i) => (
              <Select.Option value={i} key={i}>
                {this.renderTimeValue(timeValue)}
              </Select.Option>
            ))}
          </StyledSelect>
        </StyledSelectWrap>
        <SliderWrap>
          <Slider
            dots
            range
            value={value}
            max={Object.keys(timeValues).length - 1}
            tipFormatter={this.renderTooltip}
            onChange={onChange}
            ref={this.$slider}
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
  intl: intlShape.isRequired,
  timeValues: PropTypes.any,
  showFilter: PropTypes.bool.isRequired,
  impactCategory: PropTypes.oneOf(Object.values(IMPACT_CATEGORIES)),
}

export default injectIntl(ImpactSlider)
