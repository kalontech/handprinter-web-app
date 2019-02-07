import React, { Component } from 'react'
import { linear } from 'everpolate'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import colors from './../../config/colors'
import media from './../../utils/mediaQueryTemplate'

const Wrap = styled.div`
  align-items: center;
  display: flex;
  justify-content: center;
  height: 498px;
  position: relative;
  top: -40px;

  ${media.phone`
    height: auto;
    display: flex;
    top: auto;
  `}

  svg {
    height: 447px;

    ${media.phone`
      height: 320px;
    `};
  }
`

class GoodRatioWidget extends Component {
  state = {
    footprintDays: 0,
    handprintDays: 0,
  }

  static getDerivedStateFromProps(props, state) {
    return {
      footprintDays: props.footprintDays || state.footprintDays,
      handprintDays: props.handprintDays || state.handprintDays,
    }
  }

  componentDidMount() {
    this.configureElement('#left_cup', 'leftCup')
    this.configureElement('#right_cup', 'rightCup')
    this.configureElement('#left_load', 'leftLoad', {
      x: 76.5,
      y: 199.5,
    })
    this.configureElement('#right_load', 'rightLoad', {
      x: 360,
      y: 199.5,
    })
    this.configureElement('#left_load_labels', 'leftLoadLabels', {
      x: 0,
      y: 0,
    })
    this.configureElement('#right_load_labels', 'rightLoadLabels', {
      x: 0,
      y: 0,
    })
    this.configureElement('#meter_scale', 'meterScale')
    this.configureElement('#weights_bar', 'weightsBar')

    // Set delay to be able observe appearance animation
    setTimeout(() => {
      this.update()
    }, 1000)
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevProps.footprintDays !== this.props.footprintDays ||
      prevProps.handprintDays !== this.props.handprintDays
    ) {
      this.update()
    }
  }

  getCurrentRatio = () => {
    const { footprintDays, handprintDays } = this.state
    return (handprintDays - footprintDays) / (handprintDays + footprintDays)
  }

  update = () => {
    const { footprintDays, handprintDays } = this.state
    const ratio = this.getCurrentRatio()
    this.setLeftCupRawTransformValue(linear(ratio, [-1, 0, 1], [39, 0, -39]))
    this.setRightCupRawTransformValue(linear(ratio, [-1, 0, 1], [-39, 0, 39]))
    this.setLeftLoadRawTransformValue(linear(ratio, [-1, 0, 1], [1, 0.75, 0.5]))
    this.setRightLoadRawTransformValue(
      linear(ratio, [-1, 0, 1], [0.5, 0.75, 1]),
    )
    this.setLeftLoadLabelsValue(linear(ratio, [-1, 1], [0, 79.49]))
    this.setRightLoadLabelsValue(linear(ratio, [-1, 1], [79.49, 0]))
    this.setMeterScaleRawTransformValue(
      linear(
        handprintDays === 0 ? 0 : Math.max(0, handprintDays / footprintDays),
        [-1, 0, 0.5, 1, 10, 100],
        [0, 0, 60, 150, 240, 300],
      ),
    )
    this.setWeightsBarRawTransformValue(linear(ratio, [-1, 0, 1], [-15, 0, 15]))
  }

  configureElement = (selector, accessorName, customTransformOrigin) => {
    this[accessorName] = document.querySelector(selector)
    const elementBBox = this[accessorName].getBBox()
    const elementTransformOrigin = customTransformOrigin || {
      x: elementBBox.x + elementBBox.width / 2,
      y: elementBBox.y + elementBBox.height / 2,
    }
    this[accessorName].style.transition = 'all 500ms'
    this[accessorName].style.transformOrigin = `${elementTransformOrigin.x}px ${
      elementTransformOrigin.y
    }px`
  }

  setLeftCupRawTransformValue = value => {
    this.leftCup.style.transform = `translateY(${value}px)`
  }

  setRightCupRawTransformValue = value => {
    this.rightCup.style.transform = `translateY(${value}px)`
  }

  setLeftLoadRawTransformValue = value => {
    this.leftLoad.style.transform = `scale(${value})`
  }

  setRightLoadRawTransformValue = value => {
    this.rightLoad.style.transform = `scale(${value})`
  }

  setLeftLoadLabelsValue = value => {
    this.leftLoadLabels.style.transform = `translateY(${value}px)`
  }

  setRightLoadLabelsValue = value => {
    this.rightLoadLabels.style.transform = `translateY(${value}px)`
  }

  setMeterScaleRawTransformValue = value => {
    this.meterScale.style.transform = `rotate(${value}deg)`
  }

  setWeightsBarRawTransformValue = value => {
    this.weightsBar.style.transform = `rotate(${value}deg)`
  }

  render = () => {
    return (
      <Wrap>
        <svg
          fill="none"
          viewBox="0 0 447 453"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient
              id="scales-range-bg"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor={colors.lightGray} />
              <stop offset="50%" stopColor={colors.lightGray} />
              <stop offset="50%" stopColor={colors.white} />
              <stop offset="100%" stopColor={colors.white} />
            </linearGradient>

            <linearGradient
              id="scales-range-border"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stopColor={colors.darkGray} />
              <stop offset="50%" stopColor={colors.darkGray} />
              <stop offset="50%" stopColor={colors.lightGreen} />
              <stop offset="100%" stopColor={colors.lightGreen} />
            </linearGradient>
          </defs>

          <rect
            y={383}
            width={447}
            height={70}
            rx={35}
            fill={colors.lightGray}
          />
          <g id="left_cup">
            <g fillRule="evenodd" clipRule="evenodd">
              <path
                d="M74.333 237.427h10V210h-10v27.427z"
                fill={colors.darkGray}
              />
              <path
                d="M1 200c17.103 13.106 51.155 21.265 77.797 21.265 26.641 0 60.692-8.159 77.797-21.265H1"
                fill={colors.gray}
              />
            </g>
            <g id="left_load">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M158.981 120.274c0-43.9-35.589-79.49-79.49-79.49C35.59 40.784 0 76.374 0 120.274c0 43.901 35.59 79.491 79.49 79.491 43.902 0 79.491-35.59 79.491-79.491"
                fill={colors.darkGray}
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M90.518 91.445c-7.864-10.3-37.448 3.738-42.365 24.083-3.332 13.804 15.38 29.205 27.51 38.945 4.887 3.859 8.478 8.763 11.488 14.176 3.217 5.764 11.835 18.044 26.718 5.983 4.477-3.626 6.988-8.154 5.728-14.731-2.484-12.956-19.667-18.505-22.9-20.118-7.77-3.894-11.587-13.508-9.034-22.004 2.208-7.341 9.397-17.744 2.855-26.334M43.604 101.55c1.206 1.963 1.199 4.166-.023 4.907-1.218.74-3.177-.249-4.382-2.218-1.205-1.959-1.197-4.162.02-4.901 1.216-.749 3.181.24 4.385 2.212m2.833-9.23c1.508 2.46 1.49 5.216-.029 6.144-1.52.926-3.982-.316-5.49-2.78-1.509-2.464-1.497-5.216.024-6.145 1.529-.928 3.985.313 5.495 2.78m6.624-8.863c1.607 3.562 1.127 7.247-1.075 8.239-2.192.989-5.288-1.09-6.889-4.65-1.61-3.56-1.127-7.245 1.069-8.24 2.2-.984 5.285 1.096 6.895 4.651m11.332-9.647c1.976 4.384 1.381 8.926-1.336 10.145-2.709 1.225-6.511-1.338-8.489-5.723-1.98-4.383-1.386-8.923 1.33-10.142 2.713-1.223 6.52 1.341 8.495 5.72m2.795-4.094c-2.177-6.597-.635-13.03 3.447-14.376 4.074-1.343 9.149 2.916 11.333 9.512 2.168 6.59.635 13.03-3.446 14.375-4.082 1.344-9.15-2.915-11.334-9.51"
                fill={colors.white}
              />
            </g>
            <g id="left_load_labels" fontFamily="Noto Sans" letterSpacing={0}>
              <text
                fill={colors.dark}
                style={{
                  whiteSpace: 'pre',
                }}
                fontSize={16}
              >
                <tspan x={76.542} y={17.102} textAnchor="middle">
                  {this.state.footprintDays}
                </tspan>
              </text>
              <text
                fill={colors.darkGray}
                style={{
                  whiteSpace: 'pre',
                }}
                fontSize={10}
                fontWeight="bold"
              >
                <tspan x={64.428} y={30.689}>
                  DAYS
                </tspan>
              </text>
            </g>
          </g>
          <g id="right_cup">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M362.333 238.427h10V211h-10v27.427z"
              fill={colors.darkGray}
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M290 201c17.103 13.106 51.155 21.265 77.797 21.265 26.641 0 60.692-8.159 77.797-21.265H290"
              fill={colors.gray}
            />
            <g id="right_load">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M446.98 121.49c0-43.9-35.588-79.49-79.49-79.49C323.589 42 288 77.59 288 121.49c0 43.901 35.589 79.49 79.49 79.49 43.902 0 79.49-35.589 79.49-79.49"
                fill={colors.lightGreen}
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M367.718 168.071c-5.887-3.151-10.133-6.554-16.16-12.612-5.613-5.642-12.383-10.878-16.964-13.475-9.519-5.394-3.404-9.104-.005-8.52 9.984 1.717 9.99 5.556 13.624 7.274 4.465 2.112 10.55 6.583 12.104 3.186 1.554-3.398-13.933-25.24-22.576-40.345-.529-.924-5.808-9.26-2.811-10.79 2.998-1.53 8.295 5.666 9.137 6.764 7.494 9.781 18.076 24.922 20.923 23.153 2.105-1.307-3.737-12.978-10.034-26.699-3.67-7.998-7.596-16.15-4.951-17.722 4.596-2.73 8.025 6.389 11.706 13.079 2.391 4.347 13.388 25.677 16.67 24.53 2.147-.885-2.538-14.831-4.554-20.455-3.534-9.862-9.27-20.581-4.124-22.367 3.168-1.1 7.441 10.061 9.552 16.222 1.505 4.39 9.795 23.448 11.051 23.426 1.803-.749 1.054-9.275.291-16.564-.73-6.978-2.497-13.043 1.175-13.423 3.672-.38 4.322 5.778 5.271 14.067.518 4.516 2.791 12.893 4.89 19.59 1.678 5.356 7.311 18.585 7.536 24.785.354 9.765-2.559 21.368-13.097 27.142-7.676 4.206-18.853 5.001-28.654-.246"
                fill={colors.white}
              />
            </g>
            <g id="right_load_labels" fontFamily="Noto Sans" letterSpacing={0}>
              <text
                fill={colors.dark}
                style={{
                  whiteSpace: 'pre',
                }}
                fontSize={16}
              >
                <tspan x={366.594} y={19.102} textAnchor="middle">
                  {this.state.handprintDays}
                </tspan>
              </text>
              <text
                fill={colors.darkGray}
                style={{
                  whiteSpace: 'pre',
                }}
                fontSize={10}
                fontWeight="bold"
              >
                <tspan x={354.168} y={32.688}>
                  DAYS
                </tspan>
              </text>
            </g>
          </g>
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M63.338 244.997c-4.054.008-7.335-3.285-7.338-7.337l.005-2.319c-.01-4.054 3.28-7.336 7.339-7.341l318.32.005c4.05-.008 7.339 3.279 7.336 7.336l-.002 2.322c.008 4.049-3.282 7.337-7.34 7.337l-318.32-.003"
            fill={colors.gray}
            id="weights_bar"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M255.861 267.634c0-12.51-12.127-25.649-27.067-25.625l-8.571-.009c-14.966-.007-27.098 13.132-27.066 25.617L186 406h77l-7.139-138.366z"
            fill={colors.gray}
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M225 342a7 7 0 1 0 0-14 7 7 0 0 0 0 14z"
            fill={
              this.getCurrentRatio() >= 0 ? colors.lightGreen : colors.darkGray
            }
            stroke={colors.white}
            strokeWidth={2}
          />
          <text
            fill={colors.dark}
            style={{
              whiteSpace: 'pre',
            }}
            fontFamily="Noto Sans"
            fontSize={10}
            fontWeight="bold"
            letterSpacing={0}
          >
            <tspan x={215.234} y={358.688}>
              NET
            </tspan>
            <tspan x={202.28} y={368.688}>
              POSITIVE
            </tspan>
          </text>
          <path
            d="M142 409c0-8.284 6.716-15 15-15h135c8.284 0 15 6.716 15 15v5H142v-5z"
            fill={colors.gray}
          />
          <mask
            id="prefix__a"
            maskUnits="userSpaceOnUse"
            x={157}
            y={173}
            width={133}
            height={133}
            fill={colors.black}
          >
            <path fill={colors.white} d="M157 173h133v133H157z" />
          </mask>

          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M223.5 302c34.518 0 62.5-27.982 62.5-62.5S258.018 177 223.5 177 161 204.982 161 239.5s27.982 62.5 62.5 62.5z"
            fill="url(#scales-range-bg)"
          />

          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M223.5 302c34.518 0 62.5-27.982 62.5-62.5S258.018 177 223.5 177 161 204.982 161 239.5s27.982 62.5 62.5 62.5z"
            stroke={colors.gray}
            strokeWidth={8}
            mask="url(#prefix__a)"
          />

          <circle
            r="60.5"
            cx="223.5"
            cy="239.5"
            fill="transparent"
            stroke="url(#scales-range-border)"
            strokeWidth="4"
          />

          <text
            fill={colors.darkGray}
            style={{
              whiteSpace: 'pre',
            }}
            fontFamily="Noto Sans"
            fontSize={10}
            fontWeight="bold"
            letterSpacing={0}
          >
            <tspan x={221.246} y={196.688}>
              1
            </tspan>
          </text>
          <g
            fill={colors.darkGray}
            fontFamily="Noto Sans"
            fontSize={10}
            fontWeight="bold"
            letterSpacing={0}
          >
            <text
              style={{
                whiteSpace: 'pre',
              }}
            >
              <tspan x={197.246} y={287.688}>
                0
              </tspan>
            </text>
            <text
              style={{
                whiteSpace: 'pre',
              }}
            >
              <tspan x={238.738} y={287.688}>
                100
              </tspan>
            </text>
          </g>
          <g
            fill={colors.darkGray}
            fontFamily="Noto Sans"
            fontSize={10}
            fontWeight="bold"
            letterSpacing={0}
          >
            <text
              opacity={0.01}
              style={{
                whiteSpace: 'pre',
              }}
            >
              <tspan x={179} y={272.688}>
                0.1
              </tspan>
            </text>
            <text
              opacity={0.01}
              style={{
                whiteSpace: 'pre',
              }}
            >
              <tspan x={251.738} y={272.688}>
                100
              </tspan>
            </text>
          </g>
          <g
            fill={colors.darkGray}
            fontFamily="Noto Sans"
            fontSize={10}
            fontWeight="bold"
            letterSpacing={0}
          >
            <text
              opacity={0.01}
              style={{
                whiteSpace: 'pre',
              }}
            >
              <tspan x={172} y={254.688}>
                0.2
              </tspan>
            </text>
            <text
              opacity={0.01}
              style={{
                whiteSpace: 'pre',
              }}
            >
              <tspan x={266.492} y={254.688}>
                50
              </tspan>
            </text>
          </g>
          <g
            fill={colors.darkGray}
            fontFamily="Noto Sans"
            fontSize={10}
            fontWeight="bold"
            letterSpacing={0}
          >
            <text
              style={{
                whiteSpace: 'pre',
              }}
            >
              <tspan x={171} y={240.688}>
                0,5
              </tspan>
            </text>
            <text
              style={{
                whiteSpace: 'pre',
              }}
            >
              <tspan x={265.492} y={240.688}>
                10
              </tspan>
            </text>
          </g>
          <g
            fill={colors.darkGray}
            fontFamily="Noto Sans"
            fontSize={10}
            fontWeight="bold"
            letterSpacing={0}
          >
            <text
              opacity={0.01}
              style={{
                whiteSpace: 'pre',
              }}
            >
              <tspan x={195} y={202.688}>
                0.9
              </tspan>
            </text>
            <text
              opacity={0.01}
              style={{
                whiteSpace: 'pre',
              }}
            >
              <tspan x={246.246} y={202.688}>
                2
              </tspan>
            </text>
          </g>
          <g
            fill={colors.darkGray}
            fontFamily="Noto Sans"
            fontSize={10}
            fontWeight="bold"
            letterSpacing={0}
          >
            <text
              opacity={0.01}
              style={{
                whiteSpace: 'pre',
              }}
            >
              <tspan x={181} y={217.688}>
                0.7
              </tspan>
            </text>
            <text
              opacity={0.01}
              style={{
                whiteSpace: 'pre',
              }}
            >
              <tspan x={262.246} y={217.688}>
                5
              </tspan>
            </text>
          </g>
          <g id="meter_scale">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M203.86 272.617l7.53-7.142-1.256-.725 21.75-37.672-2.598-1.5-21.75 37.672-1.255-.725-2.421 10.092z"
              fill={colors.dark}
            />
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M226.817 232.755a7 7 0 1 0-7 12.124 7 7 0 0 0 7-12.124z"
              fill={colors.darkGray}
              stroke={colors.darkGray}
            />
          </g>
        </svg>
      </Wrap>
    )
  }
}

GoodRatioWidget.propTypes = {
  footprintDays: PropTypes.number.isRequired,
  handprintDays: PropTypes.number.isRequired,
}

export default GoodRatioWidget
