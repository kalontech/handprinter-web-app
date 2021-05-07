import React, { Component, Fragment } from 'react'
import { bindActionCreators, compose } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Button, Form, Select } from 'antd'
import { Link } from 'react-router-dom'
import { injectIntl, FormattedMessage } from 'react-intl'
import styled from 'styled-components'
import { animateScroll } from 'react-scroll/modules'
import queryString from 'query-string'

import InfoElement, { INFO_ELEMENT_TYPES } from 'components/InfoElement'
import SearchableInput from 'components/SearchInfluencerInput'
import registerFingerprintTop from 'assets/images/registerFingerprintTop.png'
import registerFingerprintBot from 'assets/images/registerFingerprintBot.png'
import registerActionCardImage from 'assets/images/registerActionCard.jpg'
import registerActionCardImageTablet from 'assets/images/registerActionCardImageTablet.png'
import registerBrandedPhotoLeaves from 'assets/images/registerBrandedPhotoLeaves.png'
import arrowDownIcon from 'assets/icons/arrowDown.svg'

import { Creators as AccountCreators } from 'redux/accountStore'
import getValidationRules from 'config/validationRules'
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
  ActionCardRegisterBlock,
  Input,
  FormItem,
  Checkbox,
} from 'components/Styled'
import PageMetadata from 'components/PageMetadata'
import OrganizationCreationSteps from 'components/OrganizationCreationSteps'
import InputForPassword from 'components/InputForPassword'
import * as apiUser from 'api/user'
import * as apiOrganization from 'api/organization'

import { getBrandedConfig } from '../../config/branded'

const brandedConfig = getBrandedConfig()

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
  width: 300px;
  ${media.tablet`
    margin-top: 30px;
  `}
  ${media.phone`
    margin-top: 0;
  `}
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

const PrivacyLink = styled(Link)`
  color: ${colors.dark};
`

class RegisterPage extends Component {
  state = {
    referrer: null,
    getReferrerError: null,
    createOrganizationFlow: undefined,
    matchedUsersByCode: undefined,
  }

  componentDidMount() {
    const {
      match: {
        params: { invitationCode },
      },
      location: { search },
    } = this.props
    if (queryString.parse(search).createOrganization) {
      this.setState({ createOrganizationFlow: true })
    }
    animateScroll.scrollToTop()

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
    const createOrganizationFlow = this.state.createOrganizationFlow

    validateFields((err, values) => {
      let belongsToBrand, belongsToOrganization
      if (values.email.endsWith('@humanscale.com')) {
        belongsToBrand = 'humanscale'
      }
      if (!err) {
        delete values.formError
        let {
          email,
          password,
          fullName,
          country,
          invitationCode,
          organizationInviteCode,
        } = values
        if (brandedConfig && brandedConfig.brandName === 'humanscale') {
          invitationCode = 'humanscale'
        }
        if (values.email.endsWith('@stantec.com')) {
          organizationInviteCode = 'stantec'
        }
        const data = {
          email,
          password,
          fullName,
          country,
          belongsToBrand,
          belongsToOrganization,
          organizationInviteCode,
          createOrganizationFlow,
        }
        if (invitationCode) data.invitationCode = invitationCode
        registerRequest(data)
      }
    })
  }

  handleCodeSearch = async (query, searchByOrganization) => {
    try {
      const response = searchByOrganization
        ? await apiOrganization.search(query)
        : await apiUser.search(query)
      this.setState({
        matchedUsersByCode: searchByOrganization
          ? response.organizations
          : response.users,
      })
    } catch (error) {
      console.error(error)
    }
  }

  handleCodeSelect = code => {
    const {
      form: { setFieldsValue },
    } = this.props
    setFieldsValue({ invitationCode: code })
  }

  render() {
    const {
      countries,
      form: { getFieldDecorator },
      intl: { formatMessage },
      isRegistering,
    } = this.props
    const { referrer, createOrganizationFlow, matchedUsersByCode } = this.state

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
              {createOrganizationFlow && (
                <OrganizationCreationSteps steps={3} active={1} />
              )}
              <FormWrap>
                <ActionCardTitle>
                  <FormattedMessage id={'app.registerPage.title'} />
                </ActionCardTitle>
                <Form onSubmit={this.handleSubmit} className="login-form">
                  <FormItem>
                    {getFieldDecorator('fullName', {
                      rules: getValidationRules(formatMessage).fullName,
                    })(
                      <Input
                        type="text"
                        placeholder={formatMessage({
                          id: 'app.forms.fullName',
                        })}
                      />,
                    )}
                  </FormItem>
                  <FormItem>
                    {getFieldDecorator('email', {
                      rules: getValidationRules(formatMessage).email,
                      validateTrigger: 'onBlur',
                    })(
                      <Input
                        type="email"
                        placeholder={formatMessage({
                          id: 'app.forms.email',
                        })}
                      />,
                    )}
                  </FormItem>
                  <FormItem>
                    {getFieldDecorator('password', {
                      rules: getValidationRules(formatMessage).password,
                      validateTrigger: 'onBlur',
                    })(<InputForPassword createPass />)}
                  </FormItem>
                  <FormItem style={{ marginTop: '-3px' }}>
                    {getFieldDecorator('country', {
                      rules: getValidationRules(formatMessage).country,
                    })(
                      <Select
                        showSearch
                        placeholder={formatMessage({
                          id: 'app.forms.country',
                        })}
                        optionFilterProp="children"
                        className="ant-select__override-for__register-page"
                        dropdownClassName="ant-select__override-for__register-page"
                        suffixIcon={<img src={arrowDownIcon} />}
                      >
                        {countries.map(country => (
                          <Select.Option key={country._id} value={country._id}>
                            {country.name}
                          </Select.Option>
                        ))}
                      </Select>,
                    )}
                  </FormItem>
                  <FormItem>
                    {getFieldDecorator('invitationCode')(
                      <SearchableInput
                        onSearch={this.handleCodeSearch}
                        suggestions={matchedUsersByCode}
                        onSelect={this.handleCodeSelect}
                      />,
                    )}
                  </FormItem>
                  <FormItem>
                    {getFieldDecorator('organizationInviteCode')(
                      <Input
                        type="text"
                        placeholder={formatMessage({
                          id: 'app.forms.organizationCode',
                        })}
                        suffix={
                          <InfoElement
                            type={INFO_ELEMENT_TYPES.INFO}
                            tooltipProps={{
                              title: formatMessage({
                                id: 'app.forms.organizationCodeHint',
                              }),
                            }}
                          />
                        }
                      />,
                    )}
                  </FormItem>
                  <FormItem>
                    {getFieldDecorator('privacyPolicy', {
                      valuePropName: 'checked',
                      rules: [
                        {
                          required: true,
                          transform: value => value || undefined,
                          type: 'boolean',
                          message: formatMessage({
                            id: 'app.registerPage.policyAcceptedError',
                          }),
                        },
                      ],
                    })(
                      <Checkbox>
                        <FormattedMessage id="app.registerPage.privacyPolicyAccept.1" />{' '}
                        <PrivacyLink to="/pages/privacy-policy" target="_blank">
                          <FormattedMessage id="app.registerPage.privacyPolicyAccept.2" />
                        </PrivacyLink>
                        .
                      </Checkbox>,
                    )}
                  </FormItem>
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{ width: '100%' }}
                    loading={isRegistering}
                  >
                    <FormattedMessage id={'app.registerPage.register'} />
                  </Button>
                  <FormItem>
                    {getFieldDecorator('formError')(<Input type="hidden" />)}
                  </FormItem>
                  <ActionCardRegisterBlock>
                    <span>
                      <FormattedMessage id="app.registerPage.alreadyHaveAnAccount" />{' '}
                      <Link to="/account/login">
                        <FormattedMessage id={'app.registerPage.login'} />
                      </Link>
                    </span>
                  </ActionCardRegisterBlock>
                </Form>
              </FormWrap>
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
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      registerRequest: data => AccountCreators.registerRequest(data),
    },
    dispatch,
  )

RegisterPage.propTypes = {
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
  location: PropTypes.shape({
    search: PropTypes.string,
  }),
  isRegistering: PropTypes.bool.isRequired,
  registerError: PropTypes.string,
  registerRequest: PropTypes.func.isRequired,
}

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  Form.create(),
  injectIntl,
)(RegisterPage)
