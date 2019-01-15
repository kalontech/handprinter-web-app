import React, { Component, Fragment } from 'react'
import { Col, Row, Tabs, Icon } from 'antd'
import styled, { css } from 'styled-components'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import moment from 'moment'

import CalendarWidget from './../../components/CalendarWidget'
import GoodRatioWidget from './../../components/GoodRatioWidget'
import NetworkWidget from './../../components/NetworkWidget'
import colors from './../../config/colors'
import api from './../../api'
import Spinner from './../../components/Spinner'
import PageMetadata from '../../components/PageMetadata'
import { BlockContainer } from './../../components/Styled'
import fingerprintImage from './../../assets/dashboard/fingerprint.png'
import treeImage from './../../assets/dashboard/tree.png'
import icons from './../../components/ActionCardLabel/icons'
import media from './../../utils/mediaQueryTemplate'

const PageContainer = styled.div`
  background-color: ${colors.lightGray};
  padding-bottom: 80px;
`

const WidgetContainer = styled.div`
  background-color: ${colors.white};
  border-radius: 4px;
  box-shadow: 0 1px 10px 0 rgba(52, 68, 66, 0.08);
  padding: 40px 30px;

  ${props =>
    props.noPaddings &&
    css`
      padding: 0;
    `};
`

const WidgetTitle = styled.p`
  color: ${colors.dark};
  font-size: 22px;
  line-height: 30px;
`

const WidgetDescription = styled.p`
  color: ${colors.darkGray};
  font-size: 14px;
  line-height: 20px;
  margin-top: 3px;
`

const WidgetHeader = styled.div`
  padding-bottom: 30px;

  ${props =>
    props.withBorder &&
    css`
      border-bottom: 1px solid ${colors.whiteSmoke};
    `};
`

const WidgetContent = styled.div`
  ${props => props.useWidgetMinHeight && `
    min-height: 500px;
  `}
`

const DashboardHeader = styled.div`
  border-bottom: 1px solid ${colors.whiteSmoke};
  margin-bottom: 20px;
`

const DashboardHeaderGreenLine = styled.div`
  background-color: ${colors.ocean};
  height: 140px;
`

const DashboardHeaderWhiteLine = styled(Row)`
  background-color: ${colors.white};
  display: flex;
  height: 120px;
  justify-content: center;
  width: 100%;
  ${media.desktop`
    background-color: transparent;
    margin-top: 90px;
    height: auto;
  `}
`

const DashboardHeaderUserNameCol = styled(Col)`
  ${media.desktop`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  `}
`

const DashboardHeaderUserRow = styled(Row)`
  width: 100%;
  padding: 0 0 0 199px;
  ${media.largeDesktop`
    padding: 0 39px 0 199px;
  `}
  ${media.desktop`
    padding: 0;
    margin-top: 18px;
  `}
`

const DashboardHeaderBackgrounds = styled.div`

`

const HeaderFingerprintBackground = styled.div`
  background-image: url(${fingerprintImage});
  background-position: top 0px right;
  background-repeat: no-repeat, no-repeat;
  height: 140px;
`

const DashboardHeaderUserPictureTree = styled.img`
  border-radius: 0;
  border: none;
  box-shadow: none;
  position: absolute;
  left: 90px;
  top: -120px;
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
  border-radius: 88px;
  box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.1);
  height: 190px;
  margin-top: -88px;
  width: 190px;
  position: relative;
`

const DashboardHeaderUserName = styled.div`
  color: ${colors.dark};
  font-size: 22px;
  ${media.desktop`
    line-height: 35px;
  `}
`

const DashboardHeaderUserInfoValue = styled.div`
color: ${colors.dark};
font-size: 22px;
font-weight: bold;
${media.desktop`
  line-height: 35px;
`}
${media.phone`
  font-size: 16px;
`}
`

const DashboardHeaderUserInfoCol = styled(Col)`
  padding-left: 40px;
  ${media.desktop`
    text-align: center;
    padding: 0 70px;
  `}
  ${media.phone`
    padding: 0;
  `}
`

const DashboardHeaderUserSince = styled.div`
  color: ${colors.darkGray};
  font-size: 14px;
  line-height: 20px;
  ${media.desktop`
    margin-top: 4px;
  `}
`

const ImpactCategorySelector = styled(Tabs)`
  .ant-tabs-nav-scroll {
    text-align: center;
  }

  .ant-tabs-tab {
    padding: 16.5px 16px;
    ${media.desktop`
      padding: 16.5px 0;
    `}
    ${media.phone`
      margin: 0 25px 0 0;
    `}

    span {
      align-items: center;
      display: flex;
      font-size: 16px;
    }
  }

  .ant-tabs-bar {
    border-bottom: none;
    margin: 0;
  }

  .ant-tabs-ink-bar {
    height: 4px;
  }

  .ant-tabs-nav {
    ${media.desktop`
      padding: 0 20px;
      > div {
        display: flex;
        justify-content: center;
        align-items: center;
      }
    `}
  }
`

const ImpactCategorySelectorName = styled.strong`
  ${media.phone`
    display: none;
  `}
`

const GoodRatioCol = styled(Col)`
  ${media.desktop`
    margin-top: 20px;
  `}
`

const DashboardHeaderUserInfoRow = styled(Row)`
  ${media.desktop`
    margin: 40px 0 30px 0;
  `}
  ${media.phone`
    margin: 15px 0 18px 0;

  `}
`

const HeaderUserInfoRowCol = styled(Col)`
  ${media.phone`
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex-direction: row-reverse;
  `}
`

class DashboardPage extends Component {
  state = {
    calendar: null,
    network: null,
    ratio: null,
    stats: null,
    currentImpactCategory: 'climate',
  }

  componentDidMount() {
    this.fetchDashboardData()
  }

  fetchDashboardData = async () => {
    const { token } = this.props
    const { calendar, network, ratio, stats } = await api.getDashboardData(
      token,
    )
    this.setState({ calendar, network, ratio, stats })
  }

  handleImpactCategoryChange = category => {
    this.setState({ currentImpactCategory: category })
  }

  render() {
    const {
      calendar,
      network,
      ratio,
      stats,
      currentImpactCategory,
    } = this.state
    const { user } = this.props
    return (
      <Fragment>
        <PageMetadata pageName="dashboardPage" />
        <PageContainer>
          {calendar === null ||
          network === null ||
          ratio === null ||
          stats === null ? (
            <Spinner />
          ) : (
            <Fragment>
              <DashboardHeader>
                <DashboardHeaderGreenLine>
                <DashboardHeaderBackgrounds>
                  <HeaderFingerprintBackground />
                </DashboardHeaderBackgrounds>
                  <BlockContainer style={{ zIndex: 1 }}>
                    <DashboardHeaderUserPictureWrap>
                      <DashboardHeaderUserPictureTree src={treeImage} />
                      <DashboardHeaderUserPictureBackground />
                      <DashboardHeaderUserPicture
                        src={
                          user.photo || api.getUserInitialAvatar(user.fullName)
                        }
                      />
                    </DashboardHeaderUserPictureWrap>
                  </BlockContainer>
                </DashboardHeaderGreenLine>
                <DashboardHeaderWhiteLine>
                  <Col span={24}>
                    <BlockContainer
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        height: '100%',
                      }}
                    >
                      <DashboardHeaderUserRow>
                        <DashboardHeaderUserNameCol span={16} sm={24} lg={12} xs={24}>
                          <DashboardHeaderUserName>
                            {user.fullName}
                          </DashboardHeaderUserName>
                          <DashboardHeaderUserSince>
                            <FormattedMessage id="app.dashboardPage.memberSince" />{' '}
                            {moment(user.createdAt).format('MMMM DD, YYYY')}
                          </DashboardHeaderUserSince>
                        </DashboardHeaderUserNameCol>
                        <DashboardHeaderUserInfoCol span={8} sm={24} lg={12} xs={24}>
                          <DashboardHeaderUserInfoRow>
                            <HeaderUserInfoRowCol span={8} lg={8} xs={24}>
                              <DashboardHeaderUserInfoValue>
                                {stats.personal.usersInvited}
                              </DashboardHeaderUserInfoValue>
                              <DashboardHeaderUserSince>
                                <FormattedMessage id="app.dashboardPage.usersInvited" />
                              </DashboardHeaderUserSince>
                            </HeaderUserInfoRowCol>
                            <HeaderUserInfoRowCol span={8} lg={8} xs={24}>
                              <DashboardHeaderUserInfoValue>
                                {stats.personal.actionsTaken}
                              </DashboardHeaderUserInfoValue>
                              <DashboardHeaderUserSince>
                                <FormattedMessage id="app.dashboardPage.actionsTaken" />
                              </DashboardHeaderUserSince>
                            </HeaderUserInfoRowCol>
                            <HeaderUserInfoRowCol span={8} lg={8} xs={24}>
                              <DashboardHeaderUserInfoValue>
                                {Math.round(
                                  stats.personal.netPositiveDays[
                                    currentImpactCategory
                                  ],
                                )}
                              </DashboardHeaderUserInfoValue>
                              <DashboardHeaderUserSince>
                                <FormattedMessage id="app.dashboardPage.netPositiveDays" />
                              </DashboardHeaderUserSince>
                            </HeaderUserInfoRowCol>
                          </DashboardHeaderUserInfoRow>
                        </DashboardHeaderUserInfoCol>
                      </DashboardHeaderUserRow>
                    </BlockContainer>
                  </Col>
                </DashboardHeaderWhiteLine>
              </DashboardHeader>
              <BlockContainer>
                <Row gutter={20}>
                  <Col span={24}>
                    <WidgetContainer noPaddings>
                      <WidgetContent>
                        <ImpactCategorySelector
                          defaultActiveKey={currentImpactCategory}
                          onChange={this.handleImpactCategoryChange}
                        >
                          <Tabs.TabPane
                            tab={
                              <span>
                                <Icon
                                  component={() => icons['positive']['climate']}
                                />
                                <ImpactCategorySelectorName>
                                  <FormattedMessage id="app.impactCategories.climate" />
                                </ImpactCategorySelectorName>
                              </span>
                            }
                            key="climate"
                          />
                          <Tabs.TabPane
                            tab={
                              <span>
                                <Icon
                                  component={() => icons['positive']['waste']}
                                />
                                <ImpactCategorySelectorName>
                                <FormattedMessage id="app.impactCategories.waste" />
                                </ImpactCategorySelectorName>
                              </span>
                            }
                            key="waste"
                          />
                          <Tabs.TabPane
                            tab={
                              <span>
                                <Icon
                                  component={() => icons['positive']['water']}
                                />
                                <ImpactCategorySelectorName>
                                <FormattedMessage id="app.impactCategories.water" />
                                </ImpactCategorySelectorName>
                              </span>
                            }
                            key="water"
                          />
                          <Tabs.TabPane
                            tab={
                              <span>
                                <Icon
                                  component={() =>
                                    icons['positive']['ecosystem']
                                  }
                                />
                                <ImpactCategorySelectorName>
                                <FormattedMessage id="app.impactCategories.ecosystem" />
                                </ImpactCategorySelectorName>
                              </span>
                            }
                            key="ecosystem"
                          />
                          <Tabs.TabPane
                            tab={
                              <span>
                                <Icon
                                  component={() => icons['positive']['health']}
                                />
                                <ImpactCategorySelectorName>
                                <FormattedMessage id="app.impactCategories.health" />
                                </ImpactCategorySelectorName>
                              </span>
                            }
                            key="health"
                          />
                        </ImpactCategorySelector>
                      </WidgetContent>
                    </WidgetContainer>
                  </Col>
                </Row>
                <Row gutter={20} style={{ marginTop: '20px' }}>
                  <Col span={12} sm={24} lg={12}>
                    <WidgetContainer>
                      <WidgetHeader>
                        <WidgetTitle>
                          <FormattedMessage id="app.dashboardPage.myNetPositiveDays" />
                        </WidgetTitle>
                      </WidgetHeader>
                      <WidgetContent useWidgetMinHeight>
                        <CalendarWidget
                          activeDays={calendar[currentImpactCategory]}
                        />
                      </WidgetContent>
                    </WidgetContainer> 
                  </Col>
                  <GoodRatioCol span={12} sm={24} lg={12}>
                    <WidgetContainer>
                      <WidgetHeader>
                        <WidgetTitle>
                          <FormattedMessage id="app.dashboardPage.goodRatio" />
                        </WidgetTitle>
                      </WidgetHeader>
                      <WidgetContent useWidgetMinHeight>
                        <GoodRatioWidget
                          footprintDays={Math.round(
                            ratio.footprintDays[currentImpactCategory],
                          )}
                          handprintDays={Math.round(
                            ratio.handprintDays[currentImpactCategory],
                          )}
                        />
                      </WidgetContent>
                    </WidgetContainer>
                  </GoodRatioCol>
                </Row>
                <Row gutter={20} style={{ marginTop: '20px' }}>
                <Col span={24}>
                  <WidgetContainer>
                    <WidgetHeader withBorder>
                      <Row>
                        <Col span={16} sm={11} lg={16}>
                          <WidgetTitle>
                            <FormattedMessage id="app.dashboardPage.myNetwork" />
                          </WidgetTitle>
                          <WidgetDescription>
                            <FormattedMessage id="app.dashboardPage.myNetworkDescription" />
                          </WidgetDescription>
                        </Col>
                        <Col span={8} sm={13} lg={8}>
                          <Row>
                            <Col span={8}>
                              <DashboardHeaderUserName>
                                {stats.personal.usersInvited}
                              </DashboardHeaderUserName>
                              <DashboardHeaderUserSince>
                                <FormattedMessage id="app.dashboardPage.usersInvited" />
                              </DashboardHeaderUserSince>
                            </Col>
                            <Col span={8}>
                              <DashboardHeaderUserName>
                                {stats.personal.actionsTaken}
                              </DashboardHeaderUserName>
                              <DashboardHeaderUserSince>
                                <FormattedMessage id="app.dashboardPage.actionsTaken" />
                              </DashboardHeaderUserSince>
                            </Col>
                            <Col span={8}>
                              <DashboardHeaderUserName>
                                {Math.round(
                                  stats.personal.netPositiveDays[
                                    currentImpactCategory
                                  ],
                                )}
                              </DashboardHeaderUserName>
                              <DashboardHeaderUserSince>
                                <FormattedMessage id="app.dashboardPage.netPositiveDays" />
                              </DashboardHeaderUserSince>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </WidgetHeader>
                    <WidgetContent>
                      <NetworkWidget data={network} />
                    </WidgetContent>
                  </WidgetContainer>
                </Col>
              </Row>
              </BlockContainer>
            </Fragment>
          )}
        </PageContainer>
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user.data,
  token: state.account.token,
})

DashboardPage.propTypes = {
  user: PropTypes.object.isRequired,
  token: PropTypes.string.isRequired,
}

export default connect(mapStateToProps)(DashboardPage)
