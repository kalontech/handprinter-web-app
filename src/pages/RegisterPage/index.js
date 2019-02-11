import React, { Component, Fragment } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Button, Form, Select } from 'antd'
import { Link } from 'react-router-dom'
import { injectIntl, FormattedMessage } from 'react-intl'
import styled from 'styled-components'
import { animateScroll } from 'react-scroll/modules'

import registerFingerprintTop from 'assets/images/registerFingerprintTop.png'
import registerFingerprintBot from 'assets/images/registerFingerprintBot.png'
import registerActionCardImage from 'assets/images/registerActionCard.jpg'
import registerActionCardImageTablet from 'assets/images/registerActionCardImageTablet.png'
import registerBrandedPhotoLeaves from 'assets/images/registerBrandedPhotoLeaves.png'
import arrowDownIcon from 'assets/icons/arrowDown.svg'

import { Creators as AccountCreators } from 'redux/accountStore'
import {
  ActionCard,
  ActionCardLeftHalf,
  ActionCardRightHalf,
  ActionCardWrapper,
  ActionCardTitle,
  ActionCardRegisterBlock,
  Input,
  FormItem,
} from 'components/Styled'
import getValidationRules from 'config/validationRules'
import InputForPassword from 'components/InputForPassword'
import handleFormError from 'utils/handleFormError'
import decodeError from 'utils/decodeError'
import { getBrandedHostnamePrefix } from 'config/branded'
import api from 'api'
import colors from 'config/colors'
import PageMetadata from 'components/PageMetadata'
import media from 'utils/mediaQueryTemplate'
import InfoElement, { INFO_ELEMENT_TYPES } from 'components/InfoElement'

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

class RegisterPage extends Component {
  state = {
    referrer: null,
    getReferrerError: null,
  }

  componentDidMount() {
    const {
      match: {
        params: { invitationCode },
      },
    } = this.props

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
      const { user } = await api.getUser({ invitationCode })
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
        const { email, password, fullName, country, invitationCode } = values
        const data = {
          email,
          password,
          fullName,
          country,
          belongsToBrand: getBrandedHostnamePrefix(),
        }
        if (invitationCode) data.invitationCode = invitationCode
        registerRequest(data)
      }
    })
  }

  render() {
    const {
      countries,
      form: { getFieldDecorator },
      intl: { formatMessage },
      isRegistering,
    } = this.props
    const { referrer } = this.state

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
                          {referrer.photo ? (
                            <BrandedBlockPhoto src={referrer.photo} />
                          ) : (
                            <BrandedBlockReferrerName>
                              {referrer.fullName.slice(0, 1).toUpperCase()}
                            </BrandedBlockReferrerName>
                          )}
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
                          referrerFullName: referrer.fullName,
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
              <FormWrap>
                <ActionCardTitle>
                  <FormattedMessage id="app.registerPage.title" />
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
                    })(<InputForPassword />)}
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
                      <Input
                        type="text"
                        placeholder={formatMessage({
                          id: 'app.forms.invitationCode',
                        })}
                        suffix={
                          <InfoElement
                            type={INFO_ELEMENT_TYPES.INFO}
                            tooltipProps={{
                              title: formatMessage({
                                id: 'app.forms.invitationCode.hint',
                              }),
                            }}
                          />
                        }
                      />,
                    )}
                  </FormItem>
                  <Button
                    type="primary"
                    htmlType="submit"
                    style={{ width: '100%' }}
                    loading={isRegistering}
                  >
                    <FormattedMessage id="app.registerPage.register" />
                  </Button>
                  <FormItem>
                    {getFieldDecorator('formError')(<Input type="hidden" />)}
                  </FormItem>
                  <ActionCardRegisterBlock>
                    <span>
                      <FormattedMessage id="app.registerPage.alreadyHaveAnAccount" />{' '}
                      <Link to="/account/login">
                        <FormattedMessage id="app.registerPage.login" />
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
  }),
  intl: PropTypes.object.isRequired,
  match: PropTypes.shape({
    params: PropTypes.object.isRequired,
  }),
  isRegistering: PropTypes.bool.isRequired,
  registerError: PropTypes.string,
  registerRequest: PropTypes.func.isRequired,
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Form.create()(injectIntl(RegisterPage)))
