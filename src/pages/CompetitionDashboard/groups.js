import React, { Fragment } from 'react'
import _ from 'lodash'
import qs from 'qs'
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router-dom'
import { Menu } from 'antd'

import { PrimaryButton, DefaultButton } from 'components/Styled'

import styled from 'styled-components'

import colors from 'config/colors'

import { MenuStyled } from './styled'
import { INVITATION_STATUSES } from '../IncreaseHandprintPage'
import { acceptInvitation, denyInvitation } from '../../api/competitions'

const Main = styled.div`
  width: 100%;
  height: 600px;
  background-color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const Text = styled.span`
  margin-bottom: 60px;
  font-family: Noto Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 28px;
  line-height: 35px;
  color: ${colors.dark};
`

export default function renderGroups(props) {
  const { invitations } = props
  if (!invitations || invitations.length === 0) return null
  const search = _.get(props, 'location.search', '')
  const { tabIndex } = qs.parse(search, { ignoreQueryPrefix: true })
  const invitation = invitations[tabIndex]
  const { competition, intl } = props

  const joinCompetition = intl.formatMessage(
    { id: 'app.competitions.join' },
    {
      group: invitation.group.name,
      competition: competition.name,
    },
  )

  return (
    <Fragment>
      <MenuStyled mode="horizontal" inlineIndent={0} selectedKeys={[search]}>
        {invitations.map((invitation, index) => (
          <Menu.Item key={`?view=groups&tabIndex=${index}`}>
            <Link to={`?view=groups&tabIndex=${index}`}>
              <span>{invitation.group.name}</span>
            </Link>
          </Menu.Item>
        ))}
      </MenuStyled>
      {invitation.status === INVITATION_STATUSES.PENDING && (
        <Main>
          <Text>{joinCompetition}</Text>
          <div>
            <DefaultButton
              style={{ width: 200, margin: 5 }}
              onClick={() => {
                denyInvitation(invitation.competition)
              }}
            >
              <FormattedMessage id="app.pages.groups.deny" />
            </DefaultButton>

            <PrimaryButton
              style={{ width: 200, margin: 5 }}
              onClick={() => {
                acceptInvitation(invitation.competition)
              }}
              type="primary"
            >
              <FormattedMessage id="app.pages.groups.join" />
            </PrimaryButton>
          </div>
        </Main>
      )}
    </Fragment>
  )
}

renderGroups.propTypes = {
  invitations: Array,
  competition: Object,
  intl: Object,
}
