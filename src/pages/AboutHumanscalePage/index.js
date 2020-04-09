import React, { useState, useEffect, Fragment } from 'react'
import { FormattedMessage, injectIntl, intlShape } from 'react-intl'
import { Carousel } from 'antd'
import { Link } from 'react-router-dom'
import { animateScroll } from 'react-scroll/modules'
import PageMetadata from 'components/PageMetadata'
import * as api from 'api/campaigns'

import {
  Hero,
  HeroInfo,
  HeroTitle,
  WhiteButton,
  GreenButton,
  WhatIsFootprint,
  FootprintWrapper,
  FootprintTitle,
  FootprintText,
  HandprintTitle,
  HandprintText,
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
  TakeActionDivider,
  Slider,
  Slide,
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
import smallOval from './assets/smallOval.svg'
import bigOval from './assets/bigOval.svg'

import earth from './assets/earth.svg'

function AboutHumanscalePage() {
  const [campaigns, setCampaigns] = useState([])

  const getCampaigns = async () => {
    const {
      campaigns: { docs },
    } = await api.fetchCampaignsList()
    return docs
  }

  useEffect(() => {
    animateScroll.scrollToTop()
    getCampaigns().then(data => setCampaigns(data))
  }, [])

  const token = window.localStorage.getItem('accessToken')

  return (
    <Fragment>
      <PageMetadata pageName="aboutInterfacePage" />
      <Hero>
        <HeroInfo>
          <HeroTitle>
            <FormattedMessage id="app.aboutHumanscalePage.hero.title" />
          </HeroTitle>
          <Link to="/account/login">
            <WhiteButton type="ghost" size="large">
              <FormattedMessage id="app.aboutHumanscalePage.join.link" />
            </WhiteButton>
          </Link>
        </HeroInfo>
      </Hero>
      <WhatIsFootprint>
        <FootprintWrapper>
          <FootprintTitle>
            <FormattedMessage id="app.aboutHumanscalePage.footprint.title" />
          </FootprintTitle>
          <FootprintText>
            <FormattedMessage id="app.aboutHumanscalePage.footprint.text" />
          </FootprintText>
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
            <HandprintTitle>
              <FormattedMessage id="app.aboutHumanscalePage.handprint.title" />
            </HandprintTitle>
            <HandprintText>
              {`We've all heard about our footprints: negative impacts of the
                things we buy and use. We need to reduce them, but footprints
                are only part of the story.`}

              <FormattedMessage id="app.aboutHumanscalePage.handprint.text1" />

              <FormattedMessage id="app.aboutHumanscalePage.handprint.text2" />
            </HandprintText>
          </HandprintInfo>
        </HandprintWrapper>
      </WhatIsHandprint>
      {/* <TakeActionWrapper>
        <TakeActionHeader>
          <p>{"It's easy!"}</p>
        </TakeActionHeader>
        <TakeAction>
          <TakeActionItemHeader>
            <p>
              <FormattedMessage id="app.aboutHumanscalePage.handprint.takeAction" />
            </p>
            <TakeActionDivider />
          </TakeActionItemHeader>
          <TakeActionItemInfo>
            <p>
              <FormattedMessage id="app.aboutHumanscalePage.handprint.takeActionInfo" />
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
            <p>
              <FormattedMessage id="app.aboutHumanscalePage.handprint.takeActionDoIt" />
            </p>
            <TakeActionDivider />
          </TakeActionItemHeader>
          <TakeActionItemInfo>
            <p>
              <FormattedMessage id="app.aboutHumanscalePage.handprint.takeActionDoItInfo" />
            </p>
            <TakeActionDoItImageWrapper>
              <TakeActionDoItMainImage src={doItMainImage} alt="" />
              <TakeActionDoItHandprint src={doItHandprint} alt="" />
            </TakeActionDoItImageWrapper>
          </TakeActionItemInfo>
        </TakeActionDoIt>
        <TakeActionShareTo>
          <TakeActionItemHeader>
            <p>
              <FormattedMessage id="app.aboutHumanscalePage.handprint.takeActionShare" />
            </p>
            <TakeActionDivider />
          </TakeActionItemHeader>
          <TakeActionItemInfo>
            <p>
              <FormattedMessage id="app.aboutHumanscalePage.handprint.takeActionShareInfo" />
            </p>
            <SharedToImageWrapper>
              <TakeActionSharedToImage src={sharedToImage} alt="" />
              <SmallCircle src={smallOval} alt="" />
              <BigCircle src={bigOval} alt="" />
            </SharedToImageWrapper>
          </TakeActionItemInfo>
        </TakeActionShareTo>
      </TakeActionWrapper>
      <CampaignsMainWrapper>
        <CampaignsInfo>
          <CampaignsHeader>
            <FormattedMessage id="app.aboutHumanscalePage.handprint.campaignsHeader1" />
          </CampaignsHeader>
          <CampaignsHeader>
            <FormattedMessage id="app.aboutHumanscalePage.handprint.campaignsHeader2" />
          </CampaignsHeader>
          <div>
            <p>
              <FormattedMessage id="app.aboutHumanscalePage.handprint.campaignsInfo" />
            </p>
          </div>
        </CampaignsInfo>
        <CampaignsBlock>
          <CampaignsFinger src={campaignsFinger} alt="" />
          <CampaignsCards>
            <Slider>
              <Carousel dots={false} arrows={true} variableWidth={true}>
                {campaigns.map(camp => {
                  return (
                    <Slide key={camp.id}>
                      <CampaignsCard>
                        <img src={camp.logo.src} alt="" />
                        <div>
                          <div>{camp.name}</div>
                          <span>{''} members</span>
                        </div>
                      </CampaignsCard>
                    </Slide>
                  )
                })}
              </Carousel>
            </Slider>
          </CampaignsCards>
          <CampaignButtons>
            <Link to={token ? '/challenges/campaigns' : '/account/login'}>
              <GreenButton>
                <FormattedMessage id="app.aboutHumanscalePage.handprint.viewMoreBtn" />
              </GreenButton>
            </Link>
          </CampaignButtons>
        </CampaignsBlock>
      </CampaignsMainWrapper>
      <JoinHandprinterWrapper>
        <JoinHandprinterContentBlock>
          <JoinHandprinterContent>
            <p>
              <FormattedMessage id="app.aboutHumanscalePage.handprint.joinToHandleprinter" />
            </p>
            <Link to="/account/login">
              <WhiteButton type="ghost" size="large">
                <FormattedMessage id="app.aboutHumanscalePage.join.link" />
              </WhiteButton>
            </Link>
          </JoinHandprinterContent>
        </JoinHandprinterContentBlock>
      </JoinHandprinterWrapper> */}
    </Fragment>
  )
}

AboutHumanscalePage.propTypes = {
  intl: intlShape.isRequired,
}

export default injectIntl(AboutHumanscalePage)
