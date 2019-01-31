import React, { Fragment } from 'react'
import { FormattedMessage } from 'react-intl'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import {
  OceanContainer,
  OceanModal,
  OceanTitle,
  PrimaryButton,
  OceanDescription,
} from './../../components/Styled'
import PageMetadata from '../../components/PageMetadata'
import colors from 'config/colors'
import media from 'utils/mediaQueryTemplate'
import LampImgPath from 'assets/actions-page/lamp.png'

const ButtonSuccess = styled(PrimaryButton)`
  width: 100%;
  max-width: 300px;
  margin: 30px auto 0;
`
const Content = styled(OceanModal)`
  padding: 14px 60px;
  width: 100%;
  max-width: 530px;
  min-height: 530px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: ${colors.white};
  ${OceanTitle} {
    margin-bottom: 0;
  }

  ${media.tablet`
    padding: 14px 5%;
  `}

  img {
    max-width: 230px;
    max-height: 230px;
    margin: 0 auto 15px;
  }
`

const SubmitSucceededPage = () => {
  return (
    <Fragment>
      <PageMetadata pageName="submitSucceededPage" />
      <OceanContainer>
        <Content>
          <img src={LampImgPath} alt="success" />
          <OceanTitle>
            <FormattedMessage id="app.actionCreatePage.submitSucceededTitle" />
          </OceanTitle>
          <OceanDescription>
            <FormattedMessage id="app.actionCreatePage.submitSucceededDescription" />
          </OceanDescription>

          <Link to="/actions">
            <ButtonSuccess type="primary">
              <FormattedMessage id="app.actionCreatePage.submitSucceededGoBack" />
            </ButtonSuccess>
          </Link>
        </Content>
      </OceanContainer>
    </Fragment>
  )
}

export default SubmitSucceededPage