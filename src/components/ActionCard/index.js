import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { FormattedHTMLMessage } from 'react-intl'
import { Icon } from 'antd'
import moment from 'moment'

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
    max-width: ${props => (props.isSlide ? 'calc(100% - 15px)' : '100%')};
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

const SuggestedInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${colors.darkGray};
  padding: 0 12px;
`

const SuggestedInfoInitiator = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  span.name {
    color: ${colors.dark};
    margin-left: 3px;
  }
`

const SuggestedInfoDate = styled.div`
  font-style: italic;
  i {
    margin-right: 5px;
  }
`

const SuggestedInfoInitiatorPhoto = styled.div`
  background-image: url('${props => props.src}');
  height: 20px;
  width: 20px;
  border-radius: 50%;
  display: inline-block;
  margin-right: 5px;
`

const ActionCard = props => {
  const {
    linkPrefix,
    slug,
    picture,
    name,
    impacts,
    suggestedBy,
    suggestedAt,
  } = props
  return (
    <Link to={`${linkPrefix}/${slug}`}>
      <CardWrap>
        <CardContainer {...props}>
          <CardImage>
            <img src={picture} alt={name} />
          </CardImage>
          <CardWrapper>
            <CardHeading style={props.font}>{name}</CardHeading>
            <ActionCardLabelSetWrapper>
              <ActionCardLabelSet impacts={impacts} />
            </ActionCardLabelSetWrapper>
          </CardWrapper>
        </CardContainer>
      </CardWrap>
      {suggestedBy && suggestedAt && (
        <SuggestedInfo>
          <SuggestedInfoInitiator>
            <SuggestedInfoInitiatorPhoto src={suggestedBy.photo} />
            <FormattedHTMLMessage
              id="app.actions.card.by"
              values={{
                username: suggestedBy.fullName,
              }}
            />{' '}
          </SuggestedInfoInitiator>
          <SuggestedInfoDate>
            <Icon type="clock-circle" />
            {moment(suggestedAt).fromNow()}
          </SuggestedInfoDate>
        </SuggestedInfo>
      )}
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
  suggestedBy: PropTypes.object,
  suggestedAt: PropTypes.string,
}

export default ActionCard
