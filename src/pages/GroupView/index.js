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

import Print from 'assets/icons/fingerprint-part.svg'
import FlagIconComponent from 'assets/icons/FlagIcon'
import SuggestedIcon from 'assets/icons/SuggestedIcon'

import colors from 'config/colors'
import {
  GROUPS_SUBSETS,
  QUESTIONS_ANCHOR,
  USER_GROUP_ROLES,
  USER_GROUP_STATUSES,
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
import GroupButton, { BUTTON_TYPES } from 'components/GroupButton'
import GroupManage from 'components/GroupManage'
import TabsSecondary, { TABS_TYPES } from 'components/TabsSecondary'
import MemberCard from 'components/MemberCard'
import icons from 'components/ActionCardLabel/icons'
import { SecondaryButton, Modal, Pagination } from 'components/Styled'
import InfoElement, { INFO_ELEMENT_TYPES } from 'components/InfoElement'
import { getUserInitialAvatar, getNews, getDashboardData } from 'api'
import {
  fetchUpdateGroup,
  fetchGroupById,
  fetchGroupMembers,
  fetchLeaveGroup,
  fetchJoinGroup,
  fetchDeleteGroup,
  fetchDenyGroupByInvite,
  fetchJoinGroupByInvite,
} from 'api/groups'

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
  const { match, location, group: fetchedGroup } = props
  const queries = qs.parse(location.search, { ignoreQueryPrefix: true })

  const tabsFetch = {
    [GROUP_TABS.MEMBERS]: fetchGroupMembers,
    [GROUP_TABS.ACTIVITY]: getNews,
    [GROUP_TABS.STATISTICS]: getDashboardData,
  }[match.params.subset]

  const [
    { group, requestingMembersCount, admins },
    tabsData,
  ] = await Promise.all([
    fetchedGroup ? () => Promise.resolve() : fetchGroupById(match.params.id),
    tabsFetch({
      groupId: match.params.id,
      page: queries.page || 1,
      range: 'group',
      subset: 'group',
      status: USER_GROUP_STATUSES.ACTIVE,
    }),
  ])

  return {
    group: fetchedGroup || { ...group, requestingMembersCount, admins },
    ...tabsData,
  }
}

class GroupViewPage extends PureComponent {
  static displayName = 'GroupViewPage'

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

  get buttonProps() {
    const { loadingButton } = this.state
    const { group } = this.props
    let type

    if (group.info.memberStatus === USER_GROUP_STATUSES.INVITED) {
      type = BUTTON_TYPES.invited
    } else if (group.info.memberStatus === USER_GROUP_STATUSES.REQUESTING) {
      type = BUTTON_TYPES.request
    } else if (
      group.info.isMember &&
      group.info.memberRole === USER_GROUP_ROLES.OWNER
    ) {
      type = BUTTON_TYPES.delete
    } else if (
      group.info.isMember &&
      group.info.memberRole !== USER_GROUP_ROLES.OWNER
    ) {
      type = BUTTON_TYPES.leave
    } else if (group.private) {
      type = BUTTON_TYPES.request
    } else {
      type = BUTTON_TYPES.join
    }

    const buttonProps = {
      [BUTTON_TYPES.leave]: {
        onClick: this.toggleMembership(false),
        loading: loadingButton,
      },
      [BUTTON_TYPES.join]: {
        onClick: this.toggleMembership(true),
        loading: loadingButton,
      },
      [BUTTON_TYPES.delete]: {
        onClick: this.deleteGroup,
      },
      [BUTTON_TYPES.request]: {
        onClick: this.requestInvite,
        loading: loadingButton,
        disabled: group.info.memberStatus === USER_GROUP_STATUSES.REQUESTING,
      },
      [BUTTON_TYPES.invited]: {
        disabled: loadingButton,
        onClick: {
          onAccept: this.toggleInvitation(true),
          onDeny: this.toggleInvitation(false),
        },
      },
    }

    return { ...buttonProps[type], type }
  }

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

  toggleMembership = (join = false) => async () => {
    const { group, mutate, match } = this.props

    this.setState({ loadingButton: true })

    if (join) {
      await fetchJoinGroup(match.params.id)
    } else {
      await fetchLeaveGroup(match.params.id)
    }

    this.setState({ loadingButton: false }, () => {
      mutate({
        group: {
          ...group,
          info: {
            ...group.info,
            membersCount: join
              ? group.info.membersCount + 1
              : group.info.membersCount - 1,
            isMember: join,
          },
        },
      })
    })
  }

  deleteGroup = async () => {
    const { intl, history, match } = this.props

    Modal.confirm({
      title: intl.formatMessage({ id: 'app.actions.card.delete' }),
      content: intl.formatMessage({ id: 'app.pages.groups.confirm' }),
      okText: intl.formatMessage({
        id: 'app.profilePage.deleteAccountModal.confirmButton',
      }),
      cancelText: intl.formatMessage({
        id: 'app.profilePage.deleteAccountModal.cancelButton',
      }),
      okType: 'danger',
      className: 'ant-modal-confirm_profile-page',
      centered: true,
      onOk: async () =>
        fetchDeleteGroup(match.params.id)
          .then(() => {
            history.replace(`/groups/${GROUPS_SUBSETS.DISCOVER}`)
          })
          .catch(() => {
            notification.error({
              message: intl.formatMessage({ id: 'app.errors.unknown' }),
            })
          }),
    })
  }

  requestInvite = async () => {
    const { match, group, mutate, intl } = this.props

    this.setState({ loadingButton: true })

    await fetchJoinGroup(match.params.id)

    this.setState({ loadingButton: false }, () => {
      mutate({
        group: {
          ...group,
          info: {
            ...group.info,
            memberStatus: USER_GROUP_STATUSES.REQUESTING,
          },
        },
      })

      notification.success({
        message: group.name,
        description: intl.formatMessage({
          id: 'app.pages.groups.invitationsRequested',
        }),
      })
    })
  }

  toggleInvitation = (approve = false) => async () => {
    const { group, match, mutate } = this.props

    this.setState({ loadingButton: true })

    if (approve) {
      await fetchJoinGroupByInvite(match.params.id)
    } else {
      await fetchDenyGroupByInvite(match.params.id)
    }

    this.setState({ loadingButton: false }, () => {
      mutate({
        group: {
          ...group,
          info: {
            ...group.info,
            isMember: approve,
            membersCount: approve
              ? group.info.membersCount + 1
              : group.info.membersCount - 1,
            memberStatus: approve ? USER_GROUP_STATUSES.ACTIVE : undefined,
          },
        },
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

    const response = await getNews({
      groupId: match.params.id,
      page: newsPage + 1,
      range: 'group',
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

  render() {
    const {
      visibleTabs,
      tabsType,
      modalVisible,
      loadingMorelNews,
      currentImpactCategory,
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
                group.info.memberRole &&
                group.info.memberRole === USER_GROUP_ROLES.MEMBER
              }
              onSubmit={this.handleSubmit}
            />

            <WhiteBlock>
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

                    {[USER_GROUP_ROLES.ADMIN, USER_GROUP_ROLES.OWNER].includes(
                      group.info.memberRole,
                    ) && (
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
                                  id: 'app.pages.groups.addRemovePeopleCounter',
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

                <GroupButton {...this.buttonProps} />
              </Container>
            </WhiteBlock>

            <TabsSecondary
              justify="center"
              list={[
                {
                  to: `/groups/view/${match.params.id}/${
                    GROUP_TABS.STATISTICS
                  }`,
                  icon: ({ color }) => <Icon type="bar-chart" color={color} />,
                  text: intl.formatMessage({
                    id: 'app.header.menu.dashboard',
                  }),
                  active: match.params.subset === GROUP_TABS.STATISTICS,
                },
                {
                  to: `/groups/view/${match.params.id}/${GROUP_TABS.MEMBERS}`,
                  icon: SuggestedIcon,
                  text: intl.formatMessage({ id: 'app.pages.groups.members' }),
                  active: match.params.subset === GROUP_TABS.MEMBERS,
                },
                {
                  to: `/groups/view/${match.params.id}/${GROUP_TABS.ACTIVITY}`,
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

export default compose(
  fetch(getGroupData, { loader: false }),
  injectIntl,
)(GroupViewPage)
