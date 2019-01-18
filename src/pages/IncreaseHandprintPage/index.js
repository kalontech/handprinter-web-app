import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Form, Tag, Icon } from 'antd'
import { injectIntl, FormattedMessage } from 'react-intl'

import colors from './../../config/colors'
import { Input, DefaultButton } from './../../components/Styled'
import hexToRgba from '../../utils/hexToRgba'
import savePlanetImg from '../../assets/increase-handprint/save_planet.png'
import { getInvitationLink } from '../../utils/helpers'
import api from './../../api'
import media from './../../utils/mediaQueryTemplate'
import PageMetadata from '../../components/PageMetadata'
import MultipleInput from '../../components/MultipleInput'

export const Wrapper = styled.div`
  display: flex;
  min-height: 660px;
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
  width: 580px;
  ${media.largeDesktop`
    width: 420px;
  `}
  ${media.desktop`
    width: 580px;
  `}
  ${media.phone`
    width: 290px;
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
  height: 180px;
  text-align: center;
  ${media.phone`
    padding: 25px 10px;
  `}
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
  min-width: 142px;
  background-color: ${hexToRgba(colors.green, 0.1)};
  color: ${colors.green};
  height: 47px;
  display: inline-block;
  margin-left: 7px;
  font-weight: bold;
  ${media.phone`
    margin-top: 15px;
    width: 100%;
    margin-left: 0;
  `}
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
  ${media.phone`
    flex-direction: column;
  `}
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

const InvitationInput = styled(Input)`
  height: 47px;
  margin-right: 5px;
  color: ${colors.darkGray};
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
      isTyping: false,
      showSuccessIndicator: false,
    }

    this.saveInviteRef = ref => (this.saveInviteRef = ref)
    this.shareInviteRef = React.createRef()
  }

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
  }

  handleSendInvites = async e => {
    e.preventDefault()
    const { emails, invitationLink } = this.state
    this.fetchShareInvitationCode(emails, invitationLink)
  }

  fetchShareInvitationCode = async (emails, invitationLink) => {
    const { token } = this.props

    this.setState({ isSharingInvitationCode: true })
    try {
      await api.shareInvitationCode(
        { emails: emails, invitationCodeUrl: invitationLink },
        token,
      )
      this.setState({
        isSharingInvitationCode: false,
        shareInvitationCodeError: null,
      })
    } catch (error) {
      this.setState({
        isSharingInvitationCode: false,
        shareInvitationCodeError: error,
      })
    }
  }

  copyToClipboard = e => {
    this.shareInviteRef.current.select()
    document.execCommand('copy')
  }

  handleMultipleInputChange = (emails, isTyping) => {
    this.setState({ emails, isTyping })
  }

  addEmailInputRef = input => (this.input = input)

  renderTitleSection = () => (
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
  )

  renderFormSection = (
    {
      emails,
      invitationLink,
      isSharingInvitationCode,
      shareInvitationCodeError,
      isTyping,
      showSuccessIndicator,
    },
    { user },
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
              <SendInvitesButton
                htmlType="submit"
                loading={isSharingInvitationCode}
                disabled={emails.length === 0 || isTyping}
              >
                {showSuccessIndicator && <Icon type="check" />}
                <FormattedMessage id="app.increaseHandprintPage.form.sendInvites" />
              </SendInvitesButton>
            </SendInvitationForm>
          </div>
        </FormSectionContent>
      </FormWrap>
    </FormSectionWrap>
  )

  render() {
    return (
      <Fragment>
        <PageMetadata pageName="increaseHandprintPage" />
        <Wrapper>
          {this.renderTitleSection()}
          {this.renderFormSection(this.state, this.props)}
        </Wrapper>
      </Fragment>
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
