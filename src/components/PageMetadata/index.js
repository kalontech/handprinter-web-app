import React from 'react'
import PropTypes from 'prop-types'
import { Helmet } from 'react-helmet'
import { injectIntl, intlShape } from 'react-intl'

const getMetaTranslations = ({ pageName, type, formatMessage }) => {
  const id = `app.${pageName}.head.${type}`
  const msg = formatMessage({ id })
  return msg !== id
    ? msg
    : formatMessage({ id: `app.defaultData.head.${type}` })
}

const PageMetadata = ({ pageName, intl: { formatMessage } }) => (
  <Helmet
    title={getMetaTranslations({ pageName, type: 'title', formatMessage })}
    meta={[
      {
        name: 'description',
        content: getMetaTranslations({
          pageName,
          type: 'description',
          formatMessage,
        }),
      },
      {
        name: 'keywords',
        content: getMetaTranslations({
          pageName,
          type: 'keywords',
          formatMessage,
        }),
      },
    ]}
  />
)

PageMetadata.propTypes = {
  pageName: PropTypes.string.isRequired,
  intl: intlShape.isRequired,
}

export default injectIntl(PageMetadata)
