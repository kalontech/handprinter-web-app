import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import Icon from 'antd/lib/icon'

import { ReactComponent as Star } from 'assets/icons/ic_star.svg'

import colors from 'config/colors'
import hexToRgba from 'utils/hexToRgba'
import media from 'utils/mediaQueryTemplate'

const Block = styled(Link)`
  padding: 40px 40px 40px 30px;
  max-height: 190px;
  position: relative;
  display: flex;
  background-color: ${colors.white};
  font-family: Noto Sans, sans-serif;
  box-shadow: 0 1px 10px ${hexToRgba(colors.dark, 0.08)};
  border-radius: 4px;

  ${media.phone`
    padding: 30px 10px 30px 10px;
  `}
`

const PictureWrap = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;

  ${media.phone`
    margin-right: 10px;
  `}
`

const GroupImage = styled.img`
  width: 110px;
  height: 110px;
  border-radius: 50%;
  object-fit: cover;
  background-color: ${colors.lightGray};

  ${media.phone`
    width: 90px;
    height: 90px;
  `}
`

const Info = styled.div`
  flex-grow: 1;
`

const Name = styled.h4`
  line-height: 1.37;
  font-size: 19px;
  color: ${colors.dark};
  margin-bottom: 4px;
  font-family: Noto Serif, sans-serif;
  max-height: 52px;
  overflow-y: auto;
`

const CounterMembers = styled.p`
  line-height: 1.43;
  font-size: 14px;
  color: ${colors.darkGray};
  margin-bottom: 10px;
`

const ButtonFeatured = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: transparent;
  outline: 0;
  border: 0;
  cursor: pointer;
  color: ${({ color }) => color};
`

export default class GroupCard extends React.PureComponent {
  static displayName = 'GroupCard'

  static propTypes = {
    to: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    name: PropTypes.string,
    counter: PropTypes.string,
    picture: PropTypes.string,
    buttons: PropTypes.func,
    featured: PropTypes.shape({
      added: PropTypes.bool,
      onClick: PropTypes.func,
    }),
    subset: PropTypes.string,
    isMember: PropTypes.bool,
  }

  static defaultProps = {
    to: '#',
  }

  render() {
    const { to, name, picture, counter, buttons, featured, subset } = this.props

    return (
      <Block to={to}>
        {featured && (
          <ButtonFeatured
            onClick={featured.onClick}
            color={featured.added ? colors.blue : colors.gray}
          >
            <Icon component={() => <Star width={24} height={24} />} />
          </ButtonFeatured>
        )}

        <PictureWrap>
          <GroupImage src={picture} alt="group logo" />
        </PictureWrap>

        <Info>
          <Name>{name}</Name>
          <CounterMembers>{counter}</CounterMembers>

          {typeof buttons === 'function' && subset !== 'teams' && buttons()}
        </Info>
      </Block>
    )
  }
}
