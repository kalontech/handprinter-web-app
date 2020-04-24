import React, { Fragment, PureComponent } from 'react'
import { compose } from 'redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { intlShape, injectIntl, FormattedMessage } from 'react-intl'
import styled, { css } from 'styled-components'
import qs from 'qs'
import { animateScroll } from 'react-scroll/modules'
import Icon from 'antd/lib/icon'
import Tooltip from 'antd/lib/tooltip'
import Row from 'antd/lib/row'
import Col from 'antd/lib/col'
import Tabs from 'antd/lib/tabs'
import notification from 'antd/lib/notification'
import _ from 'lodash'
import Print from 'assets/icons/fingerprint-part.svg'
import FlagIconComponent from 'assets/icons/FlagIcon'
import SuggestedIcon from 'assets/icons/SuggestedIcon'

import colors from 'config/colors'
import {
  QUESTIONS_ANCHOR,
  MEMBER_GROUP_ROLES,
  USER_GROUP_STATUSES,
  GROUPS_STATUSES,
} from 'utils/constants'
import fetch from 'utils/fetch'
import decodeError from 'utils/decodeError'
import media, { sizes } from 'utils/mediaQueryTemplate'
import hexToRgba from 'utils/hexToRgba'
import CalendarWidget from 'components/CalendarWidget'
import GoodRatioWidget from 'components/GoodRatioWidget'
import Spinner from 'components/Spinner'
import NewsList from 'components/NewsList'
import GroupDetailedForm from 'components/GroupDetailedForm'
import GroupManage from 'components/GroupManage'
import TabsSecondary, { TABS_TYPES } from 'components/TabsSecondary'
import MemberCard from 'components/MemberCard'
import icons from 'components/ActionCardLabel/icons'
import { SecondaryButton, Modal, Pagination } from 'components/Styled'
import InfoElement, { INFO_ELEMENT_TYPES } from 'components/InfoElement'
import { getUserInitialAvatar } from 'api'
import * as apiUser from 'api/user'
import * as apiActions from 'api/actions'
import {
  fetchUpdateGroup,
  getBrandGroup,
  getBrandGroupMembers,
} from 'api/groups'

import {
  Achievements,
  AchievementPopover,
  PopoverWrapper,
  PopoverTitle,
  PopoverText,
  Achievement,
  OtherAchievementsText,
  AchievementModal,
  AchievementTitle,
  AchievementFooter,
  AchievementFooterButton,
  ModalContent,
  AchievementRow,
  AchievementCol,
} from '../DashboardPage/header'

const Block = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  flex-grow: 1;
  background-color: ${colors.lightGray};
  min-height: 500px;
  position: relative;
`

const SpinnerStyled = styled(Spinner)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%) translateY(-50%);
`

const FingerPrint = styled.div`
  height: 140px;
  width: 100%;
  text-align: center;
  background: ${colors.ocean} url(${Print}) no-repeat center bottom;
  background-size: initial;
`

const Container = styled.div`
  width: 100%;
  max-width: 1180px;
  flex-grow: 1;
  display: flex;
  align-items: center;
  padding: 10px 0;
  margin: 0 auto;

  ${media.largeDesktop`
    padding-left: 34px;
    padding-right: 34px;
  `}

  ${media.phone`
    padding-left: 15px;
    padding-right: 15px;  
  `}

  > button:last-child,
  > div:last-child {
    margin-left: auto;
  }
`

const WhiteBlock = styled.div`
  width: 100%;
  background-color: ${colors.white};
  padding: 0;
  margin: 0;
`

const UserPhoto = styled.img`
  z-index: 2;
  width: 42px;
  height: 42px;
  object-fit: cover;
  border-radius: 50%;
`

const DashedAdminCircle = styled.button`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  position: relative;
  border: 1px solid ${colors.gray};
  display: flex;
  align-items: center;
  justify-content: center;
  outline: 0;
  background-color: transparent;
  cursor: pointer;
  transform: translateX(${({ index }) => `${index * -10}px`});
  z-index: 1;

  i {
    opacity: 0.4;
  }

  .ant-tooltip-inner {
    width: 154px;
    text-align: center;
  }
`

const Counter = styled.span`
  position: absolute;
  top: 0;
  right: 0;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: ${colors.blue};
  color: ${colors.white};
  font-size: 10px;
`

const TooltipTitle = styled.span`
  line-height: 20px;
  font-size: 14px;
  min-width: 144px;
`

const Content = styled.section`
  width: 100%;
  max-width: 1180px;
  min-height: 300px;
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

const Column = styled(Col)`
  margin-bottom: 20px;
`

const PaginationStyled = styled(Pagination)`
  margin-top: 35px;
`

const ButtonLoadMore = styled(SecondaryButton)`
  background-color: ${colors.gray};
  color: ${colors.ocean};
  max-width: 170px;
  margin: 40px auto 0;

  :hover,
  :focus,
  :active {
    background-color: ${colors.gray};
    color: ${colors.ocean};
  }
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

const GoodRatioCol = styled(Col)`
  ${media.desktop`
    margin-top: 20px;
  `}
`

const NewsContainer = styled.div`
  background-color: ${colors.white};
  padding: 17px 40px;
  box-shadow: 0 0 10px ${hexToRgba(colors.dark, 0.08)};
  border-radius: 4px;
  ${media.desktop`
    padding-left: 34px;
    padding-right: 34px;
  `}
  ${media.phone`
    margin-left: -15px;
    margin-right: -15px;
    padding-left: 15px;
    padding-right: 15px;
  `}
`

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

const WidgetTitle = styled.p`
  color: ${colors.dark};
  font-size: 22px;
  line-height: 30px;
`

const InfoElementWrap = styled.div`
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

const StyledIcon = styled(Icon)`
  ${media.phone`
    margin: 0 5px !important;
  `}
`

const ImpactCategorySelectorName = styled.strong`
  ${media.phone`
    display: none;
  `}
`

const AdminsList = styled.ul`
  list-style: none;
  z-index: 2;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: center;
`

const AdminsListItem = styled.li`
  margin: 0;

  :not(:first-child) {
    transform: translateX(${({ index }) => `${index * -10}px`});
    z-index: ${({ index }) => index * -1};
  }
`

const MoreAdminsItem = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background-color: ${colors.ocean};
  color: ${colors.white};
  font-size: 14px;
  line-height: 19px;
  height: 42px;
  width: 42px;
  font-weight: bold;
`

const GROUP_TABS = {
  MEMBERS: 'members',
  STATISTICS: 'statistics',
  ACTIVITY: 'activity',
}

async function getGroupData(props) {
  const { match, location, overrides } = props
  const queries = qs.parse(location.search, { ignoreQueryPrefix: true })
  const res = await getBrandGroup(overrides.brandName)

  const tabsFetch = {
    [GROUP_TABS.MEMBERS]: getBrandGroupMembers,
    [GROUP_TABS.ACTIVITY]: apiActions.getNews,
    [GROUP_TABS.STATISTICS]: apiUser.getDashboardData,
  }[match.params.subset]

  const tabsRes = await tabsFetch({
    page: queries.page || 1,
    range: 'brandGroup',
    subset: 'brandGroup',
    belongsToBrand: overrides.brandName,
    status: USER_GROUP_STATUSES.ACTIVE,
  })

  return {
    group: res,
    ...tabsRes,
  }
}

class BrandPage extends PureComponent {
  static displayName = 'BrandPage'

  static propTypes = {
    intl: intlShape.isRequired,
    loading: PropTypes.bool,
    match: PropTypes.object,
    fetch: PropTypes.func.isRequired,
    mutate: PropTypes.func.isRequired,
    group: PropTypes.object,
    history: PropTypes.object,
    location: PropTypes.object,
    members: PropTypes.object,
    news: PropTypes.object,
    calendar: PropTypes.object,
    ratio: PropTypes.object,
    user: PropTypes.object,
  }

  static defaultProps = {
    members: {},
    news: {},
    calendar: {},
    ratio: {},
  }

  state = {
    modalVisible: false,
    loadingMorelNews: false,
    newsPage: 1,
    currentImpactCategory: 'climate',
    loadingButton: false,
    visibleTabs: false,
    tabsType:
      window.screen.availWidth <= sizes.tablet
        ? TABS_TYPES.select
        : TABS_TYPES.default,
  }

  $counter = React.createRef()

  componentDidMount() {
    animateScroll.scrollToTop()
    window.addEventListener('orientationchange', this.changeTabsType)
  }

  componentDidUpdate(prevProps) {
    const { match, location } = this.props
    const { match: oldMatch, location: oldLocation } = prevProps

    if (
      match.params.subset !== oldMatch.params.subset ||
      location.search !== oldLocation.search
    ) {
      animateScroll.scrollToTop()
      this.props.fetch()
    }
  }

  componentWillUnmount() {
    window.removeEventListener('orientationchange', this.changeTabsType)
  }

  changeTabsType = () => {
    this.setState({
      tabsType:
        window.screen.availWidth <= sizes.tablet
          ? TABS_TYPES.select
          : TABS_TYPES.default,
      visibleTabs: false,
    })
  }

  handleSubmit = async values => {
    const { mutate, group, intl } = this.props

    const body = new FormData()

    if (values.picture && values.picture.file)
      body.append('picture', values.picture.file)

    if (values.description) body.append('description', values.description)

    if (values.name) body.append('name', values.name)

    mutate({
      group: {
        ...group,
        ...values,
        picture:
          values.picture && values.picture.file
            ? values.picture.fileUrl
            : group.picture,
      },
    })

    fetchUpdateGroup(group._id, body).catch(error => {
      console.error(error)

      mutate({ group })

      notification.error({
        message: intl.formatMessage({ id: decodeError(error) }),
      })
    })
  }

  closeModal = () => {
    this.setState({ modalVisible: false })
  }

  loadMore = async () => {
    const { newsPage } = this.state
    const { match, mutate, news } = this.props

    this.setState({ loadingMorelNews: true, newsPage: newsPage + 1 })

    const response = await apiActions.getNews({
      groupId: match.params.id,
      page: newsPage + 1,
      range: 'brandGroup',
    })

    this.setState(
      {
        loadingMorelNews: false,
      },
      () => {
        mutate({
          news: [...news, ...response.news],
        })
      },
    )
  }

  handleImpactCategoryChange = category => {
    this.setState({ currentImpactCategory: category })
  }

  setMoreAchievesVisible = visible => {
    this.setState({ moreAchievesVisible: visible })
  }

  render() {
    const {
      visibleTabs,
      tabsType,
      modalVisible,
      loadingMorelNews,
      currentImpactCategory,
      moreAchievesVisible,
    } = this.state
    const {
      loading,
      group,
      intl,
      match,
      members,
      news,
      calendar,
      ratio,
      location,
      history,
    } = this.props
    const achievements =
      group && group.achievements ? group.achievements.map(mapAchievements) : []

    return (
      <Block>
        {loading && !group && <SpinnerStyled />}

        {group && (
          <Fragment>
            <FingerPrint />

            <GroupDetailedForm
              counter={intl.formatMessage(
                { id: 'app.pages.groups.membersCount' },
                { count: group.info.membersCount },
              )}
              initialValues={group}
              disabled={
                group.status === GROUPS_STATUSES.DELETED ||
                (group.info.memberRole &&
                  group.info.memberRole === MEMBER_GROUP_ROLES.MEMBER)
              }
              onSubmit={this.handleSubmit}
            />

            <WhiteBlock>
              {!!achievements && (
                <Achievements>
                  {achievements.slice(0, 5).map(i => {
                    const achievement = i.achievement
                    if (!achievement) return null
                    const accomplished = i.accomplishedActions
                      ? i.accomplishedActions.length
                      : 0
                    const total =
                      _.get(achievement, 'actions.length', 0) *
                      _.get(i, 'participantsCount', 0)
                    const accomplishedLabel = intl.formatMessage(
                      { id: 'app.campaignPage.progress.accomplished' },
                      {
                        accomplished: accomplished,
                        total,
                      },
                    )
                    return (
                      <AchievementPopover
                        key={i.id}
                        overlayClassName={'achievements-popover'}
                        content={
                          <PopoverWrapper>
                            <PopoverTitle>
                              {_.get(i, 'achievement.name')}
                            </PopoverTitle>
                            <PopoverText>{accomplishedLabel}</PopoverText>
                          </PopoverWrapper>
                        }
                      >
                        <Achievement specialShape={i.specialShape}>
                          <img
                            alt={''}
                            src={_.get(i, 'achievement.logo.src')}
                          />
                        </Achievement>
                      </AchievementPopover>
                    )
                  })}
                  {achievements.length > 5 && (
                    <Achievement
                      onClick={() => this.setMoreAchievesVisible(true)}
                      other
                    >
                      <OtherAchievementsText>
                        +{achievements.length - 5}
                      </OtherAchievementsText>
                    </Achievement>
                  )}
                </Achievements>
              )}
              <AchievementModal
                width={592}
                visible={moreAchievesVisible}
                closable
                onCancel={() => this.setMoreAchievesVisible(false)}
                centered
                destroyOnClose
                title={
                  <AchievementTitle>
                    <FormattedMessage id={'app.dashboardPage.achievements'} />
                  </AchievementTitle>
                }
                footer={[
                  <AchievementFooter key="submit">
                    <AchievementFooterButton
                      type="primary"
                      onClick={() => {
                        this.setMoreAchievesVisible(false)
                      }}
                    >
                      OK
                    </AchievementFooterButton>
                  </AchievementFooter>,
                ]}
              >
                <ModalContent>
                  <AchievementRow type="flex" justify="left">
                    {achievements.map(i => {
                      const achievement = i.achievement
                      if (!achievement) return null
                      const accomplished = i.accomplishedActions
                        ? i.accomplishedActions.length
                        : 0
                      const total = _.get(achievement, 'actions.length', 0)
                      const accomplishedLabel = intl.formatMessage(
                        { id: 'app.campaignPage.progress.accomplished' },
                        {
                          accomplished: accomplished,
                          total,
                        },
                      )
                      return (
                        <AchievementCol key={i.id} span={6}>
                          <AchievementPopover
                            overlayClassName={'achievements-popover'}
                            content={
                              <PopoverWrapper>
                                <PopoverTitle>
                                  {!!i.achievement && i.achievement.name}
                                </PopoverTitle>
                                <PopoverText>{accomplishedLabel}</PopoverText>
                              </PopoverWrapper>
                            }
                          >
                            <Achievement specialShape={i.specialShape}>
                              <img
                                alt={''}
                                src={_.get(i, 'achievement.logo.src')}
                              />
                            </Achievement>
                          </AchievementPopover>
                        </AchievementCol>
                      )
                    })}
                  </AchievementRow>
                </ModalContent>
              </AchievementModal>

              <Container>
                {group.info.memberStatus === USER_GROUP_STATUSES.ACTIVE && (
                  <Fragment>
                    <AdminsList>
                      {group.admins.map(({ user, groupInfo }, index) => (
                        <AdminsListItem index={index} key={user._id}>
                          <Link to={`/account/${user._id}`}>
                            <Tooltip
                              placement="top"
                              title={`${user.fullName ||
                                ''} (${intl.formatMessage({
                                id: `app.pages.groups.${groupInfo.memberRole.toLowerCase()}`,
                              })})`}
                            >
                              <UserPhoto
                                src={
                                  user.photo ||
                                  getUserInitialAvatar(user.fullName)
                                }
                                alt="your photo"
                              />
                            </Tooltip>
                          </Link>
                        </AdminsListItem>
                      ))}

                      {group.admins.length > 5 && (
                        <AdminsListItem index={6}>
                          <MoreAdminsItem>
                            +{group.admins.length - 5}
                          </MoreAdminsItem>
                        </AdminsListItem>
                      )}
                    </AdminsList>

                    {[
                      MEMBER_GROUP_ROLES.ADMIN,
                      MEMBER_GROUP_ROLES.OWNER,
                    ].includes(group.info.memberRole) &&
                      group.status === GROUPS_STATUSES.ACTIVE && (
                        <Tooltip
                          getPopupContainer={() => this.$counter.current}
                          placement="top"
                          title={
                            <TooltipTitle>
                              {intl.formatMessage({
                                id: 'app.pages.groups.addRemovePeople',
                              })}
                              <br />
                              {group.requestingMembersCount > 0 &&
                                intl.formatMessage(
                                  {
                                    id:
                                      'app.pages.groups.addRemovePeopleCounter',
                                  },
                                  { count: group.requestingMembersCount },
                                )}
                            </TooltipTitle>
                          }
                        >
                          <DashedAdminCircle
                            index={
                              group.admins.length > 5 ? 7 : group.admins.length
                            }
                            ref={this.$counter}
                            onClick={() => {
                              this.setState({ modalVisible: true })
                            }}
                          >
                            {group.requestingMembersCount > 0 && (
                              <Counter>{group.requestingMembersCount}</Counter>
                            )}

                            <Icon type="plus" />
                          </DashedAdminCircle>
                        </Tooltip>
                      )}
                  </Fragment>
                )}
              </Container>
            </WhiteBlock>

            <TabsSecondary
              justify="center"
              list={[
                {
                  to: `/brand/dashboard/${GROUP_TABS.STATISTICS}`,
                  icon: ({ color }) => <Icon type="bar-chart" color={color} />,
                  text: intl.formatMessage({
                    id: 'app.header.menu.dashboard',
                  }),
                  active: match.params.subset === GROUP_TABS.STATISTICS,
                },
                {
                  to: `/brand/dashboard/${GROUP_TABS.MEMBERS}`,
                  icon: SuggestedIcon,
                  text: intl.formatMessage({ id: 'app.pages.groups.members' }),
                  active: match.params.subset === GROUP_TABS.MEMBERS,
                },
                {
                  to: `/brand/dashboard/${GROUP_TABS.ACTIVITY}`,
                  icon: FlagIconComponent,
                  text: intl.formatMessage({ id: 'app.pages.groups.activity' }),
                  active: match.params.subset === GROUP_TABS.ACTIVITY,
                },
              ]}
              isOpen={visibleTabs}
              listType={tabsType}
              toggleVisible={visible => {
                this.setState({ visibleTabs: visible })
              }}
            >
              <Content>
                {loading ? (
                  <Spinner />
                ) : (
                  <Fragment>
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
                                      component={() =>
                                        icons['positive']['climate']
                                      }
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
                                      component={() =>
                                        icons['positive']['waste']
                                      }
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
                                      component={() =>
                                        icons['positive']['water']
                                      }
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
                                      component={() =>
                                        icons['positive']['ecosystem']
                                      }
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
                                      component={() =>
                                        icons['positive']['health']
                                      }
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
                              <FormattedMessage id="app.dashboardPage.ourNetPositiveDays" />
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
                            {calendar[currentImpactCategory] && (
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
                              <FormattedMessage id="app.dashboardPage.ourGoodRatio" />
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
                            {ratio.footprintDays && (
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
                  </Fragment>
                )}
              </Content>

              <Content>
                {loading ? (
                  <Spinner />
                ) : (
                  <Row
                    type="flex"
                    gutter={{ md: 20 }}
                    style={{ flexGrow: '1' }}
                  >
                    {members.docs &&
                      members.docs.map(item => (
                        <Column
                          key={item.user._id}
                          xl={8}
                          lg={12}
                          md={12}
                          xs={24}
                        >
                          <MemberCard
                            to={`/account/${item.user._id}`}
                            fullName={item.user.fullName}
                            photo={
                              item.user.photo ||
                              getUserInitialAvatar(item.user.fullName)
                            }
                            counter={intl.formatMessage(
                              { id: 'app.pages.groups.actionsTaken' },
                              { count: item.groupInfo.memberTakenActionsCount },
                            )}
                            impacts={{ handprint: item.impacts }}
                          />
                        </Column>
                      ))}
                  </Row>
                )}

                {!loading && members.totalPages > 1 && (
                  <PaginationStyled
                    current={members.page}
                    pageSize={members.limit}
                    total={members.totalDocs}
                    itemRender={(current, type, originalElement) => {
                      if (type === 'page') {
                        return (
                          <button
                            onClick={() => {
                              history.push(
                                `${location.pathname}?page=${current}`,
                              )
                            }}
                          >
                            {originalElement}
                          </button>
                        )
                      }
                      if (type === 'prev' || type === 'next') {
                        return null
                      }
                      return originalElement
                    }}
                  />
                )}
              </Content>

              <Content>
                {loading ? (
                  <Spinner />
                ) : (
                  <NewsContainer>
                    <NewsList
                      actionLinkPrefix={`/groups/view/${match.params.id}/${
                        match.params.subset
                      }/`}
                      news={news}
                      locale={intl.locale}
                    />
                  </NewsContainer>
                )}

                {!loading && (
                  <ButtonLoadMore
                    loading={loadingMorelNews}
                    onClick={this.loadMore}
                  >
                    {intl.formatMessage({ id: 'app.newsPage.loadMoreNews' })}
                  </ButtonLoadMore>
                )}
              </Content>
            </TabsSecondary>
          </Fragment>
        )}

        <Modal
          visible={modalVisible}
          onCancel={this.closeModal}
          centered
          destroyOnClose
          footer={null}
          width="auto"
        >
          <GroupManage />
        </Modal>
      </Block>
    )
  }
}

function mapAchievements(finishedCompetition) {
  return {
    _id: finishedCompetition._id,
    achievement: finishedCompetition.competition,
    accomplishedActions: finishedCompetition.accomplishedActions,
    participantsCount: finishedCompetition.participantsCount,
    specialShape: true,
  }
}

export default compose(
  fetch(getGroupData, { loader: false }),
  injectIntl,
)(BrandPage)
