import React, { Component, Fragment } from 'react'
import { Row, Col, Button, Carousel } from 'antd'
import {
  FormattedMessage,
  FormattedHTMLMessage,
  injectIntl,
  intlShape,
} from 'react-intl'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { animateScroll } from 'react-scroll/modules'

import colors from 'config/colors'
import media from 'utils/mediaQueryTemplate'
import hexToRgba from 'utils/hexToRgba'
import { BlockContainer } from 'components/Styled'
import PageMetadata from 'components/PageMetadata'
import ActionCard from 'components/ActionCard'
import api from 'api'

import heroImg from 'assets/about-interface/hero.jpg'
import heroBoy from 'assets/about-interface/boy.svg'
import sliderArrow from 'assets/about-interface/arrow.svg'
import slide1 from 'assets/about-interface/actions-slide1.jpg'
import slide2 from 'assets/about-interface/actions-slide2.jpg'
import slide3 from 'assets/about-interface/actions-slide3.jpg'
import slide4 from 'assets/about-interface/actions-slide4.jpg'
import slide5 from 'assets/about-interface/actions-slide5.jpg'
import WhatAreHandprintsImg from 'assets/about-interface/what-are-handprints.jpg'
import bePartBg from 'assets/about-interface/be-part-bg.jpg'
import bePartImg from 'assets/about-interface/be-part-img.png'

const Title = styled.h2`
  font-family: Helvetica Neue;
  line-height: 46px;
  font-size: 37px;
  font-weight: 300;
  letter-spacing: -0.4px;
  margin-bottom: 0;
  color: ${colors.interfaceFooterColor2};
  ${media.phone`
    line-height: 31px;
    font-size: 22px;
    letter-spacing: 0px;
  `}
`
const Text = styled.p`
  margin-bottom: 30px;
  font-family: Helvetica Neue;
  line-height: 26px;
  font-size: 16px;
  color: ${colors.interfaceFooterColor2};
  &:last-of-type {
    margin-bottom: 0;
  }
  ${media.phone`
    margin-bottom: 0;
    text-align: center;
  `}
`

const Hero = styled.section`
  height: 496px;
  position: relative;
  background: url(${heroImg}) no-repeat center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    position: absolute;
    bottom: 0;
    left: calc((100% - 850px) / 2);
    ${media.desktop` 
        left: 46px;
      `}
    ${media.phone` 
      position: static;
        align-self: self-start;
        margin-left: 46px;
        margin-top: 24px;
      `}
  }

  ${media.phone`
      flex-direction: column;
    justify-content: flex-end;
      height: 450px;
      background-position: center;
  `}
`

const HeroTitle = styled.div`
  font-family: Helvetica Neue;
  font-weight: 300;
  line-height: 54px;
  font-size: 46px;
  text-align: center;
  color: ${colors.white};
  margin-bottom: 50px;
  max-width: 850px;
  ${media.desktop`
    max-width: 560px;
    margin-bottom: 30px;
    line-height: 46px;
    font-size: 37px;
    letter-spacing: -0.4px;
  `}
  ${media.phone`
    margin-bottom: 8px;
    line-height: 36px;
    font-size: 28px;
    letter-spacing: 0px;
    margin-bottom: 15px;
  `}
`

const GrayButton = styled(Button)`
  margin: 0 auto;
  border: 1px solid ${colors.interfaceLinkBg};
  background: ${colors.interfaceLinkBg};
  border-radius: 2px;
  font-family: Helvetica Neue;
  font-weight: 400;
  font-size: 16px;
  height: 40px;
  color: ${colors.white};
  &&:hover,
  &&:focus {
    background: transparent;
    border-color: ${colors.white};
    color: ${colors.white};
  }
`

const GrayButtonReversed = styled(GrayButton)`
  margin: 30px 0 0;
  border: 1px solid ${hexToRgba(colors.interfaceLinkBg, 0.4)};
  background: transparent;
  color: ${colors.interfaceLinkBg};
  &&:hover,
  &&:focus {
    background: ${colors.interfaceLinkBg};
    border-color: ${colors.white};
    color: ${colors.white};
  }
  ${media.phone`
    margin: 30px auto 0;
  `}
`

const ActionsTitle = styled(Title)`
  padding: 80px 0;
  margin: 0 auto;
  max-width: 650px;
  text-align: center;
  color: ${colors.interfaceColor};
  ${media.desktop`
    max-width: 100%;
  `}
  ${media.phone`
    padding: 60px 0;
  `}
`

const Slider = styled.div`
  .slick-arrow {
    z-index: 1;
    width: 51px;
    height: 51px;
    border-radius: 50px;
    top: 50%;
    transform: translateY(-50%);
    background: ${colors.red} url(${sliderArrow}) no-repeat center / 50%;
    &:hover,
    &:focus {
      background: ${colors.red} url(${sliderArrow}) no-repeat center / 50%;
    }
    ${media.phone`
      width: 30px;
      height: 30px;
     `}
    &.slick-prev {
      visibility: hidden;
      left: 35px;
      transform: rotate(180deg);
      ${media.desktop`
        visibility: visible;
      `}
      ${media.phone`
        left: 15px;
        transform: translateY(-50%) rotate(180deg);
      `}
    }
    &.slick-next {
      right: 35px;
      ${media.phone`
        right: 15px;
      `}
    }
  }
`
const Slide = styled.div`
  img {
    display: block;
    width: 324px;
    ${media.tablet`
      width: 100%;
      margin: 0 auto;
    `}
  }
`

const BePart = styled.section`
  margin: 70px 0 80px;
  padding: 40px 0;
  background: url(${bePartBg}) no-repeat center;
  background-size: cover;
  ${media.phone`
    padding: 60px 0;
    text-align: center;
 `}
`

const BePartBlock = styled(Col)`
  background: #fff;
  padding: 60px 50px 60px 100px;
  ${media.desktop`
    padding-top: 60px;
    padding-left: 80px;
 `}
  ${media.phone`
    text-align: center;
    padding: 40px 15px;
 `}
`

const BePartImg = styled(Col)`
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    max-width: 100%;
    margin-left: 25px;
  }
  ${media.phone`
    display: none;
 `}
`

const BePartTitle = styled.div`
  max-width: 270px;
  margin-bottom: 30px;
  font-family: Helvetica Neue;
  line-height: 36px;
  font-size: 28px;
  font-weight: 300;
  color: ${colors.interfaceColor};
  ${media.phone`
    max-width: 100%;
    line-height: 31px;
    font-size: 22px;
    margin-bottom: 15px;
  `}
`

const WhatAreHandprints = styled.div`
  background: ${colors.interfaceSectionBg};
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  ${media.phone`
    margin-left: -15px;
    margin-right: -15px;
  `}
`
const WhatAreHandprintsTitle = styled(Title)`
  margin-bottom: 30px;
  ${media.desktop`
   margin-bottom: 20px;
  `}
  ${media.phone`
   margin-bottom: 15px;
  `}
`
const WhatAreHandprintsContent = styled(Col)`
  display: flex;
  align-items: center;
  min-height: 620px;
  padding: 60px 0;
  > div {
    padding-right: 100px;
    padding-left: 50px;
  }
  strong {
    font-weight: normal;
  }
  ${media.desktop`
    > div {
      padding-left: 0;
      padding-right: 30px;
    }
  `}
  ${media.phone`
    padding: 30px 15px 50px;
    display: block;
    min-height: 0;
    text-align: center;
    > div {
      padding-right: 0;
    }
  `}
`

const ClimateFit = styled.section`
  padding: 80px 0;
  p${Text} {
    max-width: 480px;
    margin: 10px auto 20px;
    text-align: center;
  }
  ${GrayButtonReversed} {
    margin: 30px auto 0;
  }
  ${Title} {
    text-align: center;
    color: ${colors.interfaceColor};
  }
  ${media.desktop`
    padding: 80px 0 60px;
  `}
  ${media.phone`
    padding: 60px 0 30px;
     ${GrayButtonReversed} {
      margin-top: 50px;
      }
  `}
`

const SliderWrap = styled(Carousel)`
  margin-left: -10px;
  margin-right: -10px;
  .slick-dots {
    bottom: -14px;
    padding-right: 15px;
    padding-left: 15px;
    margin: 0;

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
        background: ${colors.red};
        button {
          background: transparent;
          width: 100%;
        }
      }
    }
  }
`

const MeasuringImpactsBlock = styled.div`
  background-color: ${colors.interfaceSectionBg};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  margin-top: 10px;
  color: ${colors.interfaceFooterColor};
  font-weight: 300;
  font-family: Helvetica Neue;
  ${media.phone`
    margin-top: 30px;
    padding: 30px 15px;
    flex-direction: column;
  `}
  ${GrayButtonReversed} {
    margin: 0;
  }
`

const MeasuringImpactsBlockTitle = styled.div`
  font-size: 28px;
  line-height: 36px;
  letter-spacing: 1px;
  ${media.largeDesktop`
    max-width: 60%;
  `}
  ${media.desktop`
    line-height: 26px;
    font-size: 16px;
    color: ${colors.interfaceFooterColor2};
  `}
  ${media.phone`
    max-width: 100%;
    margin-bottom: 30px;
    text-align: center;
  `}
`

const responsive = [
  {
    breakpoint: 769,
    settings: {
      slidesToShow: 1,
      variableWidth: false,
      infinite: true,
      centerMode: true,
      centerPadding: '25%',
    },
  },
  {
    breakpoint: 576,
    settings: {
      slidesToShow: 1,
      variableWidth: false,
      infinite: true,
      centerMode: false,
    },
  },
]

const responsive2 = [
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
class AboutInterfacePage extends Component {
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
        <PageMetadata pageName="aboutInterfacePage" />
        <Hero>
          <BlockContainer>
            <HeroTitle>
              <FormattedMessage id="app.aboutInterfacePage.hero.title" />
            </HeroTitle>
            <Link to="/pages/our-vision">
              <GrayButton type="ghost" size="large">
                <FormattedMessage id="app.aboutInterfacePage.hero.link" />
              </GrayButton>
            </Link>
          </BlockContainer>
          <img src={heroBoy} alt="" />
        </Hero>
        <section>
          <BlockContainer>
            <ActionsTitle>
              <FormattedMessage id="app.aboutInterfacePage.actions.title" />
            </ActionsTitle>
          </BlockContainer>
        </section>
        <Slider>
          <Carousel
            dots={false}
            arrows={true}
            variableWidth={true}
            responsive={responsive}
          >
            <Slide>
              <img src={slide1} alt="" />
            </Slide>
            <Slide>
              <img src={slide2} alt="" />
            </Slide>
            <Slide>
              <img src={slide3} alt="" />
            </Slide>
            <Slide>
              <img src={slide4} alt="" />
            </Slide>
            <Slide>
              <img src={slide5} alt="" />
            </Slide>
          </Carousel>
        </Slider>
        <BePart>
          <BlockContainer>
            <Row type="flex">
              <BePartBlock xs={24} md={18} xl={12}>
                <BePartTitle>
                  <FormattedMessage id="app.aboutInterfacePage.bePart.title" />
                </BePartTitle>
                <Text>
                  <FormattedMessage id="app.aboutInterfacePage.bePart.description" />
                </Text>
                <Link to="/pages/our-vision">
                  <GrayButtonReversed type="ghost" size="large">
                    <FormattedMessage id="app.aboutInterfacePage.bePart.link" />
                  </GrayButtonReversed>
                </Link>
              </BePartBlock>
              <BePartImg xs={24} md={6} xl={{ span: 10, offset: 2 }}>
                <img src={bePartImg} alt="" />
              </BePartImg>
            </Row>
          </BlockContainer>
        </BePart>
        <section>
          <BlockContainer>
            <WhatAreHandprints>
              <Row gutter={{ sm: 20 }} type="flex">
                <Col xs={24} sm={12}>
                  <img src={WhatAreHandprintsImg} alt="" />
                </Col>
                <WhatAreHandprintsContent xs={24} sm={12}>
                  <div>
                    <WhatAreHandprintsTitle>
                      <FormattedMessage id="app.aboutInterfacePage.whatAreHandprints.title" />
                    </WhatAreHandprintsTitle>
                    <Text>
                      <FormattedMessage id="app.aboutInterfacePage.whatAreHandprints.text1" />
                    </Text>
                    <Text>
                      <FormattedHTMLMessage id="app.aboutInterfacePage.whatAreHandprints.text2" />
                    </Text>
                    <Link to="/pages/our-vision">
                      <GrayButtonReversed type="ghost" size="large">
                        <FormattedMessage id="app.aboutInterfacePage.whatAreHandprints.link" />
                      </GrayButtonReversed>
                    </Link>
                  </div>
                </WhatAreHandprintsContent>
              </Row>
            </WhatAreHandprints>
          </BlockContainer>
        </section>
        <ClimateFit>
          <BlockContainer>
            <Title>
              <FormattedMessage id="app.aboutInterfacePage.climateFit.title" />
            </Title>
            <Text>
              <FormattedMessage id="app.aboutInterfacePage.climateFit.text" />
            </Text>
            <SliderWrap dots={false} slidesToShow={3} responsive={responsive2}>
              {actions.slice(0, 3).map(action => (
                <div key={action._id}>
                  <ActionCard
                    style={{ margin: '0 10px' }}
                    font={{
                      fontFamily: 'Helvetica Neue',
                      fontWeight: '300',
                      color: colors.interfaceFooterColor2,
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
            <MeasuringImpactsBlock>
              <MeasuringImpactsBlockTitle>
                <FormattedMessage id="app.aboutInterfacePage.measuringImpacts.title" />
              </MeasuringImpactsBlockTitle>

              <GrayButtonReversed>
                <Link to="/pages/measurement-units">
                  <FormattedMessage id="app.aboutInterfacePage.measuringImpacts.button" />
                </Link>
              </GrayButtonReversed>
            </MeasuringImpactsBlock>
          </BlockContainer>
        </ClimateFit>
      </Fragment>
    )
  }
}

AboutInterfacePage.propTypes = {
  intl: intlShape.isRequired,
}

export default injectIntl(AboutInterfacePage)
