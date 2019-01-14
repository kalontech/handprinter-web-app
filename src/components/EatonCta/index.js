import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Button } from 'antd'
import colors from './../../config/colors'
import { FormattedMessage } from 'react-intl'
import { BlockContainer, BlockSubTitle } from './../Styled'

const CtaButton = styled(Button)`
  line-height: 29px;
  font-size: 18px;
  max-width: 600px;
  margin: 0 auto;
  width: 280px;
  border: 2px solid ${colors.white};
  border-radius: 0;
  font-family: Arial;
  font-size: 20px;
  letter-spacing: -0.2px;
  color: ${colors.white};
  &&:hover,
  &&:focus {
    border-color: ${colors.white};
    background: ${colors.white};
    color: ${colors.darkBlue};
  }
`

const CtaTitle = styled(BlockSubTitle)`
  color: ${colors.white};
  margin-bottom: 0;
  font-family: Arial;
  line-height: 50px;
  font-size: 40px;
  letter-spacing: -1px;
  font-weight: normal;
`

const CtaWrap = styled.section`
  position: relative;
  background: #00b2a9;
`

const Wrap = styled(BlockContainer)`
  padding: 62px 0;
  display: flex;
  justify-content: space-between;
`

const EatonCta = () => (
  <CtaWrap>
    <Wrap>
      <CtaTitle>
        <FormattedMessage id="app.footer.cta.title" />
      </CtaTitle>
      <Link to="/pages/our-vision">
        <CtaButton type="ghost" size="large">
          <FormattedMessage id="app.eatonFooter.cta.link" />
        </CtaButton>
      </Link>
    </Wrap>
  </CtaWrap>
)

export default EatonCta
