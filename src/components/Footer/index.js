import React from 'react'
import { Link } from 'react-router-dom'
import { Layout, Row, Col } from 'antd'
import styled from 'styled-components'
import footerLogo from './assets/footer_image.png'
import FooterLanguageSelector from './../FooterLanguageSelector'
import colors from './../../config/colors'
import { FormattedMessage } from 'react-intl'
import hexToRgba from '../../utils/hexToRgba'
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
  }
`

const Logo = styled.div`
    margin-top: 15px
    margin-bottom: 25px;
`

const Copyright = styled.p`
  font-size: 12px;
  color: ${hexToRgba(colors.white, 0.43)};
`

const Footer = () => (
  <FooterWrap>
    <FooterContent>
      <Wrap>
        <Row>
          <Col span={8}>
            <Logo>
              <img src={footerLogo} alt="" />
            </Logo>
            <Copyright>
              &copy;
              <FormattedMessage id="app.footer.copyright" />
            </Copyright>
          </Col>
          <Col span={6}>
            <FooterMenu>
              <li>
                <Link to="/actions">
                  <FormattedMessage id="app.footer.menu.actions" />
                </Link>
              </li>
              <li>
                <Link to="/pages/for-organizations">
                  <FormattedMessage id="app.footer.menu.organizations" />
                </Link>
              </li>
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
            </FooterMenu>
          </Col>
          <Col span={6}>
            <FooterMenu>
              <li>
                <Link to="/">
                  <FormattedMessage id="app.footer.menu.contact" />
                </Link>
              </li>
              <li>
                <Link to="/pages/faq">
                  <FormattedMessage id="app.footer.menu.faq" />
                </Link>
              </li>
              <li>
                <Link to="/">
                  <FormattedMessage id="app.footer.menu.termsOfUse" />
                </Link>
              </li>
              <li>
                <Link to="/">
                  <FormattedMessage id="app.footer.menu.privacyPolicy" />
                </Link>
              </li>
            </FooterMenu>
          </Col>
          <Col span={4}>
            <FooterLanguageSelector />
          </Col>
        </Row>
      </Wrap>
    </FooterContent>
  </FooterWrap>
)

export default Footer
