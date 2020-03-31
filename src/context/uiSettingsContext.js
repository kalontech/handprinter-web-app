import React, { useState } from 'react'
import PropTypes from 'prop-types'

export const UiContextSettings = React.createContext({})

const UiContextSettingsProvider = ({ children }) => {
  const [showPhysicalValues, setPhysicalValues] = useState(false)

  const setShowPhysicalValues = showPhysicalValues => {
    setPhysicalValues(showPhysicalValues)
  }

  return (
    <UiContextSettings.Provider
      value={{
        showPhysicalValues,
        setShowPhysicalValues,
      }}
    >
      {children}
    </UiContextSettings.Provider>
  )
}

UiContextSettingsProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export default UiContextSettingsProvider
