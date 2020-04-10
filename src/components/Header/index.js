import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Link, withRouter } from 'react-router-dom'
import { compose, bindActionCreators } from 'redux'
import { Menu, Popover, Alert, Icon } from 'antd'
import { FormattedMessage } from 'react-intl'
import { connect } from 'react-redux'
import { Animate } from 'react-animate-mount'
import moment from 'moment'

import { sizes } from 'utils/mediaQueryTemplate'

import ExpandMoreIcon from 'assets/icons/ExpandMoreIcon'
import FingerPrintIcon from 'assets/icons/FingerPrintIcon'
import MenuIcon from 'assets/icons/MenuIcon'
import CloseIcon from 'assets/icons/CloseIcon'
import HeaderLanguageSelector from 'components/HeaderLanguageSelector'
import CollapseLanguageSelector from 'components/CollapseLanguageSelector'
import NotificationsContainer from 'components/NotificationsContainer'
import {
  PrimaryButton,
  DefaultButton,
  HeaderPopover,
  PopoverTitle,
} from 'components/Styled'

import colors from 'config/colors'
import { getBrandedConfig } from 'config/branded'

import { logOut } from 'redux/accountStore'
import { getUserInitialAvatar } from 'api'
import * as apiActions from 'api/actions'
import { Creators as UserStoreCreators } from 'redux/userStore'

import { GreenButton } from '../../pages/AboutHumanscalePage/styled'

import fullLogoImg from './assets/fullLogo.jpg'
import partialLogoImg from './assets/partialLogo.png'
import loginIcon from './assets/login.svg'
import newsBellIcon from './assets/newsBellIcon.svg'
import { ReactComponent as Atom } from '../../assets/unit-icons/atom.svg'
import { ReactComponent as Clock } from '../../assets/unit-icons/clock.svg'

import {
  LeftAlignPublic,
  RightAlign,
  CenterAlign,
  LogoImg,
  ImgLeftIndent,
  ImgRightIndent,
  HeaderWrap,
  LeftMenu,
  CenterMenu,
  RightMenu,
  Logo,
  LogoSmall,
  MenuWrap,
  Avatar,
  Name,
  Email,
  Links,
  UserInfo,
  Hamburger,
  CollapseContent,
  CollapseMenu,
  CollapseSubmenuTitle,
  CollapseTop,
  ProfileMenu,
  ProfileSettingsPopover,
  BlueBorderedButton,
  GrayBorderedButton,
  NotificationCount,
  NotificationPopoverTitle,
  TakeActionButton,
  StyledNotificationsPopover,
  StyledAffix,
  UnitsBlock,
  SVGClockWrap,
  SVGAtomWrap,
} from './styled'

// import { UIContextSettings } from '../../context/uiSettingsContext'
// const UIContextData = useContext(UIContextSettings)

const SubMenu = Menu.SubMenu

const isIE =
  navigator.userAgent.indexOf('MSIE') !== -1 ||
  navigator.appVersion.indexOf('Trident/') > -1

class Header extends Component {
  static propTypes = {
    location: PropTypes.object,
    withoutHeaderContent: PropTypes.bool,
    type: PropTypes.oneOf(['minimal', 'public', 'private']).isRequired,
    user: PropTypes.object,
    token: PropTypes.string,
    overrides: PropTypes.object,
    withRouter: PropTypes.object,
    history: PropTypes.object,
    setUser: PropTypes.func.isRequired,
  }

  static defaultProps = {
    user: {},
  }

  state = {
    collapsed: true,
    width: window.innerWidth,
    notification: [],
    unreadCount: 0,
    isFetchingNews: false,
    isPhysicalUnit: false,
    isTimeUnit: true,
  }
  fetchNewsIntervalId = null

  get selectedMenuItem() {
    const { location } = this.props

    if (location.pathname.includes('actions')) return '/actions'

    if (location.pathname.includes('groups')) return '/groups'

    if (location.pathname.includes('pages/for-organizations'))
      return '/pages/for-organizations'

    if (location.pathname.includes('organizations')) return '/organizations'

    if (location.pathname.includes('challenges')) return '/challenges'

    return location.pathname
  }

  get takenActionButton() {
    return (
      <TakeActionButton onClick={() => this.props.history.push('/actions')}>
        <FormattedMessage id="app.header.takeActionButton" />
      </TakeActionButton>
    )
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleWindowSizeChange)

    if (this.props.type === 'private') {
      // this.fetchNews()
      // this.fetchNewsIntervalId = setInterval(() => this.fetchNews(true), 10000)
    }
  }

  componentDidUpdate() {
    // if (this.fetchNewsIntervalId && !this.props.token) {
    //   clearInterval(this.fetchNewsIntervalId)
    // }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleWindowSizeChange)
    // if (this.fetchNewsIntervalId) clearInterval(this.fetchNewsIntervalId)
  }

  handleWindowSizeChange = () => {
    this.setState({ width: window.innerWidth })
  }

  fetchNews = async (counterOnly = false) => {
    this.setState({ isFetchingNews: true })
    const { news, unreadCount } = await apiActions.getNews({
      page: 1,
      range: 'network',
    })

    if (counterOnly) {
      this.setState({ unreadCount, isFetchingNews: false })
    } else {
      const { user } = this.props
      this.setState({
        loadingNews: false,
        notification: news.filter(
          item =>
            item.arguments.user.id !== user._id &&
            moment(item.date).isAfter(user.lastTimeReadNewsAt),
        ),
        unreadCount,
        isFetchingNews: false,
      })
    }
  }

  onClick = () => {
    this.setState({ collapsed: !this.state.collapsed })
  }

  sendLastTimeReadNotif = async shouldReset => {
    if (!shouldReset) return
    const date = Date.now()
    await apiActions.sendLastTimeReadNewsAt(date)
    // await this.fetchNews()
    this.props.setUser({
      ...this.props.user,
      lastTimeReadNewsAt: date,
    })
  }

  toggleTimeUnits = () => {
    this.setState({
      isPhysicalUnit: false,
      isTimeUnit: true,
    })
  }

  togglePhysicalUnits = () => {
    this.setState({
      isPhysicalUnit: true,
      isTimeUnit: false,
    })
  }

  getNotificationsPopover = (
    fontColor,
    fontNames,
    notification,
    unreadCount,
    isFetchingNews,
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
            loading={isFetchingNews}
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
          {unreadCount > 0 && (
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
    const {
      // notification,
      // unreadCount,
      width,
      collapsed,
      // isFetchingNews,
      isPhysicalUnit,
      isTimeUnit,
    } = this.state
    const isTablet = width < sizes.largeDesktop
    const isMobile = width < sizes.tablet

    const { brandColor, fontNames, fontColor } = (overrides &&
      getBrandedConfig().headerOverrides) || {
      brandColor: colors.green,
      fontNames: '"Noto Sans", sans-serif',
      fontColor: colors.darkGray,
    }
    const headerLogoLinkStyle = {
      justifyContent: 'flex-start',
      display: 'flex',
    }

    const alertStyle = {
      background: colors.orange,
      justifyContent: 'center',
      alignItems: 'center',
      display: 'flex',
    }

    const alertIconStyle = {
      fontSize: 30,
      color: 'yellow',
      textAlign: 'center',
      alignSelf: 'center',
      marginTop: 13,
    }

    return (
      <StyledAffix>
        {isIE && (
          <Alert
            style={alertStyle}
            icon={
              <Icon style={alertIconStyle} type="close-circle" theme="filled" />
            }
            message={
              <h2 style={{ textAlign: 'center' }}>
                <FormattedMessage id="app.header.ieDetected" />
              </h2>
            }
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
                    ) : overrides && overrides.brandName === 'Humanscale' ? (
                      <GrayBorderedButton>
                        <FormattedMessage id="app.header.menu.login1" />
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
                    {(!overrides || !overrides.brandName) && (
                      <Menu.Item key="/pages/for-organizations">
                        <Link to="/pages/for-organizations">
                          <FormattedMessage id="app.header.menu.forOrganizations" />
                        </Link>
                      </Menu.Item>
                    )}
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
                      {(!overrides || !overrides.brandName) && (
                        <Menu.Item key="/pages/donations">
                          <Link to="/pages/donations">
                            <FormattedMessage id="app.header.menu.donations" />
                          </Link>
                        </Menu.Item>
                      )}
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
                          {(!overrides ||
                            !overrides.brandName ||
                            overrides.brandName === 'Humanscale') && (
                            <Menu.Item key="/pages/for-organizations">
                              <Link to="/pages/for-organizations">
                                <FormattedMessage id="app.header.menu.forOrganizations" />
                              </Link>
                            </Menu.Item>
                          )}
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
                              {(!overrides || !overrides.brandName) && (
                                <Menu.Item key="/pages/donations">
                                  <Link to="/pages/donations">
                                    <FormattedMessage id="app.header.menu.donations" />
                                  </Link>
                                </Menu.Item>
                              )}
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
                                <FormattedMessage
                                  id={'app.header.menu.login'}
                                />
                              </CenterAlign>
                            </Link>
                          </Menu.Item>
                          {overrides && overrides.brandName === 'Humanscale' && (
                            <Menu.Item>
                              <Link to="/account/login">
                                <GreenButton>
                                  <FormattedMessage id="app.aboutHumanscalePage.join.link" />
                                </GreenButton>
                              </Link>
                            </Menu.Item>
                          )}
                        </Menu>
                        {((overrides && !overrides.logInOnly) ||
                          !overrides) && (
                          <Link to="/account/register">
                            <PrimaryButton type="primary" size="large">
                              <FingerPrintIcon id="primaryBtnIcon" />
                              <FormattedMessage
                                id={
                                  overrides && overrides.brandName === 'Eaton'
                                    ? 'app.header.link.eaton'
                                    : 'app.header.link'
                                }
                              />
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
                  <CollapseTop>
                    {overrides &&
                      overrides.brandName === 'Eaton' &&
                      this.takenActionButton}
                  </CollapseTop>
                )}
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
                    <Menu.Item key="/groups">
                      <Link to="/groups/discover">
                        <FormattedMessage id="app.pages.groups" />
                      </Link>
                    </Menu.Item>
                    {(!overrides || !overrides.brandName) && (
                      <Menu.Item key="/organizations">
                        <Link to="/organizations/discover">
                          <FormattedMessage id="app.header.menu.organizations" />
                        </Link>
                      </Menu.Item>
                    )}
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
                      {(!overrides || !overrides.brandName) && (
                        <Menu.Item key="/pages/donations">
                          <Link to="/pages/donations">
                            <FormattedMessage id="app.header.menu.donations" />
                          </Link>
                        </Menu.Item>
                      )}
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
                      <Menu.Item key="/account/dashboard">
                        <Link to="/account/dashboard">
                          <FormattedMessage id="app.header.menu.dashboard" />
                        </Link>
                      </Menu.Item>
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
                <Link style={overrides && headerLogoLinkStyle} to="/">
                  <img
                    src={(overrides && overrides.partialLogo) || partialLogoImg}
                    alt="Handprinter"
                  />
                </Link>
              </LogoSmall>
              {/* {isTablet &&
                !isMobile &&
                this.getNotificationsPopover(
                  fontColor,
                  fontNames,
                  notification,
                  unreadCount,
                  isFetchingNews,
                )} */}
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
                        <Menu.Item key="/actions">
                          <Link to="/actions">
                            <FormattedMessage id="app.header.menu.actions" />
                          </Link>
                        </Menu.Item>

                        <Menu.Item key="/groups">
                          <Link to="/groups/discover">
                            <FormattedMessage id="app.pages.groups" />
                          </Link>
                        </Menu.Item>
                        <Menu.Item key="/challenges">
                          <Link to="/challenges/campaigns">
                            <FormattedMessage id="app.pages.challenges" />
                          </Link>
                        </Menu.Item>
                        {(!overrides || !overrides.brandName) && (
                          <Menu.Item key="/organizations">
                            <Link to="/organizations/discover">
                              <FormattedMessage id="app.header.menu.organizations" />
                            </Link>
                          </Menu.Item>
                        )}
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
                            {(!overrides || !overrides.brandName) && (
                              <Menu.Item key="/pages/donations">
                                <Link to="/pages/donations">
                                  <FormattedMessage id="app.header.menu.donations" />
                                </Link>
                              </Menu.Item>
                            )}
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
                      {/* {this.getNotificationsPopover(
                        fontColor,
                        fontNames,
                        notification,
                        unreadCount,
                        isFetchingNews,
                      )} */}
                      <UnitsBlock>
                        <SVGAtomWrap color={isPhysicalUnit ? 'green' : 'gray'}>
                          <Atom
                            style={{
                              position: 'absolute',
                              top: '0',
                              left: '0',
                              width: '18px',
                              height: '18px',
                            }}
                            onClick={this.togglePhysicalUnits}
                          />
                        </SVGAtomWrap>
                        <SVGClockWrap color={isTimeUnit ? 'green' : 'gray'}>
                          <Clock
                            style={{
                              position: 'absolute',
                              top: '0',
                              left: '0',
                              width: '18px',
                              height: '18px',
                            }}
                            onClick={this.toggleTimeUnits}
                          />
                        </SVGClockWrap>
                      </UnitsBlock>
                      <ProfileSettingsPopover
                        placement="bottomRight"
                        overlayStyle={{ paddingTop: '10px' }}
                        content={
                          <UserInfo fontColor={fontColor}>
                            <Name>{(user && user.fullName) || ''}</Name>
                            <Email>{(user && user.email) || ''}</Email>
                            <Links>
                              <Link to="/account/dashboard">
                                <FormattedMessage id="app.header.menu.dashboard" />
                              </Link>
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
                      {overrides &&
                        overrides.brandName === 'Eaton' &&
                        this.takenActionButton}
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
  token: state.account.token,
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setUser: user => UserStoreCreators.setUser(user),
    },
    dispatch,
  )

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
)(Header)
