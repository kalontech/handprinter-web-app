import React, { useState, useEffect } from 'react'
import { FormattedMessage, injectIntl } from 'react-intl'
import { compose } from 'redux'
import colors from 'config/colors'

import { getUserInitialAvatar } from 'api'

import styled from 'styled-components'
import media, { sizes } from 'utils/mediaQueryTemplate'
import { Icon } from 'antd'

import { Checkbox } from '../../components/Styled'
import fingerPrintSVG from '../../assets/icons/fingerprint-part.svg'

import {
  HeaderCamapingDescription,
  DashboardHeaderUserName,
  Banner,
  BreadcrumbStyled,
  BreadcrumbItem,
  HeaderCompetitionButton,
  HeaderCompetitionButtonContainer,
  ModalMessage,
  AchievementModal,
  AchievementTitle,
  AchivmentLogo,
  AchivmentBanner,
  AchivmentMobileBanner,
  AchievementFooterButton,
  ModalContent,
  AchievementFooter,
  SkipFooterButton,
  BreadcrumbStyledMobile,
} from './styled'
import {
  DashboardHeaderWhiteLine,
  DashboardHeaderUserPictureWrap,
  DashboardHeaderUserPicture,
  DashboardHeaderUserSince,
  FingerLogo,
} from '../DashboardPage/header'
import { sendInvitations } from '../../api/competitions'

const StyledArrowIcon = styled(Icon)`
  svg {
    width: 15px;
    height: 15px;
    color: ${colors.gray};
    margin-right: 15px;
  }
`

const Header = props => {
  const [width, setWidth] = useState(window.innerWidth)
  const { competition, participantsCount, ownGroupsList, isMember } = props
  const { name, description } = competition
  const [inviteModalVisible, setInviteModalVisible] = useState(false)
  const [groupsToInvite, setGroupsToInvite] = useState([])
  const membersCount = props.intl.formatMessage(
    { id: 'app.pages.groups.membersCount' },
    { count: participantsCount },
  )

  const isTablet = width < sizes.largeDesktop
  const isMobile = width < sizes.tablet

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

  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange)
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange)
    }
  }, [])

  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth)
  }

  return (
    <DashboardHeaderWhiteLine organization>
      {isTablet && (
        <BreadcrumbStyledMobile separator=">">
          <StyledArrowIcon type="left" />
          <BreadcrumbItem href="/challenges" style={{ color: colors.darkGray }}>
            <FormattedMessage id="app.pages.challenges" />
          </BreadcrumbItem>
        </BreadcrumbStyledMobile>
      )}
      {!isMobile && !isTablet && (
        <BreadcrumbStyled separator=">">
          <BreadcrumbItem style={{ color: colors.green }} href="/challenges">
            <FormattedMessage id="app.pages.challenges" />
          </BreadcrumbItem>
          <BreadcrumbItem>{name}</BreadcrumbItem>
        </BreadcrumbStyled>
      )}
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
        {!isMember && !!ownGroupsList.length && (
          <HeaderCompetitionButton onClick={() => setInviteModalVisible(true)}>
            <FormattedMessage id="app.competitions.invite.group" />
          </HeaderCompetitionButton>
        )}
      </HeaderCompetitionButtonContainer>
      {(!isTablet || !isMobile) && (
        <AchievementModal
          width={592}
          visible={inviteModalVisible}
          closable
          onCancel={() => setInviteModalVisible(false)}
          centered
          destroyOnClose
          footer={[
            <AchievementFooter key="submit">
              <SkipFooterButton
                type="secondary"
                onClick={() => {
                  setInviteModalVisible(false)
                }}
              >
                <FormattedMessage id="app.pages.groups.skipForNow" />
              </SkipFooterButton>
              <AchievementFooterButton
                type="primary"
                disabled={!groupsToInvite.length}
                onClick={() => {
                  setInviteModalVisible(false)
                  sendInvitations({ groupsToInvite }, competition._id)
                  window.location.reload()
                }}
              >
                <FormattedMessage id="app.increaseHandprintPage.form.sendInvites" />
              </AchievementFooterButton>
            </AchievementFooter>,
          ]}
        >
          <AchivmentBanner>
            <FingerLogo src={fingerPrintSVG} />
          </AchivmentBanner>
          <AchivmentLogo src={competition.logo.src} alt="" />
          <AchievementTitle>{competition.name}</AchievementTitle>
          <ModalMessage>
            <FormattedMessage id="app.increaseHandprintPage.form.selectGroupToInvite" />
          </ModalMessage>
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
      )}
      {isTablet && (
        <AchievementModal
          width={592}
          visible={inviteModalVisible}
          closable
          onCancel={() => setInviteModalVisible(false)}
          centered
          destroyOnClose
          footer={[
            <AchievementFooter key="submit">
              <AchievementFooterButton
                type="primary"
                disabled={!groupsToInvite.length}
                onClick={() => {
                  setInviteModalVisible(false)
                  sendInvitations({ groupsToInvite }, competition._id)
                  window.location.reload()
                }}
              >
                <FormattedMessage id="app.increaseHandprintPage.form.sendInvites" />
              </AchievementFooterButton>
              <SkipFooterButton
                type="secondary"
                onClick={() => {
                  setInviteModalVisible(false)
                }}
                style={{ marginLeft: '0px' }}
              >
                <FormattedMessage id="app.pages.groups.skipForNow" />
              </SkipFooterButton>
            </AchievementFooter>,
          ]}
        >
          <AchivmentMobileBanner>
            <AchievementTitle>{competition.name}</AchievementTitle>
          </AchivmentMobileBanner>

          <ModalMessage>
            <FormattedMessage id="app.increaseHandprintPage.form.selectGroupToInvite" />
          </ModalMessage>
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
      )}
    </DashboardHeaderWhiteLine>
  )
}

function renderGroup(group, onCheckboxChange, checked) {
  const Group = styled.div`
    width: 100%;
    height: 60px;
    margin: 7px 0px 10px 0px;
    box-sizing: border-box;
    padding-right: 40px;
    padding-left: 15px;
    cursor: pointer;
    display: flex;
    align-items: center;

    ${media.phone`
      padding-right: 10px;
    `}
  `

  const GroupImage = styled.img`
    width: 44px;
    height: 44px;
    border-radius: 4px;
    object-fit: cover;
    box-sizing: border-box;
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
  isMember: Boolean,
}

export default compose(injectIntl)(Header)
