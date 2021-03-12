import React, { useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import moment from 'moment'
import _ from 'lodash'
import FlagIconComponent from 'assets/icons/FlagIcon'
import SuggestedIcon from 'assets/icons/SuggestedIcon'
import chairImg from 'assets/images/chair.png'

import { Col } from 'antd'

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
  RowFlexCenter,
} from './styled'
import { getOrganization } from '../../../api/organization'
import { IMPACT_CATEGORIES } from '../../../utils/constants'
import { MilestoneImpactProgress } from '../../OrganizationDashboardPage/milestones'

export default function MyOrganization(props) {
  const { organization: organizationCompact } = props
  const [organization, setOrganization] = useState(organizationCompact)
  useEffect(() => {
    async function fetch() {
      try {
        const organizationRes = await getOrganization(organizationCompact._id)
        setOrganization(organizationRes)
      } catch (error) {
        console.error(error)
      }
    }
    setTimeout(() => fetch(), 2000)
  }, [])

  if (!organization) return <CustomSkeleton rows={16} />
  const { name, _id, userImpacts, goal, milestones } = organization

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
          <InfoCount>{organization.members.length}</InfoCount>
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
          <GoalIcon src={chairImg} />
        </div>
      </div>

      <RowFlexCenter>
        {Object.keys(IMPACT_CATEGORIES).map(key => {
          const category = IMPACT_CATEGORIES[key]
          const impact = milestones[activeMilestoneIndex][category]
          if (!impact || !category) return null
          return (
            <Col key={category} lg={8} md={12} xs={12}>
              <MilestoneImpactProgress
                impact={impact}
                category={category}
                currentProgress={currentProgress[category]}
              />
            </Col>
          )
        })}
      </RowFlexCenter>
      <HowCalculated to={`/organizations/${_id}/dashboard/goal`}>
        <FormattedMessage id="seeAllProducts" />
      </HowCalculated>
    </Container>
  )
}

MyOrganization.propTypes = {
  user: Object,
  organization: Object,
}
