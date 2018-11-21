import React, { Component } from 'react'
import { injectIntl } from 'react-intl'
import PropTypes from 'prop-types'

import { Input } from './../../components/Styled'

import eyeFillIcon from './../../assets/icons/eyeFill.svg'
import eyeSlashFillIcon from './../../assets/icons/eyeSlashFill.svg'

class InputForPassword extends Component {
  state = {
    showPassword: false,
  }

  toggleShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword })
  }

  render() {
    const {
      intl: { formatMessage },
    } = this.props
    const { showPassword } = this.state
    return (
      <Input
        type={showPassword ? 'text' : 'password'}
        placeholder={formatMessage({
          id: 'app.forms.createPassword',
        })}
        suffix={
          <img
            onClick={this.toggleShowPassword}
            src={showPassword ? eyeFillIcon : eyeSlashFillIcon}
            style={{ cursor: 'pointer' }}
          />
        }
        {...this.props}
      />
    )
  }
}

InputForPassword.propTypes = {
  intl: PropTypes.object.isRequired,
}

export default injectIntl(InputForPassword)
