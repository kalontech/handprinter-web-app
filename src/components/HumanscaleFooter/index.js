import React from 'react'
import { Link } from 'react-router-dom'
import { Layout, Row, Col } from 'antd'
import styled from 'styled-components'
import { FormattedMessage, FormattedHTMLMessage } from 'react-intl'

import FooterLanguageSelector from 'components/FooterLanguageSelector'
import colors from 'config/colors'
import { BlockContainer } from 'components/Styled'
import media from 'utils/mediaQueryTemplate'
import { CONTACT_DATA } from 'utils/constants'

const FooterWrap = styled(Layout.Footer)`
  padding: 0;
  margin: 50px 20px 20px;
  ${media.desktop`
    margin: 30px 34px 34px;
  `};
  ${media.phone`
    margin: 30px 15px 15px;
  `};
`

const Wrap = styled(BlockContainer)`
  padding: 0 20px;
`

const FooterContent = styled.section`
  padding: 60px 0;
  min-height: 270px;
  background: ${colors.interfaceFooterBg};
  color: ${colors.white};
  font-family: 'Helvetica Neue', sans-serif;
  ${media.phone`
   padding-top 50px;
   padding-bottom: 30px;
  `};
`

const FooterMenu = styled.ul`
  list-style: none;
  padding-left: 0;
  margin-bottom: 0;
  a {
    text-decoration: none;
    line-height: 40px;
    font-size: 14px;
    color: ${colors.interfaceFooterColor};
    &:hover {
      color: ${colors.dark};
    }
    ${media.phone`
      line-height: 46px;
    `};
  }
`

const Logo = styled.div`
  margin-bottom: 15px;
  ${media.phone`
  margin-bottom: 25px;
  `};
`

const Text = styled.div`
  font-size: 11px;
  line-height: 18px;
  max-width: 445px;
  color: ${colors.interfaceFooterColor2};
  ${media.phone`
    max-width: 100%;
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
  ${media.largeDesktop`
    margin-top: 40px;
  `};
`
const Langs = styled(FooterLanguageSelector)`
  background: ${colors.interfaceLanguageSelectorBg};
  color: ${colors.interfaceFooterColor2};
  ${media.phone`
    max-width: 100%;
  `};
`
const LangsWrap = styled(Col)`
  ${media.largeDesktop`
    margin-top: 50px;
    display: flex;
    align-items: center;
  `};
  ${media.phone`
    display: block;
    margin-top: 40px;
  `};
`

const Copyright = styled.div`
  font-size: 12px;
  background-color: ${colors.interfaceCopyright};
  line-height: 20px;
  font-family: 'Helvetica Neue', sans-serif;
`

const CopyrightContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 12px;
  height: 60px;
  color: ${colors.interfaceFooterColor3};
  ${media.phone`
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 75px;
  `};
`

const HumanscaleFooter = () => (
  <FooterWrap>
    <FooterContent>
      <Wrap>
        <Container>
          <Row gutter={{ md: 20 }}>
            <Col xs={24} md={12} xl={10}>
              <Logo>
                <img
                  src={''}
                  alt={<FormattedMessage id="app.footer.menu.actions" />}
                />
              </Logo>
              <Text>
                <FormattedHTMLMessage id="app.interfaceFooter.text" />
              </Text>
            </Col>
            <Col
              xs={24}
              md={{ span: 10, offset: 2 }}
              xl={{ span: 10, offset: 0 }}
            >
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
                      <a href={CONTACT_DATA.EMAIL}>
                        <FormattedMessage id="app.footer.menu.contact" />
                      </a>
                    </li>
                  </FooterMenu>
                </Col>
              </RowWrapper>
            </Col>
            <LangsWrap xs={24} md={24} xl={4}>
              <Langs
                bg={colors.interfaceLanguageSelectorBg}
                color={colors.interfaceFooterColor2}
              />
            </LangsWrap>
          </Row>
        </Container>
      </Wrap>
    </FooterContent>
    <Copyright>
      <BlockContainer>
        <CopyrightContent>
          <img
            src={''}
            alt={<FormattedMessage id="app.humanscaleFooter.logoCaption" />}
          />
          <div>
            <FormattedHTMLMessage id="app.humanscaleFooter.copyright" />
          </div>
        </CopyrightContent>
      </BlockContainer>
    </Copyright>
  </FooterWrap>
)

export default HumanscaleFooter
