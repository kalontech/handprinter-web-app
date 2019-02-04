import React, { Component, Fragment } from 'react'
import { Row, Col, Select, Spin, Icon, Menu, Popover } from 'antd'
import { Link } from 'react-router-dom'
import qs from 'qs'
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'
import styled from 'styled-components'
import { injectIntl, intlShape, FormattedMessage } from 'react-intl'
import debounce from 'lodash/debounce'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'

import hexToRgba from 'utils/hexToRgba'

import {
  BlockContainer,
  Pagination,
  HeaderPopover,
  DefaultButton,
} from 'components/Styled'
import ActionCard from 'components/ActionCard'
import api from 'api'
import Spinner from 'components/Spinner'
import colors from 'config/colors'
import { history } from 'appRouter'
import filterToggleImg from 'assets/actions-page/ic_filter_list.png'
import filterToggleActiveImg from 'assets/actions-page/ic_filter_list_active.png'
import media, { sizes } from 'utils/mediaQueryTemplate'
import { IMPACT_CATEGORIES, ACTIONS_SUBSETS } from 'utils/constants'
import PageMetadata from 'components/PageMetadata'
import ExpandMoreIcon from 'assets/icons/ExpandMoreIcon'
import DiscoverIcon from 'assets/icons/ic_discover.svg'
import SuggestedIcon from 'assets/icons/ic_suggested.svg'
import HistoryIcon from 'assets/icons/ic_history.svg'

import ActionsFilters from './ActionFilter'

const Wrapper = styled.div`
  background-color: ${colors.lightGray};
  position: relative;
  height: 100%;
  flex-grow: 1;
`

const InnerContainer = styled.div`
  padding: 25px 0;

  ${media.largeDesktop`
    padding: 15px 0;
  `}
`

const ActionSearchDropdownPicture = styled.img`
  width: 90px;
  border-radius: 5px;
  margin-right: 10px;
`

const SearchWrapper = styled.div`
  background-color: ${colors.white};
  padding: 20px;
  margin: 30px 0 20px 0;
  ${media.phone`
    margin: 0;
  `}
`

const SearchField = styled(Select)`
  width: 100%;

  .ant-select-selection--single {
    height: 46px;
  }
  .ant-select-selection__rendered {
    line-height: 46px;
  }

  .ant-select-dropdown-menu-item-active {
    &:focus,
    &:hover {
      background-color: ${colors.lightGray} !important;
    }
  }

  .ant-select-selection-selected-value {
    color: ${colors.darkGray};
  }

  .ant-select-selection__rendered {
    margin: 0 16px;
  }
`

const StyledSearchIcon = styled(Icon)`
  font-size: 18px;
  color: ${colors.darkGray};
  font-weight: bold;
  position: absolute;
  right: 15px;
  top: 15px;
`

const SearchFieldWrap = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
`

const ToggleFilterButton = styled.button`
  cursor: pointer !important;
  padding: 10px;
  margin-right: 15px;
  border: none;
  position: relative;
  z-index: 1061;
  background: transparent;

  &:focus,
  &:hover {
    outline: none;
  }
`

const ToggleFilterActiveIcon = styled.span`
  border-radius: 50%;
  background: ${colors.orange};
  color: ${colors.white};
  font-size: 10px;
  display: block;
  height: 15px;
  width: 15px;
  margin: 0 auto;
  position: absolute;
  top: 5px;
  right: 2px;
`

const NotFoundWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 500px;
  font-size: 24px;
  color: ${colors.darkGray};
`

const FilterWrap = styled.div`
  padding-right: 35px;
  margin-top: 45px;
`

const ActionTabsWrap = styled.div`
  background-color: ${colors.dark};
  color: ${colors.white};
  position: relative;
  z-index: 1063;
`

const ActionTabsRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const ActionTabItem = styled.li`
  font-size: 16px;
  color: ${props => (props.active ? colors.white : colors.darkGray)};
  margin-right: 45px;
  list-style-type: none;
  cursor: pointer;

  &:last-child {
    margin-right: 0;
  }
  i {
    margin-right: 8px;
  }
`

const ActionTabItemList = styled.ul`
  display: flex;
  justify-content: center;
  margin: 0;
  padding: 0;
  ${media.phone`
    display: none;
  `}
`

const ActionTabItemListMobile = styled(HeaderPopover)`
  border-bottom: none !important; // override ant menu styles
  .ant-menu-submenu-title {
    color: ${colors.white};
    padding: 0;
  }
  .ant-menu-submenu {
    border-bottom: none !important;
  }
  .ant-menu-item {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
  .ant-menu-item-selected {
    border-bottom: none;
    background: ${colors.lightGray};
  }

  ${media.phone`
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    flex-direction: column;
  `}
`

const ActionTabsInnerContainer = styled.div`
  padding: 6px 0;

  ${media.phone`
    padding-top: 3px;
    padding-bottom: 3px;
  `}
`

const ActionTabDropdown = styled.span`
  align-items: center;
  justify-content: center;
  display: none;

  ${media.phone`
    display: flex;
  `}

  i {
    margin-right: 8px;
  }
`

const Button = styled(DefaultButton)`
  background-color: ${hexToRgba(colors.white, 0.1)};
  color: ${colors.white};
  height: 44px;
  min-width: 134px;

  &&:hover,
  &&:active,
  &&:focus {
    background-color: ${hexToRgba(colors.white, 0.15)};
    color: ${colors.white};
  }
`

const ActionTabIcon = styled.img`
  height: 18px;
  width: 18px;
  object-fit: contain;
  margin-right: 6px;
  align-self: center;
`

const ActionTabWrapper = styled.div`
  display: flex;
  align-items: center;
`

class ActionsPage extends Component {
  state = {
    actions: [],
    timeValues: [],
    limit: 0,
    loading: true,
    page: 0,
    total: 0,
    searchData: {
      searchedActions: [],
      total: null,
      searching: false,
      isFetched: false,
      // this value must be "undefined", cause
      // Ant Select plugin don't show placeholder
      // if value will be defined
      searchFieldValue: undefined,
    },
    showFilter: false,
    filterValuesFromQuery: null,
    activeFiltersCount: 0,
    subset: null,
    subsetDropdownVisible: false,
  }

  searchSelect = React.createRef()

  static getDerivedStateFromProps(nextProps, prevState) {
    const subset =
      {
        discover: ACTIONS_SUBSETS.DISCOVER,
        suggested: ACTIONS_SUBSETS.SUGGESTED,
        taken: ACTIONS_SUBSETS.HISTORY,
      }[nextProps.match.params.subset] || ACTIONS_SUBSETS.DISCOVER

    return {
      ...prevState,
      subset,
    }
  }

  async componentDidMount() {
    const { subset } = this.state
    const { search = {} } = this.props.location
    const queryParams = qs.parse(search, { ignoreQueryPrefix: true })

    this.handleParamsForFilter(queryParams)

    await this.fetchActions(queryParams, subset)
    await this.fetchTimeValues()
  }

  async componentDidUpdate(prevProps) {
    const prevSearch = get(prevProps, 'location.search')
    const currSearch = get(this.props, 'location.search')

    if (!isEmpty(currSearch) && prevSearch !== currSearch) {
      const query = qs.parse(currSearch, { ignoreQueryPrefix: true })
      await this.fetchActions(query, this.state.subset)
    }
  }

  handleParamsForFilter = queryParams => {
    let params = {}
    Object.keys(queryParams).map(paramName => {
      if (Object.values(IMPACT_CATEGORIES).includes(paramName)) {
        params[paramName] = [
          Number(queryParams[paramName].from),
          Number(queryParams[paramName].to),
        ]
      }
    })

    if (Object.values(params).length > 0) {
      this.setState({
        showFilter: true,
        filterValuesFromQuery: params,
        activeFiltersCount: Object.values(params).length,
      })
    }
  }

  fetchActions = async (query, subset) => {
    if (query.page && Number(query.page) === Number(this.state.page)) {
      return
    }

    if (window.innerWidth < sizes.largeDesktop) query.limit = 10

    let request

    switch (subset) {
      case ACTIONS_SUBSETS.DISCOVER:
        request = api.getActions
        break
      case ACTIONS_SUBSETS.SUGGESTED:
        request = api.getSuggestedActions
        break
      case ACTIONS_SUBSETS.HISTORY:
        request = api.getActionsHistory
        break
      default:
        request = api.getActions
    }

    this.setState({ loading: true }, () => {
      window.scrollTo(0, 0)
    })

    const {
      actions: { docs: actions, limit, totalDocs: total, page },
    } = await request(query, this.props.token)

    this.setState({
      actions:
        subset === ACTIONS_SUBSETS.HISTORY
          ? actions.map(item => ({
              ...item,
              suggestedAt: item.updatedAt,
              suggestedBy: { selfTaken: true },
            }))
          : actions,
      limit,
      loading: false,
      page,
      total,
    })
  }

  fetchTimeValues = async () => {
    const { timeValues } = await api.getTimeValues()
    this.setState({
      timeValues: timeValues.sort((a, b) => a.minutes - b.minutes),
    })
  }

  searchActions = debounce(async query => {
    this.setState({
      searchData: {
        ...this.state.searchData,
        searching: true,
      },
    })

    const {
      actions: { docs: actions, totalDocs: total },
    } = await api.getActions(query)

    this.setState({
      searchData: {
        ...this.state.searchData,
        searching: false,
        searchedActions: actions,
        total,
      },
    })
  }, 600)

  paginationItemRender = (current, type, originalElement) => {
    if (type === 'page') {
      return (
        <button
          onClick={() => {
            this.pushQueryToUrl({ page: current })
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
  }

  handleSearchFieldChange = searchFieldValue => {
    this.setState({
      searchData: {
        ...this.state.searchData,
        searchFieldValue,
        searchedActions: [],
        searching: false,
      },
    })
  }

  handleTabItemSelect = async subset => {
    if (this.state.subsetDropdownVisible) {
      this.setState({ subsetDropdownVisible: false })
    }

    if (this.state.subset === subset) {
      return
    }

    switch (subset) {
      case ACTIONS_SUBSETS.DISCOVER:
        await this.fetchActions({}, subset)
        return history.push('/actions/discover')
      case ACTIONS_SUBSETS.SUGGESTED:
        await this.fetchActions({}, subset)
        return history.push('/actions/suggested')
      case ACTIONS_SUBSETS.HISTORY:
        await this.fetchActions({}, subset)
        return history.push('/actions/taken')
    }
  }

  handleOpenActionCard = ({ slug }) => {
    history.push(`/actions/${this.state.subset}/${slug}`)
  }

  handleSearchedItemSelect = async () => {
    // Reset search data after select action
    // Double reset data cause after first
    // reset Select component put value to search field
    await this.resetSearchData(this.resetSearchData)
    await this.resetSearchData(this.resetSearchData)
  }

  resetSearchData = async () => {
    await this.setState({
      searchData: {
        ...this.state.searchData,
        searchedActions: [],
        searching: false,
        searchFieldValue: undefined,
        total: null,
      },
    })
  }

  handleDropdownVisibleChange = open => {
    !open && this.resetSearchData()
  }

  handleFilterReset = () => {
    this.setState({ filterValuesFromQuery: null })
  }

  handleOnAfterFiltersChange = debounce(({ data, activeFilterCount }) => {
    this.setState({ activeFiltersCount: activeFilterCount })
    this.pushQueryToUrl(data)
    this.fetchActions(data, this.state.subset)
    this.handleParamsForFilter(data, {
      ignoreQueryPrefix: true,
    })
  }, 600)

  handlePaginationChange = page => {
    const queryParams = qs.parse(get(this.props, 'location.search', {}), {
      ignoreQueryPrefix: true,
    })
    queryParams.page = page
    this.pushQueryToUrl(queryParams)
  }

  handleSubsetDropdownVisibleChange = visible => {
    this.setState({ visible })
  }

  handleSubsetDropdownClick = () => {
    if (!this.state.subsetDropdownVisible) {
      this.setState({ subsetDropdownVisible: true })
    }
  }

  toggleFilter = () => {
    this.setState({ showFilter: !this.state.showFilter })
  }

  pushQueryToUrl = query => {
    history.push(
      `/actions/${this.state.subset}?${qs.stringify(query, {
        encode: false,
      })}`,
    )
  }

  getTabItemContent = subset => {
    let data = {}
    switch (subset) {
      case ACTIONS_SUBSETS.DISCOVER:
        data.type = DiscoverIcon
        data.id = 'app.actionsPage.tabs.discover'
        break
      case ACTIONS_SUBSETS.SUGGESTED:
        data.type = SuggestedIcon
        data.id = 'app.actionsPage.tabs.suggested'
        break
      case ACTIONS_SUBSETS.HISTORY:
        data.type = HistoryIcon
        data.id = 'app.actionsPage.tabs.history'
        break
      default:
        return
    }
    return (
      <Fragment>
        <ActionTabWrapper>
          <ActionTabIcon alt="" src={data.type} />
          <FormattedMessage id={data.id} />
        </ActionTabWrapper>
      </Fragment>
    )
  }

  render() {
    const {
      intl: { formatMessage, locale },
      user,
      location,
    } = this.props

    const {
      actions,
      limit,
      loading,
      page,
      total,
      searchData,
      showFilter,
      activeFiltersCount,
      filterValuesFromQuery,
      timeValues,
      subset,
      subsetDropdownVisible,
    } = this.state

    return (
      <Fragment>
        <PageMetadata pageName="actionsPage" />
        <Wrapper>
          {user && (
            <ActionTabsWrap>
              <BlockContainer>
                <ActionTabsInnerContainer>
                  <ActionTabsRow>
                    <ActionTabItemList>
                      <ActionTabItem
                        onClick={() =>
                          this.handleTabItemSelect(ACTIONS_SUBSETS.DISCOVER)
                        }
                        active={subset === ACTIONS_SUBSETS.DISCOVER}
                      >
                        {this.getTabItemContent(ACTIONS_SUBSETS.DISCOVER)}
                      </ActionTabItem>

                      <ActionTabItem
                        onClick={() =>
                          this.handleTabItemSelect(ACTIONS_SUBSETS.SUGGESTED)
                        }
                        active={subset === ACTIONS_SUBSETS.SUGGESTED}
                      >
                        {this.getTabItemContent(ACTIONS_SUBSETS.SUGGESTED)}
                      </ActionTabItem>

                      <ActionTabItem
                        onClick={() =>
                          this.handleTabItemSelect(ACTIONS_SUBSETS.HISTORY)
                        }
                        active={subset === ACTIONS_SUBSETS.HISTORY}
                      >
                        {this.getTabItemContent(ACTIONS_SUBSETS.HISTORY)}
                      </ActionTabItem>
                    </ActionTabItemList>

                    <Popover
                      placement="bottomLeft"
                      visible={subsetDropdownVisible}
                      onVisibleChange={this.handleSubsetDropdownVisibleChange}
                      content={
                        <ActionTabItemListMobile
                          mode="vertical"
                          theme="light"
                          selectedKeys={[subset]}
                        >
                          <Menu.Item
                            key={ACTIONS_SUBSETS.DISCOVER}
                            onClick={() =>
                              this.handleTabItemSelect(ACTIONS_SUBSETS.DISCOVER)
                            }
                          >
                            {this.getTabItemContent(ACTIONS_SUBSETS.DISCOVER)}
                          </Menu.Item>

                          <Menu.Item
                            key={ACTIONS_SUBSETS.SUGGESTED}
                            onClick={() =>
                              this.handleTabItemSelect(
                                ACTIONS_SUBSETS.SUGGESTED,
                              )
                            }
                          >
                            {this.getTabItemContent(ACTIONS_SUBSETS.SUGGESTED)}
                          </Menu.Item>

                          <Menu.Item
                            key={ACTIONS_SUBSETS.HISTORY}
                            onClick={() =>
                              this.handleTabItemSelect(ACTIONS_SUBSETS.HISTORY)
                            }
                          >
                            {this.getTabItemContent(ACTIONS_SUBSETS.HISTORY)}
                          </Menu.Item>
                        </ActionTabItemListMobile>
                      }
                    >
                      <ActionTabDropdown
                        onClick={this.handleSubsetDropdownClick}
                      >
                        {this.getTabItemContent(subset)}
                        <ExpandMoreIcon
                          style={{
                            color: `${colors.green}`,
                          }}
                        />
                      </ActionTabDropdown>
                    </Popover>

                    <div>
                      <Link to={`${location.pathname}/suggest-idea`}>
                        <Button>
                          <FormattedMessage id="app.headerActions.addAction" />
                        </Button>
                      </Link>
                    </div>
                  </ActionTabsRow>
                </ActionTabsInnerContainer>
              </BlockContainer>
            </ActionTabsWrap>
          )}
          <BlockContainer>
            <InnerContainer>
              <Row span={8} xl={8} lg={12} md={12} xs={24}>
                <Col>
                  {subset === ACTIONS_SUBSETS.DISCOVER && (
                    <SearchWrapper>
                      <SearchFieldWrap>
                        <ToggleFilterButton onClick={this.toggleFilter}>
                          <img
                            src={
                              showFilter
                                ? filterToggleActiveImg
                                : filterToggleImg
                            }
                          />
                          {activeFiltersCount > 0 && (
                            <ToggleFilterActiveIcon>
                              {activeFiltersCount}
                            </ToggleFilterActiveIcon>
                          )}
                        </ToggleFilterButton>
                        <SearchField
                          placeholder={formatMessage({
                            id: 'app.actionsPage.searchPlaceholder',
                          })}
                          value={searchData.searchFieldValue}
                          dropdownClassName="ant-select__override-for__actions-page"
                          notFoundContent={
                            searchData.searching ? (
                              <Spin size="small" />
                            ) : !searchData.searching &&
                              Number.isInteger(searchData.total) &&
                              searchData.total === 0 ? (
                              <FormattedMessage id="app.actionsPage.searchNotFound" />
                            ) : null
                          }
                          showSearch
                          suffixIcon={
                            searchData.searching ? (
                              <Spin size="small" />
                            ) : (
                              <span />
                            )
                          }
                          ref={this.searchSelect}
                          /*
                           * Filter by match searched value and option value.
                           *
                           * How it works:
                           * Search option has 2 values: [ picture, name ].
                           * We filter option value (option.props.children[1]) with
                           * search value (value from search input)
                           *
                           * Why we use it:
                           * We need filter data from search response and
                           * show to user matched data
                           */
                          filterOption={(input, option) =>
                            option.props.children[1]
                              .toLowerCase()
                              .indexOf(input.toLowerCase()) >= 0
                          }
                          onSearch={value =>
                            value.length > 0 &&
                            this.searchActions({ name: value })
                          }
                          onChange={this.handleSearchFieldChange}
                          onSelect={this.handleSearchedItemSelect}
                          onDropdownVisibleChange={
                            this.handleDropdownVisibleChange
                          }
                        >
                          {searchData.searchedActions.map(action => (
                            <Select.Option
                              key={action.picture}
                              onClick={() => this.handleOpenActionCard(action)}
                            >
                              <ActionSearchDropdownPicture
                                src={action.picture}
                              />
                              {action.name}
                            </Select.Option>
                          ))}
                        </SearchField>
                        {!searchData.searching && (
                          <StyledSearchIcon type="search" />
                        )}
                      </SearchFieldWrap>
                      {timeValues.length > 0 && showFilter && (
                        <FilterWrap>
                          <ActionsFilters
                            timeValues={timeValues}
                            values={filterValuesFromQuery}
                            onReset={this.handleFilterReset}
                            onAfterChange={this.handleOnAfterFiltersChange}
                            actionsPageSubset={subset}
                          />
                        </FilterWrap>
                      )}
                    </SearchWrapper>
                  )}
                </Col>
              </Row>
              {loading ? (
                <NotFoundWrap>
                  <Spinner />
                </NotFoundWrap>
              ) : (
                <Row gutter={{ md: 20 }}>
                  {actions.map(action => (
                    <Col key={action._id} xl={8} lg={12} md={12} xs={24}>
                      <ActionCard
                        linkPrefix={`/actions/${subset}`}
                        slug={action.slug}
                        picture={action.picture}
                        name={action.translatedName[locale] || action.name}
                        impacts={action.impacts}
                        suggestedBy={action.suggestedBy}
                        suggestedAt={action.suggestedAt}
                      />
                    </Col>
                  ))}

                  {actions.length === 0 && (
                    <NotFoundWrap>
                      <FormattedMessage id="app.actionsPage.actionsNotFound" />
                    </NotFoundWrap>
                  )}
                </Row>
              )}

              {total > 1 && (
                <Pagination
                  current={page}
                  itemRender={this.paginationItemRender}
                  pageSize={limit}
                  total={total}
                  onChange={this.handlePaginationChange}
                />
              )}
            </InnerContainer>
          </BlockContainer>
        </Wrapper>
      </Fragment>
    )
  }
}

ActionsPage.propTypes = {
  intl: intlShape.isRequired,
  user: PropTypes.object,
  token: PropTypes.string,
  location: PropTypes.object,
}

const mapStateToProps = state => ({
  user: state.user.data,
  token: state.account.token,
})

export default compose(
  connect(mapStateToProps),
  injectIntl,
)(ActionsPage)
