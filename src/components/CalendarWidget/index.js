import React, { Component, Fragment } from 'react'
import * as Ant from 'antd'
import moment from 'moment'
import get from 'lodash/get'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import DateSelector from './../../components/DateSelector'
import Calendar from './../Calendar'
import media from './../../utils/mediaQueryTemplate'

const Tabs = styled(Ant.Tabs)`
  .ant-tabs-bar {
    border-bottom: none;
    margin-bottom: -35px;
    margin-left: 200px;
    width: calc(100% - 200px);
    ${media.phone`
      width: auto;
      margin-left: 100px;
    `}
  }

  .ant-tabs-nav-scroll {
    text-align: right;
  }

  .ant-tabs-tab {
    font-size: 16px;
    padding: 12px 0;
    margin-right: 23px;
  }
`

class CalendarWidget extends Component {
  state = {
    calendarDate: moment(),
  }

  handleCalendarDateChange = date => {
    this.setState({ calendarDate: date })
  }

  render() {
    const { activeDays } = this.props
    const { calendarDate } = this.state
    return (
      <Fragment>
        <Tabs animated={false} defaultActiveKey="month">
          <Tabs.TabPane tab="Month" key="month">
            <DateSelector
              method="months"
              date={calendarDate}
              onChange={this.handleCalendarDateChange}
            />
            <Calendar.Month
              activeDays={get(
                activeDays,
                `${calendarDate.year()}.${calendarDate.month()}`,
                [],
              )}
              month={calendarDate.month()}
              year={calendarDate.year()}
            />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Year" key="year">
            <DateSelector
              method="years"
              date={calendarDate}
              onChange={this.handleCalendarDateChange}
            />
            <Calendar.Year
              activeDays={get(activeDays, calendarDate.year(), {})}
              year={calendarDate.year()}
            />
          </Tabs.TabPane>
        </Tabs>
      </Fragment>
    )
  }
}

CalendarWidget.propTypes = {
  activeDays: PropTypes.object.isRequired,
}

export default CalendarWidget
