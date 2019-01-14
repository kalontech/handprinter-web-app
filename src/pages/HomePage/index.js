import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col } from 'antd'
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl'
import styled from 'styled-components'
import ScrollableAnchor, {
  configureAnchors,
  removeHash,
} from 'react-scrollable-anchor'
import { animateScroll } from 'react-scroll'

import {
  PrimaryButton,
  SecondaryButton,
  BlockContainer,
  BlockTitleGreen,
  BlockSubTitle,
  TextLarge,
  TextMedium,
  TextMediumGroup,
  ScrollButton,
  ScrollToSection,
} from './../../components/Styled'
import ActionsCarousel from './../../components/ActionsCarousel'
import VideoPopup from './../../components/VideoPopup'
import client1 from './../../assets/homepage/client-1.png'
import client2 from './../../assets/homepage/client-2.png'
import heroImg from './../../assets/homepage/hero-image.png'
import hpAboutImg from './../../assets/homepage/what-image.png'
import hpActionImg from './../../assets/homepage/actions-image.png'
import ExpandMoreIcon from '../../assets/icons/ExpandMoreIcon'
import FingerPrintIcon from '../../assets/icons/FingerPrintIcon'
import colors from './../../config/colors'
import media from '../../utils/mediaQueryTemplate'
import api from './../../api'
import PageMetadata from '../../components/PageMetadata'

configureAnchors({ scrollDuration: 1200 })

// clear URL hash
removeHash()

const HeroTitle = styled(BlockTitleGreen)`
  margin-bottom: 24px;
`

const HeroText = styled(TextLarge)`
  margin-bottom: 24px;
  ${media.phone`
    display: none;
  `};
`

const HeroButtons = styled.div`
  margin-top: 35px;
  display: flex;
  ${media.desktop`
    justify-content: center;
    margin-bottom: 20px
  `};
  ${media.phone`
    margin-top: 0;
    margin-bottom: 0;
    flex-direction: column;
  `};
  > * {
    margin-right: 24px;
    ${media.phone`
      margin-right: 0;
      margin-bottom: 8px;
      button {
        width: 100%;
      }
  `};
    &:last-child {
      margin-right: 0;
      margin-bottom: 0;
    }
  }
`

const HeroImage = styled.div`
  text-align: right;
  img {
    max-width: 100%;
  }
  ${media.largeDesktop`
    text-align: center;
    margin-top: 55px;
    img {
      width: 100%;
      max-width: 413px;
    }
  `};
  ${media.phone`
    margin-top: 0;
    margin-bottom: 5px;
    img {
      max-width: 190px;
    }
  `};
`

const Hero = styled.section`
  padding: 150px 0 200px;
  ${media.largeDesktop`
    padding-bottom: 100px;
  `};
  ${media.desktop`
    padding-top: 30px;
    padding-bottom: 10px;
    text-align: center;
    ${BlockContainer}{
      max-width: 590px;
    }
    .ant-row-flex {
      justify-content: center;
    }
  `};
  ${media.phone`
    padding: 0;
  `};
`

export const ActionsLink = styled.span`
  display: block;
  a {
    color: ${colors.ocean};
    -webkit-text-stroke: inherit;
    -webkit-text-stroke-width: 0;
    -webkit-text-stroke-color: inherit;
    font-weight: 700;
    &:hover,
    &:active,
    &:focus {
      text-decoration: underline;
    }
  }
`

const ActionsTop = styled.div`
  padding-bottom: 95px;
  ${media.phone`
    padding-bottom: 55px;
  `};
`

const ActionsImage = styled.div`
  text-align: right;
  img {
    max-width: 100%;
  }
  ${media.largeDesktop`
    margin-top: 20px;
    text-align: center;
  `};
  ${media.desktop`
    display: none;
  `};
`

const Actions = styled.section`
  position: relative;
  padding-top: 150px;
  ${media.largeDesktop`
    padding-top: 137px;
  `};
  ${media.phone`
    padding-top: 80px;
  `};
`

const AboutTitle = styled(BlockSubTitle)`
  text-align: center;
  margin-bottom: 75px;
  ${media.phone`
    margin-bottom: 20px;
  `};
`

const AboutText = styled(TextMediumGroup)`
  max-width: 480px;
  ${media.largeDesktop`
    max-width: 100%;
  `};
`

const AboutImage = styled.div`
  ${media.largeDesktop`
    margin-bottom: 60px;
    text-align: center;
    img {
      max-width: 100%;
    }
  `};
  ${media.phone`
    margin-bottom: 10px;
    img {
      max-width: 290px;
    }
  `};
`

const AboutButtons = styled.div`
  margin-top: 40px;
  ${media.desktop`
    display: flex;
    justify-content: center;
  `};
  ${media.phone`
    margin-top: 30px;
    a,button {
      width: 100%;
    }
  `};
`

const About = styled.section`
  padding: 140px 0;
  ${media.largeDesktop`
    .ant-row-flex{
      justify-content: center;
    }
  `};
  ${media.desktop`
    padding: 120px 0;
  `};
  ${media.phone`
    padding: 70px 0 40px;
  `};
`

const Clients = styled.section`
  padding: 60px 0 30px;
  ${media.desktop`
    padding: 40px 0 10px;
  `};
  ${media.phone`
    ${BlockContainer}{
      padding: 0;
    }
  `};
  > div {
    display: flex;
    justify-content: center;
  }
`

const ClientsWrap = styled(Row)`
  width: 100%;
  > div {
    margin-bottom: 30px;
  }
  ${media.desktop`
    width: 90%;
    img {
      width: 100%;
      max-width: 90px;
    }
  `};
  ${media.phone`
    width: 100%;
    img {
      width: 100%;
      max-width: 80px;
    }
  `};
`

class HomePage extends Component {
  state = {
    actions: [],
  }

  componentDidMount = async () => {
    const {
      actions: { docs: actions },
    } = await api.getActions()
    this.setState({ actions })
  }

  render = () => {
    const { actions } = this.state
    return (
      <Fragment>
        <PageMetadata pageName="homePage" />
        <Hero>
          <BlockContainer>
            <Row type="flex" justify="space-between" align="middle">
              <Col xs={{ span: 24, order: 2 }} md={{ order: 1 }} xl={11}>
                <HeroTitle>
                  <FormattedHTMLMessage id="app.homePage.hero.title" />
                </HeroTitle>
                <HeroText>
                  <FormattedMessage id="app.homePage.hero.text" />
                </HeroText>
                <HeroButtons>
                  <Link to="/account/register">
                    <PrimaryButton type="primary" size="large">
                      <FingerPrintIcon />
                      <FormattedMessage id="app.homePage.hero.link" />
                    </PrimaryButton>
                  </Link>
                  <VideoPopup id="CtH6M5CXruU" />
                </HeroButtons>
              </Col>
              <Col xs={{ span: 24, order: 1 }} md={{ order: 2 }} xl={10}>
                <HeroImage>
                  <img src={heroImg} alt="hero" />
                </HeroImage>
              </Col>
            </Row>
          </BlockContainer>
        </Hero>
        <ScrollToSection>
          <BlockContainer>
            <Row>
              <p>
                <FormattedMessage id="app.homePage.scrollText" />
              </p>
              <div>
                <a href="#actions">
                  <ScrollButton>
                    <ExpandMoreIcon style={{ color: `${colors.dark}` }} />
                  </ScrollButton>
                </a>
              </div>
            </Row>
          </BlockContainer>
        </ScrollToSection>
        <ScrollableAnchor id={'actions'}>
          <Actions>
            <ActionsTop>
              <BlockContainer>
                <Row type="flex">
                  <Col md={24} xl={14}>
                    <BlockSubTitle>
                      <FormattedHTMLMessage id="app.homePage.actionsTitle" />
                    </BlockSubTitle>
                    <TextMedium>
                      <FormattedMessage id="app.homePage.actionsDescription" />
                      <ActionsLink>
                        <Link to="/pages/our-vision">
                          <FormattedMessage id="app.homePage.actionsLink" />
                        </Link>
                      </ActionsLink>
                    </TextMedium>
                  </Col>
                  <Col md={24} xl={10}>
                    <ActionsImage>
                      <img src={hpActionImg} alt="" />
                    </ActionsImage>
                  </Col>
                </Row>
              </BlockContainer>
            </ActionsTop>
            <ActionsCarousel
              actions={actions}
              actionLinkPrefix="/pages/home/actions"
            />
          </Actions>
        </ScrollableAnchor>
        <About>
          <BlockContainer>
            <AboutTitle>
              <FormattedMessage id="app.homePage.aboutTitle" />
            </AboutTitle>
            <Row type="flex" align="middle">
              <Col md={24} xl={12}>
                <AboutImage>
                  <img src={hpAboutImg} alt="hero" />
                </AboutImage>
              </Col>
              <Col md={24} xl={12}>
                <AboutText>
                  <FormattedHTMLMessage id="app.homePage.aboutText" />
                </AboutText>
                <AboutText>
                  <FormattedHTMLMessage id="app.homePage.aboutText2" />
                </AboutText>
                <AboutText>
                  <strong>
                    <FormattedMessage id="app.homePage.aboutText3" />
                  </strong>
                </AboutText>
                <AboutButtons>
                  <Link
                    to="/pages/our-vision"
                    onClick={animateScroll.scrollToTop}
                  >
                    <SecondaryButton>
                      <FormattedMessage id="app.homePage.aboutLink" />
                    </SecondaryButton>
                  </Link>
                </AboutButtons>
              </Col>
            </Row>
          </BlockContainer>
        </About>
        <Clients>
          <BlockContainer>
            <ClientsWrap
              type="flex"
              justify="center"
              align="middle"
              gutter={{ xs: 25, sm: 25, md: 30, xl: 80 }}
            >
              <Col xs={{ order: 1 }} xl={{ order: 1 }}>
                <img src={client2} alt="logo" />
              </Col>
              <Col xs={{ order: 2 }} xl={{ order: 2 }}>
                <img src={client2} alt="logo" />
              </Col>
              <Col xs={{ order: 4 }} xl={{ order: 3 }}>
                <img src={client1} alt="logo" />
              </Col>
              <Col xs={{ order: 3 }} xl={{ order: 4 }}>
                <img src={client2} alt="logo" />
              </Col>
              <Col xs={{ order: 5 }} xl={{ order: 5 }}>
                <img src={client1} alt="logo" />
              </Col>
            </ClientsWrap>
          </BlockContainer>
        </Clients>
      </Fragment>
    )
  }
}

export default HomePage
