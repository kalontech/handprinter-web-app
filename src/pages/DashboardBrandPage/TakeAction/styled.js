import styled from 'styled-components'
import colors from 'config/colors'
import { Button } from 'antd'

export const Container = styled.div`
  background-color: ${colors.white};
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  margin: 24px;
`

export const Title = styled.span`
  font-family: Noto Serif;
  font-style: normal;
  font-weight: 500;
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
  padding: 16px 26px;
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

export const ImageStyled = styled.img`
  height: 310px;
  margin: 5px 40px;
  object-fit: cover;
`

export const FlexCenter = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`

export const Description = styled.span`
  font-family: Noto Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 160%;
  color: ${colors.dark};
  margin: 30px 60px;
  text-align: center;
`

export const Assumption = styled.span`
  font-family: Noto Sans;
  font-style: italic;
  font-weight: 500;
  font-size: 16px;
  color: ${colors.darkGray};
  text-align: center;
`

export const GetStartedButton = styled(Button)`
  width: 190px;
  margin: 35px;
`
