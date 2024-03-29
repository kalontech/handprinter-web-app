import * as Ant from 'antd'
import styled, { createGlobalStyle, keyframes, css } from 'styled-components'

import hexToRgba from 'utils/hexToRgba'
import arrowDownIcon from 'assets/icons/arrowDown.svg'
import colors from 'config/colors'
import media, { sizes } from 'utils/mediaQueryTemplate'
import Print from 'assets/icons/fingerprint-part.svg'

import backgroundOceanContainerImage from 'assets/images/backgroundOceanContainer.png'

const slideDown = keyframes`
  from {
    transform:translate3d(0,0,0);
  }
  50% {
    transform:translate3d(0,15px,0);
  }
  to {
    transform:translate3d(0,0,0);
  }
`

// react-activity-feed
const raf = css`
  .raf-button {
    background-color: #87bd24 !important;
  }

  .raf-activity {
    font-family: Noto Sans, sans-serif;
    font-size: 16px;
  }

  .raf-textarea {
    border-radius: 5px 0 0 5px;
  }

  .raf-comment-field__group {
    .raf-button {
      border-radius: 0 5px 5px 0;
      padding-left: 20px;
    }
  }

  .raf-panel-header {
    display: none;
  }

  .raf-panel-content {
    padding: 16px;
  }

  .raf-panel-footer {
    padding: 0 16px 16px 18px;
  }

  .status-update-form--expanded {
    .raf-panel-footer {
      margin-top: 83px;
    }

    .raf-emoji-picker {
      z-index: 1;
    }

    .css-yk16xz-control {
      width: 100%;
    }

    .css-1pahdxg-control {
      width: 100%;
    }

    .css-2b097c-container {
      width: 100%;
    }
  }
`

export const SlideDown = styled.div`
  animation: ${slideDown} 2s infinite;
  transition: all 0.2s ease-in-out;
`

export const ActionCard = styled(Ant.Row)`
  border-radius: 5px;
  overflow: hidden;
  width: 920px;
  position: relative;
  height: 579px;
  display: flex;
  justify-content: center;
  ${media.tablet`
    height: auto;
  `}
  ${media.phone`
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
  position: relative;
`

export const PopoverTitle = styled.div`
  border-bottom: 3px solid transparent;
  display: flex;
  align-items: center;
  line-height: 1;
  color: ${({ fontColor }) => fontColor || colors.darkGray};
  cursor: pointer;
  transition: color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1),
    border-color 0.3s cubic-bezier(0.645, 0.045, 0.355, 1),
    background 0.3s cubic-bezier(0.645, 0.045, 0.355, 1),
    padding 0.15s cubic-bezier(0.645, 0.045, 0.355, 1);

  &:hover {
    color: ${hexToRgba(colors.dark, 0.8)};
  }

  &.ant-popover-open {
    color: ${hexToRgba(colors.dark, 0.8)};
  }
`

export const HeaderPopover = styled(Ant.Menu)`
  .ant-menu-item {
    display: flex;
    align-items: center;
    padding: 0 6px;
    margin: 0;
    font-size: 16px;
    color: ${({ fontColor }) => fontColor || colors.darkGray};
    :not(:last-child) {
      margin: 0;
    }
    a {
      color: inherit;
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

export const Checkbox = styled(Ant.Checkbox)`
  color: ${colors.darkGray};
  line-height: 1.5;

  input {
    width: 100% !important;
    height: 100% !important;
  }
  .ant-checkbox-checked:after {
    border: 1px solid ${colors.gray};
  }
  .ant-checkbox-inner {
    border-radius: 4px;
    &:after {
      border: none;
      left: -13%;
    }
  }
  .ant-checkbox-checked .ant-checkbox-inner:after {
    width: 9px;
    height: 9px;
    border-radius: 3px;
    background-color: ${colors.green};
    transform: rotate(90deg) scale(1) translate(-50%, -50%);
  }
  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: transparent;
    border-color: ${colors.gray};
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
  height: 100%;
  flex-grow: 1;
  overflow-y: auto;
  ${media.desktop`
    background: ${colors.ocean};
  `}
  ${media.tablet`
    background: ${colors.white};
    padding: 15px;
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
  margin: 0 auto;
  width: 100%;
  max-width: 1180px;

  ${media.largeDesktop`
    padding-left: 34px;
    padding-right: 34px;
  `};

  ${media.phone`
    padding-left: 0px;
    padding-right: 0px;
  `};
`

export const BlockTitle = styled.h1`
  font-size: 48px;
  line-height: 1.27;
  font-family: 'Noto Serif', serif;
  font-weight: 400;
  ${media.tablet`
    font-size: 35px;
  `}

  ${media.phone`
    font-size: 25px;
  `};
`

export const BlockTitleGreen = styled(BlockTitle)`
  strong {
    font-weight: 700;
    color: ${colors.green};
  }
`

export const BlockSubTitle = styled.h2`
  font-size: 37px;
  line-height: 1.24;
  font-weight: 700;
  letter-spacing: 1px;
  font-family: 'Noto Serif', serif;
  margin-bottom: 0;

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
    font-weight: 700;
    color: ${colors.green};
  }
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
  padding: 0;
  justify-content: center;
  align-items: center;
  margin-left: 10px;
  width: 45px;
  height: 45px;
  border-radius: 2px;
  border: none;
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

export const VideoModalWrap = styled.div`
  .modal-video-movie-wrap {
    width: calc(100% - 30px);
    margin: 0 auto;
  }
  .modal-video-close-btn {
    &:focus {
      outline: none;
    }
    ${media.largeDesktop`
    right: 0;
  `}
    ${media.phone`
    width: 24px;
  `}
  }
`

export const Modal = styled(Ant.Modal)`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0;
  margin: 0;
  z-index: 1070;

  ${media.tablet`
    max-width: initial;
  `}

  ${media.phone`
    height: 100%;
    width: 100% !important;
  `}

  .ant-modal {
    width: auto;
    max-width: 100%;
    margin: 0;
    padding: 0;

    ${media.phone`
      height: 100%;
    `}
  }

  .ant-modal-content {
    ${media.phone`
      height: 100%;
    `}
  }

  .ant-modal-body {
    padding: 0;

    ${media.phone`
      height: 100%;
    `}
  }
`

export const GlobalStyle = createGlobalStyle`
  .achievements-popover .ant-popover-inner {
      background-color: ${colors.dark} !important;
  } 
 
  .achievements-popover .ant-popover-arrow {
      border-color: ${colors.dark} !important;
  } 
 

  body {
    -webkit-font-smoothing: antialiased;
  }
  
  #root {
    height: 100%;
  }
  
  #root > .ant-layout {
    overflow-x: hidden;
    flex-direction: column;
    min-height: 100%;
  }

  .ant-dropdown-menu-item,
  .ant-dropdown-menu-submenu-title {
    height: 46px;
    width: 200px;
    background-color: white;
  }

  .ant-select-selection {
    width: 100%;
  }

  .ant-select-selection--single {
    margin-right: 10px;
    height: 46.53px;
    border: 1px solid #D7DBDB;
    box-sizing: border-box;
    border-radius: 4px;
    
    ${media.phone`
      flex-direction: column;
      width: 100%;
      padding-left: 0;
    `}
    ${media.tablet`
      flex-direction: column;
      width: 100%;
      padding-left: 0;
      /* border-color: ${colors.dark}; */
    `}
  }

  .ant-select-selection-selected-value {
    width: 100%;
    padding-top: 7px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    color: ${colors.darkGray};
  }

  .ant-select-selection-selected-value span img {
    margin-right: 10px;
  }

  .ant-select-selection__rendered {
    height: 100%;
  }

  .ant-dropdown-trigger {
    ${media.phone`
      width: 100%;
    `}
  }

  .ant-select {
    width: 200px;
    margin-right: 10px;
    margin-bottom: 0px;
  }

  .ant-select-allow-clear .ant-select-selection--single .ant-select-selection-selected-value {
    padding-top: 7px;
  }

  .ant-select-dropdown-menu {
    padding: 6px;
    margin-top: 0px;
  }

  .ant-select-open {
    margin-top: 0px;
  }
  
  .ant-select-dropdown-menu-item,
  .ant-select-dropdown-menu-item-active {
    min-height: 46px;
    padding-top: 10px;
    box-sizing: border-box;
  }

  .ant-select-dropdown-menu-item:hover,
  .ant-select-dropdown-menu-item-active {
    background: #F8FAFA;
    border-radius: 4px;
    box-sizing: border-box;
  }
  
  .ant-layout-content {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    position: relative;
    
  }
  
  p {
    margin: 0;
  }
  .ant-notification,
  .ant-modal-centered {
    z-index: 1070;
  }
  
  .react-router-modal__modal {
    border: 0;

    ${media.tablet`
      overflow-y: auto;
    `}
  }

  .ant-layout {
    background: #fff;
  }
  
  .ant-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    box-shadow: none;
    &:after {
      display: none;
    }
  
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
  
  .ant-input-affix-wrapper .ant-input,
  .ant-select-open .ant-select-selection {
    box-shadow: none;
  }

  .raf-panel-footer {

    div {
      display: flex;
      flex-direction: column;
      

      div {
        display: flex;
        flex-direction: row;
        align-items: baseline;

        .emoji-mart-scroll {
          flex-direction: column;
        }

        .emoji-mart-bar {
          display: block;

          .emoji-mart-preview-data {
            display: flex;
            flex-direction: column;
          }
        }
      }
    }

    ${media.largeDesktop`
      div {
        flex-direction: row;
      }
    `}

    ${media.phone`
      div {
        flex-direction: column;
      }
    `}
  }
 
 
  .ant-select__override-for__register-page {
    .ant-select-selection {
      height: 46px;
    }

    .ant-cascader-input  {
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

    .ant-cascader-picker-arrow {
      width: 24px;
      height: 24px;
      margin-top: -12px;
    }
  }

  .ant-popover {
    z-index: 1070;
  }

  .ant-carousel {
    .slick-list {
      .slick-slide {
        pointer-events: all;
      }
    }
  }
  
  .ant-modal-confirm_profile-page {
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
  .ant-modal-footprint_profile-page {
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
      .ant-btn-primary {
        background: ${colors.ocean};
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


  .ant-tooltip__global-overlay {
    text-align: center;
    z-index: 1080;
    .ant-tooltip-inner { 
      text-align: center;
      background-color: ${colors.dark};
      padding: 15px;
    }
    .ant-tooltip-arrow {
      border-top-color: ${colors.dark};
    }
  }

  .react-router-modal__container {
    z-index: 1070;
  }
  .react-router-modal__modal--in {
    ${media.tablet`
      width: 100%;
      border: none;
      border-radius: 0px;
      height: 100%;
    `}
  }

  .ant-tooltip {
    &.action-tooltip, 
    &.info-tooltip {
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

  ${raf}
`

export const Input = styled(Ant.Input)`
  font-size: 14px;
  height: 46px;
  line-height: 20px;
  box-shadow: none !important;
  .ant-input {
    padding: 0 15px;
  }

  &:hover,
  .ant-input:hover {
    border-color: ${colors.green};
  }

  .ant-input-suffix {
    color: ${colors.green};
  }
`

export const OceanContainer = styled.div`
  align-items: center;
  flex-grow: 1;
  background-color: ${colors.ocean};
  background-image: url(${backgroundOceanContainerImage});
  background-position: right bottom;
  background-repeat: no-repeat;
  display: flex;
  height: 100%;
  justify-content: center;
  ${media.tablet`
    background: ${colors.white};
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

export const OceanDescription = styled.p`
  color: ${colors.darkGray};
  font-size: 14px;
  line-height: 20px;
  margin-top: 15px;
  text-align: center;
`

export const OceanForm = styled.div`
  margin-top: 40px;
`

export const ModalContent = styled.section`
  width: 550px;
  margin: 0 auto;
  position: relative;
  display: flex;
  justify-content: flex-start;
  box-shadow: 0 1px 10px rgba(52, 68, 66, 0.08);
  border-radius: 4px;
  background-color: ${colors.ocean};
  flex-direction: column;

  ${media.phone`
    width: 100%;
    height: 100%;
    overflow-y: auto;
  `}
`

export const CloseButton = styled.button`
  border: 0;
  outline: 0;
  background-color: transparent;
  align-items: center;
  cursor: pointer;
  display: flex;
  height: 50px;
  justify-content: center;
  position: absolute;
  right: 17px;
  top: 10px;
  width: 50px;
  z-index: 12;
  transition: color 0.3s;
  color: ${colors.white};

  &:hover {
    color: ${colors.white};
  }

  @media screen and (max-height: ${sizes.phone}px) {
    color: ${colors.gray};
  }
`

export const FingerPrint = styled.div`
  height: 140px;
  width: 100%;
  background-color: ${colors.ocean};
  text-align: center;
  background: url(${Print}) no-repeat center bottom;
  background-size: initial;

  @media screen and (max-height: ${sizes.phone}px) {
    display: none;
  }
`

export const Pagination = styled(Ant.Pagination)`
  display: flex;
  justify-content: center;
  margin: 60px 0 25px 0;

  .ant-pagination-item {
    margin: 0 !important;
    width: 45px;
    height: 45px;
    padding: 0;
    border-radius: 0;
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
      width: 100%;
      height: 100%;
      padding: 0;
      margin: 0;
      border: 0;
      background-color: transparent;
      outline: 0;
    }
    button > a {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height: 100%;
      margin: auto;
      transition: color 0.3s;
      color: ${colors.darkGray};
      font-weight: bold;
      font-family: Noto Sans, sans-serif;
    }

    &:hover {
      a {
        color: ${colors.dark};
      }
    }

    &.ant-pagination-item-active {
      border-color: ${colors.gray};
      a {
        color: ${colors.dark};
      }
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
