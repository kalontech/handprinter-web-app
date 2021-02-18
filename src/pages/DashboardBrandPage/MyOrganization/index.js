import React, { useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import moment from 'moment'
import _ from 'lodash'
import FlagIconComponent from 'assets/icons/FlagIcon'
import SuggestedIcon from 'assets/icons/SuggestedIcon'
import chairImg from 'assets/images/chair.png'

import { Col, Row } from 'antd'

import CustomSkeleton from '../Skeleton'

import {
  Container,
  Name,
  Text,
  Heading,
  HowCalculated,
  Info,
  InfoRow,
  InfoText,
  InfoCount,
  GoalIcon,
  MilestoneTitle,
} from './styled'
import { getOrganization, search } from '../../../api/organization'
import { IMPACT_CATEGORIES } from '../../../utils/constants'
import { MilestoneImpactProgress } from '../../OrganizationDashboardPage/milestones'

export default function MyOrganization(props) {
  const { user } = props
  const [organization, setOrganization] = useState()
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    async function fetch() {
      try {
        const organizationsRes = await search(user?.belongsToBrand)
        const organizationRes = await getOrganization(
          organizationsRes?.organizations[0]?._id,
        )
        setOrganization(organizationRes)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    fetch()
  }, [user?.belongsToBrand])

  if (loading) return <CustomSkeleton rows={16} />
  if (!organization) return null
  const { name, _id, userImpacts, info, goal, milestones } = organization

  const currentProgress = _.get(userImpacts, 'impactsInUnits.footprint', {})
  const completedMilestones = milestones.filter(milestone => {
    let match = Object.keys(currentProgress).length > 0
    Object.keys(currentProgress).forEach(category => {
      if (currentProgress[category] < milestone[category]) {
        match = false
      }
    })
    return match
  })

  const activeMilestoneIndex = Math.min(
    completedMilestones.length,
    milestones.length - 1,
  )

  return (
    <Container whiteBG>
      <Name>
        <FormattedMessage id="myCompany" />
      </Name>
      <Heading>{name}</Heading>
      <Info>
        <InfoRow>
          <SuggestedIcon />
          <InfoText>
            <FormattedMessage id="app.actions.timeValues.other.MEMBERS" />
          </InfoText>
          <InfoCount>{info.membersCount}</InfoCount>
        </InfoRow>
        <InfoRow>
          <FlagIconComponent />
          <InfoText>
            <FormattedMessage id="actionsCompleted" />
          </InfoText>
          <InfoCount>{userImpacts?.actions?.length}</InfoCount>
        </InfoRow>
      </Info>
      <Heading>
        <FormattedMessage
          id="brandGoals"
          values={{
            brand: `${name} ${moment().year()}`,
          }}
        />
      </Heading>
      <Text>
        <FormattedMessage
          id="combinedEfforts"
          values={{
            goal: goal?.name,
            brand: name,
          }}
        />
      </Text>
      <GoalIcon src={goal?.logo?.src} />
      <MilestoneTitle>
        <FormattedMessage
          id="productsAreNetPositive"
          values={{
            curr: completedMilestones?.length,
            all: milestones?.length,
            year: moment().year(),
          }}
        />
      </MilestoneTitle>

      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <Heading>
            <FormattedMessage id="progressNextProduct" />
          </Heading>
          <Text>
            <FormattedMessage
              id="climateImpactNetPos"
              values={{
                milestoneName: milestones[activeMilestoneIndex]?.name,
              }}
            />
          </Text>
        </div>
        <GoalIcon src={chairImg} />
      </div>

      <Row style={{ flexGrow: '1' }}>
        {Object.keys(IMPACT_CATEGORIES).map(key => {
          const category = IMPACT_CATEGORIES[key]
          return (
            <Col key={category} lg={8} md={12} xs={12}>
              <MilestoneImpactProgress
                impact={milestones[activeMilestoneIndex][category]}
                category={category}
                currentProgress={currentProgress[category]}
              />
            </Col>
          )
        })}
      </Row>
      <HowCalculated to={`/organizations/${_id}/dashboard/goal`}>
        <FormattedMessage id="seeAllProducts" />
      </HowCalculated>
    </Container>
  )
}

MyOrganization.propTypes = {
  user: Object,
}
