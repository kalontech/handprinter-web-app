import React from 'react'
import * as Ant from 'antd'

const Tooltip = props => (
  <Ant.Tooltip overlayClassName="ant-tooltip__global-overlay" {...props}>
    {props.children}
  </Ant.Tooltip>
)

export default Tooltip
