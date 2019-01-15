import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Button } from 'antd'
import colors from './../../config/colors'
import media from './../../utils/mediaQueryTemplate'
import { FormattedMessage } from 'react-intl'
import { BlockContainer, BlockSubTitle } from './../Styled'

import bg from './assets/cta.jpg'

const CtaButton = styled(Button)`
  width: 134px;
  font-size: 16px;
  font-weight: normal;
  max-width: 600px;
  margin: 0 auto;
  border: 2px solid ${colors.red};
  border-radius: 2px;
  color: ${colors.white};
  background: ${colors.red};
  font-family: 'Helvetica Neue', sans-serif;
  &&:hover,
  &&:focus {
    border-color: ${colors.red};
    color: ${colors.white};
    background: transparent;
  }
`

const CtaTitle = styled(BlockSubTitle)`
  margin-bottom: 20px;
  color: ${colors.white};
  line-height: 46px;
  font-size: 37px;
  text-align: center;
  letter-spacing: -0.4px;
  font-weight: 300;
  font-family: 'Helvetica Neue', sans-serif;
  ${media.phone`
    line-height: 36px;
    font-size: 28px;
  `}
`

const CtaWrap = styled.section`
  position: relative;
  height: 334px;
  display: flex;
  justify-content: space-center;
  align-items: center;
  background: url(${bg}) no-repeat center;
  background-size: cover;
`

const Wrap = styled(BlockContainer)`
  max-width: 550px;
`

const EatonCta = () => (
  <CtaWrap>
    <Wrap>
      <CtaTitle>
        <FormattedMessage id="app.interfaceCta.text" />
      </CtaTitle>
      <Link to="/pages/our-vision">
        <CtaButton type="ghost" size="large">
          <FormattedMessage id="app.interfaceCta.link" />
        </CtaButton>
      </Link>
    </Wrap>
  </CtaWrap>
)

export default EatonCta
