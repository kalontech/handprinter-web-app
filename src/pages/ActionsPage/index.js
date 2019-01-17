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

import hexToRgba from 'utils/hexToRgba'

import {
  BlockContainer,
  Pagination,
  HeaderPopover,
  DefaultButton,
} from './../../components/Styled'
import ActionCard from './../../components/ActionCard'
import ActionsFilters from './ActionFilter'
import api from './../../api'
import Spinner from './../../components/Spinner'
import colors from './../../config/colors'
import { history } from './../../appRouter'
import filterToggleImg from './../../assets/actions-page/ic_filter_list.png'
import filterToggleActiveImg from './../../assets/actions-page/ic_filter_list_active.png'
import media from './../../utils/mediaQueryTemplate'
import { IMPACT_CATEGORIES, ACTIONS_SUBSETS } from '../../utils/constants'
import PageMetadata from '../../components/PageMetadata'
import ExpandMoreIcon from '../../assets/icons/ExpandMoreIcon'

const Wrapper = styled.div`
  background-color: ${colors.lightGray};
  position: relative;
  height: 100%;
`

const InnerContainer = styled.div`
  padding: 25px 0;

  ${media.largeDesktop`
    padding: 15px 0;
  `}
`

const ActionSearchDropdownPicture = styled.img`
  height: 90px;
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
    margin-right: 0px;
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

const AcionTabDropdown = styled.span`
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
  color: ${hexToRgba(colors.white, 0.5)};
  height: 44px;
  min-width: 134px;

  &&:hover,
  &&:focus {
    color: ${hexToRgba(colors.white, 0.7)};
  }

  &&.active,
  &&:active {
    color: ${hexToRgba(colors.white, 0.7)};
  }
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

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      ...prevState,
      subset: (() => {
        switch (nextProps.match.params.subset) {
          case 'discover':
            return ACTIONS_SUBSETS.DISCOVER
          case 'suggested':
            return ACTIONS_SUBSETS.SUGGESTED
          default:
            return ACTIONS_SUBSETS.DISCOVER
        }
      })(),
    }
  }

  componentDidMount = async () => {
    const subset = get(this.props, 'match.params.subset', {})
    const search = get(this.props, 'location.search', {})
    const queryParams = qs.parse(search, { ignoreQueryPrefix: true })

    this.handleParamsForFilter(queryParams)

    await this.fetchActions(queryParams, subset)
    await this.fetchTimeValues()
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
    if (query.page && query.page === this.state.page.toString()) {
      return
    }

    let request

    switch (subset) {
      case ACTIONS_SUBSETS.DISCOVER:
        request = api.getActions
        break
      case ACTIONS_SUBSETS.SUGGESTED:
        request = api.getSuggestedActions
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
    if (Object.keys(query).length > 0) {
      history.push(
        `/actions/${subset}?${qs.stringify(query, {
          encode: false,
        })}`,
      )
    }
    this.setState({
      actions,
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

  componentDidUpdate = async prevProps => {
    const prevSearch = get(prevProps, 'location.search')
    const currSearch = get(this.props, 'location.search')
    if (!isEmpty(currSearch) && prevSearch !== currSearch) {
      const query = qs.parse(currSearch, { ignoreQueryPrefix: true })
      await this.fetchActions(query, this.state.subset)
    }
  }

  paginationItemRender = (current, type, originalElement) => {
    if (type === 'page') {
      return (
        <Link to={`/actions/${this.state.subset}?page=${current}`}>
          {originalElement}
        </Link>
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
    this.fetchActions(data, this.state.subset)
  }, 600)

  handlePaginationChange = page => {
    const queryParams = qs.parse(get(this.props, 'location.search', {}), {
      ignoreQueryPrefix: true,
    })
    delete queryParams.page
    history.push(
      `/actions/${this.state.subset}?page=${page}&${qs.stringify(queryParams)}`,
    )
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

  getTabItemContent = subset => {
    let data = {}
    switch (subset) {
      case ACTIONS_SUBSETS.DISCOVER:
        data.type = 'compass'
        data.id = 'app.actionsPage.tabs.discover'
        break
      case ACTIONS_SUBSETS.SUGGESTED:
        data.type = 'compass'
        data.id = 'app.actionsPage.tabs.suggested'
        break
      default:
        return
    }
    return (
      <Fragment>
        <Icon type={data.type} />
        <FormattedMessage id={data.id} />
      </Fragment>
    )
  }

  searchSelect = React.createRef()

  render() {
    const {
      intl: { formatMessage },
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
                        </ActionTabItemListMobile>
                      }
                    >
                      <AcionTabDropdown
                        onClick={this.handleSubsetDropdownClick}
                      >
                        {this.getTabItemContent(subset)}
                        <ExpandMoreIcon
                          style={{
                            color: `${colors.green}`,
                          }}
                        />
                      </AcionTabDropdown>
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
                <Row gutter={10}>
                  {actions.map(action => (
                    <Col key={action._id} xl={8} lg={12} md={12} xs={24}>
                      <ActionCard
                        linkPrefix={`/actions/${subset}`}
                        slug={action.slug}
                        picture={action.picture}
                        name={action.name}
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

export default connect(mapStateToProps)(injectIntl(ActionsPage))
