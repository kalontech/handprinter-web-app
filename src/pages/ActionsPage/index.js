import React, { useState, useEffect, useContext } from 'react'
import { Row, Col, Select, Spin, Icon } from 'antd'
import qs from 'qs'
import styled from 'styled-components'
import { injectIntl, intlShape, FormattedMessage } from 'react-intl'
import debounce from 'lodash/debounce'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { animateScroll } from 'react-scroll/modules'

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
import { ACTIONS_SUBSETS, ACTION_STATES } from 'utils/constants'
import fetch from 'utils/fetch'
import ActionCardLabelSet from 'components/ActionCardLabelSet'
import Tooltip from 'components/Tooltip'
import ScrollAnimation from 'components/ScrollAnimation'
import TabsSecondary, { TABS_TYPES } from 'components/TabsSecondary'

import * as api from 'api/actions'

import { categories, behaviour, types } from './filterData'
import { Checkbox } from '../../components/Styled'
import { UIContextSettings } from '../../context/uiSettingsContext'

const { Option } = Select

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

const NotFoundWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 500px;
  font-size: 24px;
  color: ${colors.darkGray};
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
    timeValues: PropTypes.array,
  }

  ActionsPage.defaultProps = {
    actions: [],
  }

  // use state
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
  const [visibleTabs, setVisibleTabs] = useState(false)
  const [listType, setListType] = useState(
    window.screen.availWidth <= sizes.tablet
      ? TABS_TYPES.select
      : TABS_TYPES.default,
  )
  const [selectedCategories, setSelectedCategories] = useState([])
  const [selectedType, setSelectedType] = useState([])
  const [selectedBehaviour, setSelectedBehaviour] = useState([])

  const $search = React.createRef()

  useEffect(() => {
    props.fetch()
  }, [props.location, props.match])

  useEffect(() => {
    animateScroll.scrollToTop()
    window.addEventListener('orientationchange', changeTabsType)
    return () => {
      window.removeEventListener('orientationchange', changeTabsType)
    }
  }, [])

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
      updateQueries({ ...data, page: 1 })
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

  const {
    intl: { formatMessage, formatRelative, locale },
    user,
    loading,
    actions,
    limit,
    page,
    total,
    match,
    history,
  } = props

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
            toggleVisible={visible => setVisibleTabs(visible)}
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
                      <Select
                        allowClear={true}
                        mode="default"
                        style={{ width: '100%' }}
                        onChange={handleCategoryChange}
                        menuItemSelectedIcon={<Icon />}
                        value={`Category|${selectedCategories.map(
                          i => ` ${i}`,
                        )}`}
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
                        value={`${formatMessage({
                          id: 'app.actions.type',
                        })}|${selectedType.map(i => ` ${i}`)}`}
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
                        value={`${formatMessage({
                          id: 'app.actions.behaviour',
                        })}|${selectedBehaviour.map(i => ` ${i}`)}`}
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
                          onDropdownVisibleChange={handleDropdownVisibleChange}
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
                        onDelete={onActionDelete(action._id)}
                        name={
                          action.translatedName && action.translatedName[locale]
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
                          updateQueries({ page: current })
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
    </React.Fragment>
  )
}

export default compose(
  connect(state => ({
    user: state.user.data,
  })),
  fetch(getActionsList, { loader: false }),
  injectIntl,
)(ActionsPage)
