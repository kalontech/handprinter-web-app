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

const WidgetContent = styled.div``

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
  padding: 0 199px;
  ${media.largeDesktop`
    padding: 0 80px 0 229px;
  `}
  ${media.desktop`
    padding: 0;
    margin-top: 32px;
  `}
`

const DashboardHeaderBackgrounds = styled.div`
  background-image: url(${fingerprintImage}), url(${treeImage});
  background-position: top 90px right, top 20px left 80px;
  background-repeat: no-repeat, no-repeat;
  height: 140px;
  ${media.largeDesktop`
    background-position: top 90px right, top 20px left 120px;
  `}
`

const DashboardHeaderUserPicture = styled.div`
  ${media.largeDesktop`
    padding: 0 50px;
  `}
  ${media.desktop`
    display: flex;
    justify-content: center;
  `}
  img {
    border: 4px solid ${colors.white};
    border-radius: 88px;
    box-shadow: 0 0 1px 1px rgba(0, 0, 0, 0.1);
    height: 190px;
    margin-top: -88px;
    width: 190px;
  }
`

const DashboardHeaderUserName = styled.div`
  color: ${colors.dark};
  font-size: 28px;
  line-height: 35px;
`

const DashboardHeaderUserInfoCol = styled(Col)`
  ${media.desktop`
    text-align: center;
    padding: 0 170px;
  `}
`

const DashboardHeaderUserSince = styled.div`
  color: ${colors.darkGray};
  font-size: 14px;
  line-height: 20px;
  margin-top: 4px;
`

const ImpactCategorySelector = styled(Tabs)`
  .ant-tabs-nav-scroll {
    text-align: center;
  }

  .ant-tabs-tab {
    padding: 16.5px 16px;

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
                <BlockContainer style={{ zIndex: 1 }}>
                  <DashboardHeaderBackgrounds />
                  <DashboardHeaderUserPicture>
                    <img
                      src={
                        user.photo || api.getUserInitialAvatar(user.fullName)
                      }
                    />
                  </DashboardHeaderUserPicture>
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
                      {/* <Col span={16} style={{ paddingLeft: '199px' }} > */}
                      <DashboardHeaderUserNameCol span={16} sm={24} lg={12} >
                        <DashboardHeaderUserName>
                          {user.fullName}
                        </DashboardHeaderUserName>
                        <DashboardHeaderUserSince>
                          <FormattedMessage id="app.dashboardPage.memberSince" />{' '}
                          {moment(user.createdAt).format('MMMM DD, YYYY')}
                        </DashboardHeaderUserSince>
                      </DashboardHeaderUserNameCol>
                      <DashboardHeaderUserInfoCol span={8} sm={24} lg={12}>
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
                              <FormattedMessage id="app.impactCategories.climate" />
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
                              <FormattedMessage id="app.impactCategories.waste" />
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
                              <FormattedMessage id="app.impactCategories.water" />
                            </span>
                          }
                          key="water"
                        />
                        <Tabs.TabPane
                          tab={
                            <span>
                              <Icon
                                component={() => icons['positive']['ecosystem']}
                              />
                              <FormattedMessage id="app.impactCategories.ecosystem" />
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
                              <FormattedMessage id="app.impactCategories.health" />
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
                <Col span={12} sm={24} >
                  <WidgetContainer>
                    <WidgetHeader>
                      <WidgetTitle>
                        <FormattedMessage id="app.dashboardPage.myNetPositiveDays" />
                      </WidgetTitle>
                    </WidgetHeader>
                    <WidgetContent>
                      <CalendarWidget
                        activeDays={calendar[currentImpactCategory]}
                      />
                    </WidgetContent>
                  </WidgetContainer>
                </Col>
                <Col span={12} sm={24}>
                  <WidgetContainer>
                    <WidgetHeader>
                      <WidgetTitle>
                        <FormattedMessage id="app.dashboardPage.goodRatio" />
                      </WidgetTitle>
                    </WidgetHeader>
                    <WidgetContent>
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
                </Col>
              </Row>
              {/* <Row gutter={20} style={{ marginTop: '20px' }}>
                <Col span={24}>
                  <WidgetContainer>
                    <WidgetHeader withBorder>
                      <Row>
                        <Col span={16}>
                          <WidgetTitle>
                            <FormattedMessage id="app.dashboardPage.myNetwork" />
                          </WidgetTitle>
                          <WidgetDescription>
                            <FormattedMessage id="app.dashboardPage.myNetworkDescription" />
                          </WidgetDescription>
                        </Col>
                        <Col span={8}>
                          <Row>
                            <Col span={8}>
                              <WidgetTitle>
                                {stats.network.networkUsers}
                              </WidgetTitle>
                              <WidgetDescription>
                                <FormattedMessage id="app.dashboardPage.networkUsers" />
                              </WidgetDescription>
                            </Col>
                            <Col span={8}>
                              <WidgetTitle>
                                {stats.network.actionsTaken}
                              </WidgetTitle>
                              <WidgetDescription>
                                <FormattedMessage id="app.dashboardPage.actionsTaken" />
                              </WidgetDescription>
                            </Col>
                            <Col span={8}>
                              <WidgetTitle>
                                {Math.round(
                                  stats.network.netPositiveDays[
                                    currentImpactCategory
                                  ],
                                )}
                              </WidgetTitle>
                              <WidgetDescription>
                                <FormattedMessage id="app.dashboardPage.netPositiveDays" />
                              </WidgetDescription>
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
              </Row> */}
            </BlockContainer>
          </Fragment>
        )}
      </PageContainer>
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
