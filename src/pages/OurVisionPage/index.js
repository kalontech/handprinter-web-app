import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Row, Col } from 'antd'
import styled from 'styled-components'
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl'
import { animateScroll } from 'react-scroll'
import PropTypes from 'prop-types'
import ModalVideo from 'react-modal-video'
import { compose } from 'redux'
import { connect } from 'react-redux'

import 'react-modal-video/css/modal-video.min.css'

import WatchVideoIcon from 'assets/icons/WatchVideoIcon'
import EatonBrandedBlock from 'components/EatonBrandedBlock'

import heroBg from 'assets/our-vision/hero-bg.jpg'
import planet from 'assets/our-vision/planet.png'
import aboutImg1 from 'assets/our-vision/section2.1.png'
import aboutImg2 from 'assets/our-vision/section2.2.png'
import aboutImg3 from 'assets/our-vision/section2.3.png'
import aboutImg4 from 'assets/our-vision/section2.4.png'
import footBg from 'assets/our-vision/foot.svg'
import handBg from 'assets/our-vision/handprint.svg'
import quote from 'assets/our-vision/quote.svg'
import num1 from 'assets/our-vision/number-1.svg'
import num2 from 'assets/our-vision/number-2.svg'
import num3 from 'assets/our-vision/number-3.svg'
import num4 from 'assets/our-vision/number-4.svg'
import num5 from 'assets/our-vision/number-5.svg'
import num6 from 'assets/our-vision/number-6.svg'
import stepsImg1 from 'assets/our-vision/section1.png'
import eatonStepsImg1 from 'assets/our-vision/eaton_section1.png'
import stepsImg2 from 'assets/our-vision/section2.png'
import stepsImg3a from 'assets/our-vision/section3.1.png'
import stepsImg3b from 'assets/our-vision/section3.2.png'
import stepsImg3c from 'assets/our-vision/section3.3.png'
import stepsImg4 from 'assets/our-vision/section4.png'
import eatonStepsImg4 from 'assets/our-vision/eaton_section4.png'
import stepsImg5 from 'assets/our-vision/section5.png'
import eatonStepsImg5 from 'assets/our-vision/eaton_section5.png'
import stepsImg6 from 'assets/our-vision/section6.png'
import arrow from 'assets/our-vision/arrow.png'
import FingerPrintIcon from 'assets/icons/FingerPrintIcon'

import media from 'utils/mediaQueryTemplate'
import colors from 'config/colors'
import {
  PrimaryButton,
  BlockContainer,
  BlockTitle,
  BlockSubTitle,
  TextLarge,
  TextMedium,
  SecondaryButton,
  VideoModalWrap,
} from 'components/Styled'
import PageMetadata from 'components/PageMetadata'
import ImpactCarousel from 'components/ImpactCarousel'
import ActionsCarousel from 'components/ActionsCarousel'
import ScrollAnimation from 'components/ScrollAnimation'
import * as api from 'api/actions'

const OurVisionWrap = styled.div`
  background: ${colors.white};
`

const TitleGreen = styled(BlockTitle)`
  strong {
    color: ${colors.green};
  }
`

const SubtitleGreen = styled(BlockSubTitle)`
  max-width: 700px;
  margin: 0 auto;

  strong {
    font-weight: bold;
    color: ${colors.green};
  }
`
const SubtitleGray = styled(BlockSubTitle)`
  strong {
    color: ${colors.darkGray};
  }
`

const SubtitleCentered = styled.div`
  padding-top: 140px;
  padding-bottom: 80px;
  text-align: center;

  ${media.tablet`
    padding-top: 75px;  
  `}

  ${media.phone`
    padding-bottom: 20px;  
  `}
`

const SubtitleCenteredSm = styled(SubtitleCentered)`
  margin: 0 auto;
  padding-bottom: 65px;
  max-width: 620px;
`

const HeadingH3 = styled.h3`
  font-size: 22px;
  line-height: 1.23;
  margin-bottom: 16px;
  font-weight: normal;
`

const Hero = styled.section`
  padding-top: 115px;
  text-align: center;
`

const HeroTitle = styled(TitleGreen)`
  margin: 20px auto 24px;
  max-width: 760px;
`

const HeroBg = styled.img`
  margin-top: -95px;
  display: block;
  width: 100%;
`

const HeroButton = styled.div`
  .ant-btn {
    margin-top: 40px;
    display: inline-flex;
  }
`

const AboutContainer = styled.section`
  position: relative;
  padding-top: 80px;
  padding-bottom: 60px;
  background: ${colors.lightGray} url(${footBg}) no-repeat left
    calc(50% + 480px) top 15px;

  .about__text {
    max-width: 500px;
  }
`

const Quote = styled.img`
  display: block;
  margin: 0 auto 24px;
`

const WhatContainer = styled.div`
  position: relative;
  padding: 80px 0;
  background: ${colors.lightGray} url(${handBg}) no-repeat left
    calc(50% - 370px) bottom -38px;

  .ant-btn {
    margin-top: 20px;
  }

  ${media.phone`
    padding: 48px 0;

    button {
      width: 100%;
    }
  `}
`

const Steps = styled.article`
  position: relative;
`

const Step = styled.section`
  padding-bottom: 200px;
  ${SubtitleGreen} {
    margin-bottom: 25px;
  }
  ${media.desktop`

    padding-bottom: 90px;

    h3, p {
      text-align: center;
    }
    
    p {
      margin-bottom: 50px;
    }
  `}

  ${media.phone`
    p {
      margin-bottom: 24px;
    }
  `}
`

const StepImg = styled.img`
  max-width: 100%;
  max-height: 100%;

  ${media.desktop`
    display: block;
    margin: 0 auto;
  `}

  ${media.phone`
    max-width: 310px;
    max-height: 268px;
  `}
`

const Step2Img = styled(StepImg)`
  top: 20px;
  position: relative;

  ${media.desktop`
    margin-bottom: 20px;
    top: 0;
  `}
`

const Step3 = styled(Step)`
  text-align: center;
  padding-bottom: 190px;

  img[alt='3'] {
    margin: 0 auto;
  }
`

const ImgWrap = styled.div`
  display: flex;
  justify-content: flex-end;
`

const Number = styled.img`
  padding-bottom: 35px;
  display: block;

  ${media.desktop`
    margin: 0 auto;
  `}
`

const StepsScheme = styled.div`
  padding-top: 150px;

  p {
    max-width: 240px;
    margin: 0 auto;
    line-height: 1.43;
  }

  ${media.desktop`
    padding-top: 50px;  
  `}

  ${media.tablet`
    padding-top: 0;  
  `}
`

const KittensWrap = styled.div`
  ${media.tablet`
    margin-bottom: 50px;  
  `}
`

const StepsSchemeImg = styled.div`
  height: 283px;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  margin-bottom: 20px;
  position: relative;

  ::before {
    position: absolute;
    left: 100%;
    top: 0;
    content: url(${arrow});
    transform: translate(-50%);
    display: ${({ isLast }) => (isLast ? 'none' : 'block')} ${media.tablet`
      display: none
    `};
  }

  img {
    display: block;
    margin: 0 auto;
    max-width: 100%;
    max-height: 100%;
  }
`

const SliderHeading = styled.div`
  padding: 130px 0;
  text-align: center;

  ${media.tablet`
    padding: 75px 0;
  `}

  p {
    margin: 20px auto 0;
    max-width: 700px;
  }
`

const StepFourScreenshotWrap = styled(StepImg)`
  position: relative;
  top: 5px;
  left: 20px;

  ${media.phone`
    top: 0;
    left: 5px;
  `}
`

const StepFourContentWrap = styled.div`
  position: relative;
  top: 2px;
  img {
    padding-bottom: 38px;
  }
`

const StepSixImage = styled(StepImg)`
  position: relative;
  left: 30px;

  ${media.desktop`
    left: 0;
  `}
`

const StepSixContentWrap = styled(StepFourContentWrap)`
  top: 31px;
  left: -1px;
`

const EatonBrandedBlockWrap = styled.div`
  padding: 75px 0;
`

class OurVisionPage extends React.PureComponent {
  static propTypes = {
    overrides: PropTypes.object,
    user: PropTypes.object,
  }

  static defaultPropss = {
    overrides: {},
    user: null,
  }

  state = {
    actions: [],
    isOpen: false,
  }

  openModal = () => {
    this.setState({ isOpen: true })
  }

  async componentDidMount() {
    animateScroll.scrollToTop()

    const {
      actions: { docs: actions },
    } = await api.getActions()

    this.setState({ actions })
  }

  render = () => {
    const { actions } = this.state
    const { overrides, user } = this.props

    return (
      <Fragment>
        <PageMetadata pageName="ourVision" />
        <OurVisionWrap>
          <Hero>
            <BlockContainer>
              <Row type="flex" justify="center">
                <Col span={18}>
                  <ScrollAnimation bottom>
                    <img src={planet} alt="healthy Earth" />
                  </ScrollAnimation>
                  <ScrollAnimation bottom delay={100}>
                    <HeroTitle>
                      <FormattedHTMLMessage id="app.ourVision.hero.title" />
                    </HeroTitle>
                  </ScrollAnimation>
                  <ScrollAnimation bottom delay={200}>
                    <TextLarge>
                      <FormattedMessage id="app.ourVision.hero.text" />
                    </TextLarge>
                  </ScrollAnimation>
                  <ScrollAnimation bottom delay={300}>
                    <HeroButton>
                      <SecondaryButton onClick={this.openModal}>
                        <WatchVideoIcon />
                        <FormattedMessage id="app.button.video" />
                      </SecondaryButton>
                    </HeroButton>
                  </ScrollAnimation>
                </Col>
              </Row>
            </BlockContainer>
            <HeroBg src={heroBg} alt="" />
          </Hero>

          {overrides && overrides.brandName === 'Eaton' && (
            <EatonBrandedBlockWrap>
              <EatonBrandedBlock isLoggedIn={Boolean(user)} />
            </EatonBrandedBlockWrap>
          )}

          <section>
            <BlockContainer>
              <Row type="flex" justify="center">
                <Col span={18}>
                  <ScrollAnimation>
                    <SubtitleCenteredSm>
                      <SubtitleGray>
                        <FormattedHTMLMessage id="app.ourVision.about.title" />
                      </SubtitleGray>
                    </SubtitleCenteredSm>
                  </ScrollAnimation>
                </Col>
              </Row>
            </BlockContainer>
            <AboutContainer>
              <BlockContainer>
                <Row type="flex" align="middle">
                  <Col span={16}>
                    <ScrollAnimation bottom>
                      <HeadingH3>
                        <FormattedMessage id="app.ourVision.negativeImpacts.title" />
                      </HeadingH3>
                      <TextMedium className="about__text">
                        <FormattedMessage id="app.ourVision.negativeImpacts.text" />
                      </TextMedium>
                    </ScrollAnimation>
                  </Col>
                </Row>
                <ScrollAnimation delay={200}>
                  <ImpactCarousel
                    list={[
                      {
                        src: aboutImg1,
                        title: 'app.ourVision.negativeImpactsItem1.title',
                        text: 'app.ourVision.negativeImpactsItem1.text',
                      },
                      {
                        src: aboutImg2,
                        title: 'app.ourVision.negativeImpactsItem2.title',
                        text: 'app.ourVision.negativeImpactsItem2.text',
                      },
                      {
                        src: aboutImg3,
                        title: 'app.ourVision.negativeImpactsItem3.title',
                        text: 'app.ourVision.negativeImpactsItem3.text',
                      },
                      {
                        src: aboutImg4,
                        title: 'app.ourVision.negativeImpactsItem4.title',
                        text: 'app.ourVision.negativeImpactsItem4.text',
                      },
                    ]}
                  />
                </ScrollAnimation>
              </BlockContainer>
            </AboutContainer>
          </section>
          <section>
            <BlockContainer>
              <Row type="flex" justify="center">
                <Col span={21}>
                  <ScrollAnimation bottom>
                    <SliderHeading>
                      <BlockSubTitle>
                        <FormattedHTMLMessage id="app.ourVision.slider.title" />
                      </BlockSubTitle>
                      <TextMedium>
                        <FormattedMessage id="app.ourVision.slider.text" />
                      </TextMedium>
                    </SliderHeading>
                  </ScrollAnimation>
                </Col>
              </Row>
            </BlockContainer>
            <ScrollAnimation delay={200}>
              <ActionsCarousel
                extraLink
                actions={actions}
                actionLinkPrefix="/pages/our-vision/actions"
              />
            </ScrollAnimation>
          </section>

          <section>
            <BlockContainer>
              <Row type="flex" justify="center">
                <Col span={21}>
                  <ScrollAnimation bottom>
                    <SubtitleCentered>
                      <Quote src={quote} alt="" />
                      <SubtitleGreen>
                        <FormattedHTMLMessage id="app.ourVision.what.title" />
                      </SubtitleGreen>
                    </SubtitleCentered>
                  </ScrollAnimation>
                </Col>
              </Row>
            </BlockContainer>

            <WhatContainer>
              <BlockContainer>
                <Row gutter={20}>
                  <Col
                    sm={{ span: 9, offset: 12 }}
                    xs={{ span: 24, offset: 0 }}
                  >
                    <ScrollAnimation bottom>
                      <HeadingH3>
                        <FormattedMessage id="app.ourVision.what.subtitle" />
                      </HeadingH3>
                      <TextMedium>
                        <FormattedMessage id="app.ourVision.what.text" />
                      </TextMedium>
                      <Link to="/account/register">
                        <PrimaryButton type="primary">
                          <FingerPrintIcon />
                          <FormattedMessage id="app.ourVision.what.link" />
                        </PrimaryButton>
                      </Link>
                    </ScrollAnimation>
                  </Col>
                </Row>
              </BlockContainer>
            </WhatContainer>
          </section>

          <Steps>
            <BlockContainer>
              <SubtitleCentered>
                <BlockSubTitle>
                  <FormattedMessage id="app.ourVision.steps.title" />
                </BlockSubTitle>
              </SubtitleCentered>

              <Step>
                <Row gutter={20} type="flex" align="middle" justify="center">
                  <Col lg={{ span: 10 }} md={{ span: 22 }}>
                    <ScrollAnimation bottom>
                      <Number src={num1} alt="1" />
                      <SubtitleGreen as="h3">
                        <FormattedHTMLMessage id="app.ourVision.step1.title" />
                      </SubtitleGreen>
                      <TextMedium>
                        <FormattedMessage id="app.ourVision.step1.text" />
                      </TextMedium>
                    </ScrollAnimation>
                  </Col>
                  <Col lg={{ span: 14 }} md={{ span: 22 }}>
                    <ScrollAnimation bottom>
                      <ImgWrap>
                        <StepImg
                          src={
                            overrides && overrides.brandName === 'Eaton'
                              ? eatonStepsImg1
                              : stepsImg1
                          }
                          alt=""
                        />
                      </ImgWrap>
                    </ScrollAnimation>
                  </Col>
                </Row>
              </Step>

              <Step>
                <Row gutter={20} type="flex" align="middle" justify="center">
                  <Col
                    lg={{ span: 12, order: 0 }}
                    md={{ span: 22, order: 2 }}
                    xs={{ order: 2 }}
                  >
                    <ScrollAnimation bottom>
                      <Step2Img src={stepsImg2} alt="" />
                    </ScrollAnimation>
                  </Col>
                  <Col
                    lg={{ span: 10, offset: 2 }}
                    md={{ span: 22, offset: 0 }}
                  >
                    <ScrollAnimation bottom>
                      <Number src={num2} alt="2" />
                      <SubtitleGreen as="h3">
                        <FormattedHTMLMessage id="app.ourVision.step2.title" />
                      </SubtitleGreen>
                      <TextMedium>
                        <FormattedMessage id="app.ourVision.step2.text" />
                      </TextMedium>
                    </ScrollAnimation>
                  </Col>
                </Row>
              </Step>

              <Step3>
                <Row type="flex" justify="center" gutter={20}>
                  <Col span={16}>
                    <ScrollAnimation bottom>
                      <Number src={num3} alt="3" />
                      <SubtitleGreen as="h3">
                        <FormattedHTMLMessage id="app.ourVision.step3.title" />
                      </SubtitleGreen>
                      <TextMedium>
                        <FormattedMessage id="app.ourVision.step3.text" />
                      </TextMedium>
                    </ScrollAnimation>
                  </Col>
                </Row>
                <ScrollAnimation>
                  <StepsScheme>
                    <Row gutter={20} type="flex" justify="center">
                      <Col md={{ span: 8 }} sm={{ span: 20 }}>
                        <KittensWrap>
                          <StepsSchemeImg>
                            <img src={stepsImg3a} alt="" />
                          </StepsSchemeImg>
                          <TextMedium>
                            <FormattedMessage id="app.ourVision.stepScheme.text1" />
                          </TextMedium>
                        </KittensWrap>
                      </Col>
                      <Col md={{ span: 8 }} sm={{ span: 20 }}>
                        <KittensWrap>
                          <StepsSchemeImg>
                            <img src={stepsImg3b} alt="" />
                          </StepsSchemeImg>
                          <p>
                            <FormattedMessage id="app.ourVision.stepScheme.text2" />
                          </p>
                        </KittensWrap>
                      </Col>
                      <Col md={{ span: 8 }} sm={{ span: 20 }}>
                        <KittensWrap>
                          <StepsSchemeImg isLast>
                            <img src={stepsImg3c} alt="" />
                          </StepsSchemeImg>
                          <p>
                            <FormattedMessage id="app.ourVision.stepScheme.text3" />
                          </p>
                        </KittensWrap>
                      </Col>
                    </Row>
                  </StepsScheme>
                </ScrollAnimation>
              </Step3>

              <Step>
                <Row gutter={20} type="flex" align="middle" justify="center">
                  <Col
                    lg={{ span: 12, order: 0 }}
                    md={{ span: 22, order: 2 }}
                    xs={{ order: 2 }}
                  >
                    <ScrollAnimation bottom>
                      <StepFourScreenshotWrap
                        src={
                          overrides && overrides.brandName === 'Eaton'
                            ? eatonStepsImg4
                            : stepsImg4
                        }
                        alt="Add action"
                      />
                    </ScrollAnimation>
                  </Col>
                  <Col
                    lg={{ span: 10, offset: 2 }}
                    md={{ span: 22, offset: 0 }}
                  >
                    <StepFourContentWrap>
                      <ScrollAnimation bottom>
                        <Number src={num4} alt="4" />
                        <SubtitleGreen as="h3">
                          <FormattedHTMLMessage id="app.ourVision.step4.title" />
                        </SubtitleGreen>
                        <TextMedium>
                          <FormattedMessage id="app.ourVision.step4.text" />
                        </TextMedium>
                      </ScrollAnimation>
                    </StepFourContentWrap>
                  </Col>
                </Row>
              </Step>

              <Step>
                <Row gutter={20} type="flex" align="middle" justify="center">
                  <Col lg={{ span: 10 }} md={{ span: 22 }}>
                    <ScrollAnimation bottom>
                      <Number src={num5} alt="5" />
                      <SubtitleGreen as="h3">
                        <FormattedHTMLMessage id="app.ourVision.step5.title" />
                      </SubtitleGreen>
                      <TextMedium>
                        <FormattedMessage id="app.ourVision.step5.text" />
                      </TextMedium>
                    </ScrollAnimation>
                  </Col>
                  <Col lg={{ span: 14 }} md={{ span: 22 }}>
                    <ScrollAnimation bottom>
                      <ImgWrap>
                        <StepImg
                          src={
                            overrides && overrides.brandName === 'Eaton'
                              ? eatonStepsImg5
                              : stepsImg5
                          }
                          alt=""
                        />
                      </ImgWrap>
                    </ScrollAnimation>
                  </Col>
                </Row>
              </Step>

              <Step>
                <Row gutter={20} type="flex" align="middle" justify="center">
                  <Col
                    lg={{ span: 12, order: 0 }}
                    md={{ span: 22, order: 2 }}
                    xs={{ order: 2 }}
                  >
                    <ScrollAnimation bottom>
                      <ImgWrap>
                        <StepSixImage src={stepsImg6} alt="Network" />
                      </ImgWrap>
                    </ScrollAnimation>
                  </Col>
                  <Col
                    lg={{ span: 10, offset: 2 }}
                    md={{ span: 22, offset: 0 }}
                  >
                    <ScrollAnimation bottom>
                      <StepSixContentWrap>
                        <Number src={num6} alt="6" />
                        <SubtitleGreen as="h3">
                          <FormattedHTMLMessage id="app.ourVision.step6.title" />
                        </SubtitleGreen>
                        <TextMedium>
                          <FormattedMessage id="app.ourVision.step6.text" />
                        </TextMedium>
                      </StepSixContentWrap>
                    </ScrollAnimation>
                  </Col>
                </Row>
              </Step>
            </BlockContainer>
          </Steps>

          <VideoModalWrap>
            <ModalVideo
              channel="youtube"
              isOpen={this.state.isOpen}
              videoId="CtH6M5CXruU"
              onClose={() => this.setState({ isOpen: false })}
            />
          </VideoModalWrap>
        </OurVisionWrap>
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user.data,
})

export default compose(connect(mapStateToProps))(OurVisionPage)
