import React, { Fragment, Component } from 'react'
import { compose } from 'redux'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { FormattedMessage, injectIntl } from 'react-intl'
import { animateScroll } from 'react-scroll'

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

const translationsIds = {
  privacyPolicy: {
    pageName: 'privacyPolicy',
    title: 'app.pages.privacyPolicy.title',
    paragraphs: [
      'app.pages.privacyPolicy.paragraph.1',
      'app.pages.privacyPolicy.paragraph.2',
      'app.pages.privacyPolicy.paragraph.3',
      'app.pages.privacyPolicy.paragraph.4',
      'app.pages.privacyPolicy.paragraph.5',
      'app.pages.privacyPolicy.paragraph.6',
      'app.pages.privacyPolicy.paragraph.7',
      'app.pages.privacyPolicy.paragraph.8',
    ],
  },
  termsOfUse: {
    // TODO:
    // add translations when will be created terms of use page
  },
}

class PrivacyPolicyPage extends Component {
  static propTypes = {
    match: PropTypes.shape({
      path: PropTypes.oneOf(['/pages/terms-of-use', '/pages/privacy-policy'])
        .isRequired,
    }),
  }

  get translationsIds() {
    return this.props.match.path.includes('privacy-policy')
      ? translationsIds.privacyPolicy
      : translationsIds.termsOfUse
  }

  componentDidMount() {
    animateScroll.scrollToTop()
  }

  render() {
    return (
      <Fragment>
        <PageMetadata pageName={this.translationsIds.pageName} />
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
              <FormattedMessage id={this.translationsIds.title} />
            </PageHeading>
            {this.translationsIds.paragraphs.map(id => (
              <p key={id}>
                <FormattedMessage id={id} />
              </p>
            ))}
          </Content>
        </BlockContainer>
      </Fragment>
    )
  }
}

export default compose(injectIntl)(PrivacyPolicyPage)
