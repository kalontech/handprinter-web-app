import styled from 'styled-components'
import { Select, AutoComplete, Icon } from 'antd'
import { Input as InputAnt, TextMedium } from 'components/Styled'

import media from 'utils/mediaQueryTemplate'

import colors from '../../config/colors'

export const Row = styled.div`
  display: flex;
`

export const RelativeView = styled.div`
  position: relative;
`

export const DropDownContainer = styled.div`
  position: absolute;
  width: 100%;
  background-color: ${colors.lightGray};
  z-index: 1;
  border-radius: 4px;
  box-shadow: 0px 1px 10px rgba(52, 68, 66, 0.08);
  padding-bottom: 9px;
`

export const SearchWrap = styled.div`
  background-color: ${colors.white};
  margin: 9px;
  border: 0px;
  ${media.phone`
    padding: 10px 15px;
  `}

  .ant-select-dropdown,
  .ant-select-dropdown-menu {
    max-height: 402px;
    z-index: 900;
  }
  .ant-select-dropdown-menu-item:hover,
  .ant-select-dropdown-menu-item-active {
    background-color: ${colors.lightGray};
  }
  .ant-select-selected-icon {
    display: none;
  }
`

export const AutoCompleteStyled = styled(AutoComplete)`
  height: 46px;
  width: 100%;

  > div:first-child {
    width: 100%;
  }
`

export const SearchItem = styled(Select.Option)`
  display: flex;
  flex-direction: row;
  align-items: center;
  background: ${colors.white};
  border-radius: 4px;
  margin: 0px;
  overflow: hidden;
`

export const SearchItemImg = styled.img`
  width: 53px;
  height: 68px;
  margin-left: 0px;
  display: inline-block;
  object-fit: cover;
`

export const SearchIcon = styled(Icon)`
  color: ${colors.darkGray};
  font-size: 18px;
`

export const BackIcon = styled(Icon)`
  padding: 5px;
`

export const Input = styled(InputAnt)`
  height: 46px !important;
`

export const SearchHeader = styled.div`
  display: flex;
  background-color: white;
  align-items: center;
  height: 56px;
`

export const SearchHeaderText = styled.span`
  font-size: 16px;
  margin-left: 6px;
  color: ${colors.dark};
`

export const DropdownHeaderText = styled(TextMedium)`
  font-size: 16px;
  background-color: ${colors.white};
  padding: 16px;
`

export const DropdownText = styled(TextMedium)`
  font-size: 14px;
  margin: 0px 9px;
  padding: 13px 7px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  :hover {
    background-color: ${colors.white};
  }
`

export const ArrowImage = styled.img`
  margin-left: 10px;
`

export const SearchItemColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

export const SearchItemHeader = styled(TextMedium)`
  font-size: 14px;
  margin: 8px 8px 0px 8px;
`

export const SearchItemText = styled(TextMedium)`
  font-size: 14px;
  margin: 0px 8px 8px 8px;
  font-style: italic;
  color: ${colors.darkGray};
`
