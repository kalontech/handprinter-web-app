import React, { Component, Fragment } from 'react'
import { Row, Col, Select, Spin, Icon } from 'antd'
import { Link } from 'react-router-dom'
import qs from 'qs'
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'
import styled from 'styled-components'
import { injectIntl, FormattedMessage } from 'react-intl'
import debounce from 'lodash/debounce'
import PropTypes from 'prop-types'

import { BlockContainer, Pagination } from './../../components/Styled'
import ActionCard from './../../components/ActionCard'
import ActionsFilters from './ActionFilter'
import api from './../../api'
import Spinner from './../../components/Spinner'
import colors from './../../config/colors'
import { history } from './../../appRouter'
import filterToggleImg from './../../assets/actions-page/ic_filter_list.png'
import filterToggleActiveImg from './../../assets/actions-page/ic_filter_list_active.png'
import media from './../../utils/mediaQueryTemplate'
import { IMPACT_CATEGORIES } from '../../utils/constants'
import PageMetadata from '../../components/PageMetadata'

const Wrapper = styled.div`
  background-color: ${colors.lightGray};
  position: relative;
  height: 100%;
`

const InnerContainer = styled.div`
  padding: 25px 0;
  ${media.largeDesktop`
    padding: 25px 35px;
  `}
  ${media.phone`
    padding: 25px 15px;
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
    margin 0 16px;
  }
`

const StyledSearchIcon = styled(Icon)`
  font-size: 18px;
  color: ${colors.darkGray};
  font-weight: bold;
  position: absolute;
  right: 0;
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
    showFilter: true,
    filterValuesFromQuery: null,
    activeFiltersCount: 0,
  }

  componentDidMount = async () => {
    const search = get(this.props, 'location.search', {})
    const queryParams = qs.parse(search, { ignoreQueryPrefix: true })

    this.handleParamsForFilter(queryParams)

    await this.fetchActions(queryParams)
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

  fetchActions = async query => {
    if (query.page && query.page === this.state.page.toString()) {
      return
    }

    this.setState({ loading: true }, () => {
      window.scrollTo(0, 0)
    })
    const {
      actions: { docs: actions, limit, totalDocs: total, page },
    } = await api.getActions(query)
    if (Object.keys(query).length > 0) {
      history.push(`/actions?${qs.stringify(query, { encode: false })}`)
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
      await this.fetchActions(query)
    }
  }

  paginationItemRender(current, type, originalElement) {
    if (type === 'page') {
      return <Link to={`/actions?page=${current}`}>{originalElement}</Link>
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

  handleOpenActionCard = ({ slug }) => {
    history.push(`/actions/${slug}`)
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
    this.fetchActions(data)
  }, 600)

  handlePaginationChange = page => {
    const queryParams = qs.parse(get(this.props, 'location.search', {}), {
      ignoreQueryPrefix: true,
    })
    delete queryParams.page
    history.push(`/actions?page=${page}&${qs.stringify(queryParams)}`)
  }

  toggleFilter = () => {
    this.setState({ showFilter: !this.state.showFilter })
  }

  searchSelect = React.createRef()

  render() {
    const {
      intl: { formatMessage },
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
    } = this.state

    return (
      <Fragment>
        <PageMetadata pageName="actionsPage" />
        <Wrapper>
          <BlockContainer>
            <InnerContainer>
              <Row span={8} xl={8} lg={12} md={12} xs={24}>
                <Col>
                  <SearchWrapper>
                    <SearchFieldWrap>
                      <ToggleFilterButton onClick={this.toggleFilter}>
                        <img
                          src={
                            showFilter ? filterToggleActiveImg : filterToggleImg
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
                            <ActionSearchDropdownPicture src={action.picture} />
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
                        />
                      </FilterWrap>
                    )}
                  </SearchWrapper>
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
                        linkPrefix="/actions"
                        slug={action.slug}
                        picture={action.picture}
                        name={action.name}
                        impacts={action.impacts}
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
              <Pagination
                current={page}
                itemRender={this.paginationItemRender}
                pageSize={limit}
                total={total}
                onChange={this.handlePaginationChange}
              />
            </InnerContainer>
          </BlockContainer>
        </Wrapper>
      </Fragment>
    )
  }
}

ActionsPage.propTypes = {
  intl: PropTypes.shape({
    formatMessage: PropTypes.func.isRequired,
  }),
}

export default injectIntl(ActionsPage)
