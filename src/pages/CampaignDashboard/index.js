import React, { Fragment, useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import qs from 'qs'
import Spinner from 'components/Spinner'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import { compose } from 'redux'
import SuggestedIconComponent from 'assets/icons/SuggestedIcon'
import FlagIconComponent from 'assets/icons/FlagIcon'
import ActionsIconComponent from 'assets/icons/HandIcon'
import StatisticsIconComponent from 'assets/icons/StatisticsIcon'
import { Select, Icon } from 'antd'
import { sizes } from 'utils/mediaQueryTemplate'
import colors from 'config/colors'

import useCampaign from './useCampaign'
import Header from './header'
import { Content, TabsSelect } from './styled'
import renderParticipants from './participants'
import renderActions from './actions'
import renderActivity from './activity'
import renderStatistics from './statistics'
import { CAPMAIGN_TABS } from './constants'
import Tabs from './tabs'
import { UIContextSettings } from '../../context/uiSettingsContext'

const { Option } = Select

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
  const [campaign, loading, participants] = useCampaign(campaignId)
  const sortedParticipants = participants.filter(
    p => p.user._id === props.user._id,
  )
  const me = sortedParticipants && sortedParticipants[0]
  const accomplishedUserActions = me ? me.accomplishedActions : []

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

  const dropdownStyle = {
    background: `${colors.dark}`,
    marginTop: '-3px',
    paddingLeft: isMobile ? '8px' : '18px',
  }

  return (
    <Fragment>
      <Header
        participantsCount={participants.length}
        campaign={campaign}
        accomplishedUserActions={accomplishedUserActions}
      />
      {!isTablet && !isMobile && <Tabs list={tabList} />}
      {(isTablet || isMobile) && (
        <TabsSelect>
          <Select
            mode="default"
            defaultValue={defaultSelectVal}
            dropdownMenuStyle={dropdownStyle}
          >
            <Option key={1} style={{ background: `${colors.dark}` }}>
              <Link
                to={`?view=${CAPMAIGN_TABS.actions}`}
                style={{ color: `${colors.white}` }}
              >
                <Icon
                  component={ActionsIconComponent}
                  style={{ marginRight: '10px' }}
                />
                {formatMessage({ id: 'app.header.menu.actions' })}
              </Link>
            </Option>
            <Option key={2} style={{ background: `${colors.dark}` }}>
              <Link
                to={`?view=${CAPMAIGN_TABS.statistics}`}
                style={{ color: `${colors.white}` }}
              >
                <Icon
                  component={StatisticsIconComponent}
                  style={{ marginRight: '10px' }}
                />
                {formatMessage({ id: 'app.pages.groups.statistics' })}
              </Link>
            </Option>
            <Option key={3} style={{ background: `${colors.dark}` }}>
              <Link
                to={`?view=${CAPMAIGN_TABS.participants}`}
                style={{ color: `${colors.white}` }}
              >
                <Icon
                  component={SuggestedIconComponent}
                  style={{ marginRight: '10px' }}
                />
                {formatMessage({ id: 'app.campaignPage.participants' })}
              </Link>
            </Option>
            <Option key={4} style={{ background: `${colors.dark}` }}>
              <Link
                to={`?view=${CAPMAIGN_TABS.activity}`}
                style={{ color: `${colors.white}` }}
              >
                <Icon
                  component={FlagIconComponent}
                  style={{ marginRight: '10px' }}
                />
                {formatMessage({ id: 'app.pages.groups.activity' })}
              </Link>
            </Option>
          </Select>
        </TabsSelect>
      )}
      <Content>
        {renderContent(view, {
          ...props,
          campaign,
          loading,
          participants,
          toggleUnits,
          showPhysicalValues: UIContextData.showPhysicalValues,
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
