import React, { Fragment } from 'react'
import styled from 'styled-components'
import { Col, Row, Popover } from 'antd'
import moment from 'moment'
import { FormattedMessage } from 'react-intl'

import media from 'utils/mediaQueryTemplate'
import colors from 'config/colors'

import InfoElement, { INFO_ELEMENT_TYPES } from 'components/InfoElement'
import { PrimaryButton, Modal } from 'components/Styled'

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
`

const Achievement = styled.div`
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

const OtherAchievementsText = styled.text`
  color: white;
  text-align: center;
  font-family: Noto Sans;
  font-size: 16px;
`

const ModalContent = styled.div`
  width: 472px;
  height: 413px;
  margin: 0 60px 40px 60px;
  border: 1px solid ${colors.lightGray};
`

const AchievementRow = styled(Row)``
const AchievementCol = styled(Col)`
  margin-top: 30px;
  justify-content: center;
  align-items: center;
  display: flex;
`

const AchievementTitle = styled.text`
  font-family: Noto Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 28px;
  line-height: 35px;
  text-align: center;
`

const AchievementFooter = styled.div`
  background-color: ${colors.lightGray};
  height: 110px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const AchievementModal = styled(Modal)`
  .ant-modal-footer {
    padding: 0px;
    border: 0;
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

const AchievementFooterButton = styled(PrimaryButton)`
  width: 472px;
  align-self: center;
`

const PopoverWrapper = styled.div`
  background-color: ${colors.dark};
  display: flex;
  flex-direction: column;
  .ant-popover-inner {
    background-color: ${colors.green}; !important
  }
  .ant-popover-inner-content {
    padding: 0;
    background-color: ${colors.green}; !important
  }
`
const PopoverTitle = styled.text`
  font-family: Noto Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 28px;
  color: ${colors.white};
`
const PopoverText = styled.text`
  font-family: Noto Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  color: ${colors.darkGray};
`

const AchievementPopover = styled(Popover)``

const AchievementsMOCK = [
  { id: 1, image: 'https://facebook.github.io/react-native/img/tiny_logo.png' },
  {
    id: 2,
    specialShape: true,
    image: 'https://facebook.github.io/react-native/img/tiny_logo.png',
  },
  { id: 3, image: 'https://facebook.github.io/react-native/img/tiny_logo.png' },
  { id: 4, image: 'https://facebook.github.io/react-native/img/tiny_logo.png' },
  { id: 5, image: 'https://facebook.github.io/react-native/img/tiny_logo.png' },
  { id: 6, image: 'https://facebook.github.io/react-native/img/tiny_logo.png' },
]
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
  } = props

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
          {AchievementsMOCK.slice(0, 5).map(i => (
            <AchievementPopover
              key={i.id}
              overlayClassName={'achievements-popover'}
              content={
                <PopoverWrapper>
                  <PopoverTitle>Christmas campaign</PopoverTitle>
                  <PopoverText>
                    3 of 6 actions accomplished 7 days left
                  </PopoverText>
                </PopoverWrapper>
              }
            >
              <Achievement specialShape={i.specialShape}>
                <img alt={''} src={i.image} />
              </Achievement>
            </AchievementPopover>
          ))}
          {AchievementsMOCK.length > 5 && (
            <Achievement onClick={() => setMoreAchievesVisible(true)} other>
              <OtherAchievementsText>
                +{AchievementsMOCK.length - 5}
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
            {AchievementsMOCK.map(i => (
              <AchievementCol key={i.id} span={6}>
                <AchievementPopover
                  overlayClassName={'achievements-popover'}
                  content={
                    <PopoverWrapper>
                      <PopoverTitle>Christmas campaign</PopoverTitle>
                      <PopoverText>
                        3 of 6 actions accomplished 7 days left
                      </PopoverText>
                    </PopoverWrapper>
                  }
                >
                  <Achievement specialShape={i.specialShape}>
                    <img alt={''} src={i.image} />
                  </Achievement>
                </AchievementPopover>
              </AchievementCol>
            ))}
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
}

export default Header
