import React from 'react'
import { Link } from 'react-router-dom'
import { Layout, Row, Col } from 'antd'
import styled from 'styled-components'
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl'

import FooterLanguageSelector from 'components/FooterLanguageSelector'
import colors from 'config/colors'
import hexToRgba from 'utils/hexToRgba'
import { BlockContainer } from 'components/Styled'
import media from 'utils/mediaQueryTemplate'
import { CONTACT_DATA } from 'utils/constants'

import footerLogo from './assets/footerLogo.svg'
import footerLogoSmall from './assets/footerLogoSmall.svg'

const FooterWrap = styled(Layout.Footer)`
  padding: 0;
  background: #5d676f;
`

const FooterContent = styled.section`
  padding: 60px 0;
  min-height: 325px;
  background: #5d676f;
  color: ${colors.white};
  font-family: Arial;
  ${media.largeDesktop`
   padding-bottom: 40px;
  `};
`

const FooterMenu = styled.ul`
  list-style: none;
  padding-left: 0;
  a {
    text-decoration: none;
    line-height: 36px;
    font-size: 16px;
    color: ${hexToRgba(colors.white, 0.7)};
    &:hover {
      color: ${colors.white};
    }
    ${media.phone`
      line-height: 46px;
    `};
  }
`

const Logo = styled.div`
  margin-top: -20px;
  margin-bottom: 15px;
`

const Text = styled.div`
  font-size: 12px;
  line-height: 20px;
  max-width: 300px;
`

const RowWrapper = styled(Row)`
  margin-bottom: 20px;
  ${media.phone`
    margin-top: 40px;
  `};
`
const Langs = styled(FooterLanguageSelector)`
  ${media.phone`
    max-width: 100%;
  `};
`
const LangsWrap = styled(Col)`
  display: flex;
  justify-content: flex-end;
  ${media.largeDesktop`
    justify-content: flex-start;
    align-items: center;
  `};
  ${media.phone`
    display: block;
  `};
`

const Copyright = styled.div`
  font-size: 12px;
  color: ${hexToRgba(colors.white, 0.43)};
  background-color: #353f47;
  font-size: 12px;
  line-height: 20px;
  font-family: Arial;
`

const CopyrightContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 12px;
  height: 60px;
  color: ${hexToRgba(colors.white, 0.43)};
  ${media.phone`
    flex-direction: column;
    align-items: center;
  `};
`

const SmallLogo = styled.div`
  display: flex;
  align-items: flex-end;
  img {
    margin-left: 10px;
  }
`

const EatonFooter = () => (
  <FooterWrap>
    <FooterContent>
      <BlockContainer>
        <Row gutter={{ md: 20 }}>
          <Col xs={24} md={12} xl={8}>
            <Logo>
              <img src={footerLogo} alt="" />
            </Logo>
            <Text>
              <FormattedMessage id="app.eatonFooter.text" />
            </Text>
          </Col>
          <Col xs={24} md={12} xl={12}>
            <RowWrapper gutter={{ md: 20 }}>
              <Col xs={12} md={12} xl={12}>
                <FooterMenu>
                  <li>
                    <Link to="/pages/our-vision">
                      <FormattedMessage id="app.footer.menu.howItWorks" />
                    </Link>
                  </li>
                  <li>
                    <Link to="/pages/measurement-units">
                      <FormattedMessage id="app.footer.menu.measurement" />
                    </Link>
                  </li>
                  <li>
                    <Link to="/pages/faq">
                      <FormattedMessage id="app.footer.menu.faq" />
                    </Link>
                  </li>
                </FooterMenu>
              </Col>
              <Col xs={12} md={12} xl={12}>
                <FooterMenu>
                  <li>
                    <Link to="/">
                      <FormattedMessage id="app.footer.menu.homepage" />
                    </Link>
                  </li>
                  <li>
                    <Link to="/actions">
                      <FormattedMessage id="app.footer.menu.actions" />
                    </Link>
                  </li>
                  <li>
                    <a href={CONTACT_DATA.MAIL}>
                      <FormattedMessage id="app.footer.menu.contact" />
                    </a>
                  </li>
                </FooterMenu>
              </Col>
            </RowWrapper>
          </Col>
          <LangsWrap xs={24} md={12} xl={4}>
            <Langs />
          </LangsWrap>
        </Row>
      </BlockContainer>
    </FooterContent>
    <Copyright>
      <BlockContainer>
        <CopyrightContent>
          <SmallLogo>
            <FormattedMessage id="app.eatonFooter.poweredBy" />{' '}
            <img src={footerLogoSmall} alt="app.eatonFooter.logoCaption" />
          </SmallLogo>
          <div>
            <FormattedHTMLMessage id="app.eatonFooter.copyright" />
          </div>
        </CopyrightContent>
      </BlockContainer>
    </Copyright>
  </FooterWrap>
)

export default EatonFooter
