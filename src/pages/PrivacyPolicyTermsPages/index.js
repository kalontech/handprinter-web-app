import React, { Fragment } from 'react'
import { compose } from 'redux'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { FormattedMessage, injectIntl, intlShape } from 'react-intl'
// import { ReactComponent as DocumentIconComponent } from 'assets/icons/documentIcon.svg'
// import { ReactComponent as LockIconComponent } from 'assets/icons/lockIcon.svg'

// import TabsSecondary from 'components/TabsSecondary'
import { BlockContainer } from 'components/Styled'
import PageMetadata from 'components/PageMetadata'
import colors from 'config/colors'

const Content = styled.div`
  padding: 40px 0;
  font-family: Noto Sans, serif;
  font-size: 16px;
  colors: ${colors.dark};
  p {
    line-height: 1.8;
    margin-bottom: 10px;
  }
`

const PageHeading = styled.h1`
  font-family: Noto Serif, Noto Sans, serif;
  font-size: 37px;
  font-weight: bold;
`

const PrivacyPolicyPage = ({ intl: { formatMessage }, match: { path } }) => {
  const pageNameIntl = path.includes('privacy-policy')
    ? 'privacyPolicy'
    : 'termsOfUse'

  return (
    <Fragment>
      <PageMetadata pageName="privacyPolicy" />
      {/* 
        Hide tabs for now.
        Waiting for Greg reply about Terms of use.
      */}
      {/* <TabsSecondary
        list={[
          {
            to: `/pages/terms-of-use`,
            icon: DocumentIconComponent,
            text: formatMessage({ id: `app.pages.termsOfUse.title` }),
            active: true,
          },
          {
            to: `/pages/privacy-policy`,
            icon: LockIconComponent,
            text: formatMessage({ id: `app.pages.privacyPolicy.title` }),
            active: true,
          },
        ]}
        justify="center"
      /> */}
      <BlockContainer>
        <Content>
          <PageHeading>
            <FormattedMessage id={`app.pages.${pageNameIntl}.title`} />
          </PageHeading>
          <p>
            <FormattedMessage id={`app.pages.${pageNameIntl}.paragraph.1`} />
          </p>
          <p>
            <FormattedMessage id={`app.pages.${pageNameIntl}.paragraph.2`} />
          </p>
          <p>
            <FormattedMessage id={`app.pages.${pageNameIntl}.paragraph.3`} />
          </p>
          <p>
            <FormattedMessage id={`app.pages.${pageNameIntl}.paragraph.4`} />
          </p>
          <p>
            <FormattedMessage id={`app.pages.${pageNameIntl}.paragraph.5`} />
          </p>
        </Content>
      </BlockContainer>
    </Fragment>
  )
}

PrivacyPolicyPage.propTypes = {
  intl: intlShape.isRequired,
  match: PropTypes.shape({
    path: PropTypes.string.isRequired,
  }),
}

export default compose(injectIntl)(PrivacyPolicyPage)
