import React, { useState, useEffect, useContext } from 'react'
import { Row, Col, Select, Spin, Icon } from 'antd'
import qs from 'qs'
import { injectIntl, intlShape, FormattedMessage } from 'react-intl'
import debounce from 'lodash/debounce'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { animateScroll } from 'react-scroll/modules'
import InfiniteScroll from 'react-infinite-scroll-component'

import FlagIconComponent from 'assets/icons/FlagIcon'
import DiscoverIconComponent from 'assets/icons/DiscoverIcon'
import SuggestedIconComponent from 'assets/icons/SuggestedIcon'
import HistoryIconComponent from 'assets/icons/HistoryIcon'
import { sizes } from 'utils/mediaQueryTemplate'

import { BlockContainer, Modal } from 'components/Styled'
import ActionCard from 'components/ActionCard'
import Spinner from 'components/Spinner'
import PageMetadata from 'components/PageMetadata'

import { ACTIONS_SUBSETS, ACTION_STATES } from 'utils/constants'
import ActionCardLabelSet from 'components/ActionCardLabelSet'
import Tooltip from 'components/Tooltip'
import ScrollAnimation from 'components/ScrollAnimation'
import TabsSecondary, { TABS_TYPES } from 'components/TabsSecondary'

import * as api from 'api/actions'

import { categories, behaviour, types } from './filterData'
import { Checkbox } from '../../components/Styled'
import { UIContextSettings } from '../../context/uiSettingsContext'
import ActionFilterModal from '../../components/ActionFilterModal'
import {
  Wrapper,
  InnerContainer,
  ActionSearchDropdownPicture,
  SearchBlockWrapper,
  SearchField,
  StyledSearchIcon,
  SearchWrap,
  NotFoundWrap,
  ImpactButton,
  ActionSearchDropdownOptionContent,
  SearchFieldWrap,
  FooterSpinner,
  MobileFilterWrap,
  MobileFilter,
} from './styled'
import useActions from './useActions'
import TabsSelect from '../../components/TabsSelect'

const { Option } = Select

function ActionsPage(props) {
  const UIContextData = useContext(UIContextSettings)
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
  }

  const [searchData, setSearchData] = useState({
    searchedActions: [],
    total: null,
    searching: false,
    isFetched: false,
    // this value must be "undefined", cause
    // Ant Select plugin don't show placeholder
    // if value will be defined
    searchFieldValue: undefined,
  })
  const [currPage, setCurrPage] = useState(1)

  const [actions, total] = useActions(props, currPage, setCurrPage)
  const [visibleTabs, setVisibleTabs] = useState(false)
  const [listType, setListType] = useState(
    window.screen.availWidth <= sizes.tablet
      ? TABS_TYPES.select
      : TABS_TYPES.default,
  )
  const [selectedCategories, setSelectedCategories] = useState([])
  const [selectedType, setSelectedType] = useState([])
  const [selectedBehaviour, setSelectedBehaviour] = useState([])
  const [width, setWidth] = useState(window.innerWidth)
  const [isCategoryFilterOpen, setIsCategoryFilterOpen] = useState(false)
  const [isTypeFilterOpen, setIsTypeFilterOpen] = useState(false)
  const [isBehaviourFilterOpen, setIsBehaviourFilterOpen] = useState(false)

  const $search = React.createRef()

  useEffect(() => {
    animateScroll.scrollToTop()
    window.addEventListener('orientationchange', changeTabsType)
    return () => {
      window.removeEventListener('orientationchange', changeTabsType)
    }
  }, [])

  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange)
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange)
    }
  }, [])

  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth)
  }

  const isTablet = width < sizes.largeDesktop
  const isMobile = width < sizes.tablet

  const changeTabsType = () => {
    setListType({
      listType:
        window.screen.availWidth <= sizes.tablet
          ? TABS_TYPES.select
          : TABS_TYPES.default,
      visibleTabs: false,
    })
  }

  const searchActions = debounce(async query => {
    setSearchData({
      ...searchData,
      searching: true,
    })

    const {
      actions: { docs: actions, totalDocs: total },
    } = await api.getActions(query)

    setSearchData({
      ...searchData,
      searching: false,
      searchedActions: actions,
      total,
    })
  }, 600)

  const handleSearchFieldChange = (searchFieldValue, option) => {
    if (option) {
      resetSearchData()
      return
    }

    setSearchData({
      ...searchData,
      searchFieldValue,
      searchedActions: [],
      searching: false,
    })
  }

  const handleOpenActionCard = ({ slug }) => () => {
    const { match, history } = props

    history.push(`/actions/${match.params.subset}/${slug}`)
  }

  const resetSearchData = () => {
    setSearchData({
      ...searchData,
      searchedActions: [],
      searching: false,
      searchFieldValue: undefined,
      total: null,
    })
  }

  const handleDropdownVisibleChange = open => {
    !open && resetSearchData()
  }

  const handleOnAfterFiltersChange = debounce(({ data, activeFilterCount }) => {
    const { match, history } = props

    if (Object.keys(data).length === 0) {
      history.push(`/actions/${match.params.subset}`)
    } else {
      updateQueries({ ...data })
    }
  }, 600)

  const updateQueries = query => {
    const { location, match, history } = props

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

  const onActionDelete = id => e => {
    const {
      intl: { formatMessage },
    } = props

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
        return api.fetchAction({ id, method: 'DELETE' }).then(props.fetch)
      },
    })
  }

  const handleCategoryChange = value => {
    let categories = selectedCategories.concat([])
    if (!value) {
      categories = []
    } else {
      if (categories.includes(value)) {
        categories.splice(categories.indexOf(value), 1)
      } else {
        categories.push(value)
      }
    }
    setSelectedCategories(categories)
    handleOnAfterFiltersChange({ data: { category: categories } })
  }

  const handleTypeChange = value => {
    let types = selectedType.concat([])
    if (!value) {
      types = []
    } else {
      if (selectedType.includes(value)) {
        types.splice(types.indexOf(value), 1)
      } else {
        types.push(value)
      }
    }
    setSelectedType(types)
    handleOnAfterFiltersChange({ data: { type: types } })
  }

  const handleBehaviourChange = value => {
    let behaviours = selectedBehaviour.concat([])
    if (!value) {
      behaviours = []
    } else {
      if (selectedBehaviour.includes(value)) {
        behaviours.splice(behaviours.indexOf(value), 1)
      } else {
        behaviours.push(value)
      }
    }
    setSelectedBehaviour(behaviours)
    handleOnAfterFiltersChange({ data: { behaviour: behaviours } })
  }

  const selectedItems = (arr, lable) => {
    const isTab = isTablet ? 13 : 25
    return `${lable}|${arr.join('')}`.length > isTab
      ? `${`${lable}|${arr.map(i => ` ${i}`).join(', ')}`.slice(0, isTab)}...`
      : `${lable}|${arr.map(i => ` ${i}`)}`
  }

  const {
    intl: { formatMessage, formatRelative, locale },
    user,
    loading,
    match,
    history,
  } = props

  const tabsList = [
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
  ]

  const defaultSelectVal = (
    <div>
      <Icon
        component={DiscoverIconComponent}
        style={{ marginRight: '10px', color: 'white' }}
      />
      {formatMessage({ id: 'app.header.menu.actions' })}
    </div>
  )

  function paramsToObject(entries) {
    let result = {
      categories: [],
      behaviour: [],
      type: [],
    }

    for (let entry of entries) {
      const [key, value] = entry
      if (key.slice(0, key.length - 3) === 'category') {
        result.categories.push(value)
      } else if (key.slice(0, key.length - 3) === 'behaviour') {
        result.behaviour.push(value)
      } else if (key.slice(0, key.length - 3) === 'type') {
        result.type.push(value)
      }
    }
    return result
  }

  const urlParams = new URLSearchParams(props.location.search)
  const entries = urlParams.entries()
  const filtersLables = paramsToObject(entries)

  return (
    <React.Fragment>
      <PageMetadata pageName="actionsPage" />

      <Wrapper>
        {user && (!isMobile && !isTablet) && (
          <TabsSecondary
            list={tabsList}
            isOpen={visibleTabs}
            listType={listType}
            toggleVisible={visible => setVisibleTabs(visible)}
            button={{
              text: formatMessage({ id: 'app.headerActions.addAction' }),
              onClick: () => {
                history.push('/account/actions/create')
              },
            }}
          />
        )}
        {user && (isTablet || isMobile) && (
          <TabsSelect
            defaultSelectVal={defaultSelectVal}
            isMobile={isMobile}
            data={tabsList}
            history={history}
            formatMessage={formatMessage}
            isActionsPage={true}
          />
        )}

        <BlockContainer>
          <InnerContainer>
            <Row span={8} xl={8} lg={12} md={12} xs={24}>
              <Col>
                {match.params.subset === ACTIONS_SUBSETS.DISCOVER && (
                  <SearchBlockWrapper>
                    {!isTablet && !isMobile && (
                      <SearchWrap>
                        <Select
                          allowClear={true}
                          mode="default"
                          style={{ width: '100%' }}
                          onChange={handleCategoryChange}
                          menuItemSelectedIcon={<Icon />}
                          value={selectedItems(selectedCategories, 'Category')}
                        >
                          {categories.map(category => {
                            return (
                              <Option key={category.id}>
                                <Checkbox
                                  checked={selectedCategories.includes(
                                    category.name,
                                  )}
                                  style={{ marginRight: '10px' }}
                                />
                                {category.name}
                              </Option>
                            )
                          })}
                        </Select>
                        <Select
                          allowClear={true}
                          value={selectedItems(
                            selectedType,
                            formatMessage({
                              id: 'app.actions.type',
                            }),
                          )}
                          mode="default"
                          style={{ width: '100%' }}
                          onChange={handleTypeChange}
                          menuItemSelectedIcon={<Icon />}
                        >
                          {types.map(type => {
                            return (
                              <Option key={type.name}>
                                <Checkbox
                                  checked={selectedType.includes(type.name)}
                                  style={{ marginRight: '10px' }}
                                />
                                {formatMessage({
                                  id: `app.actions.type.${type.id}`,
                                })}
                              </Option>
                            )
                          })}
                        </Select>
                        <Select
                          allowClear={true}
                          value={selectedItems(
                            selectedBehaviour,
                            formatMessage({
                              id: 'app.actions.behaviour',
                            }),
                          )}
                          mode="default"
                          style={{ width: '100%' }}
                          onChange={handleBehaviourChange}
                          menuItemSelectedIcon={<Icon />}
                        >
                          {behaviour.map(behaviour => {
                            return (
                              <Option key={behaviour.name}>
                                <Checkbox
                                  checked={selectedBehaviour.includes(
                                    behaviour.name,
                                  )}
                                  style={{ marginRight: '10px' }}
                                />
                                {formatMessage({
                                  id: `app.actions.behaviour.${behaviour.id}`,
                                })}
                              </Option>
                            )
                          })}
                        </Select>
                        <SearchFieldWrap ref={$search}>
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
                              value.length > 0 && searchActions({ name: value })
                            }
                            onChange={handleSearchFieldChange}
                            onDropdownVisibleChange={
                              handleDropdownVisibleChange
                            }
                            getPopupContainer={() => $search.current}
                          >
                            {searchData.searchedActions.map(action => (
                              <Select.Option
                                key={action.picture}
                                onClick={handleOpenActionCard(action)}
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
                    )}
                    {(isTablet || isMobile) && (
                      <SearchWrap>
                        <MobileFilterWrap>
                          <MobileFilter
                            onClick={() => setIsCategoryFilterOpen(true)}
                            style={{
                              minWidth: '129px',
                              height: '46px',
                            }}
                          >
                            <span>
                              {selectedItems(
                                filtersLables.categories,
                                'Category',
                              )}
                            </span>
                            <ActionFilterModal
                              isFilterModalOpen={isCategoryFilterOpen}
                              setIsCategoryFilterOpen={val => {
                                setIsCategoryFilterOpen(val)
                              }}
                              isMobile={isMobile}
                              title="Category"
                              selectedFilters={selectedCategories}
                              filtersData={categories}
                              handleOnAfterFiltersChange={
                                handleOnAfterFiltersChange
                              }
                            />
                          </MobileFilter>
                          <MobileFilter
                            onClick={() => setIsTypeFilterOpen(true)}
                            style={{
                              minWidth: '106px',
                              height: '46px',
                            }}
                          >
                            {selectedItems(filtersLables.type, 'Type')}
                            <ActionFilterModal
                              isFilterModalOpen={isTypeFilterOpen}
                              setIsTypeFilterOpen={setIsTypeFilterOpen}
                              isMobile={isMobile}
                              title="Type"
                              selectedFilters={selectedType}
                              filtersData={types}
                              handleOnAfterFiltersChange={
                                handleOnAfterFiltersChange
                              }
                            />
                          </MobileFilter>
                          <MobileFilter
                            onClick={() => setIsBehaviourFilterOpen(true)}
                            style={{
                              minWidth: '135px',
                              height: '46px',
                            }}
                          >
                            {selectedItems(
                              filtersLables.behaviour,
                              'Behaviour',
                            )}
                            <ActionFilterModal
                              isFilterModalOpen={isBehaviourFilterOpen}
                              setIsBehaviourFilterOpen={
                                setIsBehaviourFilterOpen
                              }
                              isMobile={isMobile}
                              title="Behaviour"
                              selectedFilters={selectedBehaviour}
                              filtersData={behaviour}
                              handleOnAfterFiltersChange={
                                handleOnAfterFiltersChange
                              }
                            />
                          </MobileFilter>
                        </MobileFilterWrap>
                        <SearchFieldWrap ref={$search}>
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
                              value.length > 0 && searchActions({ name: value })
                            }
                            onChange={handleSearchFieldChange}
                            onDropdownVisibleChange={
                              handleDropdownVisibleChange
                            }
                            getPopupContainer={() => $search.current}
                          >
                            {searchData.searchedActions.map(action => (
                              <Select.Option
                                key={action.picture}
                                onClick={handleOpenActionCard(action)}
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
                    )}
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
                <InfiniteScroll
                  dataLength={actions.length}
                  next={() => {
                    setCurrPage(currPage + 1)
                  }}
                  hasMore={actions.length < total}
                  loader={
                    <FooterSpinner>
                      <Spinner />
                    </FooterSpinner>
                  }
                >
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
                          onDelete={onActionDelete(action._id)}
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
                              <ActionCardLabelSet
                                impacts={action.impacts}
                                impactsInUnits={action.impactsInUnits}
                                showPhysicalValues={
                                  UIContextData.showPhysicalValues
                                }
                              />
                            )
                          }}
                          suggestedBy={action.suggestedBy}
                          suggestedAt={
                            action.suggestedAt &&
                            formatRelative(action.suggestedAt)
                          }
                          isHabit={action.isHabit}
                          impactsInUnits={action.impactsInUnits}
                          isWild={action.isWild}
                        />
                      </ScrollAnimation>
                    </Col>
                  ))}
                </InfiniteScroll>

                {actions.length === 0 && (
                  <NotFoundWrap>
                    <FormattedMessage id="app.actionsPage.actionsNotFound" />
                  </NotFoundWrap>
                )}
              </Row>
            )}
          </InnerContainer>
        </BlockContainer>
      </Wrapper>
    </React.Fragment>
  )
}

export default compose(
  connect(state => ({
    user: state.user.data,
  })),
  injectIntl,
)(ActionsPage)
