import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Layout, Menu, Popover, Affix } from 'antd'
import { FormattedMessage } from 'react-intl'
import styled from 'styled-components'
import { connect } from 'react-redux'
import ExpandMoreIcon from '../../assets/icons/ExpandMoreIcon'
import FingerPrintIcon from '../../assets/icons/FingerPrintIcon'
import HeaderLanguageSelector from './../HeaderLanguageSelector'
import { PrimaryButton, HeaderPopover } from './../Styled'
import colors from './../../config/colors'
import hexToRgba from '../../utils/hexToRgba'
import { logOut } from './../../redux/accountStore'

import fullLogoImg from './assets/fullLogo.jpg'
import partialLogoImg from './assets/partialLogo.png'

const PopoverTitle = styled.div`
  display: flex;
  align-items: center;
  line-height: 1;
  color: ${colors.menuLink};
  cursor: pointer;

  &.ant-popover-open {
    color: ${colors.dark};
  }
`

const LeftAlign = styled.div`
  margin-right: 30px;
`

const RightAlign = styled.div`
  margin-left: 30px;
`

const HeaderWrap = styled(Layout.Header)`
  background: ${colors.white};
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;

  .ant-menu-item {
    &:hover,
    &.ant-menu-item-active {
      color: ${hexToRgba(colors.dark, 0.8)};
      border-bottom: 3px solid transparent;
      a {
        color: inherit;
      }
    }

    &.ant-menu-item-selected {
      border-bottom: 3px solid ${colors.green};
      color: ${colors.dark};
      a {
        color: inherit;
      }
    }
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
    line-height: 87px;
  }

  .anticon {
    color: ${colors.green};
  }
`

const CenterMenu = styled(LeftMenu)`
  .ant-menu-item {
    margin: 0 18px;
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

const LogoSmall = styled.div`
  display: block;
  margin-right: 40px;
  a {
    display: flex;
    aligh-items: center;
  }
`

const MenuWrap = styled.div`
  display: flex;
  align-items: center;
`

const Avatar = styled.div`
  height: 42px;
  width: 42px;
  box-shadow: 0 0 10px 1px rgba(0, 0, 0, 0.2);
  border-radius: 50px;
  background: ${colors.white};
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${colors.green};
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center;
  }
`

const Name = styled.p`
  font-family: 'Noto Serif', serif;
  font-size: 19px;
  line-height: 27px;
`

const Email = styled.p`
  color: ${colors.darkGray};
`

const Links = styled.div`
  position: relative;
  margin-top: 37px;
  &:before {
    position: absolute;
    top: -20px;
    left: -10px;
    right: -10px;
    content: '';
    height: 1px;
    background: ${hexToRgba(colors.dark, 0.17)};
  }
  a {
    display: block;
    margin-bottom: 10px;
    font-size: 16px;
    line-height: 20px;
  }
`
const UserInfo = styled.div`
  padding: 8px 4px;
`

const Header = ({ type, user, withoutHeaderContent, location }) => (
  <Affix>
    {type === 'minimal' && (
      <HeaderWrap>
        <LeftMenu>
          <Logo>
            <Link to="/">
              <img src={fullLogoImg} alt="Handprinter" />
            </Link>
          </Logo>
        </LeftMenu>
      </HeaderWrap>
    )}
    {type === 'public' && (
      <HeaderWrap>
        <LeftMenu>
          <Logo>
            <Link to="/">
              <img src={fullLogoImg} alt="Handprinter" />
            </Link>
          </Logo>
          {!withoutHeaderContent && (
            <Fragment>
              <MenuWrap>
                <Menu mode="horizontal" selectedKeys={[location.pathname]}>
                  <Menu.Item key="/actions">
                    <Link to="/actions">
                      <FormattedMessage id="app.header.menu.actions" />
                    </Link>
                  </Menu.Item>
                </Menu>
                <Popover
                  placement="bottomLeft"
                  content={
                    <HeaderPopover mode="vertical" theme="light">
                      <Menu selectedKeys={[location.pathname]}>
                        <Menu.Item key="/pages/our-vision">
                          <Link to="/pages/our-vision">
                            <FormattedMessage id="app.header.menu.howItWorks" />
                          </Link>
                        </Menu.Item>
                        <Menu.Item key="/pages/measurement-units">
                          <Link to="/pages/measurement-units">
                            <FormattedMessage id="app.header.menu.measurement" />
                          </Link>
                        </Menu.Item>
                        <Menu.Item key="/pages/faq">
                          <Link to="/pages/faq">
                            <FormattedMessage id="app.header.menu.faq" />
                          </Link>
                        </Menu.Item>
                      </Menu>
                    </HeaderPopover>
                  }
                >
                  <LeftAlign>
                    <PopoverTitle>
                      <FormattedMessage id="app.header.menu.about" />
                      <ExpandMoreIcon />
                    </PopoverTitle>
                  </LeftAlign>
                </Popover>
                <HeaderLanguageSelector />
              </MenuWrap>
            </Fragment>
          )}
        </LeftMenu>
        {!withoutHeaderContent && (
          <Fragment>
            <RightMenu>
              <Menu
                theme="light"
                mode="horizontal"
                selectedKeys={[location.pathname]}
              >
                <Menu.Item key="/account/login">
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
          </Fragment>
        )}
      </HeaderWrap>
    )}
    {type === 'private' && (
      <HeaderWrap>
        <LogoSmall>
          <Link to="/account/dashboard">
            <img src={partialLogoImg} alt="Handprinter" />
          </Link>
        </LogoSmall>
        <CenterMenu defaultSelectedKeys="actions">
          <Menu mode="horizontal" selectedKeys={[location.pathname]}>
            <Menu.Item key="/account/dashboard">
              <Link to="/account/dashboard">
                <FormattedMessage id="app.header.menu.dashboard" />
              </Link>
            </Menu.Item>
            <Menu.Item key="/actions">
              <Link to="/actions">
                <FormattedMessage id="app.header.menu.actions" />
              </Link>
            </Menu.Item>
          </Menu>
        </CenterMenu>
        <div>
          <RightAlign>
            <Popover
              placement="bottomRight"
              content={
                <UserInfo>
                  <Name>{user.fullName}</Name>
                  <Email>{user.email}</Email>
                  <Links>
                    <Link to="/account/profile">
                      <FormattedMessage id="app.header.menu.profileSettings" />
                    </Link>
                    <Link to="/account/code">
                      <FormattedMessage id="app.header.menu.increaseHandprint" />
                    </Link>
                    <a onClick={logOut}>
                      <FormattedMessage id="app.header.menu.signOut" />
                    </a>
                  </Links>
                </UserInfo>
              }
            >
              <PopoverTitle>
                <Avatar>
                  {user.photo ? (
                    <img src={user.photo} alt="Avatar" />
                  ) : (
                    user.fullName.slice(0, 1).toUpperCase()
                  )}
                </Avatar>
              </PopoverTitle>
            </Popover>
          </RightAlign>
        </div>
      </HeaderWrap>
    )}
  </Affix>
)

const mapStateToProps = state => ({
  user: state.user.data,
})

Header.defaultProps = {
  user: null,
}

Header.propTypes = {
  location: {
    pathname: PropTypes.string.isRequired,
  },
  withoutHeaderContent: PropTypes.bool.isRequired,
  type: PropTypes.oneOf(['minimal', 'public', 'private']).isRequired,
  user: PropTypes.object,
}

export default connect(mapStateToProps)(Header)
