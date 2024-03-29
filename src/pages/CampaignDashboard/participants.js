import React, { Fragment } from 'react'
import _ from 'lodash'
import Spinner from 'components/Spinner'
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router-dom'
import { Menu, Row } from 'antd'
import MemberCard from 'components/MemberCard'

import { MenuStyled, Column, EmptyList } from './styled'
import { getUserInitialAvatar } from '../../api'

export default function renderParticipants(props) {
  const {
    participants,
    intl,
    campaign,
    showPhysicalValues,
    participantsLoading,
  } = props
  const selectedKey = _.get(props, 'location.search', '').includes('finished')
    ? 'finished'
    : 'participants'
  const actionsNumberToComplete =
    campaign.actionsNumberToComplete || campaign.actions.length
  const participantsFiltered =
    selectedKey === 'finished'
      ? participants.filter(
          i => i.accomplishedActions.length >= actionsNumberToComplete,
        )
      : participants
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

      {participantsLoading ? (
        <Spinner />
      ) : (
        <Row style={{ flexGrow: '1' }}>
          {participantsFiltered.map(item => (
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
                achievements={item.user.achievements}
                showPhysicalValues={showPhysicalValues}
                impactsInUnits={_.get(item, 'user.impactsInUnits', {})}
                hasTakenActions={item.userInfo.takenActionsCount > 0}
              />
            </Column>
          ))}
          {participantsFiltered.length === 0 && (
            <EmptyList>
              {intl.formatMessage({
                id: 'app.pages.groups.emptyParticipantsList',
              })}
            </EmptyList>
          )}
        </Row>
      )}
    </Fragment>
  )
}

renderParticipants.propTypes = {
  participantsLoading: Boolean,
  participants: Array,
  intl: Object,
  campaign: Object,
  user: Object,
  toggleUnits: Function,
  showPhysicalValues: Boolean,
}
