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
} from './styled'

import footprintFinger from './assets/footprintFinger.svg'
import footprintFinger2 from './assets/footprintFinger2.svg'
import footprintLeap from './assets/footprintLeap.png'
import footprintImage from './assets/footprintImage.png'
import handprintImage from './assets/handprintImage.png'

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
            <HandprintMainImage src={handprintImage} alt="" />
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
          <TakeAction />
          <TakeActionDoIt />
          <TakeActionShareTo />
        </TakeActionWrapper>
        <CampaignsMainWrapper>
          <CampaignsInfo>
            <CampaignsHeader>Yes shrink your footprint.</CampaignsHeader>
            <CampaignsHeader>But also grow your handprint!</CampaignsHeader>
            <p>
              Just take one of the actions from the Challenges! There are so
              many ways to shrink your footprint. Hundreds of people are using
              these ideas to reduce their footprints.
            </p>
          </CampaignsInfo>

          <CampaignsBlock>BLOCK</CampaignsBlock>
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
