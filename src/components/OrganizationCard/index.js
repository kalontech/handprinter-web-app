import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

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
  margin-left: 10px;
  margin-right: 10px;
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
  width: 90px;
  height: 90px;
  border-radius: 4px;
  object-fit: cover;
  background-color: ${colors.lightGray};
`

const Info = styled.div`
  flex-grow: 1;
`

const Name = styled.h4`
  line-height: 35px;
  font-size: 28px;
  color: ${colors.dark};
  margin-bottom: 4px;
  font-family: Noto Sans;
  overflow-y: auto;
`

const CounterMembers = styled.p`
  line-height: 1.43;
  font-size: 14px;
  color: ${colors.darkGray};
  margin-bottom: 10px;
`

export default class OrganizationCard extends React.PureComponent {
  static displayName = 'OrganizationCard'

  static propTypes = {
    to: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    name: PropTypes.string,
    counter: PropTypes.string,
    picture: PropTypes.string,
  }

  static defaultProps = {
    to: '#',
  }

  render() {
    const { to, name, picture, counter } = this.props

    return (
      <Block to={to}>
        <PictureWrap>
          <GroupImage src={picture} alt="group logo" />
        </PictureWrap>
        <Info>
          <Name>{name}</Name>
          <CounterMembers>{counter}</CounterMembers>
        </Info>
      </Block>
    )
  }
}
