import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { FormattedMessage } from 'react-intl'

import colors from 'config/colors'

const List = styled.ul`
  padding: 0;
  margin-top: 80px;
  list-style: none;
  display: flex;

  -ms-overflow-style: none;
  overflow: auto;
  scroll-behavior: auto;

  ::-webkit-scrollbar {
    display: none;
  }
`

const Item = styled.li`
  min-height: 426px;
  flex-basis: 280px;
  min-width: 280px;
  padding: 0 30px 30px;
  border-radius: 4px;
  box-shadow: 0 1px 10px 0 rgba(52, 68, 66, 0.08);
  background-color: ${colors.white};

  &:not(:last-child) {
    margin-right: 20px;
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
  margin-bottom: 8px;
`

export default class ImpactCarousel extends React.PureComponent {
  static propTypes = {
    list: PropTypes.arrayOf(
      PropTypes.shape({
        src: PropTypes.string,
        title: PropTypes.string,
        text: PropTypes.string,
      }),
    ),
  }

  static defaultProps = {
    list: [],
  }

  render() {
    const { list } = this.props

    return (
      <List amount={list.length}>
        {list.map(item => (
          <Item key={item.title}>
            <ImgWrap>
              <img src={item.src} alt={item.title} />
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
    )
  }
}
