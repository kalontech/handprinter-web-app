import styled from 'styled-components'
import media from 'utils/mediaQueryTemplate'

export const SelectWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  z-index: 1000;
  ${media.phone`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    alighn-items: center;
  `}
  ${media.tablet`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    alighn-items: center;
  `}
`

export const Block = styled.div`
  width: 70%;
  padding-left: 54px;
  min-height: 46.53px;
  display: flex;
  justify-content: flex-start;
  ${media.phone`
    flex-direction: column;
    width: 100%;
    padding-left: 0;
  `}
  ${media.tablet`
    flex-direction: column;
    width: 100%;
    padding-left: 0;
  `}
`

export const UnitsBlock = styled.div`
  width: 20%;
  ${media.phone`
    width: 100%;
  `}
  ${media.tablet`
    width: 100%;
  `}
`
