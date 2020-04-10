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

class ChallengesListHeader extends React.PureComponent {
  static displayName = 'GroupsListHeader'

  static propTypes = {
    intl: intlShape.isRequired,
    groups: PropTypes.object,
    match: PropTypes.object,
    setGroupsList: PropTypes.func,
  }

  state = {
    visibleTabs: false,
    tabsType:
      window.screen.availWidth <= sizes.tablet
        ? TABS_TYPES.select
        : TABS_TYPES.default,
  }
  componentDidMount() {
    window.addEventListener('orientationchange', this.changeTabsType)
  }

  componentWillUnmount() {
    window.removeEventListener('orientationchange', this.changeTabsType)
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

  render() {
    const { visibleTabs, tabsType } = this.state
    const { intl } = this.props
    return (
      <React.Fragment>
        <TabsSecondary
          list={[
            {
              to: `/challenges`,
              icon: DiscoverIcon,
              text: intl.formatMessage({
                id: 'app.actionsPage.tabs.discover',
              }),
              active: true,
            },
          ]}
          isOpen={visibleTabs}
          listType={tabsType}
          toggleVisible={visible => {
            this.setState({ visibleTabs: visible })
          }}
        />
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
