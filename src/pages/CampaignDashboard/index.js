import React, { Fragment, useContext, useState, useEffect } from 'react'
import qs from 'qs'
import Spinner from 'components/Spinner'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import { compose } from 'redux'
import SuggestedIconComponent from 'assets/icons/SuggestedIcon'
import FlagIconComponent from 'assets/icons/FlagIcon'
import ActionsIconComponent from 'assets/icons/HandIcon'
import StatisticsIconComponent from 'assets/icons/StatisticsIcon'
import { Icon } from 'antd'
import { sizes } from 'utils/mediaQueryTemplate'

import TabsSelect from '../../components/TabsSelect'

import useCampaign from './useCampaign'
import Header from './header'
import { Content } from './styled'

import renderParticipants from './participants'
import renderActions from './actions'
import renderActivity from './activity'
import renderStatistics from './statistics'
import { CAPMAIGN_TABS } from './constants'
import Tabs from './tabs'
import { UIContextSettings } from '../../context/uiSettingsContext'
import useCampaignParticipants from './useCampaignParticipants'

function renderContent(view, props) {
  switch (view) {
    case CAPMAIGN_TABS.actions:
      return renderActions(props)
    case CAPMAIGN_TABS.participants:
      return renderParticipants(props)
    case CAPMAIGN_TABS.statistics:
      return renderStatistics(props)
    case CAPMAIGN_TABS.activity:
      return renderActivity(props)
    default:
      return null
  }
}
function CampaignDashboard(props) {
  const [width, setWidth] = useState(window.innerWidth)
  const UIContextData = useContext(UIContextSettings)
  const {
    location,
    intl: { formatMessage },
    match,
  } = props
  const query = qs.parse(location.search, { ignoreQueryPrefix: true })
  const campaignId = match.params.campaignId
  const view = query.view || CAPMAIGN_TABS.actions
  if (!campaignId) return null
  const [campaign, loading, myProgress] = useCampaign(campaignId)
  const [participants, participantsLoading] = useCampaignParticipants(campaign)
  const accomplishedUserActions = myProgress
    ? myProgress.accomplishedActions
    : []

  const toggleUnits = evt => {
    if (evt.key === 'PhysicalUnits') {
      UIContextData.setShowPhysicalValues(true)
    } else if (evt.key === 'TimeUnits') {
      UIContextData.setShowPhysicalValues(false)
    }
  }

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

  if (loading || !campaign) return <Spinner />

  const tabList = [
    {
      to: `?view=${CAPMAIGN_TABS.actions}`,
      icon: ActionsIconComponent,
      text: formatMessage({ id: 'app.header.menu.actions' }),
      active: view === CAPMAIGN_TABS.actions,
    },
    {
      to: `?view=${CAPMAIGN_TABS.statistics}`,
      icon: StatisticsIconComponent,
      text: formatMessage({ id: 'app.pages.groups.statistics' }),
      active: view === CAPMAIGN_TABS.statistics,
    },
    {
      to: `?view=${CAPMAIGN_TABS.participants}`,
      icon: SuggestedIconComponent,
      text: formatMessage({ id: 'app.campaignPage.participants' }),
      active: view === CAPMAIGN_TABS.participants,
    },
    {
      to: `?view=${CAPMAIGN_TABS.activity}`,
      icon: FlagIconComponent,
      text: formatMessage({ id: 'app.pages.groups.activity' }),
      active: view === CAPMAIGN_TABS.activity,
    },
  ]

  const defaultSelectVal = (
    <div>
      <Icon
        component={ActionsIconComponent}
        style={{ marginRight: '10px', color: 'white' }}
      />
      {formatMessage({ id: 'app.header.menu.actions' })}
    </div>
  )

  return (
    <Fragment>
      <Header
        participantsCount={participants.length}
        campaign={campaign}
        accomplishedUserActions={accomplishedUserActions}
        participantsLoading={participantsLoading}
      />
      {!isTablet && !isMobile && <Tabs list={tabList} />}
      {(isTablet || isMobile) && (
        <TabsSelect
          data={tabList}
          isMobile={isMobile}
          defaultSelectVal={defaultSelectVal}
          search={props.location.search}
        />
      )}
      <Content>
        {renderContent(view, {
          ...props,
          campaign,
          loading,
          participants,
          toggleUnits,
          showPhysicalValues: UIContextData.showPhysicalValues,
          myProgress,
          participantsLoading,
        })}
      </Content>
    </Fragment>
  )
}

CampaignDashboard.propTypes = {
  location: Object,
  match: Object,
  user: Object,
  intl: Object,
}

const mapStateToProps = state => ({
  user: state.user.data,
})

export default compose(
  injectIntl,
  connect(mapStateToProps),
)(CampaignDashboard)
