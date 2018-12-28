import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Button, Form, Select, Tooltip } from 'antd'
import { Link } from 'react-router-dom'
import { injectIntl, FormattedMessage } from 'react-intl'
import styled from 'styled-components'

import { Creators as AccountCreators } from './../../redux/accountStore'
import {
  ActionCard,
  ActionCardLeftHalf,
  ActionCardRightHalf,
  ActionCardWrapper,
  ActionCardTitle,
  ActionCardRegisterBlock,
  Input,
  FormItem,
} from './../../components/Styled'
import getValidationRules from './../../config/validationRules'
import InputForPassword from './../../components/InputForPassword'
import handleFormError from './../../utils/handleFormError'
import decodeError from './../../utils/decodeError'
import { getBrandedHostnamePrefix } from './../../config/branded'

import api from './../../api'

import registerFingerprintTop from './../../assets/images/registerFingerprintTop.png'
import registerFingerprintBot from './../../assets/images/registerFingerprintBot.png'
import registerActionCardImage from './../../assets/images/registerActionCard.jpg'
import registerBrandedPhotoLeaves from './../../assets/images/registerBrandedPhotoLeaves.png'
import arrowDownIcon from './../../assets/icons/arrowDown.svg'
import infoFillIcon from './../../assets/icons/infoFill.svg'
import infoOutlineIcon from './../../assets/icons/infoOutline.svg'
import colors from '../../config/colors'

export const BrandedBlockWrap = styled.div`
  position: relative;
  height: 100%;
  color: ${colors.white};
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
`

export const BrandedBlockPhotoWrap = styled.div`
  height: 133px;
  width: 133px;
  border-radius: 50%;
  overflow: hidden;
  margin-bottom: 28px;
`

export const BrandedBlockPhoto = styled.img`
  position: relative;
  width: 100%;
`

export const BrandedBlockPhotoBg = styled.div`
  background-color: white;
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
  top: 90px;
  right: 149px;
`

export const BrandedBlockHeading = styled.h2`
  color: ${colors.white};
  font-size: 28px;
  margin: 0 0 20px 0;
  line-height: 37px;
  max-width: 300px;
`

export const BrandedBlockDescription = styled.p`
  font-size: 16px;
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
  right: 0px;
  height: 80px;
  width: auto;
`

class RegisterPage extends Component {
  state = {
    showInvitationCodeTooltip: false,
    referrer: null,
    getReferrerError: null,
  }

  componentDidMount() {
    const {
      match: {
        params: { invitationCode },
      },
    } = this.props

    if (invitationCode) this.fetchReferrer(invitationCode)
  }

  componentDidUpdate = (prevProps, prevState) => {
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

  toggleInvitationCodeTooltip = showInvitationCodeTooltip => {
    this.setState({ showInvitationCodeTooltip })
  }

  render() {
    const {
      countries,
      form: { getFieldDecorator },
      intl: { formatMessage },
      isRegistering,
    } = this.props
    const { showInvitationCodeTooltip, referrer } = this.state

    return (
      <ActionCardWrapper>
        <ActionCard>
          <ActionCardLeftHalf span={12}>
            {referrer ? (
              <BrandedBlockWrap>
                <BrandedBlockFingerprintTopImg src={registerFingerprintTop} />
                <BrandedBlock>
                  <BrandedBlockPhotoWrap>
                    <BrandedBlockLeaves src={registerBrandedPhotoLeaves} />
                    <BrandedBlockPhotoBg>
                      {referrer.photo ? (
                        <BrandedBlockPhoto src={referrer.photo} />
                      ) : (
                        <BrandedBlockReferrerName>
                          {referrer.fullName.slice(0, 1).toUpperCase()}
                        </BrandedBlockReferrerName>
                      )}
                    </BrandedBlockPhotoBg>
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
              <img src={registerActionCardImage} />
            )}
          </ActionCardLeftHalf>
          <ActionCardRightHalf span={12}>
            <div style={{ width: '300px' }}>
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
                        <Tooltip
                          onVisibleChange={this.toggleInvitationCodeTooltip}
                          placement="top"
                          title={formatMessage({
                            id: 'app.forms.invitationCode.hint',
                          })}
                        >
                          <img
                            src={
                              showInvitationCodeTooltip
                                ? infoFillIcon
                                : infoOutlineIcon
                            }
                            style={{ cursor: 'pointer' }}
                          />
                        </Tooltip>
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
            </div>
          </ActionCardRightHalf>
        </ActionCard>
      </ActionCardWrapper>
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
