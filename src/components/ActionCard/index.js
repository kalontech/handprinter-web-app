import React from 'react'
import PropTypes from 'prop-types'
import ActionCardLabelSet from '../ActionCardLabelSet'
import colors from './../../config/colors'
import hexToRgba from './../../utils/hexToRgba'
import styled from 'styled-components'
import { CardHeading } from './../Styled'

const CardWrap = styled.div`
  width: 400px;
  padding-top: 10px;
  padding-bottom: 10px;
`
const CardContainer = styled.div`
  display: block;
  position: relative;
  margin-right: 20px;
  width: 380px;
  height: 364px;
  border-radius: 4px;
  box-shadow: 0 1px 10px 0 ${hexToRgba(colors.dark, 0.08)};
  background-color: ${colors.white};
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s;

  &:hover {
    transform: translateY(-4px);
  }
`

const CardImage = styled.div`
  height: 220px;
  background-color: ${colors.darkGray};

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`

const CardWrapper = styled.div`
  padding: 20px;
`

const ActionCard = props => {
  const { cardImg, cardTitle, cardArr } = props
  return (
    <CardWrap>
      <CardContainer>
        <CardImage>
          <img src={cardImg} alt="" />
        </CardImage>
        <CardWrapper>
          <CardHeading>{cardTitle}</CardHeading>
          <ActionCardLabelSet arr={cardArr} />
        </CardWrapper>
      </CardContainer>
    </CardWrap>
  )
}

ActionCard.propTypes = {
  cardArr: PropTypes.array,
  cardTitle: PropTypes.string,
  cardImg: PropTypes.string,
}

export default ActionCard
