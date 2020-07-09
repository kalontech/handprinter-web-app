import React from 'react'
import { Row, Col } from 'antd'
import { Link } from 'react-router-dom'
import { FormattedMessage } from 'react-intl'
import PropTypes from 'prop-types'
import { CONTACT_DATA } from 'utils/constants'

import FooterUnitsSelector from '../FooterUnitsSelector'
import footerLogo from './assets/footer_image.png'

import {
  FooterWrap,
  FooterContent,
  Wrap,
  FooterImage,
  Decription,
  DecriptionLink,
  RowWrapper,
  FooterMenu,
  LangsWrap,
  Langs,
  CopyrightBlock,
  Copyright,
} from './styled'

const Footer = ({ brandedConfig }) => (
  <FooterWrap>
    {/* <Intercom appID="az33rewf" /> */}
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
                      {!brandedConfig && (
                        <li>
                          <Link to="/pages/for-organizations">
                            <FormattedMessage id="app.header.menu.forOrganizations" />
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
                    <Col xs={{ span: 24 }}>
                      <FooterUnitsSelector />
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
