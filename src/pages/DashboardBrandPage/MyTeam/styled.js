import styled from 'styled-components'
import colors from 'config/colors'

export const Container = styled.div`
  background-color: ${props => (props.whiteBG ? colors.white : 'transparent')};
  border-radius: 12px;
  padding: 15px 12px;
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
`

export const Info = styled.div`
  margin-bottom: 16px 0;
`

export const InfoRow = styled.div`
  width: 95%;
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
`

export const Heading = styled.p`
  font-family: Noto Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  color: ${colors.dark};
`

export const TeamIcon = styled.img`
  height: 155px;
  width: 100%;
  border-radius: 4px;
  object-fit: cover;
  margin: 14px 0;
`

export const IconStyled = styled.img`
  padding: 0 2.5px;
`
