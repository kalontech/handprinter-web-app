import React from 'react'
import { Layout, Row, Col } from 'antd'
import styled, { css } from 'styled-components'
import { Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import PropTypes from 'prop-types'

import { BlockContainer } from 'components/Styled'
import FooterLanguageSelector from 'components/FooterLanguageSelector'
import colors from 'config/colors'
import hexToRgba from 'utils/hexToRgba'
import media from 'utils/mediaQueryTemplate'
import { CONTACT_DATA } from 'utils/constants'

import footerLogo from './assets/footer_image.png'

const FooterWrap = styled(Layout.Footer)`
  padding: 0;
`

const FooterContent = styled.section`
  padding: 0;
  background-color: ${colors.dark};
  color: ${colors.white};
`

const Wrap = styled(BlockContainer)`
  padding: 80px 0 60px;
  margin-top: -1px;
  overflow: hidden;
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

const FooterImage = styled.div`
  margin-top: 15px;
  margin-bottom: 15px;
  ${({ desktop }) =>
    desktop
      ? css`
          ${media.largeDesktop`
        display: none;
      `}
        `
      : css`
          display: none;
          ${media.largeDesktop`
        display: block;
      `}
          ${media.phone`
        display: none;
      `}
        `}

  ${media.largeDesktop`
   margin-top: 0;
    margin-bottom: 40px;
  `};
  ${media.phone`
   margin-bottom: -20px;
  `};
`

const CopyrightBlock = styled.div`
  color: ${colors.white};
  background-color: ${colors.footerDropdownBg};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px;
`

const Copyright = styled.p`
  font-size: 14px;
  color: ${hexToRgba(colors.white, 0.43)};
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

  ${({ largeDesktopPhone, tablet }) =>
    largeDesktopPhone
      ? css`
          ${media.largeDesktop`
        display: none;
      `}
          ${media.phone`
        display: block;
      `}
        `
      : tablet
      ? css`
          display: none;
          ${media.largeDesktop`
        display: block;
      `}
          ${media.phone`
        display: none;
      `}
        `
      : ''}
`
const Langs = styled(FooterLanguageSelector)`
  ${media.phone`
   max-width: 100%;
    margin-bottom: 20px;
  `};
`

const Decription = styled.p`
  text-transform: uppercase;
  font-family: Noto Sans;
  font-style: normal;
  font-weight: bold;
  font-size: 10px;
  line-height: 20px;
  text-transform: uppercase;
  color: ${hexToRgba(colors.white, 0.43)};
  ${media.largeDesktop`
    margin-bottom: 30px;
  `}
`

const DecriptionLink = styled.a`
  color: ${hexToRgba(colors.white, 0.43)};
  text-decoration: underline;
  &:hover,
  &:focus,
  &:active {
    color: ${hexToRgba(colors.white, 0.43)};
  }
`

const Footer = ({ brandedConfig }) => (
  <FooterWrap>
    <FooterContent>
      <Wrap>
        <Row>
          <Col md={{ span: 18, offset: 3 }} xl={{ span: 24, offset: 0 }}>
            <Row gutter={{ md: 20 }}>
              <Col md={24} xl={8}>
                <FooterImage desktop>
                  <img src={footerLogo} alt="" />
                </FooterImage>
                <Decription>
                  <FormattedMessage id="app.footer.description" />{' '}
                  <DecriptionLink
                    href="http://socialhotspot.org"
                    target="_blank"
                  >
                    <FormattedMessage id="app.footer.description.link" />
                  </DecriptionLink>
                </Decription>
              </Col>
              <Col md={24} xl={12}>
                <RowWrapper gutter={{ md: 20 }}>
                  <Col xs={12} md={10} xl={12}>
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
                      {!brandedConfig && (
                        <li>
                          <Link to="/pages/donations">
                            <FormattedMessage id="app.footer.menu.donations" />
                          </Link>
                        </li>
                      )}
                    </FooterMenu>
                    <FooterImage mobile>
                      <img src={footerLogo} alt="" />
                    </FooterImage>
                  </Col>
                  <Col
                    xs={12}
                    md={{ span: 10, offset: 4 }}
                    xl={{ span: 12, offset: 0 }}
                  >
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
                        <a href={CONTACT_DATA.EMAIL}>
                          <FormattedMessage id="app.footer.menu.contact" />
                        </a>
                      </li>
                      <li>
                        <Link to="/pages/privacy-policy">
                          <FormattedMessage id="app.footer.menu.privacyPolicy" />
                        </Link>
                      </li>
                    </FooterMenu>
                    <LangsWrap md={24} xl={4} tablet>
                      <div style={{ width: '100%' }}>
                        <Row gutter={{ md: 20 }} type="flex">
                          <Col xs={{ span: 24 }}>
                            <Langs />
                          </Col>
                        </Row>
                      </div>
                    </LangsWrap>
                  </Col>
                </RowWrapper>
              </Col>
              <LangsWrap md={24} xl={4} largeDesktopPhone>
                <div style={{ width: '100%' }}>
                  <Row gutter={{ md: 20 }} type="flex">
                    <Col xs={{ span: 24 }}>
                      <Langs />
                    </Col>
                  </Row>
                </div>
              </LangsWrap>
            </Row>
          </Col>
        </Row>
      </Wrap>
    </FooterContent>
    <CopyrightBlock>
      <Copyright>
        <FormattedMessage id="app.footer.copyright" />
      </Copyright>
    </CopyrightBlock>
  </FooterWrap>
)

Footer.propTypes = {
  brandedConfig: PropTypes.object,
}
export default Footer
