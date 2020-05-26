import styled from 'styled-components'
import { AutoComplete, Select, Col, Menu, Breadcrumb } from 'antd'
import { Link } from 'react-router-dom'

import {
  Pagination,
  SecondaryButton,
  PrimaryButton,
  DefaultButton,
  Modal,
} from 'components/Styled'
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
  padding: 15px 0px;
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

  ${media.phone`
    width: 280px;
  `}
`

export const ProgressWrapper = styled.div`
  height: 90px;
  width: 100%;
  background: white;
  padding-right: 20px;
  align-items: center;
  justify-content: center;
  display: flex;
  flex-direction: column;
  padding-left: 0px;
  ${media.phone`
    padding-left: 0px;
    padding-right: 15px;  
  `}

  ${media.largeDesktop`
    height: 20px;
    padding-left: 0px;
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

  ${media.largeDesktop`
    min-height: 65px;
    max-height: 100px;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
  `}

  ${media.phone`
    flex-direction: column;
    text-align: center;
  `}
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
    padding: 0px 15px;
  `}

  ${media.phone`
    padding: 0px;
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

  ${media.largeDesktop`
    width: 100vw;
    position: relative;
    border-radius: 0px;
    top: 0px;
    left: -15px;
    margin: 0px;
  `}

  ${media.phone`
    width: 100%;
    position: relative;
    border-radius: 0px;
    top: 0px;
    left: 0px;
    margin: 0px;
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
  max-height: 815px;
  padding: 0px 30px;
`

export const StatisticsScrollTitle = styled.p`
  font-family: Noto Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 22px;
  line-height: 30px;
  color: ${colors.dark};
  margin: 20px 0px;
`

export const StatisticsScroll = styled.div`
  overflow: scroll;
  max-height: 705px;
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

export const BreadcrumbStyledMobile = styled(Breadcrumb)`
  height: 50px;
  display: flex;
  align-items: center;
  align-self: flex-start;
  margin-left: 15px;
  .ant-breadcrumb-separator {
    color: ${colors.green};
  }

  ${media.phone`
    .ant-breadcrumb-separator {
      color: ${colors.lightGray};
    }
  `}
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

  ${media.largeDesktop`
    justify-content: center;
  `}
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

export const ModalMessage = styled.p`
  width: 100%;
  height: 19px;
  text-align: center;
  margin-bottom: 29px;
  margin-top: 15px;
  color: ${colors.darkGray};

  ${media.phone`
    margin-bottom: 42px;
    font-family: Noto Sans;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 20px;
    color: #858F8E;
    text-align: left;
    padding-left: 16px;
  `}
`

export const AchivmentLogo = styled.img`
  position: relative;
  top: -55px;
  left: 41%;
  width: 110px;
  height: 110px;
  border-radius: 50%;
`

export const AchivmentBanner = styled.div`
  height: 140px;
  width: 100%;
  background-color: ${colors.ocean};
  border-radius: 4px 4px 0px 0px;
`

export const AchivmentMobileBanner = styled.div`
  min-height: 62px;
  width: 100%;
  color: black;
  background-color: ${colors.white};
  border-bottom: 1px solid ${colors.gray};
  border-radius: 4px 4px 0px 0px;
`

export const AchievementTitle = styled.p`
  text-align: center;
  font-family: Noto Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 28px;
  width: 100%;

  ${media.phone`
    padding: 14px 44px 7px 16px;
    display: flex;
    font-family: Noto Sans;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 28px;
    text-align: left;
  `}
`

export const AchievementFooterButton = styled(PrimaryButton)`
  width: 198px;
  height: 50px;
  align-self: center;
`

export const SkipFooterButton = styled(DefaultButton)`
  width: 198px;
  height: 50px;
  align-self: center;
`

export const AchievementModal = styled(Modal)`
  .ant-modal-close-x {
    color: ${colors.white};
    width: 50px;
    height: 50px;

    ${media.phone`
      color: ${colors.dark};
    `}
  }

  .ant-modal-footer {
    padding: 0px;
    border: 0;
  }

  .ant-modal-body {
    height: 600px;

    ${media.phone`
      height: 525px;
    `}
  }

  .ant-modal-title {
    justify-content: center;
    align-items: center;
    display: flex;
  }

  .ant-modal-header {
    border: 0px;
  }

  .ant-modal-content {
    ${media.phone`
      margin: 58px 16px 20px 16px;
    `}
  }
`

export const ModalContent = styled.div`
  width: 472px;
  height: 218px;
  max-height: 218px;
  overflow: scroll;
  margin: 0 60px 40px 60px;
  border: 1px solid ${colors.gray};
  box-sizing: border-box;
  border-radius: 4px;

  ${media.phone`
    width: 90%;
    margin: 5%;
    border-radius: 4px;
  `}
`

export const AchievementFooter = styled.div`
  background-color: ${colors.lightGray};
  height: 110px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0px 0px 4px 4px;

  ${media.phone`
    height: 170px;
    position: relative;
    bottom: 140px;
    flex-direction: column;
    justify-content: space-around;
    border-radius: 0;
    padding: 20px 10px;
    width: 100%;
    background-color: ${colors.white};
  `}
`

export const FeedWrapper = styled.div`
  padding: 0px 145px;

  ${media.largeDesktop`
    padding: 16px 34px 16px 34px;
  `}

  ${media.phone`
    padding: 16px;
  `}
`
