import styled from 'styled-components'
import colors from 'config/colors'
import media from 'utils/mediaQueryTemplate'

export const TabsSelectWrapper = styled.div`
  height: 50px;
  width: 100%;
  background-color: ${colors.dark};
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;

  .ant-select {
    width: 100%;
    margin-right: 0px;
    margin-bottom: 0px;
    background: #344442;
    color: white;
    margin-bottom: 3.3px;
  }

  .ant-select-selection {
    background: #344442;
    border-color: #344442;
  }

  .ant-select-open {
    border-color: #344442;
  }

  .ant-select-focused {
    border-color: #344442;
  }

  .ant-select-arrow {
    margin-right: 34px;
    color: ${colors.white};

    ${media.phone`
      margin-right: 12px;
    `}
  }

  .ant-select-selection__rendered {
    margin-left: 5px;
    margin-right: 0px;
  }

  .ant-select-arrow {
    margin-right: 12px;
  }

  .ant-select-selection-selected-value {
    margin-left: 21px;
    color: ${colors.white};

    ${media.phone`
      margin-left: 12px;
    `}
  }
`
