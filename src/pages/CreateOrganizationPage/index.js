import React, { Component, Fragment } from 'react'
import { bindActionCreators, compose } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Form } from 'antd'
import { Link, Redirect } from 'react-router-dom'
import { injectIntl, FormattedMessage } from 'react-intl'
import styled from 'styled-components'
import { animateScroll } from 'react-scroll/modules'

import registerFingerprintTop from 'assets/images/registerFingerprintTop.png'
import registerFingerprintBot from 'assets/images/registerFingerprintBot.png'
import registerActionCardImage from 'assets/images/registerActionCard.jpg'
import registerActionCardImageTablet from 'assets/images/registerActionCardImageTablet.png'
import registerBrandedPhotoLeaves from 'assets/images/registerBrandedPhotoLeaves.png'

import { Creators as AccountCreators } from 'redux/accountStore'
import { getBrandedHostnamePrefix } from 'config/branded'
import handleFormError from 'utils/handleFormError'
import decodeError from 'utils/decodeError'
import colors from 'config/colors'
import media from 'utils/mediaQueryTemplate'
import {
  ActionCard,
  ActionCardLeftHalf,
  ActionCardRightHalf,
  ActionCardWrapper,
  ActionCardTitle,
} from 'components/Styled'
import PageMetadata from 'components/PageMetadata'
import OrganizationCreationSteps from 'components/OrganizationCreationSteps'

import * as apiUser from 'api/user'

import CreateOrganizationFrom from './CreateOrganizationFrom'
import ConfirmEmail from './confirmEmail'
import Summary from './summary'

export const BrandedBlockWrap = styled.div`
  position: relative;
  height: 100%;
  color: ${colors.white};
  ${media.tablet`
    height: 275px;
  `}
`

export const BrandedBlock = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100%;
  padding: 50px;
  text-align: center;
  position: relative;
  ${media.desktop`
    padding: 15px;
  `}
  ${media.tablet`
    padding: 10px;
    top: 5px
  `}
`

export const BrandedBlockPhotoBlock = styled.div`
  height: 133px;
  width: 133px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 28px;
  ${media.tablet`
    height: 64px;
    width: 64px;
    margin-bottom: 10px;
  `}
`

export const BrandedBlockPhoto = styled.img`
  position: relative;
  width: 100%;
`

export const BrandedBlockPhotoBg = styled.div`
  background-color: ${colors.white};
  height: 100%;
  position: relative;
`

export const BrandedBlockReferrerName = styled.div`
  height: 100%;
  color: ${colors.green};
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  font-size: 48px;
`

export const BrandedBlockLeaves = styled.img`
  height: 70px;
  width: auto;
  position: absolute;
  top: -33px;
  right: -11px;
  ${media.desktop`
    top: -37px;
    right: -10px;
  `}
  ${media.tablet`
    height: 33px;
    top: -15px;
    right: -3px;
  `}
`

export const BrandedBlockHeading = styled.h2`
  color: ${colors.white};
  font-size: 28px;
  margin: 0 0 20px 0;
  line-height: 37px;
  max-width: 300px;
  ${media.desktop`
    display: none;
  `}
`

export const BrandedBlockDescription = styled.p`
  font-size: 16px;
  ${media.tablet`
    max-width: 300px;
  `}
`

export const BrandedBlockFingerprintTopImg = styled.img`
  position: absolute;
  top: 0;
  height: 160px;
  width: auto;
`

export const BrandedBlockFingerprintBotImg = styled.img`
  position: absolute;
  bottom: 0;
  right: 0;
  height: 80px;
  width: auto;
`

const StyledActionCard = styled(ActionCard)`
  ${media.tablet`
    flex-direction: column;
    flex-grow: 1;
  `}
`

const StyledActionCardWrapper = styled(ActionCardWrapper)`
  align-items: stretch;
  height: 100%;
  flex-grow: 1;
  overflow-y: auto;
  ${media.tablet`
    padding: 0px;
  `}
`

const FormWrap = styled.div`
  width: 100%;
  height: 100%;
  padding: 30px 36px;
  justify-content: flex-between;
  display: flex;
  flex-direction: column;
  ${media.tablet`
    margin-top: 30px;
  `}
  ${media.phone`
    margin-top: 0;
  `}
`

const FlexView = styled.div`
  height: 100%;
  display: flex
  flex-direction: column
`

const DogImgDesktop = styled.img`
  display: block;
  ${media.desktop`
    display: none;
  `}
`

const DogImgTablet = styled.img`
  display: none;
  ${media.desktop`
    display: block;
  `}
`

const BrandedBlockPhotoWrap = styled.div`
  position: relative;
`

class CreateOrganizationPage extends Component {
  state = {
    referrer: null,
    getReferrerError: null,
    step: 1,
    organizationDetails: undefined,
  }

  componentDidMount() {
    const {
      match: {
        params: { invitationCode, eatonCode },
      },
    } = this.props

    animateScroll.scrollToTop()

    if (eatonCode) {
      const siloSecureCode = Buffer.from(eatonCode, 'base64').toString('ascii')
      this.props.form.setFieldsValue({ siloSecureCode })
    }
    if (invitationCode) this.fetchReferrer(invitationCode)
  }

  componentDidUpdate(prevProps) {
    handleFormError('registerError', 'formError', prevProps, this.props)
  }

  fetchReferrer = async invitationCode => {
    const {
      intl: { formatMessage },
      form: { setFieldsValue, setFields },
    } = this.props
    try {
      const { user } = await apiUser.getUser({ invitationCode })
      if (user) this.setState({ referrer: user })
      setFieldsValue({ invitationCode: user.invitationCode })
    } catch (error) {
      setFields({
        formError: {
          errors: [new Error(formatMessage({ id: decodeError(error) }))],
        },
      })
    }
  }

  handleSubmit = e => {
    e.preventDefault()
    const {
      form: { validateFields },
      registerRequest,
    } = this.props

    validateFields((err, values) => {
      if (!err) {
        delete values.formError
        const {
          email,
          password,
          fullName,
          country,
          invitationCode,
          siloSecureCode,
        } = values
        const data = {
          email,
          password,
          fullName,
          country,
          belongsToBrand: getBrandedHostnamePrefix(),
          siloSecureCode,
        }
        if (invitationCode) data.invitationCode = invitationCode
        registerRequest(data)
      }
    })
  }

  handleSubmitRegistration = () => {
    this.setState({ step: 2 })
  }

  handleSubmitOrganizationDetails = organizationDetails => {
    this.setState({ step: 3, organizationDetails })
  }

  handleSubmitSummary = () => {
    this.props.history.push(`/account/create-organization/success`)
  }

  previousStep = () => {
    this.setState({ step: Math.max(this.state.step - 1, 1) })
  }

  renderForm() {
    const { organizationDetails, step } = this.state
    switch (step) {
      case 1:
        return (
          <FlexView>
            <ActionCardTitle style={{ marginTop: 33 }}>
              <FormattedMessage id="app.createOrganization.setOwner" />
            </ActionCardTitle>
            <ConfirmEmail
              handleSubmit={this.handleSubmitRegistration}
              email={this.props.user && this.props.user.email}
            />
          </FlexView>
        )
      case 2:
        return (
          <FlexView>
            <ActionCardTitle style={{ marginTop: 33 }}>
              <FormattedMessage id="app.createOrganization.account" />
            </ActionCardTitle>
            <CreateOrganizationFrom
              handleSubmit={this.handleSubmitOrganizationDetails}
              handleBack={this.previousStep}
            />
          </FlexView>
        )
      case 3:
        return (
          <FlexView>
            <ActionCardTitle style={{ marginTop: 33 }}>
              <FormattedMessage id="app.createOrganization.summary" />
            </ActionCardTitle>
            <Summary
              handleSubmit={this.handleSubmitSummary}
              handleBack={this.previousStep}
              organizationDetails={organizationDetails}
            />
          </FlexView>
        )
      default:
        return null
    }
  }

  render() {
    const { referrer, step } = this.state
    if (!this.props.user)
      return <Redirect to="/account/login?createOrganization=true" />
    return (
      <Fragment>
        <PageMetadata pageName="registerPage" />
        <StyledActionCardWrapper>
          <StyledActionCard>
            <ActionCardLeftHalf span={12} hideOnTablet={!referrer}>
              {referrer ? (
                <BrandedBlockWrap>
                  <BrandedBlockFingerprintTopImg src={registerFingerprintTop} />
                  <BrandedBlock>
                    <BrandedBlockPhotoWrap>
                      <BrandedBlockLeaves src={registerBrandedPhotoLeaves} />
                      <BrandedBlockPhotoBlock>
                        <BrandedBlockPhotoBg>
                          <Link to={`/account/${referrer._id}`}>
                            {referrer.photo ? (
                              <BrandedBlockPhoto src={referrer.photo} />
                            ) : (
                              <BrandedBlockReferrerName>
                                {referrer.fullName.slice(0, 1).toUpperCase()}
                              </BrandedBlockReferrerName>
                            )}
                          </Link>
                        </BrandedBlockPhotoBg>
                      </BrandedBlockPhotoBlock>
                    </BrandedBlockPhotoWrap>
                    <BrandedBlockHeading>
                      <FormattedMessage id="app.registerPage.brandedBlock.heading" />
                    </BrandedBlockHeading>
                    <BrandedBlockDescription>
                      <FormattedMessage
                        id="app.registerPage.brandedBlock.description"
                        values={{
                          referrerFullName: (
                            <Link to={`/account/${referrer._id}`}>
                              {referrer.fullName}
                            </Link>
                          ),
                        }}
                      />
                    </BrandedBlockDescription>
                  </BrandedBlock>
                  <BrandedBlockFingerprintBotImg src={registerFingerprintBot} />
                </BrandedBlockWrap>
              ) : (
                <Fragment>
                  <DogImgTablet src={registerActionCardImageTablet} />
                  <DogImgDesktop src={registerActionCardImage} />
                </Fragment>
              )}
            </ActionCardLeftHalf>
            <ActionCardRightHalf span={12}>
              <FormWrap>{this.renderForm()}</FormWrap>
              <OrganizationCreationSteps steps={3} active={step} />
            </ActionCardRightHalf>
          </StyledActionCard>
        </StyledActionCardWrapper>
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  isRegistering: state.account.isRegistering,
  registerError: state.account.registerError,
  countries: state.app.countries,
  user: state.user.data,
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      registerRequest: data => AccountCreators.registerRequest(data),
    },
    dispatch,
  )

CreateOrganizationPage.propTypes = {
  countries: PropTypes.array.isRequired,
  form: PropTypes.shape({
    setFields: PropTypes.func.isRequired,
    getFieldsValue: PropTypes.func.isRequired,
    setFieldsValue: PropTypes.func.isRequired,
  }),
  intl: PropTypes.object.isRequired,
  match: PropTypes.shape({
    params: PropTypes.object.isRequired,
  }),
  isRegistering: PropTypes.bool.isRequired,
  registerError: PropTypes.string,
  registerRequest: PropTypes.func.isRequired,
  overrides: PropTypes.object.isRequired,
  history: PropTypes.object,
  user: PropTypes.object,
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  Form.create(),
  injectIntl,
)(CreateOrganizationPage)
