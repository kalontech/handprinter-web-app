import styled from 'styled-components'
import { AutoComplete, Select, Col } from 'antd'

import { Pagination } from 'components/Styled'
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
  margin-bottom: 20px;
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
  margin-left: 118px;
  align-items: center;
  justify-content: center;
`
