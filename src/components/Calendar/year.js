import React, { Fragment } from 'react'
import { Col, Row } from 'antd'
import get from 'lodash/get'
import times from 'lodash/times'
import PropTypes from 'prop-types'

import Month from './month'

const Year = ({ activeDays, year }) => (
  <Fragment>
    {times(3, x => (
      <Row gutter={20}>
        {times(4, y => {
          const month = x * 4 + y
          return (
            <Col span={6}>
              <Month
                activeDays={get(activeDays, month, [])}
                month={month}
                tiny
                year={year}
              />
            </Col>
          )
        })}
      </Row>
    ))}
  </Fragment>
)

Year.propTypes = {
  activeDays: PropTypes.object.isRequired,
  year: PropTypes.number.isRequired,
}

export default Year
