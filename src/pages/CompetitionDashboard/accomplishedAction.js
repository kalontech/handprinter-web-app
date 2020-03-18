import React from 'react'

import {
  AccomplishedActionContainer,
  AccomplishedActionPicture,
  AccomplishedActionName,
  AccomplishedActionCount,
  AccomplishedActionCountBG,
} from './styled'

function AccomplishedAction(props) {
  const { accomplished } = props
  if (!accomplished) return null
  const { action, count } = accomplished
  if (!action) return null

  return (
    <AccomplishedActionContainer>
      <AccomplishedActionPicture src={action.picture} />
      <AccomplishedActionName>{action.name}</AccomplishedActionName>
      <AccomplishedActionCountBG>
        <AccomplishedActionCount>{count}</AccomplishedActionCount>
      </AccomplishedActionCountBG>
    </AccomplishedActionContainer>
  )
}

AccomplishedAction.propTypes = {
  accomplished: Object,
}

export default AccomplishedAction
