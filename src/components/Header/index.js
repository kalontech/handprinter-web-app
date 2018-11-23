import React from 'react'
import { Link } from 'react-router-dom'
import { Layout, Menu, Popover } from 'antd'
import { FormattedMessage } from 'react-intl'
import styled from 'styled-components'
import ExpandMoreIcon from '../../assets/icons/ExpandMoreIcon'
import FingerPrintIcon from '../../assets/icons/FingerPrintIcon'
import HeaderLanguageSelector from './../HeaderLanguageSelector'
import { PrimaryButton, HeaderPopover, Affix } from './../Styled'
import colors from './../../config/colors'
import hexToRgba from '../../utils/hexToRgba'

import logo from './assets/logo.jpg'

const PopoverTitle = styled.div`
  display: flex;
  align-items: center;
  line-height: 1;
  margin-right: 30px;
  color: ${colors.menuLink};
  cursor: pointer;

  &.ant-popover-open {
    color: ${colors.dark};
  }
`

const HeaderWrap = styled(Layout.Header)`
  background: ${colors.white};
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;

  .ant-menu-item:hover {
    color: ${hexToRgba(colors.dark, 0.8)};
    border-bottom: 3px solid transparent;
  }

  .ant-menu-item-active,
  .ant-menu-item-selected {
    border-bottom: 3px solid ${colors.green};
    color: ${colors.dark};
  }

  .ant-menu {
    border: none;
  }

  .ant-menu-item {
    padding: 0;
    border-bottom: 3px solid transparent;
    font-size: 16px;
  }

  .ant-menu-item-active {
    border-color: ${colors.green};
  }
`

const LeftMenu = styled.div`
  display: flex;
  align-items: center;

  .ant-menu-item {
    margin-right: 35px;
  }

  .anticon {
    color: ${colors.green};
  }
`

const RightMenu = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  .ant-menu-item {
    margin: 0 35px;
  }

  .ant-button {
    border-radius: 6px;
  }
`

const Logo = styled.div`
  margin-top: -20px;
  display: block;
  margin-right: 40px;
`

const MenuWrap = styled.div`
  display: flex;
  align-items: center;
`

class Header extends React.Component {
  render() {
    return (
      <Affix>
        <HeaderWrap>
          <LeftMenu>
            <Logo>
              <Link to="/">
                <img src={logo} alt="Handprinter" />
              </Link>
            </Logo>
            <MenuWrap>
              <Menu mode="horizontal">
                <Menu.Item key="actions">
                  <Link to="/actions">
                    <FormattedMessage id="app.header.menu.actions" />
                  </Link>
                </Menu.Item>
                <Menu.Item key="organizations">
                  <Link to="/pages/for-organizations">
                    <FormattedMessage id="app.header.menu.organizations" />
                  </Link>
                </Menu.Item>
              </Menu>
              <Popover
                placement="bottomLeft"
                content={
                  <HeaderPopover mode="vertical" theme="light">
                    <Menu.Item key="works">
                      <Link to="/pages/our-vision">
                        <FormattedMessage id="app.header.menu.howItWorks" />
                      </Link>
                    </Menu.Item>
                    <Menu.Item key="measurement">
                      <Link to="/pages/measurement-units">
                        <FormattedMessage id="app.header.menu.measurement" />
                      </Link>
                    </Menu.Item>
                    <Menu.Item key="faq">
                      <Link to="/pages/faq">
                        <FormattedMessage id="app.header.menu.faq" />
                      </Link>
                    </Menu.Item>
                  </HeaderPopover>
                }
              >
                <PopoverTitle>
                  <FormattedMessage id="app.header.menu.about" />
                  <ExpandMoreIcon />
                </PopoverTitle>
              </Popover>
              <HeaderLanguageSelector />
            </MenuWrap>
          </LeftMenu>
          <RightMenu>
            <Menu theme="light" mode="horizontal">
              <Menu.Item key="login">
                <Link to="/account/login">
                  <FormattedMessage id="app.header.menu.login" />
                </Link>
              </Menu.Item>
            </Menu>
            <Link to="/account/register">
              <PrimaryButton type="primary" size="large">
                <FingerPrintIcon />
                <FormattedMessage id="app.header.link" />
              </PrimaryButton>
            </Link>
          </RightMenu>
        </HeaderWrap>
      </Affix>
    )
  }
}

export default Header
