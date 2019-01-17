import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { FormattedMessage } from 'react-intl'
import { Link, withRouter } from 'react-router-dom'

import { DefaultButton } from 'components/Styled'
import colors from 'config/colors'
import hexToRgba from 'utils/hexToRgba'

const Block = styled.section`
  padding: 6px 0;
  background-color: ${colors.dark};
`

const Content = styled.div`
  margin: 0 auto;
  padding: 0 34px;
  max-width: 1180px;
  display: flex;
  justify-content: space-between;
`

const List = styled.ul`
  padding: 0;
  display: flex;
  justify-content: space-between;
  min-width: 135px;
`

const Button = styled(DefaultButton)`
  color: ${hexToRgba(colors.white, 0.5)};
  height: 44px;
  min-width: 134px;

  &&:hover,
  &&:focus {
    color: ${hexToRgba(colors.white, 0.7)};
  }

  &&.active,
  &&:active {
    color: ${hexToRgba(colors.white, 0.7)};
  }
`

const HeaderUserActions = ({ location }) => (
  <Block>
    <Content>
      <List />

      <Link to={`${location.pathname}/suggest-idea`}>
        <Button>
          <FormattedMessage id="app.headerActions.addAction" />
        </Button>
      </Link>
    </Content>
  </Block>
)

HeaderUserActions.propTypes = {
  location: PropTypes.object,
}

export default withRouter(HeaderUserActions)
