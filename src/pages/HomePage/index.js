import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col } from 'antd'
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl'
import styled from 'styled-components'
import colors from './../../config/colors'

import ScrollableAnchor, {
  configureAnchors,
  removeHash,
} from 'react-scrollable-anchor'
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
import cardImg1 from './../../assets/homepage/hp-carpool-with-someone.jpg'
import ExpandMoreIcon from '../../assets/icons/ExpandMoreIcon'
import FingerPrintIcon from '../../assets/icons/FingerPrintIcon'
configureAnchors({ scrollDuration: 1200 })

// clear URL hash
removeHash()

const actions = [
  {
    cardImg: cardImg1,
    cardTitle: 'Carpool with someone',
    cardArr: [
      {
        category: 'health',
        value: '365',
        unit: 'days',
        variant: 'positive',
      },
      {
        category: 'climate',
        value: '15',
        unit: 'hrs',
        variant: 'positive',
      },
      {
        category: 'ecosystem',
        value: '15',
        unit: 'min',
        variant: 'positive',
      },
      {
        category: 'water',
        value: '700',
        unit: 'days',
        variant: 'positive',
      },
      {
        category: 'waste',
        value: '20',
        unit: 'min',
        variant: 'positive',
      },
    ],
  },
  {
    cardImg: cardImg1,
    cardTitle: 'Carpool with someone',
    cardArr: [
      {
        category: 'health',
        value: '365',
        unit: 'days',
        variant: 'positive',
      },
      {
        category: 'climate',
        value: '15',
        unit: 'hrs',
        variant: 'positive',
      },
      {
        category: 'ecosystem',
        value: '15',
        unit: 'min',
        variant: 'positive',
      },
      {
        category: 'water',
        value: '700',
        unit: 'days',
        variant: 'positive',
      },
      {
        category: 'waste',
        value: '20',
        unit: 'min',
        variant: 'positive',
      },
    ],
  },
  {
    cardImg: cardImg1,
    cardTitle: 'Carpool with someone',
    cardArr: [
      {
        category: 'health',
        value: '365',
        unit: 'days',
        variant: 'positive',
      },
      {
        category: 'climate',
        value: '15',
        unit: 'hrs',
        variant: 'positive',
      },
      {
        category: 'ecosystem',
        value: '15',
        unit: 'min',
        variant: 'positive',
      },
      {
        category: 'water',
        value: '700',
        unit: 'days',
        variant: 'positive',
      },
      {
        category: 'waste',
        value: '20',
        unit: 'min',
        variant: 'positive',
      },
    ],
  },
  {
    cardImg: cardImg1,
    cardTitle: 'Carpool with someone',
    cardArr: [
      {
        category: 'health',
        value: '365',
        unit: 'days',
        variant: 'positive',
      },
      {
        category: 'climate',
        value: '15',
        unit: 'hrs',
        variant: 'positive',
      },
      {
        category: 'ecosystem',
        value: '15',
        unit: 'min',
        variant: 'positive',
      },
      {
        category: 'water',
        value: '700',
        unit: 'days',
        variant: 'positive',
      },
      {
        category: 'waste',
        value: '20',
        unit: 'min',
        variant: 'positive',
      },
    ],
  },
  {
    cardImg: cardImg1,
    cardTitle: 'Carpool with someone',
    cardArr: [
      {
        category: 'health',
        value: '365',
        unit: 'days',
        variant: 'positive',
      },
      {
        category: 'climate',
        value: '15',
        unit: 'hrs',
        variant: 'positive',
      },
      {
        category: 'ecosystem',
        value: '15',
        unit: 'min',
        variant: 'positive',
      },
      {
        category: 'water',
        value: '700',
        unit: 'days',
        variant: 'positive',
      },
      {
        category: 'waste',
        value: '20',
        unit: 'min',
        variant: 'positive',
      },
    ],
  },
  {
    cardImg: cardImg1,
    cardTitle: 'Carpool with someone',
    cardArr: [
      {
        category: 'health',
        value: '365',
        unit: 'days',
        variant: 'positive',
      },
      {
        category: 'climate',
        value: '15',
        unit: 'hrs',
        variant: 'positive',
      },
      {
        category: 'ecosystem',
        value: '15',
        unit: 'min',
        variant: 'positive',
      },
      {
        category: 'water',
        value: '700',
        unit: 'days',
        variant: 'positive',
      },
      {
        category: 'waste',
        value: '20',
        unit: 'min',
        variant: 'positive',
      },
    ],
  },
  {
    cardImg: cardImg1,
    cardTitle: 'Carpool with someone',
    cardArr: [
      {
        category: 'health',
        value: '365',
        unit: 'days',
        variant: 'positive',
      },
      {
        category: 'climate',
        value: '15',
        unit: 'hrs',
        variant: 'positive',
      },
      {
        category: 'ecosystem',
        value: '15',
        unit: 'min',
        variant: 'positive',
      },
      {
        category: 'water',
        value: '700',
        unit: 'days',
        variant: 'positive',
      },
      {
        category: 'waste',
        value: '20',
        unit: 'min',
        variant: 'positive',
      },
    ],
  },
  {
    cardImg: cardImg1,
    cardTitle: 'Carpool with someone',
    cardArr: [
      {
        category: 'health',
        value: '365',
        unit: 'days',
        variant: 'positive',
      },
      {
        category: 'climate',
        value: '15',
        unit: 'hrs',
        variant: 'positive',
      },
      {
        category: 'ecosystem',
        value: '15',
        unit: 'min',
        variant: 'positive',
      },
      {
        category: 'water',
        value: '700',
        unit: 'days',
        variant: 'positive',
      },
      {
        category: 'waste',
        value: '20',
        unit: 'min',
        variant: 'positive',
      },
    ],
  },
]

const HeroTitle = styled(BlockTitleGreen)`
  margin-bottom: 24px;
`

const HeroText = styled(TextLarge)`
  margin-bottom: 24px;
`

const HeroButtons = styled.div`
  margin-top: 35px;
  display: flex;
  button {
    margin-right: 24px;
  }
`

const HeroImage = styled.div`
  text-align: right;
`

const Hero = styled.section`
  padding: 150px 0 200px;
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
`

const ActionsImage = styled.div`
  text-align: right;
`

const Actions = styled.section`
  position: relative;
  padding-top: 150px;
`

const AboutTitle = styled(BlockSubTitle)`
  text-align: center;
  margin-bottom: 75px;
`

const AboutText = styled(TextMediumGroup)`
  max-width: 480px;
`

const AboutImage = styled.div`
  text-align: right;
`

const AboutButtons = styled.div`
  margin-top: 40px;
`

const About = styled.section`
  padding: 140px 0;
`

const Clients = styled.section`
  padding: 60px 0;
`

const HomePage = () => {
  return (
    <Fragment>
      <Hero>
        <BlockContainer>
          <Row type="flex" justify="space-between" align="middle">
            <Col span={11}>
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
            <Col span={10}>
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
              <a href="#hp-actions">
                <ScrollButton>
                  <ExpandMoreIcon style={{ color: `${colors.dark}` }} />
                </ScrollButton>
              </a>
            </div>
          </Row>
        </BlockContainer>
      </ScrollToSection>

      <ScrollableAnchor id={'hp-actions'}>
        <Actions>
          <ActionsTop>
            <BlockContainer>
              <Row type="flex">
                <Col span={14}>
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
                <Col span={10}>
                  <ActionsImage>
                    <img src={hpActionImg} alt="" />
                  </ActionsImage>
                </Col>
              </Row>
            </BlockContainer>
          </ActionsTop>
          <ActionsCarousel actions={actions} />
        </Actions>
      </ScrollableAnchor>

      <About>
        <BlockContainer>
          <AboutTitle>
            <FormattedMessage id="app.homePage.aboutTitle" />
          </AboutTitle>

          <Row type="flex" align="middle" gutter={80}>
            <Col span={12}>
              <AboutImage>
                <img src={hpAboutImg} alt="hero" />
              </AboutImage>
            </Col>
            <Col span={12}>
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
                <Link to="/pages/our-vision">
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
          <Row type="flex" justify="center" align="middle" gutter={80}>
            <Col>
              <img src={client2} alt="logo" />
            </Col>
            <Col>
              <img src={client2} alt="logo" />
            </Col>
            <Col>
              <img src={client1} alt="logo" />
            </Col>
            <Col>
              <img src={client2} alt="logo" />
            </Col>
            <Col>
              <img src={client1} alt="logo" />
            </Col>
          </Row>
        </BlockContainer>
      </Clients>
    </Fragment>
  )
}

export default HomePage
