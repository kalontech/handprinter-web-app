import React, { Fragment } from 'react'
import styled from 'styled-components'
import { Col, Row, Icon } from 'antd'
import moment from 'moment'
import { FormattedMessage } from 'react-intl'

import media from 'utils/mediaQueryTemplate'
import colors from 'config/colors'

import InfoElement, { INFO_ELEMENT_TYPES } from 'components/InfoElement'

import { InfoElementWrap } from '.'

const DashboardHeaderWhiteLine = styled(Row)`
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

const DashboardHeaderUserPictureWrap = styled.div`
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

const DashboardHeaderUserPicture = styled.img`
  border: 4px solid ${colors.white};
  border-radius: ${props => (props.organization ? '4px' : '50%')};
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
const HeaderOuterPlusButton = styled.div`
  height: 42px;
  width: 42px;
  background-color: white;
  border-radius: 50%;
  border: 2px solid ${colors.green};
  color: ${colors.green};
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: 0px;
  left: 150px;
  z-index: 2;
  cursor: pointer;
`

const DashboardHeaderUserName = styled.div`
  color: ${colors.dark};
  font-size: 28px;
  line-height: 35px;
  margin-top: 14px;
`

const DashboardHeaderUserSince = styled.div`
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

const Achievements = styled.div`
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
  display: flex;
  background-color: ${props => (props.other ? colors.ocean : colors.white)};
  overflow: hidden;
`

const OtherAchievementsText = styled.text`
  color: white;
  text-align: center;
  font-family: Noto Sans;
  font-size: 16px;
`

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
    getIsOrgAdmin,
    handleSelectImage,
    user,
    stats,
    footPrintReduction,
    externalHandprint,
    handleMoreAchievesShow,
  } = props
  return (
    <DashboardHeaderWhiteLine organization={organization}>
      <DashboardHeaderUserPictureWrap>
        {!organization && <DashboardHeaderUserPictureBackground />}
        <DashboardHeaderUserPicture organization={organization} src={avatar} />
        {organization && getIsOrgAdmin() && (
          <HeaderOuterPlusButton onClick={() => handleSelectImage(true)}>
            <Icon type="plus" />
          </HeaderOuterPlusButton>
        )}
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
      <Achievements>
        {AchievementsMOCK.slice(0, 5).map(i => (
          <Achievement specialShape={i.specialShape} key={i.id}>
            <img alt={''} src={i.image} />
          </Achievement>
        ))}
        {AchievementsMOCK.length > 5 && (
          <Achievement onClick={handleMoreAchievesShow} other>
            <OtherAchievementsText>
              +{AchievementsMOCK.length - 5}
            </OtherAchievementsText>
          </Achievement>
        )}
      </Achievements>
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
}

export default Header
