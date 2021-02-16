import styled from 'styled-components'
import colors from 'config/colors'

export const Body = styled.div`
  background-color: ${colors.lightGray};
  display: flex;
  flex-direction: row;
  flex: 1;
`

export const Column = styled.div`
  width: 400px;
  padding: 24px;
`

export const MainColumn = styled.div`
  flex: 1;
`
