import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import colors from 'config/colors'

const View = styled.div`
  display: flex;
  flex-direction: row;
  position: absolute;
  top: 30px;
  left: 20px;
`

const Step = styled.div`
  background-color: ${props => props.active && colors.green};
  width: 20px;
  height: 6px;
  border: ${props => (props.active ? '0px' : `1px solid #D7DBDB`)};
  margin-right: 1px;
`

const OrganizationCreationSteps = ({ steps = 3, active = 1 }) => {
  const renderStep = step => {
    return <Step key={step} active={active > step} />
  }
  return (
    <View>{Array.from({ length: steps }, (v, i) => i).map(renderStep)}</View>
  )
}

OrganizationCreationSteps.propTypes = {
  steps: PropTypes.number,
  active: PropTypes.number,
}

export default OrganizationCreationSteps
