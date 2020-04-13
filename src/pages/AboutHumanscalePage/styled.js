import styled from 'styled-components'
import colors from 'config/colors'
import media from 'utils/mediaQueryTemplate'
import hexToRgba from 'utils/hexToRgba'
import { Button } from 'antd'

import sliderArrow from 'assets/about-humanscale/arrow.svg'

import bg from '../../assets/about-humanscale/bg.png'

export const FootprintTitle = styled.h2`
  position: absolute;
  width: 500px;
  height: 71px;
  left: 98px;
  top: 117px;
  font-family: Noto Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 52px;
  line-height: 71px;
  letter-spacing: -0.4px;
  margin-bottom: 0;
  color: ${colors.humanscaleHeaderText};

  ${media.phone`
    line-height: 31px;
    font-size: 22px;
    letter-spacing: 0px;
  `}
`

export const FootprintText = styled.p`
  position: absolute;
  width: 400px;
  height: 252px;
  left: 98px;
  top: 187px;
  font-family: Noto Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 28px;
  display: flex;
  align-items: center;
  color: ${colors.interfaceFooterColor2};

  &:last-of-type {
    margin-bottom: 0;
  }
  ${media.phone`
    margin-bottom: 0;
    text-align: center;
  `}
`

export const HandprintTitle = styled.h2`
  position: absolute;
  width: 503px;
  height: 77px;
  left: 0px;
  top: -70px;
  font-family: Noto Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 52px;
  line-height: 71px;

  color: ${colors.humanscaleHeaderText};
  ${media.phone`
    line-height: 31px;
    font-size: 22px;
    letter-spacing: 0px;
  `}
`

export const HandprintText = styled.p`
  position: absolute;
  width: 400px;
  height: 255px;
  top: 50px;
  font-family: Noto Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 28px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  color: ${colors.interfaceFooterColor2};

  &:last-of-type {
    margin-bottom: 0;
  }
  ${media.phone`
    margin-bottom: 0;
    text-align: center;
  `}
`

export const Hero = styled.section`
  height: 899px;
  background: url(${bg}) no-repeat center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  text-align: center;
  img {
    position: absolute;
    bottom: 0;
    left: calc((100% - 850px) / 2);
    ${media.desktop` 
        left: 46px;
      `}
    ${media.phone` 
      position: static;
        align-self: self-start;
        margin-left: 46px;
        margin-top: 24px;
      `}
  }

  ${media.phone`
      flex-direction: column;
    justify-content: flex-end;
      height: 450px;
      background-position: center;
  `}
`

export const HeroInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: baseline;
  padding-left: 100px;
  width: 733px;
  height: 246px;
`

export const HeroTitle = styled.div`
  font-family: Helvetica Neue;
  font-weight: 300;
  font-size: 52px;
  line-height: 71px;
  text-align: left;
  color: ${colors.white};
  margin: 0 auto 50px;
  max-width: 850px;
  ${media.desktop`
    max-width: 560px;
    margin-bottom: 30px;
    line-height: 46px;
    font-size: 37px;
    letter-spacing: -0.4px;
  `}
  ${media.phone`
    margin-bottom: 8px;
    line-height: 36px;
    font-size: 28px;
    letter-spacing: 0px;
    margin-bottom: 15px;
  `}
`

export const WhiteButton = styled(Button)`
  text-transform: uppercase;
  width: 170px;
  height: 50px;
  margin: 0 auto;
  border: 1px solid ${colors.humanscaleLinkBg};
  border-radius: 0;
  background: ${colors.white};
  font-family: Noto Sans;
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 16px;
  display: flex;
  align-items: center;
  color: ${colors.humanscaleHeaderText};
  &&:hover,
  &&:focus {
    background: ${colors.lightGray};
    border-color: ${colors.white};
    color: ${colors.humanscaleHeaderText};
  }
`

export const GreenButton = styled(Button)`
  text-transform: uppercase;
  margin: 0 auto;
  border: 1px solid ${colors.ocean};
  border-radius: 0;
  background: ${colors.ocean};
  font-family: Noto Sans;
  font-style: normal;
  font-weight: bold;
  font-size: 12px;
  line-height: 16px;
  display: flex;
  align-items: center;
  height: 50px;
  width: 170px;
  color: ${colors.white};
  &&:hover,
  &&:focus {
    background: ${colors.btnSecondaryHover};
    border-color: ${colors.btnSecondaryHover};
    color: ${colors.white};
  }
`

// what is footprint
export const WhatIsFootprint = styled.section`
  height: 1000px;
  background: ${colors.humanscaleFootPrintBg};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
`

export const FootprintWrapper = styled.div`
  position: absolute;
  height: 641px;
  right: 0;
  left: 141px;
  top: 1080px;
  background: ${colors.white};
`

export const FootprintImagesBlock = styled.div`
  position: absolute;
  left: 652px;
  top: -127px;
`

export const FootprintMainImage = styled.img`
  position: absolute;
  width: 552px;
  height: 825px;
`

export const FootprintLeapImage = styled.img`
  height: 71px;
  width: 66px;
  position: relative;
  top: -120px;
  left: -20px;
`

export const FootprintFingerImage = styled.img`
  height: 320px;
  position: relative;
  top: 531px;
  right: 170px;
`

export const FootprintFootImage = styled.img`
  height: 250px;
  width: 100px;
  position: relative;
  top: 355px;
  right: -170px;
`

// What is handprint
export const WhatIsHandprint = styled.section`
  position: relative;
  height: 1000px;
  left: 0px;
  top: 0px;
  background: ${colors.white};
`

export const HandprintWrapper = styled.div`
  position: absolute;
  left: 0px;
  top: 230px;
  height: 641px;
  width: 100%;
  background: ${colors.white};
`

export const HandprintImagesWrapper = styled.div`
  width: 1200px;
`

export const HandprintMainImage = styled.img`
  position: absolute;
  left: 150px;
  margin-right: 40px;
`

export const HandprintLeapImage = styled.img`
  width: 90;
  position: relative;
  top: -30px;
  left: 80px;
`
export const HandprintFingerImage = styled.img`
  width: 90px;
  position: relative;
  top: -50px;
  left: 0px;
`

export const HandprintInfo = styled.div`
  width: 500px;
  position: absolute;
  left: 630px;
  margin-left: 200px;
`

// Take action
export const TakeActionWrapper = styled.section`
  height: 2560px;
  background: ${colors.humanscaleIvy};
`

export const TakeActionHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 300px;
  width: 100%;

  p {
    font-family: Noto Sans;
    font-style: normal;
    font-weight: normal;
    font-size: 52px;
    line-height: 71px;
    color: ${colors.white};
  }
`

export const TakeAction = styled.section`
  height: 820px;
`

export const TakeActionItemHeader = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 0 150px 0 150px;

  p {
    font-family: Noto Sans;
    font-style: normal;
    font-weight: bold;
    font-size: 22px;
    line-height: 30px;
    text-transform: uppercase;
    color: ${colors.white};
    margin-top: 5px;
  }
`

export const TakeActionDivider = styled.span`
  position: absolute;
  flex: 1;
  width: 73vw;
  border-top: 1px solid ${colors.white};
`

export const TakeActionItemInfo = styled.div`
  display: flex;
  justify-content: flex-start;

  p {
    font-size: 16px;
    line-height: 28px;
    color: ${colors.white};
    padding-left: 150px;
    padding-top: 45px;
    width: 470px;
  }
`

export const TakeActionMainImageWraper = styled.div`
  margin-top: 30px;
  position: absolute;
  right: 638px;
`

export const TakeActionMainImage = styled.img`
  position: absolute;
  width: 495px;
  height: 477px;
  z-index: 1;
`

export const TakeActionLeap = styled.img`
  width: 100px;
  position: absolute;
  top: -30px;
  left: 380px;
  z-index: 2;
`

export const TakeActionLeap2 = styled.img`
  width: 120px;
  position: absolute;
  top: -30px;
  left: 440px;
  z-index: 3;
`

export const TakeActionFingerprint = styled.img`
  width: 495px;
  height: 340px;
  position: absolute;
  top: 230px;
  left: -130px;
  z-index: 0;
`

export const TakeActionDoIt = styled.section`
  height: 820px;
`

export const TakeActionDoItImageWrapper = styled.section`
  position: absolute;
  right: 485px;
  margin-top: 30px;
`

export const TakeActionDoItMainImage = styled.img`
  position: absolute;
  width: 500px;
  height: 442px;
`

export const TakeActionDoItHandprint = styled.img`
  position: relative;
  top: 290px;
  left: -50px;
`

export const TakeActionShareTo = styled.section`
  height: 820px;
`

export const SharedToImageWrapper = styled.div`
  margin-top: 30px;
  margin-right: 150px;
  position: absolute;
  left: 50vw;
  width: 50vw;
`

export const TakeActionSharedToImage = styled.img`
  position: absolute;
  width: 591px;
  height: 422px;
  top: 0;
  left: -100px;
`

export const SmallCircle = styled.img`
  position: relative;
  width: 212px;
  height: 212px;
  top: 25px;
  left: 80px;
`

export const BigCircle = styled.img`
  position: relative;
  width: 422px;
  height: 422px;
  top: 22px;
  left: -235px;
`

// Wrapper for campaigns
export const CampaignsMainWrapper = styled.section`
  position: relative;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 899px;
  background: ${colors.white};

  p {
    width: 629px;
    height: 56.14px;
    font-family: Noto Sans;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 28px;

    display: flex;
    align-items: center;
    text-align: center;
  }
`

export const CampaignsHeader = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  width: 731px;
  height: 142px;
  margin-top: 100px;
  margin-bottom: 8px;
  font-family: Noto Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 52px;
  line-height: 71px;
  text-align: center;
  color: ${colors.humanscaleHeaderText};
`

export const CampaignsBlock = styled.div`
  position: absolute;
  bottom: 100px;
  right: 0;
  width: 1300px;
  height: 354px;
  background: ${colors.humanscaleBlueAsh};
`

export const CampaignsFinger = styled.img`
  position: relative;
  left: 0;
  bottom: -50px;
  width: 330px;
  height: 360px;
`

export const CampaignsCards = styled.div`
  position: absolute;
  left: 40px;
  top: -30px;
`

export const CampaignsCard = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: ${colors.white};
  width: 380px;
  height: 190px;
  margin-right: 40px;
  box-shadow: 0px 1px 16px ${hexToRgba(colors.dark, 0.3)};
  cursor: pointer;
  img {
    width: 130px;
    height: 130px;
    border-radius: 50%;
    margin-left: 25px;
    border: 4px solid ${colors.green};
  }

  div {
    width: 200px;
    font-family: Noto Serif;
    font-style: normal;
    font-weight: normal;
    font-size: 19px;
    line-height: 26px;
    color: #344442;
    text-align: left;

    span {
      font-family: Noto Sans;
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      line-height: 20px;
      color: #858f8e;
      text-align: left;
    }
  }
`

export const CampaignsInfo = styled.div`
  padding-top: 50px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  div {
    display: flex;
    justify-content: space-around;
    text-align: center;
    width: 100%;
  }
`

export const CampaignButtons = styled.div`
  position: absolute;
  width: 170px;
  height: 50px;
  left: 40px;
  bottom: 98px;
`

// Join handprinter
export const JoinHandprinterWrapper = styled.section`
  position: relative;
  left: 0;
  top: 0;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 603px;
  background: ${colors.humanscaleIvy};
`

export const JoinHandprinterContentBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 1134px;
  height: 352px;
  border: 1px solid ${colors.white};
`

export const JoinHandprinterContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  p {
    width: 500px;
    font-size: 52px;
    line-height: 71px;
    text-align: center;
    color: ${colors.white};
    margin-bottom: 26px;
  }
`

export const Slider = styled.div`
  .slick-arrow {
    z-index: 1;
    width: 51px;
    height: 51px;
    position: absolute;
    transform: translateY(-50%);
    background: ${colors.white} url(${sliderArrow}) no-repeat center / 50%;
    &:hover,
    &:focus {
      background: ${colors.white} url(${sliderArrow}) no-repeat center / 50%;
    }
    ${media.phone`
      width: 30px;
      height: 30px;
     `}
    &.slick-prev {
      position: absolute;
      top: 248px;
      left: 930px;
      transform: rotate(180deg);
      ${media.phone`
        left: 15px;
        transform: translateY(-50%) rotate(180deg);
      `}
    }
    &.slick-next {
      position: absolute;
      top: 273.5px;
      left: 1000px;
      margin-left: 15px;
      ${media.phone`
        right: 15px;
      `}
    }
  }
`
export const Slide = styled.div``
