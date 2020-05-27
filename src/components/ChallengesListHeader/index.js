import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'

import DiscoverIcon from 'assets/icons/DiscoverIcon'
import { Creators } from 'redux/groups'
import { sizes } from 'utils/mediaQueryTemplate'
import TabsSecondary, { TABS_TYPES } from 'components/TabsSecondary'
import TabsSelect from 'components/TabsSelect'
import { Icon } from 'antd'

class ChallengesListHeader extends React.PureComponent {
  static displayName = 'GroupsListHeader'

  static propTypes = {
    intl: intlShape.isRequired,
    groups: PropTypes.object,
    match: PropTypes.object,
    setGroupsList: PropTypes.func,
    location: PropTypes.object,
  }

  state = {
    visibleTabs: false,
    tabsType:
      window.screen.availWidth <= sizes.tablet
        ? TABS_TYPES.select
        : TABS_TYPES.default,
    width: window.innerWidth,
  }

  componentDidMount() {
    window.addEventListener('orientationchange', this.changeTabsType)
    window.addEventListener('resize', this.handleWindowSizeChange)
  }

  componentWillUnmount() {
    window.removeEventListener('orientationchange', this.changeTabsType)
    window.removeEventListener('resize', this.handleWindowSizeChange)
  }

  changeTabsType = () => {
    this.setState({
      tabsType:
        window.screen.availWidth <= sizes.tablet
          ? TABS_TYPES.select
          : TABS_TYPES.default,
      visibleTabs: false,
    })
  }

  handleWindowSizeChange = () => {
    this.setState({ width: window.innerWidth })
  }

  render() {
    const { visibleTabs, tabsType, width } = this.state
    const { intl } = this.props

    const isTablet = width < sizes.largeDesktop
    const isMobile = width < sizes.tablet

    const tabList = [
      {
        to: `/challenges`,
        icon: DiscoverIcon,
        text: intl.formatMessage({
          id: 'app.actionsPage.tabs.discover',
        }),
        active: true,
      },
    ]

    const defaultSelectVal = (
      <div>
        <Icon component={DiscoverIcon} style={{ marginRight: '10px' }} />
        {intl.formatMessage({ id: 'app.actionsPage.tabs.discover' })}
      </div>
    )

    return (
      <React.Fragment>
        {!isTablet && !isMobile && (
          <TabsSecondary
            list={tabList}
            isOpen={visibleTabs}
            listType={tabsType}
            toggleVisible={visible => {
              this.setState({ visibleTabs: visible })
            }}
          />
        )}
        {isTablet && (
          <TabsSelect
            data={tabList}
            isMobile={isMobile}
            defaultSelectVal={defaultSelectVal}
            search={this.props.location.search}
          />
        )}
      </React.Fragment>
    )
  }
}

export default compose(
  injectIntl,
  withRouter,
  connect(
    state => ({
      user: state.user.data,
      groups: state.groups.list,
    }),
    { setGroupsList: Creators.setGroupsList },
  ),
)(ChallengesListHeader)
