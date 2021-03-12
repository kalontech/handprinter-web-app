import styled from 'styled-components'
import colors from 'config/colors'
import { Link } from 'react-router-dom'

export const Container = styled.div`
  background-color: ${props => (props.whiteBG ? colors.white : 'transparent')};
  border-radius: 12px;
  padding: 15px 0px;
  margin-bottom: 15px;
`

export const Name = styled.p`
  font-family: Noto Serif;
  font-weight: 800;
  font-size: 18px;
  line-height: 150%;
  margin-left: 11px;
`

export const Text = styled.p`
  font-family: Noto Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 160%;
  margin: 10px 0 15px 11px;
`
