import React, { Fragment } from 'react'
import { Row, Col, Carousel } from 'antd'
import { Link } from 'react-router-dom'
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl'
import styled from 'styled-components'
import { animateScroll, Link as AnchorLink } from 'react-scroll'

import colors from 'config/colors'
import media from 'utils/mediaQueryTemplate'
import {
  BlockContainer,
  BlockTitleGreen,
  BlockSubTitle,
  TextLarge,
  BlockSubTitleGreen,
  ScrollToSection,
  ScrollButton,
  TextMedium,
  TextMediumGroup,
  SlideDown,
  SecondaryButton,
  PrimaryButton,
} from 'components/Styled'

import PageMetadata from 'components/PageMetadata'
import ScrollAnimation from 'components/ScrollAnimation'
import ExpandMoreIcon from 'assets/icons/ExpandMoreIcon'

import heroImg from 'assets/for-organizations/organization.png'
import internalImg from 'assets/for-organizations/internal.png'
import externalImg from 'assets/for-organizations/external.png'
import leafImg from 'assets/for-organizations/leaf.png'

import ctaImg from 'assets/for-organizations/cta-image.png'

import ctaBg from '../../components/Cta/assets/cta-left-fingerprint.png'
import ctaBgRight from '../../components/Cta/assets/cta-right-fingerprint.png'

const sliderContent = [
  {
    title: <FormattedMessage id={`app.forOrganizations.slider.slide1.title`} />,
    text: <FormattedMessage id={`app.forOrganizations.slider.slide1.text`} />,
  },
  {
    title: <FormattedMessage id={`app.forOrganizations.slider.slide2.title`} />,
    text: <FormattedMessage id={`app.forOrganizations.slider.slide2.text`} />,
  },
  {
    title: <FormattedMessage id={`app.forOrganizations.slider.slide3.title`} />,
    text: <FormattedMessage id={`app.forOrganizations.slider.slide3.text`} />,
  },
  {
    title: <FormattedMessage id={`app.forOrganizations.slider.slide4.title`} />,
    text: <FormattedMessage id={`app.forOrganizations.slider.slide4.text`} />,
  },
  {
    title: <FormattedMessage id={`app.forOrganizations.slider.slide5.title`} />,
    text: <FormattedMessage id={`app.forOrganizations.slider.slide5.text`} />,
  },
  {
    title: <FormattedMessage id={`app.forOrganizations.slider.slide6.title`} />,
    text: <FormattedMessage id={`app.forOrganizations.slider.slide6.text`} />,
  },
]
const ImgWrapCentered = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const HeroSection = styled.section`
  padding: 130px 0 95px;
  ${media.largeDesktop`
    padding-bottom: 150px;
    .ant-row-flex {
      justify-content: center;
    }
  `};
  ${media.desktop`
    padding: 30px 0 90px;
    max-width: 630px;
    margin: 0 auto;
    text-align: center;
    .ant-row-flex {
      justify-content: center;
    }
  `};
  ${media.phone`
    padding-bottom: 70px;
  `};
`

const HeroText = styled(TextLarge)`
  max-width: 425px;
  ${media.desktop`
    margin: 20px auto 0;
  `};
  ${media.phone`
    display: none;
  `};
`

const HeroButton = styled.div`
  margin-top: 40px;
`

const HeroBlockImage = styled(ImgWrapCentered)`
  position: relative;
  left: -15px;
  ${media.largeDesktop`
    position: static;
    margin-top: 20px;
    img {
      max-width: 100%;
    }
  `};
  ${media.desktop`
    margin-top: 60px;
  `};
  ${media.phone`
    margin-top: 0;
    margin-bottom: 30px;
    img {
      width: 240px;
    }
  `};
`

const ExternalSection = styled.section`
  padding: 140px 0 30px;
  ${BlockSubTitleGreen} {
    margin-bottom: 40px;
    letter-spacing: 0;
  }
  ${media.desktop`
    padding: 130px 0 140px;
  `};
  ${media.phone`
    padding: 0 0 70px;
  `};
`

const ExternalContent = styled.div`
  ${media.desktop`
    max-width: 480px;
    margin: 0 auto 50px;
    text-align: center;
  `};
  ${media.phone`
    max-width: 100%;
    margin-bottom: 40px;
    text-align: left;
  `};
`

const ExternalBlockImage = styled.img`
  position: relative;
  top: 18px;
  left: 10px;
  ${media.largeDesktop`
    position: static;
    img {
      max-width: 100%;
    }
  `};
  ${media.desktop`
    max-width: 615px;
  `};
  ${media.phone`
    display: none;
  `};
`

const MobileImg = styled.img`
  display: none;
  max-width: 100%;
  ${media.phone`
    display: block;
  `};
`

const InternalBlockImage = styled.img`
  position: relative;
  top: -30px;
  ${media.largeDesktop`
    position: static;
    max-width: 100%;
  `};
`

const InternalContent = styled.div`
  ${media.desktop`
    max-width: 480px;
    margin: 0 auto 50px;
    text-align: center;
  `};
  ${media.phone`
    max-width: 100%;
    margin-bottom: 40px;
    text-align: left;
  `};
`

const InternalSection = styled.section`
  padding-top: 205px;
  ${BlockSubTitleGreen} {
    margin-bottom: 40px;
    letter-spacing: 0;
  }
  ${media.largeDesktop`
    .ant-row-flex {
      justify-content: center;
    }
  `};
  ${media.desktop`
    padding-bottom: 140px;
  `};
  ${media.phone`
    padding-bottom: 70px;
  `};
`

const HandprintSection = styled.section`
  padding-top: 140px;
  padding-bottom: 320px;
  ${BlockSubTitle} {
    letter-spacing: 0;
  }
  ${media.largeDesktop`
    .ant-row-flex {
      justify-content: center;
    }
  `};
  ${media.desktop`
    padding: 120px 0 160px;
    ${MobileImg} {
      display: block;
    }
  `};
  ${media.phone`
    padding: 70px 0 150px;
    .ant-row-flex {
      justify-content: stretch;
      > div {
        width: 100%;
      }
    }
  `};
`

const BlockHeader = styled.div`
  text-align: center;
  padding-bottom: 80px;
  p {
    max-width: 600px;
    margin-left: auto;
    margin-right: auto;
  }
  ${media.desktop`
    max-width: 480px;
    margin: 0 auto 50px;
    padding-bottom: 0;
  `};
  ${media.phone`
    max-width: 100%;
    margin-bottom: 40px;
  `};
`

const CtaTitle = styled(BlockSubTitle)`
  color: ${colors.white};
  margin-bottom: 26px;
  letter-spacing: 0;
`

const CtaImage = styled.img`
  position: absolute;
  right: 10px;
  bottom: 0;
`

const CtaWrap = styled.section`
  position: relative;
  background: url("${ctaBg}") no-repeat left center, ${
  colors.ocean
} url("${ctaBgRight}") no-repeat right center;
 ${media.desktop`
   text-align: center;
   `};
  ${media.phone`
    a,
    ${PrimaryButton}{
      width: 100%;
    }
  `};

`

const Wrap = styled(BlockContainer)`
  padding-top: 80px;
  padding-bottom: 80px;
  ${media.desktop`
    display: flex;
    flex-direction: column;
    align-items: center;
  `};
  ${media.phone`
    padding-top: 40px;
    padding-bottom: 40px;
    ${CtaTitle} {
      font-size: 22px;
      margin-bottom: 20px;
    }
  `};
`

const SliderControls = styled.div`
  padding: 50px 0 30px;
  background: ${colors.ocean};
  box-shadow: 0px 1px 30px rgba(52, 68, 66, 0.08);
  border-radius: 4px 0 0 4px;
  min-width: 400px;
`

const SliderControlsItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  color: #fff;
  cursor: pointer;
`

const SliderControlsNumber = styled.span`
  border-radius: 0px 4px 4px 0px;
  font-weight: bold;
  width: 40px;
  line-height: 27px;
  padding-left: 20px;
  margin-right: 20px;
  background: rgba(255, 255, 255, 0.17);
  .current-slide & {
    background: ${colors.green};
  }
`

const SliderControlsCaption = styled.span`
  font-size: 16px;
  opacity: 0.7;
  transition: opacity 0.3s;
  .current-slide & {
    opacity: 1;
  }
`
const StyledCarousel = styled(Carousel)`
  padding: 60px;
  background: #fff url(${leafImg}) no-repeat bottom 60px right 60px;
  width: 580px;
  height: 638px;
  box-shadow: 0px 1px 10px rgba(52, 68, 66, 0.08);
  border-radius: 4px;
`

const SliderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: -320px;
`

const SliderTitle = styled.h3`
  font-size: 22px;
  line-height: 30px;
  margin-bottom: 10px;
`

const SliderSection = styled.section`
  padding-bottom: 180px;
  height: 500px;
  background: ${colors.lightGray};
`

export default class ForOrganizationsPage extends React.PureComponent {
  constructor(props) {
    super(props)

    this.state = {
      currentSlide: 0,
    }
  }

  componentDidMount() {
    animateScroll.scrollToTop()
  }

  gotoSlide = slideIndex => {
    this.carousel.goTo(slideIndex)
    this.setState({ currentSlide: slideIndex })
  }

  render() {
    return (
      <Fragment>
        <PageMetadata pageName="forOrganizationsPage" />
        <HeroSection>
          <BlockContainer>
            <Row gutter={{ md: 20 }} type="flex" align="middle">
              <Col xs={{ order: 2 }} md={{ order: 1 }} xl={12}>
                <ScrollAnimation bottom>
                  <BlockTitleGreen>
                    <FormattedHTMLMessage id="app.forOrganizations.Hero.Title" />
                  </BlockTitleGreen>
                  <HeroText>
                    <FormattedMessage id="app.forOrganizations.Hero.Text" />
                  </HeroText>
                  <HeroButton>
                    <Link to="/">
                      <SecondaryButton>
                        <FormattedMessage id="app.forOrganizations.Hero.Link" />
                      </SecondaryButton>
                    </Link>
                  </HeroButton>
                </ScrollAnimation>
              </Col>
              <Col xs={{ order: 1 }} md={{ order: 2 }} xl={12}>
                <ScrollAnimation bottom>
                  <HeroBlockImage>
                    <img src={heroImg} alt="" />
                  </HeroBlockImage>
                </ScrollAnimation>
              </Col>
            </Row>
          </BlockContainer>
        </HeroSection>
        <ScrollToSection>
          <BlockContainer>
            <Row>
              <p>
                <FormattedMessage id="app.forOrganizations.ScrollText" />
              </p>
              <SlideDown>
                <AnchorLink to="anchor" spy={true} smooth={true} duration={500}>
                  <ScrollButton>
                    <ExpandMoreIcon />
                  </ScrollButton>
                </AnchorLink>
              </SlideDown>
            </Row>
          </BlockContainer>
        </ScrollToSection>

        <InternalSection id="anchor">
          <BlockContainer>
            <Row gutter={{ md: 20 }} type="flex" align="middle">
              <Col xs={{ order: 2 }} xl={{ span: 12, order: 1 }}>
                <ScrollAnimation bottom>
                  <InternalBlockImage src={internalImg} alt="" />
                </ScrollAnimation>
              </Col>
              <Col xs={{ order: 1 }} xl={{ span: 10, order: 2 }}>
                <ScrollAnimation bottom>
                  <InternalContent>
                    <BlockSubTitleGreen>
                      <FormattedHTMLMessage id="app.forOrganizations.Internal.Title" />
                    </BlockSubTitleGreen>
                    <TextMediumGroup>
                      <FormattedHTMLMessage id="app.forOrganizations.Internal.Text1" />
                    </TextMediumGroup>
                    <TextMediumGroup>
                      <FormattedHTMLMessage id="app.forOrganizations.Internal.Text2" />
                    </TextMediumGroup>
                  </InternalContent>
                </ScrollAnimation>
              </Col>
            </Row>
          </BlockContainer>
        </InternalSection>

        <ExternalSection>
          <BlockContainer>
            <Row gutter={{ md: 20 }}>
              <Col xl={10}>
                <ScrollAnimation bottom>
                  <ExternalContent>
                    <BlockSubTitleGreen>
                      <FormattedHTMLMessage id="app.forOrganizations.External.Title" />
                    </BlockSubTitleGreen>
                    <TextMediumGroup>
                      <FormattedHTMLMessage id="app.forOrganizations.External.Text1" />
                    </TextMediumGroup>
                    <TextMediumGroup>
                      <FormattedHTMLMessage id="app.forOrganizations.External.Text2" />
                    </TextMediumGroup>
                    <TextMediumGroup>
                      <FormattedHTMLMessage id="app.forOrganizations.External.Text3" />
                    </TextMediumGroup>
                  </ExternalContent>
                </ScrollAnimation>
              </Col>
              <Col xl={14}>
                <ScrollAnimation bottom>
                  <ImgWrapCentered>
                    <ExternalBlockImage src={externalImg} alt="" />
                  </ImgWrapCentered>
                </ScrollAnimation>
              </Col>
            </Row>
          </BlockContainer>
        </ExternalSection>

        <HandprintSection>
          <BlockContainer>
            <ScrollAnimation bottom>
              <BlockHeader>
                <Row type="flex" justify="center">
                  <Col xl={16}>
                    <BlockSubTitle>
                      <FormattedMessage id="app.forOrganizations.Handprint.Title" />
                    </BlockSubTitle>
                    <TextMedium>
                      <FormattedMessage id="app.forOrganizations.Handprint.Text" />
                    </TextMedium>
                  </Col>
                </Row>
              </BlockHeader>
            </ScrollAnimation>
          </BlockContainer>
        </HandprintSection>
        <SliderSection>
          <BlockContainer>
            <SliderWrapper>
              <SliderControls>
                {sliderContent.map((slide, index) => {
                  return (
                    <SliderControlsItem
                      key={index}
                      className={
                        index === this.state.currentSlide ? 'current-slide' : ''
                      }
                      onClick={() => this.gotoSlide(index)}
                    >
                      <SliderControlsNumber>{index + 1}</SliderControlsNumber>
                      <SliderControlsCaption>
                        {slide.title}
                      </SliderControlsCaption>
                    </SliderControlsItem>
                  )
                })}
              </SliderControls>
              <StyledCarousel
                {...this.props}
                ref={node => (this.carousel = node)}
                dots={false}
                effect="fade"
                infinite={false}
              >
                {sliderContent.map((slide, index) => (
                  <div key={index}>
                    <SliderTitle>{slide.title}</SliderTitle>
                    <TextMedium>{slide.text}</TextMedium>
                  </div>
                ))}
              </StyledCarousel>
            </SliderWrapper>
          </BlockContainer>
        </SliderSection>
        <CtaWrap>
          <Wrap>
            <CtaTitle>
              <FormattedMessage id="app.forOrganizations.Cta.Title" />
            </CtaTitle>
            <Link to="/">
              <PrimaryButton type="primary" size="large">
                <FormattedMessage id="app.forOrganizations.Cta.Link" />
              </PrimaryButton>
            </Link>
            <CtaImage src={ctaImg} alt="cta image" />
          </Wrap>
        </CtaWrap>
      </Fragment>
    )
  }
}
