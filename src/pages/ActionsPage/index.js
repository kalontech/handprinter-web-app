import React from 'react'
import { Row, Col, Select, Spin, Icon, Menu, Popover } from 'antd'
import qs from 'qs'
import styled from 'styled-components'
import { injectIntl, intlShape, FormattedMessage } from 'react-intl'
import debounce from 'lodash/debounce'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { animateScroll } from 'react-scroll/modules'
import { Animate } from 'react-animate-mount'

import hexToRgba from 'utils/hexToRgba'

import {
  BlockContainer,
  Pagination,
  HeaderPopover,
  DefaultButton,
  Modal,
} from 'components/Styled'
import ActionCard from 'components/ActionCard'
import api from 'api'
import Spinner from 'components/Spinner'
import colors from 'config/colors'
import PageMetadata from 'components/PageMetadata'
import media, { sizes } from 'utils/mediaQueryTemplate'
import {
  IMPACT_CATEGORIES,
  ACTIONS_SUBSETS,
  ACTION_STATES,
} from 'utils/constants'
import fetch, { configDefault as fetchConfigDefault } from 'utils/fetch'
import ActionCardLabelSet from 'components/ActionCardLabelSet'
import Tooltip from 'components/Tooltip'
import ScrollAnimation from 'components/ScrollAnimation'
import ActionCreate from 'pages/ActionCreatePage'
import ActionOpenView from 'components/ActionOpenView'

import filterToggleImg from 'assets/actions-page/ic_filter_list.png'
import filterToggleActiveImg from 'assets/actions-page/ic_filter_list_active.png'
import ExpandMoreIcon from 'assets/icons/ExpandMoreIcon'
import DiscoverIcon from 'assets/icons/ic_discover.svg'
import SuggestedIcon from 'assets/icons/ic_suggested.svg'
import HistoryIcon from 'assets/icons/ic_history.svg'
import FlagIcon from 'assets/icons/ic_flag.svg'

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

const ImpactButton = styled(DefaultButton)`
  min-width: 100%;
  background-color: transparent;
  color: ${props => (props.isModelling ? colors.blue : colors.darkGray)};
  border: 1px solid
    ${props =>
      props.isModelling
        ? hexToRgba(colors.blue, 0.4)
        : hexToRgba(colors.darkGray, 0.4)};
  border-radius: 4px;
  font-weight: 400;

  &&:hover,
  &&:active {
    background-color: transparent;
    color: ${props => (props.isModelling ? colors.blue : colors.dark)};
    border-color: ${props =>
      props.isModelling
        ? hexToRgba(colors.blue, 0.6)
        : hexToRgba(colors.dark, 0.6)};
  }
`

const MODAL_TYPES = {
  create: 'create',
  preview: 'preview',
}

function configParamsForFilter({ location: { search } }) {
  const queries = qs.parse(search, { ignoreQueryPrefix: true })
  const params = {}

  Object.keys(queries).map(paramName => {
    if (Object.values(IMPACT_CATEGORIES).includes(paramName)) {
      params[paramName] = [
        Number(queries[paramName].from),
        Number(queries[paramName].to),
      ]
    }
  })

  if (Object.values(params).length > 0) {
    return params
  }
}

async function getActionsList(props) {
  const { location, match, timeValues } = props
  const query = qs.parse(location.search, { ignoreQueryPrefix: true })

  if (!query.page) query.page = 1
  if (window.innerWidth < sizes.largeDesktop) query.limit = 10

  const getActions =
    [
      api.getActions,
      api.getSuggestedActions,
      api.getActionsMyIdeas,
      api.getActionsHistory,
    ][Object.values(ACTIONS_SUBSETS).indexOf(match.params.subset)] ||
    api.getActions

  const getTimeValues = timeValues
    ? () => Promise.resolve({})
    : api.getTimeValues

  const [
    {
      actions: { docs: actions, limit, totalDocs: total, page },
    },
    { timeValues: timeValuesResponse },
  ] = await Promise.all([getActions(query), getTimeValues()])

  const result = {
    actions,
    limit,
    page,
    total,
  }

  if (!timeValues && timeValuesResponse)
    result.timeValues = timeValuesResponse.sort((a, b) => a.minutes - b.minutes)

  window.scrollTo(0, 0)

  return result
}

class ActionsPage extends React.PureComponent {
  state = {
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
    showFilter: Boolean(configParamsForFilter(this.props)),
    filterValuesFromQuery: configParamsForFilter(this.props) || null,
    activeFiltersCount: (configParamsForFilter(this.props) || '').length,
    subset: null,
    subsetDropdownVisible: false,
    currentAction: undefined,
    modalOpen: false,
    modalType: MODAL_TYPES.create,
  }

  $search = React.createRef()

  componentDidMount() {
    animateScroll.scrollToTop()
  }

  componentDidUpdate(prevProps) {
    const { location: oldLocation, match: oldMatch } = prevProps
    const { location, match } = this.props

    if (
      (oldMatch.params.subset !== match.params.subset ||
        oldLocation.search !== location.search) &&
      (!match.params.slug && !oldMatch.params.slug)
    )
      this.props.fetch()
  }

  searchActions = debounce(async query => {
    this.setState(state => ({
      searchData: {
        ...state.searchData,
        searching: true,
      },
    }))

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
            this.updateQueries({ page: current })
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

  handleSearchFieldChange = (searchFieldValue, option) => {
    if (option) {
      this.resetSearchData()
      return
    }

    this.setState({
      searchData: {
        ...this.state.searchData,
        searchFieldValue,
        searchedActions: [],
        searching: false,
      },
    })
  }

  handleTabItemSelect = subset => {
    if (this.state.subsetDropdownVisible) {
      this.setState({ subsetDropdownVisible: false })
    }

    this.props.history.push(`/actions/${subset}?page=1`)
  }

  handleOpenActionCard = ({ slug }) => {
    const { match, location, history } = this.props

    history.push(`/actions/${match.params.subset}/${slug}${location.search}`)
  }

  resetSearchData = () => {
    this.setState({
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
    this.updateQueries({ ...data, page: 1 })
  }, 600)

  handleSubsetDropdownClick = () => {
    if (!this.state.subsetDropdownVisible) {
      this.setState({ subsetDropdownVisible: true })
    }
  }

  toggleFilter = () => {
    this.setState({ showFilter: !this.state.showFilter })
  }

  updateQueries = query => {
    const { location, match, history } = this.props

    history.push(
      `/actions/${match.params.subset}?${qs.stringify(
        {
          ...qs.parse(location.search, { ignoreQueryPrefix: true }),
          ...query,
        },
        {
          encode: false,
        },
      )}`,
    )
  }

  getTabItemContent = subset => {
    const data = [
      {
        type: DiscoverIcon,
        id: 'app.actionsPage.tabs.discover',
      },
      {
        type: SuggestedIcon,
        id: 'app.actionsPage.tabs.suggested',
      },
      {
        type: FlagIcon,
        id: 'app.actionsPage.tabs.my-ideas',
      },
      {
        type: HistoryIcon,
        id: 'app.actionsPage.tabs.history',
      },
    ][Object.values(ACTIONS_SUBSETS).indexOf(subset)]

    return (
      <ActionTabWrapper>
        <ActionTabIcon alt="" src={data.type} />
        <FormattedMessage id={data.id} />
      </ActionTabWrapper>
    )
  }

  openModal = (action, modalType = MODAL_TYPES.create) => e => {
    e.preventDefault()
    e.stopPropagation()
    this.setState({ currentAction: action, modalOpen: true, modalType })
  }

  onActionDelete = id => e => {
    const {
      intl: { formatMessage },
    } = this.props

    e.preventDefault()
    e.stopPropagation()

    Modal.confirm({
      title: formatMessage({
        id: 'app.actions.page.delete.title',
      }),
      content: formatMessage({
        id: 'app.actions.page.delete.text',
      }),
      okText: formatMessage({
        id: 'app.profilePage.deleteAccountModal.confirmButton',
      }),
      cancelText: formatMessage({
        id: 'app.profilePage.deleteAccountModal.cancelButton',
      }),
      okType: 'danger',
      className: 'ant-modal-confirm_profile-page',
      centered: true,
      onOk: () => {
        return api.fetchAction({ id, method: 'DELETE' }).then(this.props.fetch)
      },
    })
  }

  closeModal = () => {
    this.setState({
      currentAction: undefined,
      modalOpen: false,
      modalType: MODAL_TYPES.create,
    })
  }

  render() {
    const {
      intl: { formatMessage, formatRelative },
      user,
      loading,
      actions,
      limit,
      page,
      total,
      timeValues = [],
      match,
      history,
    } = this.props

    const {
      searchData,
      showFilter,
      activeFiltersCount,
      filterValuesFromQuery,
      subsetDropdownVisible,
      currentAction,
      modalOpen,
      modalType,
    } = this.state

    return (
      <React.Fragment>
        <PageMetadata pageName="actionsPage" />

        <Wrapper>
          {user && (
            <ActionTabsWrap>
              <BlockContainer>
                <ActionTabsInnerContainer>
                  <ActionTabsRow>
                    <ActionTabItemList>
                      {Object.values(ACTIONS_SUBSETS).map(subset => (
                        <ActionTabItem
                          key={subset}
                          onClick={() => this.handleTabItemSelect(subset)}
                          active={match.params.subset === subset}
                        >
                          {this.getTabItemContent(subset)}
                        </ActionTabItem>
                      ))}
                    </ActionTabItemList>

                    <Popover
                      placement="bottomLeft"
                      visible={subsetDropdownVisible}
                      content={
                        <ActionTabItemListMobile
                          mode="vertical"
                          theme="light"
                          selectedKeys={[match.params.subset]}
                        >
                          {Object.values(ACTIONS_SUBSETS).map(subset => (
                            <Menu.Item
                              key={subset}
                              onClick={() => this.handleTabItemSelect(subset)}
                            >
                              {this.getTabItemContent(subset)}
                            </Menu.Item>
                          ))}
                        </ActionTabItemListMobile>
                      }
                    >
                      <ActionTabDropdown
                        onClick={this.handleSubsetDropdownClick}
                      >
                        {this.getTabItemContent(match.params.subset)}
                        <ExpandMoreIcon
                          style={{
                            color: `${colors.green}`,
                          }}
                        />
                      </ActionTabDropdown>
                    </Popover>

                    <div>
                      <Button
                        onClick={() => {
                          this.setState({ modalOpen: true })
                        }}
                      >
                        <FormattedMessage id="app.headerActions.addAction" />
                      </Button>
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
                  {match.params.subset === ACTIONS_SUBSETS.DISCOVER && (
                    <SearchWrapper ref={this.$search}>
                      <SearchFieldWrap>
                        <ToggleFilterButton onClick={this.toggleFilter}>
                          <img
                            src={
                              showFilter
                                ? filterToggleActiveImg
                                : filterToggleImg
                            }
                            alt=""
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
                          dropdownClassName="ant-select_override-for_actions-page"
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
                          onDropdownVisibleChange={
                            this.handleDropdownVisibleChange
                          }
                          getPopupContainer={() => this.$search.current}
                        >
                          {searchData.searchedActions.map(action => (
                            <Select.Option
                              key={action.picture}
                              onClick={() => this.handleOpenActionCard(action)}
                            >
                              <ActionSearchDropdownPicture
                                src={action.picture}
                                alt=""
                              />
                              {action.name}
                            </Select.Option>
                          ))}
                        </SearchField>
                        {!searchData.searching && (
                          <StyledSearchIcon type="search" />
                        )}
                      </SearchFieldWrap>
                      <Animate show={timeValues.length > 0 && showFilter}>
                        <FilterWrap>
                          <ActionsFilters
                            showFilter={showFilter}
                            timeValues={timeValues}
                            values={filterValuesFromQuery}
                            onReset={this.handleFilterReset}
                            onAfterChange={this.handleOnAfterFiltersChange}
                            actionsPageSubset={match.params.subset}
                          />
                        </FilterWrap>
                      </Animate>
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
                    <Col key={action.slug} xl={8} lg={12} md={12} xs={24}>
                      <ScrollAnimation>
                        <ActionCard
                          to={`/actions/${match.params.subset}/${action.slug}`}
                          onClick={
                            action.status === ACTION_STATES.PROPOSED
                              ? this.openModal(action, MODAL_TYPES.preview)
                              : undefined
                          }
                          picture={action.picture}
                          canChange={action.status === ACTION_STATES.PROPOSED}
                          onEdit={this.openModal(action)}
                          onDelete={this.onActionDelete(action._id)}
                          name={action.name}
                          impacts={() =>
                            action.status !== ACTION_STATES.PUBLISHED ? (
                              <Tooltip
                                placement="top"
                                title={formatMessage({
                                  id:
                                    action.status === ACTION_STATES.MODELING
                                      ? 'app.actions.card.waitModelingHint'
                                      : 'app.actions.card.waitAdminHint',
                                })}
                              >
                                <ImpactButton
                                  isModelling={
                                    action.status === ACTION_STATES.MODELING
                                  }
                                >
                                  {formatMessage({
                                    id:
                                      action.status === ACTION_STATES.MODELING
                                        ? 'app.actions.card.waitModeling'
                                        : 'app.actions.card.waitAdmin',
                                  })}
                                </ImpactButton>
                              </Tooltip>
                            ) : (
                              <ActionCardLabelSet impacts={action.impacts} />
                            )
                          }
                          suggestedBy={action.suggestedBy}
                          suggestedAt={
                            action.suggestedAt &&
                            formatRelative(action.suggestedAt)
                          }
                        />
                      </ScrollAnimation>
                    </Col>
                  ))}

                  {actions.length === 0 && (
                    <NotFoundWrap>
                      <FormattedMessage id="app.actionsPage.actionsNotFound" />
                    </NotFoundWrap>
                  )}
                </Row>
              )}

              {total > limit && (
                <Pagination
                  current={page}
                  itemRender={this.paginationItemRender}
                  pageSize={limit}
                  total={total}
                />
              )}
            </InnerContainer>
          </BlockContainer>
        </Wrapper>

        <Modal
          visible={modalOpen}
          closable={false}
          onCancel={this.closeModal}
          centered
          footer={null}
          width="auto"
          destroyOnClose
        >
          {modalType === MODAL_TYPES.preview ? (
            <ActionOpenView
              action={currentAction}
              cancel={{
                onClick: this.closeModal,
                message: formatMessage({ id: 'app.actionCreatePage.cancel' }),
              }}
              success={{
                onClick: () => {
                  this.setState({ modalType: MODAL_TYPES.create })
                },
                message: formatMessage({ id: 'app.actions.card.edit' }),
              }}
            />
          ) : (
            <ActionCreate
              action={currentAction}
              onCancel={this.closeModal}
              onSuccess={() => {
                history.push(
                  `/account/submit-succeeded/${
                    currentAction ? currentAction.slug : ''
                  }`,
                )
              }}
            />
          )}
        </Modal>
      </React.Fragment>
    )
  }
}

ActionsPage.propTypes = {
  intl: intlShape.isRequired,
  user: PropTypes.object,
  location: PropTypes.object,
  match: PropTypes.object,
  history: PropTypes.object,
  fetch: PropTypes.func,
  loading: PropTypes.bool,
  actions: PropTypes.array,
  limit: PropTypes.number,
  page: PropTypes.number,
  total: PropTypes.number,
  timeValues: PropTypes.array,
}

const mapStateToProps = state => ({
  user: state.user.data,
})

export default compose(
  connect(mapStateToProps),
  fetch(getActionsList, { ...fetchConfigDefault, loader: false }),
  injectIntl,
)(ActionsPage)
