import React from 'react'
import styled from 'styled-components'
import { FormattedHTMLMessage } from 'react-intl'
import { Row, Col } from 'antd'
import PropTypes from 'prop-types'

import { BlockContainer, BlockSubTitle, TextLarge } from 'components/Styled'
import colors from 'config/colors'
import media from 'utils/mediaQueryTemplate'
import ScrollAnimation from 'components/ScrollAnimation'

import eatonFullLogo from 'assets/branded/logos/eatonFullLogoTransparent.svg'
import fingerPrintleft from 'assets/homepage/actions-fingerprint.svg'
import eatonRegisterBlockImg from 'assets/homepage/eatonRegisterBlockImg.svg'

const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`

const BlockWrap = styled.div`
  width: 100%;
  height: 460px;
  background-color: ${colors.lightGray};
  padding: 60px 0;
  position: relative;
  overflow: hidden;
  margin-right: 40px;
  @media (max-width: 1280px) {
    padding: 60px 0 60px 80px;
  }
  ${media.largeDesktop`
    margin-right: 0;
    height: auto;
    padding: 60px 0;
  `}
`

const FingerprintImg = styled.img`
  position: absolute;
  left: -130px;
  bottom: -90px;
  transform: rotate(-40deg);
`

const SubTitle = styled(BlockSubTitle)`
  margin-bottom: 20px;
  max-width: 570px;
  letter-spacing: 0px;
  ${media.largeDesktop`
    max-width: 100%;
  `}
  ${media.phone`
    margin-bottom: 9px;
  `}
`

const StyledTextLarge = styled(TextLarge)`
  font-size: 16px;
  ${media.phone`
    font-size: 14px; 
    line-height: 25px;
  `}
`

const ImageWrap = styled.div`
  height: 100%;
  width: 90%;
  display: flex;
  justify-content: flex-end;
  ${media.tablet`
    width: 100%;
  `}
`

const Image = styled.img`
  position: relative;
  left: 21px;
  ${media.largeDesktop`
    position: relative;
    left: 75px;
    margin-top: 12px;
    width: 300px;
    top: -10px;
  `}
  ${media.desktop`
    left: auto;
    right: 15px;
  `}
  ${media.phone`
    left: 0px;
    top: 0px;
  `}
`

const RegisterBlock = styled.div`
  width: 1050px;
  height: 252px;
  background-color: ${colors.ocean};
  display: inline-block;
  color: ${colors.white};
  padding: 54px 100px 50px 200px;
  font-size: 16px;
  line-height: 28px;
  position: relative;
  top: -80px;
  ${media.largeDesktop`
    top: auto;
    width: 80%;
    padding-top: 30px;
  `}
  ${media.desktop`
    top: -40px;
    width: 86%;
    height: 332px;
    padding: 54px 40px 50px 200px;
  `}
  ${media.tablet`
    padding: 34px 40px 50px 170px;
    font-size: 15px;
  `}
  ${media.phone`
    width: 100%;
    padding: 28px 15px;
    font-size: 14px;
    line-height: 21px;
  `}
  p {
    font-weight: bold;
    margin-top: 22px;
  }
`

const RegisterBlockImg = styled.img`
  position: absolute;
  left: -132px;
  top: 40px;
  ${media.desktop`
    top: 70px;
  `}
  ${media.phone`
    bottom: -92px;
    left: 73px;
    top: auto;
  `}
`

const EatonBrandedBlock = ({ isLoggedIn = false }) => (
  <Wrap>
    <BlockWrap>
      <FingerprintImg src={fingerPrintleft} alt="" />
      <BlockContainer>
        <Row type="flex">
          <Col md={24} xl={14}>
            <ScrollAnimation bottom>
              <SubTitle>
                <FormattedHTMLMessage id="app.eatonHomePage.block.heading" />
              </SubTitle>
              <StyledTextLarge>
                <FormattedHTMLMessage id="app.eatonHomePage.block.description" />
              </StyledTextLarge>
            </ScrollAnimation>
          </Col>
          <Col md={24} xl={10} sm={24}>
            <ImageWrap>
              <ScrollAnimation bottom>
                <Image src={eatonFullLogo} alt="Eaton logo" />
              </ScrollAnimation>
            </ImageWrap>
          </Col>
        </Row>
      </BlockContainer>
    </BlockWrap>

    <RegisterBlock>
      <RegisterBlockImg src={eatonRegisterBlockImg} />
      <FormattedHTMLMessage id="app.eatonHomePage.block.registerBlock.text" />
      <p>
        <FormattedHTMLMessage
          id={
            isLoggedIn
              ? 'app.eatonHomePage.block.registerBlock.highlightedText.loggedIn'
              : 'app.eatonHomePage.block.registerBlock.highlightedText'
          }
        />
      </p>
    </RegisterBlock>
  </Wrap>
)

EatonBrandedBlock.propTypes = {
  isLoggedIn: PropTypes.boolean,
}

export default EatonBrandedBlock
