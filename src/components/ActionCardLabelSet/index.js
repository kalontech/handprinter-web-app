import React from 'react'
import PropTypes from 'prop-types'
import ActionCardLabel from '../ActionCardLabel'
import styled from 'styled-components'

const CardLabelWrap = styled.div`
  display: flex;
  position: absolute;
  left: 20px;
  bottom: 20px;
`

const ActionCardLabelSet = props => {
  const { arr } = props
  return (
    <CardLabelWrap>
      {arr.map((item, index) => (
        <ActionCardLabel
          key={index}
          category={item.category}
          unit={item.unit}
          value={item.value}
          variant={item.variant}
        />
      ))}
    </CardLabelWrap>
  )
}

ActionCardLabelSet.propTypes = {
  arr: PropTypes.array,
}

export default ActionCardLabelSet
