import styled from 'styled-components'
import { AutoComplete, Select, Col, Menu, Breadcrumb } from 'antd'
import { Link } from 'react-router-dom'

import { Pagination, SecondaryButton } from 'components/Styled'
import colors from 'config/colors'
import media from 'utils/mediaQueryTemplate'

export const Block = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  flex-grow: 1;
  background-color: ${colors.lightGray};
`

export const SearchWrap = styled.div`
  margin-bottom: 20px;
  padding: 20px 30px;
  background-color: ${colors.white};

  ${media.phone`
    padding: 10px 15px;
  `}

  .ant-select-dropdown,
  .ant-select-dropdown-menu {
    max-height: 402px;
    z-index: 900;
  }
  .ant-select-dropdown-menu-item:hover,
  .ant-select-dropdown-menu-item-active {
    background-color: ${colors.lightGray};
  }
  .ant-select-selected-icon {
    display: none;
  }
`

export const AutoCompleteStyled = styled(AutoComplete)`
  height: 46px;
  width: 100%;

  > div:first-child {
    width: 100%;
  }
`

export const SearchItem = styled(Select.Option)`
  display: flex;
  align-items: center;
`

export const SearchItemImg = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 4px;
  margin-right: 10px;
  display: inline-block;
  object-fit: cover;
`

export const Container = styled.article`
  width: 100%;
  max-width: 1180px;
  min-height: 500px;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: stretch;
  padding: 20px 0;

  ${media.largeDesktop`
    padding-left: 34px;
    padding-right: 34px;
  `}

  ${media.phone`
    padding-left: 15px;
    padding-right: 15px;  
  `}
`

export const Column = styled(Col)`
  padding: 10px;
  ${media.phone`
    padding: 10px 10px;
  `}
`

export const EmptyList = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  font-size: 24px;
  color: ${colors.darkGray};
`

export const PaginationStyled = styled(Pagination)`
  margin-top: 35px;
`

export const HeaderCamapingDescription = styled.p`
  font-family: Noto Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 28px;
  margin-bottom: 36px;
  margin-top: 15px;
  width: 580px;
  text-align: center;
`

export const ProgressWrapper = styled.div`
  height: 90px;
  width: 100%;
  background: white;
  padding-right: 130px;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  padding-left: 130px;
  ${media.phone`
    padding-left: 15px;
    padding-right: 15px;  
  `}
`
export const ProgressTextWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
`
export const ProgressText = styled.p`
  font-family: Noto Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  color: ${colors.darkGray};
`

export const CampaignStatusWrapper = styled.div`
  border: ${props =>
    props.inactive
      ? `1px solid ${colors.darkGray}`
      : `1px solid ${colors.green}`};
  border-radius: 4px;
  width: 98px;
  height: 28px;
  align-items: center;
  justify-content: center;
  display: flex;
  margin-left: 20px;
`
export const CampaignStatus = styled.p`
  font-family: Noto Sans;
  font-style: normal;
  font-weight: bold;
  font-size: 10px;
  line-height: 20px;
  color: ${props => (props.inactive ? colors.darkGray : colors.green)};
  text-transform: uppercase;
`

export const DashboardHeaderUserName = styled.div`
  color: ${colors.dark};
  font-size: 28px;
  line-height: 35px;
  margin-top: 14px;
  display: flex;
  margin-left: ${props => (props.statusLabel ? '118px' : '0px')};
  align-items: center;
  justify-content: center;
`

export const Banner = styled.img`
  height: 140px;
  background-color: ${colors.ocean};
  width: 100%;
  object-fit: cover;
`

export const Content = styled.div`
  background-color: ${colors.lightGray};
  padding: 20px 70px;

  ${media.largeDesktop`
    padding-left: 34px;
    padding-right: 34px;
  `}

  ${media.phone`
    padding-left: 15px;
    padding-right: 15px;  
  `}
`

export const MenuStyled = styled(Menu)`
  height: 60px;
  background-color: ${colors.white};
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: ${({ font }) => font || '"Noto Sans", sans-serif'};
  margin: 0 10px 20px 10px;

  .ant-menu-item {
    font-size: 16px;
    height: 57px;
    padding-top: 3px;
    &:hover {
      border-bottom: 3px solid transparent;
    }
  }

  .ant-menu-item-selected {
    border-bottom: 3px solid ${colors.green};
    &:hover {
      border-bottom: 3px solid ${colors.green};
    }
  }
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
  overflow: scroll;
  height: 705px;
  padding: 3px;
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
  flex: 1;
  font-family: Noto Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 28px;
  color: ${colors.dark};
  margin-left: 13px;
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

export const TabsContainer = styled.div`
  height: 50px;
  width: 100%;
  background-color: ${colors.dark};
  display: flex;
  justify-content: center;
  align-items: center;
`

export const TabContainer = styled(Link)`
  display: flex;
  align-items: center;
  margin: 0 20px;
`

export const TabsText = styled.p`
  font-family: Noto Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 28px;
  color: ${props => (props.active ? colors.white : colors.darkGray)};
  margin-left: 5px;
`

export const BreadcrumbStyled = styled(Breadcrumb)`
  height: 50px;
  display: flex;
  align-items: center;
  align-self: flex-start;
  margin-left: 130px;
  .ant-breadcrumb-separator {
    color: ${colors.green};
  }
`

export const BreadcrumbItem = styled(Breadcrumb.Item)`
  font-family: Noto Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 28px;
  color: ${colors.dark};
`

export const HeaderCompetitionButtonContainer = styled.div`
  width: 100%;
  height: 70px;
  background-color: white;
  padding: 0px 130px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-direction: row;
`

export const HeaderCompetitionButton = styled(SecondaryButton)``

export const StatisticsHeaderDropdown = styled.div`
  width: 100%;
  height: 106px;
  display: flex;
  align-items: center;
  background-color: ${colors.white};
  margin-bottom: 20px;
  padding: 30px;
`
