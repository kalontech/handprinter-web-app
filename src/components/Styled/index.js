import * as Ant from 'antd'
import styled, { createGlobalStyle } from 'styled-components'

import hexToRgba from 'utils/hexToRgba'
import arrowDownIcon from 'assets/icons/arrowDown.svg'
import colors from 'config/colors'
import media from 'utils/mediaQueryTemplate'

import backgroundOceanContainerImage from 'assets/images/backgroundOceanContainer.png'

export const ActionCard = styled(Ant.Row)`
  border-radius: 5px;
  overflow: hidden;
  width: 920px;
  position: relative;
  top: -50px;
  height: 579px;
  display: flex;
  justify-content: center;
  ${media.tablet`
    margin-top: 60px;
    height: auto;
  `}
  ${media.phone`
    margin-top: 76px;
    height: auto;
  `}
`

export const ActionCardForgotPasswordBlock = styled.div`
  color: ${colors.darkGray};
  display: flex;
  justify-content: flex-end;
  margin: 12px 0 20px 0;
`

export const ActionCardFormWrapper = styled.div`
  width: 300px;
`

export const ActionCardLeftHalf = styled(Ant.Col)`
  height: 100%;
  background: ${colors.green};
  overflow: hidden;
  ${media.desktop`
    width: 241px;
  `}
  ${media.tablet`
    ${props => props.hideOnTablet && 'display: none;'}
    width: 100%;
  `}
`

export const ActionCardRightHalf = styled(Ant.Col)`
  align-items: center;
  background-color: ${colors.white};
  display: flex;
  height: 100%;
  justify-content: center;
  ${media.tablet`
    width: 100%;
  `}
`

export const PopoverTitle = styled.div`
  display: flex;
  align-items: center;
  line-height: 1;
  color: ${({ color }) => color || colors.darkGray};
  cursor: pointer;
  transition: color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1),
    border-color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1),
    background 0.3s cubic-bezier(0.645, 0.045, 0.355, 1),
    padding 0.15s cubic-bezier(0.645, 0.045, 0.355, 1);

  &:hover {
    color: ${({ hoverColor }) => hoverColor || colors.darkGray};
  }

  &.ant-popover-open {
    color: ${colors.dark};
  }
`

export const HeaderPopover = styled(Ant.Menu)`
  .ant-menu-item {
    display: flex;
    algn-items: center;
    padding: 0 6px;
    margin: 0;
    font-size: 16px;
    color: ${({ color }) => color || colors.darkGray};
    :not(:last-child) {
      margin: 0;
    }
    a {
      color: ${({ color }) => color || colors.darkGray};
    }
    .ant-menu-item-selected,
    :hover {
      background: ${colors.lightGray};
      border-radius: 4px;
    }
  }

  &.ant-menu-item &.ant-menu-inline,
  &.ant-menu-vertical,
  &.ant-menu-vertical-left {
    border-right: none;
    margin-left: -10px;
    margin-right: -10px;
    min-width: 167px;
    margin-top: -2px;
    margin-bottom: -2px;
  }
`

export const PrimaryButton = styled(Ant.Button)`
  min-width: 170px;
  border: none;
  &:hover,
  &:focus {
    background: ${colors.btnPrimaryHover};
  }
  &:active {
    background: ${colors.btnPrimaryActive};
  }
  &:disabled {
    &:hover {
      color: rgba(0, 0, 0, 0.25);
      background-color: #f5f5f5;
      border-color: #d9d9d9;
      text-shadow: none;
      box-shadow: none;
    }
  }
`

export const SecondaryButton = styled(Ant.Button)`
  min-width: 170px;
  color: ${colors.white};
  background: ${colors.ocean};
  border-color: ${colors.ocean};
  border: none;

  &:hover,
  &:focus {
    color: ${colors.white};
    background: ${colors.btnSecondaryHover};
  }

  &:active {
    color: ${colors.white};
    background: ${colors.btnSecondaryActive};
  }

  &:disabled {
    &:hover {
      color: rgba(0, 0, 0, 0.25);
      background-color: #f5f5f5;
      border-color: #d9d9d9;
      text-shadow: none;
      box-shadow: none;
    }
  }
`

export const DefaultButton = styled(Ant.Button)`
  min-width: 160px;
  color: ${colors.ocean};
  background-color: ${hexToRgba(colors.ocean, 0.1)};
  border: none;

  &&:hover,
  &&:focus {
    background-color: ${hexToRgba(colors.ocean, 0.18)};
    color: ${colors.ocean};
  }
  &&.active,
  &&:active {
    background-color: ${hexToRgba(colors.ocean, 0.26)};
    color: ${colors.ocean};
  }

  &:disabled {
    &:hover {
      color: rgba(0, 0, 0, 0.25);
      background-color: #f5f5f5;
      border-color: #d9d9d9;
      text-shadow: none;
      box-shadow: none;
    }
  }
`

export const ActionCardRegisterBlock = styled.div`
  color: ${colors.darkGray};
  display: flex;
  justify-content: center;
  ${media.phone`
    margin-top: 20px;
  `}
`

export const ActionCardTitle = styled.h1`
  font-size: 28px;
  line-height: 35px;
  margin-bottom: 30px;
  text-align: center;
`

export const ActionCardWrapper = styled.div`
  align-items: center;
  background: linear-gradient(
    to right,
    ${colors.ocean} 50%,
    ${colors.lightGray} 50%
  );
  display: flex;
  justify-content: center;
  padding: 30px;
  height: 100vh;
  ${media.desktop`
    background: ${colors.ocean};
  `}
  ${media.tablet`
    background: ${colors.white};
    padding: 15px;
    height: auto;
  `}
`

export const FormItem = styled(Ant.Form.Item)`
  margin-bottom: 12px;

  .ant-form-explain {
    font-size: 10px;
    font-weight: bold;
    margin-top: 5px;
    text-transform: uppercase;
  }
`
export const BlockContainer = styled.div`
  position: relative;
  max-width: 1180px;
  margin: 0 auto;

  ${media.largeDesktop`
    padding-left: 34px;
    padding-right: 34px;
  `};

  ${media.phone`
    padding-left: 15px;
    padding-right: 15px;
  `};
`

export const BlockTitle = styled.h1`
  font-size: 48px;
  line-height: 1.27;
  font-family: 'Noto Serif', serif;

  ${media.tablet`
    font-size: 35px;
  `}

  ${media.phone`
    font-size: 25px;
  `};
`

export const BlockTitleGreen = styled(BlockTitle)`
  strong {
    color: ${colors.green};
  }
`

export const BlockSubTitle = styled.h2`
  font-size: 37px;
  line-height: 1.24;
  font-weight: 700;
  letter-spacing: 1px;
  font-family: 'Noto Serif', serif;

  ${media.phone`
    font-size: 22px;
    line-height: 1.4;
    letter-spacing: 0;
  `};

  + p {
    margin-top: 20px;
    ${media.phone`
    margin-top: 12px;
  `};
  }
`

export const BlockSubTitleGreen = styled(BlockSubTitle)`
  strong {
    color: ${colors.green};
  }
`

export const CardHeading = styled.h3`
  font-size: 19px;
  line-height: 1.37;
  font-family: 'Noto Serif', serif;
`

export const TextLarge = styled.p`
  font-size: 19px;
  line-height: 28px;
`

export const TextMedium = styled.p`
  font-size: 16px;
  line-height: 1.75;
  ${media.phone`
    font-size: 14px;
  `};
`

export const TextMediumGroup = styled(TextMedium)`
  margin-bottom: 20px;
`

export const ArrowButton = styled(Ant.Button)`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
  width: 45px;
  height: 45px;
  border-radius: 2px;
  border: none;
  &:after {
    display: none;
  }
  &&:hover,
  &&:focus,
  &&.active,
  &&:active {
    color: inherit;
    box-shadow: none;
  }
`

export const ScrollToSection = styled.section`
  text-align: center;
  p {
    margin-bottom: 10px;
    color: ${colors.darkGray};
  }
  ${media.phone`
    height: 0;
    opacity: 0;
  `};
`

export const ScrollButton = styled(ArrowButton)`
  margin: 10px auto 0;
  background-color: ${colors.lightGray};
  &&:hover,
  &&:focus,
  &&.active,
  &&:active {
    background-color: ${colors.lightGray};
  }
`

export const Collapse = styled(Ant.Collapse)`
  position: relative;
  z-index: 1;
  margin-bottom: 80px;
  border-radius: 6px;
  padding: 12px 0;
  background-color: ${colors.white};
  ${media.phone`
    margin-bottom: 48px;
    padding: 0;
  `};
  > .ant-collapse-item {
    border-bottom: 1px solid ${hexToRgba(`${colors.dark}`, 0.08)};
    :last-child {
      border-bottom: none;
    }
  }
  box-shadow: 0 1px 10px 0 ${hexToRgba(`${colors.dark}`, 0.08)};
`

export const CollapsePanel = styled(Ant.Collapse.Panel)`
  position: relative;
  margin: 0 30px 1px;
  ${media.phone`
    margin-left: 15px;
    margin-right: 15px;
  `};
  &.ant-collapse-item-active {
    && > .ant-collapse-header {
      .ant-collapse-arrow {
        top: 0;
        transform: rotate(180deg);
      }
    }
  }
  && > .ant-collapse-header {
    color: inherit;
    font-size: 19px;
    line-height: 26px;
    font-family: 'Noto Serif', serif;
    padding-right: 35px;
    ${media.phone`
      font-size: 16px;
      min-height: 84px;
      padding: 15px 35px 15px 0;
      display: flex;
      align-items: center;
    `};

    .ant-collapse-arrow {
      width: 15px;
      height: 10px;
      left: auto;
      right: 10px;
      top: 12px;
      bottom: 0;
      margin: auto;
      background: #fff url(${arrowDownIcon}) no-repeat center;
      transition: all 0.3s;
      svg {
        display: none;
      }
    }
  }
  .ant-collapse-content {
    color: inherit;
  }
  && > .ant-collapse-content {
    & .ant-collapse-content-box {
      padding: 0 10px 28px;
      ${media.phone`
        padding-left: 5px;
        padding-right: 5px;
      `};
    }
  }
`

export const GlobalStyle = createGlobalStyle`
  body {
    -webkit-font-smoothing: antialiased;
  }
  
  #root > .ant-layout {
    overflow-x: hidden;
    flex-direction: column;
    min-height: 100vh;
    overflow-x: hidden;
  }
  
  p {
    margin: 0;
  }
  
  .react-router-modal__modal {
    ${media.tablet`
      overflow-y: auto;
    `}
  }

  .ant-layout {
    background: #fff;
  }
  
  .ant-popover-placement-bottomLeft > .ant-popover-content > .ant-popover-arrow {
    left: 30px;
    top: 9px;
  }
  
  .ant-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: none;
  
    a {
      color: inherit;
    }
  
    .anticon + a,
    .anticon + span {
      margin-left: 10px;
    }
  }

  .ant-menu-submenu-popup {
    z-index: 1062;
  }

  .ant-select__override-for__register-page {
    .ant-select-selection {
      height: 46px;
    }
  
    .ant-select-selection__rendered {
      height: 45px;
      margin: 0 15px;
    }
  
    .ant-select-selection-selected-value {
      margin-top: -15px;
      position: absolute;
      top: 50%;
    }

    .ant-select-dropdown-menu {
      max-height: 242px;
      padding: 6px 0;
    }

    .ant-select-dropdown-menu-item {
      border-radius: 4px;
      margin: 0 6px;
      padding: 12px 6px;
    }

    .ant-select-dropdown-menu-item:hover,
    .ant-select-dropdown-menu-item-active {
      background-color: ${colors.lightGray};
    }

    .ant-select-arrow {
      margin-top: -12px;
    }
  }

  .ant-select__override-for__actions-page {
    z-index: 1061;
    .ant-select-dropdown-menu-item:hover,
    .ant-select-dropdown-menu-item-active {
      background-color: ${colors.lightGray};
    }
    .ant-select-selected-icon {
      display: none !important;
    }
    .ant-select-dropdown-menu {
      max-height: 500px;    
    }
  }

  .ant-popover {
    z-index: 1070;
  }

  .ant-affix {
    box-shadow: 0 1px 10px 0 ${hexToRgba(colors.dark, 0.08)};
  }

  .ant-carousel .slick-list .slick-slide {
    pointer-events: all;
  }

  .ant-modal-confirm__override-for__profile-page {
    .anticon {
      display: none;
    }
    .ant-modal-confirm-title {
      font-size: 28px;
      text-align: center;
      color: ${colors.dark};
    }
    .ant-modal-confirm-content {
      font-size: 14px;
      color: ${colors.darkGray};
      text-align: center;
    }
    .ant-modal-confirm-btns {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      ${media.phone`
        flex-direction: column;
      `}
      .ant-btn {
        color: ${colors.ocean};
        background-color: ${hexToRgba(colors.ocean, 0.1)};
        border: none;
        width: 150px;
        margin: 0 auto;
        ${media.tablet`
          width: 100%;
          max-width: 250px;
        `}
        ${media.phone`
          max-width: 100%;
          margin-bottom: 10px;
        `}
        &&:hover,
        &&:focus {
          background-color: ${hexToRgba(colors.ocean, 0.18)};
          color: ${colors.ocean};
        }
        &&.active,
        &&:active {
          background-color: ${hexToRgba(colors.ocean, 0.26)};
          color: ${colors.ocean};
        }
      }
      .ant-btn-danger {
        background: ${colors.orange};
        color: ${colors.white};
        width: 150px;
        margin: 0 auto;
        ${media.tablet`
          width: 100%;
          max-width: 250px;
        `}
        ${media.phone`
          max-width: 100%;
        `}
      }
    }
  }

  // - global styles for .ant-tooltip & .ant-tooltip-inner classes
  //   uses for filters in "actions page".
  // - Use "/src/components/Tooltip/"  component in you need tooltip.
  // - To rewrite global styles, pass "overlayClassName" to Tooltip component
  //   with override class name
  // Ant.Tooltip component docs: https://ant.design/components/tooltip/

  .ant-tooltip {
    height: 0px;
    width: 0px

    .ant-tooltip-inner {
      position: relative;
      padding: 15px;
      text-align: center;
      width: 70px;
      left: -30px;
      top: 10px;
      height: 30px;
    }
  }

  .ant-tooltip, .ant-tooltip-inner  {
    box-shadow: none;
    border-radius: 30px;
    background: transparent;
  }

  .ant-tooltip__global-overlay {
    position: relative;
    padding: 15px;
    text-align: center;
    min-width: 200px;
    width: fit-content;
    height: auto;
    background-color: ${colors.dark};
    
    .ant-tooltip-inner {
      position: relative;
      padding: 0;
      text-align: center;
      min-width: 200px;
      width: fit-content;
      height: auto;
      background-color: ${colors.dark};
      left: auto;
      top: auto;
    }
  }
  
  .ant-tooltip-arrow {
    display: none;
  }
  .react-router-modal__container {
    z-index: 1070;
  }
  .react-router-modal__modal--in {
    ${media.tablet`
      width: 100%;
      border: none;
      border-radius: 0px;
      height: 100vh;
    `}
  }
  .d3-tooltip-container {
    background-color: black;
    border-radius: 4px;

    p {
      color: white;
      overflow: hidden;
      padding: 4px;
      text-align: center;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }

  .ant-tooltip {
    &.action-tooltip {
    height: auto;
    width: auto;
    z-index: 1070;
    .ant-tooltip-inner  {
      position: static;
      width: auto;
      height: auto;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
      border-radius: 4px;
      background: ${colors.dark};
    }
    .ant-tooltip-arrow {
      display: block;
    }
  }
  }

  .d3-tooltip-container:after{
    background: inherit;
    bottom: -5px;
    content: '';
    height: 10px;
    left: 45px;
    position: absolute;
    transform: rotate(45deg);
    width: 10px;
  }
`

export const Input = styled(Ant.Input)`
  font-size: 14px;
  height: 46px;
  line-height: 20px;

  .ant-input {
    padding: 0 15px;
  }

  &:hover,
  .ant-input:hover {
    border-color: ${colors.green};
  }
`

export const OceanContainer = styled.div`
  align-items: center;
  background-color: ${colors.ocean};
  background-image: url(${backgroundOceanContainerImage});
  background-position: right bottom;
  background-repeat: no-repeat;
  display: flex;
  height: 100vh;
  justify-content: center;
  ${media.tablet`
    background: ${colors.white};
    height: auto;
  `}
`

export const OceanModal = styled.div`
  background-color: ${colors.white};
  border-radius: 4px;
  padding: 70px;
  width: 440px;
  ${media.tablet`
    padding: 15px;
  `}
`

export const OceanImage = styled.div`
  img {
    display: block;
    margin: 0 auto 30px;
  }
`

export const OceanTitle = styled.h1`
  color: ${colors.dark};
  font-size: 28px;
  line-height: 35px;
  text-align: center;
`

export const OceanDescription = styled.h1`
  color: ${colors.darkGray};
  font-size: 14px;
  line-height: 20px;
  margin-top: 15px;
  text-align: center;
`

export const OceanForm = styled.div`
  margin-top: 40px;
`

export const Pagination = styled(Ant.Pagination)`
  display: flex;
  justify-content: center;
  margin-top: 25px;

  .ant-pagination-item {
    margin: 0 !important;
    width: 45px;
    height: 45px;
    padding: 0;
    border-radius: 0px;
    background-color: transparent;
    font-weight: bold;
    border: 1px solid ${colors.gray};
    border-right: none;
    display: flex;
    justify-content: center;
    align-items: center;

    &:nth-child(2) {
      border-top-left-radius: 3px;
      border-bottom-left-radius: 3px;
    }

    &:nth-last-child(2) {
      border-top-right-radius: 3px;
      border-bottom-right-radius: 3px;
      border-right: 1px solid ${colors.gray};
    }

    button {
      color: ${colors.darkGray};
      display: block;
      padding: 7px;
      margin: 0;
      border: 0;
      background-color: transparent;
      outline: 0;
    }
  }
  .ant-pagination-item-active {
    border-color: ${colors.gray};
    a {
      color: black;
    }
  }
  .ant-pagination-jump-next,
  .ant-pagination-jump-prev {
    height: 45px;
    border: 1px solid ${colors.gray};
    border-right: none;
    border-radius: 0;
    margin: 0;
    width: 45px;
    display: flex;
    justify-content: center;
    align-items: center;
    a {
      height: 100%;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .anticon {
      color: ${colors.darkGray};
    }
  }
`
