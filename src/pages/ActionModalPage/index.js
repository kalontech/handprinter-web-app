import React, { Component, Fragment } from 'react'
import { Row, Button, Form, Input } from 'antd'
import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'
import { FormattedMessage, injectIntl } from 'react-intl'
import { connect } from 'react-redux'
import { compose } from 'redux'
import { Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import SearchableInput from 'components/SearchInfluencerInput'
import _ from 'lodash'
import moment from 'moment'

import { ACTIONS_SUBSETS, ACTION_STATES } from 'utils/constants'
import * as api from 'api/actions'
import ActionCardLabelSet from 'components/ActionCardLabelSet'
import colors from 'config/colors'
import Spinner from 'components/Spinner'
import treeImage from 'assets/actions/tree.png'
import pigImage from 'assets/actions/pig.png'
import decodeError from 'utils/decodeError'
import { DefaultButton, Checkbox } from 'components/Styled'
import Tooltip from 'components/Tooltip'
import media, { sizes } from 'utils/mediaQueryTemplate'
import MultipleInput from 'components/MultipleInput'
import CloseIcon from 'assets/icons/CloseIcon'
import hexToRgba from 'utils/hexToRgba'
import * as apiUser from 'api/user'
import { getTakenActionAvailableFrom } from 'api/actions'

const Container = styled(Row)`
  align-items: center;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  overflow: auto;

  ${props =>
    props.height
      ? `
    height: ${props.height};
  `
      : `
    height: 580px;
  `}

  ${props =>
    props.width === 'small' &&
    css`
      width: 460px;
    `};
  ${props =>
    props.width === 'medium' &&
    css`
      width: 592px;
      ${media.tablet`
        max-width: 100%;
        width: 100%;
      `}
    `};
  ${props =>
    props.width === 'large' &&
    css`
      width: 920px;
      ${media.desktop`
        max-width: 700px;
      `}
      ${media.tablet`
        max-width: 100%;
        height: initial;
        flex-direction: column;
        justify-content: flex-start;
      `}
    `};
`

const ImpactButton = styled(DefaultButton)`
  min-width: ${props => (props.isActive ? '80px' : 'calc(100% - 120px)')};
  background-color: transparent;
  color: ${props => (props.isActive ? colors.blue : colors.darkGray)};

  border: 1px solid
    ${props =>
      props.isActive
        ? hexToRgba(colors.blue, 0.6)
        : hexToRgba(colors.dark, 0.6)};
  border-radius: 4px;
  font-weight: 400;

  &&:hover,
  &&:active {
    background-color: transparent;
    color: ${props => (props.isModelling ? colors.blue : colors.dark)};
    border-color: ${props =>
      props.isModelling
        ? hexToRgba(colors.blue, 0.6)
        : hexToRgba(colors.dark, 0.6)};
  }
`

const LeftPanel = styled.div`
  height: 100%;
  width: 50%;
  background-color: ${colors.darkGray};

  ${media.tablet`
    width: 100%;
    height: 222px;
  `}

  img {
    height: 100%;
    object-fit: cover;
    width: 100%;
  }
`

const RightPanel = styled.div`
  height: 100%;
  padding: 60px 0;
  width: 50%;

  ${media.desktop`
    width: 700px;
  `}

  ${media.tablet`
    width: 100%;
    height: auto;
    padding: 30px 15px ${({ isIphone }) => (isIphone ? '0' : '12px')} 15px;
  `}
`

const CloseButton = styled.button`
  width: 50px;
  height: 50px;
  position: absolute;
  background-color: transparent;
  outline: 0;
  border: 0;
  right: 17px;
  top: 10px;
  display: flex;
  justify-content: center;
  font-size: 20px;
  align-items: center;
  transition: all 0.3s;
  cursor: pointer;
  &:hover {
    color: ${colors.dark};
  }
  ${props =>
    props.color
      ? `
        color: ${props.color};
      `
      : `
        color: ${colors.darkGray};
      `}
  ${media.tablet`
    color: ${colors.white};
    top: 2px;
    right: 2px;
    &:hover {
     color: ${colors.white};
     opacity: 0.2;
  }
  `}
`

const ActionName = styled.h1`
  color: ${colors.dark};
  font-size: 28px;
  line-height: 35px;
  margin-top: 20px;
`

const ActionDescription = styled.p`
  color: ${colors.darkGray};
  font-size: 14px;
  line-height: 20px;
  margin-top: 12px;
`

const ActionAssumptions = styled(ActionDescription)`
  font-style: italic;
`

const BottomPanel = styled.div`
  background-color: ${colors.white};
  position: ${({ isIphone }) => (isIphone ? 'static' : 'fixed')};
  backface-visibility: hidden;
  bottom: 32px;
  width: 100%;
  max-width: calc(339px + 30px);

  @media screen and (max-width: ${sizes.tablet}px) and (orientation: landscape) {
    position: static;
  }

  ${media.tablet`
    max-width: initial;
    bottom: 0px;
  `}
`

const TakenActionPanel = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  width: 100%;
  padding-top: 60px;

  img {
    margin-bottom: 30px;
  }
`

const TakenActionTitle = styled.h1`
  font-family: 'Noto Serif', serif;
  font-size: 37px;
  line-height: 46px;
`

const TakenActionDescription = styled.p`
  font-size: 16px;
  line-height: 22px;
  margin: -10px 30px 25px 30px;
  text-align: center;
`

const EngageViewPanel = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  overflow: hidden;
`

const ModalContentWrap = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  overflow: auto;
  height: 400px;

  @media screen and (max-width: ${sizes.phone}px) {
    padding-bottom: ${({ isIphone }) => (isIphone ? '0' : '96px')};
  }

  @media screen and (max-width: ${sizes.phone}px) and (orientation: landscape) {
    padding-bottom: 0;
  }
`

const FormItem = styled(Form.Item)`
  margin-bottom: 0;
`

const ActionModalPageSteps = {
  LOADING: 'LOADING',
  ACTION_VIEW: 'ACTION_VIEW',
  ACTION_TAKEN_REDUCE_FOOTPRINT_VIEW: 'ACTION_TAKEN_REDUCE_FOOTPRINT_VIEW',
  ACTION_TAKEN_INCREACE_HANDPRINT_VIEW: 'ACTION_TAKEN_INCREACE_HANDPRINT_VIEW',
  ENGAGE_VIEW: 'ENGAGE_VIEW',
  ACTION_TAKEN_MODELING_VIEW: 'ACTION_TAKEN_MODELING_VIEW',
  ACTION_TAKE_PROPOSE: 'ACTION_TAKE_PROPOSE',
}

const EngageViewPicture = styled.div`
  height: calc(592px / 2);
  width: 101%;
  overflow: hidden;
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center center;
`

const EngageViewContentContainer = styled.div`
  background-color: ${colors.white};
  text-align: center;
  padding: 33px 60px;
  height: 50%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  ${media.phone`
    padding: 15px;
  `}
`

const EngageViewContentInputWrap = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  width: 100%;
`

const EngageViewContentSubtitle = styled.p`
  color: ${colors.darkGray};
  font-size: 14px;
  font-family: 'Noto Sans', serif;
`

const EngageViewContentTitle = styled.p`
  color: ${colors.dark};
  font-size: 19px;
  font-family: 'Noto Serif', serif;
  margin-bottom: 20px;
`

const TextError = styled.p`
  color: ${colors.orange};
  font-size: 14px;
`

const EngageViewSendButton = styled(Button)`
  width: 100%;
  height: 47px;
`

const EngageViewInput = styled(Input)`
  height: 47px;
  margin-right: 5px;
  color: ${colors.darkGray};
`

const ProposeViewContentInputWrap = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  flex: 1;
  margin-top: 20px;
`

const ActionViewButtonsWrapper = styled.div`
  padding: 18px ${({ isIphone }) => (isIphone ? '0' : '15px')};
  display: flex;
  justify-content: space-between;

  @media screen and (max-width: ${sizes.tablet}px) and (orientation: landscape) {
    padding: 18px 0;
  }

  button {
    min-width: 47%;
  }
`

const TakenActionAuthWrap = styled.div`
  width: 100%;
  text-align: center;
  background: ${colors.lightGray};
  padding: 15px;
  color: ${colors.darkGray};
  margin-top: 60px;
`

const TakenActionAuthTitle = styled.div`
  margin-bottom: 15px;
`

const TakenActionAuthContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  button {
    width: 200px;
  }
  ${media.phone`
    flex-direction: column;
  `}
`

const TakenActionAuthContentOr = styled.span`
  margin: 0 15px;
  ${media.phone`
    margin: 15px 0;
  `}
`

const EngageViewContenSentMessage = styled.div`
  font-size: 18px;
  color: ${colors.green};
`

const TakeActionButton = styled(Button)`
  width: 100%;
  ${props =>
    props.isLoggedIn &&
    `
    margin-left: 15px
  `}
`

const ActionContent = styled.div`
  height: 400px;
  overflow: scroll;
  padding: 0 60px 60px 60px;
  width: 100%;
`

const CheckboxStyled = styled(Checkbox)`
  color: ${colors.dark};
`

const CheckboxWrapper = styled.div`
  border-bottom: 1px solid ${colors.gray};
  padding-bottom: 20px;
`

const SearchableInputHeader = styled.div`
  margin-bottom: 5px;
`

const ProposeView = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 30px; 0px;
`

const isSafariMobile = window.navigator.userAgent.match(/iPhone/i)
export const INVITE_ACTION_SLUG = 'invite-people-to-join-handprinter'
class ActionModalPage extends Component {
  state = {
    action: null,
    step: ActionModalPageSteps.LOADING,
    takenAction: null,
    takingAction: false,
    engageError: null,
    sendingEngage: false,
    successEngageSent: false,
    engageEmails: [],
    engageInputIsTyping: false,
    initiatorId: '',
    isHabit: false,
    availableFrom: moment(),
  }

  componentDidMount() {
    const { match } = this.props

    api.fetchAction({ slug: match.params.slug }).then(({ action }) => {
      this.setState({ action, step: ActionModalPageSteps.ACTION_VIEW })
      this.checkAvailableTakeAction(action && action._id)
    })
  }

  handleSubmitEngage = async () => {
    const { engageEmails, action } = this.state

    this.setState({ sendingEngage: true })

    try {
      await api.engageAction(action._id, engageEmails, this.props.user._id)
      this.setState({
        successEngageSent: true,
      })
    } catch (error) {
      this.setState({
        engageError: error,
        sendingEngage: false,
      })
    }
  }

  handleTakeAction = async () => {
    if (this.state.action.slug === INVITE_ACTION_SLUG) {
      this.props.history.push('/account/code')
      return
    }
    if (this.props.user) {
      this.setState({
        step: ActionModalPageSteps.ACTION_TAKE_PROPOSE,
      })
    } else {
      this.takeAction()
    }
  }

  takeAction = async () => {
    const { action, initiatorId, isHabit } = this.state

    let modalType =
      action.status === ACTION_STATES.MODELING
        ? ActionModalPageSteps.ACTION_TAKEN_MODELING_VIEW
        : ActionModalPageSteps.ACTION_TAKEN_REDUCE_FOOTPRINT_VIEW

    Object.values(action.impacts.handprint).forEach(impact => {
      if (impact.minutes > 0) {
        modalType = ActionModalPageSteps.ACTION_TAKEN_INCREACE_HANDPRINT_VIEW
      }
    })

    this.setState({ takeActionError: null, takingAction: true })
    try {
      const { takenAction } = await api.takeAction(
        action._id,
        isHabit,
        initiatorId,
      )
      this.setState({
        step: modalType,
        takeActionError: null,
        takenAction,
        takingAction: false,
      })
    } catch (error) {
      this.setState({
        takeActionError: decodeError(error),
        takingAction: false,
      })
    }
  }

  switchToEngageView = () => {
    this.setState({
      step: ActionModalPageSteps.ENGAGE_VIEW,
    })
  }

  handleRecruitingEmailsInputChange = initiatorId => {
    this.setState({ initiatorId })
  }

  handleRadioChange = e => {
    this.setState({ radioChoice: e.target.value })
  }

  checkAvailableTakeAction = async actionId => {
    if (!actionId) return
    try {
      const res = await getTakenActionAvailableFrom({ actionId })
      this.setState({ availableFrom: res.availableFrom })
    } catch (error) {
      console.error(error)
    }
  }

  renderActionView = () => {
    const {
      location,
      intl: { formatMessage, locale },
      user,
    } = this.props
    const { action, takeActionError, takingAction, availableFrom } = this.state
    let tooltipTextId, buttonTextId
    switch (action.status) {
      case ACTION_STATES.MODELING:
        tooltipTextId = 'app.actions.card.waitModelingHint'
        buttonTextId = 'app.actions.card.waitModeling'
        break
      case ACTION_STATES.DENIED:
        tooltipTextId = 'app.actions.card.deniedHint'
        buttonTextId = 'app.actions.card.denied'
        break
      default:
        tooltipTextId = 'app.actions.card.waitAdminHint'
        buttonTextId = 'app.actions.card.waitAdmin'
    }

    const disabled = moment().isBefore(availableFrom)
    return this.renderInContainer({
      children: (
        <Fragment>
          <LeftPanel>
            {action.picture && <img src={action.picture} alt="" />}
          </LeftPanel>
          <RightPanel isIphone={isSafariMobile} span={12}>
            <ModalContentWrap isIphone={isSafariMobile}>
              {action.status === ACTION_STATES.PUBLISHED ? (
                <ActionCardLabelSet impacts={action.impacts} mobileFixedWidth />
              ) : (
                <Tooltip
                  placement="top"
                  title={formatMessage({
                    id: tooltipTextId,
                  })}
                >
                  <ImpactButton
                    style={{ height: 40 }}
                    isModelling={action.status === ACTION_STATES.MODELING}
                  >
                    {formatMessage({
                      id: buttonTextId,
                    })}
                  </ImpactButton>
                </Tooltip>
              )}

              <ActionContent>
                <ActionName>
                  {(action.translatedName && action.translatedName[locale]) ||
                    action.name}
                </ActionName>
                <ActionDescription>
                  <ReactMarkdown
                    source={
                      (action.translatedDescription &&
                        action.translatedDescription[locale]) ||
                      action.description
                    }
                  />
                </ActionDescription>

                {action.status === ACTION_STATES.PUBLISHED && (
                  <ActionAssumptions>
                    <ReactMarkdown
                      source={
                        (action.translatedAssumptions &&
                          action.translatedAssumptions[locale]) ||
                        action.assumptions
                      }
                    />
                  </ActionAssumptions>
                )}
              </ActionContent>

              {action.status !== ACTION_STATES.DENIED && (
                <BottomPanel isIphone={isSafariMobile}>
                  {!location.pathname.includes(ACTIONS_SUBSETS.TAKEN) &&
                    moment().isBefore(availableFrom) && (
                      <TextError>
                        <FormattedMessage
                          id={'app.actions.card.alreadyTaken'}
                          values={{
                            date: moment(availableFrom).format('MMM DD, YYYY'),
                          }}
                        />
                      </TextError>
                    )}

                  {action.status !== ACTION_STATES.PROPOSED && (
                    <ActionViewButtonsWrapper isIphone={isSafariMobile}>
                      {user && action.slug !== INVITE_ACTION_SLUG && (
                        <DefaultButton
                          type="primary"
                          htmlType="submit"
                          onClick={this.switchToEngageView}
                        >
                          <FormattedMessage id="app.actions.engage" />
                        </DefaultButton>
                      )}
                      {!location.pathname.includes(ACTIONS_SUBSETS.TAKEN) && (
                        <TakeActionButton
                          type="primary"
                          loading={takingAction}
                          onClick={this.handleTakeAction}
                          isLoggedIn={user}
                          disabled={disabled}
                        >
                          <FormattedMessage id="app.actions.takeAction" />
                        </TakeActionButton>
                      )}
                    </ActionViewButtonsWrapper>
                  )}
                  {takeActionError && (
                    <FormItem
                      validateStatus="error"
                      help={formatMessage({ id: takeActionError })}
                    />
                  )}
                </BottomPanel>
              )}
            </ModalContentWrap>
          </RightPanel>
        </Fragment>
      ),
      width: 'large',
    })
  }

  renderActionTakenView = ({ type }) => {
    const {
      user,
      closeModal,
      history,
      intl: { formatMessage },
      overrides,
    } = this.props
    const { action, takenAction } = this.state

    let label = ''
    switch (type) {
      case ActionModalPageSteps.ACTION_TAKEN_REDUCE_FOOTPRINT_VIEW:
        label = 'app.actions.reduceFootprint'
        break
      case ActionModalPageSteps.ACTION_TAKEN_MODELING_VIEW:
        label = 'app.actions.thanks.taking.actions'
        break
      default:
        label = 'app.actions.handprintIncreased'
        break
    }
    let tooltipTextId, buttonTextId
    switch (action.status) {
      case ACTION_STATES.MODELING:
        tooltipTextId = 'app.actions.card.waitModelingHint'
        buttonTextId = 'app.actions.card.waitModeling'
        break
      case ACTION_STATES.DENIED:
        tooltipTextId = 'app.actions.card.deniedHint'
        buttonTextId = 'app.actions.card.denied'
        break
      default:
        tooltipTextId = 'app.actions.card.waitAdminHint'
        buttonTextId = 'app.actions.card.waitAdmin'
    }
    return this.renderInContainer({
      children: (
        <Fragment>
          <TakenActionPanel>
            <img
              src={
                type === ActionModalPageSteps.ACTION_TAKEN_REDUCE_FOOTPRINT_VIEW
                  ? pigImage
                  : treeImage
              }
              alt=""
            />
            <TakenActionTitle>
              <FormattedMessage id="app.actions.congratulations" />
            </TakenActionTitle>

            <TakenActionDescription>
              <FormattedMessage id={label} />
            </TakenActionDescription>

            {type === ActionModalPageSteps.ACTION_TAKEN_MODELING_VIEW ? (
              <Tooltip
                placement="top"
                title={formatMessage({
                  id: tooltipTextId,
                })}
              >
                <ImpactButton
                  style={{ height: 30, width: '40%' }}
                  isModelling={action.status === ACTION_STATES.MODELING}
                  isActive
                >
                  {formatMessage({
                    id: buttonTextId,
                  })}
                </ImpactButton>
              </Tooltip>
            ) : (
              <ActionCardLabelSet
                impacts={takenAction.impacts}
                mobileFixedWidth={true}
                hideTooltip={true}
              />
            )}
            {user ? (
              <TakenActionAuthWrap>
                <TakenActionAuthContent>
                  <Button
                    type="primary"
                    onClick={() => {
                      history.length > 1 ? history.goBack() : closeModal()
                    }}
                  >
                    <FormattedMessage id="app.actions.congratulations.nice" />
                  </Button>
                </TakenActionAuthContent>
              </TakenActionAuthWrap>
            ) : (
              <TakenActionAuthWrap>
                <TakenActionAuthTitle>
                  <FormattedMessage id="app.actions.congratulations.wantToSaveResults" />
                </TakenActionAuthTitle>
                <TakenActionAuthContent>
                  <Link to="/account/login">
                    <DefaultButton type="primary">
                      <FormattedMessage
                        id={
                          overrides && overrides.brandName === 'Eaton'
                            ? 'app.actions.congratulations.login.eaton'
                            : 'app.actions.congratulations.login'
                        }
                      />
                    </DefaultButton>
                  </Link>
                  <TakenActionAuthContentOr>
                    <FormattedMessage id="app.actions.congratulations.or" />
                  </TakenActionAuthContentOr>
                  <Link to="/account/register">
                    <Button type="primary">
                      <FormattedMessage
                        id={
                          overrides && overrides.brandName === 'Eaton'
                            ? 'app.actions.congratulations.register.eaton'
                            : 'app.actions.congratulations.register'
                        }
                      />
                    </Button>
                  </Link>
                </TakenActionAuthContent>
              </TakenActionAuthWrap>
            )}
          </TakenActionPanel>
        </Fragment>
      ),
      width: 'medium',
      height: 'auto',
    })
  }

  handleEngageEmailsInputChange = (emails, isTyping) => {
    this.setState({ engageEmails: emails, engageInputIsTyping: isTyping })
  }

  renderEngageView = () => {
    const {
      action,
      engageEmails,
      engageError,
      sendingEngage,
      successEngageSent,
      engageInputIsTyping,
    } = this.state
    return this.renderInContainer({
      children: (
        <Fragment>
          <EngageViewPanel>
            <EngageViewPicture src={action.picture} />
            <EngageViewContentContainer>
              {!successEngageSent && (
                <EngageViewContentSubtitle>
                  <FormattedMessage id="app.actionsPage.engage.subtitle" />
                </EngageViewContentSubtitle>
              )}

              <EngageViewContentTitle>
                {this.state.action.name}
              </EngageViewContentTitle>
              {successEngageSent ? (
                <EngageViewContenSentMessage>
                  <FormattedMessage id="app.actionsPage.engage.successSent" />
                </EngageViewContenSentMessage>
              ) : (
                <EngageViewContentInputWrap>
                  <MultipleInput
                    values={engageEmails}
                    onChange={this.handleEngageEmailsInputChange}
                    error={engageError}
                    inputComponent={EngageViewInput}
                  />
                  <EngageViewSendButton
                    type="primary"
                    htmlType="submit"
                    loading={sendingEngage}
                    onClick={this.handleSubmitEngage}
                    disabled={engageEmails.length === 0 || engageInputIsTyping}
                  >
                    <FormattedMessage id="app.actionsPage.engage.send" />
                  </EngageViewSendButton>
                </EngageViewContentInputWrap>
              )}
            </EngageViewContentContainer>
          </EngageViewPanel>
        </Fragment>
      ),
      width: 'medium',
      closeBtnColor: colors.white,
    })
  }

  renderInContainer = ({ children, width, height, closeBtnColor }) => {
    const { closeModal, history } = this.props

    return (
      <Container width={width} height={height}>
        {children}
        <CloseButton
          style={{ color: closeBtnColor }}
          onClick={() => {
            history.length > 1 ? history.goBack() : closeModal()
          }}
        >
          <CloseIcon />
        </CloseButton>
      </Container>
    )
  }

  renderLoading = () => {
    return this.renderInContainer({
      children: <Spinner />,
      width: 'large',
    })
  }

  handleCodeSearch = async query => {
    try {
      const response = await apiUser.search(query)
      this.setState({ matchedUsersByCode: response.users })
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

  handleHabitCheckbox = e => {
    this.setState({ isHabit: e.target.checked })
  }

  renderActionProposeView() {
    const { action, matchedUsersByCode, takingAction } = this.state
    const {
      intl: { formatMessage },
    } = this.props

    return this.renderInContainer({
      children: (
        <Fragment>
          <EngageViewPanel>
            <EngageViewPicture src={action.picture} />
            <ProposeView>
              <CheckboxWrapper>
                <CheckboxStyled
                  disabled={!_.get(action, 'habit.canBeHabit')}
                  onChange={this.handleHabitCheckbox}
                >
                  {formatMessage({
                    id: 'app.actions.card.habitCheckbox',
                  })}
                </CheckboxStyled>
              </CheckboxWrapper>

              <ProposeViewContentInputWrap>
                <div>
                  <SearchableInputHeader>
                    <FormattedMessage id="app.actionsPage.oneOfCausesEmails" />
                  </SearchableInputHeader>
                  <SearchableInput
                    onSearch={this.handleCodeSearch}
                    suggestions={matchedUsersByCode}
                    onSelect={this.handleRecruitingEmailsInputChange}
                    onChange={this.handleRecruitingEmailsInputChange}
                  />
                </div>

                <EngageViewSendButton
                  type="primary"
                  htmlType="submit"
                  loading={takingAction}
                  onClick={this.takeAction}
                >
                  <FormattedMessage id="app.header.takeActionButton" />
                </EngageViewSendButton>
              </ProposeViewContentInputWrap>
            </ProposeView>
          </EngageViewPanel>
        </Fragment>
      ),
      width: 'medium',
      closeBtnColor: colors.white,
    })
  }

  render() {
    switch (this.state.step) {
      case ActionModalPageSteps.LOADING:
        return this.renderLoading()
      case ActionModalPageSteps.ACTION_VIEW:
        return this.renderActionView()
      case ActionModalPageSteps.ACTION_TAKEN_REDUCE_FOOTPRINT_VIEW:
        return this.renderActionTakenView({
          type: ActionModalPageSteps.ACTION_TAKEN_REDUCE_FOOTPRINT_VIEW,
        })
      case ActionModalPageSteps.ACTION_TAKEN_INCREACE_HANDPRINT_VIEW:
        return this.renderActionTakenView({
          type: ActionModalPageSteps.ACTION_TAKEN_INCREACE_HANDPRINT_VIEW,
        })
      case ActionModalPageSteps.ENGAGE_VIEW:
        return this.renderEngageView()
      case ActionModalPageSteps.ACTION_TAKEN_MODELING_VIEW:
        return this.renderActionTakenView({
          type: ActionModalPageSteps.ACTION_TAKEN_MODELING_VIEW,
        })
      case ActionModalPageSteps.ACTION_TAKE_PROPOSE:
        return this.renderActionProposeView({
          type: ActionModalPageSteps.ACTION_TAKE_PROPOSE,
        })
    }
  }
}

ActionModalPage.propTypes = {
  closeModal: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired,
  location: PropTypes.object,
  match: PropTypes.object,
  history: PropTypes.object,
  user: PropTypes.object,
  overrides: PropTypes.object,
}

const mapStateToProps = state => ({
  user: state.user.data,
})

export default compose(
  connect(mapStateToProps),
  Form.create(),
  injectIntl,
)(ActionModalPage)
