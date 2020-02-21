import React, { Fragment } from 'react'
import qs from 'qs'
import _ from 'lodash'
import Spinner from 'components/Spinner'
import { connect } from 'react-redux'
import { injectIntl, FormattedMessage } from 'react-intl'
import { compose } from 'redux'
import SuggestedIconComponent from 'assets/icons/SuggestedIcon'
import FlagIconComponent from 'assets/icons/FlagIcon'
import ActionsIconComponent from 'assets/icons/HandIcon'
import StatisticsIconComponent from 'assets/icons/StatisticsIcon'
import TabsSecondary from 'components/TabsSecondary'
import { Link } from 'react-router-dom'
import { Menu, Row } from 'antd'
import MemberCard from 'components/MemberCard'

import useCampaign from './useCampaign'
import Header from './header'
import { Content, MenuStyled, Column } from './styled'
import { getUserInitialAvatar } from '../../api'

function renderParticipants(props) {
  const { loading, participants, intl } = props
  const selectedKey = _.get(props, 'location.search', '').includes('finished')
    ? 'finished'
    : 'participants'

  return (
    <Fragment>
      <MenuStyled
        mode="horizontal"
        inlineIndent={0}
        selectedKeys={[selectedKey]}
      >
        <Menu.Item key="participants">
          <Link to="?view=participants">
            <FormattedMessage id="app.campaignPage.participants" />
          </Link>
        </Menu.Item>
        <Menu.Item key="finished">
          <Link to="?view=participants&tab=finished">
            <FormattedMessage id="app.campaignPage.finished" />
          </Link>
        </Menu.Item>
      </MenuStyled>

      {loading ? (
        <Spinner />
      ) : (
        <Row style={{ flexGrow: '1' }}>
          {participants.map(item => (
            <Column key={item.user._id} xl={8} lg={12} md={12} xs={24}>
              <MemberCard
                to={`/account/${item.user._id}`}
                fullName={item.user.fullName}
                photo={
                  item.user.photo || getUserInitialAvatar(item.user.fullName)
                }
                counter={intl.formatMessage(
                  { id: 'app.pages.groups.actionsTaken' },
                  { count: item.userInfo.takenActionsCount },
                )}
                impacts={{ handprint: item.userInfo.impacts }}
              />
            </Column>
          ))}
        </Row>
      )}
    </Fragment>
  )
}

function renderContent(view, props) {
  switch (view) {
    case 'participants':
      return renderParticipants(props)

    default:
      return null
  }
}
function CampaignDashboard(props) {
  const {
    location,
    intl: { formatMessage },
    match,
  } = props
  const query = qs.parse(location.search, { ignoreQueryPrefix: true })
  const campaignId = match.params.campaignId
  const view = query.view || 'actions'
  if (!campaignId) return null
  const [campaign, loading, participants] = useCampaign(campaignId)
  const sortedParticipants = participants.sort((a, b) =>
    a.user._id === props.user._id ? -1 : 1,
  )
  const me = sortedParticipants && sortedParticipants[0]
  const accomplishedUserActions = me ? me.accomplishedActions : []
  if (loading || !campaign) return <Spinner />
  return (
    <Fragment>
      <Header
        participantsCount={participants.length}
        campaign={campaign}
        accomplishedUserActions={accomplishedUserActions}
      />
      <TabsSecondary
        list={[
          {
            to: `?view=actions`,
            icon: ActionsIconComponent,
            text: formatMessage({ id: 'app.header.menu.actions' }),
            active: view === 'actions',
          },
          {
            to: `?view=statistics`,
            icon: StatisticsIconComponent,
            text: formatMessage({ id: 'app.pages.groups.statistics' }),
            active: view === 'statistics',
          },
          {
            to: `?view=participants`,
            icon: SuggestedIconComponent,
            text: formatMessage({ id: 'app.campaignPage.participants' }),
            active: view === 'participants',
          },
          {
            to: `?view=activity`,
            icon: FlagIconComponent,
            text: formatMessage({ id: 'app.pages.groups.activity' }),
            active: view === 'activity',
          },
        ]}
        justify={'center'}
      />
      <Content>
        {renderContent(view, { ...props, campaign, loading, participants })}
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

renderParticipants.propTypes = {
  loading: Boolean,
  participants: Array,
  intl: Object,
}

const mapStateToProps = state => ({
  user: state.user.data,
})

export default compose(
  injectIntl,
  connect(mapStateToProps),
)(CampaignDashboard)
