import React from 'react'
import styled from 'styled-components'
import { FormattedMessage } from 'react-intl'
import PropTypes from 'prop-types'
import decodeError from 'utils/decodeError'

import colors from 'config/colors'

const Button = styled.button`
  background-color: transparent;
  border: none;
  color: ${colors.blue};
  cursor: pointer;
  font-weight: bold;
  padding: 0px;
  &:focus,
  &:active {
    outline: none;
  }
`
export default class ResendButton extends React.Component {
  state = {
    disabled: this.props.status === 'ACCEPTED',
  }
  render() {
    const { disabled } = this.state
    const { error, onClick } = this.props
    return (
      <Button
        disabled={disabled}
        onClick={() => {
          onClick()
          this.setState({
            disabled: true,
          })
        }}
      >
        <FormattedMessage
          id={
            disabled
              ? error
                ? decodeError(error)
                : 'app.increaseHandprintPage.table.sentInvitations'
              : 'app.increaseHandprintPage.table.resendInvitation'
          }
        />
      </Button>
    )
  }
}

ResendButton.propTypes = {
  status: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  error: PropTypes.string,
}
