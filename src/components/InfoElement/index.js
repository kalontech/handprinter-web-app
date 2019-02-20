import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled, { css } from 'styled-components'

import Tooltip from 'components/Tooltip'
import colors from 'config/colors'

const IconWrap = styled.div`
  border: 2px solid ${colors.gray};
  ${props =>
    props.showTooltip
      ? css`
          color: ${colors.white};
          background-color: ${colors.gray};
        `
      : css`
          color: ${colors.gray};
          background-color: transparent;
        `}

  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: 0.3s all;
`

const Icon = styled.div`
  font-size: 16px;
  font-family: Arial;
  font-weight: bold;
  line-height: 0 !important;
`

export const INFO_ELEMENT_TYPES = {
  INFO: 'info',
  QUESTION: 'question',
}

class InfoElement extends Component {
  state = {
    showTooltip: false,
  }

  toggleTooltipVisible = showTooltip => {
    this.setState({ showTooltip })
  }

  getIcon = type => {
    switch (type) {
      case INFO_ELEMENT_TYPES.INFO:
        return 'i'
      case INFO_ELEMENT_TYPES.QUESTION:
        return '?'
      default:
        return 'i'
    }
  }

  render() {
    const { type, tooltipProps } = this.props
    const { showTooltip } = this.state

    return (
      <Tooltip onVisibleChange={this.toggleTooltipVisible} {...tooltipProps}>
        <IconWrap showTooltip={showTooltip}>
          <Icon>{this.getIcon(type || INFO_ELEMENT_TYPES.INFO)}</Icon>
        </IconWrap>
      </Tooltip>
    )
  }
}

InfoElement.propTypes = {
  tooltipProps: {
    placement: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  },
  type: PropTypes.objectOf(Object.keys(INFO_ELEMENT_TYPES)),
}

export default InfoElement
