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

import useCompetition from './useCompetition'
import useOwnGroupsList from './useOwnGroupsList'
import useInvitationsList from './useInvitationsList'
import useAllInvitationsList from './useAllInvitationsList'
import Header from './header'
import { Content } from './styled'
import renderParticipants from './participants'
import renderActions from './actions'
import renderActivity from './activity'
import renderStatistics from './statistics'
import renderGroups from './groups'
import { COMPETITION_TABS } from './constants'
import Tabs from './tabs'
import { INVITATION_STATUSES } from '../IncreaseHandprintPage'
import { UIContextSettings } from '../../context/uiSettingsContext'
import { TabsSelect } from '../CampaignDashboard/styled'

const { Option } = Select

function renderContent(view, props) {
  switch (view) {
    case COMPETITION_TABS.actions:
      return renderActions(props)
    case COMPETITION_TABS.participants:
      return renderParticipants(props)
    case COMPETITION_TABS.statistics:
      return renderStatistics(props)
    case COMPETITION_TABS.activity:
      return renderActivity(props)
    case COMPETITION_TABS.groups:
      return renderGroups(props)
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
  const competitionId = match.params.competitionId
  const view = query.view || COMPETITION_TABS.actions
  if (!competitionId) return null
  const [competition, loading, participants] = useCompetition(competitionId)
  const [ownGroupsList] = useOwnGroupsList() // groups where user is admin
  const [invitations] = useInvitationsList(competitionId)
  const [allInvitations] = useAllInvitationsList(competitionId)

  const sortedParticipants = participants.sort((a, b) =>
    a.user._id === props.user._id ? -1 : 1,
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

  if (loading || !competition) return <Spinner />

  const tabList = [
    {
      to: `?view=${COMPETITION_TABS.actions}`,
      icon: ActionsIconComponent,
      text: formatMessage({ id: 'app.header.menu.actions' }),
      active: view === COMPETITION_TABS.actions,
    },
    {
      to: `?view=${COMPETITION_TABS.statistics}`,
      icon: StatisticsIconComponent,
      text: formatMessage({ id: 'app.pages.groups.statistics' }),
      active: view === COMPETITION_TABS.statistics,
    },
    {
      to: `?view=${COMPETITION_TABS.participants}`,
      icon: SuggestedIconComponent,
      text: formatMessage({ id: 'app.campaignPage.participants' }),
      active: view === COMPETITION_TABS.participants,
    },
    {
      to: `?view=${COMPETITION_TABS.activity}`,
      icon: FlagIconComponent,
      text: formatMessage({ id: 'app.pages.groups.activity' }),
      active: view === COMPETITION_TABS.activity,
    },
  ]

  const defaultSelectVal = (
    <div>
      <Icon component={ActionsIconComponent} style={{ marginRight: '10px' }} />
      {formatMessage({ id: 'app.header.menu.actions' })}
    </div>
  )

  const dropdownStyle = {
    background: `${colors.dark}`,
    marginTop: '-3px',
    paddingLeft: isMobile ? '10px' : '36px',
  }

  return (
    <Fragment>
      <Header
        participantsCount={participants.length}
        competition={competition}
        accomplishedUserActions={accomplishedUserActions}
        ownGroupsList={ownGroupsList}
        isMember={
          !!invitations.find(i => i.status === INVITATION_STATUSES.ACCEPTED)
        }
      />
      {!isTablet && !isMobile && <Tabs list={tabList} />}
      {(isTablet || isMobile) && (
        <TabsSelect>
          <Select
            mode="default"
            defaultValue={defaultSelectVal}
            dropdownMenuStyle={dropdownStyle}
            defaultOpen
          >
            <Option
              key={1}
              style={{
                background: `${colors.dark}`,
              }}
            >
              <Link
                to={`?view=${COMPETITION_TABS.actions}`}
                style={{ color: `${colors.white}` }}
              >
                <Icon
                  component={ActionsIconComponent}
                  style={{ marginRight: '10px' }}
                />
                {formatMessage({ id: 'app.header.menu.actions' })}
              </Link>
            </Option>
            <Option
              key={2}
              style={{
                background: `${colors.dark}`,
              }}
            >
              <Link
                to={`?view=${COMPETITION_TABS.statistics}`}
                style={{ color: `${colors.white}` }}
              >
                <Icon
                  component={StatisticsIconComponent}
                  style={{ marginRight: '10px' }}
                />
                {formatMessage({ id: 'app.pages.groups.statistics' })}
              </Link>
            </Option>
            <Option
              key={3}
              style={{
                background: `${colors.dark}`,
              }}
            >
              <Link
                to={`?view=${COMPETITION_TABS.participants}`}
                style={{ color: `${colors.white}` }}
              >
                <Icon
                  component={SuggestedIconComponent}
                  style={{ marginRight: '10px' }}
                />
                {formatMessage({ id: 'app.campaignPage.participants' })}
              </Link>
            </Option>
            <Option
              key={4}
              style={{
                background: `${colors.dark}`,
              }}
            >
              <Link
                to={`?view=${COMPETITION_TABS.activity}`}
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
          competition,
          loading,
          participants,
          invitations,
          allInvitations,
          ownGroupsList,
          toggleUnits,
          showPhysicalValues: UIContextData.showPhysicalValues,
          accomplishedUserActions,
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
