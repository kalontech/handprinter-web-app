import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { Button, Row, Col } from 'antd'
import colors from './../../config/colors'
import media from './../../utils/mediaQueryTemplate'
import { FormattedMessage } from 'react-intl'
import { BlockContainer, BlockSubTitle } from './../Styled'

const CtaButton = styled(Button)`
  height: 70px;
  margin: 0 auto;
  min-width: 280px;
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
    color: ${colors.eatonCtaBg};
  }
  ${media.phone`
    width: 100%;
    margin-top: 20px;
    height: 60px;
    font-size: 16px;
  `}
`

const CtaTitle = styled(BlockSubTitle)`
  color: ${colors.white};
  margin-bottom: 0;
  font-family: Arial;
  line-height: 50px;
  font-size: 40px;
  letter-spacing: -1px;
  font-weight: normal;
  ${media.desktop`
    font-size: 26px;
    line-height: 45px;
    letter-spacing: -1px;
  `}
`

const CtaWrap = styled.section`
  position: relative;
  padding: 60px 0;
  background: ${colors.eatonCtaBg};
  ${media.phone`
  padding-top: 40px;
  padding-bottom: 40px;
  .ant-row-flex {
    display: block;
    text-align: center;
  }
  `}
`

const Wrap = styled(Col)`
  display: flex;
  justify-content: center;
  ${media.phone`
    display: block;
  `}
`

const EatonCta = () => (
  <CtaWrap>
    <BlockContainer>
      <Row
        type="flex"
        align="middle"
        justify="space-between"
        gutter={{ md: 20 }}
      >
        <Col md={12} xl={16}>
          <CtaTitle>
            <FormattedMessage id="app.footer.cta.title" />
          </CtaTitle>
        </Col>
        <Wrap md={12} xl={8}>
          <Link to="/pages/our-vision">
            <CtaButton type="ghost" size="large">
              <FormattedMessage id="app.eatonFooter.cta.link" />
            </CtaButton>
          </Link>
        </Wrap>
      </Row>
    </BlockContainer>
  </CtaWrap>
)

export default EatonCta
