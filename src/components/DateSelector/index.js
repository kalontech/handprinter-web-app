import React from 'react'
import { Icon } from 'antd'
import styled from 'styled-components'
import PropTypes from 'prop-types'

import colors from 'config/colors'

const Container = styled.div`
  align-items: center;
  display: flex;
`

const Button = styled(Icon)`
  color: ${colors.green};
  cursor: pointer;
  padding: 5px;
`

const CurrentYear = styled.div`
  color: ${colors.dark};
  font-size: 16px;
  line-height: 21px;
  padding-bottom: 1px;
  margin: 0 3px;
`

const DateSelector = ({ method, date, onChange }) => {
  const handleLeftButtonClick = () => {
    onChange(date.subtract(1, method))
  }
  const handleRightButtonClick = () => {
    onChange(date.add(1, method))
  }
  return (
    <Container>
      <Button onClick={handleLeftButtonClick} type="left" />
      {method === 'months' && (
        <CurrentYear>{date.format('MMMM YYYY')}</CurrentYear>
      )}
      {method === 'years' && <CurrentYear>{date.format('YYYY')}</CurrentYear>}
      <Button onClick={handleRightButtonClick} type="right" />
    </Container>
  )
}

DateSelector.propTypes = {
  method: PropTypes.oneOf(['months', 'years']).isRequired,
  date: PropTypes.shape({
    add: PropTypes.func.isRequired,
    substract: PropTypes.func.isRequired,
  }),
  onChange: PropTypes.func.isRequired,
}

export default DateSelector
