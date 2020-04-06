import styled from 'styled-components'
import { Dropdown, Menu } from 'antd'

import colors from 'config/colors'
import hexToRgba from 'utils/hexToRgba'

export const FooterDropdown = styled(Dropdown)`
  max-width: 158px;
  width: 100%;
  cursor: pointer;
`

export const LangTitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 34px;
  border-radius: 4px;
  padding: 0 10px;
  background-color: ${colors.footerDropdownBg};
  color: ${hexToRgba(colors.white, 0.6)};
  > div {
    display: flex;
    align-items: center;
  }
`

export const FooterDropdownMenu = styled(Menu)`
  background: ${({ bg }) => bg || colors.dark};
  padding: 5px 0;
`

export const FooterDropdownItem = styled(Menu.Item)`
  line-height: 40px;
  margin: 0 5px;
  padding: 0;
  border-radius: 4px;
  font-size: 16px;
  color: ${({ color }) => color || `${hexToRgba(colors.white, 0.6)}`};
  background-color: ${colors.footerDropdownBg};

  &.ant-dropdown-menu-item-selected,
  &:hover {
    background-color: ${colors.black};
    color: ${colors.white};
  }
`

export const Wrapper = styled.div`
  padding: 0 4px;
`

export const Image = styled.img`
  margin-right: 6px;
  color: white;
`
