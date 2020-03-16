import React, { Component, Fragment } from 'react'
import { compose } from 'redux'
import { Col, Row, Tabs, Icon } from 'antd'
import styled, { css } from 'styled-components'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { FormattedMessage, injectIntl } from 'react-intl'
import { Link } from 'react-router-dom'
import { animateScroll } from 'react-scroll/modules'
import qs from 'qs'
import { history } from 'appRouter'
import _ from 'lodash'
import colors from 'config/colors'
import fingerprintImage from 'assets/dashboard/print.svg'
import cameraImage from 'assets/dashboard/ic_camera.svg'
import addAdmin from 'assets/dashboard/add_admin.svg'
import media from 'utils/mediaQueryTemplate'
import InfoElement, { INFO_ELEMENT_TYPES } from 'components/InfoElement'
import { QUESTIONS_ANCHOR, GROUPS_SUBSETS } from 'utils/constants'
import fetch from 'utils/fetch'
import CalendarWidget from 'components/CalendarWidget'
import GoodRatioWidget from 'components/GoodRatioWidget'
import NetworkWidget from 'components/NetworkWidget'
import { HiddenUploadPictureInput } from 'pages/ProfilePage'
import { BlockContainer, DefaultButton } from 'components/Styled'
import TabsSecondary from 'components/TabsSecondary'
import DiscoverIconComponent from 'assets/icons/DiscoverIcon'
import FlagIconComponent from 'assets/icons/FlagIcon'

import icons from 'components/ActionCardLabel/icons'
import { getUserInitialAvatar } from 'api'
import * as apiUser from 'api/user'
import { fetchGroupsList } from 'api/groups'
import {
  getOrganization,
  updateOne,
  getAdmins,
  getDashboardData,
} from 'api/organization'
import { PROFILE_PHOTO_WEIGHT_LIMIT, ACCEPT_IMAGE_FORMATS } from 'config/files'

import { convertBytesToMegabytes } from 'utils/file'

import UserDashboardActivity from 'components/UserDashboardActivity'

import Header from './header'

const WidgetContainer = styled.div`
  background-color: ${colors.white};
  border-radius: 4px;
  box-shadow: 0 1px 10px 0 rgba(52, 68, 66, 0.08);
  padding: 30px 30px 20px 30px;

  ${media.phone`
    padding: 30px 10px 30px 10px;
  `}

  ${props =>
    props.noPaddings &&
    css`
      padding: 0;
      ${media.phone`
        padding: 0;
      `}
    `};
`

const WidgetTitle = styled.p`
  color: ${colors.dark};
  font-size: 22px;
  line-height: 30px;
`

const WidgetDescription = styled.p`
  color: ${colors.darkGray};
  font-size: 14px;
  line-height: 20px;
  margin-top: 6px;
`

const WidgetHeader = styled.div`
  padding-bottom: 55px;
  ${media.desktop`
    padding-bottom: 25px;
  `}
  ${media.phone`
    padding-bottom: 28px;
  `}

  ${props =>
    props.withBorder &&
    css`
      padding-bottom: 32px;
      border-bottom: 1px solid ${colors.whiteSmoke};
    `};
`

const WidgetContent = styled.div`
  ${props =>
    props.useWidgetMinHeight &&
    `
    min-height: 500px;
  `}
  ${media.phone`
    ${props =>
      props.useWidgetMinHeight &&
      `
      min-height: auto;
    `}
  `}
`

export const DashboardHeader = styled.div`
  border-bottom: 1px solid ${colors.whiteSmoke};
  margin-bottom: 20px;
  ${media.phone`
    margin-bottom: 25px;
  `}
`

export const DashboardHeaderGreenLine = styled.div`
  background-color: ${colors.ocean};
  background-image: ${props => props.image && `url(${props.image})`};
  height: 140px;
`

const DashboardHeaderBackgrounds = styled.div``

export const HeaderFingerprintBackground = styled.div`
  background-image: ${props => !props.hideImage && `url(${fingerprintImage})`};
  background-position: top 0px center;
  background-repeat: no-repeat, no-repeat;
  height: 140px;
  ${media.phone`
    background-image: none;
  `}
`

const DashboardHeaderUserName = styled.div`
  color: ${colors.dark};
  font-size: 28px;
  line-height: 35px;
`

const DashboardHeaderUserSince = styled.div`
  color: ${colors.darkGray};
  font-size: 16px;
  line-height: 20px;
  ${media.desktop`
    margin-top: 30px;
  `}
`

const ImpactCategorySelector = styled(Tabs)`
  .ant-tabs-nav-scroll {
    text-align: center;
  }
  .ant-tabs-tab {
    padding: 16.5px 4px;
    ${media.desktop`
      padding: 16.5px 0;
    `}
    ${media.phone`
      margin: 0 25px 0 0;
    `}

    span {
      align-items: center;
      display: flex;
      font-size: 16px;
      font-weight: 400;
    }
  }

  .ant-tabs-bar {
    border-bottom: none;
    margin: 0;
  }

  .ant-tabs-ink-bar {
    height: 4px;
  }

  .ant-tabs-nav {
    ${media.desktop`
      padding: 0 20px;
      > div {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    `}
  }
`

const ImpactCategorySelectorName = styled.strong`
  ${media.phone`
    display: none;
  `}
`

const GoodRatioCol = styled(Col)`
  ${media.desktop`
    margin-top: 20px;
  `}
`

const HeaderUserInfoRowCol = styled(Col)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-left: 60px;
  ${media.largeDesktop`
     padding-left: 20px;
  `}

  ${media.desktop`
    padding: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row-reverse;
  `}
`

const WidgetBlockContainer = styled(BlockContainer)`
  filter: ${({ blur = false }) => (blur ? 'blur(10px)' : 'none')};

  ${media.phone`
    padding: 0;
    overflow: hidden;
  `};
`

const MyNetworkCol = styled(Col)`
  ${media.phone`
    margin-top: 30px;
  `}
`

export const InfoElementWrap = styled.div`
  margin-left: 5px;
  display: inline-block;
`

const InfoElementLink = styled(Link)`
  color: ${colors.white};
  text-decoration: underline;
  &:hover {
    color: ${colors.white};
    text-decoration: underline;
  }
`

const StyledIcon = styled(Icon)`
  ${media.phone`
    margin: 0 5px !important;
  `}
`

const SelectBannerWrapper = styled.div`
  height: 140px;
  width: 100%;
  position: absolute;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
`
const SelectBGImage = styled.img`
  cursor: pointer;
`
const SelectBGLabel = styled.p`
  font-weight: bold;
  font-size: 10px;
  color: ${colors.darkGray};
  text-transform: uppercase;
  font-family: Noto Sans;
  cursor: pointer;
  margin-bottom: 20px;
`

const AdminsSectionWraper = styled.div`
  height: 70px;
  display: flex;
  justify-content: space-between;
  margin: 0px 131px;
  align-items: center;
`

const AdminsSectionList = styled.div``
const AdminItem = styled.img`
  height: 42px;
  width: 42px;
  border-radius: 50%;
  object-fit: cover;
  margin-left: -15px;
  border: 1px solid ${colors.white};
`
const AdminPlusButton = styled.img`
  height: 37.5px;
  width: 37.5px;
  border-radius: 50%;
  margin-left: -15px;
  cursor: pointer;
`

const YEAR = 365
const PERMISSION_DENIED_CODE = 33
const stubs = {
  dashboard: {
    calendar: {
      climate: { 2019: { 1: [] } },
      health: { 2019: { 1: [] } },
      ecosystem: { 2019: { 1: [] } },
      water: { 2019: { 1: [] } },
      waste: { 2019: { 1: [] } },
    },
    ratio: {
      footprintDays: {
        climate: 0,
        health: 0,
        ecosystem: 0,
        water: 0,
        waste: 0,
      },
      handprintDays: {
        climate: 0,
        health: 0,
        ecosystem: 0,
        water: 0,
        waste: 0,
      },
    },
    stats: {
      personal: {
        usersInvited: 0,
        actionsTaken: 0,
        netPositiveDays: {
          climate: 0,
          health: 0,
          ecosystem: 0,
          water: 0,
          waste: 0,
        },
      },
    },
  },
}

async function fetchDashboardData(props) {
  const { personId } = props.match.params
  const { location } = props
  const query = qs.parse(location.search, { ignoreQueryPrefix: true })
  const organizationId = query && query.organizationId
  if (organizationId) {
    const { calendar, network, ratio, stats } = await getDashboardData(
      organizationId,
    )
    return { calendar, network, ratio, stats }
  }
  if (personId) {
    const [{ calendar, ratio, stats }, { user }, error] = await Promise.all([
      apiUser.getDashboardData({
        userId: personId,
        subset: 'user',
      }),
      apiUser.getUser({ userId: personId }),
    ]).catch(error => {
      if (error.code === PERMISSION_DENIED_CODE) {
        return [
          stubs.dashboard,
          {
            user: {
              fullName: props.intl.formatMessage(
                { id: 'app.dashboard.userFrom' },
                {
                  country: (
                    props.countries.find(
                      item => item._id === error.payload.country,
                    ) || {}
                  ).name,
                },
              ),
              createdAt: error.payload.personCreatedAt,
            },
          },
          error,
        ]
      }
    })

    return { calendar, ratio, stats, user, error }
  }

  const { calendar, network, ratio, stats } = await apiUser.getDashboardData()

  const resMyGroups = await fetchGroupsList({
    subset: GROUPS_SUBSETS.MY,
  })

  const myGroups = _.get(resMyGroups, 'groups.docs', [])

  return { calendar, network, ratio, stats, myGroups }
}

class DashboardPage extends Component {
  static propTypes = {
    match: PropTypes.object,
    location: PropTypes.object,
    fetch: PropTypes.func,
    loading: PropTypes.bool,
    error: PropTypes.object,
    user: PropTypes.object.isRequired,
    stats: PropTypes.object.isRequired,
    ratio: PropTypes.object.isRequired,
    network: PropTypes.object.isRequired,
    calendar: PropTypes.object.isRequired,
    intl: PropTypes.object.isRequired,
    myGroups: PropTypes.array,
  }

  state = {
    currentImpactCategory: 'climate',
    organization: undefined,
    organizationOwner: undefined,
    selectingLogo: false,
    moreAchievesVisible: false,
  }

  componentDidMount() {
    animateScroll.scrollToTop()
    this.fetchOrganization()
  }

  fetchOrganization = async () => {
    const { location } = this.props
    const query = qs.parse(location.search, { ignoreQueryPrefix: true })
    const organizationId = query && query.organizationId
    if (!organizationId) return
    try {
      const res = await getOrganization(organizationId)
      const admins = await getAdmins(organizationId)
      if (res.organization) {
        const organizationOwner = await apiUser.getUser({
          userId: res.organization.owner,
        })
        this.setState({
          organization: { ...res.organization, admins },
          organizationOwner: organizationOwner.user,
        })
      }
    } catch (error) {
      console.error(error)
    }
  }

  componentDidUpdate(prevProps) {
    const { match } = this.props

    if (prevProps.match.params.personId !== match.params.personId) {
      this.props.fetch()
    }
    if (this.props !== prevProps) {
      this.fetchOrganization()
    }
  }

  handleImpactCategoryChange = category => {
    this.setState({ currentImpactCategory: category })
  }

  handleUploadImage = async ({ target: { files } }) => {
    const file = files[0]

    if (!file) return

    if (convertBytesToMegabytes(file.size, 0) > PROFILE_PHOTO_WEIGHT_LIMIT) {
      this.setState({ uploadImageError: 'app.errors.image.wrongWeight' })
      return
    }

    const body = new FormData()
    const fileType = this.state.selectingLogo ? 'photo' : 'banner'
    body.append(fileType, file)

    try {
      const res = await updateOne(body, this.state.organization._id)
      if (res.organization) {
        let organization = {
          ...this.state.organization,
          photo: res.organization.photo,
          banner: res.organization.banner,
        }
        this.setState({ organization })
      }
    } catch (error) {
      console.error(error)
    }
  }

  handleSelectImage = selectingLogo => {
    this.setState({ selectingLogo }, () => {
      this.uploadProfilePictureRef.click()
    })
  }

  handleIncreaseOrganizationHP = () => {
    history.push(
      `/organizations/invite?organizationId=${this.state.organization._id}`,
    )
  }

  handleAddAdmin = () => {
    history.push(
      `/account/dashboard/organizations/add-admins/${
      this.state.organization._id
      }`,
    )
  }

  setMoreAchievesVisible = visible => {
    this.setState({ moreAchievesVisible: visible })
  }

  getIsOrgAdmin = () => {
    const organization = this.state.organization
    const user = this.props.user
    if (!organization || !user) return
    const adminIds = organization.admins.map(i => i._id)
    if (!adminIds) return
    return organization.owner === user._id || adminIds.includes(user._id)
  }

  render() {
    const {
      currentImpactCategory,
      organization,
      organizationOwner,
      moreAchievesVisible,
    } = this.state
    const {
      match: {
        params: { personId, subset = 'statistics' },
      },
      user,
      stats,
      ratio,
      network,
      calendar,
      error,
      intl: { formatMessage },
      myGroups,
    } = this.props

    let avatar
    if (organization) {
      avatar = organization.photo || getUserInitialAvatar(organization.name)
    } else {
      avatar = user.photo || getUserInitialAvatar(user.fullName)
    }

    const footPrintReduction = ratio
      ? Math.round(YEAR - ratio.footprintDays[currentImpactCategory])
      : 0
    const externalHandprint = ratio
      ? Math.round(ratio.handprintDays[currentImpactCategory])
      : 0
    return (
      <Fragment>
        <DashboardHeader>
          <DashboardHeaderGreenLine image={organization && organization.banner}>
            {organization && this.getIsOrgAdmin() && (
              <SelectBannerWrapper>
                <SelectBGImage
                  onClick={() => this.handleSelectImage(false)}
                  src={cameraImage}
                />
                <SelectBGLabel onClick={() => this.handleSelectImage(false)}>
                  <FormattedMessage id={'app.dashboard.selectBackground'} />
                </SelectBGLabel>

                <HiddenUploadPictureInput
                  type="file"
                  accept={Object.values(ACCEPT_IMAGE_FORMATS).join()}
                  ref={ref => (this.uploadProfilePictureRef = ref)}
                  onChange={this.handleUploadImage}
                />
              </SelectBannerWrapper>
            )}
            <DashboardHeaderBackgrounds>
              <HeaderFingerprintBackground hideImage={!!organization} />
            </DashboardHeaderBackgrounds>
          </DashboardHeaderGreenLine>
          <Header
            footPrintReduction={footPrintReduction}
            externalHandprint={externalHandprint}
            stats={stats}
            avatar={avatar}
            user={user}
            organization={organization}
            handleSelectImage={this.handleSelectImage}
            setMoreAchievesVisible={this.setMoreAchievesVisible}
            moreAchievesVisible={moreAchievesVisible}
            formatMessage={formatMessage}
            myGroups={myGroups}
          />
          <TabsSecondary
            list={[
              {
                to: '/account/dashboard/statistics',
                icon: DiscoverIconComponent,
                text: formatMessage({ id: 'app.pages.groups.statistics' }),
                active: subset === 'statistics',
              },
              {
                to: '/account/dashboard/activity',
                icon: FlagIconComponent,
                text: formatMessage({ id: 'app.pages.groups.activity' }),
                active: subset === 'activity',
              },
            ]}
            justify={'center'}
          />
          {organization && (
            <AdminsSectionWraper>
              <AdminsSectionList>
                {organizationOwner && (
                  <AdminItem
                    key={organizationOwner._id}
                    src={
                      organizationOwner.photo ||
                      getUserInitialAvatar(organizationOwner.fullName)
                    }
                  />
                )}
                {organization.admins.map(user => {
                  return (
                    <AdminItem
                      key={user.id}
                      src={user.photo || getUserInitialAvatar(user.fullName)}
                    />
                  )
                })}
                {this.getIsOrgAdmin() && (
                  <AdminPlusButton
                    onClick={this.handleAddAdmin}
                    src={addAdmin}
                  />
                )}
              </AdminsSectionList>
              {this.getIsOrgAdmin() && (
                <DefaultButton
                  type="primary"
                  htmlType="submit"
                  onClick={this.handleIncreaseOrganizationHP}
                >
                  <FormattedMessage id="app.dahsboard.organization.increaseHp" />
                </DefaultButton>
              )}
            </AdminsSectionWraper>
          )}
        </DashboardHeader>
        {subset === 'statistics' && (
          <WidgetBlockContainer
            blur={error && error.code === PERMISSION_DENIED_CODE}
          >
            <Row gutter={20}>
              <Col span={24}>
                <WidgetContainer noPaddings>
                  <WidgetContent>
                    <ImpactCategorySelector
                      defaultActiveKey={currentImpactCategory}
                      onChange={this.handleImpactCategoryChange}
                    >
                      <Tabs.TabPane
                        tab={
                          <span>
                            <StyledIcon
                              component={() => icons['positive']['climate']}
                            />
                            <ImpactCategorySelectorName>
                              <FormattedMessage id="app.impactCategories.climate" />
                            </ImpactCategorySelectorName>
                          </span>
                        }
                        key="climate"
                      />
                      <Tabs.TabPane
                        tab={
                          <span>
                            <StyledIcon
                              component={() => icons['positive']['waste']}
                            />
                            <ImpactCategorySelectorName>
                              <FormattedMessage id="app.impactCategories.waste" />
                            </ImpactCategorySelectorName>
                          </span>
                        }
                        key="waste"
                      />
                      <Tabs.TabPane
                        tab={
                          <span>
                            <StyledIcon
                              component={() => icons['positive']['water']}
                            />
                            <ImpactCategorySelectorName>
                              <FormattedMessage id="app.impactCategories.water" />
                            </ImpactCategorySelectorName>
                          </span>
                        }
                        key="water"
                      />
                      <Tabs.TabPane
                        tab={
                          <span>
                            <StyledIcon
                              component={() => icons['positive']['ecosystem']}
                            />
                            <ImpactCategorySelectorName>
                              <FormattedMessage id="app.impactCategories.ecosystem" />
                            </ImpactCategorySelectorName>
                          </span>
                        }
                        key="ecosystem"
                      />
                      <Tabs.TabPane
                        tab={
                          <span>
                            <StyledIcon
                              component={() => icons['positive']['health']}
                            />
                            <ImpactCategorySelectorName>
                              <FormattedMessage id="app.impactCategories.health" />
                            </ImpactCategorySelectorName>
                          </span>
                        }
                        key="health"
                      />
                    </ImpactCategorySelector>
                  </WidgetContent>
                </WidgetContainer>
              </Col>
            </Row>
            <Row gutter={20} style={{ marginTop: '20px' }}>
              <Col span={12} sm={24} lg={12} xs={24}>
                <WidgetContainer>
                  <WidgetHeader>
                    <WidgetTitle>
                      <FormattedMessage
                        id={
                          organization
                            ? 'app.dashboardPage.organizationNetPositiveDays'
                            : 'app.dashboardPage.myNetPositiveDays'
                        }
                      />
                      <InfoElementWrap>
                        <InfoElement
                          type={INFO_ELEMENT_TYPES.QUESTION}
                          tooltipProps={{
                            placement: 'bottomLeft',
                            title: (
                              <Fragment>
                                <p>
                                  <FormattedMessage id="app.dashboardPage.myNetPositiveDays.infoTooltip" />
                                </p>
                                <div>
                                  <InfoElementLink
                                    to={`/pages/faq#${
                                      QUESTIONS_ANCHOR.WHAT_CALENDAR_SHOWING
                                      }`}
                                  >
                                    <FormattedMessage id="app.dashboardPage.infoTooltipLinkToFAQ" />
                                  </InfoElementLink>
                                </div>
                              </Fragment>
                            ),
                          }}
                        />
                      </InfoElementWrap>
                    </WidgetTitle>
                  </WidgetHeader>
                  <WidgetContent useWidgetMinHeight>
                    {!!calendar && (
                      <CalendarWidget
                        activeDays={calendar[currentImpactCategory]}
                      />
                    )}
                  </WidgetContent>
                </WidgetContainer>
              </Col>
              <GoodRatioCol span={12} sm={24} lg={12} xs={24}>
                <WidgetContainer>
                  <WidgetHeader>
                    <WidgetTitle>
                      <FormattedMessage id="app.dashboardPage.goodRatio" />
                      <InfoElementWrap>
                        <InfoElement
                          type={INFO_ELEMENT_TYPES.QUESTION}
                          tooltipProps={{
                            placement: 'bottomLeft',
                            title: (
                              <Fragment>
                                <p>
                                  <FormattedMessage id="app.dashboardPage.goodRatio.infoTooltip" />
                                </p>
                                <div>
                                  <InfoElementLink
                                    to={`/pages/faq#${
                                      QUESTIONS_ANCHOR.WHAT_SCALE_SHOWING
                                      }`}
                                  >
                                    <FormattedMessage id="app.dashboardPage.infoTooltipLinkToFAQ" />
                                  </InfoElementLink>
                                </div>
                              </Fragment>
                            ),
                          }}
                        />
                      </InfoElementWrap>
                    </WidgetTitle>
                  </WidgetHeader>
                  <WidgetContent useWidgetMinHeight>
                    {!!ratio && (
                      <GoodRatioWidget
                        footprintDays={Math.round(
                          ratio.footprintDays[currentImpactCategory],
                        )}
                        handprintDays={Math.round(
                          ratio.handprintDays[currentImpactCategory],
                        )}
                      />
                    )}
                  </WidgetContent>
                </WidgetContainer>
              </GoodRatioCol>
            </Row>

            {!personId && stats.network && (
              <Row gutter={20} style={{ marginTop: '20px' }}>
                <Col span={24}>
                  <WidgetContainer>
                    <WidgetHeader withBorder>
                      <Row type="flex">
                        <Col span={16} sm={24} lg={11} xs={24}>
                          <WidgetTitle>
                            <FormattedMessage
                              id={
                                organization
                                  ? 'app.dashboardPage.organizationNetwork'
                                  : 'app.dashboardPage.myNetwork'
                              }
                            />
                            <InfoElementWrap>
                              <InfoElement
                                type={INFO_ELEMENT_TYPES.QUESTION}
                                tooltipProps={{
                                  placement: 'bottomLeft',
                                  title: (
                                    <Fragment>
                                      <p>
                                        <FormattedMessage id="app.dashboardPage.myNetwork.infoTooltip" />
                                      </p>
                                      <div>
                                        <InfoElementLink
                                          to={`/pages/faq#${
                                            QUESTIONS_ANCHOR.WHAT_NETWORK_SHOWING
                                            }`}
                                        >
                                          <FormattedMessage id="app.dashboardPage.infoTooltipLinkToFAQ" />
                                        </InfoElementLink>
                                      </div>
                                    </Fragment>
                                  ),
                                }}
                              />
                            </InfoElementWrap>
                          </WidgetTitle>
                          <WidgetDescription>
                            <FormattedMessage id="app.dashboardPage.myNetworkDescription" />
                          </WidgetDescription>
                        </Col>
                        <MyNetworkCol span={8} sm={24} lg={13} xs={24}>
                          <Row>
                            <HeaderUserInfoRowCol
                              span={8}
                              lg={8}
                              sm={24}
                              xs={24}
                            />
                            <HeaderUserInfoRowCol
                              span={8}
                              lg={8}
                              sm={24}
                              xs={24}
                            >
                              <DashboardHeaderUserName>
                                {stats.network.networkUsers}
                              </DashboardHeaderUserName>
                              <DashboardHeaderUserSince>
                                <FormattedMessage id="app.dashboardPage.usersInvited" />
                              </DashboardHeaderUserSince>
                            </HeaderUserInfoRowCol>
                            <HeaderUserInfoRowCol
                              span={8}
                              lg={8}
                              sm={24}
                              xs={24}
                            >
                              <DashboardHeaderUserName>
                                {stats.network.actionsTaken}
                              </DashboardHeaderUserName>
                              <DashboardHeaderUserSince>
                                <FormattedMessage id="app.dashboardPage.actionsTaken" />
                              </DashboardHeaderUserSince>
                            </HeaderUserInfoRowCol>
                          </Row>
                        </MyNetworkCol>
                      </Row>
                    </WidgetHeader>
                    <WidgetContent>
                      <NetworkWidget data={{ ...network, expanded: true }} />
                    </WidgetContent>
                  </WidgetContainer>
                </Col>
              </Row>
            )}
          </WidgetBlockContainer>
        )}
        {subset === 'activity' && <UserDashboardActivity />}
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user.data,
  countries: state.app.countries,
})

export default compose(
  injectIntl,
  connect(mapStateToProps),
  fetch(fetchDashboardData),
)(DashboardPage)
