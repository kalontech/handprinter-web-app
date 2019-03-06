import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { compose } from 'redux'
import { injectIntl, intlShape } from 'react-intl'
import { animateScroll } from 'react-scroll/modules'
import debounce from 'lodash/debounce'
import qs from 'qs'

import Row from 'antd/lib/row'
import Col from 'antd/lib/col'
import AutoComplete from 'antd/lib/auto-complete'
import Select from 'antd/lib/select'
import notification from 'antd/lib/notification'
import Icon from 'antd/lib/icon'

import {
  GROUPS_SUBSETS,
  USER_GROUP_STATUSES,
  USER_GROUP_ROLES,
} from 'utils/constants'
import colors from 'config/colors'
import media from 'utils/mediaQueryTemplate'
import fetch from 'utils/fetch'
import { Creators } from 'redux/groups'

import { Pagination, Input } from 'components/Styled'
import GroupButton, { BUTTON_TYPES } from 'components/GroupButton'
import GroupsListHeader from 'components/GroupsListHeader'
import Spinner from 'components/Spinner'
import GroupCard from 'components/GroupCard'
import {
  fetchGroupsList,
  fetchFeaturedGroup,
  fetchJoinGroup,
  fetchLeaveGroup,
  fetchDenyGroupByInvite,
  fetchJoinGroupByInvite,
} from 'api/groups'
import { getUserInitialAvatar } from 'api'

const Block = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  flex-grow: 1;
  background-color: ${colors.lightGray};
`

const Container = styled.article`
  width: 100%;
  max-width: 1180px;
  min-height: 500px;
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

const EmptyList = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  font-size: 24px;
  color: ${colors.darkGray};
`

const PaginationStyled = styled(Pagination)`
  margin-top: 35px;
`

const SearchWrap = styled.div`
  margin-bottom: 20px;
  padding: 20px 30px;
  background-color: ${colors.white};

  ${media.phone`
    padding: 10px 15px;
  `}

  .ant-select-dropdown,
  .ant-select-dropdown-menu {
    max-height: 402px;
    z-index: 900;
  }
  .ant-select-dropdown-menu-item:hover,
  .ant-select-dropdown-menu-item-active {
    background-color: ${colors.lightGray};
  }
  .ant-select-selected-icon {
    display: none;
  }
`

const AutoCompleteStyled = styled(AutoComplete)`
  height: 46px;
  width: 100%;

  > div:first-child {
    width: 100%;
  }
`

const SearchItem = styled(Select.Option)`
  display: flex;
  align-items: center;
`

const SearchItemImg = styled.img`
  width: 70px;
  height: 70px;
  border-radius: 50%;
  margin-right: 10px;
  display: inline-block;
  object-fit: cover;
`

async function getGroups(props) {
  const { match, location } = props
  const queries = qs.parse(location.search, { ignoreQueryPrefix: true })

  return fetchGroupsList({
    subset: match.params.subset,
    page: queries.page || 1,
    limit: 21,
  })
}

function onFetchSuccess(props) {
  props.setGroupsList(props.groups)
}

class GroupsPage extends React.PureComponent {
  static displayName = 'GroupsPage'

  static propTypes = {
    intl: intlShape.isRequired,
    loading: PropTypes.bool,
    match: PropTypes.object,
    fetch: PropTypes.func.isRequired,
    groups: PropTypes.object,
    history: PropTypes.object,
    location: PropTypes.object,
    removeListItem: PropTypes.func,
    updateListItem: PropTypes.func,
  }

  static defaultProps = {
    groups: {},
  }

  state = {
    loadingButtonsList: [],
    featuredInitial: undefined,
    searchList: [],
  }

  $search = React.createRef()

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

  fetchFeatured = debounce(item => {
    const ignore = this.state.featuredInitial === item.info.isFeatured

    this.setState({ featuredInitial: undefined })

    if (ignore) return

    fetchFeaturedGroup(item._id, item.info.isFeatured ? 'unstar' : 'star')
  }, 600)

  toggleFeatured = item => e => {
    e.preventDefault()
    e.stopPropagation()

    const { match } = this.props

    this.setState(
      state => ({
        featuredInitial:
          typeof state.featuredInitial === 'boolean'
            ? state.featuredInitial
            : !item.info.isFeatured,
      }),
      () => {
        this.fetchFeatured(item)

        if (
          item.info.isFeatured &&
          match.params.subset === GROUPS_SUBSETS.FEATURED
        ) {
          this.props.removeListItem(item._id)
          return
        }

        this.props.toggleFeatured(item._id)
      },
    )
  }

  toggleMembership = ({ info, _id, ...rest }) => async e => {
    e.preventDefault()
    e.stopPropagation()

    const { history, match } = this.props

    this.setState(state => ({
      loadingButtonsList: [...state.loadingButtonsList, _id],
    }))

    if (!info.isMember) {
      await fetchJoinGroup(_id)
      history.push(`/groups/view/${_id}/statistics`)
      return
    }

    this.setState(
      state => ({
        loadingButtonsList: state.loadingButtonsList.filter(
          itemId => itemId !== _id,
        ),
      }),
      () => {
        if (info.isMember && match.params.subset === GROUPS_SUBSETS.MY) {
          this.props.removeListItem(_id)
          return
        }

        this.props.updateListItem(
          {
            ...rest,
            _id,
            info: {
              ...info,
              isMember: !info.isMember,
              membersRole: info.isMember ? undefined : info.membersRole,
              membersCount: info.isMember
                ? info.membersCount - 1
                : info.membersCount + 1,
            },
          },
          _id,
        )

        if (info.isMember) fetchLeaveGroup(_id)
      },
    )
  }

  acceptInvitation = id => async e => {
    e.preventDefault()
    e.stopPropagation()

    this.setState(state => ({
      loadingButtonsList: [...state.loadingButtonsList, id],
    }))

    await fetchJoinGroupByInvite(id)

    this.props.history.push(`/groups/view/${id}/statistics`)
  }

  denyInvitation = item => e => {
    e.preventDefault()
    e.stopPropagation()

    if (this.props.match.params.subset === GROUPS_SUBSETS.MY) {
      this.props.removeListItem(item._id)
      fetchDenyGroupByInvite(item._id)
      return
    }

    this.props.updateListItem(
      {
        ...item,
        info: {
          ...item.info,
          memberStatus: undefined,
          isMember: false,
        },
      },
      item._id,
    )

    fetchDenyGroupByInvite(item._id)
  }

  requestInvite = item => async e => {
    e.preventDefault()
    e.stopPropagation()

    const { intl } = this.props

    this.setState(state => ({
      loadingButtonsList: [...state.loadingButtonsList, item._id],
    }))

    await fetchJoinGroup(item._id)

    notification.success({
      message: item.name,
      description: intl.formatMessage({
        id: 'app.pages.groups.invitationsRequested',
      }),
    })

    this.setState(
      state => ({
        loadingButtonsList: state.loadingButtonsList.filter(
          itemId => itemId !== item._id,
        ),
      }),
      () => {
        this.props.updateListItem(
          {
            ...item,
            info: {
              ...item.info,
              memberStatus: USER_GROUP_STATUSES.REQUESTING,
            },
          },
          item._id,
        )
      },
    )
  }

  handleSearch = debounce(async value => {
    if (!value) return

    const { groups } = await fetchGroupsList({
      subset: GROUPS_SUBSETS.DISCOVER,
      search: value,
    })

    this.setState({
      searchList: (groups.docs || []).slice(0, 5),
    })
  }, 600)

  render() {
    const { intl, loading, match, groups, history, location } = this.props
    const { loadingButtonsList, searchList } = this.state

    return (
      <Block>
        <GroupsListHeader />

        <Container>
          {match.params.subset === GROUPS_SUBSETS.DISCOVER && (
            <SearchWrap ref={this.$search}>
              <AutoCompleteStyled
                onSelect={id => {
                  history.push(`/groups/view/${id}/members`)
                }}
                onSearch={this.handleSearch}
                getPopupContainer={() => this.$search.current}
                dataSource={searchList.map(item => (
                  <SearchItem key={item._id}>
                    <SearchItemImg
                      src={item.picture || getUserInitialAvatar(item.name)}
                      alt={item.name}
                    />
                    {item.name}
                  </SearchItem>
                ))}
              >
                <Input
                  style={{ height: '46px' }}
                  placeholder="Search"
                  suffix={
                    <Icon
                      type="search"
                      style={{ color: colors.darkGray, fontSize: '18px' }}
                    />
                  }
                />
              </AutoCompleteStyled>
            </SearchWrap>
          )}

          {loading ? (
            <Spinner />
          ) : (
            <Row type="flex" gutter={{ md: 20 }} style={{ flexGrow: '1' }}>
              {(groups.docs || []).map(item => (
                <Column key={item._id} xl={8} lg={12} md={12} xs={24}>
                  <GroupCard
                    to={`/groups/view/${item._id}/statistics`}
                    name={item.name}
                    counter={intl.formatMessage(
                      { id: 'app.pages.groups.membersCount' },
                      { count: item.info.membersCount },
                    )}
                    picture={item.picture || getUserInitialAvatar(item.name)}
                    featured={
                      match.params.subset !== GROUPS_SUBSETS.MY && {
                        added: item.info.isFeatured,
                        onClick: this.toggleFeatured(item),
                      }
                    }
                    buttons={() => {
                      let type

                      if (
                        item.info.memberStatus === USER_GROUP_STATUSES.INVITED
                      ) {
                        type = BUTTON_TYPES.invited
                      } else if (
                        item.info.memberStatus ===
                        USER_GROUP_STATUSES.REQUESTING
                      ) {
                        type = BUTTON_TYPES.request
                      } else if (item.info.isMember) {
                        type = BUTTON_TYPES.leave
                      } else if (item.private) {
                        type = BUTTON_TYPES.request
                      } else {
                        type = BUTTON_TYPES.join
                      }

                      const buttonProps = {
                        [BUTTON_TYPES.leave]: {
                          onClick: this.toggleMembership(item),
                          disabled:
                            item.info.memberRole === USER_GROUP_ROLES.OWNER,
                        },
                        [BUTTON_TYPES.join]: {
                          onClick: this.toggleMembership(item),
                        },
                        [BUTTON_TYPES.invited]: {
                          onClick: {
                            onAccept: this.acceptInvitation(item._id),
                            onDeny: this.denyInvitation(item),
                          },
                        },
                        [BUTTON_TYPES.request]: {
                          onClick: this.requestInvite(item),
                          disabled:
                            item.info.memberStatus ===
                            USER_GROUP_STATUSES.REQUESTING,
                        },
                      }

                      return (
                        <GroupButton
                          type={type}
                          {...buttonProps[type]}
                          loading={loadingButtonsList.includes(item._id)}
                        />
                      )
                    }}
                  />
                </Column>
              ))}

              {(!groups.docs || groups.docs.length === 0) && (
                <EmptyList>
                  {intl.formatMessage({
                    id: 'app.pages.groups.emptyGroupsList',
                  })}
                </EmptyList>
              )}
            </Row>
          )}

          {!loading && groups.totalPages > 1 && (
            <PaginationStyled
              current={groups.page}
              pageSize={groups.limit}
              total={groups.totalDocs}
              itemRender={(current, type, originalElement) => {
                if (type === 'page') {
                  return (
                    <button
                      onClick={() => {
                        history.push(`${location.pathname}?page=${current}`)
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
        </Container>
      </Block>
    )
  }
}

export default compose(
  injectIntl,
  connect(
    state => ({
      user: state.user.data,
      groups: state.groups.list,
    }),
    {
      setGroupsList: Creators.setGroupsList,
      updateListItem: Creators.updateListItem,
      removeListItem: Creators.removeListItem,
      toggleFeatured: Creators.toggleFeatured,
    },
  ),
  fetch(getGroups, {
    loader: false,
    inject: false,
    onSuccess: onFetchSuccess,
  }),
)(GroupsPage)