import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { animateScroll } from 'react-scroll'

import {
  OceanContainer,
  OceanModal,
  OceanTitle,
  PrimaryButton,
  OceanDescription,
} from 'components/Styled'
import PageMetadata from 'components/PageMetadata'
import colors from 'config/colors'
import media from 'utils/mediaQueryTemplate'
import LampImgPath from 'assets/actions-page/lamp.png'

const ButtonSuccess = styled(PrimaryButton)`
  display: block;
  width: 100%;
  max-width: 300px;
  margin: 30px auto 0;
  ${media.phone`
    width: 100%;
  `}
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
    padding-left: 15px;
    padding-right: 15px;
  `}

  img {
    max-width: 230px;
    max-height: 230px;
    margin: 0 auto 15px;
  }
`

export default class SubmitSucceededPage extends React.PureComponent {
  static propTypes = {
    match: PropTypes.object,
  }

  componentDidMount() {
    animateScroll.scrollToTop()
  }

  render() {
    const { match } = this.props

    return (
      <Fragment>
        <PageMetadata pageName="submitSucceededPage" />
        <OceanContainer>
          <Content>
            <img src={LampImgPath} alt="success" />
            <OceanTitle>
              <FormattedMessage
                id={
                  match.params.id
                    ? 'app.actionCreatePage.editSubmitSucceededTitle'
                    : 'app.actionCreatePage.submitSucceededTitle'
                }
              />
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
}
