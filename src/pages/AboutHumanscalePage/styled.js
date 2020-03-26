import styled from 'styled-components'
import colors from 'config/colors'
import media from 'utils/mediaQueryTemplate'
import { Button } from 'antd'

import bg from '../../assets/about-humanscale/bg.png'

export const Title = styled.h2`
  font-family: Helvetica Neue;
  font-size: 52px;
  line-height: 71px;
  font-weight: 300;
  letter-spacing: -0.4px;
  margin-bottom: 0;
  color: ${colors.humanscaleHeaderText};
  ${media.phone`
    line-height: 31px;
    font-size: 22px;
    letter-spacing: 0px;
  `}
`
export const Text = styled.p`
  margin-bottom: 30px;
  font-family: Helvetica Neue;
  line-height: 26px;
  font-size: 16px;
  width: 400px;
  margin-top: 20px;
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
  height: 91vh;
  position: relative;
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
  width: 700px;
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
  margin: 0 auto;
  border: 1px solid ${colors.humanscaleLinkBg};
  background: ${colors.humanscaleLinkBg};
  font-family: Helvetica Neue;
  font-weight: 400;
  font-size: 16px;
  height: 50px;
  width: 170px;
  color: ${colors.humanscaleFooterColor2};
  &&:hover,
  &&:focus {
    background: transparent;
    border-color: ${colors.white};
    color: ${colors.white};
  }
`

export const GreenButton = styled(Button)`
  margin: 0 auto;
  border: 1px solid ${colors.humanscaleHeaderText};
  background: ${colors.humanscaleHeaderText};
  font-family: Helvetica Neue;
  font-weight: 400;
  font-size: 16px;
  height: 50px;
  width: 170px;
  color: ${colors.white};
  &&:hover,
  &&:focus {
    background: transparent;
    border-color: ${colors.humanscaleHeaderText};
    color: ${colors.black};
  }
`

// what is footprint
export const WhatIsFootprint = styled.section`
  height: 91vh;
  background: ${colors.humanscaleFootPrintBg};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-end;
`

export const FootprintWrapper = styled.div`
  width: 93%;
  height: 70%;
  background: ${colors.white};
  padding: 150px 0 150px 100px;
`

export const FootprintImagesBlock = styled.div`
  position: absolute;
  left: 57vw;
  top: 96vh;
`

export const FootprintMainImage = styled.img`
  height: 80vh;
  width: 552px;
  position: absolute;
`

export const FootprintLeapImage = styled.img`
  height: 71px;
  width: 66px;
  position: relative;
  top: -140px;
  left: -20px;
`

export const FootprintFingerImage = styled.img`
  height: 320px;
  width: 90;
  position: relative;
  top: 52vh;
  left: -180px;
`

export const FootprintFootImage = styled.img`
  height: 250px;
  width: 100px;
  position: relative;
  top: 37vh;
  left: 180px;
`
// What is handprint
export const WhatIsHandprint = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 91vh;
  background: ${colors.white};
  padding: 10px 10px 10px 100px;
`

export const HandprintWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-end;
  height: 100%;
  width: 100%;
  background: ${colors.white};
`

export const HandprintImagesWrapper = styled.div`
  position: absolute;
  left: 7vw;
  top: 102vw;
  ${media.largeDesktop`
    top: 123vw;
  `}
`

export const HandprintMainImage = styled.img`
  height: 100%;
  width: auto;
  margin-right: 40px;
`

export const HandprintLeapImage = styled.img`
  height: 120px;
  width: 90;
  position: relative;
  top: -30vh;
  left: -710px;
`
export const HandprintFingerImage = styled.img`
  height: 100px;
  width: 90;
  position: relative;
  top: -32vh;
  left: -780px;
`

export const HandprintInfo = styled.div`
  width: 500px;
  position: relative;
  left: 37vw;
  top: -10vh;
  margin-left: 200px;
`

// Take action
export const TakeActionWrapper = styled.section`
  height: 300vh;
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
  height: 91vh;
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
  }

  span {
    flex: 1;
    border-top: 1px solid ${colors.white};
    margin-left: 40px;
  }
`

export const TakeActionItemInfo = styled.div`
  display: flex;
  justify-content: flex-start;

  p {
    font-size: 16px;
    line-height: 28px;
    color: ${colors.white};
    padding: 25px 150px 0 150px;
    width: 50vw;
  }
`

export const TakeActionMainImageWraper = styled.div`
  margin-top: 30px;
  position: absolute;
  left: 50vw;
  width: 30vw;
`

export const TakeActionMainImage = styled.img`
  width: 30vw;
`

export const TakeActionLeap = styled.img`
  width: 100px;
  position: relative;
  top: -60vh;
  left: 23vw;
`

export const TakeActionLeap2 = styled.img`
  width: 120px;
  position: relative;
  top: -57vh;
  left: 20vw;
`

export const TakeActionFingerprint = styled.img`
  width: 20vw;
  position: relative;
  top: -30vh;
  left: -5vw;
`

export const TakeActionDoIt = styled.section`
  height: 91vh;
`

export const TakeActionDoItImageWrapper = styled.section`
  margin-top: 30px;
  position: absolute;
  left: 50vw;
  width: 30vw;
`

export const TakeActionDoItMainImage = styled.img`
  width: 30vw;
`

export const TakeActionDoItHandprint = styled.img`
  position: relative;
  top: -150px;
  left: -50px;
  ${media.largeDesktop`
    width: 300px;
    top: -10px;
    left: -80px;
  `}
`

export const TakeActionShareTo = styled.section`
  height: 91vh;
`

export const SharedToImageWrapper = styled.div`
  margin-top: 30px;
  margin-right: 150px;
  position: absolute;
  left: 50vw;
  width: 50vw;
`

export const TakeActionSharedToImage = styled.img`
  position: relative;
  top: 0;
  left: 0;
`

export const SmallCircle = styled.img`
  position: relative;
  top: -50vh;
  left: 26vh;
`

export const BigCircle = styled.img`
  position: relative;
  top: -50vh;
  left: -16vh;
`

// Wrapper for campaigns
export const CampaignsMainWrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  height: 91vh;
  background: ${colors.white};

  p {
    width: 800px;
    text-align: center;
  }
`

export const CampaignsHeader = styled.div`
  width: 100%;
  font-size: 52px;
  line-height: 71px;
  text-align: center;
  color: ${colors.humanscaleHeaderText};
`

export const CampaignsBlock = styled.div`
  position: absolute;
  bottom: 80vh;
  left: 7vw;
  width: 93vw;
  height: 40vh;
  background: ${colors.humanscaleBlueAsh};
`

export const CampaignsFinger = styled.img`
  position: relative;
  top: 10vh;
  left: -5vw;
  width: 30vw;
  height: 30vh;
`

export const CampaignsCards = styled.div`
  position: absolute;
  height: 20vh;
  left: 7vw;
  bottom: 30vh;
`

export const CampaignsCard = styled.img`
  width: 50vh;
  height: 15vw;
`

export const CampaignsInfo = styled.div`
  padding-top: 50px;
  position: relative;
  div {
    display: flex;
    justify-content: space-around;
    text-align: center;
    width: 100%;
  }
`

export const CampaignButtons = styled.div`
  position: relative;
  bottom: 4vh;
  left: -55vw;
  width: 140vw;
  display: flex;
  justify-content: space-around;
`

export const CampaignLeftArrowButton = styled.img`
  width: 40px;
  height: 40px;
  background: ${colors.white};
  margin-right: 20px;
`

export const CampaignRightArrowButton = styled.img`
  width: 40px;
  height: 40px;
  background: ${colors.white};
`

// Join handprinter
export const JoinHandprinterWrapper = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 70vh;
  background: ${colors.humanscaleIvy};
`

export const JoinHandprinterContentBlock = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 80vw;
  height: 65%;
  border: 1px solid ${colors.white};
`

export const JoinHandprinterContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  height: 70%;
  p {
    width: 500px;
    font-size: 52px;
    line-height: 71px;
    text-align: center;
    color: ${colors.white};
  }
`