import styled from 'styled-components'
import colors from 'config/colors'
import { Icon } from 'antd'
import { Link } from 'react-router-dom'

export const Container = styled.div`
  background-color: ${props => (props.whiteBG ? colors.white : 'transparent')};
  border-radius: 12px;
  padding: 15px 0px;
  margin-bottom: 15px;
`

export const Name = styled.p`
  font-family: Noto Serif;
  font-style: normal;
  font-weight: 500;
  font-size: 22px;
  line-height: 150%;
  margin-left: 11px;
`

export const Text = styled.p`
  font-family: Noto Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 160%;
  margin-top: 10px;
  margin-left: 11px;
`

export const ImpactText = styled.p`
  font-family: Noto Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  color: ${colors.dark};
  margin-left: 20px;
  flex: 1;
`

export const StyledIcon = styled(Icon)`
  svg {
    width: 20px;
    height: 20px;
    color: ${colors.darkGray};
  }
`

export const Row = styled.div`
  display: flex;
  align-items: center;
  background-color: ${props =>
    props.darkBG ? colors.lightGray : 'transparent'};
  height: 44px;
  padding: 0 11px;
`

export const Impacts = styled.div`
  margin: 20px 0;
`

export const ImpactDaysText = styled.p`
  font-family: Noto Sans;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  color: ${colors.darkGray};
  margin-right: 16px;
`

export const HowCalculated = styled(Link)`
  font-family: Noto Sans;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  color: #8bc428;
  margin-left: 11px;
`
