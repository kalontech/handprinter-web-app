import React, { Component, Fragment } from 'react'
import { Button, Row, Col } from 'antd'
import styled from 'styled-components'
import ScrollableAnchor, {
  configureAnchors,
  removeHash,
} from 'react-scrollable-anchor'
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl'

import ExpandMoreIcon from '../../assets/icons/ExpandMoreIcon'
import { BlockContainer } from './../../components/Styled'
import ActionsCarousel from './../../components/ActionsCarousel'
import colors from './../../config/colors'
import heroImg from './../../assets/about-eaton/BecomeGuardian.jpg'
import instagramImg from './../../assets/about-eaton/insta_photos.png'
import BecomeGuardianImg from './../../assets/about-eaton/bc.jpg'
import { Link } from 'react-router-dom'
import api from './../../api'
import PageMetadata from '../../components/PageMetadata'

configureAnchors({ scrollDuration: 1200 })

// clear URL hash
removeHash()

const Hero = styled.section`
  font-family: Arial;
  position: relative;
  display: flex;
  align-items: center;
  text-align: center;
  height: 520px;
  background: url(${heroImg}) no-repeat center;
  background-size: cover;
  font-family: Arial;
  color: ${colors.white};
`
const HeroTitle = styled.h1`
  line-height: 68px;
  font-size: 50px;
  letter-spacing: -1px;
  margin-bottom: 10px;
  color: inherit;
  @media (max-width: 1024px) {
    font-size: 41px;
    line-height: 47px;
    margin-bottom: 20px;
  }
  @media (max-width: 767px) {
    font-size: 34px;
    line-height: 40px;
  }
`
const HeroDescription = styled.p`
  line-height: 29px;
  font-size: 18px;
  max-width: 600px;
  margin: 0 auto 25px;
  color: inherit;
`
const WhiteBorderedButton = styled(Button)`
  line-height: 29px;
  font-size: 18px;
  max-width: 600px;
  margin: 0 auto;
  width: 280px;
  border: 2px solid ${colors.white};
  border-radius: 0;
  font-family: Arial;
  font-size: 20px;
  letter-spacing: -0.2px;
  color: ${colors.white};
  &&:hover,
  &&:focus {
    border-color: ${colors.white};
    background: ${colors.white};
    color: ${colors.darkBlue};
  }
`

const BlueBorderedButton = styled(WhiteBorderedButton)`
  line-height: 29px;
  font-size: 18px;
  max-width: 600px;
  margin: 0 auto;
  width: 280px;
  border: 2px solid ${colors.darkBlue};
  border-radius: 0;
  font-family: Arial;
  font-size: 20px;
  letter-spacing: -0.2px;
  color: ${colors.darkBlue};
  &&:hover,
  &&:focus {
    border-color: ${colors.darkBlue};
    background: ${colors.darkBlue};
    color: ${colors.white};
    }
  }
`
const ScrollToSection = styled.a`
  position: absolute;
  left: 0;
  width: 100%;
  bottom: 40px;
  display: block;
  text-align: center;
  margin-top: 95px;
  @media (max-width: 767px) {
    display: none;
  }
`
const Container = styled.section`
  margin-left: -20px;
  margin-right: -20px;
  @media (max-width: 767px) {
    margin: 0;
  }
`

const GrowHandprint = styled.section`
  font-family: Arial;
  margin: 40px 0;
  padding: 80px 0;
  background: ${colors.darkBlue};
  color: ${colors.white};
  @media (max-width: 767px) {
    padding: 40px 0;
  }
`
const Text = styled.div`
  line-height: 32px;
  font-size: 20px;
  @media (max-width: 767px) {
    line-height: 24px;
    font-size: 16px;
  }
`

const SubHeading = styled.div`
  porision: relative;
  line-height: 36px;
  font-size: 28px;
  margin-bottom: 30px;
  @media (max-width: 1024px) {
    line-height: 36px;
    font-size: 28px;
  }
  @media (max-width: 767px) {
    line-height: 30px;
    font-size: 22px;
  }
`

const WhatAreHandprints = styled.section`
  font-family: Arial;
  padding: 80px 0;
  color: #353f47;
  @media (max-width: 767px) {
    padding: 40px 0;
  }
  div${Text} {
    font-size: 18px;

    strong {
      color: ${colors.darkBlue};
      font-weight: normal;
    }
  }
  div${SubHeading} {
    margin-bottom: 60px;
    &:before {
      position: absolute;
      width: 94px;
      height: 4px;
      background: ${colors.darkBlue};
      left: 10px;
      bottom: 30px;
      content: '';
      @media (max-width: 767px) {
        bottom: -30px;
      }
    }
  }
  ${BlueBorderedButton} {
    margin-top: 30px;
    margin-left: 0;
  }
`

const Instagram = styled.section`
  height: 500px;
  background: url(${instagramImg}) no-repeat center;
  background-size: cover;
`

const BecomeGuardian = styled.section`
  height: 480px;
  display: flex;
  align-items: center;
  text-align: center;
  background: url(${BecomeGuardianImg}) no-repeat center;
  background-size: cover;
  color: ${colors.white};
  font-family: Arial;
  text-align: center;
`
const BecomeGuardianTitle = styled.div`
  line-height: 50px;
  font-size: 40px;
  letter-spacing: -1px;
  margin-bottom: 20px;
  @media (max-width: 1024px) {
    font-size: 36px;
  }
  @media (max-width: 767px) {
    margin-bottom: 25px;
    line-height: 40px;
    font-size: 34px;
  }
`
const BecomeGuardianDescription = styled.div`
  line-height: 29px;
  font-size: 18px;
  max-width: 500px;
  margin: 0 auto;
`

class AboutEatonPage extends Component {
  state = {
    actions: [],
  }

  componentDidMount = async () => {
    const {
      actions: { docs: actions },
    } = await api.getActions()
    this.setState({ actions })
  }

  render() {
    const { actions } = this.state
    return (
      <Fragment>
        <PageMetadata pageName="aboutEatonPage" />
        <Hero>
          <BlockContainer>
            <HeroTitle>
              <FormattedMessage id="app.aboutEatonPage.hero.title" />
            </HeroTitle>
            <HeroDescription>
              <FormattedMessage id="app.aboutEatonPage.hero.description" />
            </HeroDescription>
            <Link to="/pages/our-vision">
              <WhiteBorderedButton type="ghost" size="large">
                <FormattedMessage id="app.aboutEatonPage.seeHow" />
              </WhiteBorderedButton>
            </Link>
          </BlockContainer>
          <ScrollToSection href="#grow_your_handprint">
            <ExpandMoreIcon style={{ color: `${colors.white}` }} />
          </ScrollToSection>
        </Hero>
        <ScrollableAnchor id={'grow_your_handprint'}>
          <GrowHandprint>
            <BlockContainer>
              <Container>
                <Row gutter={20}>
                  <Col md={12} xl={10}>
                    <SubHeading>
                      <FormattedMessage id="app.aboutEatonPage.growYourHandprint.title" />
                    </SubHeading>
                  </Col>
                  <Col md={12} xl={{ span: 12, offset: 2 }}>
                    <Text>
                      <FormattedHTMLMessage id="app.aboutEatonPage.growYourHandprint.description" />
                    </Text>
                  </Col>
                </Row>
              </Container>
            </BlockContainer>
          </GrowHandprint>
        </ScrollableAnchor>
        <Instagram className="instagrem" />
        <WhatAreHandprints>
          <BlockContainer>
            <Container>
              <Row gutter={20}>
                <Col md={12} xl={10}>
                  <SubHeading>
                    <FormattedMessage id="app.aboutEatonPage.whatAreHandprints.title" />
                  </SubHeading>
                </Col>
                <Col md={12} xl={{ span: 12, offset: 2 }}>
                  <Text>
                    <FormattedMessage id="app.aboutEatonPage.whatAreHandprints.description.1" />
                  </Text>
                  <Text>
                    <FormattedHTMLMessage id="app.aboutEatonPage.whatAreHandprints.description.2" />
                  </Text>
                  <Link to="/actions">
                    <BlueBorderedButton type="ghost" size="large">
                      <FormattedMessage id="app.aboutEatonPage.whatAreHandprints.getStartedToday" />
                    </BlueBorderedButton>
                  </Link>
                </Col>
              </Row>
            </Container>
          </BlockContainer>
        </WhatAreHandprints>
        <BecomeGuardian>
          <BlockContainer>
            <BecomeGuardianTitle>
              <FormattedMessage id="app.aboutEatonPage.becomeGuardian.title" />
            </BecomeGuardianTitle>
            <BecomeGuardianDescription>
              <FormattedMessage id="app.aboutEatonPage.becomeGuardian.description" />
            </BecomeGuardianDescription>
          </BlockContainer>
        </BecomeGuardian>
        <ActionsCarousel
          actions={actions.slice(0, 3)}
          actionLinkPrefix="/pages/home/actions"
          hideControls
        />
      </Fragment>
    )
  }
}

export default AboutEatonPage
