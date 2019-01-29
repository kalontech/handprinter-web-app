import React from 'react'
import styled, { keyframes } from 'styled-components'
import { FormattedMessage } from 'react-intl'

import measurementImpactVideoSrc from 'assets/measurement/measurment-impact.mp4'
import ExpandMoreIcon from 'assets/icons/ExpandMoreIcon'
import { ArrowButton } from 'components/Styled'
import colors from 'config/colors'

const fadeOut = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`

const SliderContainer = styled.div`
  position: relative;

  video {
    width: 100%;
    max-width: 500px;
    margin: 0 auto;
    display: block;
  }

  p {
    font-size: 16px;
    text-align: center;
    max-width: 500px;
    min-height: 70px;
    margin: 0 auto;
    animation: ${fadeOut} 2s ease-out;
  }
`

const Controls = styled.div`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
`

const SliderButton = styled(ArrowButton)`
  transform: ${props =>
    props.direction === 'right' ? 'rotate(-90deg)' : 'rotate(90deg)'};
  background-color: ${colors.white};
`

class MeasuringAnimation extends React.PureComponent {
  state = {
    index: 0,
    playing: false,
  }

  $video = React.createRef()

  breakpoints = [0, 8, 16, 24, 32]
  epsylon = 0.5

  get slide() {
    return this.state.index + 1
  }

  componentDidMount() {
    this.$video.current.pause()
    this.$video.current.currentTime = 0
  }

  onLoad = () => {
    const observer = new IntersectionObserver( // eslint-disable-line no-undef
      ([entry]) => {
        if (!entry.isIntersecting || this.state.playing) return

        this.setState({ playing: true }, () => {
          this.$video.current.play()
        })
      },
      { threshold: 1 },
    )

    observer.observe(this.$video.current)
  }

  onPlaying = () => {
    this.breakpoints.forEach((timestamp, index) => {
      if (Math.abs(timestamp - this.$video.current.currentTime) < this.epsylon)
        this.setState({ index })
    })
  }

  onClick = index => {
    this.$video.current.currentTime = this.breakpoints[index]
  }

  render() {
    const { index } = this.state

    return (
      <SliderContainer className="slider-container">
        <video
          autoPlay
          playsInline
          onCanPlayThrough={this.onLoad}
          ref={this.$video}
          src={measurementImpactVideoSrc}
          onTimeUpdate={this.onPlaying}
          loop
          muted
        />

        <p key={this.state.index}>
          <FormattedMessage
            id={`app.measurementPage.animation.slide${this.slide}`}
          />
        </p>

        <Controls>
          <SliderButton
            onClick={() => {
              this.onClick(index - 1)
            }}
            disabled={index === 0}
          >
            <ExpandMoreIcon />
          </SliderButton>

          <SliderButton
            onClick={() => {
              this.onClick(index + 1)
            }}
            disabled={index === 4}
            direction="right"
          >
            <ExpandMoreIcon />
          </SliderButton>
        </Controls>
      </SliderContainer>
    )
  }
}

export default MeasuringAnimation
