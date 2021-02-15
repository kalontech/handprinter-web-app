import React, { useEffect, useState } from 'react'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { injectIntl } from 'react-intl'
import * as apiOrganization from 'api/organization'

import Header from './Header'

function DashboardBrandPage(props) {
  const { user } = props

  const [organization, setOrganization] = useState()

  useEffect(() => {
    async function fetch() {
      try {
        const res = await apiOrganization.search(user.belongsToBrand)
        if (res && res.organizations) {
          setOrganization(res.organizations[0])
        }
      } catch (error) {
        console.error(error)
      }
    }

    fetch()
  }, [user.belongsToBrand])

  return (
    <>
      <Header user={user} organization={organization} />
    </>
  )
}

const mapStateToProps = state => ({
  user: state.user.data,
  countries: state.app.countries,
})

export default compose(
  injectIntl,
  connect(mapStateToProps),
)(DashboardBrandPage)
