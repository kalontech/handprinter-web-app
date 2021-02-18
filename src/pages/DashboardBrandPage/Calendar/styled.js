import styled from 'styled-components'
import colors from 'config/colors'
import { Icon } from 'antd'

export const Container = styled.div`
  background-color: ${colors.white};
  border-radius: 12px;
  padding: 15px 11px;
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .ant-select-arrow {
    display: none;
  }
`

export const CalendarStyled = styled.div`
  width: 170px;
  align-self: center;
`

export const FlexRow = styled.div`
  flex-direction: row;
  display: flex;
  justify-content: space-around;
  align-items: center;
`

export const CalendarWidgetWrapper = styled.div`
  padding: 40px;
`

export const ViewFullCalendar = styled.p`
  font-family: Noto Sans;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  text-decoration-line: underline;
  color: ${colors.dark};
  cursor: pointer;
  margin-top: 24px;
`

export const Button = styled(Icon)`
  color: ${colors.green};
  cursor: pointer;
  padding: 5px;
`

export const DropdownItem = styled.div`
  align-items: center;
  display: flex;
`

export const DropdownItemText = styled.span`
  font-family: Noto Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  color: ${colors.dark};
  text-transform: capitalize;
  margin-left: 12px;
`
