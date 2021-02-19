import styled from 'styled-components'
import colors from 'config/colors'

export const Container = styled.div`
  background-color: ${colors.white};
  border-radius: 12px;
  padding: 15px 12px;
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
`

export const Name = styled.p`
  font-family: Noto Serif;
  font-style: normal;
  font-weight: 600;
  font-size: 24px;
  line-height: 150%;
  margin-bottom: 24px;
`
