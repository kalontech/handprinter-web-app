import styled, { css } from 'styled-components'
import { Layout, Popover, Affix, Button } from 'antd'
import media from 'utils/mediaQueryTemplate'
import hexToRgba from 'utils/hexToRgba'
import colors from 'config/colors'

import CollapsedMenu from 'components/CollapsedMenu'

import { PrimaryButton } from 'components/Styled'

export const LeftAlignPublic = styled.div`
  margin-right: 34px;
`

export const RightAlign = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  flex: 1;
`
export const CenterAlign = styled.div`
  display: flex;
  align-items: center;
`
export const LogoImg = styled.img`
  margin-right: 10px;
`
export const ImgRightIndent = styled.img`
  margin-right: 5px;
`
export const ImgLeftIndent = styled.img`
  margin-left: 5px;
`

export const HeaderWrap = styled(Layout.Header)`
  position: relative;
  z-index: 970;
  background: ${colors.white};
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  font-family: ${({ font }) => font || '"Noto Sans", sans-serif'};
  ${media.largeDesktop`
    padding: 0 34px;
    flex-direction: row-reverse;
  `}
  ${media.phone`
    height: 70px;
    padding: 0 15px;
  `}
  .ant-menu-item {
    padding: 0;
    border-bottom: 3px solid transparent;
    font-size: 16px;
    a {
      color: ${({ fontColor }) => fontColor || colors.darkGray};
    }

    &:hover,
    &.ant-menu-item-active {
      color: ${hexToRgba(colors.dark, 0.8)};
      border-bottom: 3px solid transparent;
      a {
        color: inherit;
      }
    }

    &.ant-menu-item-selected {
      border-color: inherit;
      color: ${colors.dark};

      ${props =>
        !props.isLoggedIn &&
        css`
          border-bottom: 3px solid transparent;
        `}

      a {
        color: inherit;
      }
    }
  }

  .ant-menu {
    border: none;
  }
`

export const LeftMenu = styled.div`
  display: flex;
  align-items: center;

  .ant-menu-item {
    margin-right: 34px;
    line-height: 85px;
  }
`

export const CenterMenu = styled(LeftMenu)`
  flex: 1;
  display: flex;
  justify-content: center;
  .ant-menu-item {
    margin-right: 40px;
  }
  .ant-menu-horizontal {
    border-color: ${({ borderColor }) => borderColor || colors.green};
  }
`

export const RightMenu = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  a {
    display: inline-flex;
    margin-left: 35px;
  }

  .ant-button {
    border-radius: 6px;
  }
`

export const Logo = styled.div`
  margin-right: 40px;
`

export const LogoSmall = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-start;
  ${media.largeDesktop`
    justify-content: flex-end;
    a {
      display: flex;
      justify-content: center;
      margin-left: -20px;
    }
  `}
`

export const MenuWrap = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;

  .ant-menu-horizontal {
    border-color: ${({ borderColor }) => borderColor || colors.green};
  }
`

export const Avatar = styled.div`
  height: 42px;
  width: 42px;
  box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.1);
  border-radius: 50px;
  background: ${colors.white};
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${colors.green};
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
`

export const Name = styled.p`
  font-size: 19px;
  line-height: 27px;
  color: inherit;
`

export const Email = styled.p`
  color: ${colors.darkGray};
`

export const Links = styled.div`
  position: relative;
  margin-top: 37px;
  &:before {
    position: absolute;
    top: -20px;
    left: -10px;
    right: -10px;
    content: '';
    height: 1px;
    background: ${hexToRgba(colors.dark, 0.17)};
  }
  a {
    display: block;
    margin-bottom: 10px;
    font-size: 16px;
    line-height: 20px;
  }
`
export const UserInfo = styled.div`
  padding: 8px 4px;
  color: ${({ fontColor }) => fontColor || colors.darkGray};
`

export const Hamburger = styled.div`
  display: flex;
  align-items: center;
  color: ${colors.darkGray};
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    color: ${colors.dark};
  }
`

export const CollapseMenu = styled(CollapsedMenu)`
  z-index: 2;
  position: fixed;
  top: 89px;
  bottom: 0;
  left: 0;
  width: 100%;
  background: ${colors.white};
  color: ${colors.dark};
  overflow: auto;
  ${media.phone`
    top: 70px;
  `}
`

export const CollapseTop = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 35px 80px;
  background: ${colors.lightGray};

  ${media.phone`
    flex-direction: column;
    justify-content: center;
    padding: 35px 15px;
  `}
  a {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-right: 15px;
    &:last-child {
      margin-right: 0;
      margin-bottom: 0;
    }
    .ant-btn {
      width: 100%;
    }
    ${media.phone`
      margin-bottom: 10px;
      margin-right: 0;
    `}
  }
`
export const CollapseSubmenuTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  font-size: 16px;
  padding: 0 45px;
  ${media.phone`
    padding: 0 15px;
  `}
`

export const CollapseContent = styled.div`
  padding: 0 35px;
  .ant-menu-inline {
    border: none;
    .ant-menu-item {
      padding-left: 0;
      margin: 0;
      padding-right: 0;
      border-bottom: 1px solid ${hexToRgba(colors.dark, 0.17)};
      height: auto;
      font-size: 16px;
      color: ${colors.dark};
      &.ant-menu-item-active,
      &.ant-menu-item-selected {
        background: none;
        color: ${colors.dark};
        &:after {
          display: none;
        }
      }
      a {
        padding: 0 45px;
        line-height: 80px;
        white-space: nowrap;
        color: inherit;
        ${media.phone`
          padding: 0 15px;
        `}
      }
    }

    .ant-menu-submenu {
      padding: 20px 0;
      border-bottom: 1px solid ${hexToRgba(colors.dark, 0.17)};
      .ant-menu-submenu-title {
        height: auto;
      }
      .ant-menu-item {
        border: none;
        height: auto;
        margin-top: 25px;
        line-height: normal;
        color: ${colors.green};
        a {
          padding-left: 105px;
          line-height: normal;
          color: inherit;
          ${media.phone`
            padding-left: 30px;
          `}
        }
      }
    }

    .ant-menu-submenu-arrow {
      display: none;
    }

    .ant-menu-submenu-open {
      .anticon {
        transform: rotate(-180deg);
      }
    }

    .anticon {
      margin-right: -15px;
      transition: transform 0.3s;
      ${media.phone`
       margin-right: 0;
      `}
    }

    .ant-menu-submenu-title {
      padding-left: 0;
      padding-right: 0;
      margin: 0;
      display: flex;
      overflow: visible;
      color: ${colors.dark};
    }
  }
  ${media.phone`
    padding: 0 15px;
  `}
`

export const ProfileSettingsPopover = styled(Popover)`
  .ant-popover-content .ant-popover-arrow {
    top: 3px;
  }
`

export const ProfileMenu = styled.div`
  color: inherit;

  .menu-item__user-data {
    flex-grow: 1;
  }

  .menu-item__user-data > p:last-child {
    max-width: 100%;
    white-space: normal;
    word-break: break-all;
  }

  div${Avatar} {
    margin-right: 15px;
  }

  p${Name} {
    color: ${colors.dark};
  }
`

export const StyledAffix = styled(Affix)`
  .ant-affix {
    z-index: 970;
    width: 100% !important;
    box-shadow: 0 1px 10px 0 ${hexToRgba(colors.dark, 0.08)};
  }
`

export const BlueBorderedButton = styled(Button)`
  border: 2px solid ${colors.darkBlue};
  background: transparent;
  border-radius: 0;
  color: ${colors.darkBlue};
  &&:hover,
  &&:focus {
    border-color: ${colors.darkBlue};
    background: ${colors.darkBlue};
    color: ${colors.white};
  }
`

export const GrayBorderedButton = styled(Button)`
  border: 1px solid ${colors.interfaceFooterColor2};
  background: transparent;
  border-radius: 2px;
  color: ${colors.interfaceFooterColor2};
  &&:hover,
  &&:focus {
    border-color: ${colors.interfaceFooterColor2};
    background: ${colors.interfaceFooterColor2};
    color: ${colors.white};
  }
`

export const StyledNotificationsPopover = styled(Popover)`
  .ant-popover-inner-content {
    padding: 0;
  }
  .ant-popover-content .ant-popover-arrow {
    top: 3px;
    background-color: ${colors.green};
    border-color: ${colors.green};
  }
`

export const NotificationPopoverTitle = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  margin-right: 17px;
  width: 50px;
  ${media.largeDesktop`
    margin-right: 0;
  `}
  img {
    cursor: pointer;
    opacity: 0.4;
  }
`

export const NotificationCount = styled.div`
  width: 15px;
  height: 15px;
  position: absolute;
  top: 5px;
  right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: ${colors.orange};
  font-family: ${({ fontNames }) => fontNames || '"Noto Sans", sans-serif'};
  font-weight: bold;
  line-height: 10px;
  font-size: 10px;
  color: ${colors.white};

  ${media.largeDesktop`
    top: -5px;
  `}
`

export const TakeActionButton = styled(PrimaryButton)`
  color: ${colors.white};
  background-color: ${colors.green};
  min-width: 140px;
  margin-left: 25px;
  font-size: 14px;
  &:focus,
  &:active,
  &:hover {
    color: ${colors.white};
  }
  ${media.desktop`
    margin-left: 0px;
    min-width: 274px;
  `}
`

export const UnitsBlock = styled.div`
  position: absolute;
  top: 34px;
  right: 100px;
  width: 44px;
  height: 22px;
  border-radius: 50px;
  background-color: ${colors.switchUnitsBackground};
  margin-right: 31px;
  cursor: pointer;
  z-index: 0.1;

  ${media.largeDesktop`
    top: 30px;
    right: 13px;
  `}

  ${media.desktop`
    top: 30px;
    right: 12px;
  `}

  ${media.phone`
    top: 30px;
    right: -22px;
  `}
`

export const SVGAtomWrap = styled.div`
  cursor: pointer;
  position: absolute;
  top: 2px;
  left: 2px;
  path {
    fill: ${props => props.color};
  }
  circle {
    fill: ${props => props.backColor};
  }
`

export const SVGClockWrap = styled.div`
  cursor: pointer;
  position: absolute;
  top: 2px;
  right: 20px;
  path {
    fill: ${props => props.color};
  }
  circle {
    fill: ${props => props.backColor};
  }
`

export const UnitsPopover = styled(Popover)``

export const PopoverWrapper = styled.div`
  background-color: ${colors.lightBlack};
  display: flex;
  flex-direction: column;
  .ant-popover-inner {
    background-color: ${colors.lightBlack} !important;
  }
  .ant-popover-inner-content {
    padding: 0;
    background-color: ${colors.lightBlack} !important;
  }
`

export const PopoverText = styled.text`
  width: 100%;
  font-family: Noto Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  color: ${colors.white};
`

export const ResponsiveLoginWrap = styled.div`
  padding-top: 20px;
`

export const UnitsSwitch = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 80px;

  ${media.largeDesktop`
    padding-left: 44px;
  `}

  ${media.desktop`
    padding-left: 44px;
  `}

  ${media.phone`
    padding-left: 14px;
  `}
`

export const ImpactLabelWrapper = styled.div`
  position: absolute;
  right: 225px;
  width: 74px;
`
