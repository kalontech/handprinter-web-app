import React from 'react'
import styled from 'styled-components'
import { Icon, Progress } from 'antd'

import colors from 'config/colors'

import { FormattedHTMLMessage } from 'react-intl'

import icons from '../ActionCardPhysicalLabel/icons'
import { IMPACT_CATEGORIES_COLORS } from '../../utils/constants'
import { processedUnitValue } from '../ActionCardLabelSet'

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
`

const Category = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 10px;
  padding-bottom: 10px;
  width: 50px;

  .anticon {
    color: ${props => props.color};
  }
`

const CategoryLabel = styled.span`
  font-family: Noto Sans;
  font-weight: bold;
  font-size: 10px;
  color: ${props => props.color};
`

const ProgressLabelLeft = styled.span`
  font-family: Noto Sans;
  font-weight: bold;
  font-size: 10px;
  color: ${props => props.color};
  display: flex;
`

const ProgressLabelRight = styled.span`
  font-family: Noto Sans;
  font-weight: bold;
  font-size: 10px;
  color: ${props => props.color};
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  flex: 1;
  display: flex;

  sup {
    font-size: 8px;
  }
`

const ProgressWrapper = styled.div`
  width: 80%;

  .ant-progress-success-bg {
    background-color: ${props => props.color};
  }
`
const Value = styled.div`
  color: ${colors.dark};
  font-family: Noto Sans;
  font-size: 10px;

  sup {
    font-size: 8px;
  }
`

export default function ImpactProgress(props) {
  const { total, current = 0, category } = props
  if (!total) return null

  const color = IMPACT_CATEGORIES_COLORS[category.toUpperCase()] || colors.ocean
  const percent = (current * 100) / total
  const [currNum, currPower] = processedUnitValue(current)
  const [totalNum, totalPower] = processedUnitValue(total)

  return (
    <Container>
      <Category unit={category} color={color}>
        <Icon component={() => icons['positive'][category]} />
        <CategoryLabel color={color}>{category.toUpperCase()}</CategoryLabel>
      </Category>
      <ProgressWrapper color={color}>
        <ProgressLabelLeft color={color}>
          {Math.round(percent)}%
          <Value>
            &mdash; {currNum}
            {currPower && <sup>-{currPower}</sup>}
          </Value>
          &nbsp;
          <Value>
            <FormattedHTMLMessage
              id={`app.actions.physicalValues.one.${category}`}
            />
          </Value>
        </ProgressLabelLeft>
        <Progress
          strokeLinecap={'square'}
          successPercent={percent}
          showInfo={false}
          strokeWidth={10}
        />
        <ProgressLabelRight color={color}>
          {totalNum}
          {totalPower && <sup>-{totalPower}</sup>}
          &nbsp;
          <FormattedHTMLMessage
            id={`app.actions.physicalValues.one.${category}`}
          />
        </ProgressLabelRight>
      </ProgressWrapper>
    </Container>
  )
}

ImpactProgress.propTypes = {
  total: Number,
  current: Number,
  category: String,
}
