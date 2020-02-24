import React from 'react'
import { Row, Col, Select, Spin, Icon } from 'antd'
import qs from 'qs'
import styled from 'styled-components'
import { injectIntl, intlShape, FormattedMessage } from 'react-intl'
import debounce from 'lodash/debounce'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { animateScroll } from 'react-scroll/modules'
import { Animate } from 'react-animate-mount'

import filterToggleImg from 'assets/actions-page/ic_filter_list.png'
import filterToggleActiveImg from 'assets/actions-page/ic_filter_list_active.png'
import FlagIconComponent from 'assets/icons/FlagIcon'
import DiscoverIconComponent from 'assets/icons/DiscoverIcon'
import SuggestedIconComponent from 'assets/icons/SuggestedIcon'
import HistoryIconComponent from 'assets/icons/HistoryIcon'

import {
  BlockContainer,
  Pagination,
  DefaultButton,
  Modal,
} from 'components/Styled'
import ActionCard from 'components/ActionCard'
import Spinner from 'components/Spinner'
import colors from 'config/colors'
import PageMetadata from 'components/PageMetadata'
import media, { sizes } from 'utils/mediaQueryTemplate'
import hexToRgba from 'utils/hexToRgba'
import {
  IMPACT_CATEGORIES,
  ACTIONS_SUBSETS,
  ACTION_STATES,
} from 'utils/constants'
import fetch from 'utils/fetch'
import ActionCardLabelSet from 'components/ActionCardLabelSet'
import Tooltip from 'components/Tooltip'
import ScrollAnimation from 'components/ScrollAnimation'
import TabsSecondary, { TABS_TYPES } from 'components/TabsSecondary'

import * as api from 'api/actions'

import ActionsFilters from './ActionFilter'

const Wrapper = styled.div`
  background-color: ${colors.lightGray};
  position: relative;
  height: 100%;
  flex-grow: 1;
`

const InnerContainer = styled.div`
  padding: 20px 0;

  ${media.largeDesktop`
    padding: 15px 0;
  `}
`

const ActionSearchDropdownPicture = styled.div`
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center center;
  width: 70px;
  height: 70px;
  border-radius: 5px;
  margin-right: 10px;
  display: inline-block;
`

const SearchBlockWrapper = styled.div`
  background-color: ${colors.white};
  padding: 20px;
  ${media.phone`
    margin: 0;
    .ant-popover-content {
      width: 100vw;
    }
    .ant-modal-content {
      height: 100vh;
      .ant-modal-close-x {
        position: absolute;
        top: 15px;
        right: -1px;
      }
      .ant-modal-header {
        padding: 36px 15px 15px;
        .ant-modal-title {
          font-size: 22px;
        }
      }
      .ant-modal-body {
        padding: 15px;
      }
    }
    
    .ant-modal-wrap {
      z-index: 1070;
      overflow: unset;
    }
    .ant-modal-header {
      border-bottom: none;
    }
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

const SearchWrap = styled.div`
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
  padding-right: 18px;
  margin-top: 38px;
  ${media.phone`
    margin: 0 auto;
    padding: 0;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: 300px;
  `}
`

export const ImpactButton = styled(DefaultButton)`
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

const ActionSearchDropdownOptionContent = styled.div`
  display: flex;
  align-items: center;
`

const SearchFieldWrap = styled.div`
  width: 100%;
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
      api.getActionsModeling,
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
    timeValues,
  }

  if (!timeValues && timeValuesResponse)
    result.timeValues = timeValuesResponse.sort((a, b) => a.minutes - b.minutes)

  window.scrollTo(0, 0)

  return result
}

class ActionsPage extends React.PureComponent {
  static propTypes = {
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

  static defaultProps = {
    actions: [],
  }

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
    showFilter:
      window.innerWidth > sizes.phone &&
      Boolean(configParamsForFilter(this.props)),
    filterValuesFromQuery: configParamsForFilter(this.props) || null,
    activeFiltersCount: (configParamsForFilter(this.props) || '').length,
    visibleTabs: false,
    listType:
      window.screen.availWidth <= sizes.tablet
        ? TABS_TYPES.select
        : TABS_TYPES.default,
    modalVisible: false,
  }

  $search = React.createRef()

  componentDidMount() {
    animateScroll.scrollToTop()
    window.addEventListener('orientationchange', this.changeTabsType)
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

  componentWillUnmount() {
    window.removeEventListener('orientationchange', this.changeTabsType)
  }

  changeTabsType = () => {
    this.setState({
      listType:
        window.screen.availWidth <= sizes.tablet
          ? TABS_TYPES.select
          : TABS_TYPES.default,
      visibleTabs: false,
    })
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

  handleOpenActionCard = ({ slug }) => () => {
    const { match, history } = this.props

    history.push(`/actions/${match.params.subset}/${slug}`)
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
    const { match, history } = this.props

    this.setState({ activeFiltersCount: activeFilterCount })

    if (Object.keys(data).length === 0) {
      history.push(`/actions/${match.params.subset}`)
    } else {
      this.updateQueries({ ...data, page: 1 })
    }
  }, 600)

  toggleFilter = () => {
    if (window.innerWidth < sizes.phone) {
      this.setState({
        modalVisible: !this.state.modalVisible,
      })
    } else {
      this.setState({ showFilter: !this.state.showFilter })
    }
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

  onActionDelete = id => e => {
    const {
      intl: { formatMessage },
    } = this.props

    e.preventDefault()

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

  render() {
    const {
      intl: { formatMessage, formatRelative, locale },
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
      visibleTabs,
      listType,
      modalVisible,
    } = this.state

    return (
      <React.Fragment>
        <PageMetadata pageName="actionsPage" />

        <Wrapper>
          {user && (
            <TabsSecondary
              list={[
                {
                  to: `/actions/${ACTIONS_SUBSETS.DISCOVER}`,
                  icon: DiscoverIconComponent,
                  text: formatMessage({ id: 'app.actionsPage.tabs.discover' }),
                  active: match.params.subset === ACTIONS_SUBSETS.DISCOVER,
                },
                {
                  to: `/actions/${ACTIONS_SUBSETS.SUGGESTED}`,
                  icon: SuggestedIconComponent,
                  text: formatMessage({ id: 'app.actionsPage.tabs.suggested' }),
                  active: match.params.subset === ACTIONS_SUBSETS.SUGGESTED,
                },
                {
                  to: `/actions/${ACTIONS_SUBSETS.MY_IDEAS}`,
                  icon: FlagIconComponent,
                  text: formatMessage({ id: 'app.actionsPage.tabs.my-ideas' }),
                  active: match.params.subset === ACTIONS_SUBSETS.MY_IDEAS,
                },
                {
                  to: `/actions/${ACTIONS_SUBSETS.TAKEN}`,
                  icon: HistoryIconComponent,
                  text: formatMessage({ id: 'app.actionsPage.tabs.history' }),
                  active: match.params.subset === ACTIONS_SUBSETS.TAKEN,
                },
                {
                  to: `/actions/${ACTIONS_SUBSETS.MODELING}`,
                  icon: HistoryIconComponent,
                  text: formatMessage({ id: 'app.actionsPage.tabs.modeling' }),
                  active: match.params.subset === ACTIONS_SUBSETS.MODELING,
                },
              ]}
              isOpen={visibleTabs}
              listType={listType}
              toggleVisible={visible => {
                this.setState({ visibleTabs: visible })
              }}
              button={{
                text: formatMessage({ id: 'app.headerActions.addAction' }),
                onClick: () => {
                  history.push('/account/actions/create')
                },
              }}
            />
          )}

          <BlockContainer>
            <InnerContainer>
              <Row span={8} xl={8} lg={12} md={12} xs={24}>
                <Col>
                  {match.params.subset === ACTIONS_SUBSETS.DISCOVER && (
                    <SearchBlockWrapper>
                      <SearchWrap>
                        <ToggleFilterButton onClick={this.toggleFilter}>
                          <img
                            src={
                              showFilter
                                ? filterToggleActiveImg
                                : filterToggleImg
                            }
                            alt="toggle filters"
                          />
                          {activeFiltersCount > 0 && (
                            <ToggleFilterActiveIcon>
                              {activeFiltersCount}
                            </ToggleFilterActiveIcon>
                          )}
                        </ToggleFilterButton>

                        <SearchFieldWrap ref={this.$search}>
                          <SearchField
                            placeholder={formatMessage({
                              id: 'app.actionsPage.searchPlaceholder',
                            })}
                            value={searchData.searchFieldValue}
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
                            suffixIcon={<span />}
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
                              (option.props.children.props.children[1] &&
                                option.props.children.props.children[1]
                                  .toLowerCase()
                                  .indexOf(input.toLowerCase()) >= 0) ||
                              /\S/.test(input)
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
                                onClick={this.handleOpenActionCard(action)}
                              >
                                <ActionSearchDropdownOptionContent>
                                  <ActionSearchDropdownPicture
                                    src={action.picture}
                                    alt=""
                                  />
                                  {action.name}
                                </ActionSearchDropdownOptionContent>
                              </Select.Option>
                            ))}
                          </SearchField>
                        </SearchFieldWrap>
                        <StyledSearchIcon type="search" />
                      </SearchWrap>
                      <Animate show={timeValues.length > 0 && showFilter}>
                        <FilterWrap>
                          <ActionsFilters
                            showFilter={showFilter}
                            timeValues={timeValues}
                            values={filterValuesFromQuery}
                            onReset={this.handleFilterReset}
                            onAfterChange={this.handleOnAfterFiltersChange}
                          />
                        </FilterWrap>
                      </Animate>
                    </SearchBlockWrapper>
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
                          to={
                            action.status === ACTION_STATES.PROPOSED
                              ? `/account/actions/preview/${action.slug}`
                              : `/actions/${match.params.subset}/${action.slug}`
                          }
                          picture={action.picture}
                          canChange={action.status === ACTION_STATES.PROPOSED}
                          onEdit={e => {
                            e.preventDefault()

                            history.push(`/account/actions/edit/${action.slug}`)
                          }}
                          onDelete={this.onActionDelete(action._id)}
                          name={
                            action.translatedName &&
                            action.translatedName[locale]
                              ? action.translatedName[locale]
                              : action.name
                          }
                          impacts={() => {
                            let tooltipTextId, buttonTextId
                            switch (action.status) {
                              case ACTION_STATES.MODELING:
                                tooltipTextId =
                                  'app.actions.card.waitModelingHint'
                                buttonTextId = 'app.actions.card.waitModeling'
                                break
                              case ACTION_STATES.DENIED:
                                tooltipTextId = 'app.actions.card.deniedHint'
                                buttonTextId = 'app.actions.card.denied'
                                break
                              default:
                                tooltipTextId = 'app.actions.card.waitAdminHint'
                                buttonTextId = 'app.actions.card.waitAdmin'
                            }
                            return action.status !== ACTION_STATES.PUBLISHED ? (
                              <Tooltip
                                placement="top"
                                title={formatMessage({
                                  id: tooltipTextId,
                                })}
                              >
                                <ImpactButton
                                  style={{ height: 35 }}
                                  isModelling={
                                    action.status === ACTION_STATES.MODELING
                                  }
                                >
                                  {formatMessage({
                                    id: buttonTextId,
                                  })}
                                </ImpactButton>
                              </Tooltip>
                            ) : (
                              <ActionCardLabelSet impacts={action.impacts} />
                            )
                          }}
                          suggestedBy={action.suggestedBy}
                          suggestedAt={
                            action.suggestedAt &&
                            formatRelative(action.suggestedAt)
                          }
                          isHabit={action.isHabit}
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

              {!loading && total > limit && (
                <Pagination
                  current={page}
                  pageSize={limit}
                  total={total}
                  itemRender={(current, type, originalElement) => {
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
                  }}
                />
              )}
            </InnerContainer>
          </BlockContainer>
        </Wrapper>

        <Modal
          title={formatMessage({
            id: 'app.actionsPage.filterModalTitle',
          })}
          visible={modalVisible}
          onCancel={() =>
            this.setState({
              modalVisible: false,
            })
          }
          getContainer={() => this.$search.current}
          centered
          destroyOnClose
        >
          <FilterWrap>
            <ActionsFilters
              showFilter={showFilter}
              timeValues={timeValues}
              values={filterValuesFromQuery}
              onReset={this.handleFilterReset}
              onAfterChange={this.handleOnAfterFiltersChange}
              closeModal={() => {
                this.setState({
                  modalVisible: false,
                })
              }}
              inModal
            />
          </FilterWrap>
        </Modal>
      </React.Fragment>
    )
  }
}

export default compose(
  connect(state => ({
    user: state.user.data,
  })),
  fetch(getActionsList, { loader: false }),
  injectIntl,
)(ActionsPage)
