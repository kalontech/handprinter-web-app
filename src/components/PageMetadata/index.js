import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { injectIntl } from 'react-intl'

const getMetaTranstations = ({ pageName, type, formatMessage }) => {
  const id = `app.${pageName}.head.${type}`
  const msg = formatMessage({ id })
  return msg !== id
    ? msg
    : formatMessage({ id: `app.defaultData.head.${type}` })
}

const PageMetadata = ({ pageName, intl: { formatMessage } }) => (
  <Helmet>
    <title>
      {getMetaTranstations({ pageName, type: 'title', formatMessage })}
    </title>
    <meta
      name="description"
      content={getMetaTranstations({
        pageName,
        type: 'description',
        formatMessage,
      })}
    />
    <meta
      name="keywords"
      content={getMetaTranstations({
        pageName,
        type: 'keywords',
        formatMessage,
      })}
    />
  </Helmet>
)

PageMetadata.propTypes = {
  pageName: PropTypes.string.isRequired,
  intl: {
    formatMessage: PropTypes.func.isRequired,
  },
}

export default injectIntl(PageMetadata)
