import React, { Fragment } from 'react'
import styled from 'styled-components'
import { Col, Row, Popover } from 'antd'
import moment from 'moment'
import { FormattedMessage } from 'react-intl'
import _ from 'lodash'
import media from 'utils/mediaQueryTemplate'
import colors from 'config/colors'

import InfoElement, { INFO_ELEMENT_TYPES } from 'components/InfoElement'
import { PrimaryButton, DefaultButton, Modal } from 'components/Styled'

import { InfoElementWrap } from '.'

export const DashboardHeaderWhiteLine = styled(Row)`
  background-color: ${props =>
    props.organization ? colors.lightGray : colors.white};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  ${media.desktop`
    background-color: transparent;
    margin-top: 90px;
    height: auto;
  `}
`

export const DashboardHeaderUserPictureWrap = styled.div`
  position: relative;
  ${media.desktop`
    display: flex;
    justify-content: center;
    width: 200px;
    margin: 0 auto;
  `}
`

const DashboardHeaderUserPictureBackground = styled.div`
  height: 30px;
  width: 260px;
  background: ${colors.white};
  position: absolute;
  ${media.desktop`
    background: ${colors.lightGray};
  `}
`

export const DashboardHeaderUserPicture = styled.img`
  border: 4px solid ${colors.white};
  border-radius: 50%;
  box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.1);
  height: 110px;
  margin-top: -55px;
  width: 110px;
  position: relative;
  object-fit: cover;
`

const DashboardHeaderUserInfoValue = styled.div`
  margin-bottom: 3px;
  color: ${colors.dark};
  font-size: 28px;

  ${media.desktop`
    line-height: 35px;
    padding-top: 0;
    margin-bottom: 0;
  `}
  ${media.phone`
    font-size: 16px;
  `}
`

const DashboardHeaderUserInfoCol = styled(Col)`
  ${media.desktop`
    text-align: center;
    padding: 0 70px;
  `}
  ${media.phone`
    padding: 0;
  `}
`

const DashboardHeaderUserInfoRow = styled.div`
  display: flex;
  justify-content: flex-end;
  ${media.desktop`
    justify-content: center;
    margin: 40px 0 30px 0;
  `}
  ${media.phone`
  display: block;
    margin: 15px 0 18px 0;

  `}
`

export const DashboardHeaderUserName = styled.div`
  color: ${colors.dark};
  font-size: 28px;
  line-height: 35px;
  margin-top: 14px;
`

export const DashboardHeaderUserSince = styled.div`
  color: ${colors.darkGray};
  font-size: 16px;
  line-height: 20px;
  ${media.desktop`
    margin-top: 30px;
  `}
`

const HeaderUserInfoRowCol = styled(Col)`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  margin: 20px 30px;

  ${media.desktop`
    padding: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row-reverse;
  `}
`

export const Achievements = styled.div`
  display: flex;
  margin-top: 20px;
  justify-content: center;
`

export const Achievement = styled.div`
  width: 60px;
  height: 60px;
  border-radius: ${props =>
    props.specialShape ? '5px 5px 30px 30px' : '30px'};
  border: ${props => (props.other ? '0px' : `3px solid ${colors.green}`)};
  margin: 0 10px;
  justify-content: center;
  align-items: center;
  align-self: center;
  display: flex;
  background-color: ${props => (props.other ? colors.ocean : colors.white)};
  overflow: hidden;
`

export const AchievementSmall = styled(Achievement)`
  width: 40px;
  height: 40px;
  border-radius: ${props =>
    props.specialShape ? '5px 5px 20px 20px' : '20px'};
  border: ${props => (props.other ? '0px' : `2px solid ${colors.green}`)};
  margin: 0 3px;
`

export const OtherAchievementsText = styled.text`
  color: white;
  text-align: center;
  font-family: Noto Sans;
  font-size: 16px;
`

export const ModalContent = styled.div`
  width: 472px;
  height: 418px;
  max-height: 418px;
  overflow: scroll;
  margin: 0 60px 40px 60px;
  border: 1px solid ${colors.gray};
  box-sizing: border-box;
  border-radius: 4px;

  ${media.phone`
    width: 90%;
    margin: 5%;
    border-radius: 0;
  `}
`

export const AchievementRow = styled(Row)``
export const AchievementCol = styled(Col)`
  margin-top: 30px;
  justify-content: center;
  align-items: center;
  display: flex;
`

export const AchievementTitle = styled.p`
  text-align: center;
  font-family: Noto Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 28px;
  margin-top: 30px;
  margin-bottom: 15px;
  width: 100%;
`

export const AchievementFooter = styled.div`
  background-color: ${colors.lightGray};
  height: 110px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0px 0px 4px 4px;

  ${media.phone`
    border-radius: 0;
    padding: 0 10px;
  `}
`

export const AchievementModal = styled(Modal)`
  .ant-modal-close-x {
    width: 50px;
    height: 50px;
  }

  .ant-modal-footer {
    padding: 0px;
    border: 0;
  }

  .ant-modal-body {
    height: 450px;
  }

  .ant-modal-title {
    justify-content: center;
    align-items: center;
    display: flex;
  }

  .ant-modal-header {
    border: 0px;
  }
`

export const AchivmentLogo = styled.img`
  position: relative;
  top: -55px;
  left: 41%;
  width: 110px;
  height: 108.95px;
  border-radius: 50%;
`

export const AchivmentBanner = styled.div`
  height: 140px;
  width: 100%;
  background-color: ${colors.ocean};
  border-radius: 4px 4px 0px 0px;
`

export const FingerLogo = styled.img`
  position: absolute;
  top: 39.62px;
  left: 130px;
`

export const AchievementFooterButton = styled(PrimaryButton)`
  width: 472px;
  height: 50px;
  align-self: center;
`

export const PopoverWrapper = styled.div`
  background-color: ${colors.dark};
  display: flex;
  flex-direction: column;
  .ant-popover-inner {
    background-color: ${colors.green} !important;
  }
  .ant-popover-inner-content {
    padding: 0;
    background-color: ${colors.green} !important;
  }
`
export const PopoverTitle = styled.text`
  font-family: Noto Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 28px;
  color: ${colors.white};
`
export const PopoverText = styled.text`
  font-family: Noto Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  color: ${colors.darkGray};
`

export const AchievementPopover = styled(Popover)``

function getAchievements(user, myGroups = []) {
  let achievements = []
  const finishedCampaigns = user.achievements || []
  finishedCampaigns.forEach(c => {
    achievements.push({
      _id: c._id,
      achievement: c.campaign,
      accomplishedActions: c.accomplishedActions,
      totalActions: c.campaign.actions.length,
    })
  })
  myGroups
    .filter(i => !_.isEmpty(i.achievements))
    .forEach(group => {
      const finishedCompetitions = group.achievements || []

      finishedCompetitions.forEach(c => {
        achievements.push({
          _id: c._id,
          achievement: c.competition,
          accomplishedActions: c.accomplishedActions,
          specialShape: true,
          totalActions:
            _.get(c.competition, 'actions.length', 0) *
            _.get(c, 'participantsCount', 0),
        })
      })
    })
  return achievements
}

const Header = props => {
  const {
    organization,
    avatar,
    handleSelectImage,
    user,
    stats,
    footPrintReduction,
    externalHandprint,
    moreAchievesVisible,
    setMoreAchievesVisible,
    formatMessage,
    myGroups,
  } = props
  const achievements = getAchievements(user, myGroups)
  return (
    <DashboardHeaderWhiteLine organization={organization}>
      <DashboardHeaderUserPictureWrap>
        {!organization && <DashboardHeaderUserPictureBackground />}
        <DashboardHeaderUserPicture
          onClick={() => organization && handleSelectImage(true)}
          organization={organization}
          src={avatar}
        />
      </DashboardHeaderUserPictureWrap>
      <DashboardHeaderUserName>
        {organization ? organization.name : user.fullName}
      </DashboardHeaderUserName>
      <DashboardHeaderUserSince>
        {organization ? (
          <FormattedMessage id={'app.dahsboard.organization'} />
        ) : (
          <div>
            <FormattedMessage id="app.dashboardPage.memberSince" />{' '}
            {moment(user.createdAt).format('MMMM DD, YYYY')}
          </div>
        )}
      </DashboardHeaderUserSince>
      {!organization && (
        <Achievements>
          {achievements.slice(0, 5).map(i => {
            const achievement = i.achievement
            if (!achievement) return null
            const accomplished = i.accomplishedActions
              ? i.accomplishedActions.length
              : 0
            const total = _.get(i, 'totalActions', 0)
            const accomplishedLabel = formatMessage(
              { id: 'app.campaignPage.progress.accomplished' },
              {
                accomplished: accomplished,
                total,
              },
            )
            return (
              <AchievementPopover
                key={i.id}
                overlayClassName={'achievements-popover'}
                content={
                  <PopoverWrapper>
                    <PopoverTitle>{_.get(i, 'achievement.name')}</PopoverTitle>
                    <PopoverText>{accomplishedLabel}</PopoverText>
                  </PopoverWrapper>
                }
              >
                <Achievement specialShape={i.specialShape}>
                  <img alt={''} src={_.get(i, 'achievement.logo.src')} />
                </Achievement>
              </AchievementPopover>
            )
          })}
          {achievements.length > 5 && (
            <Achievement onClick={() => setMoreAchievesVisible(true)} other>
              <OtherAchievementsText>
                +{achievements.length - 5}
              </OtherAchievementsText>
            </Achievement>
          )}
        </Achievements>
      )}
      {stats && (
        <DashboardHeaderUserInfoCol>
          <DashboardHeaderUserInfoRow>
            <HeaderUserInfoRowCol>
              <DashboardHeaderUserInfoValue>
                {stats.personal.actionsTaken}
              </DashboardHeaderUserInfoValue>
              <DashboardHeaderUserSince>
                <FormattedMessage id="app.dashboardPage.actionsTaken" />
              </DashboardHeaderUserSince>
            </HeaderUserInfoRowCol>

            <HeaderUserInfoRowCol>
              <DashboardHeaderUserInfoValue>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                  }}
                >
                  {footPrintReduction + externalHandprint}
                  <InfoElementWrap>
                    <InfoElement
                      type={INFO_ELEMENT_TYPES.QUESTION}
                      tooltipProps={{
                        placement: 'bottomLeft',
                        title: (
                          <Fragment>
                            <p>
                              <FormattedMessage id="totalPositiveDays" />
                              {`: `}
                              {footPrintReduction + externalHandprint}
                            </p>
                            <p>
                              {` - `}
                              <FormattedMessage id="footprintReduction" />
                              {`: `}
                              {footPrintReduction}
                            </p>
                            <p>
                              {` - `}
                              <FormattedMessage id="externalHandprint" />
                              {`: `}
                              {externalHandprint}
                            </p>
                          </Fragment>
                        ),
                      }}
                    />
                  </InfoElementWrap>
                </div>
              </DashboardHeaderUserInfoValue>
              <DashboardHeaderUserSince>
                <FormattedMessage
                  id={
                    organization
                      ? 'app.dashboardPage.organization.netPositiveDays'
                      : 'app.dashboardPage.netPositiveDays'
                  }
                />
              </DashboardHeaderUserSince>
            </HeaderUserInfoRowCol>
          </DashboardHeaderUserInfoRow>
        </DashboardHeaderUserInfoCol>
      )}
      <AchievementModal
        width={592}
        visible={moreAchievesVisible}
        closable
        onCancel={() => setMoreAchievesVisible(false)}
        centered
        destroyOnClose
        title={
          <AchievementTitle>
            <FormattedMessage id={'app.dashboardPage.achievements'} />
          </AchievementTitle>
        }
        footer={[
          <AchievementFooter key="submit">
            <AchievementFooterButton
              type="primary"
              onClick={() => {
                setMoreAchievesVisible(false)
              }}
            >
              OK
            </AchievementFooterButton>
          </AchievementFooter>,
        ]}
      >
        <ModalContent>
          <AchievementRow type="flex" justify="left">
            {achievements.map(i => {
              const achievement = i.achievement
              if (!achievement) return null
              const accomplished = i.accomplishedActions
                ? i.accomplishedActions.length
                : 0
              const total = _.get(i, 'totalActions', 0)
              const accomplishedLabel = formatMessage(
                { id: 'app.campaignPage.progress.accomplished' },
                {
                  accomplished: accomplished,
                  total,
                },
              )
              return (
                <AchievementCol key={i.id} span={6}>
                  <AchievementPopover
                    overlayClassName={'achievements-popover'}
                    content={
                      <PopoverWrapper>
                        <PopoverTitle>
                          {!!i.achievement && i.achievement.name}
                        </PopoverTitle>
                        <PopoverText>{accomplishedLabel}</PopoverText>
                      </PopoverWrapper>
                    }
                  >
                    <Achievement specialShape={i.specialShape}>
                      <img alt={''} src={_.get(i, 'achievement.logo.src')} />
                    </Achievement>
                  </AchievementPopover>
                </AchievementCol>
              )
            })}
          </AchievementRow>
        </ModalContent>
      </AchievementModal>
    </DashboardHeaderWhiteLine>
  )
}

Header.propTypes = {
  organization: Object,
  avatar: Object,
  getIsOrgAdmin: Function,
  handleSelectImage: Function,
  handleMoreAchievesShow: Function,
  user: Object,
  stats: Object,
  footPrintReduction: Number,
  externalHandprint: Number,
  moreAchievesVisible: Boolean,
  setMoreAchievesVisible: Function,
  formatMessage: Function,
  myGroups: Array,
}

export default Header
