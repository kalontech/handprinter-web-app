import React, { useState, useEffect, Fragment } from 'react'
import { FormattedMessage, injectIntl, intlShape } from 'react-intl'
import { Link } from 'react-router-dom'
import { animateScroll } from 'react-scroll/modules'
import PageMetadata from 'components/PageMetadata'
import * as api from 'api/campaigns'
import { sizes } from 'utils/mediaQueryTemplate'
import { object } from 'prop-types'

import CampaignsCarousel from 'components/CampaignsCarousel'
import ScrollAnimation from 'components/ScrollAnimation'

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
  TakeActionDoItItemInfo,
  TakeActionShareTo,
  TakeActionSharedToItemInfo,
  CampaignsMainWrapper,
  CampaignsInfo,
  CampaignsHeader,
  CampaignsBlock,
  JoinHandprinterWrapper,
  JoinHandprinterContentBlock,
  JoinHandprinterContent,
  HandprintImagesWrapper,
  HandprintEarthImage,
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
  CampaignButtons,
  TakeActionDivider,
} from './styled'

import footprintFinger from './assets/footprintFinger.svg'
import footprintFingerMobile from './assets/footprintFingerMobile.svg'
import footprintFinger2 from './assets/footprintFinger2.svg'
import footprintLeap from './assets/footprintLeap.png'
import footprintImage from './assets/footprintImage.png'
import handprintImage from './assets/handprintImage.png'
import handprintImageLeapMobile from './assets/handprintImageLeapMobile.svg'
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

function AboutHumanscalePage(props) {
  const [campaigns, setCampaigns] = useState([])
  const [width, setWidth] = useState(window.innerWidth)

  useEffect(() => {
    animateScroll.scrollToTop()
    getCampaigns().then(data => setCampaigns(data))
  }, [])

  useEffect(() => {
    window.addEventListener('resize', handleWindowSizeChange)
    return () => {
      window.removeEventListener('resize', handleWindowSizeChange)
    }
  }, [])

  const getCampaigns = async () => {
    const {
      campaigns: { docs },
    } = await api.fetchCampaignsList()
    return docs
  }

  const handleWindowSizeChange = () => {
    setWidth(window.innerWidth)
  }

  const isTablet = width < sizes.largeDesktop
  const isMobile = width < sizes.tablet

  const token = window.localStorage.getItem('accessToken')

  return (
    <Fragment>
      <PageMetadata pageName="aboutInterfacePage" />

      <Hero>
        <HeroInfo>
          <HeroTitle>
            <FormattedMessage id="app.aboutHumanscalePage.hero.title" />
          </HeroTitle>
          {!props.user && (
            <Link to="/account/register">
              <WhiteButton type="ghost" size="large">
                <FormattedMessage id="app.aboutHumanscalePage.join.link" />
              </WhiteButton>
            </Link>
          )}
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
            {!isTablet && <FootprintFingerImage src={footprintFinger} alt="" />}
            {(isMobile || isTablet) && (
              <FootprintFingerImage src={footprintFingerMobile} alt="" />
            )}
            <FootprintFootImage src={footprintFinger2} alt="" />
          </FootprintImagesBlock>
        </FootprintWrapper>
      </WhatIsFootprint>
      <WhatIsHandprint>
        <HandprintWrapper>
          <HandprintImagesWrapper>
            <HandprintMainImage src={handprintImage} alt="" />
            {!isMobile && !isTablet && (
              <HandprintLeapImage src={handprintLeap} alt="" />
            )}
            {isMobile && (
              <HandprintLeapImage src={handprintImageLeapMobile} alt="" />
            )}
            <HandprintEarthImage src={earth} alt="" />
          </HandprintImagesWrapper>
          <HandprintInfo>
            <HandprintTitle>
              <FormattedMessage id="app.aboutHumanscalePage.handprint.title" />
            </HandprintTitle>
            <HandprintText>
              <FormattedMessage id="app.aboutHumanscalePage.handprint.text1" />
              <FormattedMessage id="app.aboutHumanscalePage.handprint.text2" />
            </HandprintText>
          </HandprintInfo>
        </HandprintWrapper>
      </WhatIsHandprint>
      <TakeActionWrapper>
        <TakeActionHeader>
          <p>
            <FormattedMessage id="app.aboutHumanscalePage.takeActionHeader" />
          </p>
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
            <TakeActionDivider style={{ right: '79px' }} />
          </TakeActionItemHeader>
          <TakeActionDoItItemInfo>
            <p>
              <FormattedMessage id="app.aboutHumanscalePage.handprint.takeActionDoItInfo" />
            </p>
            <TakeActionDoItImageWrapper>
              <TakeActionDoItMainImage src={doItMainImage} alt="" />
              <TakeActionDoItHandprint src={doItHandprint} alt="" />
            </TakeActionDoItImageWrapper>
          </TakeActionDoItItemInfo>
        </TakeActionDoIt>
        <TakeActionShareTo>
          <TakeActionItemHeader>
            <p>
              <FormattedMessage id="app.aboutHumanscalePage.handprint.takeActionShare" />
            </p>
            <TakeActionDivider style={{ right: '45px' }} />
          </TakeActionItemHeader>
          <TakeActionSharedToItemInfo>
            <p>
              <FormattedMessage id="app.aboutHumanscalePage.handprint.takeActionShareInfo" />
            </p>
            <SharedToImageWrapper>
              <TakeActionSharedToImage src={sharedToImage} alt="" />
              <SmallCircle src={smallOval} alt="" />
              <BigCircle src={bigOval} alt="" />
            </SharedToImageWrapper>
          </TakeActionSharedToItemInfo>
        </TakeActionShareTo>
      </TakeActionWrapper>
      <CampaignsMainWrapper>
        <CampaignsInfo>
          <CampaignsHeader>
            <FormattedMessage id="app.aboutHumanscalePage.handprint.campaignsHeader1" />
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
          <ScrollAnimation>
            <CampaignsCarousel campaigns={campaigns} token={token} />
          </ScrollAnimation>
          <CampaignButtons>
            <Link to={token ? '/challenges' : '/account/login'}>
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
            <Link to="/account/register">
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

AboutHumanscalePage.propTypes = {
  intl: intlShape.isRequired,
  user: object,
}

export default injectIntl(AboutHumanscalePage)
