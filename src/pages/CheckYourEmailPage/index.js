import React, { Fragment } from 'react'
import { FormattedHTMLMessage, FormattedMessage } from 'react-intl'
import { Link } from 'react-router-dom'
import { Button } from 'antd'

import {
  OceanContainer,
  OceanModal,
  OceanImage,
  OceanTitle,
  OceanDescription,
  OceanForm,
} from './../../components/Styled'
import checkYourEmailOceanImage from './../../assets/images/checkYourEmailOceanImage.png'
import PageMetadata from '../../components/PageMetadata'

const CheckYourEmailPage = () => (
  <Fragment>
    <PageMetadata pageName="checkYourEmailPage" />
    <OceanContainer>
      <OceanModal>
        <OceanImage>
          <img src={checkYourEmailOceanImage} />
        </OceanImage>
        <OceanTitle>
          <FormattedMessage id="app.checkYourEmailPage.title" />
        </OceanTitle>
        <OceanDescription>
          <FormattedHTMLMessage id="app.checkYourEmailPage.description" />
        </OceanDescription>
        <OceanForm>
          <Link to="/account/reset-password">
            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
              <FormattedMessage id="app.checkYourEmailPage.sendAgain" />
            </Button>
          </Link>
        </OceanForm>
      </OceanModal>
    </OceanContainer>
  </Fragment>
)

export default CheckYourEmailPage
