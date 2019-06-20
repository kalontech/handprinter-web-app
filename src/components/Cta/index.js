import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { FormattedMessage } from 'react-intl'

import { PrimaryButton, BlockContainer, BlockSubTitle } from 'components/Styled'
import colors from 'config/colors'
import media from 'utils/mediaQueryTemplate'
import FingerPrintIcon from 'assets/icons/FingerPrintIcon'

import ctaImg from './assets/cta-image.png'
import ctaBg from './assets/cta-left-fingerprint.png'
import ctaBgRight from './assets/cta-right-fingerprint.png'

const CtaTitle = styled(BlockSubTitle)`
  color: ${colors.white};
  margin-bottom: 26px;
`

const CtaImage = styled.img`
  position: absolute;
  right: 100px;
  bottom: -20px;
  ${media.largeDesktop`
   right: 15px;
  `};
  ${media.desktop`
   display: none;
  `};
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

const Cta = overrides => (
  <CtaWrap>
    <Wrap>
      <CtaTitle>
        <FormattedMessage id="app.footer.cta.title" />
      </CtaTitle>
      <Link to="/account/register">
        <PrimaryButton type="primary" size="large">
          <FingerPrintIcon />
          <FormattedMessage id={'app.footer.cta.link'} />
        </PrimaryButton>
      </Link>
      <CtaImage src={ctaImg} alt="cta image" />
    </Wrap>
  </CtaWrap>
)

export default Cta
