import React from 'react'
import { Col, Row } from 'antd'
import get from 'lodash/get'
import times from 'lodash/times'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import media from 'utils/mediaQueryTemplate'

import Month from './month'

const Wrap = styled.div`
  margin-top: 38px;
  ${media.tablet`
    margin-top: 55px;
  `}
  ${media.phone`
    margin-top: 38px;
  `}
`

const StyledCol = styled(Col)`
  ${media.phone`
    height: 125px;
    margin-bottom: 8px;
  `}
`

const MonthBlock = styled.div`
  min-width: 117px;
  height: 123px;
  margin: 11.5px 0px;
`

const Year = ({ activeDays, year }) => (
  <Wrap>
    {times(3, x => (
      <Row gutter={20}>
        {times(4, y => {
          const month = x * 4 + y
          return (
            <StyledCol span={6} xs={12} sm={6}>
              <MonthBlock>
                <Month
                  activeDays={get(activeDays, month, [])}
                  month={month}
                  tiny
                  year={year}
                />
              </MonthBlock>
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
