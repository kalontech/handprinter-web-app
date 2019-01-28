import React from 'react'
import styled from 'styled-components'
import { FormattedMessage } from 'react-intl'

import measurementImpactVideoSrc from 'assets/measurement/measurment-impact.mp4'

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
  }
`

class MeasuringAnimation extends React.PureComponent {
  state = {
    slideIndex: 1, // [1,2,3,4,5]
    playing: false,
  }

  $video = React.createRef()

  intervalRef = undefined

  textTimers = []

  componentWillUnmount() {
    if (this.intervalRef) clearInterval(this.intervalRef)

    if (this.textTimers.length > 0) {
      this.textTimers.forEach(timerRef => {
        clearTimeout(timerRef)
      })
    }
  }

  onLoad = () => {
    const observer = new IntersectionObserver( // eslint-disable-line no-undef
      ([entry]) => {
        if (!entry.isIntersecting || this.state.playing) return

        this.setState({ playing: true, slideIndex: 1 }, this.playVideo)
      },
      { threshold: 1 },
    )

    observer.observe(this.$video.current)
  }

  playVideo = () => {
    this.$video.current.play()

    this.launchTimers()

    this.intervalRef = setInterval(
      this.launchTimers,
      this.$video.current.duration * 1000,
    )
  }

  launchTimers = () => {
    const latencies = [
      2688.567,
      2688.567 + 1022.233,
      2688.567 + 1022.233 + 1297.76,
      2688.567 + 1022.233 + 1297.76 + 1295,
    ]

    this.textTimers = []

    this.setState({ slideIndex: 1 })

    latencies.forEach(latency => {
      this.textTimers.push(
        setTimeout(() => {
          this.setState(({ slideIndex }) => ({ slideIndex: slideIndex + 1 }))
        }, latency),
      )
    })
  }

  render() {
    return (
      <SliderContainer className="SliderContainer">
        <video
          onLoadedData={this.onLoad}
          ref={this.$video}
          src={measurementImpactVideoSrc}
          loop
          muted
        />

        <p>
          <FormattedMessage
            id={`app.measurementPage.animation.slide${this.state.slideIndex}`}
          />
        </p>
      </SliderContainer>
    )
  }
}

export default MeasuringAnimation
