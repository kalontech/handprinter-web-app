import React, { useContext } from 'react'

import ActionCardLabelSet from 'components/ActionCardLabelSet'

import { UIContextSettings } from '../../context/uiSettingsContext'

import {
  AccomplishedActionContainer,
  AccomplishedActionPicture,
  AccomplishedActionName,
  AccomplishedActionCount,
  AccomplishedActionCountBG,
  AccomplishedActionNameBlock,
  AccomplishedActionContainerMobile,
} from './styled'

function AccomplishedAction(props) {
  const { accomplished } = props
  if (!accomplished) return null
  const { action, count } = accomplished
  if (!action) return null
  const UIContextData = useContext(UIContextSettings)

  return (
    <>
      {props.isMobile && (
        <AccomplishedActionContainerMobile>
          <div style={{ display: 'flex', marginBottom: '5px' }}>
            <AccomplishedActionPicture src={action.picture} />
            <AccomplishedActionNameBlock>
              <AccomplishedActionName>{action.name}</AccomplishedActionName>
            </AccomplishedActionNameBlock>
            <AccomplishedActionCountBG>
              <AccomplishedActionCount>{count}</AccomplishedActionCount>
            </AccomplishedActionCountBG>
          </div>
          {action.impacts && action.impactsInUnits && (
            <ActionCardLabelSet
              impacts={action.impacts}
              impactsInUnits={action.impactsInUnits}
              showPhysicalValues={UIContextData.showPhysicalValues}
            />
          )}
        </AccomplishedActionContainerMobile>
      )}
      {!props.isTablet && !props.isMobile && (
        <AccomplishedActionContainer>
          <AccomplishedActionPicture src={action.picture} />
          <AccomplishedActionNameBlock>
            <AccomplishedActionName>{action.name}</AccomplishedActionName>
            {action.impacts && action.impactsInUnits && (
              <ActionCardLabelSet
                impacts={action.impacts}
                impactsInUnits={action.impactsInUnits}
                showPhysicalValues={UIContextData.showPhysicalValues}
              />
            )}
          </AccomplishedActionNameBlock>
          <AccomplishedActionCountBG>
            <AccomplishedActionCount>{count}</AccomplishedActionCount>
          </AccomplishedActionCountBG>
        </AccomplishedActionContainer>
      )}
    </>
  )
}

AccomplishedAction.propTypes = {
  accomplished: Object,
}

export default AccomplishedAction
