import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import ActionCardLabelSet from '../ActionCardLabelSet'
import colors from './../../config/colors'
import hexToRgba from './../../utils/hexToRgba'
import { CardHeading } from './../Styled'
import media from './../../utils/mediaQueryTemplate'

const CardWrap = styled.div`
  padding-top: 10px;
  padding-bottom: 10px;
  margin: 0 auto;
  display: inline-block;
`
const CardContainer = styled.div`
  display: block;
  position: relative;
  max-width: ${props => (props.isSlide ? '380px' : '100%')}
  margin-right: ${props => (props.isSlide ? '20px' : '0')}
  height: 364px;
  border-radius: 4px;
  box-shadow: 0 1px 10px 0 ${hexToRgba(colors.dark, 0.08)};
  background-color: ${colors.white};
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s;
  ${media.phone`
    margin-right: 0;
    max-width: calc(100% - 15px);
  `}
  
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
  ${media.phone`
    padding: 20px 10px;
  `}
`

const ActionCardLabelSetWrapper = styled.div`
  position: absolute;
  left: 20px;
  bottom: 20px;
  ${media.desktop`
    max-width: 90%;
  `}
  ${media.phone`
    left: 15px;
  `}
`

const ActionCard = props => {
  const { linkPrefix, slug, picture, name, impacts } = props
  console.log('props', props)
  return (
    <Link to={`${linkPrefix}/${slug}`}>
      <CardWrap>
        <CardContainer {...props}>
          <CardImage>
            <img src={picture} alt={name} />
          </CardImage>
          <CardWrapper>
            <CardHeading>{name}</CardHeading>
            <ActionCardLabelSetWrapper>
              <ActionCardLabelSet impacts={impacts} />
            </ActionCardLabelSetWrapper>
          </CardWrapper>
        </CardContainer>
      </CardWrap>
    </Link>
  )
}

ActionCard.propTypes = {
  linkPrefix: PropTypes.string.isRequired,
  slug: PropTypes.string.isRequired,
  impacts: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  picture: PropTypes.string.isRequired,
  placeholder: PropTypes.bool,
}

export default ActionCard
