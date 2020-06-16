import React, { Fragment, PureComponent } from 'react'
import { compose } from 'redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { intlShape, injectIntl, FormattedMessage } from 'react-intl'
import styled from 'styled-components'
import qs from 'qs'
import { animateScroll } from 'react-scroll/modules'
import Icon from 'antd/lib/icon'
import Tooltip from 'antd/lib/tooltip'
import Row from 'antd/lib/row'
import Col from 'antd/lib/col'
import Breadcrumb from 'antd/lib/breadcrumb'
import notification from 'antd/lib/notification'
import _ from 'lodash'
import Print from 'assets/icons/print.svg'
import FlagIconComponent from 'assets/icons/FlagIcon'
import SuggestedIcon from 'assets/icons/SuggestedIcon'

import colors from 'config/colors'
import {
  MEMBER_GROUP_ROLES,
  USER_GROUP_STATUSES,
  GROUPS_STATUSES,
} from 'utils/constants'
import fetch from 'utils/fetch'
import decodeError from 'utils/decodeError'
import media, { sizes } from 'utils/mediaQueryTemplate'
import Spinner from 'components/Spinner'
import GroupManage from 'components/GroupManage'
import TabsSecondary, { TABS_TYPES } from 'components/TabsSecondary'
import MemberCard from 'components/MemberCard'
import { Modal, Pagination } from 'components/Styled'
import { getUserInitialAvatar } from 'api'
import * as apiActions from 'api/actions'
import {
  fetchUpdateGroup,
  getBrandGroup,
  getBrandGroupNetwork,
  getBrandGroupMembers,
} from 'api/groups'

import { UIContextSettings } from '../../context/uiSettingsContext'

import Statistics from './statistics'

import ActionCardLabel from '../../components/ActionCardLabel'
import ActionCardPhysicalLabel from '../../components/ActionCardPhysicalLabel'
import TabsSelect from '../../components/TabsSelect'
import {
  IMPACT_CATEGORIES,
  TimeValueAbbreviations,
} from '../../utils/constants'
import { processedUnitValue } from '../../components/ActionCardLabelSet'
import renderActivity from './activity'

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
  height: 205px;
  width: 100%;
  text-align: center;
  background: ${colors.ocean} url(${Print}) no-repeat left bottom;
  background-size: initial;

  ${media.phone`
    width: 100%;
    height: 138px;
    background-size: 100% 100%;
  `}
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
    background: ${colors.lightGray};
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
  min-height: 114px;
  background-color: ${colors.white};
  padding: 0;
  margin: 0;

  ${media.largeDesktop`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 15px 0px 25px 0px;
    min-height: 150px;
  `}
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

const LogoWrap = styled.div`
  transform: translateY(-50%);
  position: absolute;
  left: 80px;

  ${media.largeDesktop`
    top: 250px;
  `}

  ${media.phone`
    display: flex;
    justify-content: center;
    left: 0;
    top: 190px;
    width: 100%;
  `}
`

const Logo = styled.img`
  width: 176px;
  height: 176px;
  object-fit: cover;
  display: inline-block;
  border-radius: 50%;

  ${media.desktop`
    width: 130px;
    height: 130px;
  `}

  ${media.phone`
    width: 110px;
    height: 110px;
  `}
`

const Title = styled.p`
  font-family: Noto Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 28px;
  justify-content: center;
  align-items: center;
  display: flex;
  color: ${colors.white};
  background: ${colors.green};
  border-radius: 4px;
  width: 274px;
  height: 58px;
  position: absolute;
  left: 288px;
  text-align: center;
  transform: translateY(-110%);

  ${media.largeDesktop`
    top: 250px;
  `}

  ${media.tablet`
    left: 228px;
  `}

  ${media.phone`
    width: 100%;
    left: 0;
    top: 305px;
    background: transparent;
    color: ${colors.dark};
  `}
`

const MobileTitle = styled.p`
  font-family: Noto Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 28px;
  justify-content: center;
  align-items: center;
  display: flex;
  color: ${colors.white};
  background: ${colors.green};
  border-radius: 4px;
  width: 274px;
  height: 58px;
  text-align: center;

  ${media.phone`
    width: 100%;
    background: transparent;
    color: ${colors.dark};
  `}
`

const MemberLabel = styled.p`
  font-family: Noto Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  text-decoration-line: underline;
  position: absolute;
  color: ${colors.white};
  background: ${colors.ocean};
  border-radius: 4px;
  right: 160px;
  text-align: center;
  padding: 5px;
  transform: translateY(-120%);

  ${media.largeDesktop`
    right: 44px;
    top: 250px;
  `}

  ${media.phone`
    right: 0;
  `}
`

const MobileMemberLabel = styled.p`
  font-family: Noto Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  text-decoration-line: underline;
  color: ${colors.ocean};
  border-radius: 4px;
  text-align: center;
  padding: 5px;

  ${media.phone`
    padding: 5px;
  `}
`

const Description = styled.p`
  font-family: Noto Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 28px;
  color: ${colors.dark};
  width: 560px;

  ${media.largeDesktop`
    width: 544px;
  `}

  ${media.desktop`
    width: 504px;
  `}

  ${media.phone`
    width: 288px;
    text-align: center;
  `}
`
const MobileDescription = styled.p`
  font-family: Noto Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 28px;
  color: ${colors.dark};
  width: 560px;

  ${media.phone`
    width: 288px;
    text-align: center;
    padding: 7px;
  `}
`

const InfoBlock = styled.div`
  margin-left: 290px;
  margin-top: 11px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  ${media.largeDesktop`
    margin-left: 100px;
    margin-top: 0px;
    flex-direction: column;
    align-items: center;
  `}

  ${media.desktop`
    width: 504px;
    margin-left: 190px;
    margin-top: 0px;
    flex-direction: column;
    align-items: center;
  `}

  ${media.phone`
    margin-left: 0px;
    margin-top: 0px;
    padding-top: 40px;
    width: 100%;
  `}
`

const LabelBlock = styled.div`
  margin-right: 155px;
  display: flex;
  flex-direction: row;

  ${media.largeDesktop`
    margin-top: 10px;
    margin-left: -185px;
    margin-right: 0px;
  `}

  ${media.desktop`
    margin-left: -150px;
  `}

  ${media.phone`
    margin-left: 0px;
  `}
`

export const BreadcrumbStyled = styled(Breadcrumb)`
  height: 50px;
  display: flex;
  align-items: center;
  align-self: flex-start;
  margin-left: 20px;
  .ant-breadcrumb-separator {
    color: ${colors.green};
  }
`

export const BreadcrumbItem = styled(Breadcrumb.Item)`
  font-family: Noto Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  color: ${colors.darkGray};
`

const StyledArrowIcon = styled(Icon)`
  svg {
    width: 15px;
    height: 15px;
    color: ${colors.gray};
    margin-right: 15px;
  }
`

export const StatusWrapper = styled.div`
  border: ${props =>
    props.inactive
      ? `1px solid ${colors.darkGray}`
      : `1px solid ${colors.green}`};
  border-radius: 4px;
  width: 98px;
  height: 28px;
  align-items: center;
  justify-content: center;
  display: flex;

  ${media.largeDesktop`
    margin-top: 5px;
    margin-left: 0px;
  `}

  ${media.phone`
  `}
`
export const Status = styled.p`
  font-family: Noto Sans;
  font-style: normal;
  font-weight: bold;
  font-size: 10px;
  line-height: 20px;
  color: ${props => (props.inactive ? colors.darkGray : colors.green)};
  text-transform: uppercase;
`

const StatisticTabsWrapper = styled.div`
  display: flex;
  align-items: center;
  height: 50px;
  width: 100%;
  justify-content: space-around;
  background: ${colors.white};

  div {
    display: flex;
    align-items: center;
    height: 100%;
  }
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

  // For members and activity tabs we need get brand group members
  const tabsFetch = {
    [GROUP_TABS.MEMBERS]: getBrandGroupMembers,
    [GROUP_TABS.ACTIVITY]: getBrandGroupMembers,
  }[match.params.subset]

  const tabsRes =
    tabsFetch &&
    (await tabsFetch({
      page: queries.page || 1,
      range: 'brandGroup',
      subset: 'brandGroup',
      belongsToBrand: overrides.brandName,
      status: USER_GROUP_STATUSES.ACTIVE,
    }))

  return {
    group: res,
    ...tabsRes,
  }
}

class BrandPage extends PureComponent {
  constructor() {
    super()
    this.contextType = UIContextSettings
  }
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
    calendar: PropTypes.object,
    ratio: PropTypes.object,
    user: PropTypes.object,
  }

  static defaultProps = {
    members: {},
    calendar: {},
    ratio: {},
  }

  state = {
    groupNetwork: undefined,
    modalVisible: false,
    currentImpactCategory: 'climate',
    loadingButton: false,
    visibleTabs: false,
    tabsType:
      window.screen.availWidth <= sizes.tablet
        ? TABS_TYPES.select
        : TABS_TYPES.default,
    width: window.innerWidth,
    activeTab: true,
  }

  $counter = React.createRef()

  componentDidMount() {
    animateScroll.scrollToTop()
    window.addEventListener('orientationchange', this.changeTabsType)
    window.addEventListener('resize', this.handleWindowSizeChange)
  }

  componentDidUpdate(prevProps) {
    const { match, location, group } = this.props
    const { match: oldMatch, location: oldLocation } = prevProps

    if (
      match.params.subset !== oldMatch.params.subset ||
      location.search !== oldLocation.search
    ) {
      animateScroll.scrollToTop()
      this.props.fetch()
    }

    if (group && !prevProps.group) {
      this.fetchGroupNetwork()
    }
  }

  componentWillUnmount() {
    window.removeEventListener('orientationchange', this.changeTabsType)
    window.removeEventListener('resize', this.handleWindowSizeChange)
  }

  fetchGroupNetwork = async () => {
    const groupNetwork = await getBrandGroupNetwork(
      this.props.overrides.brandName,
    )
    if (groupNetwork) this.setState({ groupNetwork })
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

  handleWindowSizeChange = () => {
    this.setState({
      width: window.innerWidth,
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

  toggleToTabOrgImpact = () => {
    this.setState({
      activeTab: true,
    })
  }

  toggleToTabActions = () => {
    this.setState({
      activeTab: false,
    })
  }

  render() {
    const {
      visibleTabs,
      tabsType,
      modalVisible,
      groupNetwork,
      width,
      activeTab,
    } = this.state

    const {
      loading,
      group,
      intl,
      match,
      members,
      location,
      history,
    } = this.props

    const isTablet = width < sizes.largeDesktop
    const isMobile = width < sizes.tablet

    const tabsList = [
      {
        to: `/brand/dashboard/${GROUP_TABS.STATISTICS}`,
        icon: ({ color }) => <Icon type="bar-chart" color={color} />,
        text: intl.formatMessage({
          id: 'app.pages.groups.statistics',
        }),
        active: match.params.subset === GROUP_TABS.STATISTICS,
      },
      {
        to: `/brand/dashboard/${GROUP_TABS.MEMBERS}`,
        icon: SuggestedIcon,
        text: intl.formatMessage({
          id: 'app.pages.groups.members',
        }),
        active: match.params.subset === GROUP_TABS.MEMBERS,
      },
      {
        to: `/brand/dashboard/${GROUP_TABS.ACTIVITY}`,
        icon: FlagIconComponent,
        text: intl.formatMessage({ id: 'app.pages.groups.activity' }),
        active: match.params.subset === GROUP_TABS.ACTIVITY,
      },
    ]

    const defaultSelectVal = (
      <div>
        <Icon
          type="bar-chart"
          style={{ marginRight: '10px', color: 'white' }}
        />
        {intl.formatMessage({
          id: 'app.pages.groups.statistics',
        })}
      </div>
    )

    return (
      <Block>
        {loading && !group && <SpinnerStyled />}
        {(isMobile || isTablet) && (
          <BreadcrumbStyled separator=">">
            <StyledArrowIcon type="left" />
            <BreadcrumbItem
              href="/challenges"
              style={{ color: colors.darkGray }}
            >
              <FormattedMessage id="app.brandDashboardPage.toOrganizations" />
            </BreadcrumbItem>
          </BreadcrumbStyled>
        )}
        {group && (
          <UIContextSettings.Consumer>
            {context => {
              return (
                <Fragment>
                  <FingerPrint />
                  {!isTablet && !isMobile && (
                    <WhiteBlock>
                      <LogoWrap>
                        <Logo
                          src={getUserInitialAvatar(group.name)}
                          alt="preview"
                        />
                      </LogoWrap>
                      <Title>{group.name}</Title>
                      <MemberLabel>
                        <FormattedMessage id="app.pages.groups.youAreMember" />
                      </MemberLabel>
                      <InfoBlock>
                        <Description>{group.description}</Description>
                        {group.userImpacts && (
                          <LabelBlock>
                            <ActionCardLabel
                              largeLabel
                              hideTooltip
                              labelWidth={105}
                              category={IMPACT_CATEGORIES.ACTIONS_TAKEN}
                              unit={TimeValueAbbreviations.ACTIONS_TAKEN}
                              value={group.userImpacts.actions.length}
                              variant={'positive'}
                            />
                            <ActionCardPhysicalLabel
                              largeLabel
                              labelWidth={105}
                              category={IMPACT_CATEGORIES.CLIMATE}
                              unit={IMPACT_CATEGORIES.CLIMATE}
                              value={processedUnitValue(
                                _.get(
                                  group,
                                  'userImpacts.impactsInUnits.footprint.climate',
                                ),
                              )}
                            />
                            <ActionCardLabel
                              largeLabel
                              hideTooltip
                              labelWidth={105}
                              category={IMPACT_CATEGORIES.MEMBERS}
                              unit={TimeValueAbbreviations.MEMBERS}
                              value={group.info.membersCount}
                              variant={'positive'}
                            />
                            {/* <Icon
                              type="question-circle"
                              theme="filled"
                              style={{ color: `${colors.gray}` }}
                            /> */}
                          </LabelBlock>
                        )}
                      </InfoBlock>

                      <Container>
                        {group.info.memberStatus ===
                          USER_GROUP_STATUSES.ACTIVE && (
                          <Fragment>
                            <AdminsList>
                              {group.admins.map(
                                ({ user, groupInfo }, index) => (
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
                                ),
                              )}

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
                                  getPopupContainer={() =>
                                    this.$counter.current
                                  }
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
                                          {
                                            count: group.requestingMembersCount,
                                          },
                                        )}
                                    </TooltipTitle>
                                  }
                                >
                                  <DashedAdminCircle
                                    index={
                                      group.admins.length > 5
                                        ? 7
                                        : group.admins.length
                                    }
                                    ref={this.$counter}
                                    onClick={() => {
                                      this.setState({ modalVisible: true })
                                    }}
                                  >
                                    {group.requestingMembersCount > 0 && (
                                      <Counter>
                                        {group.requestingMembersCount}
                                      </Counter>
                                    )}

                                    <Icon type="plus" />
                                  </DashedAdminCircle>
                                </Tooltip>
                              )}
                          </Fragment>
                        )}
                      </Container>
                    </WhiteBlock>
                  )}

                  {isTablet && !isMobile && (
                    <WhiteBlock>
                      <LogoWrap>
                        <Logo
                          src={getUserInitialAvatar(group.name)}
                          alt="preview"
                        />
                      </LogoWrap>

                      <InfoBlock>
                        <Title>{group.name}</Title>
                        <MemberLabel>
                          <FormattedMessage id="app.pages.groups.youAreMember" />
                        </MemberLabel>
                        <Description>{group.description}</Description>
                        <LabelBlock>
                          <ActionCardLabel
                            largeLabel
                            hideTooltip
                            labelWidth={105}
                            category={IMPACT_CATEGORIES.ACTIONS_TAKEN}
                            unit={TimeValueAbbreviations.ACTIONS_TAKEN}
                            value={group.userImpacts.actions.length}
                            variant={'positive'}
                          />
                          <ActionCardPhysicalLabel
                            largeLabel
                            labelWidth={105}
                            category={IMPACT_CATEGORIES.CLIMATE}
                            unit={IMPACT_CATEGORIES.CLIMATE}
                            value={processedUnitValue(
                              _.get(
                                group,
                                'userImpacts.impactsInUnits.footprint.climate',
                              ),
                            )}
                          />
                          <ActionCardLabel
                            largeLabel
                            hideTooltip
                            labelWidth={105}
                            category={IMPACT_CATEGORIES.MEMBERS}
                            unit={TimeValueAbbreviations.MEMBERS}
                            value={group.info.membersCount}
                            variant={'positive'}
                          />
                          {/* <Icon
                            type="question-circle"
                            theme="filled"
                            style={{ color: `${colors.gray}` }}
                          /> */}
                        </LabelBlock>
                      </InfoBlock>
                    </WhiteBlock>
                  )}
                  {isMobile && (
                    <WhiteBlock>
                      <LogoWrap>
                        <Logo
                          src={getUserInitialAvatar(group.name)}
                          alt="preview"
                        />
                      </LogoWrap>
                      <InfoBlock>
                        <MobileTitle>{group.name}</MobileTitle>
                        <MobileDescription>
                          {group.description}
                        </MobileDescription>
                        <MobileMemberLabel>
                          <FormattedMessage id="app.pages.groups.youAreMember" />
                        </MobileMemberLabel>
                        <div
                          style={{
                            width: '80%',
                            display: 'flex',
                            justifyContent: 'flex-end',
                          }}
                        >
                          {/* <Icon
                            type="question-circle"
                            theme="filled"
                            style={{ color: `${colors.gray}` }}
                          /> */}
                        </div>
                        <LabelBlock>
                          <ActionCardLabel
                            largeLabel
                            hideTooltip
                            labelWidth={81}
                            category={IMPACT_CATEGORIES.ACTIONS_TAKEN}
                            unit={TimeValueAbbreviations.ACTIONS_TAKEN}
                            value={group.userImpacts.actions.length}
                            variant={'positive'}
                          />
                          <ActionCardPhysicalLabel
                            largeLabel
                            labelWidth={81}
                            category={IMPACT_CATEGORIES.CLIMATE}
                            unit={IMPACT_CATEGORIES.CLIMATE}
                            value={processedUnitValue(
                              _.get(
                                group,
                                'userImpacts.impactsInUnits.footprint.climate',
                              ),
                            )}
                          />
                          <ActionCardLabel
                            largeLabel
                            hideTooltip
                            labelWidth={81}
                            category={IMPACT_CATEGORIES.MEMBERS}
                            unit={TimeValueAbbreviations.MEMBERS}
                            value={group.info.membersCount}
                            variant={'positive'}
                          />
                        </LabelBlock>
                      </InfoBlock>
                    </WhiteBlock>
                  )}
                  {!isTablet && !isMobile && (
                    <TabsSecondary
                      justify="center"
                      list={tabsList}
                      isOpen={visibleTabs}
                      listType={tabsType}
                      toggleVisible={visible => {
                        this.setState({ visibleTabs: visible })
                      }}
                    >
                      <Content>
                        <Statistics
                          {...this.props}
                          groupNetwork={groupNetwork}
                        />
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
                              members.docs.map(item => {
                                return (
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
                                        {
                                          count:
                                            item.groupInfo
                                              .memberTakenActionsCount,
                                        },
                                      )}
                                      impacts={{ handprint: item.impacts }}
                                      impactsInUnits={{
                                        handprint: item.impactsInUnits,
                                      }}
                                      showPhysicalValues={
                                        context.showPhysicalValues
                                      }
                                      hasTakenActions={
                                        item.groupInfo.memberTakenActionsCount >
                                        0
                                      }
                                    />
                                  </Column>
                                )
                              })}
                          </Row>
                        )}

                        {!loading && members.totalPages > 1 && (
                          <PaginationStyled
                            current={Number(members.page)}
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
                        {loading ? <Spinner /> : renderActivity(this.props)}
                      </Content>
                    </TabsSecondary>
                  )}
                  {(isTablet || isMobile) && (
                    <>
                      <TabsSelect
                        data={tabsList}
                        isMobile={isMobile}
                        defaultSelectVal={defaultSelectVal}
                        search={this.props.location.search}
                      />
                      <StatisticTabsWrapper>
                        <div
                          onClick={this.toggleToTabOrgImpact}
                          style={{
                            borderBottom: activeTab
                              ? `3px solid ${colors.green}`
                              : 'none',
                          }}
                        >
                          <span>Organization Impacts</span>
                        </div>
                        <div
                          onClick={this.toggleToTabActions}
                          style={{
                            borderBottom: !activeTab
                              ? `3px solid ${colors.green}`
                              : 'none',
                          }}
                        >
                          <span>Actions</span>
                        </div>
                      </StatisticTabsWrapper>
                      {this.props.match.params.subset === 'statistics' && (
                        <Content>
                          <Statistics
                            {...this.props}
                            groupNetwork={groupNetwork}
                            isTablet={isTablet}
                            isMobile={isMobile}
                            activeTab={activeTab}
                          />
                        </Content>
                      )}
                      {this.props.match.params.subset === 'members' && (
                        <>
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
                                  members.docs.map(item => {
                                    return (
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
                                            getUserInitialAvatar(
                                              item.user.fullName,
                                            )
                                          }
                                          counter={intl.formatMessage(
                                            {
                                              id:
                                                'app.pages.groups.actionsTaken',
                                            },
                                            {
                                              count:
                                                item.groupInfo
                                                  .memberTakenActionsCount,
                                            },
                                          )}
                                          impacts={{
                                            handprint: item.impacts,
                                          }}
                                          impactsInUnits={{
                                            handprint: item.impactsInUnits,
                                          }}
                                          showPhysicalValues={
                                            context.showPhysicalValues
                                          }
                                          hasTakenActions={
                                            item.groupInfo
                                              .memberTakenActionsCount > 0
                                          }
                                        />
                                      </Column>
                                    )
                                  })}
                              </Row>
                            )}

                            {!loading && members.totalPages > 1 && (
                              <PaginationStyled
                                current={members.page}
                                pageSize={members.limit}
                                total={members.totalDocs}
                                itemRender={(
                                  current,
                                  type,
                                  originalElement,
                                ) => {
                                  if (type === 'page') {
                                    return (
                                      <button
                                        onClick={() => {
                                          history.push(
                                            `${
                                              location.pathname
                                            }?page=${current}`,
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
                        </>
                      )}
                    </>
                  )}
                </Fragment>
              )
            }}
          </UIContextSettings.Consumer>
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
)(BrandPage)
