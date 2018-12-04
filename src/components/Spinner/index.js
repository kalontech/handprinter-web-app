import React from 'react'
import { Spin, Icon } from 'antd'
import styled from 'styled-components'

import colors from './../../config/colors'

const Wrapper = styled.div`
  align-items: center;
  display: flex;
  height: 200px;
  justify-content: center;
`

const Spinner = () => (
  <Wrapper>
    <Spin
      indicator={
        <Icon
          type="loading"
          style={{ color: colors.green, fontSize: 24 }}
          spin
        />
      }
    />
  </Wrapper>
)

export default Spinner
