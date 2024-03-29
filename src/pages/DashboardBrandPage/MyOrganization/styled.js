import styled from 'styled-components'
import colors from 'config/colors'
import { Link } from 'react-router-dom'
import { Row } from 'antd'

export const Container = styled.div`
  background-color: ${props => (props.whiteBG ? colors.white : 'transparent')};
  border-radius: 12px;
  padding: 15px 12px;
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
`

export const Info = styled.div`
  margin-bottom: 8px;
`

export const InfoRow = styled.div`
  padding-right: 12px;
  justify-content: space-between;
  align-items: center;
  display: flex;

  svg {
    opacity: 0.7;
  }
`

export const InfoText = styled.p`
  font-family: Noto Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  width: 100%;
  margin-left: 8px;
`

export const InfoCount = styled.p`
  font-family: Noto Sans;
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  color: ${colors.ocean};
`

export const Name = styled.p`
  font-family: Noto Serif;
  font-weight: 800;
  font-size: 18px;
  line-height: 150%;
  margin-bottom: 16px;
`

export const Text = styled.p`
  font-family: Noto Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 160%;
  margin-top: 10px;
`

export const Heading = styled.p`
  font-family: Noto Sans;
  font-weight: 800;
  font-size: 18px;
  color: ${colors.dark};
`

export const HowCalculated = styled(Link)`
  font-family: Noto Sans;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  color: #8bc428;
  margin-top: 10px;
`

export const GoalIcon = styled.img`
  height: 80px;
  width: 80px;
  border-radius: 40px;
  object-fit: cover;
  align-self: center;
  margin-bottom: 16px;
`

export const MilestoneTitle = styled.p`
  font-family: Noto Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 150%;
  color: ${colors.dark};
  text-align: center;
  margin-bottom: 24px;
`

export const RowFlexCenter = styled(Row)`
  align-items: center;
  justify-content: center;
  display: flex;
`
