import styled from 'styled-components'
import colors from 'config/colors'
import media from 'utils/mediaQueryTemplate'
import hexToRgba from 'utils/hexToRgba'
import { Button } from 'antd'

import bg from '../../assets/about-humanscale/bg.png'

export const FootprintTitle = styled.h2`
  position: absolute;
  width: 500px;
  height: 71px;
  left: 133px;
  top: 87px;
  font-family: Noto Sans;
  font-style: normal;
  font-weight: normal;
  text-align: left;
  font-size: 42px;
  line-height: 71px;
  letter-spacing: -0.4px;
  margin-bottom: 0;
  color: ${colors.humanscaleHeaderText};

  ${media.largeDesktop`
    width: 100%;
    height: 34px;
    left: 0px;
    top: 30px;
    font-size: 40px;
    line-height: 54px;
    margin-top: 24px;
    text-align: center;
  `}

  ${media.phone`
    width: 100%;
    height: 34px;
    left: 0px;
    top: -10px;
    font-size: 25px;
    line-height: 34px;
    margin-top: 24px;
    text-align: center;
  `}
`

export const FootprintText = styled.p`
  position: absolute;
  width: 400px;
  height: 252px;
  left: 130px;
  top: 230px;
  font-family: Noto Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 16px;
  line-height: 28px;
  display: flex;
  align-items: center;
  text-align: left;
  color: ${colors.interfaceFooterColor2};

  &:last-of-type {
    margin-bottom: 0;
  }

  ${media.largeDesktop`
    width: 518px;
    height: 288px;
    left: calc(50% - 534px/2 + 12.1px);
    right: 20px;
    top: 54px;
    font-size: 16px;
    line-height: 28px;
    color: ${colors.dark};
    margin-top: 20px;
    text-align: center;
  `}

  ${media.phone`
    width: 250px;
    height: 288px;
    left: calc(50% - 280px/2 + 12.1px);
    right: 20px;
    top: 74px;
    font-size: 14px;
    line-height: 22px;
    color: ${colors.dark};
    margin-top: 20px;
  `}
`

export const HandprintTitle = styled.h2`
  position: absolute;
  width: 603px;
  height: 77px;
  left: 100px;
  top: -140px;
  word-break: normal;
  font-family: Noto Sans;
  font-style: normal;
  font-weight: normal;
  text-align: left;
  font-size: 42px;
  line-height: 71px;
  color: ${colors.humanscaleHeaderText};

  ${media.largeDesktop`
    width: 100%;
    height: 34px;
    left: 0px;
    top: 0px;
    font-size: 40px;
    line-height: 54px;
    margin: 0px 20px;
    text-align: center;
  `}

  ${media.phone`
    width: 250px;
    height: 34px;
    left: 0px;
    top: -30px;
    font-size: 25px;
    line-height: 34px;
    margin: 0px 20px;
    text-align: center;
  `}
`

export const HandprintText = styled.p`
  position: absolute;
  left: 100px;
  height: 230px;
  font-family: Noto Sans;
  font-style: normal;
  font-weight: normal;
  text-align: left;
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

  ${media.largeDesktop`
    width: 518px;
    height: 196px;
    left: calc(50% - 534px/2 + 12.1px);
    top: 90px;
    font-size: 16px;
    line-height: 28px;
    color: ${colors.dark};
    margin: 0px 20px;
    align-items: center;
    text-align: center;
  `}

  ${media.phone`
    width: 250px;
    height: 265px;
    left: 0px;
    top: 50px;
    font-size: 14px;
    line-height: 22px;
    text-align: center;
    color: ${colors.dark};
    margin: 0px 20px;
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

  ${media.largeDesktop`
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 942px;
      background-position: center;
  `}

  ${media.desktop`
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 942px;
      background-position: center;
  `}

  ${media.phone`
    flex-direction: column;
    justify-content: center;
    height: 516px;
    background-position: center;
  `}
`

export const HeroInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: baseline;
  text-align: left;
  padding-left: 100px;
  width: 733px;
  height: 346px;

  ${media.largeDesktop`
    height: 170px;
    left: 0px;
    top: 0px;
    font-family: Noto Sans;
    font-style: normal;
    font-weight: normal;
    font-size: 40px;
    line-height: 54px;
    text-align: center;
    color: ${colors.white};
    flex: none;
    order: 0;
    align-self: center;
    padding-left: 0px;
    align-items: center;
  `}

  ${media.phone`
    width: 270px;
    min-height: 145px;
    padding-left: 0px;
    margin: -150px 35px 0px 35px;
    align-items: center;
  `}
`

export const HeroTitle = styled.div`
  font-family: Helvetica Neue;
  font-weight: 300;
  font-size: 52px;
  line-height: 71px;
  text-align: left;
  color: ${colors.white};
  margin: 0 auto 50px;
  width: 670px;

  ${media.largeDesktop`
    width: 520px;
    margin-bottom: 30px;
    font-size: 40px;
    font-weight: 400;
    line-height: 54px;
    letter-spacing: -0.4px;
    text-align: center;
  `}

  ${media.phone`
    font-family: Noto Sans;
    font-style: normal;
    font-weight: normal;
    font-size: 25px;
    line-height: 34px;
    text-align: center;
    color: ${colors.white};
    margin-bottom: 8px;
    letter-spacing: 0px;
    margin-bottom: 15px;
    width: 270px;
    min-height: 145px;
    text-align: center;
    margin-bottom: 65px;
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

  ${media.largeDesktop`
    margin-top: 20px;
  `}

  ${media.desktop`
    margin-top: 40px;
  `}

  ${media.tablet`
    margin-top: 40px;
  `}

  ${media.phone`
    margin-top: -15px;
  `}

`

export const GreenButton = styled(Button)`
  text-transform: uppercase;
  margin: 0 auto;
  border: 1px solid ${colors.humanscaleIvy};
  border-radius: 0;
  background: ${colors.humanscaleIvy};
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
    background: ${colors.humanscaleForest};
    border-color: ${colors.humanscaleForest};
    color: ${colors.white};
  }
`

// what is footprint
export const WhatIsFootprint = styled.section`
  height: 1020px;
  background: ${colors.humanscaleFootPrintBg};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;

  ${media.largeDesktop`
    height: 1000px;
  `}

  ${media.phone`
    height: 830px;
  `}
`

export const FootprintWrapper = styled.div`
  position: absolute;
  height: 641px;
  right: 0;
  left: 141px;
  top: 1080px;
  background: ${colors.white};

  ${media.largeDesktop`
    left: 34px;
    right: 34px;
    top: 1000px;
    height: 761.82px;
  `}

  ${media.phone`
    height: 675px;
    left: 15px;
    right: 15px
    top: 580px;
  `}
`

export const FootprintImagesBlock = styled.div`
  position: absolute;
  left: 652px;
  top: -127px;

  ${media.largeDesktop`
    left: calc(50% - 304px/2 + 12.1px);
    top: 357px;
  `}

  ${media.phone`
    left: calc(50% - 204px/2 + 12.1px);
    top: 402px;
  `}
`

export const FootprintMainImage = styled.img`
  position: absolute;
  width: 552px;
  height: 825px;

  ${media.largeDesktop`
    width: 298px;
    height: 445px;
  `}

  ${media.phone`
    height: 305px;
    width: 204px;
  `}
`

export const FootprintLeapImage = styled.img`
  height: 71px;
  width: 66px;
  position: relative;
  top: -120px;
  left: -20px;

  ${media.largeDesktop`
    height: 38px;
    width: 35px;
    top: -60px;
  `}

  ${media.phone`
    height: 36px;
    width: 33px;
    top: -40px;
    left: -8px;
  `}
`

export const FootprintFingerImage = styled.img`
  height: 320px;
  position: relative;
  top: 531px;
  right: 170px;

  ${media.largeDesktop`
    height: 200px;
    top: 270px;
    left: -90px;
  `}

  ${media.phone`
    height: 129px;
    width: 135px;
    top: 185px;
    left: -94px;
  `}
`

export const FootprintFootImage = styled.img`
  height: 250px;
  width: 100px;
  position: relative;
  top: 355px;
  right: -170px;

  ${media.largeDesktop`
    width: 58.96px;
    height: 86.04px;
    top: 215px;
    left: 110px;
  `}

  ${media.phone`
    height: 40px;
    width: 36px;
    top: 135px;
    left: 18px;
  `}
`

// What is handprint
export const WhatIsHandprint = styled.section`
  position: relative;
  height: 1000px;
  left: 0px;
  top: 0px;
  background: ${colors.white};

  ${media.largeDesktop`
    height: 897px;
  `}

  ${media.phone`
    height: 697px;
  `}
`

export const HandprintWrapper = styled.div`
  position: absolute;
  left: 0px;
  top: 230px;
  height: 641px;
  width: 100%;
  background: ${colors.white};

  ${media.largeDesktop`
    top: 0px;
    height: 697px;
  `}

  ${media.phone`
    top: 0px;
    height: 697px;
  `}
`

export const HandprintImagesWrapper = styled.div`
  width: 1200px;

  ${media.phone`
    width: 258px;
    margin-right: 20px;
  `}
`

export const HandprintMainImage = styled.img`
  position: absolute;
  left: 150px;
  margin-right: 40px;

  ${media.largeDesktop`
    left: calc(50% - 400px/2);
    top: 420px;
    bottom: 0px;
    width: 416px;
    height: 361.6px;
  `}

  ${media.phone`
    left: calc(50% - 258px/2);
    bottom: 50px;
    width: 258px;
    height: 224px;
  `}
`

export const HandprintLeapImage = styled.img`
  position: relative;
  top: -30px;
  left: 80px;

  ${media.phone`
    width: 44.51px;
    height: 54.59px;
    left: 50px;
    top: 390px;
  `}
`

export const HandprintEarthImage = styled.img`
  width: 90px;
  position: relative;
  top: -50px;
  left: 0px;

  ${media.largeDesktop`
    top: 370px;
    left: calc(50% - 570px/2);
  `}

  ${media.desktop`
    top: 370px;
    left: calc(50% - 830px/2);
  `}

  ${media.phone`
    width: 46.23px;
    height: 45.41px;
    top: 390px;
    left: -12px;
    bottom: 0px;`}
`

export const HandprintInfo = styled.div`
  width: 500px;
  position: absolute;
  left: 570px;
  margin-left: 200px;

  ${media.largeDesktop`
    width: 90%;
    left: calc(50% - 930px/2);
    top: 50px;
    margin-left: 0px;`}

    ${media.desktop`
    width: 90%;
    left: calc(50% - 718px/2);
    top: 50px;
    margin-left: 0px;`}

  ${media.phone`
    left: calc(50% - 288px/2);
    top: 40px;
    margin-left: 0px;`}
`

// Take action
export const TakeActionWrapper = styled.section`
  height: 2560px;
  background: ${colors.humanscaleIvy};

  ${media.largeDesktop`
    height: 2140px;
  `}

  ${media.phone`
    height: 1880px;
  `}
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

  ${media.phone`
    width: 100%;
    height: 33.96px;
    margin-top: 50px;

    p {
      font-size: 25px;
      line-height: 34px;
    }
  `}
`

export const TakeAction = styled.section`
  height: 820px;

  ${media.largeDesktop`
    height: 600px;
  `}

  ${media.phone`
    height: 581px;
  `}
`

export const TakeActionItemHeader = styled.div`
  display: flex;
  justify-content: flex-start;
  padding-left: 15px;
  margin-left: 125px;

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

  ${media.largeDesktop`
    margin-left: 20px;
    width: 270px;
  `}

  ${media.phone`
    flex-direction: column;
    width: 171px;
    height: 25px;
    margin-left: 0px;

    p {
      width: 171px;
      height: 25px;
      font-size: 18px;
      line-height: 25px;
      margin-top: 40px;

      span {
        width: 171px;
        height: 25px;
      }
    }

  `}
`

export const TakeActionDivider = styled.span`
  position: absolute;
  flex: 1;
  width: 73vw;
  border-top: 1px solid ${colors.white};
  right: 137px !important;

  ${media.largeDesktop`
    width: 70%;
    right: 0 !important;
  `}

  ${media.phone`
    width: 135px;
    margin-top: 30px;
    right: 0 !important;
  `}
`

export const TakeActionItemInfo = styled.div`
  display: flex;
  justify-content: flex-start;

  p {
    font-family: Noto Sans;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 28px;
    color: ${colors.white};
    padding-left: 150px;
    padding-top: 45px;
    width: 470px;
  }

  ${media.largeDesktop`
    width: 340px;
    height: 309px;

    p { 
      padding-left: 0px;
      margin-left: 35px;
    }

  `}

  ${media.phone`
    p {
      width: 98vw;
      height: 288px;
      left: 0px;
      top: 37px;
      font-size: 14px;
      line-height: 24px;
      flex: none;
      order: 1;
      align-self: center;
      margin-left: 15px;
      margin-right: 15px;
      padding-left: 0px;
      padding-right: 15px;
      padding-top: 57px;
    }
  `}
`

export const TakeActionMainImageWraper = styled.div`
  margin-top: 30px;
  position: absolute;
  right: 638px;

  ${media.largeDesktop`
    width: 264.41px;
    height: 255.01px;
    left: 600px;
    margin-top: 100px;
  `}

  ${media.desktop`
    left: 450px;
  `}

  ${media.phone`
    width: 209px;
    height: 201.77px;
    left: calc(50% - 209px/2 + 16.2px);
    border-radius: 4px;
  `}
`

export const TakeActionMainImage = styled.img`
  position: absolute;
  width: 495px;
  height: 477px;
  z-index: 1;

  ${media.largeDesktop`
    width: 264.41px;
    height: 255.01px;
  `}

  ${media.phone`
    top: 300px;
    width: 209px;
    height: 201.77px;
    border-radius: 4px;
  `}
`

export const TakeActionLeap = styled.img`
  width: 100px;
  position: absolute;
  top: -30px;
  left: 380px;
  z-index: 2;

  ${media.largeDesktop`
    left: 190px;
  `}

  ${media.phone`
    width: 24.82px;
    height: 30.46px;
    left: calc(50% - 24.82px/2 + 76.51px);
    top: 285px;
  `}
`

export const TakeActionLeap2 = styled.img`
  width: 120px;
  position: absolute;
  top: -30px;
  left: 440px;
  z-index: 3;

  ${media.largeDesktop`
    width: 40px;
    top: -15px;
    left: 180px;
  `}

  ${media.phone`
    width: 40px;
    top: 280px;
    left: 180px;
  `}
`

export const TakeActionFingerprint = styled.img`
  width: 495px;
  height: 340px;
  position: absolute;
  top: 230px;
  left: -130px;
  z-index: 0;

  ${media.largeDesktop`
    left: -50px;
    top: 130px;
    width: 264.2px;
    height: 181.88px;
  `}

  ${media.phone`
    width: 208.96px;
    height: 143.69px;
    left: calc(50% - 208.96px/2 - 35.13px);
    top: 410px;
  `}
`

export const TakeActionDoIt = styled.section`
  height: 820px;

  ${media.largeDesktop`
    height: 600px;
  `}

  ${media.phone`
    height: 640px;
    padding-top: 80px;
  `}
`

export const TakeActionDoItImageWrapper = styled.section`
  position: absolute;
  right: 485px;
  margin-top: 30px;

  ${media.largeDesktop`
    width: 312.5px;
    height: 276.25px;
    left: 600px;
    margin-top: 100px;
  `}

  ${media.desktop`
    left: 400px;
  `}

  ${media.phone`
    width: 228.81px;
    height: 202.04px;
    left: calc(50% - 228.81px/2 + 10.54px);
    margin-top: 300px;
  `}
`

export const TakeActionDoItItemInfo = styled.div`
  display: flex;
  justify-content: flex-start;

  p {
    font-family: Noto Sans;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 28px;
    color: ${colors.white};
    padding-left: 150px;
    padding-top: 45px;
    width: 470px;
  }

  ${media.largeDesktop`
    width: 340px;
    height: 309px;

    p { 
      padding-left: 0px;
      margin-left: 35px;
    }

  `}

  ${media.phone`
    p {
      width: 98vw;
      height: 288px;
      left: 0px;
      top: 37px;
      font-size: 14px;
      line-height: 24px;
      flex: none;
      order: 1;
      align-self: center;
      margin-left: 15px;
      margin-right: 15px;
      padding-left: 0px;
      padding-right: 15px;
      padding-top: 85px;
    }
  `}
`

export const TakeActionDoItMainImage = styled.img`
  position: absolute;
  width: 500px;
  height: 442px;

  ${media.largeDesktop`
    width: 312.5px;
    height: 276.25px;
  `}

  ${media.phone`
    width: 228.81px;
    height: 202.04px;
  `}
`

export const TakeActionDoItHandprint = styled.img`
  position: relative;
  top: 290px;
  left: -50px;

  ${media.largeDesktop`
    top: 140px;
    width: 138.76px;
    height: 195.53px;
  `}

  ${media.phone`
    width: 101.6px;
    height: 143px;
    left: calc(50% - 101.6px/2 - 95px);
    top: 100px;
  `}
`

export const TakeActionShareTo = styled.section`
  height: 820px;

  ${media.largeDesktop`
    height: 600px;
  `}

  ${media.phone`
    height: 440px;
  `}
`

export const TakeActionSharedToItemInfo = styled.div`
  display: flex;
  justify-content: flex-start;

  p {
    font-family: Noto Sans;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 28px;
    color: ${colors.white};
    padding-left: 150px;
    padding-top: 45px;
    width: 470px;
  }

  ${media.largeDesktop`
    width: 340px;
    height: 309px;

    p { 
      padding-left: 0px;
      margin-left: 35px;
    }

  `}

  ${media.phone`
    p {
      width: 98vw;
      height: 288px;
      left: 0px;
      top: 37px;
      font-size: 14px;
      line-height: 24px;
      flex: none;
      order: 1;
      align-self: center;
      margin-left: 15px;
      margin-right: 15px;
      padding-left: 0px;
      padding-right: 15px;
      padding-top: 107px;
    }
  `}
`

export const SharedToImageWrapper = styled.div`
  margin-top: 30px;
  margin-right: 150px;
  position: absolute;
  left: 50vw;
  width: 50vw;

  ${media.phone`
    width: 50vw;
    left: 0;
    padding-top: 100px;
  `}
`

export const TakeActionSharedToImage = styled.img`
  position: absolute;
  width: 591px;
  height: 422px;
  top: 0;
  left: -100px;

  ${media.desktop`
    top: 90px;
    left: -220px;
  `}

  ${media.phone`
    left: 0;
    right: 0;
    width: 95vw;
    height: auto;
    padding-top: 170px;
    padding-left: 10px;
  `}
`

export const SmallCircle = styled.img`
  position: relative;
  width: 212px;
  height: 212px;
  top: 25px;
  left: 80px;

  ${media.largeDesktop`
    top: 125px;
  `}

  ${media.desktop`
    top: 210px;
    left: -30px;
  `}

  ${media.phone`
    width: 101.71px;
    height: 101.59px;
    left: 140px;
    top: 237px;
  `}
`

export const BigCircle = styled.img`
  position: relative;
  width: 422px;
  height: 422px;
  top: 22px;
  left: -235px;

  ${media.largeDesktop`
    top: -195px;
    left: -23px;
  `}

  ${media.desktop`
    top: -115px;
    left: -135px;
  `}

  ${media.phone`
    width: 202px;
    height: 201.77px;
    left: 90px;
    top: 87px;
  `}
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

  ${media.desktop`
    height: 806px;      
  `}

  ${media.tablet`
    height: 806px;      
  `}

  ${media.phone`
    height: 674px;
  `}
`

export const CampaignsHeader = styled.div`
  display: flex;
  flex-direction: column;
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

  ${media.largeDesktop`
    margin-top: 0px;
    margin-bottom: 58px;
  `}

  ${media.phone`
    width: 290px;
    height: 137px;
    left: 0px;
    top: 0px;
    font-size: 25px;
    line-height: 34px;
    margin: 0px 20px;
  `}
`

export const CampaignsBlock = styled.div`
  position: absolute;
  bottom: 100px;
  right: 0;
  width: 1300px;
  height: 354px;
  background: ${colors.humanscaleBlueAsh};

  ${media.largeDesktop`
    width: 960px;
    height: 308px;
  `}

  ${media.desktop`
    width: 734px;
    height: 308px;
  `}

  ${media.phone`
    height: 219px;
    top: 420px;
    left: 0;
    right: 0;
  `}
`

export const CampaignsFinger = styled.img`
  position: relative;
  left: 0;
  bottom: -50px;
  width: 330px;
  height: 360px;

  ${media.phone`
    width: 125.96px;
    height: 140.72px;
    top: 80px;
  `}
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
    color: ${colors.dark};
    text-align: left;

    span {
      font-size: 14px;
      line-height: 20px;
      color: ${colors.darkGray};
    }
  }

  ${media.phone`
    width: 240px;
    height: 124px;
    border-radius: 4px;

    img {
      width: 72px;
      height: 72px;
      margin-left: 0px;
    }

    div {
      width: 90px;
      height: 44px;
    }
  `}
`

export const CampaignsInfo = styled.div`
  margin-top: 60px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  div {
    margin-top: 10px;
    display: flex;
    justify-content: space-around;
    text-align: center;
    width: 100%;
  }

  ${media.phone`
    margin-top: -20px;
    div {
      width: 290px;
      margin-top: 70px;
    }
  `}
`

export const CampaignButtons = styled.div`
  position: absolute;
  width: 170px;
  height: 50px;
  left: 40px;
  bottom: 48px;

  ${media.phone`
      width: 100vw;
      display: flex;
      justify-content: space-around;
      left: 0px;
      bottom: 40px;
  `}
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

  ${media.phone`
    height: 419px;
    left: 0;
    top: 0;
  `}
`

export const JoinHandprinterContentBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 1134px;
  height: 352px;
  border: 1px solid ${colors.white};

  ${media.largeDesktop`
    width: 700px;
    height: 352px;
  `}

  ${media.tablet`
    width: 700px;
    height: 352px;
  `}

  ${media.phone`
    width: 290px;
    height: 319px;
  `}
`

export const JoinHandprinterContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  p {
    width: 500px;
    font-family: Noto Sans;
    font-style: normal;
    font-weight: normal;
    font-size: 52px;
    line-height: 71px;
    text-align: center;
    color: ${colors.white};
    margin-bottom: 26px;
  }

  ${media.phone`
    p {
      width: 228px;
      height: 109px;
      left: 0px;
      top: 0px;
      font-size: 25px;
      line-height: 34px;
      flex: none;
      order: 0;
      align-self: center;
      margin: 0px 40px 40px 40px;
    }
  `}
`

export const Slide = styled.div``
