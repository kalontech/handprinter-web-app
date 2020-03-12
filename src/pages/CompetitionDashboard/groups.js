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
  width: 450px;
  text-align: center;
`

const Description = styled.span`
  margin-bottom: 60px;
  font-family: Noto Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  color: ${colors.darkGray};
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

  const dinedInvitation = intl.formatMessage(
    { id: 'app.competitions.denied' },
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
                window.location.reload()
              }}
            >
              <FormattedMessage id="app.pages.groups.deny" />
            </DefaultButton>

            <PrimaryButton
              style={{ width: 200, margin: 5 }}
              onClick={() => {
                acceptInvitation(invitation.competition)
                window.location.reload()
              }}
              type="primary"
            >
              <FormattedMessage id="app.pages.groups.join" />
            </PrimaryButton>
          </div>
        </Main>
      )}
      {invitation.status === INVITATION_STATUSES.DENIED && (
        <Main>
          <Text>{dinedInvitation}</Text>
          <Description>
            <FormattedMessage id="app.competitions.deniedDescription" />
          </Description>
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
