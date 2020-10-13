import React, { Fragment } from 'react'
import { FormattedHTMLMessage, FormattedMessage } from 'react-intl'
import { Link } from 'react-router-dom'
import { Button } from 'antd'
import { animateScroll } from 'react-scroll/modules'

import {
  OceanContainer,
  OceanModal,
  OceanImage,
  OceanTitle,
  OceanDescription,
  OceanForm,
} from 'components/Styled'
import checkYourEmailOceanImage from 'assets/images/checkYourEmailOceanImage.png'
import PageMetadata from 'components/PageMetadata'

export default class CheckYourEmailPage extends React.PureComponent {
  componentDidMount() {
    animateScroll.scrollToTop()
  }

  render() {
    return (
      <Fragment>
        <PageMetadata pageName="checkYourEmailPage" />
        <OceanContainer>
          <OceanModal>
            <OceanImage>
              <img
                src={checkYourEmailOceanImage}
                alt="check your email page please"
              />
            </OceanImage>
            <OceanTitle>
              <FormattedMessage id="app.checkYourEmailPage.title" />
            </OceanTitle>
            <OceanDescription>
              <FormattedHTMLMessage id="app.checkYourEmailPage.description" />
            </OceanDescription>
            <OceanForm>
              <Link to="/account/login">
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ width: '100%' }}
                >
                  <FormattedMessage id="app.checkYourEmailPage.sendAgain" />
                </Button>
              </Link>
            </OceanForm>
          </OceanModal>
        </OceanContainer>
      </Fragment>
    )
  }
}
