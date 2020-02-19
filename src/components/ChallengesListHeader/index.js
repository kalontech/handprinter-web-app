import React from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'

import CampaignIconComponent from 'assets/icons/CampaignIcon'
import CompetitionIconComponent from 'assets/icons/CompetitionIcon'
import { Creators } from 'redux/groups'
import { CHALLENGES_SUBSETS } from 'utils/constants'
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
    const { intl, match } = this.props
    return (
      <React.Fragment>
        <TabsSecondary
          list={[
            {
              to: `/challenges/${CHALLENGES_SUBSETS.CAMPAIGNS}`,
              icon: CampaignIconComponent,
              text: intl.formatMessage({
                id: 'app.actionsPage.tabs.campaigns',
              }),
              active: match.params.subset === 'campaigns',
            },
            {
              to: `/challenges/${CHALLENGES_SUBSETS.COMPETITIONS}`,
              icon: CompetitionIconComponent,
              text: intl.formatMessage({
                id: 'app.actionsPage.tabs.competitions',
              }),
              active: match.params.subset === CHALLENGES_SUBSETS.COMPETITIONS,
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
