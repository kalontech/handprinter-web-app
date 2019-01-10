import React from 'react'
import { Link } from 'react-router-dom'
import { Layout, Row, Col } from 'antd'
import styled from 'styled-components'
import { animateScroll } from 'react-scroll'

import footerLogo from './assets/footer_image.png'
import FooterLanguageSelector from './../FooterLanguageSelector'
import colors from './../../config/colors'
import { FormattedMessage } from 'react-intl'
import hexToRgba from '../../utils/hexToRgba'
import media from '../../utils/mediaQueryTemplate'
import { BlockContainer } from './../Styled'

const FooterWrap = styled(Layout.Footer)`
  padding: 0;
`

const FooterContent = styled.section`
  padding: 0;
  background-color: ${colors.dark};
  color: ${colors.white};
`

const Wrap = styled(BlockContainer)`
  padding: 80px 0;
  margin-top: -1px;
  ${media.phone`
   padding-top: 40px;
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
    letter-spacing: -0.25px;
    &:hover {
      color: ${colors.white};
    }
  }
`

const Logo = styled.div`
  margin-top: 15px;
  margin-bottom: 25px;

  ${media.largeDesktop`
   margin-top: 0;
    margin-bottom: 40px;
  `};
  ${media.phone`
   margin-bottom: -20px;
  `};
`

const Copyright = styled.p`
  font-size: 12px;
  font-weight: 500;
  color: ${hexToRgba(colors.white, 0.43)};
  ${media.largeDesktop`
    display: none;
  `};
`

const CopyrightTablet = styled(Copyright)`
  display: none;
  line-height: 34px;
  ${media.largeDesktop`
    display: block;
    margin-bottom: 20px;
  `};
  ${media.phone`
    margin-bottom: 0;
  `};
`

const Container = styled.div`
  margin-left: -20px;
  margin-right: -20px;
  ${media.largeDesktop`
    margin-left: 0;
    margin-right: 0;
  `};
`

const RowWrapper = styled(Row)`
  margin-bottom: 20px;
  ${media.phone`
    margin-top: 40px;
  `};
`

const LangsWrap = styled(Col)`
  ${media.largeDesktop`
    display: flex;
    align-items: center;
  `};
  ${media.phone`
   display: block;
  `};
`
const Langs = styled(FooterLanguageSelector)`
  ${media.phone`
   max-width: 100%;
    margin-bottom: 20px;
  `};
`

const Footer = () => (
  <FooterWrap>
    <FooterContent>
      <Wrap>
        <Container>
          <Row gutter={{ md: 20 }}>
            <Col md={24} xl={8}>
              <Logo>
                <img src={footerLogo} alt="" />
              </Logo>
              <Copyright>
                &copy;
                <FormattedMessage id="app.footer.copyright" />
              </Copyright>
            </Col>
            <Col md={24} xl={12}>
              <RowWrapper gutter={{ md: 20 }}>
                <Col xs={12} md={12} xl={12}>
                  <FooterMenu>
                    <li>
                      <Link to="/actions" onClick={animateScroll.scrollToTop}>
                        <FormattedMessage id="app.footer.menu.actions" />
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/pages/our-vision"
                        onClick={animateScroll.scrollToTop}
                      >
                        <FormattedMessage id="app.footer.menu.howItWorks" />
                      </Link>
                    </li>
                  </FooterMenu>
                </Col>
                <Col xs={12} md={12} xl={12}>
                  <FooterMenu>
                    <li>
                      <Link
                        to="/pages/measurement-units"
                        onClick={animateScroll.scrollToTop}
                      >
                        <FormattedMessage id="app.footer.menu.measurement" />
                      </Link>
                    </li>
                    <li>
                      <Link to="/pages/faq">
                        <FormattedMessage
                          id="app.footer.menu.faq"
                          onClick={animateScroll.scrollToTop}
                        />
                      </Link>
                    </li>
                  </FooterMenu>
                </Col>
              </RowWrapper>
            </Col>
            <LangsWrap md={24} xl={4}>
              <div style={{ width: '100%' }}>
                <Row gutter={{ md: 20 }} type="flex">
                  <Col
                    xs={{ span: 24, order: 2 }}
                    sm={{ span: 12, order: 1 }}
                    xl={24}
                  >
                    <CopyrightTablet>
                      &copy;
                      <FormattedMessage id="app.footer.copyright" />
                    </CopyrightTablet>
                  </Col>
                  <Col
                    xs={{ span: 24, order: 1 }}
                    sm={{ span: 12, order: 2 }}
                    xl={24}
                  >
                    <Langs />
                  </Col>
                </Row>
              </div>
            </LangsWrap>
          </Row>
        </Container>
      </Wrap>
    </FooterContent>
  </FooterWrap>
)

export default Footer
