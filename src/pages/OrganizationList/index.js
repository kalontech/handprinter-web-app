import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { compose } from 'redux'
import { injectIntl, intlShape } from 'react-intl'
import debounce from 'lodash/debounce'
import Row from 'antd/lib/row'
import Icon from 'antd/lib/icon'
import { ORGANIZATION_SUBSETS } from 'utils/constants'
import { animateScroll } from 'react-scroll/modules'

import colors from 'config/colors'
import { sizes } from 'utils/mediaQueryTemplate'
import fetch from 'utils/fetch'
import { getOrganizationList } from 'api/organization'
import { Input } from 'components/Styled'
import DiscoverIconComponent from 'assets/icons/DiscoverIcon'
import TabsSecondary, { TABS_TYPES } from 'components/TabsSecondary'
import FlagIconComponent from 'assets/icons/FlagIcon'
import qs from 'qs'
import { Creators } from 'redux/organizations'

import { getUserInitialAvatar } from 'api'

import {
  SearchWrap,
  AutoCompleteStyled,
  SearchItem,
  SearchItemImg,
  Container,
  Block,
  Column,
  EmptyList,
  PaginationStyled,
} from './styled'
import OrganizationCard from '../../components/OrganizationCard'

async function getOrganizations(props) {
  const { match, location } = props
  const queries = qs.parse(location.search, { ignoreQueryPrefix: true })

  return getOrganizationList({
    subset: match.params.subset,
    page: queries.page || 1,
    limit: 21,
  })
}

function onFetchSuccess(props) {
  props.setOrganizationList(props.organizations)
}

class OrganizationsPage extends React.Component {
  static propTypes = {
    intl: intlShape.isRequired,
    user: PropTypes.object,
    location: PropTypes.object,
    match: PropTypes.object,
    history: PropTypes.object,
    fetch: PropTypes.func,
    organizations: PropTypes.array,
  }

  state = {
    visibleTabs: false,
    listType:
      window.screen.availWidth <= sizes.tablet
        ? TABS_TYPES.select
        : TABS_TYPES.default,

    searchList: [],
  }

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

  handleSearch = debounce(async value => {
    if (!value) return

    const { organizations } = await getOrganizationList({
      subset: ORGANIZATION_SUBSETS.DISCOVER,
      search: value,
    })

    this.setState({
      searchList: (organizations.docs || []).slice(0, 5),
    })
  }, 600)

  renderHeader() {
    const {
      intl: { formatMessage },
      user,
      match,
      history,
    } = this.props
    const { visibleTabs, listType } = this.state
    if (!user) return null
    return (
      <TabsSecondary
        list={[
          {
            to: `/organizations/${ORGANIZATION_SUBSETS.DISCOVER}`,
            icon: DiscoverIconComponent,
            text: formatMessage({ id: 'app.actionsPage.tabs.discover' }),
            active: match.params.subset === ORGANIZATION_SUBSETS.DISCOVER,
          },
          {
            to: `/organizations/${ORGANIZATION_SUBSETS.MY}`,
            icon: FlagIconComponent,
            text: formatMessage({
              id: 'app.actionsPage.tabs.myOrganizations',
            }),
            active: match.params.subset === ORGANIZATION_SUBSETS.MY,
          },
        ]}
        isOpen={visibleTabs}
        listType={listType}
        toggleVisible={visible => {
          this.setState({ visibleTabs: visible })
        }}
        button={{
          text: formatMessage({
            id: 'app.headerActions.addOrganization',
          }),
          onClick: () => {
            history.push('/account/create-organization')
          },
        }}
      />
    )
  }

  renderSearch() {
    const { match, history } = this.props
    const { searchList } = this.state
    if (match.params.subset !== ORGANIZATION_SUBSETS.DISCOVER) return null
    return (
      <SearchWrap>
        <AutoCompleteStyled
          onSelect={id => {
            history.push(`/organizations/${id}/dashboard/goal`)
          }}
          onSearch={this.handleSearch}
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
    )
  }

  renderList() {
    const { intl, history, location, organizations } = this.props

    return (
      <React.Fragment>
        <Row gutter={{ md: 20 }} style={{ flexGrow: '1' }}>
          {(organizations.docs || []).map(item => (
            <Column key={item._id} xl={8} lg={12} md={12} xs={24}>
              <OrganizationCard
                to={`/organizations/${item._id}/dashboard/goal`}
                name={item.name}
                picture={item.picture || getUserInitialAvatar(item.name)}
              />
            </Column>
          ))}

          {(!organizations.docs || organizations.docs.length === 0) && (
            <EmptyList>
              {intl.formatMessage({
                id: 'app.actionsPage.tabs.organization.empty',
              })}
            </EmptyList>
          )}
        </Row>
        {organizations.totalPages > 1 && (
          <PaginationStyled
            current={organizations.page}
            pageSize={organizations.limit}
            total={organizations.totalDocs}
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
      </React.Fragment>
    )
  }

  render() {
    return (
      <Block>
        {this.renderHeader()}
        <Container>
          {this.renderSearch()}
          {this.renderList()}
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
      organizations: state.organizations.list,
    }),
    {
      setOrganizationList: Creators.setOrganizationList,
    },
  ),
  fetch(getOrganizations, {
    loader: false,
    inject: false,
    onSuccess: onFetchSuccess,
  }),
)(OrganizationsPage)
