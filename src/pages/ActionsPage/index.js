import React, { Component } from 'react'
import { Row, Col, Select, Spin, Icon } from 'antd'
import { Link } from 'react-router-dom'
import queryString from 'query-string'
import get from 'lodash/get'
import isEmpty from 'lodash/isEmpty'
import styled from 'styled-components'
import { injectIntl, FormattedMessage } from 'react-intl'
import debounce from 'lodash/debounce'
import PropTypes from 'prop-types'

import { BlockContainer, Pagination } from './../../components/Styled'
import ActionCard from './../../components/ActionCard'
import api from './../../api'
import Spinner from './../../components/Spinner'
import colors from './../../config/colors'
import { history } from './../../appRouter'

const Wrapper = styled.div`
  background-color: ${colors.lightGray};
  position: relative;
  height: 100%;
  top: -25px;
`

const InnerContainer = styled.div`
  margin: 25px 0 35px;
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
  margin: 50px 0 20px 0;
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

export const StyledSearchIcon = styled(Icon)`
  font-size: 18px;
  color: ${colors.darkGray};
  font-weight: bold;
  position: absolute;
  right: 0;
  right: 15px;
  top: 15px;
`

export const SearchFieldWrap = styled.div`
  position: relative;
`

class ActionsPage extends Component {
  state = {
    actions: [],
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
  }

  componentDidMount = async () => {
    const search = get(this.props, 'location.search', {})
    await this.fetchActions(queryString.parse(search))
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
    this.setState({
      actions,
      limit,
      loading: false,
      page,
      total,
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
      const query = queryString.parse(currSearch)
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

  searchSelect = React.createRef()

  render() {
    const {
      intl: { formatMessage },
    } = this.props
    const { actions, limit, loading, page, total, searchData } = this.state

    return (
      <Wrapper>
        <BlockContainer>
          <InnerContainer>
            <Row>
              <SearchWrapper>
                <SearchFieldWrap>
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
                      searchData.searching ? <Spin size="small" /> : <span />
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
                      value.length > 0 && this.searchActions({ name: value })
                    }
                    onChange={this.handleSearchFieldChange}
                    onSelect={this.handleSearchedItemSelect}
                    onDropdownVisibleChange={this.handleDropdownVisibleChange}
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
                  {!searchData.searching && <StyledSearchIcon type="search" />}
                </SearchFieldWrap>
              </SearchWrapper>
            </Row>
            {loading ? (
              <Spinner />
            ) : (
              <Row>
                {actions.map(action => (
                  <Col key={action._id} span={8}>
                    <ActionCard
                      linkPrefix="/actions"
                      slug={action.slug}
                      picture={action.picture}
                      name={action.name}
                      impacts={action.impacts}
                    />
                  </Col>
                ))}
              </Row>
            )}
            <Pagination
              current={page}
              itemRender={this.paginationItemRender}
              pageSize={limit}
              total={total}
            />
          </InnerContainer>
        </BlockContainer>
      </Wrapper>
    )
  }
}

ActionsPage.propTypes = {
  intl: {
    formatMessage: PropTypes.func.isRequired,
  },
}

export default injectIntl(ActionsPage)
