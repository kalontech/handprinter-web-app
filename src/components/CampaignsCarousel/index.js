import React from 'react'
import PropTypes from 'prop-types'
import { Carousel } from 'antd'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { injectIntl } from 'react-intl'

import { ArrowButton } from 'components/Styled'
import colors from 'config/colors'
import media from 'utils/mediaQueryTemplate'

import ExpandMoreIcon from 'assets/icons/ExpandMoreIcon'

import { CampaignsCard, Slide } from '../../pages/AboutHumanscalePage/styled'

const SliderContainer = styled.div`
  height: 476px;
  @media (max-width: 1366px) {
    margin-left: 0;
  }
  ${media.phone`
    height: auto;
    padding-bottom: 30px;
  `}

  .ant-carousel {
    position: relative;
    top: -420px;

    ${media.desktop`
      top: -380px;
    `}
    ${media.phone`
      top: -180px;
      padding-left: 20px;
   `}
    .slick-list {
      overflow-x: visible !important;
      overflow: unset;
    }

    .slick-dots {
      visibility: hidden;
      bottom: -14px;
      padding-right: 15px;
      margin: 0;
      ${media.phone`
        visibility: none;
      `}

      li {
        height: 8px;
        width: 8px;
        margin: 0 5px;
        border-radius: 50%;

        button {
          font-size: 0;
          height: 100%;
          width: 100%;
          background: transparent;
          border: none;
          opacity: 1;
        }
        &.slick-active {
          background: ${colors.darkGray};
          button {
            background: transparent;
            width: 100%;
          }
        }
      }
    }
  }
`

const SliderWrap = styled.div`
  padding-left: calc((100% - 1180px - 50px) / 2 + 25px);

  @media (max-width: 1366px) {
    padding-left: calc((100% - 1180px) / 2);
  }

  ${media.largeDesktop`
    padding-left: 34px;
  `}

  ${media.phone`
    padding-left: calc((100% - 1180px) / 2);
  `}
`

const SliderControls = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-top: -290px;
  margin-left: 1000px;
  max-width: 1180px;

  ${media.largeDesktop`
    padding-right: 34px;
    margin-top: -330px;
    margin-left: 700px;
  `}

  ${media.desktop`
    padding-right: 34px;
    margin-top: -330px;
    margin-left: 500px;
  `}

  ${media.phone`
    padding-right: 15px;
    margin-top: 0;
    a,button {
      width: 100%;
    }
  `}
`

const SliderArrows = styled.div`
  margin-top: -10px;
  display: flex;
  justify-content: space-between;
  ${media.phone`
    display: none;
  `}
`

const SliderButton = styled(ArrowButton)`
  transform: ${props =>
    props.direction === 'right' ? 'rotate(-90deg)' : 'rotate(90deg)'};
  background-color: ${colors.white};
`

class ActionsCarousel extends React.Component {
  next = () => {
    this.carousel.next()
  }
  previous = () => {
    this.carousel.prev()
  }

  render() {
    const { hideControls } = this.props
    const responsive = [
      {
        settings: {
          slidesToShow: 1,
          variableWidth: false,
          infinite: true,
          beforeChange: null,
        },
      },
    ]
    return (
      <SliderContainer>
        <SliderWrap>
          <Carousel
            ref={node => (this.carousel = node)}
            {...this.props}
            dots={true}
            infinite={true}
            variableWidth={true}
            responsive={responsive}
          >
            {this.props.campaigns.map((camp, index) => {
              return (
                <Slide key={index}>
                  <Link
                    to={
                      this.props.token
                        ? `campaign/${camp.id}`
                        : '/account/login'
                    }
                  >
                    <CampaignsCard>
                      <img src={camp.logo.src} alt="" />
                      <div>
                        <div>{camp.name}</div>
                      </div>
                    </CampaignsCard>
                  </Link>
                </Slide>
              )
            })}
          </Carousel>
          {!hideControls && (
            <SliderControls>
              <SliderArrows>
                <SliderButton direction="left" onClick={this.previous}>
                  <ExpandMoreIcon id="CarouselIconLeft" />
                </SliderButton>
                <SliderButton direction="right" onClick={this.next}>
                  <ExpandMoreIcon id="CarouselIconRight" />
                </SliderButton>
              </SliderArrows>
            </SliderControls>
          )}
        </SliderWrap>
      </SliderContainer>
    )
  }
}

SliderButton.propTypes = {
  direction: PropTypes.oneOf(['left', 'right']).isRequired,
  hideControls: PropTypes.bool,
  extraLink: PropTypes.bool,
}

export default injectIntl(ActionsCarousel)
