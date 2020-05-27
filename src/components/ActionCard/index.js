import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { FormattedMessage } from 'react-intl'
import { Icon } from 'antd'
import Tooltip from 'components/Tooltip'
import colors from 'config/colors'
import hexToRgba from 'utils/hexToRgba'
import media from 'utils/mediaQueryTemplate'
import EditIcon from 'assets/icons/EditIcon'
import DeleteIcon from 'assets/icons/DeleteIcon'
import moment from 'moment'

import ActionCardLabelSet from '../ActionCardLabelSet'
import { ReactComponent as BigLeaf } from '../CompetitionCard/assets/challengeBigLeaf.svg'
import { ReactComponent as SmallLeaf } from '../CompetitionCard/assets/challengeSmallLeaf.svg'
import { ReactComponent as ArrowCircle } from '../CompetitionCard/assets/circleArrow.svg'
import { ReactComponent as ArrowsCircle } from '../CompetitionCard/assets/arrowsCircle.svg'
import { ReactComponent as DottedCircle } from '../CompetitionCard/assets/circle3.svg'

const TooltipContainer = styled.div`
  line-height: 20px;
  text-align: center;
  color: ${colors.white};
`

const CardWrap = styled.div`
  width: 100%;
  padding-top: 10px;
  padding-bottom: 10px;
  margin: 0 auto;
  display: inline-block;

  ${media.phone`
    padding-top: 0px;
    padding-bottom: 0px;
    margin: 10px 10px 0px 10px;
  `}
`

const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  max-width: ${props => (props.isSlide ? '380px' : '100%')};
  margin-right: ${props => (props.isSlide ? '20px' : '0')};
  min-height: 364px;
  border-radius: 4px;
  box-shadow: 0 1px 10px 0 ${hexToRgba(colors.dark, 0.08)};
  background-color: ${colors.white};
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s;
  ${media.phone`
    margin-right: 0;
    max-width: ${props => (props.isSlide ? 'calc(100% - 15px)' : '94%')};
  `}

  &:hover {
    transform: translateY(-4px);
  }

  ${media.phone`
    padding: 10px;
    box-shadow: 0px 1px 10px rgba(52, 68, 66, 0.08);
    border-radius: 4px;
  `}
`

const CardImage = styled.div`
  position: relative;
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
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  ${media.phone`
    padding: 20px 10px;
  `}
`

const ActionCardLabelSetWrapper = styled.div`
  width: 100%;
`

const SuggestedInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${colors.darkGray};
  padding: 0 12px;
`

const CardHeading = styled.h3`
  font-size: 19px;
  line-height: 1.37;
  font-family: 'Noto Serif', serif;
  margin-bottom: 15px;
  text-align: left;
`

const SuggestedInfoInitiator = styled(Link)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${colors.darkGray};
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

const SuggestedInfoInitiatorPhoto = styled.img`
  height: 20px;
  width: 20px;
  border-radius: 50%;
  display: inline-block;
  margin-right: 10px;
  box-shadow: 0px 0px 14px 3px rgba(0, 0, 0, 0.1);
`

const IconsWrap = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
`

const ButtonIcon = styled.button`
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  outline: 0;
  border: 0;
  color: ${hexToRgba(colors.white, 0.8)};
  width: 50px;
  height: 50px;
  cursor: pointer;

  &:hover,
  &:focus,
  &:active {
    color: ${hexToRgba(colors.white, 1)};
  }

  span {
    font-size: 10px;
  }
`

const WildWrapper = styled.p`
  width: 25%;
  color: gray;
`

const ChallengeLabel = styled.div`
  position: absolute;
  z-index: 1000;
  min-width: 100px;
  height: 23px;
  right: 8px;
  top: 8px;
  background: ${props => {
    return colors[`${props.color}`]
  }};
  border-radius: 4px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 4px 8px;

  p {
    font-family: Noto Sans;
    font-style: normal;
    font-weight: normal;
    min-width: 50px;
    height: 12px;
    font-size: 7px;
    line-height: 12px;
    display: flex;
    align-items: center;
    text-align: center;
    text-transform: uppercase;
    color: ${colors.white};
    margin-left: 21px;
    margin-right: 7px;
  }

  ${media.phone`
    right: 18px;
    top: 18px;

    p {
      font-size: 7px;
    }
  `}
`

const SWGWrap = styled.div``

const ActionCard = props => {
  const {
    to,
    picture,
    name,
    impacts,
    suggestedBy,
    suggestedAt,
    canChange,
    onEdit,
    onDelete,
    isSlide,
    styles,
    onClick,
    isHabit,
    isWild,
    showPhysicalValues,
    canBeHabit,
    availableFrom = moment().subtract(1, 'days'),
  } = props

  const popover = (
    <Tooltip
      title={() => (
        <TooltipContainer>
          <FormattedMessage id="app.actions.wildCard.popup.content" />
        </TooltipContainer>
      )}
      mouseEnterDelay={1}
    >
      <WildWrapper>
        <FormattedMessage id="app.actions.wildCard.label" />
        <Icon type="info-circle" style={{ marginLeft: '5px' }} />
      </WildWrapper>
    </Tooltip>
  )

  const bigLeafStyles = {
    position: 'absolute',
    left: '14px',
    top: '4px',
  }
  const smallLeapStyles = {
    position: 'absolute',
    left: '9px',
    top: '6px',
  }
  const leap3Styles = {
    position: 'absolute',
    height: '8.5px',
    width: '5.5px',
    left: '10px',
    top: '7px',
  }
  const arrowCircleStyles = {
    position: 'absolute',
    left: '6px',
    top: '4px',
  }
  const dottedCircleStyles = {
    position: 'absolute',
    left: '5px',
    top: '4px',
  }

  const isWillAvailable = moment(Date.now()).isSameOrBefore(availableFrom)

  return (
    <Link to={to} onClick={onClick}>
      <CardWrap>
        <CardContainer isSlide={isSlide} style={styles && styles}>
          {!isWillAvailable && (
            <ChallengeLabel color="green">
              <SWGWrap>
                <BigLeaf style={bigLeafStyles} />
              </SWGWrap>
              <p>| available to be taken</p>
            </ChallengeLabel>
          )}
          {isWillAvailable && (
            <>
              <ChallengeLabel color="blue">
                <SWGWrap>
                  <SmallLeaf style={leap3Styles} />
                  <DottedCircle style={dottedCircleStyles} />
                </SWGWrap>
                <p>
                  | will be available again on{' '}
                  {moment(availableFrom).format('MMMM Do, YYYY')}
                </p>
              </ChallengeLabel>
              {canBeHabit && (
                <ChallengeLabel color="dark" style={{ top: '35px' }}>
                  <SWGWrap>
                    <ArrowsCircle style={arrowCircleStyles} />
                  </SWGWrap>
                  <p>| Chosen as habit</p>
                </ChallengeLabel>
              )}
            </>
          )}
          {!availableFrom && !canBeHabit && (
            <ChallengeLabel color="dark">
              <SWGWrap>
                <SmallLeaf style={smallLeapStyles} />
                <ArrowCircle style={arrowCircleStyles} />
              </SWGWrap>
              <p>| on {moment(availableFrom).format('MMMM Do, YYYY')}</p>
            </ChallengeLabel>
          )}
          <CardImage>
            {picture && <img src={picture} alt={name} />}

            {canChange && (
              <IconsWrap>
                <ButtonIcon onClick={onEdit}>
                  <span>
                    <FormattedMessage id="app.actions.card.edit" />
                  </span>
                  <EditIcon />
                </ButtonIcon>

                <ButtonIcon onClick={onDelete}>
                  <span>
                    <FormattedMessage id="app.actions.card.delete" />
                  </span>
                  <DeleteIcon />
                </ButtonIcon>
              </IconsWrap>
            )}
          </CardImage>
          <CardWrapper>
            <CardHeading style={props.font}>{name}</CardHeading>
            <ActionCardLabelSetWrapper>
              {isWild ? popover : typeof impacts === 'function' && impacts()}
              {impacts && typeof impacts !== 'function' && (
                <ActionCardLabelSet
                  impacts={impacts}
                  showPhysicalValues={showPhysicalValues}
                />
              )}
            </ActionCardLabelSetWrapper>
          </CardWrapper>
        </CardContainer>
      </CardWrap>

      {suggestedBy && suggestedAt && (
        <SuggestedInfo>
          <SuggestedInfoInitiator
            to={
              suggestedBy.selfTaken
                ? '/account/dashboard'
                : `/account/${suggestedBy._id}`
            }
          >
            {suggestedBy.photo && (
              <SuggestedInfoInitiatorPhoto src={suggestedBy.photo} />
            )}
            {suggestedBy.fullName && (
              <FormattedMessage
                id="app.actions.card.by"
                values={{
                  username: suggestedBy.fullName,
                }}
              />
            )}
            {suggestedBy.selfTaken && (
              <FormattedMessage
                id={
                  isHabit
                    ? 'app.actions.card.iTookAction.habit'
                    : 'app.actions.card.iTookAction'
                }
              />
            )}{' '}
          </SuggestedInfoInitiator>
          <SuggestedInfoDate>
            <Icon type="clock-circle" />
            {suggestedAt}
          </SuggestedInfoDate>
        </SuggestedInfo>
      )}
    </Link>
  )
}

ActionCard.propTypes = {
  to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  impacts: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
  name: PropTypes.string.isRequired,
  picture: PropTypes.string,
  font: PropTypes.string,
  placeholder: PropTypes.bool,
  canChange: PropTypes.bool,
  isSlide: PropTypes.bool,
  styles: PropTypes.object,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  onClick: PropTypes.func,
  suggestedBy: PropTypes.object,
  suggestedAt: PropTypes.string,
  isHabit: PropTypes.bool,
  impactsInUnits: PropTypes.object,
  isWild: PropTypes.bool,
  showPhysicalValues: PropTypes.bool,
  selectedKey: PropTypes.string,
  id: PropTypes.number,
  user: PropTypes.object,
  canBeHabit: PropTypes.bool,
  availableFrom: PropTypes.Date,
}

export default ActionCard
