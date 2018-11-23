import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import ctaImg from './assets/cta-image.png'
import ctaBg from './assets/cta-left-fingerprint.png'
import colors from './../../config/colors'
import { FormattedMessage } from 'react-intl'
import { PrimaryButton, BlockContainer, BlockSubTitle } from './../Styled'
import FingerPrintIcon from '../../assets/icons/FingerPrintIcon'

const CtaTitle = styled(BlockSubTitle)`
  color: ${colors.white};
  margin-bottom: 26px;
`

const CtaImage = styled.img`
  position: absolute;
  right: 100px;
  bottom: 0;
`

const CtaWrap = styled.section`
  position: relative;
  background: ${colors.ocean} url("${ctaBg}") no-repeat left center;
 

`

const Wrap = styled(BlockContainer)`
  padding: 80px 0;
`

const Cta = () => (
  <CtaWrap>
    <Wrap>
      <CtaTitle>
        <FormattedMessage id="app.footer.cta.title" />
      </CtaTitle>
      <Link to="/account/register">
        <PrimaryButton type="primary" size="large">
          <FingerPrintIcon />
          <FormattedMessage id="app.footer.cta.link" />
        </PrimaryButton>
      </Link>
      <CtaImage src={ctaImg} alt="cta image" />
    </Wrap>
  </CtaWrap>
)

export default Cta
