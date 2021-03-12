import styled from 'styled-components'
import colors from 'config/colors'
import Link from 'react-router-dom/Link'

export const Container = styled.div`
  background-color: ${colors.white};
  display: flex;
  flex-direction: column;
  border-radius: 12px;
  margin-bottom: 24px;
`

export const Content = styled.div`
  padding: 0 40px;
  display: flex;
  flex-direction: column;
`

export const Title = styled.span`
  font-family: Noto Serif;
  font-weight: 800;
  font-size: 18px;
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
  margin: 5px 0;
  text-align: center;
`

export const ImageStyled = styled.img`
  height: 110px;
  width: 110px;
  border-radius: 55px;
  align-self: center;
  object-fit: cover;
  margin: 16px 0;
`

export const Chair = styled.img`
  height: 120px;
  width: 120px;
  border-radius: 60px;
  align-self: center;
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
  color: ${colors.dark};
`

export const DescriptionBold = styled.span`
  font-family: Noto Sans;
  font-style: normal;
  font-weight: 800;
  font-size: 16px;
  color: ${colors.dark};
  margin: 35px 0px;
`

export const HowCalculated = styled(Link)`
  font-family: Noto Sans;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  color: #8bc428;
  margin: 38px 0 10px 22px;
`
