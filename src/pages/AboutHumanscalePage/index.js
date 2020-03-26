import React, { Component, Fragment } from 'react'
import {
  FormattedMessage,
  FormattedHTMLMessage,
  injectIntl,
  intlShape,
} from 'react-intl'
import { Link } from 'react-router-dom'
import { animateScroll } from 'react-scroll/modules'
import PageMetadata from 'components/PageMetadata'
import * as api from 'api/actions'

import {
  Hero,
  HeroInfo,
  HeroTitle,
  WhiteButton,
  GreenButton,
  WhatIsFootprint,
  FootprintWrapper,
  Title,
  Text,
  FootprintMainImage,
  FootprintLeapImage,
  FootprintFingerImage,
  FootprintFootImage,
  FootprintImagesBlock,
  HandprintWrapper,
  HandprintMainImage,
  HandprintInfo,
  WhatIsHandprint,
  TakeActionWrapper,
  TakeActionHeader,
  TakeAction,
  TakeActionDoIt,
  TakeActionShareTo,
  CampaignsMainWrapper,
  CampaignsInfo,
  CampaignsHeader,
  CampaignsBlock,
  JoinHandprinterWrapper,
  JoinHandprinterContentBlock,
  JoinHandprinterContent,
  HandprintImagesWrapper,
  HandprintFingerImage,
  HandprintLeapImage,
  TakeActionItemHeader,
  TakeActionItemInfo,
  TakeActionMainImage,
  TakeActionLeap,
  TakeActionLeap2,
  TakeActionFingerprint,
  TakeActionMainImageWraper,
  TakeActionDoItImageWrapper,
  TakeActionDoItMainImage,
  TakeActionDoItHandprint,
  TakeActionSharedToImage,
  SmallCircle,
  BigCircle,
  SharedToImageWrapper,
  CampaignsFinger,
  CampaignsCards,
  CampaignsCard,
  CampaignButtons,
  CampaignLeftArrowButton,
  CampaignRightArrowButton,
} from './styled'

import footprintFinger from './assets/footprintFinger.svg'
import footprintFinger2 from './assets/footprintFinger2.svg'
import footprintLeap from './assets/footprintLeap.png'
import footprintImage from './assets/footprintImage.png'
import handprintImage from './assets/handprintImage.png'
import handprintLeap from './assets/handprintLeap.png'

import takeActionFingerprint from './assets/takeActionFingerprint.svg'

import takeActionLeap from './assets/takeActionLeap.png'
import takeActionLeap2 from './assets/takeActionLeap2.png'
import takeActionMainImage from './assets/takeActionMainImage.png'
import doItMainImage from './assets/doItMainImage.png'
import doItHandprint from './assets/doItHandprint.svg'
import sharedToImage from './assets/shareToImage.svg'
import campaignsFinger from './assets/Actions-fingerprint.svg'
import campaignCard from './assets/Campaign card.png'
import leftArrow from './assets/ic_arrow_drop_down_left.png'
import rightArrow from './assets/ic_arrow_drop_down_right.png'

import earth from './assets/earth.svg'

// import foot from './assets/foot.png'

class AboutHumanscalePage extends Component {
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
          <HeroInfo>
            <HeroTitle>
              <FormattedMessage id="app.aboutIHumanscalePage.hero.title" />
            </HeroTitle>
            <Link to="/pages/our-vision">
              <WhiteButton type="ghost" size="large">
                <FormattedMessage id="app.aboutHumanscalePage.join.link" />
              </WhiteButton>
            </Link>
          </HeroInfo>
        </Hero>
        <WhatIsFootprint>
          <FootprintWrapper>
            <Title>What is footprint?</Title>
            <Text>
              Footprint - the sum of all the negative impacts on the planet we
              share, of all the activities it takes to provide each of us with
              the products and services we buy and use in a year, including the
              impacts from using and disposing of them
            </Text>
            <FootprintImagesBlock>
              <FootprintMainImage src={footprintImage} alt="" />
              <FootprintLeapImage src={footprintLeap} alt="" />
              <FootprintFingerImage src={footprintFinger} alt="" />
              <FootprintFootImage src={footprintFinger2} alt="" />
            </FootprintImagesBlock>
          </FootprintWrapper>
        </WhatIsFootprint>
        <WhatIsHandprint>
          <HandprintWrapper>
            <HandprintImagesWrapper>
              <HandprintMainImage src={handprintImage} alt="" />
              <HandprintLeapImage src={handprintLeap} alt="" />
              <HandprintFingerImage src={earth} alt="" />
            </HandprintImagesWrapper>
            <HandprintInfo>
              <Title>What is handprint?</Title>
              <Text>
                Footprint - the sum of all the negative impacts on the planet we
                share, of all the activities it takes to provide each of us with
                the products and services we buy and use in a year, including
                the impacts from using and disposing of them
              </Text>
              <Text>
                Footprint - the sum of all the negative impacts on the planet we
                share, of all the activities it takes to provide each of us with
                the products and services we buy and use in a year, including
                the impacts from using and disposing of them
              </Text>
              <Text>
                Footprint - the sum of all the negative impacts on the planet we
                share, of all the activities it takes to provide each of us with
                the products and services we buy and use in a year, including
                the impacts from using and disposing of them
              </Text>
            </HandprintInfo>
          </HandprintWrapper>
        </WhatIsHandprint>
        <TakeActionWrapper>
          <TakeActionHeader>
            <p>{"It's easy!"}</p>
          </TakeActionHeader>
          <TakeAction>
            <TakeActionItemHeader>
              <p>1. TAKE ACTION</p>
              <span />
            </TakeActionItemHeader>
            <TakeActionItemInfo>
              <p>
                Be sure you tried it out yourself first, and share ideas about
                how to make it work. Another part of idea creation is modeling
                the impacts of an action idea so that we can all understand what
                impacts it has in the world.
              </p>
              <TakeActionMainImageWraper>
                <TakeActionMainImage src={takeActionMainImage} alt="" />
                <TakeActionLeap src={takeActionLeap} alt="" />
                <TakeActionLeap2 src={takeActionLeap2} alt="" />
                <TakeActionFingerprint src={takeActionFingerprint} alt="" />
              </TakeActionMainImageWraper>
            </TakeActionItemInfo>
          </TakeAction>
          <TakeActionDoIt>
            <TakeActionItemHeader>
              <p>1. TAKE ACTION</p>
              <span />
            </TakeActionItemHeader>
            <TakeActionItemInfo>
              <p>
                Be sure you tried it out yourself first, and share ideas about
                how to make it work. Another part of idea creation is modeling
                the impacts of an action idea so that we can all understand what
                impacts it has in the world.
              </p>
              <TakeActionDoItImageWrapper>
                <TakeActionDoItMainImage src={doItMainImage} alt="" />
                <TakeActionDoItHandprint src={doItHandprint} alt="" />
              </TakeActionDoItImageWrapper>
            </TakeActionItemInfo>
          </TakeActionDoIt>
          <TakeActionShareTo>
            <TakeActionItemHeader>
              <p>1. TAKE ACTION</p>
              <span />
            </TakeActionItemHeader>
            <TakeActionItemInfo>
              <p>
                Be sure you tried it out yourself first, and share ideas about
                how to make it work. Another part of idea creation is modeling
                the impacts of an action idea so that we can all understand what
                impacts it has in the world.
              </p>
              <SharedToImageWrapper>
                <TakeActionSharedToImage src={sharedToImage} alt="" />
                <SmallCircle />
                <BigCircle />
              </SharedToImageWrapper>
            </TakeActionItemInfo>
          </TakeActionShareTo>
        </TakeActionWrapper>
        <CampaignsMainWrapper>
          <CampaignsInfo>
            <CampaignsHeader>Yes shrink your footprint.</CampaignsHeader>
            <CampaignsHeader>But also grow your handprint!</CampaignsHeader>
            <div>
              <p>
                Just take one of the actions from the Challenges! There are so
                many ways to shrink your footprint. Hundreds of people are using
                these ideas to reduce their footprints.
              </p>
            </div>
          </CampaignsInfo>

          <CampaignsBlock>
            <CampaignsFinger src={campaignsFinger} alt="" />
            <CampaignsCards>
              <CampaignsCard src={campaignCard} alt="" />
              <CampaignsCard src={campaignCard} alt="" />
              <CampaignsCard src={campaignCard} alt="" />
            </CampaignsCards>
            <CampaignButtons>
              <GreenButton>view more</GreenButton>
              <div styles={{ width: '250px' }}>
                <CampaignLeftArrowButton src={leftArrow} alt="" />
                <CampaignRightArrowButton src={rightArrow} alt="" />
              </div>
            </CampaignButtons>
          </CampaignsBlock>
        </CampaignsMainWrapper>
        <JoinHandprinterWrapper>
          <JoinHandprinterContentBlock>
            <JoinHandprinterContent>
              <p>Join Handprinter Save the Planet</p>
              <Link to="/pages/our-vision">
                <WhiteButton type="ghost" size="large">
                  <FormattedMessage id="app.aboutHumanscalePage.join.link" />
                </WhiteButton>
              </Link>
            </JoinHandprinterContent>
          </JoinHandprinterContentBlock>
        </JoinHandprinterWrapper>
      </Fragment>
    )
  }
}

AboutHumanscalePage.propTypes = {
  intl: intlShape.isRequired,
}

export default injectIntl(AboutHumanscalePage)
