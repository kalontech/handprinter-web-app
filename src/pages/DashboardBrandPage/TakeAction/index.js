import React, { useContext, useEffect, useState } from 'react'
import { FormattedMessage } from 'react-intl'
import Link from 'react-router-dom/Link'

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
  Description,
  Assumption,
  GetStartedButton,
} from './styled'

const ACTION_TO_GET_STARTED = 'use-led-bulb-instead-of-incandescent'
export default function TakeAction() {
  const [action, setAction] = useState()
  const UIContextData = useContext(UIContextSettings)

  useEffect(() => {
    async function fetch() {
      try {
        const res = await fetchAction({ slug: ACTION_TO_GET_STARTED })
        if (res && res.action) setAction(res.action)
      } catch (error) {
        console.error(error)
      }
    }

    fetch()
  }, [])
  if (!action) return null
  const handleGetStarted = () => {}
  return (
    <Container>
      <Title>
        <FormattedMessage id={'app.actions.takeAction'} />
      </Title>
      <Heading>
        <FormattedMessage id={'yourFirstHandprint1'} />
        <Ocean>
          <FormattedMessage id={'yourFirstHandprint2'} />
        </Ocean>
        <FormattedMessage
          id={'yourFirstHandprint3'}
          values={{
            actionName: action.name,
          }}
        />
      </Heading>
      <ImageStyled src={action.picture} />
      <Text>
        <FormattedMessage id={'posImactsCreatedAction'} />
      </Text>
      <FlexCenter>
        <ActionCardLabelSet
          impacts={action.impacts}
          impactsInUnits={action.impactsInUnits}
          mobileFixedWidth
          showPhysicalValues={UIContextData.showPhysicalValues}
        />
        <Description>{action.description}</Description>
        <Assumption>{action.assumptions}</Assumption>
        <Link to={`/actions/discover/${ACTION_TO_GET_STARTED}`}>
          <GetStartedButton type="primary" onClick={handleGetStarted}>
            <FormattedMessage id="getStarted" />
          </GetStartedButton>
        </Link>
      </FlexCenter>
    </Container>
  )
}
