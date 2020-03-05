import React from 'react'
import colors from 'config/colors'

import { TabsContainer, TabContainer, TabsText } from './styled'

function Tabs(props) {
  const { list } = props

  return (
    <TabsContainer>
      {list.map(linkItem => {
        return (
          <TabContainer key={linkItem.to} to={linkItem.to}>
            <linkItem.icon
              style={{
                color: linkItem.active ? colors.white : colors.darkGray,
              }}
            />
            <TabsText active={linkItem.active}>{linkItem.text}</TabsText>
          </TabContainer>
        )
      })}
    </TabsContainer>
  )
}

Tabs.propTypes = {
  list: Array,
}

export default Tabs
