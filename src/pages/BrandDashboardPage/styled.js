import styled from 'styled-components'
import colors from 'config/colors'

export const StatisticsScrollTitle = styled.p`
  font-family: Noto Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 22px;
  line-height: 30px;
  color: ${colors.dark};
  margin: 40px 0px;
`

export const StatisticsScroll = styled.div`
  height: 705px;
  padding: 3px;
`

export const StatisticsMain = styled.div`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
`

export const StatisticsContainer = styled.div`
  background-color: ${colors.white};
  width: 49%;
  height: 815px;
  padding: 0px 30px;
`

export const AccomplishedActionContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
  justify-content: space-between;
  align-items: center;
`
export const AccomplishedActionPicture = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 4px;
  object-fit: cover;
`
export const AccomplishedActionName = styled.p`
  display: flex;
  font-family: Noto Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 28px;
  color: ${colors.dark};
`
export const AccomplishedActionCountBG = styled.div`
  width: 32px;
  height: 32px;
  background-color: ${colors.lightGray};
  display: flex;
  justify-content: center;
  align-items: center;
`

export const AccomplishedActionCount = styled.p`
  font-family: Noto Sans;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 20px;
  color: ${colors.dark};
`

export const AccomplishedActionNameBlock = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
  margin-left: 13px;
`

export const TotalImpactTitle = styled.p`
  font-family: Noto Sans;
  font-style: normal;
  font-size: 16px;
  line-height: 20px;
  color: #344442;
  text-align: center;
  margin-top: 42px;
`

export const ActionLabelsBlock = styled.div`
  margin-top: 25px;
  margin-bottom: 25px;
  display: flex;
  width: 100%;
  justify-content: center;
`

export const Separator = styled.div`
  height: 1px;
  width: 100%;
  background-color: #c4c4c4;
`
