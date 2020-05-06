import styled from 'styled-components'
import colors from 'config/colors'
import media from 'utils/mediaQueryTemplate'
import hexToRgba from 'utils/hexToRgba'
import { DefaultButton } from 'components/Styled'
import { Select, Icon } from 'antd'

export const Wrapper = styled.div`
  background-color: ${colors.lightGray};
  position: relative;
  height: 100%;
  flex-grow: 1;
`

export const InnerContainer = styled.div`
  padding: 20px 0;

  ${media.largeDesktop`
  padding: 15px 0;
`}
`

export const ActionSearchDropdownPicture = styled.div`
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center center;
  width: 70px;
  height: 70px;
  border-radius: 5px;
  margin-right: 10px;
  display: inline-block;
`

export const SearchBlockWrapper = styled.div`
  background-color: ${colors.white};
  padding: 20px;
  ${media.phone`
  margin: 0;
  .ant-popover-content {
    width: 100vw;
  }
  .ant-modal-content {
    height: 100vh;
    .ant-modal-close-x {
      position: absolute;
      top: 15px;
      right: -1px;
    }
    .ant-modal-header {
      padding: 36px 15px 15px;
      .ant-modal-title {
        font-size: 22px;
      }
    }
    .ant-modal-body {
      padding: 15px;
    }
  }
  
  .ant-modal-wrap {
    z-index: 1070;
    overflow: unset;
  }
  .ant-modal-header {
    border-bottom: none;
  }
`}
`

export const SearchField = styled(Select)`
  width: 100%;

  .ant-select-selection--single {
    height: 46px;
  }
  .ant-select-selection__rendered {
    line-height: 46px;
  }

  .ant-select-dropdown-menu-item-active {
    &:focus,
    &:hover {
      background-color: ${colors.lightGray} !important;
    }
  }

  .ant-select-selection-selected-value {
    color: ${colors.darkGray};
  }

  .ant-select-selection__rendered {
    margin: 0 16px;
  }
`

export const StyledSearchIcon = styled(Icon)`
  font-size: 18px;
  color: ${colors.darkGray};
  font-weight: bold;
  position: absolute;
  right: 15px;
  top: 15px;
`

export const SearchWrap = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`

export const NotFoundWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 500px;
  font-size: 24px;
  color: ${colors.darkGray};
`

export const ImpactButton = styled(DefaultButton)`
  min-width: 100%;
  background-color: transparent;
  color: ${props => (props.isModelling ? colors.blue : colors.darkGray)};
  border: 1px solid
    ${props =>
      props.isModelling
        ? hexToRgba(colors.blue, 0.4)
        : hexToRgba(colors.darkGray, 0.4)};
  border-radius: 4px;
  font-weight: 400;

  &&:hover,
  &&:active {
    background-color: transparent;
    color: ${props => (props.isModelling ? colors.blue : colors.dark)};
    border-color: ${props =>
      props.isModelling
        ? hexToRgba(colors.blue, 0.6)
        : hexToRgba(colors.dark, 0.6)};
  }
`

export const ActionSearchDropdownOptionContent = styled.div`
  display: flex;
  align-items: center;
`

export const SearchFieldWrap = styled.div`
  width: 100%;
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

export const FooterSpinner = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
`
