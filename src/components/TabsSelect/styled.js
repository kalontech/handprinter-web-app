import styled from 'styled-components'
import colors from 'config/colors'
import media from 'utils/mediaQueryTemplate'
import hexToRgba from 'utils/hexToRgba'

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
    background: ${colors.dark};
    color: white;
    margin-bottom: 3.3px;
  }

  .ant-select-selection {
    background: ${colors.dark};
    border-color: ${colors.dark};
  }

  .ant-select-open {
    border-color: ${colors.dark};
  }

  .ant-select-focused {
    border-color: ${colors.dark};
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

export const SelectButtonWrapper = styled.div`
  display: flex;
  justify-content: space-around;
  height: 100%;
  width: 100%;
  padding-right: 10px;
`

export const SelectButton = styled.button`
  width: 135px;
  height: 38px;
  background: ${hexToRgba(`${colors.white}`, 0.1)};
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: 0.4s all;

  &:hover {
    background: ${hexToRgba(`${colors.white}`, 0.18)};
  }

  p {
    opacity: 1;
    color: ${colors.white};
  }
`
