import React, { useState } from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import { compose } from 'redux'
import colors from 'config/colors'

import { getUserInitialAvatar } from 'api'

import styled from 'styled-components'

import { Checkbox } from 'antd'

import {
  HeaderCamapingDescription,
  DashboardHeaderUserName,
  Banner,
  BreadcrumbStyled,
  BreadcrumbItem,
  HeaderCompetitionButton,
  HeaderCompetitionButtonContainer,
} from './styled'
import {
  DashboardHeaderWhiteLine,
  DashboardHeaderUserPictureWrap,
  DashboardHeaderUserPicture,
  DashboardHeaderUserSince,
  AchievementModal,
  AchievementTitle,
  AchievementFooterButton,
  AchievementFooter,
  ModalContent,
} from '../DashboardPage/header'
import { sendInvitations } from '../../api/competitions'

const Header = props => {
  const { competition, participantsCount, ownGroupsList, isMember } = props
  const { name, description } = competition
  const [inviteModalVisible, setInviteModalVisible] = useState(false)
  const [groupsToInvite, setGroupsToInvite] = useState([])
  const membersCount = props.intl.formatMessage(
    { id: 'app.pages.groups.membersCount' },
    { count: participantsCount },
  )

  function onGroupSelected(e, group) {
    const checked = e.target.checked
    if (checked) {
      setGroupsToInvite(groupsToInvite => groupsToInvite.concat(group))
    } else {
      setGroupsToInvite(groupsToInvite =>
        groupsToInvite.filter(i => i._id !== group._id),
      )
    }
  }
  return (
    <DashboardHeaderWhiteLine organization>
      <BreadcrumbStyled separator=">">
        <BreadcrumbItem
          style={{ color: colors.green }}
          href="/challenges/campaigns"
        >
          <FormattedMessage id="app.pages.challenges" />
        </BreadcrumbItem>
        <BreadcrumbItem
          style={{ color: colors.green }}
          href="/challenges/competitions"
        >
          <FormattedMessage id="app.actionsPage.tabs.competitions" />
        </BreadcrumbItem>
        <BreadcrumbItem>{name}</BreadcrumbItem>
      </BreadcrumbStyled>
      <Banner src={competition.banner.src} />
      <DashboardHeaderUserPictureWrap>
        <DashboardHeaderUserPicture src={competition.logo.src} />
      </DashboardHeaderUserPictureWrap>
      <DashboardHeaderUserName>{name}</DashboardHeaderUserName>
      <DashboardHeaderUserSince>{membersCount}</DashboardHeaderUserSince>
      <HeaderCamapingDescription>{description}</HeaderCamapingDescription>
      <HeaderCompetitionButtonContainer>
        {isMember && (
          <HeaderCompetitionButton>
            <FormattedMessage id="app.pages.groups.youAreMember" />
          </HeaderCompetitionButton>
        )}
        {!isMember && ownGroupsList.length && (
          <HeaderCompetitionButton onClick={() => setInviteModalVisible(true)}>
            <FormattedMessage id="app.competitions.invite.group" />
          </HeaderCompetitionButton>
        )}
      </HeaderCompetitionButtonContainer>
      <AchievementModal
        width={592}
        visible={inviteModalVisible}
        closable
        onCancel={() => setInviteModalVisible(false)}
        centered
        destroyOnClose
        title={<AchievementTitle>{competition.name}</AchievementTitle>}
        footer={[
          <AchievementFooter key="submit">
            <AchievementFooterButton
              type="primary"
              disabled={!groupsToInvite.length}
              onClick={() => {
                setInviteModalVisible(false)
                sendInvitations({ groupsToInvite }, competition._id)
              }}
            >
              <FormattedMessage id="app.increaseHandprintPage.form.sendInvites" />
            </AchievementFooterButton>
          </AchievementFooter>,
        ]}
      >
        <ModalContent>
          {ownGroupsList.map(group =>
            renderGroup(
              group,
              e => onGroupSelected(e, group),
              groupsToInvite.find(i => i._id === group._id),
            ),
          )}
        </ModalContent>
      </AchievementModal>
    </DashboardHeaderWhiteLine>
  )
}

function renderGroup(group, onCheckboxChange, checked) {
  const Group = styled.div`
    width: 100%;
    height: 60px;
    padding: 15px;
    cursor: pointer;
    display: flex;
    align-items: center;
  `

  const GroupImage = styled.img`
    width: 44px;
    height: 44px;
    border-radius: 4px;
    object-fit: cover;
  `

  const GroupText = styled.span`
    font-family: Noto Sans;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 20px;
    color: ${colors.dark};
    margin-left: 13px;
    width: 100%;
  `

  return (
    <Group>
      <GroupImage src={group.picture || getUserInitialAvatar(group.name)} />
      <GroupText>{group.name}</GroupText>
      <Checkbox checked={checked} onChange={onCheckboxChange} />
    </Group>
  )
}

Header.propTypes = {
  competition: Object,
  participantsCount: Number,
  intl: Object,
  accomplishedUserActions: Array,
  ownGroupsList: Array,
}

export default compose(injectIntl)(Header)
