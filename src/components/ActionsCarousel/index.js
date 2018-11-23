import React from 'react'
import PropTypes from 'prop-types'
import { Carousel } from 'antd'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import ActionCard from './../../components/ActionCard'
import colors from './../../config/colors'
import ExpandMoreIcon from '../../assets/icons/ExpandMoreIcon'
import { PrimaryButton, ArrowButton } from './../../components/Styled'
import { FormattedMessage } from 'react-intl'

import hpSliderBg from './../../assets/homepage/actions-fingerprint.svg'

const SliderContainer = styled.div`
  height: 476px;
  margin-left: 50px;
  background: ${colors.lightGray} url("${hpSliderBg}")no-repeat left bottom;
  @media (max-width: 1366px) {
    margin-left: 0;
  }
 
  .ant-carousel {
    position: relative;
    top: -50px;
  }
`

const SliderWrap = styled.div`
  padding-left: calc((100% - 1180px) / 2 - 25px);
  @media (max-width: 1366px) {
    padding-left: calc((100% - 1180px) / 2);
  }
`

const SliderControls = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: -20px;
  max-width: 1180px;
`

const SliderArrows = styled.div`
  margin-top: -10px;
  display: flex;
  justify-content: space-between;
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
    return (
      <SliderContainer>
        <SliderWrap>
          <Carousel
            ref={node => (this.carousel = node)}
            {...this.props}
            dots={false}
            infinite={false}
            variableWidth={true}
            beforeChange={(item, index) => this.disableArrows(item, index)}
          >
            {this.props.actions.map((item, index) => (
              <ActionCard
                key={index}
                cardImg={item.cardImg}
                cardTitle={item.cardTitle}
                cardArr={item.cardArr}
              />
            ))}
          </Carousel>
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
        </SliderWrap>
      </SliderContainer>
    )
  }
}

SliderButton.propTypes = {
  direction: PropTypes.oneOf(['left', 'right']).isRequired,
}

export default ActionsCarousel
