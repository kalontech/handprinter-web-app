import React, { Fragment } from 'react'
import { Row, Col } from 'antd'
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl'
import styled from 'styled-components'
import { Link as AnchorLink } from 'react-scroll'

import colors from './../../config/colors'
import media from './../../utils/mediaQueryTemplate'
import ExpandMoreIcon from '../../assets/icons/ExpandMoreIcon'
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
} from './../../components/Styled'
import PageMetadata from '../../components/PageMetadata'
import heroImg from './../../assets/measurement/measurement-hero-img.png'
import meaningImg from './../../assets/measurement/sheep.png'
import meaningMobImg from './../../assets/measurement/sheep-mob.png'
import problemImg from './../../assets/measurement/rabbit.png'
import iconClock from './../../assets/measurement/clock_icon.png'
import iconLeg from './../../assets/measurement/leg_icon.png'
import blueLabel from './../../assets/measurement/blue_label.png'
import darkGreenLabel from './../../assets/measurement/darkgreen_label.png'
import lightGreenLabel from './../../assets/measurement/lightgreen_label.png'
import grayLabel from './../../assets/measurement/gray_label.png'
import cowImg from './../../assets/measurement/cow.png'
import cowImgMob from './../../assets/measurement/cow-mob.png'
import cowImgMob2 from './../../assets/measurement/cow-mob2.png'
import cardImg from './../../assets/measurement/card.png'
import footImg from './../../assets/measurement/foot.png'
import finger from './../../assets/measurement/finger.svg'
import printImg from './../../assets/measurement/print.png'
import precisionImg from './../../assets/measurement/precision.png'
import MeasuringAnimation from '../../components/MeasuringAnimation'

const HeadingMiddle = styled.h4`
  font-size: 22px;
  line-height: 1.23;
`

const ImgWrapRight = styled.div`
  display: flex;
  justify-content: flex-end;
  ${media.largeDesktop`
    max-width: 100%;
    justify-content: center;
  `};
`

const ImgWrapCentered = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const HeroSection = styled.section`
  padding: 150px 0 250px;
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
const HeroBlockImage = styled(ImgWrapCentered)`
  position: relative;
  top: -14px;
  left: -9px;
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

const MeaningSection = styled.section`
  padding: 188px 0 170px;
  ${media.desktop`
    padding: 130px 0 140px;
  `};
  ${media.phone`
    padding: 0 0 70px;
  `};
`
const MeaningContent = styled.div`
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

const MeaningBlockImage = styled.img`
  position: relative;
  top: 13px;
  left: -13px;
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

const TabletImg = styled.img`
  display: none;
  max-width: 100%;
  ${media.desktop`
    display: block;
  `};
  ${media.phone`
    display: none;
  `};
`

const ProblemBlockImage = styled.img`
  position: relative;
  top: -13px;
  ${media.largeDesktop`
    position: static;
    max-width: 100%;
  `};
`

const ProblemContent = styled.div`
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
const ProblemSection = styled.section`
  padding-bottom: 110px;
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

const InfoWrap = styled.div`
  padding: 50px 0 5px;
  background-color: ${colors.lightGray};
  ${media.largeDesktop`
    padding-left: 90px;
    padding-right: 90px;
  `};
  ${media.phone`
    padding-left: 15px;
    padding-right: 15px;
    margin-left: -15px;
    margin-right: -15px;
  `};
`

const InfoItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 40px;
  img {
    margin-right: 30px;
    ${media.phone`
      margin-right: 20px;
    }
  `};
  }
`

const ImpactSection = styled.section`
  padding-top: 140px;
  padding-bottom: 200px;
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

const ImpactContainer = styled.div`
  margin-top: 40px;
  ${media.phone`
    margin-top: 30px;
    margin-bottom: 40px;
  `};
`

const ImpactItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
`

const ImpactImg = styled(ImgWrapRight)`
  img {
    max-width: 100%;
  }
  ${media.desktop`
    display: none;
  `};
`

const ImpactLabelText = styled.p`
  color: ${colors.darkGray};
  strong {
    font-weight: 700;
  }
`

const ImpactLabelTextBlue = styled(ImpactLabelText)`
  strong {
    color: ${colors.blue};
  }
`

const ImpactLabelTextOcean = styled(ImpactLabelText)`
  strong {
    color: ${colors.ocean};
  }
`

const ImpactLabelTextGreen = styled(ImpactLabelText)`
  strong {
    color: ${colors.green};
  }
`

const ImpactLabelTextGray = styled(ImpactLabelText)`
  strong {
    color: ${colors.darkGray};
  }
`

const ImpactLabelImg = styled.img`
  max-width: 65px;
  margin-right: 12px;
`

const CardListContainer = styled.div`
  height: 291px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  left: -28px;
  top: -14px;
  ${media.phone`
    height: auto;
    position: static;
    margin-left: 15px;
    margin-top: 40px;
  `};
`

const CardList = styled.ul`
  padding-left: 22px;
  list-style: none;
  strong {
    font-weight: 700;
  }
  li {
    position: relative;
    :before {
      position: absolute;
      left: -20px;
      top: 0;
      bottom: 0;
      margin: auto;
      height: 6px;
      width: 6px;
      opacity: 0.4;
      border-radius: 50%;
      background-color: ${colors.dark};
      content: '';
    }
  }
`

const CardListBlue = styled.li`
  strong {
    color: ${colors.blue};
  }
`

const CardListOcean = styled.li`
  strong {
    color: ${colors.ocean};
  }
`

const CardListGreen = styled.li`
  strong {
    color: ${colors.green};
  }
`

const CardSection = styled.section`
  background: ${colors.lightGray} url(${printImg}) no-repeat
    calc((100% - 1180px) / 2 + 230px) center;
  height: 291px;
  ${media.phone`
    background: ${colors.lightGray};
    height: auto;
    padding-bottom: 50px;
  `};
`

const CardImage = styled.img`
  margin-top: -51px;
  left: 10px;
  position: relative;
  ${media.desktop`
    max-width: 100%;
    position: static;
  `};
  ${media.phone`
    margin-top: -80px;
  `};
`

const PrecisionSection = styled.section`
  padding-top: 200px;
  padding-bottom: 160px;
  ${media.largeDesktop`
    .ant-row-flex {
      justify-content: center;
    }
  `};
  ${media.desktop`
    padding-top: 140px;
    padding-bottom: 140px;
  `};
  ${media.phone`
    padding-top: 50px;
    padding-bottom: 70px;
  `};
`

const CommonBasisSection = styled.section`
  padding-bottom: 200px;
  ${media.desktop`
    padding-bottom: 140px;
  `};

  ${media.phone`
    padding-bottom: 70px;
  `};
`

const CommonBasisContent = styled.div`
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

const CommonBasisImg = styled.img`
  position: relative;
  left: -15px;
  top: -10px;
  ${media.largeDesktop`
    position: static;
    max-width: 100%;
  `};
`

const AnimationSection = styled.section`
  position: relative;
  margin: 0 40px 40px;
  padding-top: 110px;
  padding-bottom: 110px;
  text-align: center;
  background-color: ${colors.lightGray};
  &:before {
    position: absolute;
    z-index: 1;
    left: 0;
    bottom: -6px;
    content: url(${finger});
  }
  ${media.desktop`
    padding-top: 50px;
    padding-bottom: 50px;
    margin: 0;
    text-align: center;
    ${BlockContainer} {
      max-width: 630px;
    }
    &:before {
      display: none;
    }
  `};
  ${media.phone`
    padding-top: 30px;
  `};
`

const ImpactBlockWrap = styled.div`
  position: relative;
  top: 16px;
  left: -1px;
`

const CardListWrap = styled.div`
  position: relative;
  top: 19px;
  left: 5px;
  ${media.phone`
    position: static;
  `};
  p {
    margin-bottom: 5px;
  }
  ul {
    margin: 0;
    li {
      margin-bottom: 7px;
    }
  }
`

const MeasurementUnitsPage = () => {
  return (
    <Fragment>
      <PageMetadata pageName="measurementPage" />
      <HeroSection>
        <BlockContainer>
          <Row gutter={{ md: 20 }} type="flex" align="middle">
            <Col xs={{ order: 2 }} md={{ order: 1 }} xl={12}>
              <BlockTitleGreen>
                <FormattedHTMLMessage id="app.measurementPage.Hero.Title" />
              </BlockTitleGreen>
              <HeroText>
                <FormattedMessage id="app.measurementPage.Hero.Text" />
              </HeroText>
            </Col>
            <Col xs={{ order: 1 }} md={{ order: 2 }} xl={12}>
              <HeroBlockImage>
                <img src={heroImg} alt="Car" />
              </HeroBlockImage>
            </Col>
          </Row>
        </BlockContainer>
      </HeroSection>

      <ScrollToSection>
        <BlockContainer>
          <Row>
            <p>
              <FormattedMessage id="app.measurementPage.ScrollText" />
            </p>
            <AnchorLink to="anchor" spy={true} smooth={true} duration={500}>
              <ScrollButton>
                <ExpandMoreIcon />
              </ScrollButton>
            </AnchorLink>
          </Row>
        </BlockContainer>
      </ScrollToSection>

      <MeaningSection id="anchor">
        <BlockContainer>
          <Row gutter={{ md: 20 }}>
            <Col xl={10}>
              <MeaningContent>
                <BlockSubTitle>
                  <FormattedHTMLMessage id="app.measurementPage.Meaning.Title" />
                </BlockSubTitle>
                <TextMediumGroup>
                  <FormattedHTMLMessage id="app.measurementPage.Meaning.Text1" />
                </TextMediumGroup>
                <TextMediumGroup>
                  <FormattedHTMLMessage id="app.measurementPage.Meaning.Text2" />
                </TextMediumGroup>
              </MeaningContent>
            </Col>
            <Col xl={14}>
              <ImgWrapRight>
                <MeaningBlockImage src={meaningImg} alt="" />
                <MobileImg src={meaningMobImg} alt="" />
              </ImgWrapRight>
            </Col>
          </Row>
        </BlockContainer>
      </MeaningSection>

      <ProblemSection>
        <BlockContainer>
          <Row gutter={{ md: 20 }} type="flex" align="middle">
            <Col xs={{ order: 2 }} xl={{ span: 12, order: 1 }}>
              <div>
                <ProblemBlockImage src={problemImg} alt="" />
              </div>
            </Col>
            <Col xs={{ order: 1 }} xl={{ span: 10, order: 2 }}>
              <ProblemContent>
                <BlockSubTitle>
                  <FormattedHTMLMessage id="app.measurementPage.Problem.Title" />
                </BlockSubTitle>
                <TextMediumGroup>
                  <FormattedMessage id="app.measurementPage.Problem.Text1" />
                </TextMediumGroup>
                <TextMediumGroup>
                  <FormattedHTMLMessage id="app.measurementPage.Problem.Text2" />
                </TextMediumGroup>
              </ProblemContent>
            </Col>
          </Row>
        </BlockContainer>
      </ProblemSection>

      <section>
        <BlockContainer>
          <InfoWrap>
            <Row gutter={{ md: 20 }}>
              <Col xl={{ span: 8, offset: 2 }}>
                <InfoItem>
                  <img src={iconClock} alt="" />
                  <TextMedium>
                    <FormattedMessage id="app.measurementPage.Info.Text1" />
                  </TextMedium>
                </InfoItem>
              </Col>
              <Col xl={{ span: 10, offset: 2 }}>
                <InfoItem>
                  <img src={iconLeg} alt="" />
                  <TextMedium>
                    <FormattedMessage id="app.measurementPage.Info.Text2" />
                  </TextMedium>
                </InfoItem>
              </Col>
            </Row>
          </InfoWrap>
        </BlockContainer>
      </section>

      <ImpactSection>
        <BlockContainer>
          <BlockHeader>
            <Row type="flex" justify="center">
              <Col xl={16}>
                <BlockSubTitle>
                  <FormattedMessage id="app.measurementPage.Impact.Title" />
                </BlockSubTitle>
                <TextMedium>
                  <FormattedMessage id="app.measurementPage.Impact.Text" />
                </TextMedium>
              </Col>
            </Row>
          </BlockHeader>

          <Row type="flex" align="middle">
            <Col xl={{ span: 8, offset: 2 }}>
              <ImpactBlockWrap>
                <HeadingMiddle as="h3">
                  <FormattedMessage id="app.measurementPage.Impact.ListTitle" />
                </HeadingMiddle>
                <ImpactContainer>
                  <ImpactItem>
                    <ImpactLabelImg src={blueLabel} alt="" />
                    <ImpactLabelTextBlue>
                      <FormattedHTMLMessage id="app.measurementPage.Impact.ListItemBlue" />
                    </ImpactLabelTextBlue>
                  </ImpactItem>
                  <ImpactItem>
                    <ImpactLabelImg src={darkGreenLabel} alt="" />
                    <ImpactLabelTextOcean>
                      <FormattedHTMLMessage id="app.measurementPage.Impact.ListItemDarkGreen" />
                    </ImpactLabelTextOcean>
                  </ImpactItem>
                  <ImpactItem>
                    <ImpactLabelImg src={lightGreenLabel} alt="" />
                    <ImpactLabelTextGreen>
                      <FormattedHTMLMessage id="app.measurementPage.Impact.ListItemLightGreen" />
                    </ImpactLabelTextGreen>
                  </ImpactItem>
                  <ImpactItem>
                    <ImpactLabelImg src={grayLabel} alt="" />
                    <ImpactLabelTextGray>
                      <FormattedHTMLMessage id="app.measurementPage.Impact.ListItemGray" />
                    </ImpactLabelTextGray>
                  </ImpactItem>
                </ImpactContainer>
              </ImpactBlockWrap>
            </Col>
            <Col xl={14}>
              <ImpactImg>
                <img src={cowImg} alt="" />
              </ImpactImg>
              <ImgWrapCentered>
                <MobileImg src={cowImgMob2} alt="" />
              </ImgWrapCentered>
            </Col>
          </Row>
          <ImgWrapCentered>
            <TabletImg src={cowImgMob} alt="" />
          </ImgWrapCentered>
        </BlockContainer>
      </ImpactSection>

      <CardSection>
        <BlockContainer>
          <Row>
            <Col md={12}>
              <ImgWrapRight>
                <CardImage src={cardImg} alt="" />
              </ImgWrapRight>
            </Col>
            <Col md={{ span: 10, offset: 2 }}>
              <CardListContainer>
                <CardListWrap>
                  <TextMedium>
                    <strong>
                      <FormattedMessage id="app.measurementPage.Card.Title" />
                    </strong>
                  </TextMedium>
                  <CardList>
                    <CardListBlue>
                      <TextMedium>
                        <FormattedHTMLMessage id="app.measurementPage.Card.Item1" />
                      </TextMedium>
                    </CardListBlue>
                    <CardListBlue>
                      <TextMedium>
                        <FormattedHTMLMessage id="app.measurementPage.Card.Item2" />
                      </TextMedium>
                    </CardListBlue>
                    <CardListOcean>
                      <TextMedium>
                        <FormattedHTMLMessage id="app.measurementPage.Card.Item3" />
                      </TextMedium>
                    </CardListOcean>
                    <CardListOcean>
                      <TextMedium>
                        <FormattedHTMLMessage id="app.measurementPage.Card.Item4" />
                      </TextMedium>
                    </CardListOcean>
                    <CardListGreen>
                      <TextMedium>
                        <FormattedHTMLMessage id="app.measurementPage.Card.Item5" />
                      </TextMedium>
                    </CardListGreen>
                  </CardList>
                </CardListWrap>
              </CardListContainer>
            </Col>
          </Row>
        </BlockContainer>
      </CardSection>

      <PrecisionSection>
        <BlockContainer>
          <Row gutter={{ md: 20 }} type="flex" align="middle">
            <Col xs={{ order: 2 }} xl={{ span: 12, order: 1 }}>
              <ImgWrapCentered>
                <CommonBasisImg src={precisionImg} alt="" />
              </ImgWrapCentered>
            </Col>
            <Col xs={{ order: 1 }} xl={{ span: 12, order: 2 }}>
              <CommonBasisContent>
                <BlockSubTitle>
                  <FormattedMessage id="app.measurementPage.Precision.Title" />
                </BlockSubTitle>
                <TextMediumGroup>
                  <FormattedMessage id="app.measurementPage.Precision.Text1" />
                </TextMediumGroup>
                <TextMediumGroup>
                  <FormattedHTMLMessage id="app.measurementPage.Precision.Text2" />
                </TextMediumGroup>
              </CommonBasisContent>
            </Col>
          </Row>
        </BlockContainer>
      </PrecisionSection>

      <CommonBasisSection>
        <BlockContainer>
          <Row gutter={{ md: 20 }}>
            <Col xl={10}>
              <CommonBasisContent>
                <BlockSubTitle>
                  <FormattedHTMLMessage id="app.measurementPage.CommonBasis.Title" />
                </BlockSubTitle>
                <TextMediumGroup>
                  <FormattedHTMLMessage id="app.measurementPage.CommonBasis.Text1" />
                </TextMediumGroup>
                <TextMediumGroup>
                  <FormattedHTMLMessage id="app.measurementPage.CommonBasis.Text2" />
                </TextMediumGroup>
              </CommonBasisContent>
            </Col>
            <Col xl={{ span: 12, offset: 2 }}>
              <ImgWrapCentered>
                <CommonBasisImg src={footImg} alt="" />
              </ImgWrapCentered>
            </Col>
          </Row>
        </BlockContainer>
      </CommonBasisSection>

      <AnimationSection>
        <BlockContainer className="block">
          <Row type="flex" justify="center">
            <Col xl={16}>
              <BlockSubTitleGreen>
                <FormattedHTMLMessage id="app.measurementPage.Animation.Title" />
              </BlockSubTitleGreen>
            </Col>
          </Row>
          <MeasuringAnimation />
        </BlockContainer>
      </AnimationSection>
    </Fragment>
  )
}

export default MeasurementUnitsPage
