import React, { Component, Fragment } from 'react'
import { Button, Row, Col, Carousel } from 'antd'
import styled from 'styled-components'
import {
  FormattedMessage,
  FormattedHTMLMessage,
  injectIntl,
  intlShape,
} from 'react-intl'
import { animateScroll, Link as AnchorLink } from 'react-scroll'

import ExpandMoreIcon from '../../assets/icons/ExpandMoreIcon'
import { BlockContainer } from './../../components/Styled'
import colors from './../../config/colors'
import media from './../../utils/mediaQueryTemplate'
import heroImg from './../../assets/about-eaton/BecomeGuardian.jpg'
import heroTablet from './../../assets/about-eaton/heroTablet.jpg'
import instagramImg from './../../assets/about-eaton/insta_photos.png'
import BecomeGuardianImg from './../../assets/about-eaton/bc.jpg'
import { Link } from 'react-router-dom'
import api from './../../api'
import PageMetadata from '../../components/PageMetadata'
import ActionCard from '../../components/ActionCard'

const Hero = styled.section`
  position: relative;
  display: flex;
  align-items: center;
  text-align: center;
  height: 520px;
  background: url(${heroImg}) no-repeat center;
  background-size: cover;
  font-family: Arial;
  color: ${colors.white};
  button {
    margin-left: auto;
    margin-right: auto;
  }
  .anticon svg {
    width: 36px;
    height: 36px;
  }
  ${media.desktop`
    background-image: url(${heroTablet});
  `}
  ${media.desktop`
    height: 480px;
  `}
`
const HeroTitle = styled.h1`
  line-height: 68px;
  font-size: 50px;
  font-weight: 400;
  letter-spacing: -1px;
  max-width: 600px;
  margin: 0 auto 10px;
  color: inherit;
  ${media.desktop`
    font-size: 41px;
    line-height: 47px;
    margin-bottom: 20px;
  `}
  ${media.phone`
    font-size: 34px;
    line-height: 40px;
  `}
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
  max-width: 600px;
  min-width: 280px;
  height: 70px;
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
  ${media.phone`
    height: 50px;
    width: 100%;
  `}
`

const BlueBorderedButton = styled(WhiteBorderedButton)`
  border: 2px solid ${colors.darkBlue};
  color: ${colors.darkBlue};
  &&:hover,
  &&:focus {
    border-color: ${colors.darkBlue};
    background: ${colors.darkBlue};
    color: ${colors.white};
    }
  }
`
const ScrollToSection = styled.span`
  position: absolute;
  left: 0;
  width: 100%;
  bottom: 40px;
  display: block;
  text-align: center;
  margin-top: 95px;
  ${media.phone`
    height: 0;
    opacity: 0;
  `}
`

const GrowHandprint = styled.section`
  font-family: Arial;
  margin: 40px 0;
  padding: 80px 0;
  background: ${colors.darkBlue};
  color: ${colors.white};
  ${media.phone`
    padding: 40px 0;
  `}
`
const Text = styled.div`
  line-height: 32px;
  font-size: 20px;
  ${media.phone`
    line-height: 24px;
    font-size: 16px;
  `}
`

const SubHeading = styled.div`
  porision: relative;
  line-height: 36px;
  font-size: 28px;
  margin-bottom: 30px;
  ${media.desktop`
    line-height: 36px;
    font-size: 28px;
  `}
  ${media.phone`
    line-height: 30px;
    font-size: 22px;
  `}
`

const WhatAreHandprints = styled.section`
  font-family: Arial;
  padding: 80px 0;
  color: ${colors.eatonColor};
   ${media.phone`
    padding: 40px 0;
  `}
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
      ${media.phone`
        bottom: -30px;
      `}
    }
  }
  ${BlueBorderedButton} {
    margin-top: 30px;
  }
`

const Instagram = styled.section`
  height: 500px;
  background: url(${instagramImg}) no-repeat center;
  background-size: cover;
`

const BecomeGuardian = styled.section`
  min-height: 480px;
  padding: 150px 0 200px;
  display: flex;
  align-items: center;
  text-align: center;
  background: url(${BecomeGuardianImg}) no-repeat center;
  background-size: cover;
  color: ${colors.white};
  font-family: Arial;
  text-align: center;
  ${media.desktop`
    background-position: -150px center;
  `}
  ${media.phone`
    min-height: 0;
    display: block;
    padding-top: 60px;
    padding-bottom: 230px;
    background-position: -200px center;
  `}
`
const BecomeGuardianTitle = styled.div`
  line-height: 50px;
  font-size: 40px;
  letter-spacing: -1px;
  margin-bottom: 20px;
  ${media.desktop`
    font-size: 36px;
  `}
  ${media.phone`
    margin-bottom: 25px;
    line-height: 40px;
    font-size: 34px;
  `}
`
const BecomeGuardianDescription = styled.div`
  line-height: 29px;
  font-size: 18px;
  max-width: 500px;
  margin: 0 auto;
`

const SliderWrap = styled(Carousel)`
  margin-left: -10px;
  margin-right: -10px;
  margin-bottom: 30px;
  .slick-dots {
    bottom: -14px;
    padding-right: 15px;
    margin: 0;
    ${media.phone`
    bottom: -30px;
  `}

    li {
      height: 8px;
      width: 8px;
      margin: 0 5px;
      background: ${colors.darkGray};
      border-radius: 50%;

      button {
        font-size: 0;
        height: 100%;
        width: 100%;
        background: transparent;
        border: none;
        opacity: 1;
      }
      &.slick-active {
        background: ${colors.darkBlue};
        button {
          background: transparent;
          width: 100%;
        }
      }
    }
  }
`

const Actions = styled.section`
  height: 455px;
  background: ${colors.white};
  .ant-btn {
    margin-left: auto;
    margin-right: auto;
  }
  ${BlockContainer} {
    top: -100px;
  }
  ${media.phone`
    height: 345px;
    ${BlockContainer} {
      top: -200px;
    }
    .ant-btn {
      margin-top: 60px;
    }
  `}
`

const responsive = [
  {
    breakpoint: 1201,
    settings: {
      slidesToShow: 2,
    },
  },
  {
    breakpoint: 767,
    settings: {
      slidesToShow: 1,
      dots: true,
    },
  },
]

class AboutEatonPage extends Component {
  state = {
    actions: [],
  }

  componentDidMount = async () => {
    animateScroll.scrollToTop()

    const {
      actions: { docs: actions },
    } = await api.getActions()
    this.setState({ actions })
  }

  render() {
    const {
      intl: { locale, formatRelative },
    } = this.props
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
          <ScrollToSection>
            <AnchorLink to="anchor" spy={true} smooth={true} duration={500}>
              <ExpandMoreIcon style={{ color: `${colors.white}` }} />
            </AnchorLink>
          </ScrollToSection>
        </Hero>
        <GrowHandprint id="anchor">
          <BlockContainer>
            <Row gutter={{ md: 20 }}>
              <Col md={12} xl={9}>
                <SubHeading>
                  <FormattedMessage id="app.aboutEatonPage.growYourHandprint.title" />
                </SubHeading>
              </Col>
              <Col md={12} xl={{ span: 12, offset: 3 }}>
                <Text>
                  <FormattedHTMLMessage id="app.aboutEatonPage.growYourHandprint.description" />
                </Text>
              </Col>
            </Row>
          </BlockContainer>
        </GrowHandprint>
        <Instagram />
        <WhatAreHandprints>
          <BlockContainer>
            <Row gutter={{ md: 20 }}>
              <Col md={24} xl={10}>
                <SubHeading>
                  <FormattedMessage id="app.aboutEatonPage.whatAreHandprints.title" />
                </SubHeading>
              </Col>
              <Col md={24} xl={{ span: 12, offset: 2 }}>
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
        <Actions>
          <BlockContainer>
            <SliderWrap dots={false} slidesToShow={3} responsive={responsive}>
              {actions.slice(0, 3).map(action => (
                <div key={action._id}>
                  <ActionCard
                    style={{ margin: '0 10px' }}
                    font={{
                      fontFamily: 'Arial',
                      fontWeight: '700',
                      color: colors.darkBlue,
                    }}
                    to={`/pages/home/actions/${action.slug}`}
                    picture={action.picture}
                    name={action.translatedName[locale] || action.name}
                    impacts={action.impacts}
                    suggestedBy={action.suggestedBy}
                    suggestedAt={formatRelative(action.suggestedAt)}
                  />
                </div>
              ))}
            </SliderWrap>
            <Link to="/actions">
              <BlueBorderedButton type="ghost" size="large">
                <FormattedMessage id="app.aboutEatonPage.actions.link" />
              </BlueBorderedButton>
            </Link>
          </BlockContainer>
        </Actions>
      </Fragment>
    )
  }
}

AboutEatonPage.propTypes = {
  intl: intlShape.isRequired,
}

export default injectIntl(AboutEatonPage)
