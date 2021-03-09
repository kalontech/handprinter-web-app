import styled from 'styled-components'
import colors from 'config/colors'
import { Link } from 'react-router-dom'

export const Container = styled.div`
  background-color: ${colors.white};
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  margin-bottom: 24px;
`

export const Title = styled.span`
  font-family: Noto Serif;
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  margin: 13px 20px;
`

export const Heading = styled.span`
  font-family: Noto Serif;
  font-style: normal;
  font-weight: bold;
  font-size: 32px;
  align-self: center;
  text-align: center;
  padding: 16px 64px;
  line-height: 130%;
`

export const Ocean = styled.span`
  color: ${colors.ocean};
`

export const Text = styled.span`
  font-family: Noto Serif;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 160%;
  margin: 5px 40px;
`

export const LinkText = styled(Link)`
  font-family: Noto Sans;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 125%;
  align-items: center;
  color: #8bc428;
  margin: 23px 40px;
`

export const Player = styled.div`
  height: 310px;
  margin: 0 40px;
  border-radius: 12px;
  overflow: hidden;
`
