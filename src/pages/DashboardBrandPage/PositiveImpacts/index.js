import React, { useContext, useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'

import chairImg from 'assets/images/chair.png'

import { fetchAction } from '../../../api/actions'
import ActionCardLabelSet from '../../../components/ActionCardLabelSet'
import { UIContextSettings } from '../../../context/uiSettingsContext'

import {
  Container,
  Heading,
  Ocean,
  Title,
  Text,
  FlexCenter,
  ImageStyled,
  DescriptionBold,
  Description,
  Content,
  HowCalculated,
  Chair,
} from './styled'
import CustomSkeleton from '../Skeleton'

export default function PositiveImpacts(props) {
  const { user, takenActions } = props
  const [loading, setLoading] = useState(true)
  const UIContextData = useContext(UIContextSettings)
  const userActions = user?.userImpact?.actions || []
  const tA = takenActions.length === 0 ? userActions : takenActions
  const latestTakenAction = tA[tA.length - 1]?.action
  const [actionPicture, setActionPicture] = useState()
  const action = latestTakenAction
  useEffect(() => {
    async function fetch() {
      try {
        const res = await fetchAction({ slug: latestTakenAction?.slug })
        if (res && res.action) setActionPicture(res.action.picture)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetch()
  }, [tA])
  if (!action) return null
  return (
    <Container>
      <Title>
        <FormattedMessage id={'positiveImpacts'} />
      </Title>
      <Content>
        <Heading>
          <FormattedMessage
            id={`${
              userActions.length > 1
                ? 'youTookFewAction1'
                : 'youTookFirstAction1'
            }`}
          />
          <Ocean>
            <FormattedMessage id={'youTookFirstAction2'} />
          </Ocean>
          <FormattedMessage id={'youTookFirstAction3'} />
        </Heading>
        {actionPicture && <ImageStyled src={actionPicture} />}
        <Text>{action.name}</Text>
        <FlexCenter>
          <ActionCardLabelSet
            impacts={action.impacts}
            impactsInUnits={action.impactsInUnits}
            mobileFixedWidth
            showPhysicalValues={UIContextData.showPhysicalValues}
          />
        </FlexCenter>
        <DescriptionBold>
          <FormattedMessage id="yourActionCreatingImpact" />
          <Description> {action.description}</Description>
        </DescriptionBold>
        {/* TODO */}
        {/* <Description>
          <FormattedMessage id="thisIsEquivelent" />
        </Description>
        <FlexCenter>
          <Chair src={chairImg} />
          <Description>4 Smart Chairs</Description>
        </FlexCenter> */}
      </Content>
      {/* TODO */}
      {/* <HowCalculated to={'/account/dashboard'}>
        <FormattedMessage id="netPositiveDaysHowCalculated" />
      </HowCalculated> */}
    </Container>
  )
}

PositiveImpacts.propTypes = {
  takenActions: Object,
  user: Object,
}
