import React, { useState } from 'react'
import { FormattedMessage } from 'react-intl'
import CalendarWidget from 'components/CalendarWidget'
import moment from 'moment'
import _ from 'lodash'
import { Modal } from 'components/Styled'

import { Select } from 'antd'

import {
  Container,
  CalendarStyled,
  ViewFullCalendar,
  CalendarWidgetWrapper,
  Button,
  FlexRow,
  DropdownItem,
  DropdownItemText,
} from './styled'
import Month from '../../../components/Calendar/month'
import { IMPACTS } from '../../../utils/constants'
import { StyledIcon } from '../NetPositiveDays/styled'

export default function Calendar(props) {
  const { isReturnUser, calendar } = props
  const [calendarDate, setCalendarDate] = useState(moment())
  const [modalVisible, setModalVisible] = useState(false)
  const [category, setCategory] = useState(IMPACTS[0].name)
  if (!calendar || !isReturnUser) return null

  const handleLeftButtonClick = () =>
    setCalendarDate(moment(calendarDate).subtract(1, 'month'))

  const handleRightButtonClick = () =>
    setCalendarDate(moment(calendarDate).add(1, 'month'))

  return (
    <Container>
      <Select
        defaultValue={category}
        style={{ width: '100%', marginBottom: 24 }}
        onChange={val => setCategory(val)}
      >
        {IMPACTS.map(category => (
          <Select.Option key={category.name} value={category.name}>
            <DropdownItem>
              <StyledIcon component={() => category.icon} />
              <DropdownItemText>{category.name}</DropdownItemText>
            </DropdownItem>
          </Select.Option>
        ))}
      </Select>
      <FlexRow>
        <Button onClick={handleLeftButtonClick} type="left" />
        <CalendarStyled>
          <Month
            activeDays={_.get(
              calendar,
              `${category}.${calendarDate.year()}.${calendarDate.month()}`,
              [],
            )}
            month={calendarDate.month()}
            year={calendarDate.year()}
            tiny
          />
        </CalendarStyled>
        <Button onClick={handleRightButtonClick} type="right" />
      </FlexRow>

      <ViewFullCalendar onClick={() => setModalVisible(true)}>
        <FormattedMessage id="viewCompleteCalendar" />
      </ViewFullCalendar>
      <Modal
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        centered
        destroyOnClose
        footer={null}
        width="auto"
      >
        <CalendarWidgetWrapper>
          <CalendarWidget activeDays={calendar && calendar['climate']} />
        </CalendarWidgetWrapper>
      </Modal>
    </Container>
  )
}

Calendar.propTypes = {
  isReturnUser: Boolean,
  calendar: Object,
}
