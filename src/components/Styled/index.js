import * as Ant from 'antd'
import styled, { createGlobalStyle } from 'styled-components'
import hexToRgba from './../../utils/hexToRgba'
import arrowDownIcon from '../../assets/icons/arrowDown.svg'
import colors from './../../config/colors'

import backgroundOceanContainerImage from './../../assets/images/backgroundOceanContainer.png'

export const ActionCard = styled(Ant.Row)`
  border-radius: 5px;
  height: 579px;
  overflow: hidden;
  width: 920px;
`

export const ActionCardForgotPasswordBlock = styled.div`
  color: ${colors.darkGray};
  display: flex;
  justify-content: flex-end;
  margin: -5px 0 12px;
`

export const ActionCardFormWrapper = styled.div`
  width: 300px;
`

export const ActionCardLeftHalf = styled(Ant.Col)`
  height: 100%;

  img {
    height: 100%;
    object-fit: cover;
    object-position: center;
    width: 100%;
  }
`

export const ActionCardRightHalf = styled(Ant.Col)`
  align-items: center;
  background-color: ${colors.white};
  display: flex;
  height: 100%;
  justify-content: center;
`

export const HeaderPopover = styled(Ant.Menu)`
  .ant-menu-item {
    display: flex;
    algn-items: center;
    padding: 0 6px;
    margin: 0;
    font-size: 16px;
    :not(:last-child) {
      margin: 0;
    }
    .ant-menu-item-selected,
    :hover {
      background: #f8fafa;
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
}
`

export const ActionCardRegisterBlock = styled.div`
  color: ${colors.darkGray};
  display: flex;
  justify-content: center;
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
  height: 100vh;
  justify-content: center;
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
`

export const BlockTitle = styled.h1`
  font-size: 48px;
  line-height: 1.27;
  font-family: 'Noto Serif', serif;
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
  font-family: 'Noto Serif', serif;
  + p {
    margin-top: 20px;
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
`

export const ScrollButton = styled(ArrowButton)`
    margin: 10px auto 0
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
  &.ant-collapse-item-active {
    && > .ant-collapse-header {
      .arrow {
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

    .arrow {
      width: 15px;
      height: 10px;
      left: auto;
      right: 10px;
      top: 12px;
      bottom: 0;
      margin: auto;
      background: #fff url(${arrowDownIcon}) no-repeat center;
      svg {
        display: none;
      }
    }
  }
  .ant-collapse-content {
    color: inherit;
    p {
      line-height: 23px;
    }
  }
  && > .ant-collapse-content {
    margin-top: -12px;
    & .ant-collapse-content-box {
      padding: 0 10px 28px;
    }
  }
`

export const Affix = styled(Ant.Affix)`
  > div {
    box-shadow: 0 1px 10px 0 ${hexToRgba(colors.dark, 0.08)};
  }
`

export const GlobalStyle = createGlobalStyle`
  body {
    -webkit-font-smoothing: antialiased;
  }
  
  p {
    margin: 0;
  }
  
  .ant-layout {
    background: #fff;
  }
  
  .ant-popover-placement-bottomLeft > .ant-popover-content > .ant-popover-arrow {
      left: 30px;
  }  
  
  .ant-tooltip {
    .ant-tooltip-inner {
      padding: 15px;
      text-align: center;
    }
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

`

export const Input = styled(Ant.Input)`
  font-size: 14px;
  height: 46px;
  line-height: 20px;

  .ant-input {
    padding: 0 15px;
  }

  &,
  .ant-input {
    border-color: ${colors.gray};
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
`

export const OceanModal = styled.div`
  background-color: ${colors.white};
  border-radius: 4px;
  padding: 70px;
  width: 440px;
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
