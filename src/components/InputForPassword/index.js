import React, { Component } from 'react'
import { injectIntl, intlShape } from 'react-intl'

import { Input } from 'components/Styled'

import eyeFillIcon from 'assets/icons/eyeFill.svg'
import eyeSlashFillIcon from 'assets/icons/eyeSlashFill.svg'

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
      createPass,
    } = this.props
    const { showPassword } = this.state
    return (
      <Input
        type={showPassword ? 'text' : 'password'}
        placeholder={formatMessage({
          id: createPass ? 'app.forms.createPassword' : 'app.forms.password',
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
  intl: intlShape.isRequired,
}

export default injectIntl(InputForPassword)
