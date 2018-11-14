import * as Ant from 'antd'
import styled, { createGlobalStyle } from 'styled-components'

import colors from './../../config/colors'

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

export const GlobalStyle = createGlobalStyle`
  body {
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke: 0.01em rgba(0, 0, 0, 0.1);
  }

  .ant-tooltip {
    .ant-tooltip-inner {
      padding: 15px;
      text-align: center;
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
