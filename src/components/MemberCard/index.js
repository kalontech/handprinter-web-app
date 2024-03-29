import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import _ from 'lodash'
import colors from 'config/colors'
import media from 'utils/mediaQueryTemplate'
import ActionCardLabelSet from 'components/ActionCardLabelSet'
import { FormattedMessage } from 'react-intl'
import { Popover } from 'antd'

import adminBadge from 'assets/icons/admin-badge.svg'
import ownerBadge from 'assets/icons/owner-badge.svg'

import Progress from '../../pages/CompetitionDashboard/progress'
import {
  Achievements,
  AchievementSmall,
} from '../../pages/DashboardPage/header'
import { MEMBER_GROUP_ROLES } from '../../utils/constants'

const Block = styled(Link)`
  padding: 30px 20px 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: stretch;
  background-color: ${colors.white};
  box-shadow: 0 1px 10px rgba(52, 68, 66, 0.08);
  border-radius: 4px;
  margin-bottom: 20px;
  margin-right: 0px;
  height: 250px;
  width: 95%;

  ${media.largeDesktop`
    margin-right: 17px;
    margin-left: 2px;
    width: 47%;
  `}

  ${media.desktop`
    margin-right: 8px;
    margin-left: 2px;
    width: 340px;
    height: 213px;
  `}

  ${media.phone`
    margin-right: 0px;
    margin-left: 0px;
    width: 100%;
    min-height: 211px;
  `}
`

const AchievementImage = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 20px;
  object-fit: cover;
`

const User = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 15px;
  padding-bottom: 26px;
  border-bottom: 1px solid ${colors.gray};
`

const ImgPlaceholder = styled.div`
  position: relative;
  background: ${colors.lightGray};
  border: 1px solid ${colors.gray};
  min-width: 106px;
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

  ${media.phone`
    min-width: 90px;
    height: 90px;
  `}
`

const Photo = styled.img`
  width: 106px;
  height: 106px;
  border-radius: 50%;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;

  ${media.phone`
    width: 90px;
    height: 90px;
  `}
`

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: baseline;
  margin-left: 24px;
  width: 100%;
`

const FullName = styled.span`
  line-height: 26px;
  font-size: 19px;
  color: ${colors.dark};

  ${media.phone`
    font-family: Noto Serif;
    font-style: normal;
    font-weight: normal;
    font-size: 19px;
    line-height: 26px;
    color: #344442;
  `}
`

const Counter = styled.span`
  line-height: 20px;
  font-size: 14px;
  color: ${colors.darkGray};

  ${media.phone`
    font-family: Noto Sans;
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 20px;
    color: #858F8E;
  `}
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

const Badge = styled.img`
  display: flex;
  height: 23px;
  align-self: flex-end;
  margin-top: -20px;
  margin-right: -10px;
`

function getIsImpactsInModeling(impacts, hasTakenActions) {
  if (!hasTakenActions) return false
  if (!impacts.handprint) return true
  const modeledImpacts = Object.entries(impacts.handprint).filter(
    ([category, timeValue]) => timeValue.minutes > 0,
  )
  return modeledImpacts.length === 0
}

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
    total: PropTypes.number,
    successCount: PropTypes.number,
    numberToComplete: PropTypes.number,
    accomplished: PropTypes.bool,
    dateTo: PropTypes.Date,
    expired: PropTypes.bool,
    tooltipText: PropTypes.string,
    impactsInUnits: PropTypes.object,
    showPhysicalValues: PropTypes.bool,
    isTablet: PropTypes.bool,
    role: PropTypes.string,
    hasTakenActions: PropTypes.bool,
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
      impactsInUnits,
      counter,
      achievements,
      progressBarPercent,
      containerStyle,
      actionsTakenPerMember,
      total,
      numberToComplete,
      accomplished,
      dateTo,
      expired,
      tooltipText,
      showPhysicalValues,
      isTablet,
      role,
      hasTakenActions,
    } = this.props
    let badgeIcon
    if (role === MEMBER_GROUP_ROLES.ADMIN) badgeIcon = adminBadge
    if (role === MEMBER_GROUP_ROLES.OWNER) badgeIcon = ownerBadge
    const impactsInModeling = getIsImpactsInModeling(impacts, hasTakenActions)
    return (
      <Block style={containerStyle} to={to}>
        <Badge src={badgeIcon} />
        <User>
          <ImgPlaceholder>
            {!photo && this.fullNamePlaceholder}
            {photo && <Photo src={photo} alt="photo" />}
          </ImgPlaceholder>

          <Info>
            <FullName>
              {fullName && fullName.length > 25
                ? fullName.slice(0, 25) + '...'
                : fullName}
            </FullName>
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
                      height: '120px',
                      width: '294px',
                    }}
                    content={
                      <PopoverWrapper>
                        <PopoverText>
                          <FormattedMessage id="app.competitions.statistics.popover.message" />
                        </PopoverText>
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
                    <AchievementImage src={_.get(i, 'campaign.logo.src')} />
                  </AchievementSmall>
                ))}
              </Achievements>
            )}
            {!!progressBarPercent && (
              <Progress
                styles={{ height: '70px' }}
                total={total}
                successCount={numberToComplete}
                accomplished={accomplished}
                endDate={dateTo}
                expired={expired}
                tooltipText={tooltipText}
                isTablet={isTablet}
              />
            )}
          </Info>
        </User>
        {impacts && (
          <ActionCardLabelSet
            impacts={impacts}
            impactsInUnits={impactsInUnits}
            showPhysicalValues={showPhysicalValues}
            impactsInModeling={impactsInModeling}
          />
        )}
      </Block>
    )
  }
}
