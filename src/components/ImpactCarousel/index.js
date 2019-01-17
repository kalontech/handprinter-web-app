import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { FormattedMessage } from 'react-intl'

import colors from 'config/colors'

const List = styled.ul`
  padding: 0;
  margin-top: 80px;
  min-width: ${({ amount }) => `${(280 + 20) * amount - 20}px`};
  list-style: none;
  display: flex;
  overflow-x: hidden;
  will-change: transform;
`

const Item = styled.li`
  height: 426px;
  flex-basis: 280px;
  min-width: 280px;
  padding: 0 30px 30px;
  border-radius: 4px;
  box-shadow: 0 1px 10px 0 rgba(52, 68, 66, 0.08);
  background-color: ${colors.white};

  &:not(:last-child) {
    margin-right: 20px;
  }

  h4 {
    margin-bottom: 8px;
  }
`

const ImgWrap = styled.div`
  height: 210px;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Title = styled.h4`
  font-size: 16px;
  line-height: 1.75;
  font-weight: bold;
`

class ImpactCarousel extends React.PureComponent {
  initial = 0
  touchStart = 0
  isMoving = false

  interval = undefined

  $block = React.createRef()
  $list = React.createRef()

  componentDidMount() {
    this.interval =
      this.$list.current.getBoundingClientRect().width -
      this.$block.current.getBoundingClientRect().width
  }

  start = e => {
    this.isMoving = true
    this.touchStart = e.touches[0].pageX
  }

  move = e => {
    const { pageX } = e.touches[0]

    window.requestAnimationFrame(() => {
      if (!this.isMoving) return

      const diff = pageX - this.touchStart

      this.$list.current.style = `transform: translateX(${this.normalize(
        this.initial + diff,
      )}px);`
    })
  }

  end = e => {
    this.isMoving = false

    this.initial = this.normalize(
      this.initial + e.changedTouches[0].pageX - this.touchStart,
    )
  }

  normalize = initial => {
    if (initial >= 0) {
      return 0
    }

    if (Math.abs(initial) >= this.interval) {
      return -this.interval
    }

    return initial
  }

  render() {
    const { list } = this.props

    return (
      <div ref={this.$block}>
        <List
          ref={this.$list}
          onTouchStart={this.start}
          onTouchMove={this.move}
          onTouchEnd={this.end}
          amount={list.length}
        >
          {list.map(item => (
            <Item key={item.title}>
              <ImgWrap>
                <img src={item.src} alt="" />
              </ImgWrap>
              <Title>
                <FormattedMessage id={item.title} />
              </Title>
              <p>
                <FormattedMessage id={item.text} />
              </p>
            </Item>
          ))}
        </List>
      </div>
    )
  }
}

ImpactCarousel.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      src: PropTypes.string,
      title: PropTypes.string,
      text: PropTypes.string,
    }),
  ),
}

ImpactCarousel.defaultProps = {
  list: [],
}

export default ImpactCarousel
