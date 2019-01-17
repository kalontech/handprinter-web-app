import React from 'react'
import PropTypes from 'prop-types'
import { Carousel } from 'antd'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import ActionCard from './../../components/ActionCard'
import colors from './../../config/colors'
import media from '../../utils/mediaQueryTemplate'
import ExpandMoreIcon from '../../assets/icons/ExpandMoreIcon'
import { PrimaryButton, ArrowButton } from './../../components/Styled'
import { FormattedMessage } from 'react-intl'

import hpSliderBg from './../../assets/homepage/actions-fingerprint.svg'

const SliderContainer = styled.div`
  height: 476px;
  background: ${colors.lightGray} url("${hpSliderBg}")no-repeat left bottom;
  @media (max-width: 1366px) {
    margin-left: 0;
  }
 
  .ant-carousel {
    position: relative;
    top: -50px;
    
    .slick-dots {
      visibility: hidden;
      bottom: -14px;
      padding-right: 15px;
      margin: 0;
      ${media.phone`
        visibility: visible;
      `}
      
      
      li {
        height: 8px;	
        width: 8px;
        margin: 0 5px;
        background: ${colors.gray};
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
    padding-left: 15px;
  `}
`

const SliderControls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: -20px;
  max-width: 1180px;
  ${media.largeDesktop`
    padding-right: 34px;
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
  constructor(props) {
    super(props)
    this.state = {
      disableRightArrow: true,
      disableLeftArrow: false,
    }
  }
  next = () => {
    this.carousel.next()
  }
  previous = () => {
    this.carousel.prev()
  }

  disableArrows = (item, index) => {
    const { actions } = this.props
    const disableLeftArrow = index !== 0
    const disableRightArrow = index !== actions.length - 3
    this.setState({ disableRightArrow, disableLeftArrow })
  }

  render() {
    const { hideControls } = this.props
    const responsive = [
      {
        breakpoint: 576,
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
            infinite={false}
            variableWidth={true}
            beforeChange={(item, index) => this.disableArrows(item, index)}
            responsive={responsive}
          >
            {this.props.actions.map((action, index) => (
              <ActionCard
                key={index}
                linkPrefix={this.props.actionLinkPrefix}
                slug={action.slug}
                picture={action.picture}
                name={action.name}
                impacts={action.impacts}
                isSlide
              />
            ))}
          </Carousel>
          {!hideControls && (
            <SliderControls>
              <Link to="/actions">
                <PrimaryButton type="primary">
                  <FormattedMessage id="app.actionsSlider.link" />
                </PrimaryButton>
              </Link>
              <SliderArrows>
                <SliderButton
                  direction="left"
                  onClick={this.previous}
                  disabled={!this.state.disableLeftArrow}
                >
                  <ExpandMoreIcon />
                </SliderButton>
                <SliderButton
                  direction="right"
                  onClick={this.next}
                  disabled={!this.state.disableRightArrow}
                >
                  <ExpandMoreIcon />
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
}

export default ActionsCarousel
