import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Form, Tag, Icon } from 'antd'
import { injectIntl, FormattedMessage } from 'react-intl'
import { bindActionCreators } from 'redux'

import colors from 'config/colors'
import { MAX_INVITING_MESSAGE_LENGTH } from 'config/common'
import { Creators as UserCreators } from './../../redux/userStore'
import { Input, DefaultButton, FormItem } from 'components/Styled'
import hexToRgba from 'utils/hexToRgba'
import savePlanetImg from 'assets/increase-handprint/save_planet.png'
import { getInvitationLink } from 'utils/helpers'
import api from 'api'
import media from 'utils/mediaQueryTemplate'
import PageMetadata from 'components/PageMetadata'
import MultipleInput from 'components/MultipleInput'
import getValidationRules from 'config/validationRules'

export const Wrapper = styled.div`
  display: flex;
  min-height: 660px;
  flex-grow: 1;
  ${media.desktop`
    flex-direction: column;
  `}
`

export const TitleSectionWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 50%;
  text-align: center;
  padding: 30px;
  background-color: ${colors.lightGray};
  ${media.desktop`
    height: 524px;
    width: 100%;
  `}
  ${media.phone`
    padding: 30px 10px;
  `}
`

const TitleSectionContent = styled.div`
  position: relative;
  top: 0px;
`

export const FormSectionWrap = styled.div`
  background-color: ${colors.ocean};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 50%;
  ${media.desktop`
    padding: 60px 25px;
    width: 100%;
  `}
  ${media.phone`
    padding: 60px 15px;
  `}
`

export const FormWrap = styled.div`
  background-color: ${colors.white};
  border-radius: 5px;
  max-width: 580px;
  width: 100%;
  ${media.largeDesktop`
    width: 420px;
  `}
  ${media.desktop`
    width: 100%;
  `}
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
  ${media.desktop`
    top: 5px;
    position: relative;
  `}
  ${media.phone`
    font-size: 14px;
    line-height: 24px;
  `}
`

export const TitleSectionHeading = styled.h1`
  font-size: 28px;
  position: relative;
  top: -5px;
  ${media.desktop`
    top: auto;
  `}
  ${media.phone`
    margin-bottom: 0;
    line-height: 37px;
    top: -13px;
    left: -4px;
  `}
`

export const SavePlanetImg = styled.img`
  height: 180px;
  position: relative;
  top: -31px;
  ${media.phone`
    height: 140px;
    width: 230px;
    top: -41px;
  `}
`

export const FormSectionContent = styled.div`
  padding: 30px;
  ${media.phone`
    padding: 30px 10px;
  `}
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
  text-align: center;
  ${media.phone`
    padding: 25px 10px;
  `}
  flex-direction: column;
  display: flex;
  align-items: center;
`

export const CustomizeButton = styled.span`
  font-style: normal;
  font-weight: bold;
  line-height: 20px;
  font-size: 14px;
  text-align: center;
  color: ${colors.ocean};
  margin-top: 8px;
  cursor: pointer;
`

export const InvitationCodeBlock = styled.div`
  display: inline-block;
  font-size: 38px;
  border: dotted 1px ${colors.green};
  border-radius: 5px;
  width: 400px;
  padding: 10px 0;
  ${media.largeDesktop`
    padding: 10px 40px;
    width: 350px;
  `}
  ${media.tablet`
    padding: 10px 30px;
    width: 260px;
  `}
  ${media.phone`
    padding: 10px 15px;
  `}
`

export const CopyToClipboardInput = styled(Input)`
  ${media.phone`
    border-top-right-radius: 0px;
    border-bottom-right-radius: 0px;
    border-right: none;
  `}
`

export const CopyToClipboardButton = styled(DefaultButton)`
  min-width: 142px;
  height: 46px;
  margin-left: 7px;
  font-weight: bold;
  ${media.phone`
    margin-left: 0;
    border-top-left-radius: 0px;
    border-bottom-left-radius: 0px;
  `}
`

export const SendInvitesButton = styled(DefaultButton)`
  background-color: ${hexToRgba(colors.green, 0.1)};
  color: ${colors.green};
  height: 47px;
  display: inline-block;
  font-weight: bold;
  width: 100%;
`

const SaveButton = styled(SendInvitesButton)`
  background-color: ${colors.green};
  color: ${colors.white};
  margin: 10px 0px 0px 4.5px;
`

const CancelButton = styled(CopyToClipboardButton)`
  width: 100%;
  height: 47px;
  margin: 10px 4.5px 0px 0px;
`

const CustomizeButtonWrapper = styled.div`
  flex-direction: 'column';
  display: flex;
  margin-left: 50px;
`

const CodePrefix = styled.span`
  font-style: normal;
  font-weight: normal;
  line-height: 35px;
  font-size: 28px;
  margin-right: 20px;
  text-align: center;
`

const CustomizeForm = styled.div`
  width: 100%;
`

const Row = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
`

export const AddInvitingMessageButton = styled.button`
  color: ${colors.ocean};
  background-color: transparent;
  border: none;
  font-weight: bold;
  outline: none;
  cursor: pointer;
  font-size: 14px;
  margin-bottom: 12px;
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
  align-items: flex-start;
  flex-direction: column;
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
    border-color: transparent;
  }
`

const InvitationInput = styled(Input)`
  height: 47px;
  margin-right: 5px;
  color: ${colors.darkGray};
`

const AddInvitingMessageTextAreaWrap = styled(FormItem)`
  width: 100%;
  position: relative;
  .ant-input {
    min-height: 85px;
  }
`

const AddInvitingMessageTextArea = styled(Input.TextArea)`
  resize: none;
`

const AddInvitingMessageTextAreaCount = styled.span`
  font-size: 12px;
  color: ${colors.darkGray};
  position: absolute;
  z-index: 1;
  top: -5px;
  right: 5px;
`

const IgnoredInvitations = styled.p`
  width: 100%;
  padding-top: 16px;
  white-space: pre-line;

  ${media.phone`
    padding-top: 12px;
  `}
`
const InputCode = styled(FormItem)`
  width: 100%;
`

const CODE_PREFIX = 'hp'
class IncreaseHandprintPage extends Component {
  state = {
    emails: [],
    invitationLink: getInvitationLink(this.props.user.invitationCode),
    isSharingInvitationCode: false,
    shareInvitationCodeError: null,
    inputVisible: false,
    addEmailInputValue: '',
    isTyping: false,
    showSuccessIndicator: false,
    showInvitingMessageInput: false,
    ignoredEmails: [],
    isCodeCustomizing: false,
    invitationCode: '',
  }

  shareInviteRef = React.createRef()

  componentDidUpdate = async (prevProps, prevState) => {
    const { shareInvitationCodeError, isSharingInvitationCode } = this.state

    // Reset emails array after successfull response
    if (
      prevState.isSharingInvitationCode !== isSharingInvitationCode &&
      !isSharingInvitationCode &&
      shareInvitationCodeError === null
    ) {
      this.setState({ emails: [], showSuccessIndicator: true })
      await new Promise(resolve => setTimeout(resolve, 3000))
      this.setState({ showSuccessIndicator: false })
    }

    if (
      prevProps.isUpdatingMeInfo &&
      !this.props.isUpdatingMeInfo &&
      !this.props.updateMeInfoError
    )
      this.setState({
        isCodeCustomizing: false,
        invitationLink: getInvitationLink(this.props.user.invitationCode),
      })
  }

  handleSendInvites = async e => {
    e.preventDefault()
    const { emails, invitationLink } = this.state
    this.fetchShareInvitationCode(emails, invitationLink)
  }

  fetchShareInvitationCode = (emails, invitationLink) => {
    const {
      token,
      form: { validateFields },
    } = this.props
    validateFields(async (err, { invitationMessage }) => {
      if (!err) {
        this.setState({ isSharingInvitationCode: true })

        const data = {
          emails: emails,
          invitationCodeUrl: invitationLink,
        }

        if (invitationMessage && invitationMessage.length > 0) {
          data.message = invitationMessage
        }

        try {
          const { ignored = [] } =
            (await api.shareInvitationCode(data, token)) || {}

          this.setState({
            isSharingInvitationCode: false,
            showInvitingMessageInput: false,
            shareInvitationCodeError: null,
            ignoredEmails: ignored.map(item => item.email),
          })
        } catch (error) {
          this.setState({
            isSharingInvitationCode: false,
            shareInvitationCodeError: error,
            ignoredEmails: [],
          })
        }
      }
    })
  }

  copyToClipboard = () => {
    this.shareInviteRef.current.select()
    document.execCommand('copy')
  }

  handleMultipleInputChange = (emails, isTyping) => {
    this.setState({ emails, isTyping })
  }

  handleToggleInvitingMessage = () => {
    this.setState({
      showInvitingMessageInput: !this.state.showInvitingMessageInput,
    })
  }

  handleCustomize = () => {
    this.setState({ isCodeCustomizing: true })
  }

  handleCustomizeCancel = () => {
    this.setState({ isCodeCustomizing: false, invitationCode: '' })
    this.props.updateMeInfoFailure(null)
  }

  handleCustomizeSave = () => {
    const { invitationCode } = this.state
    const newCode = `${CODE_PREFIX}${invitationCode}`
    this.props.updateMeInfoRequest({
      invitationCode: newCode,
    })
  }

  handleCodeChange = event => {
    this.setState({ invitationCode: event.target.value })
  }

  render() {
    const {
      emails,
      invitationLink,
      isSharingInvitationCode,
      shareInvitationCodeError,
      isTyping,
      showSuccessIndicator,
      showInvitingMessageInput,
      ignoredEmails,
      isCodeCustomizing,
      invitationCode,
    } = this.state
    const {
      user,
      intl: { formatMessage },
      form: { getFieldDecorator, getFieldValue },
      updateMeInfoError,
    } = this.props
    return (
      <Fragment>
        <PageMetadata pageName="increaseHandprintPage" />
        <Wrapper>
          <TitleSectionWrap>
            <TitleSectionContent>
              <SavePlanetImg src={savePlanetImg} />
              <TitleSectionHeading>
                <FormattedMessage id="app.increaseHandprintPage.title" />
              </TitleSectionHeading>
              <TitleSectionDescription>
                <FormattedMessage id="app.increaseHandprintPage.description" />
              </TitleSectionDescription>
            </TitleSectionContent>
          </TitleSectionWrap>

          <FormSectionWrap>
            <FormWrap>
              {isCodeCustomizing ? (
                <InvitationCodeBlockWrap>
                  <CustomizeForm>
                    <FormSectionHeading>
                      <FormattedMessage id="app.increaseHandprintPage.form.yourPersonalPromocode" />
                    </FormSectionHeading>
                    <Row>
                      <CodePrefix>{CODE_PREFIX}</CodePrefix>
                      <InputCode
                        validateStatus={updateMeInfoError && 'error'}
                        help={
                          updateMeInfoError &&
                          formatMessage({
                            id: updateMeInfoError,
                          })
                        }
                      >
                        <CopyToClipboardInput
                          onChange={this.handleCodeChange}
                          value={invitationCode}
                        />
                      </InputCode>
                    </Row>
                    <CustomizeButtonWrapper>
                      <CancelButton onClick={this.handleCustomizeCancel}>
                        <FormattedMessage id="app.increaseHandprintPage.form.cancel" />
                      </CancelButton>
                      <SaveButton
                        disabled={invitationCode.length < 3}
                        onClick={this.handleCustomizeSave}
                      >
                        <FormattedMessage id="app.increaseHandprintPage.form.save" />
                      </SaveButton>
                    </CustomizeButtonWrapper>
                  </CustomizeForm>
                </InvitationCodeBlockWrap>
              ) : (
                <InvitationCodeBlockWrap>
                  <FormSectionHeading>
                    <FormattedMessage id="app.increaseHandprintPage.form.yourPersonalPromocode" />
                  </FormSectionHeading>
                  <InvitationCodeBlock>
                    {user.invitationCode}
                  </InvitationCodeBlock>
                  <CustomizeButton onClick={this.handleCustomize}>
                    <FormattedMessage id="app.increaseHandprintPage.customize" />
                  </CustomizeButton>
                </InvitationCodeBlockWrap>
              )}
              <FormSectionContent>
                <div>
                  <FormSectionHeading>
                    <FormattedMessage id="app.increaseHandprintPage.form.shareYourLinkWithCode" />
                  </FormSectionHeading>
                  <ShareBlock>
                    <CopyToClipboardInput
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
                    <MultipleInput
                      values={emails}
                      onChange={this.handleMultipleInputChange}
                      error={shareInvitationCodeError}
                      inputComponent={InvitationInput}
                    />
                    {showInvitingMessageInput ? (
                      <AddInvitingMessageTextAreaWrap>
                        {getFieldDecorator('invitationMessage', {
                          rules: getValidationRules(formatMessage)
                            .invitingMessage,
                        })(
                          <AddInvitingMessageTextArea
                            placeholder={formatMessage({
                              id:
                                'app.increaseHandprintPage.form.addInvitingMessagePlaceholder',
                            })}
                          />,
                        )}
                        <AddInvitingMessageTextAreaCount>
                          (
                          {getFieldValue('invitationMessage')
                            ? getFieldValue('invitationMessage').length
                            : 0}
                          /{MAX_INVITING_MESSAGE_LENGTH})
                        </AddInvitingMessageTextAreaCount>
                      </AddInvitingMessageTextAreaWrap>
                    ) : (
                      <AddInvitingMessageButton
                        onClick={this.handleToggleInvitingMessage}
                      >
                        <FormattedMessage id="app.increaseHandprintPage.form.addInvitingMessage" />
                      </AddInvitingMessageButton>
                    )}
                    <SendInvitesButton
                      htmlType="submit"
                      loading={isSharingInvitationCode}
                      disabled={emails.length === 0 || isTyping}
                    >
                      {showSuccessIndicator && <Icon type="check" />}
                      <FormattedMessage id="app.increaseHandprintPage.form.sendInvites" />
                    </SendInvitesButton>

                    {ignoredEmails.length > 0 && (
                      <IgnoredInvitations>
                        <FormattedMessage
                          id="app.increaseHandprintPage.ignoredEmails"
                          values={{ list: ignoredEmails.join(', ') }}
                        />
                      </IgnoredInvitations>
                    )}
                  </SendInvitationForm>
                </div>
              </FormSectionContent>
            </FormWrap>
          </FormSectionWrap>
        </Wrapper>
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user.data,
  token: state.account.token,
  updateMeInfoError: state.user.updateMeInfoError,
  isUpdatingMeInfo: state.user.isUpdatingMeInfo,
})

IncreaseHandprintPage.propTypes = {
  form: PropTypes.object.isRequired,
  intl: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  token: PropTypes.string.isRequired,
  updateMeInfoRequest: PropTypes.func,
  updateMeInfoError: PropTypes.string,
  updateMeInfoFailure: PropTypes.func,
  isUpdatingMeInfo: PropTypes.bool,
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      updateMeInfoRequest: data => UserCreators.updateMeInfoRequest(data),
      updateMeInfoFailure: data => UserCreators.updateMeInfoFailure(data),
    },
    dispatch,
  )
export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Form.create()(injectIntl(IncreaseHandprintPage)))
