import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { Layout, Menu, Popover, Affix, Button, Alert } from 'antd'
import { FormattedMessage } from 'react-intl'
import styled, { css } from 'styled-components'
import { connect } from 'react-redux'
import { Animate } from 'react-animate-mount'

import ExpandMoreIcon from 'assets/icons/ExpandMoreIcon'
import FingerPrintIcon from 'assets/icons/FingerPrintIcon'
import MenuIcon from 'assets/icons/MenuIcon'
import CloseIcon from 'assets/icons/CloseIcon'
import HeaderLanguageSelector from 'components/HeaderLanguageSelector'
import CollapseLanguageSelector from 'components/CollapseLanguageSelector'
import CollapsedMenu from 'components/CollapsedMenu'
import NotificationsContainer from 'components/NotificationsContainer'
import {
  PrimaryButton,
  DefaultButton,
  HeaderPopover,
  PopoverTitle,
} from 'components/Styled'
import colors from 'config/colors'
import { getBrandedConfig } from 'config/branded'
import media, { sizes } from 'utils/mediaQueryTemplate'
import hexToRgba from 'utils/hexToRgba'
import { logOut } from 'redux/accountStore'
import { getUserInitialAvatar } from 'api'
import * as apiActions from 'api/actions'

import fullLogoImg from './assets/fullLogo.jpg'
import partialLogoImg from './assets/partialLogo.png'
import loginIcon from './assets/login.svg'
import newsBellIcon from './assets/newsBellIcon.svg'

const SubMenu = Menu.SubMenu

const LeftAlignPublic = styled.div`
  margin-right: 34px;
`

const RightAlign = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  flex: 1;
`
const CenterAlign = styled.div`
  display: flex;
  align-items: center;
`
const LogoImg = styled.img`
  margin-right: 10px;
`
const ImgRightIndent = styled.img`
  margin-right: 5px;
`
const ImgLeftIndent = styled.img`
  margin-left: 5px;
`

const HeaderWrap = styled(Layout.Header)`
  position: relative;
  z-index: 970;
  background: ${colors.white};
  height: 90px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  font-family: ${({ font }) => font || '"Noto Sans", sans-serif'};
  ${media.largeDesktop`
    padding: 0 34px;
  `}
  ${media.phone`
    height: 70px;
    padding: 0 15px;
  `}
  .ant-menu-item {
    padding: 0;
    border-bottom: 3px solid transparent;
    font-size: 16px;
    a {
      color: ${({ fontColor }) => fontColor || colors.darkGray};
    }

    &:hover,
    &.ant-menu-item-active {
      color: ${hexToRgba(colors.dark, 0.8)};
      border-bottom: 3px solid transparent;
      a {
        color: inherit;
      }
    }

    &.ant-menu-item-selected {
      border-color: inherit;
      color: ${colors.dark};

      ${props =>
        !props.isLoggedIn &&
        css`
          border-bottom: 3px solid transparent;
        `}

      a {
        color: inherit;
      }
    }
  }

  .ant-menu {
    border: none;
  }
`

const LeftMenu = styled.div`
  display: flex;
  align-items: center;

  .ant-menu-item {
    margin-right: 34px;
    line-height: 85px;
  }
`

const CenterMenu = styled(LeftMenu)`
  flex: 1;
  display: flex;
  justify-content: center;
  .ant-menu-item {
    margin-right: 40px;
  }
  .ant-menu-horizontal {
    border-color: ${({ borderColor }) => borderColor || colors.green};
  }
`

const RightMenu = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;

  a {
    display: inline-flex;
    margin-left: 35px;
  }

  .ant-button {
    border-radius: 6px;
  }
`

const Logo = styled.div`
  margin-right: 40px;
`

const LogoSmall = styled.div`
  display: block;
  flex: 1;
  justify-content: flex-start;
  ${media.largeDesktop`
    justify-content: center;
  `}
  a {
    display: flex;
    justify-content: center;
  }
`

const MenuWrap = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;

  .ant-menu-horizontal {
    border-color: ${({ borderColor }) => borderColor || colors.green};
  }
`

const Avatar = styled.div`
  height: 42px;
  width: 42px;
  box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.1);
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
  font-size: 19px;
  line-height: 27px;
  color: inherit;
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
  color: ${({ fontColor }) => fontColor || colors.darkGray};
`

const Hamburger = styled.div`
  display: flex;
  align-items: center;
  color: ${colors.darkGray};
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    color: ${colors.dark};
  }
`

const CollapseMenu = styled(CollapsedMenu)`
  z-index: 1;
  position: fixed;
  top: 90px;
  bottom: 0;
  left: 0;
  width: 100%;
  background: ${colors.white};
  color: ${colors.dark};
  overflow: auto;
  ${media.phone`
    top: 70px;
  `}
`

const CollapseTop = styled.div`
  display: flex;
  justify-content: center;
  padding: 28px 80px;
  background: ${colors.lightGray};
  ${media.phone`
    flex-direction: column;
    justify-content: center;
    padding: 20px 15px;
  `}
  a {
    width: 100%;
    display: flex;
    justify-content: center;
    margin-right: 15px;
    &:last-child {
      margin-right: 0;
      margin-bottom: 0;
    }
    .ant-btn {
      width: 100%;
    }
    ${media.phone`
      margin-bottom: 10px;
      margin-right: 0;
    `}
  }
`
const CollapseSubmenuTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  font-size: 16px;
  padding: 0 45px;
  ${media.phone`
    padding: 0 15px;
  `}
`

const CollapseContent = styled.div`
  padding: 0 35px;
  .ant-menu-inline {
    border: none;
    .ant-menu-item {
      padding-left: 0;
      margin: 0;
      padding-right: 0;
      border-bottom: 1px solid ${hexToRgba(colors.dark, 0.17)};
      height: auto;
      font-size: 16px;
      color: ${colors.dark};
      &.ant-menu-item-active,
      &.ant-menu-item-selected {
        background: none;
        color: ${colors.dark};
        &:after {
          display: none;
        }
      }
      a {
        padding: 0 45px;
        line-height: 80px;
        white-space: nowrap;
        color: inherit;
        ${media.phone`
          padding: 0 15px;
        `}
      }
    }

    .ant-menu-submenu {
      padding: 20px 0;
      border-bottom: 1px solid ${hexToRgba(colors.dark, 0.17)};
      .ant-menu-submenu-title {
        height: auto;
      }
      .ant-menu-item {
        border: none;
        height: auto;
        margin-top: 25px;
        line-height: normal;
        color: ${colors.dark};
        a {
          padding-left: 105px;
          line-height: normal;
          color: inherit;
          ${media.phone`
            padding-left: 30px;
          `}
        }
      }
    }

    .ant-menu-submenu-arrow {
      display: none;
    }

    .ant-menu-submenu-open {
      .anticon {
        transform: rotate(-180deg);
      }
    }

    .anticon {
      margin-right: -15px;
      transition: transform 0.3s;
      ${media.phone`
       margin-right: 0;
      `}
    }

    .ant-menu-submenu-title {
      padding-left: 0;
      padding-right: 0;
      margin: 0;
      display: flex;
      overflow: visible;
      color: ${colors.dark};
    }
  }
  ${media.phone`
    padding: 0 15px;
  `}
`

const ProfileSettingsPopover = styled(Popover)`
  .ant-popover-content .ant-popover-arrow {
    top: 3px;
  }
`

const ProfileMenu = styled.div`
  color: inherit;

  .menu-item__user-data {
    flex-grow: 1;
  }

  .menu-item__user-data > p:last-child {
    max-width: 100%;
    white-space: normal;
    word-break: break-all;
  }

  div${Avatar} {
    margin-right: 15px;
  }

  p${Name} {
    color: ${colors.dark};
  }
`

const StyledAffix = styled(Affix)`
  .ant-affix {
    z-index: 970;
    width: 100% !important;
    box-shadow: 0 1px 10px 0 ${hexToRgba(colors.dark, 0.08)};
  }
`

const BlueBorderedButton = styled(Button)`
  border: 2px solid ${colors.darkBlue};
  background: transparent;
  border-radius: 0;
  color: ${colors.darkBlue};
  &&:hover,
  &&:focus {
    border-color: ${colors.darkBlue};
    background: ${colors.darkBlue};
    color: ${colors.white};
    }
  }
`
const GrayBorderedButton = styled(Button)`
  border: 1px solid ${colors.interfaceFooterColor2};
  background: transparent;
  border-radius: 2px;
  color: ${colors.interfaceFooterColor2};
  &&:hover,
  &&:focus {
    border-color: ${colors.interfaceFooterColor2};
    background: ${colors.interfaceFooterColor2};
    color: ${colors.white};
    }
  }
`

const StyledNotificationsPopover = styled(Popover)`
  .ant-popover-inner-content {
    padding: 0;
  }
  .ant-popover-content .ant-popover-arrow {
    top: 3px;
    background-color: ${colors.green};
    border-color: ${colors.green};
  }
`

const NotificationPopoverTitle = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  margin-right: 17px;
  width: 50px;
  ${media.largeDesktop`
    margin-right: 0;
  `}
  img {
    cursor: pointer;
    opacity: 0.4;
  }
`

const NotificationCount = styled.div`
  width: 15px;
  height: 15px;
  position: absolute;
  top: 5px;
  right: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: #e67424;
  font-family: ${({ fontNames }) => fontNames || '"Noto Sans", sans-serif'};
  font-weight: bold;
  line-height: 10px;
  font-size: 10px;
  color: ${colors.white};

  ${media.largeDesktop`
    top: -5px;
  `}
`

const isIE =
  navigator.userAgent.indexOf('MSIE') !== -1 ||
  navigator.appVersion.indexOf('Trident/') > -1

class Header extends Component {
  state = {
    collapsed: true,
    width: window.innerWidth,
    notification: [],
    unreadCount: 0,
  }
  fetchNewsIntervalId = null

  get selectedMenuItem() {
    const { location } = this.props

    if (location.pathname.includes('actions')) return '/actions'

    if (location.pathname.includes('groups')) return '/groups'

    return location.pathname
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleWindowSizeChange)

    if (this.props.type === 'private') {
      this.fetchNews()
      this.fetchNewsIntervalId = setInterval(() => this.fetchNews(true), 10000)
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowSizeChange)

    if (this.fetchNewsIntervalId) clearInterval(this.fetchNewsIntervalId)
  }

  handleWindowSizeChange = () => {
    this.setState({ width: window.innerWidth })
  }

  fetchNews = async (counterOnly = false) => {
    const { news, unreadCount } = await apiActions.getNews({
      page: 1,
      range: 'network',
    })

    if (counterOnly) {
      this.setState({ unreadCount })
    } else {
      this.setState({
        loadingNews: false,
        notification: news.filter(
          item => item.arguments.user.id !== this.props.user._id,
        ),
        unreadCount,
      })
    }
  }

  onClick = () => {
    this.setState({ collapsed: !this.state.collapsed })
  }

  sendLastTimeReadNotif = async shouldReset => {
    if (!shouldReset) return

    await apiActions.sendLastTimeReadNewsAt(Date.now())
    this.fetchNews()
  }

  getNotificationsPopover = (
    fontColor,
    fontNames,
    notification,
    unreadCount,
  ) => {
    return (
      <StyledNotificationsPopover
        overlayClassName="notification-popover"
        placement="bottomRight"
        trigger={['hover', 'click']}
        overlayStyle={{ paddingTop: '10px' }}
        content={
          <NotificationsContainer
            notification={notification}
            fontColor={fontColor}
            fontNames={fontNames}
          />
        }
        getPopupContainer={() => this.$notifContainer}
        onVisibleChange={this.sendLastTimeReadNotif}
      >
        <NotificationPopoverTitle
          ref={node => {
            this.$notifContainer = node
          }}
        >
          <img src={newsBellIcon} alt="" />
          {unreadCount > 1 && (
            <NotificationCount fontNames={fontNames}>
              {unreadCount}
            </NotificationCount>
          )}
        </NotificationPopoverTitle>
      </StyledNotificationsPopover>
    )
  }

  render() {
    const { type, user, withoutHeaderContent, location, overrides } = this.props
    const { notification, unreadCount, width, collapsed } = this.state
    const isTablet = width < sizes.largeDesktop
    const isMobile = width < sizes.tablet

    const { brandColor, fontNames, fontColor } = (overrides &&
      getBrandedConfig().headerOverrides) || {
      brandColor: colors.green,
      fontNames: '"Noto Sans", sans-serif',
      fontColor: colors.darkGray,
    }

    return (
      <StyledAffix>
        {isIE && (
          <Alert
            message={<FormattedMessage id="app.header.ieDetected" />}
            banner
          />
        )}

        {type === 'minimal' && (
          <HeaderWrap isLoggedIn={user}>
            <Logo>
              <Link to="/">
                <img
                  src={
                    isMobile
                      ? (overrides && overrides.partialLogo) || partialLogoImg
                      : (overrides && overrides.fullLogo) || fullLogoImg
                  }
                  alt="Handprinter"
                />
              </Link>
            </Logo>
          </HeaderWrap>
        )}
        {type === 'public' && (
          <Fragment>
            <Animate type="fade" show={!collapsed && isTablet}>
              <CollapseMenu>
                <CollapseTop>
                  {((overrides && !overrides.logInOnly) || !overrides) && (
                    <Link to="/account/register" onClick={this.onClick}>
                      <PrimaryButton
                        type="primary"
                        size="large"
                        style={overrides && { borderRadius: '0' }}
                      >
                        <FingerPrintIcon id="primaryBtnIcon" />
                        <FormattedMessage id={'app.header.link'} />
                      </PrimaryButton>
                    </Link>
                  )}
                  <Link to="/account/login" onClick={this.onClick}>
                    {overrides && overrides.brandName === 'Eaton' ? (
                      <BlueBorderedButton>
                        <FormattedMessage id="app.header.menu.login" />
                      </BlueBorderedButton>
                    ) : overrides && overrides.brandName === 'Interface' ? (
                      <GrayBorderedButton>
                        <FormattedMessage id="app.header.menu.login" />
                      </GrayBorderedButton>
                    ) : (
                      <DefaultButton type="primary" size="large">
                        <FormattedMessage id="app.header.menu.login" />
                      </DefaultButton>
                    )}
                  </Link>
                </CollapseTop>
                <CollapseContent>
                  <Menu
                    mode="inline"
                    inlineIndent={0}
                    selectedKeys={[this.selectedMenuItem]}
                    onClick={this.onClick}
                  >
                    <Menu.Item key="/actions">
                      <Link to="/actions">
                        <FormattedMessage id="app.header.menu.actions" />
                      </Link>
                    </Menu.Item>
                    <SubMenu
                      key="about"
                      title={
                        <CollapseSubmenuTitle>
                          <FormattedMessage id="app.header.menu.about" />
                          <ExpandMoreIcon iconColor={brandColor} />
                        </CollapseSubmenuTitle>
                      }
                    >
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
                    </SubMenu>
                  </Menu>
                  <CollapseLanguageSelector iconColor={brandColor} />
                </CollapseContent>
              </CollapseMenu>
            </Animate>

            <HeaderWrap
              isLoggedIn={user}
              font={fontNames}
              fontColor={fontColor}
            >
              <Logo>
                <Link to="/">
                  {(!isMobile && (
                    <img
                      src={(overrides && overrides.fullLogo) || fullLogoImg}
                      alt="Handprinter"
                      style={(!overrides && { marginTop: '-20px' }) || null}
                    />
                  )) || (
                    <img
                      src={
                        (overrides && overrides.partialLogo) || partialLogoImg
                      }
                      alt="Handprinter"
                    />
                  )}
                </Link>
              </Logo>
              {!withoutHeaderContent && (
                <Fragment>
                  {(!isTablet && (
                    <MenuWrap borderColor="transparent">
                      <LeftMenu>
                        <Menu
                          mode="horizontal"
                          selectedKeys={[this.selectedMenuItem]}
                        >
                          <Menu.Item key="/actions">
                            <Link to="/actions">
                              <FormattedMessage id="app.header.menu.actions" />
                            </Link>
                          </Menu.Item>
                        </Menu>
                        <Popover
                          placement="bottomLeft"
                          content={
                            <HeaderPopover
                              mode="vertical"
                              theme="light"
                              fontColor={fontColor}
                            >
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
                            </HeaderPopover>
                          }
                        >
                          <LeftAlignPublic>
                            <PopoverTitle fontColor={fontColor}>
                              <FormattedMessage id="app.header.menu.about" />
                              <ExpandMoreIcon iconColor={brandColor} />
                            </PopoverTitle>
                          </LeftAlignPublic>
                        </Popover>
                        <HeaderLanguageSelector
                          fontColor={fontColor}
                          iconColor={brandColor}
                        />
                      </LeftMenu>
                      <RightMenu>
                        <Menu
                          theme="light"
                          mode="horizontal"
                          selectedKeys={[location.pathname]}
                        >
                          <Menu.Item key="/account/login">
                            <Link to="/account/login">
                              <CenterAlign>
                                {overrides &&
                                  overrides.brandName === 'Interface' && (
                                    <LogoImg src={loginIcon} alt="icon" />
                                  )}
                                <FormattedMessage id="app.header.menu.login" />
                              </CenterAlign>
                            </Link>
                          </Menu.Item>
                        </Menu>
                        {((overrides && !overrides.logInOnly) ||
                          !overrides) && (
                          <Link to="/account/register">
                            <PrimaryButton type="primary" size="large">
                              <FingerPrintIcon id="primaryBtnIcon" />
                              <FormattedMessage id={'app.header.link'} />
                            </PrimaryButton>
                          </Link>
                        )}
                      </RightMenu>
                    </MenuWrap>
                  )) || (
                    <Hamburger onClick={this.onClick}>
                      {collapsed && <MenuIcon />}
                      {!collapsed && <CloseIcon />}
                    </Hamburger>
                  )}
                </Fragment>
              )}
            </HeaderWrap>
          </Fragment>
        )}
        {type === 'private' && (
          <Fragment>
            <Animate type="fade" show={!collapsed && isTablet}>
              <CollapseMenu>
                {((overrides && !overrides.logInOnly) || !overrides) && (
                  <CollapseTop />
                )}
                <CollapseContent>
                  <Menu
                    mode="inline"
                    inlineIndent={0}
                    selectedKeys={[this.selectedMenuItem]}
                    onClick={this.onClick}
                  >
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
                    <Menu.Item key="/account/news">
                      <Link to="/account/news">
                        <FormattedMessage id="app.header.menu.news" />
                      </Link>
                    </Menu.Item>
                    <Menu.Item key="/groups">
                      <Link to="/groups/discover">
                        <FormattedMessage id="app.pages.groups" />
                      </Link>
                    </Menu.Item>
                    <SubMenu
                      key="about"
                      title={
                        <CollapseSubmenuTitle>
                          <FormattedMessage id="app.header.menu.about" />
                          <ExpandMoreIcon iconColor={brandColor} />
                        </CollapseSubmenuTitle>
                      }
                    >
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
                    </SubMenu>
                    {overrides &&
                    overrides.inLinkLogo &&
                    overrides.brandName === 'Eaton' ? (
                      <Menu.Item key="/pages/home">
                        <Link to="/">
                          <CenterAlign>
                            <FormattedMessage id="app.header.menu.aboutEaton" />
                            <ImgLeftIndent src={overrides.inLinkLogo} />
                          </CenterAlign>
                        </Link>
                      </Menu.Item>
                    ) : overrides &&
                      overrides.inLinkLogo &&
                      overrides.brandName === 'Interface' ? (
                      <Menu.Item key="/pages/home">
                        <Link to="/">
                          <CenterAlign>
                            <ImgRightIndent src={overrides.inLinkLogo} />
                            <FormattedMessage id="app.header.menu.aboutInterface" />
                          </CenterAlign>
                        </Link>
                      </Menu.Item>
                    ) : null}

                    <SubMenu
                      key="lang"
                      title={
                        <CollapseSubmenuTitle>
                          <ProfileMenu>
                            <PopoverTitle>
                              <Avatar>
                                <img
                                  src={
                                    user
                                      ? user.photo ||
                                        getUserInitialAvatar(user.fullName)
                                      : ''
                                  }
                                  alt="Avatar"
                                />
                              </Avatar>
                              <div className="menu-item__user-data">
                                <Name>{(user && user.fullName) || ''}</Name>
                                <Email>{(user && user.email) || ''}</Email>
                              </div>
                            </PopoverTitle>
                          </ProfileMenu>
                          <ExpandMoreIcon iconColor={brandColor} />
                        </CollapseSubmenuTitle>
                      }
                    >
                      <Menu.Item key="/account/profile">
                        <Link to="/account/profile">
                          <FormattedMessage id="app.header.menu.profileSettings" />
                        </Link>
                      </Menu.Item>
                      <Menu.Item key="/account/code">
                        <Link to="/account/code">
                          <FormattedMessage id="app.header.menu.increaseHandprint" />
                        </Link>
                      </Menu.Item>
                      <Menu.Item key="logOut">
                        <a onClick={logOut}>
                          <FormattedMessage id="app.header.menu.signOut" />
                        </a>
                      </Menu.Item>
                    </SubMenu>
                  </Menu>
                  <CollapseLanguageSelector color={brandColor} />
                </CollapseContent>
              </CollapseMenu>
            </Animate>

            <HeaderWrap
              isLoggedIn={user}
              font={fontNames}
              fontColor={fontColor}
            >
              {isTablet && (
                <Hamburger onClick={this.onClick}>
                  {collapsed && <MenuIcon />}
                  {!collapsed && <CloseIcon />}
                </Hamburger>
              )}
              <LogoSmall>
                <Link to={overrides ? '/pages/home' : '/account/dashboard'}>
                  <img
                    src={(overrides && overrides.partialLogo) || partialLogoImg}
                    alt="Handprinter"
                  />
                </Link>
              </LogoSmall>
              {isTablet &&
                !isMobile &&
                this.getNotificationsPopover(
                  fontColor,
                  fontNames,
                  notification,
                  unreadCount,
                )}
              <Fragment>
                {!isTablet && (
                  <Fragment>
                    <CenterMenu
                      defaultSelectedKeys="actions"
                      borderColor={brandColor}
                    >
                      <Menu
                        mode="horizontal"
                        selectedKeys={[this.selectedMenuItem]}
                      >
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

                        <Menu.Item key="/account/news">
                          <Link to="/account/news">
                            <FormattedMessage id="app.header.menu.news" />
                          </Link>
                        </Menu.Item>

                        <Menu.Item key="/groups">
                          <Link to="/groups/discover">
                            <FormattedMessage id="app.pages.groups" />
                          </Link>
                        </Menu.Item>

                        {overrides &&
                        overrides.inLinkLogo &&
                        overrides.brandName === 'Eaton' ? (
                          <Menu.Item key="/pages/home">
                            <Link to="/">
                              <CenterAlign>
                                <ImgRightIndent src={overrides.inLinkLogo} />
                                <FormattedMessage id="app.header.menu.aboutEaton" />
                              </CenterAlign>
                            </Link>
                          </Menu.Item>
                        ) : overrides &&
                          overrides.inLinkLogo &&
                          overrides.brandName === 'Interface' ? (
                          <Menu.Item key="/pages/home">
                            <Link to="/">
                              <CenterAlign>
                                <ImgRightIndent src={overrides.inLinkLogo} />
                                <FormattedMessage id="app.header.menu.aboutInterface" />
                              </CenterAlign>
                            </Link>
                          </Menu.Item>
                        ) : null}
                      </Menu>
                      <Popover
                        placement="bottomLeft"
                        content={
                          <HeaderPopover
                            mode="vertical"
                            theme="light"
                            fontColor={fontColor}
                          >
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
                          </HeaderPopover>
                        }
                      >
                        <LeftAlignPublic>
                          <PopoverTitle fontColor={fontColor}>
                            <FormattedMessage id="app.header.menu.about" />
                          </PopoverTitle>
                        </LeftAlignPublic>
                      </Popover>
                    </CenterMenu>
                    <RightAlign>
                      {this.getNotificationsPopover(
                        fontColor,
                        fontNames,
                        notification,
                        unreadCount,
                      )}
                      <ProfileSettingsPopover
                        placement="bottomRight"
                        overlayStyle={{ paddingTop: '10px' }}
                        content={
                          <UserInfo fontColor={fontColor}>
                            <Name>{(user && user.fullName) || ''}</Name>
                            <Email>{(user && user.email) || ''}</Email>
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
                        getPopupContainer={() => this.$profileSettingsPopover}
                      >
                        <PopoverTitle
                          fontColor={fontColor}
                          ref={node => {
                            this.$profileSettingsPopover = node
                          }}
                        >
                          <Avatar>
                            <img
                              src={
                                user
                                  ? user.photo ||
                                    getUserInitialAvatar(user.fullName)
                                  : ''
                              }
                              alt="Avatar"
                            />
                          </Avatar>
                        </PopoverTitle>
                      </ProfileSettingsPopover>
                    </RightAlign>
                  </Fragment>
                )}
              </Fragment>
            </HeaderWrap>
          </Fragment>
        )}
      </StyledAffix>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user.data,
})

Header.defaultProps = {
  user: {},
}

Header.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }),
  withoutHeaderContent: PropTypes.bool,
  type: PropTypes.oneOf(['minimal', 'public', 'private']).isRequired,
  user: PropTypes.object,
  overrides: PropTypes.object,
}

export default connect(mapStateToProps)(Header)
