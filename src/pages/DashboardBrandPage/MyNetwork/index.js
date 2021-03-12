import React, { useState } from 'react'
import { FormattedMessage } from 'react-intl'

import { Modal } from 'components/Styled'

import { Container, Name, Text, SeeNetwork } from './styled'
import {
  DashboardHeaderUserInfoValue,
  DashboardHeaderUserSince,
  HeaderUserInfoRowCol,
} from '../../DashboardPage/header'
import { NetworkWidgetComponent } from '../../DashboardPage'

export default function MyNetwork(props) {
  const { user, isReturnUser, stats, network } = props
  const [modalVisible, setModalVisible] = useState(false)

  if (!user) return null
  return (
    <Container>
      <Name>
        <FormattedMessage id="app.dashboardPage.myNetwork" />
      </Name>
      <Text>
        <FormattedMessage id="peopleInYourNetwork" />
      </Text>
      {isReturnUser && (
        <div style={{ display: 'flex' }}>
          <HeaderUserInfoRowCol>
            <DashboardHeaderUserInfoValue>
              {stats?.network?.networkUsers}
            </DashboardHeaderUserInfoValue>
            <DashboardHeaderUserSince>
              <FormattedMessage id="totalMembers" />
            </DashboardHeaderUserSince>
          </HeaderUserInfoRowCol>
          <HeaderUserInfoRowCol>
            <DashboardHeaderUserInfoValue>
              {stats?.personal?.usersInvited}
            </DashboardHeaderUserInfoValue>
            <DashboardHeaderUserSince>
              <FormattedMessage id="usersInvited" />
            </DashboardHeaderUserSince>
          </HeaderUserInfoRowCol>
        </div>
      )}
      <SeeNetwork onClick={() => setModalVisible(true)}>
        <FormattedMessage id="seeMyNetwork" />
      </SeeNetwork>
      <Modal
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        centered
        destroyOnClose
        footer={null}
        width="80%"
      >
        <NetworkWidgetComponent stats={stats} network={network} />
      </Modal>
    </Container>
  )
}

MyNetwork.propTypes = {
  user: Object,
  isReturnUser: Boolean,
  stats: Object,
  network: Object,
}
