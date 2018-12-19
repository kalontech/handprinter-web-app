import React, { Fragment } from 'react'
import { Row, Col } from 'antd'
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl'
import styled from 'styled-components'
import colors from './../../config/colors'
import ScrollableAnchor, {
  configureAnchors,
  removeHash,
} from 'react-scrollable-anchor'
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

import heroImg from './../../assets/measurement/measurement-hero-img.png'
import meaningImg from './../../assets/measurement/sheep.png'
import problemImg from './../../assets/measurement/rabbit.png'
import iconClock from './../../assets/measurement/clock_icon.png'
import iconLeg from './../../assets/measurement/leg_icon.png'
import blueLabel from './../../assets/measurement/blue_label.png'
import darkGreenLabel from './../../assets/measurement/darkgreen_label.png'
import lightGreenLabel from './../../assets/measurement/lightgreen_label.png'
import grayLabel from './../../assets/measurement/gray_label.png'
import cowImg from './../../assets/measurement/cow.png'
import cardImg from './../../assets/measurement/card.png'
import footImg from './../../assets/measurement/foot.png'
import animation from './../../assets/measurement/scales.mp4'
import finger from './../../assets/measurement/finger.svg'

configureAnchors({ scrollDuration: 1200 })

// clear URL hash
removeHash()

const HeadingMiddle = styled.h4`
  font-size: 22px;
  line-height: 1.23;
`

const HeroSection = styled.section`
  padding: 150px 0 250px;
`

const HeroText = styled(TextLarge)`
  max-width: 425px;
`

const MeaningSection = styled.section`
  padding: 188px 0 170px;
`

const InfoSection = styled.section`
  padding: 110px 0 140px;
`

const InfoWrap = styled.div`
  padding: 50px 0 45px;
  background-color: ${colors.lightGray};
`

const InfoItem = styled.div`
  display: flex;
  align-items: flex-start;
  img {
    margin-right: 30px;
  }
`

const BlockHeader = styled.div`
  text-align: center;
  padding-bottom: 80px;

  p {
    max-width: 600px;
    margin: 0 auto;
  }
`

const ImpactContainer = styled.div`
  margin-top: 40px;
`

const ImpactItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
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
  background-color: ${colors.lightGray};
  height: 291px;
  margin-top: 250px;
  margin-bottom: 240px;
`

const CardImage = styled.img`
  margin-top: -51px;
  left: 10px;
  position: relative;
`

const ImgWrapRight = styled.div`
  display: flex;
  justify-content: flex-end;
`

const ImgWrapCentered = styled.div`
  display: flex;
  justify-content: center;
`

const AnimationSection = styled.section`
  position: relative;
  margin: 200px 40px 40px;
  padding-top: 110px;
  text-align: center;
  background-color: ${colors.lightGray};
  &:before {
    position: absolute;
    z-index: 1;
    left: 0;
    bottom: -6px;
    content: url(${finger});
  }
`

const Animation = styled.video`
  video {
    display: block;
    max-width: 100%;
    margin: 60px auto 0;
  }
`

const HeroBlockImage = styled(ImgWrapCentered)`
  position: relative;
  top: -14px;
  left: -9px;
`

const MeaningBlockImage = styled.img`
  position: relative;
  top: 13px;
  left: -13px;
`

const ProblemBlockImage = styled.img`
  position: relative;
  top: -13px;
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

const CommonBasisImg = styled.img`
  position: relative;
  left: -15px;
  top: -10px;
`

const Scales = styled(Animation)`
  max-width: 760px;
`

const MeasurementUnitsPage = () => {
  return (
    <Fragment>
      <HeroSection>
        <BlockContainer>
          <Row gutter={20} type="flex" align="middle">
            <Col span={12}>
              <BlockTitleGreen>
                <FormattedHTMLMessage id="app.measurementPage.Hero.Title" />
              </BlockTitleGreen>
              <HeroText>
                <FormattedMessage id="app.measurementPage.Hero.Text" />
              </HeroText>
            </Col>
            <Col span={12}>
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
            <a href="#meaning">
              <ScrollButton>
                <ExpandMoreIcon />
              </ScrollButton>
            </a>
          </Row>
        </BlockContainer>
      </ScrollToSection>

      <ScrollableAnchor id={'meaning'}>
        <MeaningSection>
          <BlockContainer>
            <Row gutter={20}>
              <Col span={10}>
                <div>
                  <BlockSubTitle>
                    <FormattedHTMLMessage id="app.measurementPage.Meaning.Title" />
                  </BlockSubTitle>
                  <TextMediumGroup>
                    <FormattedHTMLMessage id="app.measurementPage.Meaning.Text1" />
                  </TextMediumGroup>
                  <TextMediumGroup>
                    <FormattedHTMLMessage id="app.measurementPage.Meaning.Text2" />
                  </TextMediumGroup>
                </div>
              </Col>
              <Col span={14}>
                <ImgWrapRight>
                  <MeaningBlockImage src={meaningImg} alt="" />
                </ImgWrapRight>
              </Col>
            </Row>
          </BlockContainer>
        </MeaningSection>
      </ScrollableAnchor>

      <section>
        <BlockContainer>
          <Row gutter={20} type="flex" align="middle">
            <Col span={12}>
              <div>
                <ProblemBlockImage src={problemImg} alt="" />
              </div>
            </Col>
            <Col span={10}>
              <BlockSubTitle>
                <FormattedHTMLMessage id="app.measurementPage.Problem.Title" />
              </BlockSubTitle>
              <TextMediumGroup>
                <FormattedMessage id="app.measurementPage.Problem.Text1" />
              </TextMediumGroup>
              <TextMediumGroup>
                <FormattedHTMLMessage id="app.measurementPage.Problem.Text2" />
              </TextMediumGroup>
            </Col>
          </Row>
        </BlockContainer>
      </section>

      <InfoSection>
        <BlockContainer>
          <InfoWrap>
            <Row gutter={20}>
              <Col span={8} offset={2}>
                <InfoItem>
                  <img src={iconClock} alt="" />
                  <TextMedium>
                    <FormattedMessage id="app.measurementPage.Info.Text1" />
                  </TextMedium>
                </InfoItem>
              </Col>
              <Col span={10} offset={2}>
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
      </InfoSection>

      <section>
        <BlockContainer>
          <BlockHeader>
            <Row type="flex" justify="center">
              <Col span={16}>
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
            <Col span={8} offset={2}>
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
            <Col span={14}>
              <ImgWrapRight>
                <img src={cowImg} alt="" />
              </ImgWrapRight>
            </Col>
          </Row>
        </BlockContainer>
      </section>

      <CardSection>
        <BlockContainer>
          <Row>
            <Col span={12}>
              <ImgWrapRight>
                <CardImage src={cardImg} alt="" />
              </ImgWrapRight>
            </Col>
            <Col span={10} offset={2}>
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

      <section>
        <BlockContainer>
          <Row gutter={20}>
            <Col span={10}>
              <BlockSubTitle>
                <FormattedHTMLMessage id="app.measurementPage.CommonBasis.Title" />
              </BlockSubTitle>
              <TextMediumGroup>
                <FormattedHTMLMessage id="app.measurementPage.CommonBasis.Text1" />
              </TextMediumGroup>
              <TextMediumGroup>
                <FormattedHTMLMessage id="app.measurementPage.CommonBasis.Text2" />
              </TextMediumGroup>
            </Col>
            <Col span={12} offset={2}>
              <ImgWrapCentered>
                <CommonBasisImg src={footImg} alt="Foot" />
              </ImgWrapCentered>
            </Col>
          </Row>
        </BlockContainer>
      </section>

      <AnimationSection>
        <BlockContainer>
          <Row type="flex" justify="center">
            <Col span={16}>
              <BlockSubTitleGreen>
                <FormattedHTMLMessage id="app.measurementPage.Animation.Title" />
              </BlockSubTitleGreen>
            </Col>
          </Row>
          <Scales autoPlay={true} loop={true} muted={true}>
            <source src={animation} type="video/mp4" />
          </Scales>
        </BlockContainer>
      </AnimationSection>
    </Fragment>
  )
}

export default MeasurementUnitsPage
