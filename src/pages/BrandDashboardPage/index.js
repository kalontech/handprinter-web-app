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
import hexToRgba from 'utils/hexToRgba'
import Spinner from 'components/Spinner'
import NewsList from 'components/NewsList'
import GroupManage from 'components/GroupManage'
import TabsSecondary, { TABS_TYPES } from 'components/TabsSecondary'
import MemberCard from 'components/MemberCard'
import { SecondaryButton, Modal, Pagination } from 'components/Styled'
import { getUserInitialAvatar } from 'api'
import * as apiActions from 'api/actions'
import {
  fetchUpdateGroup,
  getBrandGroup,
  getBrandGroupNetwork,
  getBrandGroupMembers,
} from 'api/groups'

import Statistics from './statistics'

import ActionCardLabel from '../../components/ActionCardLabel'
import ActionCardPhysicalLabel from '../../components/ActionCardPhysicalLabel'
import {
  IMPACT_CATEGORIES,
  TimeValueAbbreviations,
} from '../../utils/constants'
import { processedUnitValue } from '../../components/ActionCardLabelSet'

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
  min-height: 114px;
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
`

const Logo = styled.img`
  width: 176px;
  height: 176px;
  object-fit: cover;
  display: inline-block;
  border-radius: 50%;
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
  background: #87bd24;
  border-radius: 4px;
  width: 274px;
  height: 58px;
  position: absolute;
  left: 288px;
  text-align: center;
  transform: translateY(-110%);
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
  background: #169080;
  border-radius: 4px;
  right: 160px;
  text-align: center;
  padding: 5px;
  transform: translateY(-120%);
`

const Description = styled.p`
  font-family: Noto Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 28px;
  color: ${colors.dark};
  width: 560px;
`
const InfoBlock = styled.div`
  margin-left: 290px;
  margin-top: 11px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`

const LabelBlock = styled.div`
  margin-right: 155px;
  display: flex;
  flex-direction: row;
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
    groupNetwork: undefined,
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
      groupNetwork,
    } = this.state
    const {
      loading,
      group,
      intl,
      match,
      members,
      news,
      location,
      history,
    } = this.props
    return (
      <Block>
        {loading && !group && <SpinnerStyled />}

        {group && (
          <Fragment>
            <FingerPrint />
            <WhiteBlock>
              <LogoWrap>
                <Logo src={getUserInitialAvatar(group.name)} alt="preview" />
              </LogoWrap>
              <Title>{group.name}</Title>
              <MemberLabel>
                <FormattedMessage id="app.pages.groups.youAreMember" />
              </MemberLabel>
              <InfoBlock>
                <Description>{group.description}</Description>
                <LabelBlock>
                  <ActionCardLabel
                    largeLabel
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
                    labelWidth={105}
                    category={IMPACT_CATEGORIES.MEMBERS}
                    unit={TimeValueAbbreviations.MEMBERS}
                    value={group.info.membersCount}
                    variant={'positive'}
                  />
                </LabelBlock>
              </InfoBlock>

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
                    id: 'app.pages.groups.statistics',
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
                <Statistics {...this.props} groupNetwork={groupNetwork} />
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
)(BrandPage)
