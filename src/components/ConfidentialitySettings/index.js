import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { compose } from 'redux'
import styled from 'styled-components'
import { injectIntl, intlShape } from 'react-intl'

import colors from 'config/colors'
import { Creators } from 'redux/userStore'
import ConfidentialityForm from 'components/ConfidentialityForm'
import * as apiUser from 'api/user'

const Title = styled.h4`
  font-weight: bold;
  font-size: 16px;
  line-height: 28px;
  color: ${colors.dark};
`

class ConfidentialitySettings extends React.PureComponent {
  static propTypes = {
    intl: intlShape,
    user: PropTypes.object.isRequired,
    updateUser: PropTypes.func,
  }

  handleSubmit = infoAccess => {
    const { updateUser, user } = this.props

    updateUser({ ...user, infoAccess })
    return apiUser.updateMe({ infoAccess }).catch(error => {
      updateUser(user)
      throw error
    })
  }

  render() {
    const { intl, user } = this.props

    return (
      <React.Fragment>
        <Title>
          {intl.formatMessage({ id: 'app.confidentialitySettings.title' })}
        </Title>

        <ConfidentialityForm
          onSubmit={this.handleSubmit}
          initialValues={user.infoAccess}
        />
      </React.Fragment>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user.data,
})

export default compose(
  connect(
    mapStateToProps,
    { updateUser: Creators.setUser },
  ),
  injectIntl,
)(ConfidentialitySettings)
