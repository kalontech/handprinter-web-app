import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { injectIntl, intlShape } from 'react-intl'

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
  intl: intlShape.isRequired,
}

export default injectIntl(PageMetadata)
