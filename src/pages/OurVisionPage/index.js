import React from 'react'
import { Link } from 'react-router-dom'
import { Row, Col } from 'antd'
import styled from 'styled-components'
import VideoPopup from './../../components/VideoPopup'
import ActionsCarousel from './../../components/ActionsCarousel'
import colors from './../../config/colors'
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl'
import {
  PrimaryButton,
  BlockContainer,
  BlockTitle,
  BlockSubTitle,
  TextLarge,
  TextMedium,
} from './../../components/Styled'

import heroBg from './../../assets/our-vision/hero-bg.jpg'
import planet from './../../assets/our-vision/planet.png'
import aboutImg1 from './../../assets/our-vision/section2.1.png'
import aboutImg2 from './../../assets/our-vision/section2.2.png'
import aboutImg3 from './../../assets/our-vision/section2.3.png'
import aboutImg4 from './../../assets/our-vision/section2.4.png'
import footBg from './../../assets/our-vision/foot.svg'
import handBg from './../../assets/our-vision/handprint.svg'
import quote from './../../assets/our-vision/quote.svg'
import num1 from './../../assets/our-vision/number-1.svg'
import num2 from './../../assets/our-vision/number-2.svg'
import num3 from './../../assets/our-vision/number-3.svg'
import num4 from './../../assets/our-vision/number-4.svg'
import num5 from './../../assets/our-vision/number-5.svg'
import num6 from './../../assets/our-vision/number-6.svg'
import stepsImg1 from './../../assets/our-vision/section1.png'
import stepsImg2 from './../../assets/our-vision/section2.png'
import stepsImg3a from './../../assets/our-vision/section3.1.png'
import stepsImg3b from './../../assets/our-vision/section3.2.png'
import stepsImg3c from './../../assets/our-vision/section3.3.png'
import stepsImg4 from './../../assets/our-vision/section4.png'
import stepsImg5 from './../../assets/our-vision/section5.png'
import stepsImg6 from './../../assets/our-vision/section6.png'
import arrow from './../../assets/our-vision/arrow.png'
import cardImg1 from '../../assets/homepage/hp-carpool-with-someone.jpg'
import FingerPrintIcon from '../../assets/icons/FingerPrintIcon'

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

const OurVisionWrap = styled.div`
  background: ${colors.white};
`

const TitleGreen = styled(BlockTitle)`
  strong {
    color: ${colors.green};
  }
`

const SubtitleGreen = styled(BlockSubTitle)`
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
`

const SubtitleCenteredSm = styled(SubtitleCentered)`
  padding-bottom: 65px;
`

const HeadingSmall = styled.h4`
  font-size: 16px;
  line-height: 1.75;
  font-weight: bold;
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

const NegativeImpacts = styled.div`
  margin-top: 80px;
`

const NegativeImpactsItem = styled.div`
  padding: 0 30px 30px;
  height: 426px;
  border-radius: 4px;
  box-shadow: 0 1px 10px 0 rgba(52, 68, 66, 0.08);
  background-color: ${colors.white};

  h4 {
    margin-bottom: 8px;
  }
`

const ImpactsItemImage = styled.div`
  height: 210px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const AboutContainer = styled.div`
  position: relative;
  padding-top: 80px;
  padding-bottom: 60px;
  background: ${colors.lightGray} url(${footBg}) no-repeat left
    calc(50% + 480px) top 15px;
  ::before {
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    width: 40px;
    background: ${colors.white};
    content: '';
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
  ::before {
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: calc((100% - 1180px) / 2);
    background: ${colors.white};
    content: '';
  }

  .ant-btn {
    margin-top: 20px;
  }
`

const Steps = styled.section`
  position: relative;
`

const Step = styled.div`
  padding-bottom: 200px;
`

const Step1 = styled(Step)`
  padding-bottom: 240px;
`

const Step1Img = styled.img`
  position: relative;
  top: 50px;
`
const Step2Img = styled.img`
  position: relative;
  top: 20px;
`
const Step2 = styled(Step)`
  padding-bottom: 220px;
`

const Step3 = styled(Step)`
  text-align: center;
  padding-bottom: 190px;
`

const Step4 = styled(Step)`
  padding-bottom: 220px;
`

const Step5 = styled(Step)`
  padding-bottom: 170px;
`

const ImgWrap = styled.div`
  display: flex;
  justify-content: flex-end;
`

const ImgCentered = styled(ImgWrap)`
  justify-content: center;
`

const Number = styled.img`
  padding-bottom: 35px;
`
const StepsScheme = styled.div`
  padding-top: 150px;
  p {
    max-width: 240px;
    margin: 0 auto;
    line-height: 1.43;
  }
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
  }
`

const LastImage = styled(StepsSchemeImg)`
  ::before {
    display: none;
  }
`

const SliderHeading = styled.div`
  padding: 130px 0 130px;
  text-align: center;
`

const OurVisionPage = () => {
  return (
    <OurVisionWrap>
      <Hero>
        <BlockContainer>
          <Row type="flex" justify="center">
            <Col span={12}>
              <img src={planet} alt="" />
              <HeroTitle>
                <FormattedHTMLMessage id="app.ourVision.hero.title" />
              </HeroTitle>
              <TextLarge>
                <FormattedMessage id="app.ourVision.hero.text" />
              </TextLarge>
              <HeroButton>
                <VideoPopup id="CtH6M5CXruU" reverse />
              </HeroButton>
            </Col>
          </Row>
        </BlockContainer>
        <HeroBg src={heroBg} alt="" />
      </Hero>
      <section>
        <BlockContainer>
          <Row type="flex" justify="center">
            <Col span={11}>
              <SubtitleCenteredSm>
                <SubtitleGray>
                  <FormattedHTMLMessage id="app.ourVision.about.title" />
                </SubtitleGray>
              </SubtitleCenteredSm>
            </Col>
          </Row>
        </BlockContainer>
        <AboutContainer>
          <BlockContainer>
            <Row type="flex" align="middle">
              <Col span={10}>
                <HeadingH3>
                  <FormattedMessage id="app.ourVision.negativeImpacts.title" />
                </HeadingH3>
                <TextMedium>
                  <FormattedMessage id="app.ourVision.negativeImpacts.text" />
                </TextMedium>
              </Col>
            </Row>
            <NegativeImpacts>
              <Row gutter={20}>
                <Col span={6}>
                  <NegativeImpactsItem>
                    <ImpactsItemImage>
                      <img src={aboutImg1} alt="" />
                    </ImpactsItemImage>
                    <HeadingSmall>
                      <FormattedMessage id="app.ourVision.negativeImpactsItem1.title" />
                    </HeadingSmall>
                    <p>
                      <FormattedMessage id="app.ourVision.negativeImpactsItem1.text" />
                    </p>
                  </NegativeImpactsItem>
                </Col>
                <Col span={6}>
                  <NegativeImpactsItem>
                    <ImpactsItemImage>
                      <img src={aboutImg2} alt="" />
                    </ImpactsItemImage>
                    <HeadingSmall>
                      <FormattedMessage id="app.ourVision.negativeImpactsItem2.title" />
                    </HeadingSmall>
                    <p>
                      <FormattedMessage id="app.ourVision.negativeImpactsItem2.text" />
                    </p>
                  </NegativeImpactsItem>
                </Col>
                <Col span={6}>
                  <NegativeImpactsItem>
                    <ImpactsItemImage>
                      <img src={aboutImg3} alt="" />
                    </ImpactsItemImage>
                    <HeadingSmall>
                      <FormattedMessage id="app.ourVision.negativeImpactsItem3.title" />
                    </HeadingSmall>
                    <p>
                      <FormattedMessage id="app.ourVision.negativeImpactsItem3.text" />
                    </p>
                  </NegativeImpactsItem>
                </Col>
                <Col span={6}>
                  <NegativeImpactsItem>
                    <ImpactsItemImage>
                      <img src={aboutImg4} alt="" />
                    </ImpactsItemImage>

                    <HeadingSmall>
                      <FormattedMessage id="app.ourVision.negativeImpactsItem4.title" />
                    </HeadingSmall>

                    <p>
                      <FormattedMessage id="app.ourVision.negativeImpactsItem4.text" />
                    </p>
                  </NegativeImpactsItem>
                </Col>
              </Row>
            </NegativeImpacts>
          </BlockContainer>
        </AboutContainer>
      </section>
      <section>
        <BlockContainer>
          <Row type="flex" justify="center">
            <Col span={13}>
              <SliderHeading>
                <BlockSubTitle>
                  <FormattedHTMLMessage id="app.ourVision.slider.title" />
                </BlockSubTitle>
                <TextMedium>
                  <FormattedMessage id="app.ourVision.slider.text" />
                </TextMedium>
              </SliderHeading>
            </Col>
          </Row>
        </BlockContainer>
        <ActionsCarousel actions={actions} />
      </section>
      <section>
        <BlockContainer>
          <Row type="flex" justify="center">
            <Col span={12}>
              <SubtitleCentered>
                <Quote src={quote} alt="" />
                <SubtitleGreen>
                  <FormattedHTMLMessage id="app.ourVision.what.title" />
                </SubtitleGreen>
              </SubtitleCentered>
            </Col>
          </Row>
        </BlockContainer>
        <WhatContainer>
          <BlockContainer>
            <Row gutter={20}>
              <Col span={9} offset={12}>
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
          <Step1>
            <Row gutter={20} type="flex" align="middle">
              <Col span={10}>
                <Number src={num1} alt="1" />
                <SubtitleGreen as="h3">
                  <FormattedHTMLMessage id="app.ourVision.step1.title" />
                </SubtitleGreen>
                <TextMedium>
                  <FormattedMessage id="app.ourVision.step1.text" />
                </TextMedium>
              </Col>
              <Col span={12} offset={2}>
                <ImgWrap>
                  <Step1Img src={stepsImg1} alt="" />
                </ImgWrap>
              </Col>
            </Row>
          </Step1>
          <Step2>
            <Row gutter={20}>
              <Col span={12}>
                <div>
                  <Step2Img src={stepsImg2} alt="" />
                </div>
              </Col>
              <Col span={10}>
                <Number src={num2} alt="2" />
                <SubtitleGreen as="h3">
                  <FormattedHTMLMessage id="app.ourVision.step2.title" />
                </SubtitleGreen>
                <TextMedium>
                  <FormattedMessage id="app.ourVision.step2.text" />
                </TextMedium>
              </Col>
            </Row>
          </Step2>
          <Step3>
            <Row type="flex" justify="center" gutter={20}>
              <Col span={16}>
                <Number src={num3} alt="3" />

                <SubtitleGreen as="h3">
                  <FormattedHTMLMessage id="app.ourVision.step3.title" />
                </SubtitleGreen>
                <TextMedium>
                  <FormattedMessage id="app.ourVision.step3.text" />
                </TextMedium>
              </Col>
            </Row>
            <StepsScheme>
              <Row gutter={20}>
                <Col span={8}>
                  <div>
                    <StepsSchemeImg>
                      <img src={stepsImg3a} alt="" />
                    </StepsSchemeImg>
                    <TextMedium>
                      <FormattedMessage id="app.ourVision.stepScheme.text1" />
                    </TextMedium>
                  </div>
                </Col>
                <Col span={8}>
                  <div>
                    <StepsSchemeImg>
                      <img src={stepsImg3b} alt="" />
                    </StepsSchemeImg>
                    <p>
                      <FormattedMessage id="app.ourVision.stepScheme.text2" />
                    </p>
                  </div>
                </Col>
                <Col span={8}>
                  <div>
                    <LastImage>
                      <img src={stepsImg3c} alt="" />
                    </LastImage>
                    <p>
                      <FormattedMessage id="app.ourVision.stepScheme.text3" />
                    </p>
                  </div>
                </Col>
              </Row>
            </StepsScheme>
          </Step3>
          <Step4>
            <Row gutter={20} type="flex" align="middle">
              <Col span={10}>
                <ImgWrap>
                  <img src={stepsImg4} alt="" />
                </ImgWrap>
              </Col>
              <Col span={10} offset={2}>
                <Number src={num4} alt="4" />
                <SubtitleGreen as="h3">
                  <FormattedHTMLMessage id="app.ourVision.step4.title" />
                </SubtitleGreen>
                <TextMedium>
                  <FormattedMessage id="app.ourVision.step4.text" />
                </TextMedium>
              </Col>
            </Row>
          </Step4>
          <Step5>
            <Row gutter={20}>
              <Col span={10}>
                <Number src={num5} alt="5" />
                <SubtitleGreen as="h3">
                  <FormattedHTMLMessage id="app.ourVision.step5.title" />
                </SubtitleGreen>
                <TextMedium>
                  <FormattedMessage id="app.ourVision.step5.text" />
                </TextMedium>
              </Col>
              <Col span={12} offset={2}>
                <ImgCentered>
                  <img src={stepsImg5} alt="" />
                </ImgCentered>
              </Col>
            </Row>
          </Step5>
          <Step>
            <Row gutter={20} type="flex" align="middle">
              <Col span={10}>
                <ImgWrap>
                  <img src={stepsImg6} alt="" />
                </ImgWrap>
              </Col>
              <Col span={10} offset={2}>
                <Number src={num6} alt="6" />
                <SubtitleGreen as="h3">
                  <FormattedHTMLMessage id="app.ourVision.step6.title" />
                </SubtitleGreen>
                <TextMedium>
                  <FormattedMessage id="app.ourVision.step6.text" />
                </TextMedium>
              </Col>
            </Row>
          </Step>
        </BlockContainer>
      </Steps>
    </OurVisionWrap>
  )
}

export default OurVisionPage
