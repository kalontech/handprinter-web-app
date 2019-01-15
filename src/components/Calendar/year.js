import React, { Fragment } from 'react'
import { Col, Row } from 'antd'
import get from 'lodash/get'
import times from 'lodash/times'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import media from './../../utils/mediaQueryTemplate'
import Month from './month'

const Wrap = styled.div`
  ${media.phone`
    margin-top: 35px;
  `}
` 

const StyledCol = styled(Col)`
  ${media.phone`
    margin-bottom: 25px;
  `}
`

const Year = ({ activeDays, year }) => (
  <Wrap>
    {times(3, x => (
      <Row gutter={20}>
        {times(4, y => {
          const month = x * 4 + y
          return (
            <StyledCol span={6} xs={12} sm={6}>
              <Month
                activeDays={get(activeDays, month, [])}
                month={month}
                tiny
                year={year}
                isYearView={true}
              />
            </StyledCol>
          )
        })}
      </Row>
    ))}
  </Wrap>
)

Year.propTypes = {
  activeDays: PropTypes.object.isRequired,
  year: PropTypes.number.isRequired,
}

export default Year
