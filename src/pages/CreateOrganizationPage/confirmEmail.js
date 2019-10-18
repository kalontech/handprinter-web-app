import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { logOut } from 'redux/accountStore'

import { FormattedMessage } from 'react-intl'
import colors from 'config/colors'
import { Button } from 'antd'

const Main = styled.div`
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`

const EmailWrapper = styled.div`
  height: 118px;
  background: ${colors.lightGray};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Text = styled.span`
  font-size: 14px
  color: ${colors.darkGray};
`

const EmailText = styled.span`
  font-size: 19px
  color: ${colors.dark};
  margin-top: 10px;
`

const Description = styled.span`
  font-size: 14px;
  color: ${colors.darkGray};
  margin-top: 24px;
  text-align: center;
  display: block;
`

const LinkText = styled.span`
  font-size: 14px;
  color: ${colors.dark};
  cursor: pointer;
`

class ConfirmEmail extends React.Component {
  handleContinue = () => {
    if (this.props.handleSubmit) {
      this.props.handleSubmit()
    }
  }

  handleRegister = () => {
    logOut({ redirectUrl: '/account/register?createOrganization=true' })
  }

  handleLogin = () => {
    logOut({ redirectUrl: '/account/login?createOrganization=true' })
  }

  render() {
    const { email } = this.props
    return (
      <Main>
        <div>
          <EmailWrapper>
            <Text>
              <FormattedMessage id={'app.createOrganization.currentlyLogged'} />
            </Text>
            <EmailText>{email}</EmailText>
          </EmailWrapper>
          <Description>
            <FormattedMessage id="app.createOrganization.ownerDescription1" />{' '}
            <LinkText onClick={this.handleRegister}>
              <FormattedMessage id="app.createOrganization.ownerDescriptionCreate" />
            </LinkText>{' '}
            <FormattedMessage id="app.createOrganization.ownerDescriptionOr" />{' '}
            <LinkText onClick={this.handleLogin}>
              <FormattedMessage id="app.createOrganization.ownerDescriptionUse" />
            </LinkText>{' '}
            <FormattedMessage id="app.createOrganization.ownerDescription2" />
          </Description>
        </div>
        <Button
          style={{ width: '100%' }}
          onClick={this.handleContinue}
          type="primary"
        >
          <FormattedMessage id="app.createOrganization.continue" />
        </Button>
      </Main>
    )
  }
}

ConfirmEmail.propTypes = {
  email: PropTypes.string,
  handleSubmit: PropTypes.func,
}

export default ConfirmEmail
