import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import moment from 'moment'

import colors from 'config/colors'
import hexToRgba from 'utils/hexToRgba'
import media from 'utils/mediaQueryTemplate'

import { ReactComponent as Leap } from './assets/challengeLeap1.svg'
import { ReactComponent as Leap2 } from './assets/challengeLeap2.svg'
import { ReactComponent as Circle } from './assets/circleArrow.svg'
import { ReactComponent as Circle2 } from './assets/circle3.svg'

const Block = styled(Link)`
  padding: 40px 40px 40px 30px;
  height: 190px;
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

const CardImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50px;
  border: 3px solid ${colors.green};
  object-fit: cover;
  background-color: ${colors.lightGray};
`

const Info = styled.div`
  flex-grow: 1;
  display: flex;
  justify-content: center;
  flex-direction: column;
`

const Name = styled.h4`
  line-height: 26px;
  font-size: 19px;
  color: ${colors.dark};
  margin-bottom: 4px;
  font-family: Noto Serif;
  overflow-y: auto;
`

const CounterMembers = styled.p`
  line-height: 1.43;
  font-size: 14px;
  color: ${colors.darkGray};
  margin-bottom: 10px;
`

const ChallengeLabel = styled.div`
  position: absolute;
  min-width: 118px;
  height: 23px;
  right: 8px;
  top: 8px;
  background: ${props => {
    if (props.color1) {
      return colors[`${props.color1}`]
    } else if (props.color2) {
      return colors[`${props.color2}`]
    } else if (props.color3) {
      return colors[`${props.color3}`]
    } else if (props.color4) {
      return colors[`${props.color4}`]
    }
  }};
  opacity: 0.9;
  border-radius: 4px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding: 4px 8px;

  p {
    font-family: Noto Sans;
    font-style: normal;
    font-weight: normal;
    font-size: 8px;
    line-height: 12px;
    display: flex;
    align-items: center;
    text-align: center;
    text-transform: uppercase;
    color: ${colors.white};
    margin-left: 17px;
  }
`

const SWGWrap = styled.div``

// status -
// avaliable --- date active,
// in progress --- если пользователь участвует в челлендже и
// взял хотябы 1 действие из него или присоединился с группой
// completed --- date not active, challenge ends

export default function CompetitionCard(props) {
  const {
    to,
    name,
    picture,
    counter,
    button,
    isCampaign,
    dateTo,
    actions,
  } = props

  const expired = moment().isAfter(dateTo)

  const avaliable = !expired ? 'avaliable' : null
  const completed = expired ? 'completed' : null
  // const inProgress = actions.length > 0 ? 'in progress' : null

  const leapStyles = {
    position: 'absolute',
    left: '10px',
    top: '4px',
  }
  const leap2Styles = {
    position: 'absolute',
    left: '9px',
    top: '6px',
  }
  const leap3Styles = {
    position: 'absolute',
    height: '8.5px',
    width: '5.5px',
    left: '9px',
    top: '6px',
  }
  const circleArrowStyles = {
    position: 'absolute',
    left: '6px',
    top: '4px',
  }
  const circleStyles = {
    position: 'absolute',
    left: '5px',
    top: '4px',
  }

  return (
    <Block to={to}>
      <PictureWrap>
        <CardImage src={picture} alt="logo" />
      </PictureWrap>
      <Info>
        <Name>{name}</Name>
        <CounterMembers>{counter}</CounterMembers>
        <ChallengeLabel
          color1={avaliable && isCampaign ? 'green' : undefined}
          color2={completed ? 'dark' : undefined}
          color3={avaliable && !isCampaign ? 'ocean' : null}
          color4={true ? 'blue' : null}
        >
          {avaliable && (
            <SWGWrap>
              <Leap style={leapStyles} />
            </SWGWrap>
          )}
          {expired && (
            <SWGWrap>
              <Leap2 style={leap2Styles} />
              <Circle style={circleArrowStyles} />
            </SWGWrap>
          )}
          {/* {!expired && (
            <SWGWrap>
              <Leap2 style={leap3Styles} />
              <Circle2 style={circleStyles} />
            </SWGWrap>
          )} */}
          <p>
            {avaliable}
            {completed}|{isCampaign ? 'campaign' : 'competition'}
          </p>
        </ChallengeLabel>
        {!!button && button()}
      </Info>
    </Block>
  )
}

CompetitionCard.propTypes = {
  to: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  name: PropTypes.string,
  counter: PropTypes.string,
  picture: PropTypes.string,
  button: PropTypes.func,
  isCampaign: PropTypes.bool,
  dateTo: PropTypes.date,
  actions: PropTypes.array,
}
