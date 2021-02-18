import { Skeleton } from 'antd'
import React from 'react'

import { Container } from './styled'

export default function CustomSkeleton({ rows }) {
  return (
    <Container>
      <Skeleton active paragraph={{ rows }} />
    </Container>
  )
}

CustomSkeleton.propTypes = {
  rows: Number,
}
