import React, { Component, Fragment } from 'react'
import calendar from 'calendar-month-array'
import styled, { css } from 'styled-components'
import moment from 'moment'
import PropTypes from 'prop-types'

import colors from 'config/colors'
import media from 'utils/mediaQueryTemplate'

const WeekRow = styled.div`
  display: flex;
  ${props =>
    props.tiny &&
    css`
      height: 15px;
      width: 100%;
    `};
`

const WeekDay = styled.div`
  flex: 1;
  padding: 8px 0;

  ${props =>
    props.tiny &&
    css`
      padding: 2px 0;
    `};

  &,
  > div,
  > div > div {
    align-items: center;
    display: flex;
    justify-content: center;
  }

  > div {
    width: 100%;
    height: 35px;
    ${media.phone`
      height: auto;
      font-weight: bold;
    `}

    ${props =>
      props.active &&
      css`
        background-color: ${colors.lightGreen};
      `};

    ${props =>
      props.activeStarts &&
      css`
        border-radius: 27.5px 0px 0px 27.5px;
      `};

    ${props =>
      props.activeEnds &&
      css`
        border-radius: 0 27.5px 27.5px 0;
      `};

    ${props =>
      props.activeStarts &&
      css`
        border-radius: 27.5px 0 0 27.5px;
      `};

    ${props =>
      props.activeStarts &&
      props.activeEnds &&
      css`
        border-radius: 27.5px 27.5px 27.5px 27.5px;
      `};

    ${props =>
      props.tiny &&
      css`
        height: 15px;
      `};

    ${props =>
      props.active &&
      props.current &&
      props.activeStarts &&
      !props.tiny &&
      css`
        background: linear-gradient(
          to right,
          white 50%,
          ${colors.lightGreen} 50%
        );
      `};

    ${props =>
      props.active &&
      props.current &&
      props.activeEnds &&
      !props.tiny &&
      css`
        background: linear-gradient(
          to left,
          white 50%,
          ${colors.lightGreen} 50%
        );
      `};
  }

  > div > div {
    color: ${colors.darkGray};
    border-radius: 100%;
    height: 42px;
    font-size: 16px;
    line-height: 21px;
    width: 42px;

    ${media.phone`
      height: 32px;
      width: 32px;
    `}

    ${props =>
      props.current &&
      css`
        background-color: ${colors.white};
        border: 2px solid ${colors.blue};

        ${props =>
          props.tiny &&
          css`
            background-color: ${colors.blue};
            color: ${colors.white};
            border: none;
            padding: 7px;
          `};
      `};

    ${props =>
      props.tiny &&
      css`
        font-size: 10px;
        line-height: 10px;
        height: 12px;
        width: 12px;
        font-weight: bold;
        color: ${colors.dark};
        ${media.phone`
          height: 12px;
          width: 12px;
        `}
        ${props =>
          props.current &&
          css`
            color: ${colors.white};
          `}
      `};
  }
`

const WeekDayName = styled(WeekDay)`
  border-bottom: 1px solid ${colors.gray};
  padding: 0 0 15px;
  margin-bottom: 23px;

  ${media.phone`
    padding: 0 0 8px;
  `}

  ${props =>
    props.tiny &&
    css`
      border-bottom: none;
      margin-bottom: 5px;
      padding: 0;
    `};

  > div > div {
    font-size: 10px;
    font-weight: bold;
    line-height: 17px;
    text-transform: uppercase;

    ${props =>
      props.tiny &&
      css`
        line-height: 10px;
        ${props =>
          props.isHeader &&
          css`
            color: ${colors.darkGray};
          `}
      `};
  }
`

const MonthTextValue = styled.div`
  text-align: center;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 10px;
  color: ${colors.black};
  margin-bottom: 4px;
`

class Month extends Component {
  date = moment()

  isActive = day => {
    const { activeDays } = this.props
    return activeDays.includes(day)
  }

  isActiveEnds = day => {
    const { activeDays } = this.props
    return !activeDays.includes(day + 1)
  }

  isActiveStarts = day => {
    const { activeDays } = this.props
    return !activeDays.includes(day - 1)
  }

  isCurrent = day => {
    const { month, year } = this.props
    return (
      this.date.date() === day &&
      this.date.month() === month &&
      this.date.year() === year
    )
  }

  renderHeader = (days, key) => {
    const { tiny } = this.props
    return (
      <WeekRow key={key} tiny={tiny}>
        {days.map(day => (
          <WeekDayName key={key} tiny={tiny} isHeader>
            <div>
              <div>{day}</div>
            </div>
          </WeekDayName>
        ))}
      </WeekRow>
    )
  }

  renderMonth = weeks => {
    return (
      <Fragment>
        {this.renderHeader(weeks[0])}
        {weeks.slice(1).map(this.renderWeek)}
      </Fragment>
    )
  }

  renderWeek = (days, weekKey) => {
    const { tiny } = this.props
    return (
      <WeekRow key={weekKey} tiny={tiny}>
        {days.map((day, dayKey) => (
          <WeekDay
            active={this.isActive(parseFloat(day))}
            activeStarts={dayKey === 0 || this.isActiveStarts(parseFloat(day))}
            activeEnds={dayKey === 6 || this.isActiveEnds(parseFloat(day))}
            current={this.isCurrent(parseFloat(day))}
            key={dayKey}
            tiny={tiny}
          >
            <div>
              <div>{day}</div>
            </div>
          </WeekDay>
        ))}
      </WeekRow>
    )
  }

  render() {
    const { month, tiny, year } = this.props
    return (
      <Fragment>
        {tiny && (
          <MonthTextValue>
            {moment()
              .month(month)
              .format('MMMM')}
          </MonthTextValue>
        )}
        {this.renderMonth(
          calendar(new Date(year, month), {
            weekStartDay: 1,
            formatHeader: date => date.toString().slice(0, tiny ? 1 : 3),
            formatDate: date => date.getDate().toString(),
            formatSiblingMonthDate: () => '',
          }),
        )}
      </Fragment>
    )
  }
}

Month.propTypes = {
  activeDays: PropTypes.object.isRequired,
  month: PropTypes.number.isRequired,
  tiny: PropTypes.bool,
  year: PropTypes.number.isRequired,
}

export default Month
