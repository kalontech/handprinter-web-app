import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Form, Tag, Tooltip, Icon } from 'antd'
import { injectIntl, FormattedMessage } from 'react-intl'

import decodeError from './../../utils/decodeError'
import colors from './../../config/colors'
import {
  MAX_SHARE_EMAILS_LENGTH,
  MAX_VISIBLE_EMAIL_LENGTH,
} from '../../config/common'
import { FormItem, Input, DefaultButton } from './../../components/Styled'
import getValidationRules from './../../config/validationRules'
import hexToRgba from '../../utils/hexToRgba'
import savePlanetImg from '../../assets/increase-handprint/save_planet.png'
import { getInvitationLink } from '../../utils/helpers'
import api from './../../api'

export const Wrapper = styled.div`
  display: flex;
  min-height: 660px;
`

export const TitleSectionWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 50%;
  text-align: center;
  background-color: ${colors.lightGray};
`

export const FormSectionWrap = styled.div`
  background-color: ${colors.ocean};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 50%;
`

export const FormWrap = styled.div`
  background-color: ${colors.white};
  border-radius: 5px;
  min-width: 580px;
  min-height: 500px;
`

export const FormSectionHeading = styled.div`
  font-size: 16px;
  color: ${colors.darkGray};
  margin-bottom: 10px;
`

export const TitleSectionDescription = styled.p`
  max-width: 463px;
  font-size: 16px;
  font-family: 'Noto Sans', serif;
`

export const TitleSectionHeading = styled.h1`
  font-size: 28px;
  position: relative;
  top: -5px;
`

export const SavePlanetImg = styled.img`
  height: 180px;
  position: relative;
  top: -31px;
`

export const FormSectionContent = styled.div`
  padding: 30px;
`

export const ShareBlock = styled.div`
  display: flex;
  .ant-input {
    &::selection {
      background: ${colors.ocean};
    }
  }
`

export const InvitationCodeBlockWrap = styled.div`
  background-color: ${colors.lightGray};
  padding: 25px;
  height: 180px;
  text-align: center;
`

export const InvitationCodeBlock = styled.div`
  display: inline-block;
  font-size: 38px;
  border: dotted 1px ${colors.green};
  border-radius: 5px;
  margin-top: 8px;
  width: 400px;
  padding: 10px 0;
`

export const CopyToClipboardButton = styled(DefaultButton)`
  min-width: 132px;
  height: 47px;
  margin-left: 7px;
`

export const SendInvitesButton = styled(DefaultButton)`
  min-width: 132px;
  background-color: ${hexToRgba(colors.green, 0.1)};
  color: ${colors.green};
  height: 47px;
  display: inline-block;
  margin-left: 7px;
`

export const ShareSendBlockDivideLine = styled.hr`
  height: 1px;
  width: 100%;
  background: ${colors.gray}
  border: none;
`

export const ShareSendBlockDivideLineWrap = styled.div`
  display: flex;
  align-items: center;
  padding: 16px 0;
`

export const ShareSendBlockDivideLineText = styled.span`
  text-transform: uppercase;
  margin: 10px;
  color: ${colors.darkGray};
`

export const InvitationEmailsWrap = styled.div`
  padding: 5px;
  border-radius: 5px;
  border: 1px solid ${colors.gray};
  width: 100%;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  max-width: 390px;
  .ant-tag {
    margin: 5px;
  }
  .ant-input {
    height: 34px;
  }
`

export const SendInvitationForm = styled(Form)`
  display: flex;
  justify-content: center;
`

export const AddEmailButton = styled(Tag)`
  background: ${colors.white};
  borderstyle: dashed;
`

export const AddEmailInput = styled(Input)`
  height: 30px;
  border: none;
`

export const AddEmailWrap = styled.div`
  width: 100%;
  display: flex;
  .ant-input {
    height: 30px;
    border: none;
    border-bottom: 1px solid ${colors.gray};
    border-radius: 0;
    margin-right: 10px;
    width: 100%;
    &:focus {
      box-shadow: none;
    }
  }
  .ant-input:focus {
    border-color: none;
  }
`

class IncreaseHandprintPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      emails: [],
      invitationLink: getInvitationLink(this.props.user.invitationCode),
      isSharingInvitationCode: false,
      shareInvitationCodeError: null,
      inputVisible: false,
      addEmailInputValue: '',
    }

    this.saveInviteRef = ref => (this.saveInviteRef = ref)
    this.shareInviteRef = React.createRef()
  }

  componentDidUpdate = (prevProps, prevState) => {
    const {
      form: { setFields },
      intl: { formatMessage },
    } = this.props
    const { shareInvitationCodeError, isSharingInvitationCode } = this.state

    if (prevState.shareInvitationCodeError !== shareInvitationCodeError) {
      setFields({
        errorNewInviteValue: {
          errors: shareInvitationCodeError
            ? [new Error(formatMessage({ id: shareInvitationCodeError }))]
            : [],
        },
      })
    }

    // Reset emails array after successfull response
    if (
      prevState.isSharingInvitationCode !== isSharingInvitationCode &&
      !isSharingInvitationCode &&
      shareInvitationCodeError === null
    ) {
      this.setState({ emails: [] })
    }
  }

  handleSendInvites = async e => {
    e.preventDefault()
    const { emails, invitationLink } = this.state
    const {
      form: { setFields },
      intl: { formatMessage },
    } = this.props

    if (emails.length === 0) {
      setFields({
        errorNewInviteValue: {
          errors: [
            new Error(
              formatMessage({ id: 'app.increaseHandprintPage.emptyError' }),
            ),
          ],
        },
      })
    } else {
      this.setState({ shareInvitationCodeError: null })
      this.fetchShareInvitationCode(emails, invitationLink)
    }
  }

  fetchShareInvitationCode = async (emails, invitationLink) => {
    const { token } = this.props

    this.setState({ isSharingInvitationCode: true })
    try {
      await api.shareInvitationCode(
        { emails: emails, invitationCodeUrl: invitationLink },
        token,
      )
      this.setState({ isSharingInvitationCode: false })
    } catch (error) {
      this.setState({
        isSharingInvitationCode: false,
        shareInvitationCodeError: decodeError(error),
      })
    }
  }

  copyToClipboard = e => {
    this.shareInviteRef.current.select()
    document.execCommand('copy')
  }

  handleRemoveInvite = removedEmail => {
    this.setState({
      emails: this.state.emails.filter(email => email !== removedEmail),
    })
  }

  showAddEmailInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus())
  }

  handleAddEmailInputChange = e => {
    this.props.form.setFieldsValue({ addEmailInputValue: e.target.value })
  }

  handleAddEmailInputConfirm = e => {
    e.preventDefault()
    const {
      form: { setFields, validateFields, resetFields },
    } = this.props
    const { emails } = this.state

    validateFields((err, { addEmailInputValue }) => {
      if (!err) {
        let invitesModifed = emails
        // add new email if it's unique value of emails array
        if (addEmailInputValue && emails.indexOf(addEmailInputValue) === -1) {
          invitesModifed = [...emails, addEmailInputValue]
        }
        this.setState({
          emails: invitesModifed,
          inputVisible: false,
        })
        setFields({ errorNewInviteValue: [] })
        resetFields(['addEmailInputValue'])
      } else {
        setFields({ errorNewInviteValue: err.addEmailInputValue })
      }
    })
  }

  addEmailInputRef = input => (this.input = input)

  renderTitleSection = () => (
    <TitleSectionWrap>
      <SavePlanetImg src={savePlanetImg} />
      <TitleSectionHeading>
        <FormattedMessage id="app.increaseHandprintPage.title" />
      </TitleSectionHeading>
      <TitleSectionDescription>
        <FormattedMessage id="app.increaseHandprintPage.description" />
      </TitleSectionDescription>
    </TitleSectionWrap>
  )

  renderInviteTag = email => {
    const isLongTag = email.length > MAX_VISIBLE_EMAIL_LENGTH
    const tagElem = (
      <Tag
        key={email}
        closable={true}
        afterClose={() => this.handleRemoveInvite(email)}
      >
        {isLongTag ? `${email.slice(0, 20)}...` : email}
      </Tag>
    )
    return isLongTag ? (
      <Tooltip title={email} key={email}>
        {tagElem}
      </Tooltip>
    ) : (
      tagElem
    )
  }

  renderFormSection = (
    {
      emails,
      invitationLink,
      isSharingInvitationCode,
      inputVisible,
      addEmailInputValue,
    },
    { user, form: { getFieldDecorator }, intl: { formatMessage } },
  ) => (
    <FormSectionWrap>
      <FormWrap>
        <InvitationCodeBlockWrap>
          <FormSectionHeading>
            <FormattedMessage id="app.increaseHandprintPage.form.yourPersonalPromocode" />
          </FormSectionHeading>
          <InvitationCodeBlock>{user.invitationCode}</InvitationCodeBlock>
        </InvitationCodeBlockWrap>
        <FormSectionContent>
          <div>
            <FormSectionHeading>
              <FormattedMessage id="app.increaseHandprintPage.form.shareYourLinkWithCode" />
            </FormSectionHeading>
            <ShareBlock>
              <Input
                ref={this.shareInviteRef}
                value={invitationLink}
                readOnly
              />
              <CopyToClipboardButton onClick={this.copyToClipboard}>
                <FormattedMessage id="app.increaseHandprintPage.form.copyButton" />
              </CopyToClipboardButton>
            </ShareBlock>
          </div>
          <ShareSendBlockDivideLineWrap>
            <ShareSendBlockDivideLine />
            <ShareSendBlockDivideLineText>
              <FormattedMessage id="app.increaseHandprintPage.form.or" />
            </ShareSendBlockDivideLineText>
            <ShareSendBlockDivideLine />
          </ShareSendBlockDivideLineWrap>
          <div>
            <FormSectionHeading>
              <FormattedMessage id="app.increaseHandprintPage.form.sendInvitationByEmail" />
            </FormSectionHeading>
            <SendInvitationForm onSubmit={this.handleSendInvites}>
              <InvitationEmailsWrap>
                {!inputVisible && emails.map(this.renderInviteTag)}
                {inputVisible && (
                  <AddEmailWrap>
                    {getFieldDecorator('addEmailInputValue', {
                      rules: getValidationRules(formatMessage).email,
                    })(
                      <AddEmailInput
                        ref={this.addEmailInputRef}
                        type="text"
                        size="small"
                        onChange={this.handleAddEmailInputChange}
                        onBlur={this.handleAddEmailInputConfirm}
                        onPressEnter={this.handleAddEmailInputConfirm}
                      />,
                    )}
                    <AddEmailButton onClick={this.handleAddEmailInputConfirm}>
                      <Icon type="plus" />{' '}
                      <FormattedMessage id="app.increaseHandprintPage.form.add" />
                    </AddEmailButton>
                  </AddEmailWrap>
                )}
                {!inputVisible && emails.length !== MAX_SHARE_EMAILS_LENGTH && (
                  <AddEmailButton onClick={this.showAddEmailInput}>
                    <Icon type="plus" />{' '}
                    <FormattedMessage id="app.increaseHandprintPage.form.addEmail" />
                  </AddEmailButton>
                )}
              </InvitationEmailsWrap>
              <SendInvitesButton
                htmlType="submit"
                loading={isSharingInvitationCode}
                disabled={emails.length === 0}
              >
                <FormattedMessage id="app.increaseHandprintPage.form.sendInvites" />
              </SendInvitesButton>
            </SendInvitationForm>
            <FormItem>
              {getFieldDecorator('errorNewInviteValue')(
                <Input type="hidden" />,
              )}
            </FormItem>
          </div>
        </FormSectionContent>
      </FormWrap>
    </FormSectionWrap>
  )

  render() {
    return (
      <Wrapper>
        {this.renderTitleSection()}
        {this.renderFormSection(this.state, this.props)}
      </Wrapper>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user.data,
  token: state.account.token,
})

IncreaseHandprintPage.propTypes = {
  form: PropTypes.object.isRequired,
  intl: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  token: PropTypes.string.isRequired,
}

export default connect(mapStateToProps)(
  Form.create()(injectIntl(IncreaseHandprintPage)),
)
