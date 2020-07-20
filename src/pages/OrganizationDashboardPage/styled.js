import styled from 'styled-components'
import colors from 'config/colors'
import media from 'utils/mediaQueryTemplate'

export const StatisticsScrollTitle = styled.p`
  font-family: Noto Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 22px;
  line-height: 30px;
  color: ${colors.dark};
  margin: 40px 0px;

  ${media.phone`
  `}
`

export const StatisticsScroll = styled.div`
  height: 705px;
  padding: 3px;
  overflow: scroll;

  ${media.largeDesktop`
    display: flex;
    flex-direction: column;
    align-items: center;
  `}

  ${media.phone`
    width: 100%;
  `}
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

  ${media.largeDesktop`
    width: 100%;
    height: 815px;
    background: ${colors.lightGray}
  `}

  ${media.phone`
    width: 100%;
    padding: 0px;
  `}
`

export const AccomplishedActionContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
  justify-content: space-between;
  align-items: flex-start;

  ${media.largeDesktop`
    background: ${colors.white};
    padding: 8px;
    width: 670px;
  `}

  ${media.phone`
    width: 100%;
    height: 179px;
  `}
`

export const AccomplishedActionContainerMobile = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  background: ${colors.white};
  padding: 5px;

  ${media.phone`
    width: 100%;
    height: 179px;
  `};
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

  ${media.phone`
    width: 166px;
  `}
`

export const TotalImpactTitle = styled.p`
  font-family: Noto Sans;
  font-style: normal;
  font-size: 16px;
  line-height: 20px;
  color: ${colors.dark};
  text-align: center;
  margin-top: 42px;

  ${media.phone`
    margin-top: 0px;
  `}
`

export const ActionLabelsBlock = styled.div`
  margin-top: 25px;
  margin-bottom: 25px;
  display: flex;
  width: 100%;
  justify-content: center;

  ${media.phone`
    flex-wrap: wrap;
  `}
`

export const Separator = styled.div`
  height: 1px;
  width: 100%;
  background-color: ${colors.switchUnitsBackground};
`

export const ActionLabelsTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 507px;
  height: 68px;
  background: ${colors.lightGray};
  border-radius: 4px;

  p {
    font-family: Noto Sans;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    width: 100%;
    text-align: center;
  }

  ${media.largeDesktop`
    margin-top: 20px;
    background: ${colors.white};
  `}

  ${media.phone`
    width: 255px;
    min-height: 50px;
    padding: 15px;
    align-items: flex-start;
  `}
`

export const FeedWrapper = styled.div`
  padding-right: 145px;
  padding-left: 145px;

  ${media.largeDesktop`
    padding: 16px 34px 16px 34px;
  `}

  ${media.phone`
    padding: 16px
  `}
`

export const GoalHeaderWrapper = styled.div`
  height: 160px;
  width: 100%;
  display: flex;
  padding-left: 30px;
  align-items: center;
  flex-direction: row;

  .CircularProgressbar-path {
    stroke: ${colors.green};
    stroke-linecap: butt;
  }

  .CircularProgressbar-text {
    font-family: Noto Sans;
    font-size: 16px;
    fill: ${colors.dark};
  }
`

export const CircularProgressbarContainer = styled.div`
  width: 100px;
  height: 100px;
`

export const GoalTitle = styled.span`
  font-family: Noto Sans;
  font-size: 22px;
  fill: ${colors.dark};
`

export const GoalDescription = styled.span`
  font-family: Noto Sans;
  font-size: 16px;
  fill: ${colors.dark};
`

export const GoalTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 25px;
`
