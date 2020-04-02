import React, { useState } from 'react'
import PropTypes from 'prop-types'

export const UIContextSettings = React.createContext({})

const UIContextSettingsProvider = ({ children }) => {
  const [showPhysicalValues, setPhysicalValues] = useState(false)

  const setShowPhysicalValues = showPhysicalValues => {
    setPhysicalValues(showPhysicalValues)
  }

  return (
    <UIContextSettings.Provider
      value={{
        showPhysicalValues,
        setShowPhysicalValues,
      }}
    >
      {children}
    </UIContextSettings.Provider>
  )
}

UIContextSettingsProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export default UIContextSettingsProvider
