import styled from 'styled-components'
import colors from 'config/colors'
import Link from 'react-router-dom/Link'

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

export const Dates = styled.span`
  font-family: Noto Sans;
  font-style: italic;
  font-weight: 500;
  font-size: 16px;
  color: ${colors.darkGray};
  margin: 5px 40px;
`

export const CampaignTitle = styled.span`
  font-family: Noto Serif;
  font-style: normal;
  font-weight: bold;
  font-size: 32px;
  color: ${colors.dark};
  margin-top: 40px;
  text-align: center;
`

export const TextHeading = styled.span`
  font-family: Noto Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  margin: 5px 40px;
  color: ${colors.dark};
`

export const SeeAllActions = styled(Link)`
  font-family: Noto Sans;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  text-decoration-line: underline;
  color: ${colors.dark};
  margin: 16px 40px;
`
