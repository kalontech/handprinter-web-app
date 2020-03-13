import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import _ from 'lodash'
import colors from 'config/colors'
import media from 'utils/mediaQueryTemplate'
import ActionCardLabelSet from 'components/ActionCardLabelSet'

import { Progress, Popover, Icon } from 'antd'

import {
  Achievements,
  AchievementSmall,
} from '../../pages/DashboardPage/header'

const Block = styled(Link)`
  padding: 30px 20px 20px;
  min-height: 236px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
  background-color: ${colors.white};
  box-shadow: 0 1px 10px rgba(52, 68, 66, 0.08);
  border-radius: 4px;
  margin-bottom: 20px;

  ${media.phone`
    min-width: 290px;
  `}
`

const User = styled.div`
  display: flex;
  justify-content: flex-start;
  padding-bottom: 26px;
  border-bottom: 1px solid ${colors.gray};
`

const ImgPlaceholder = styled.div`
  position: relative;
  background: ${colors.lightGray};
  border: 1px solid ${colors.gray};
  width: 106px;
  height: 106px;
  overflow: hidden;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  line-height: 61px;
  font-size: 48px;
  font-family: Noto Serif, sans-serif;
  color: ${colors.gray};
`

const Photo = styled.img`
  width: 106px;
  height: 106px;
  border-radius: 50%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
`

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: baseline;
  margin-left: 24px;
`

const FullName = styled.span`
  line-height: 26px;
  font-size: 19px;
  color: ${colors.dark};
`

const Counter = styled.span`
  line-height: 20px;
  font-size: 14px;
  color: ${colors.darkGray};
`

const ProgressStyled = styled(Progress)`
  width: 330px;
`

const ParticipantPopover = styled(Popover)`
  width: 200px;
`

const PopoverWrapper = styled.div`
  background-color: ${colors.dark};
  display: flex;
  flex-direction: column;
  .ant-popover-inner {
    background-color: ${colors.green} !important;
  }
  .ant-popover-inner-content {
    padding: 0;
    background-color: ${colors.green} !important;
  }
`

const PopoverText = styled.text`
  font-family: Noto Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 20px;
  color: ${colors.darkGray};
`

export default class MemberCard extends React.PureComponent {
  static displayName = 'MemberCard'

  static propTypes = {
    to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    fullName: PropTypes.string,
    photo: PropTypes.string,
    impacts: PropTypes.object,
    counter: PropTypes.string,
    achievements: PropTypes.array,
    progressBarPercent: PropTypes.number,
    actionsTakenPerMember: PropTypes.number,
    containerStyle: PropTypes.any,
  }

  static defaultProps = {
    to: '#',
  }

  get fullNamePlaceholder() {
    return (this.props.fullName || '')
      .split(' ')
      .map(item => item.slice(0, 1).toLocaleUpperCase())
      .join('')
  }

  render() {
    const {
      to,
      photo,
      fullName,
      impacts,
      counter,
      achievements,
      progressBarPercent,
      containerStyle,
      actionsTakenPerMember,
    } = this.props
    const popoverText = `Action taken per member - to make the rate of Groups 
    more accurate we take into account the average number 
    of actions that are taken per one member.`

    return (
      <Block style={containerStyle} to={to}>
        <User>
          <ImgPlaceholder>
            {this.fullNamePlaceholder}
            {photo && <Photo src={photo} alt="photo" />}
          </ImgPlaceholder>

          <Info>
            <FullName>{fullName}</FullName>
            <div
              style={{
                display: 'flex',
                width: '100%',
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <Counter>{counter}</Counter>
              {!!actionsTakenPerMember && (
                <Counter>
                  <ParticipantPopover
                    overlayClassName={'achievements-popover'}
                    overlayStyle={{
                      height: '110px',
                      width: '294px',
                    }}
                    content={
                      <PopoverWrapper>
                        <PopoverText>{popoverText}</PopoverText>
                      </PopoverWrapper>
                    }
                  >
                    ATPM={actionsTakenPerMember}
                  </ParticipantPopover>
                </Counter>
              )}
            </div>

            {!!achievements && (
              <Achievements>
                {achievements.slice(0, 5).map(i => (
                  <AchievementSmall specialShape={i.specialShape} key={i.id}>
                    <img alt={''} src={_.get(i, 'campaign.logo.src')} />
                  </AchievementSmall>
                ))}
              </Achievements>
            )}
            {!!progressBarPercent && (
              <ProgressStyled
                percent={progressBarPercent}
                showInfo={false}
                strokeColor={colors.green}
                strokeWidth={4}
              />
            )}
          </Info>
        </User>

        {impacts && <ActionCardLabelSet impacts={impacts} />}
      </Block>
    )
  }
}
