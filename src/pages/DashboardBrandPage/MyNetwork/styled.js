import styled from 'styled-components'
import colors from 'config/colors'

export const Container = styled.div`
  background-color: ${colors.white};
  border-radius: 12px;
  padding: 15px 11px;
  margin-bottom: 15px;
`

export const Name = styled.p`
  font-family: Noto Serif;
  font-style: normal;
  font-weight: 500;
  font-size: 22px;
  line-height: 150%;
`

export const Text = styled.p`
  font-family: Noto Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 160%;
  margin-top: 10px;
`

export const SeeNetwork = styled.p`
  font-family: Noto Sans;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  text-decoration-line: underline;
  color: ${colors.dark};
  margin-top: 24px;
  cursor: pointer;
`
