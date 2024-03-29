import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Form, Icon, Table as TableAnt } from 'antd'
import { injectIntl, intlShape, FormattedMessage } from 'react-intl'
import { bindActionCreators, compose } from 'redux'
import { animateScroll } from 'react-scroll'
import { Link } from 'react-router-dom'
import isEmpty from 'lodash/isEmpty'

import colors from 'config/colors'
import { MAX_INVITING_MESSAGE_LENGTH } from 'config/common'
import { Creators as UserCreators } from 'redux/userStore'
import hexToRgba from 'utils/hexToRgba'
import { getInvitationLink, getInvitationLinkEaton } from 'utils/helpers'
import media from 'utils/mediaQueryTemplate'
import getValidationRules from 'config/validationRules'
import { Input, DefaultButton, FormItem } from 'components/Styled'
import PageMetadata from 'components/PageMetadata'
import MultipleInput from 'components/MultipleInput'
import ResendButton from 'components/ResendButton'

import qs from 'qs'
import {
  getOrganization,
  updateOne,
  getAdmins,
  getInvitationsList,
  shareInvitationCode,
} from 'api/organization'

export const INVITATION_STATUSES = {
  ACCEPTED: 'ACCEPTED',
  PENDING: 'PENDING',
}

export const Wrapper = styled.div`
  display: flex;
  min-height: 660px;
  flex-grow: 1;
  ${media.desktop`
    flex-direction: column;
  `}
`

export const TitleSectionWrap = styled.div`
  width: 50%;
  text-align: left;
  padding: 40px 100px;
  background-color: ${colors.lightGray};
  ${media.desktop`
    width: 100%;
  `}
  ${media.phone`
    padding: 30px 10px;
  `}
`

const Title = styled.span`
  font-family: 'Noto Sans';
  font-size: 22px;
  margin-left: 7px;
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
  height: 110px;
  width: 110px;
  border: 10px solid #ffffff;
  box-sizing: border-box;
  border-radius: 4px;
  position: relative;
  top: -31px;
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
  flex-direction: column;
  display: flex;
  align-items: center;

  ${media.phone`
    padding: 25px 10px;
  `}
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

const Table = styled(TableAnt)`
  th {
    font-size: 10px;
    font-weight: bold;
    width: 33%;
  }
  th.column-action {
    text-align: right;
  }
  .ant-table-tbody > tr > td {
    border-bottom: 0px;
  }
  td.column-action {
    text-align: right;
  }

  .ant-table-pagination {
    display: ${props => !props.isPaginationVisible && 'none'};
    text-align: center;
    float: none;

    & li {
      display: inline-block;
    }
  }
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
  margin: 10px 0 0 4.5px;
`

const CancelButton = styled(CopyToClipboardButton)`
  width: 100%;
  height: 47px;
  margin: 10px 4.5px 0 0;
`

const CustomizeButtonWrapper = styled.div`
  flex-direction: column;
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

export const SendInvitationForm = styled(Form)`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-direction: column;
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
const TitleSectionContent = styled.div`
  position: relative;
  top: 0;
`
const EmptyStateWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #f8fafa;
  width: 50%;
  text-align: center;
  ${media.desktop`
    height: 524px;
    width: 100%;
  `}
  ${media.phone`
    padding: 30px 10px;
  `}
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
const TitleSectionName = styled.p`
  font-size: 16px;
  color: ${colors.dark};
  margin-bottom: 36px;
`

const InputCode = styled(FormItem)`
  width: 100%;
`
const Circle = styled.div`
  height: 10px;
  width: 10px;
  border-radius: 5px;
  margin-right: 5px;
  background-color: ${props =>
    props.status === INVITATION_STATUSES.ACCEPTED ? colors.green : colors.blue};
`
const StatusRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`
const ProfileLink = styled(Link)`
  color: ${colors.ocean};
  font-weight: bold;
  font-size: 14px;
  text-align: right;
`

const CODE_PREFIX = 'hp'

class IncreaseOrganizationHandprintPage extends Component {
  columns = [
    {
      title: this.props.intl
        .formatMessage({
          id: 'app.increaseHandprintPage.table.email',
        })
        .toUpperCase(),
      dataIndex: 'inviteeEmail',
    },
    {
      title: this.props.intl
        .formatMessage({
          id: 'app.increaseHandprintPage.table.status',
        })
        .toUpperCase(),
      dataIndex: 'status',
      sorter: (a, b) =>
        a.status !== b.status ? (a.status < b.status ? -1 : 1) : 0,
      render: status => this.renderStatusColumn(status),
    },
    {
      title: this.props.intl
        .formatMessage({
          id: 'app.increaseHandprintPage.table.action',
        })
        .toUpperCase(),
      dataIndex: 'user',
      className: 'column-action',
      render: (id, row) => this.renderActionColumn(id, row),
    },
  ]
  state = {
    emails: [],
    invitationLink: null,
    inviterId: null,
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
    invitationsList: [],
    organization: null,
  }

  shareInviteRef = React.createRef()

  componentDidMount() {
    animateScroll.scrollToTop()
    this.fetchOrganization()
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

  fetchOrganization = async () => {
    const { location } = this.props
    const query = qs.parse(location.search, { ignoreQueryPrefix: true })
    const organizationId = query && query.organizationId
    if (!organizationId) return
    try {
      const res = await getOrganization(organizationId)
      const admins = await getAdmins(organizationId)
      if (res.organization) {
        this.setState(
          {
            organization: { ...res.organization, admins },
            inviterId: res.organization._id,
          },
          () => {
            this.setState({ invitationLink: this.chooseCorrectInvitation() })
            this.getInvitationsList()
          },
        )
      }
    } catch (error) {
      console.error(error)
    }
  }

  async getInvitationsList() {
    const organization = this.state.organization
    if (!organization) return
    const { invitations } = await getInvitationsList(organization._id)
    this.setState({ invitationsList: invitations })
  }

  chooseCorrectInvitation() {
    const { overrides } = this.props
    const { organization } = this.state
    if (!organization) return
    if (overrides && overrides.brandName === 'Eaton') {
      return getInvitationLinkEaton(organization.invitationCode)
    } else {
      return getInvitationLink(organization.invitationCode)
    }
  }

  renderStatusColumn = status => (
    <StatusRow>
      <Circle status={status} />
      {status === INVITATION_STATUSES.ACCEPTED ? (
        <FormattedMessage id="app.increaseHandprintPage.table.accepted" />
      ) : (
        <FormattedMessage id="app.increaseHandprintPage.table.pending" />
      )}
    </StatusRow>
  )

  renderActionColumn = (id, row) => {
    const { invitationLink, shareInvitationCodeError, inviterId } = this.state
    /**
     * If user click on resend invite, text will change to `Invitation was sent` and
     * button become disabled, before the user leave current page
     */
    return row.status === INVITATION_STATUSES.ACCEPTED ? (
      <ProfileLink to={`/account/${id}`}>
        <FormattedMessage id="app.increaseHandprintPage.table.viewProfile" />
      </ProfileLink>
    ) : (
      <ResendButton
        status={row.status}
        onClick={() => {
          this.fetchShareInvitationCode(
            [row.inviteeEmail],
            invitationLink,
            inviterId,
            false,
          )
        }}
        error={shareInvitationCodeError}
      />
    )
  }

  handleSendInvites = async e => {
    e.preventDefault()
    const { emails, invitationLink, inviterId } = this.state
    this.fetchShareInvitationCode(emails, invitationLink, inviterId)
  }

  fetchShareInvitationCode = (
    emails,
    invitationLink,
    inviterId,
    animation = true,
  ) => {
    const {
      form: { validateFields },
    } = this.props
    validateFields(async (err, { invitationMessage }) => {
      if (!err) {
        animation && this.setState({ isSharingInvitationCode: true })

        const data = {
          emails: emails,
          invitationCodeUrl: invitationLink,
          inviterId,
        }

        if (invitationMessage && invitationMessage.length > 0) {
          data.message = invitationMessage
        }

        try {
          const { ignored = [] } = (await shareInvitationCode(data)) || {}
          this.getInvitationsList()

          this.setState({
            isSharingInvitationCode: false,
            showInvitingMessageInput: false,
            shareInvitationCodeError: null,
            ignoredEmails: ignored,
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
  }

  handleCustomizeSave = async () => {
    const { invitationCode, organization } = this.state
    const newCode = `${CODE_PREFIX}${invitationCode}`
    try {
      await updateOne({ invitationCode: newCode }, organization._id)
      this.fetchOrganization()
      this.setState({
        isCodeCustomizing: false,
        invitationLink: this.chooseCorrectInvitation(),
        inviterId: organization._id,
      })
    } catch (error) {
      console.error(error)
    }
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
      invitationsList,
      organization,
    } = this.state
    if (!organization) return null
    const {
      intl: { formatMessage },
      form: { getFieldDecorator, getFieldValue },
      updateMeInfoError,
    } = this.props
    return (
      <Fragment>
        <PageMetadata pageName="increaseHandprintPage" />
        <Wrapper>
          {isEmpty(invitationsList) ? (
            <EmptyStateWrapper>
              <TitleSectionContent>
                <SavePlanetImg src={organization.photo} />
                <TitleSectionName>{organization.name}</TitleSectionName>
                <TitleSectionHeading>
                  <FormattedMessage id="app.increaseOrgHandprintPage.title" />
                </TitleSectionHeading>
                <TitleSectionDescription>
                  <FormattedMessage id="app.increaseHandprintPage.description" />
                </TitleSectionDescription>
              </TitleSectionContent>
            </EmptyStateWrapper>
          ) : (
            <TitleSectionWrap>
              <Title>
                <FormattedMessage id="app.increaseHandprintPage.table.myInvitations" />
              </Title>
              <Table
                columns={this.columns}
                dataSource={invitationsList}
                size="middle"
                rowKey={record => record.inviteeEmail}
                isPaginationVisible={invitationsList.length > 10}
              />
            </TitleSectionWrap>
          )}

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
                    <FormattedMessage id="app.organizations.increaseHandprint.inviteCode" />
                  </FormSectionHeading>
                  <InvitationCodeBlock>
                    {organization.invitationCode}
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
  updateMeInfoError: state.user.updateMeInfoError,
  isUpdatingMeInfo: state.user.isUpdatingMeInfo,
})

IncreaseOrganizationHandprintPage.propTypes = {
  form: PropTypes.object.isRequired,
  intl: intlShape.isRequired,
  user: PropTypes.object.isRequired,
  updateMeInfoRequest: PropTypes.func,
  updateMeInfoError: PropTypes.string,
  updateMeInfoFailure: PropTypes.func,
  isUpdatingMeInfo: PropTypes.bool,
  overrides: PropTypes.object,
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      updateMeInfoRequest: data => UserCreators.updateMeInfoRequest(data),
      updateMeInfoFailure: data => UserCreators.updateMeInfoFailure(data),
    },
    dispatch,
  )
export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps,
  ),
  Form.create(),
  injectIntl,
)(IncreaseOrganizationHandprintPage)
