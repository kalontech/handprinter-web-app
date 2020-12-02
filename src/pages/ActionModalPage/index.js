import React, { useState, useEffect, useContext, Fragment } from 'react'
import { Button, Form } from 'antd'
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
import { DefaultButton } from 'components/Styled'
import Tooltip from 'components/Tooltip'
import MultipleInput from 'components/MultipleInput'
import CloseIcon from 'assets/icons/CloseIcon'
import * as apiUser from 'api/user'
import * as apiOrganization from 'api/organization'

import TakeActionShareProgress from './takeActionShareProgress'
import { UIContextSettings } from '../../context/uiSettingsContext'

import {
  Container,
  ImpactButton,
  LeftPanel,
  RightPanel,
  CloseButton,
  ActionName,
  ActionDescription,
  ActionAssumptions,
  BottomPanel,
  TakenActionPanel,
  TakenActionTitle,
  TakenActionDescription,
  EngageViewPanel,
  ModalContentWrap,
  FormItem,
  EngageViewPicture,
  EngageViewContentContainer,
  EngageViewContentInputWrap,
  EngageViewContentSubtitle,
  EngageViewContentTitle,
  TextError,
  EngageViewSendButton,
  EngageViewInput,
  ProposeViewContentInputWrap,
  ActionViewButtonsWrapper,
  TakenActionAuthWrap,
  TakenActionAuthTitle,
  TakenActionAuthContent,
  TakenActionAuthContentOr,
  EngageViewContenSentMessage,
  TakeActionButton,
  ActionContent,
  CheckboxStyled,
  CheckboxWrapper,
  SearchableInputHeader,
  ProposeView,
} from './styled'
import { createFeedPost } from '../../api/actions'
import { EVENT_TYPES, logEvent } from '../../amplitude'

const ActionModalPageSteps = {
  LOADING: 'LOADING',
  ACTION_VIEW: 'ACTION_VIEW',
  ACTION_TAKEN_REDUCE_FOOTPRINT_VIEW: 'ACTION_TAKEN_REDUCE_FOOTPRINT_VIEW',
  ACTION_TAKEN_INCREACE_HANDPRINT_VIEW: 'ACTION_TAKEN_INCREACE_HANDPRINT_VIEW',
  ENGAGE_VIEW: 'ENGAGE_VIEW',
  ACTION_TAKEN_MODELING_VIEW: 'ACTION_TAKEN_MODELING_VIEW',
  ACTION_TAKE_PROPOSE: 'ACTION_TAKE_PROPOSE',
}

const isSafariMobile = window.navigator.userAgent.match(/iPhone/i)
export const INVITE_ACTION_SLUG = 'invite-people-to-join-handprinter'

function ActionModalPage(props) {
  const { history, closeModal } = props
  const UIContextData = useContext(UIContextSettings)

  const [action, setAction] = useState(null)
  const [step, setStep] = useState(ActionModalPageSteps.LOADING)
  const [takenAction, setTakenAction] = useState(null)
  const [takeActionError, setTakeActionError] = useState(null)
  const [takingAction, setTakingAction] = useState(false)
  const [engageError, setEngageError] = useState(null)
  const [sendingEngage, setSendingEngage] = useState(false)
  const [successEngageSent, setSuccessEngageSent] = useState(false)
  const [engageEmails, setEngageEmails] = useState([])
  const [engageInputIsTyping, setEngageInputIsTyping] = useState(false)
  const [initiatorId, setInitiatorId] = useState('')
  const [isHabit, setIsHabit] = useState(false)
  const [availableFrom, setAvailableFrom] = useState(
    moment().subtract(1, 'days'),
  )
  const [matchedUsersByCode, setMatchedUserByCode] = useState([])
  useEffect(() => {
    const { match } = props
    api.fetchAction({ slug: match.params.slug }).then(({ action }) => {
      setAction(action)
      setStep(ActionModalPageSteps.ACTION_VIEW)
      checkAvailableTakeAction(action && action._id)
    })
  }, [])

  const handleSubmitEngage = async () => {
    setSendingEngage(true)

    try {
      await api.engageAction(action._id, engageEmails, props.user._id)
      setSuccessEngageSent(true)
    } catch (error) {
      setEngageError(error)
      setSendingEngage(false)
    }
  }

  const handleTakeAction = async () => {
    if (action.slug === INVITE_ACTION_SLUG) {
      props.history.push('/account/code')
      return
    }
    if (props.user) {
      setStep(ActionModalPageSteps.ACTION_TAKE_PROPOSE)
    } else {
      takeAction()
    }
  }

  const takeAction = async () => {
    let modalType =
      action.status === ACTION_STATES.MODELING
        ? ActionModalPageSteps.ACTION_TAKEN_MODELING_VIEW
        : ActionModalPageSteps.ACTION_TAKEN_REDUCE_FOOTPRINT_VIEW

    Object.values(action.impacts.handprint).forEach(impact => {
      if (impact.minutes > 0) {
        modalType = ActionModalPageSteps.ACTION_TAKEN_INCREACE_HANDPRINT_VIEW
      }
    })

    setTakenAction(true)
    setTakeActionError(null)

    try {
      const { takenAction } = await api.takeAction(
        action._id,
        isHabit,
        initiatorId,
      )
      logEvent(EVENT_TYPES.ACTION_TAKEN, {
        isHabit,
        markedGiveCredit: !!takenAction.initiatorId,
      })
      setStep(modalType)
      setTakeActionError(null)
      setTakenAction(takenAction)
      setTakingAction(takingAction)
    } catch (error) {
      setTakeActionError(decodeError(error))
      setTakingAction(false)
    }
  }

  const switchToEngageView = () => {
    setStep(ActionModalPageSteps.ENGAGE_VIEW)
  }

  const handleRecruitingEmailsInputChange = initiatorId => {
    setInitiatorId(initiatorId)
  }

  const checkAvailableTakeAction = async actionId => {
    if (!actionId || !props.user) return
    try {
      const res = await api.getTakenActionAvailableFrom({ actionId })
      setAvailableFrom(res.availableFrom)
    } catch (error) {
      console.error(error)
    }
  }

  const LinkRenderer = linkProps => {
    return (
      <a href={linkProps.href} rel="noopener noreferrer" target="_blank">
        {linkProps.children}
      </a>
    )
  }

  const renderActionView = () => {
    const {
      location,
      intl: { formatMessage, locale },
      user,
    } = props
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
    return renderInContainer({
      children: (
        <Fragment>
          <LeftPanel>
            {action.picture && <img src={action.picture} alt="" />}
          </LeftPanel>
          <RightPanel isIphone={isSafariMobile} span={12}>
            <ModalContentWrap isIphone={isSafariMobile}>
              {action.status === ACTION_STATES.PUBLISHED ? (
                <ActionCardLabelSet
                  impacts={action.impacts}
                  impactsInUnits={action.impactsInUnits}
                  mobileFixedWidth
                  showPhysicalValues={UIContextData.showPhysicalValues}
                />
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
                    renderers={{ link: LinkRenderer }}
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
                      renderers={{ link: LinkRenderer }}
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
                          onClick={switchToEngageView}
                        >
                          <FormattedMessage id="app.actions.engage" />
                        </DefaultButton>
                      )}
                      {!location.pathname.includes(ACTIONS_SUBSETS.TAKEN) && (
                        <TakeActionButton
                          type="primary"
                          loading={takingAction}
                          onClick={handleTakeAction}
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

  const renderActionTakenView = ({ type }) => {
    const {
      user,
      closeModal,
      history,
      intl: { formatMessage },
    } = props

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

    if (user)
      return renderInContainer({
        children: <TakeActionShareProgress {...props} action={action} />,
        width: 'medium',
        height: 'auto',
        onClose: () => createFeedPost(action._id),
      })
    return renderInContainer({
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
                showPhysicalValues={UIContextData.showPhysicalValues}
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
                        id={'app.actions.congratulations.login'}
                      />
                    </DefaultButton>
                  </Link>
                  <TakenActionAuthContentOr>
                    <FormattedMessage id="app.actions.congratulations.or" />
                  </TakenActionAuthContentOr>
                  <Link to="/account/register">
                    <Button type="primary">
                      <FormattedMessage
                        id={'app.actions.congratulations.register'}
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

  const handleEngageEmailsInputChange = (emails, isTyping) => {
    setEngageEmails(emails)
    setEngageInputIsTyping(isTyping)
  }

  const renderEngageView = () => {
    return renderInContainer({
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

              <EngageViewContentTitle>{action.name}</EngageViewContentTitle>
              {successEngageSent ? (
                <EngageViewContenSentMessage>
                  <FormattedMessage id="app.actionsPage.engage.successSent" />
                </EngageViewContenSentMessage>
              ) : (
                <EngageViewContentInputWrap>
                  <MultipleInput
                    values={engageEmails}
                    onChange={handleEngageEmailsInputChange}
                    error={engageError}
                    inputComponent={EngageViewInput}
                  />
                  <EngageViewSendButton
                    type="primary"
                    htmlType="submit"
                    loading={sendingEngage}
                    onClick={handleSubmitEngage}
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

  const renderInContainer = ({
    children,
    width,
    height,
    closeBtnColor,
    onClose,
  }) => {
    renderInContainer.propTypes = {
      children: PropTypes.node,
      width: PropTypes.number,
      height: PropTypes.number,
      closeBtnColor: PropTypes.string,
      onClose: PropTypes.func,
    }

    return (
      <Container width={width} height={height}>
        {children}
        <CloseButton
          style={{ color: closeBtnColor }}
          onClick={() => {
            onClose && onClose()
            history.length > 1 ? history.goBack() : closeModal()
          }}
        >
          <CloseIcon />
        </CloseButton>
      </Container>
    )
  }

  const renderLoading = () => {
    return renderInContainer({
      children: <Spinner />,
      width: 'large',
    })
  }

  const handleCodeSearch = async (query, searchByOrganization) => {
    try {
      const response = searchByOrganization
        ? await apiOrganization.search(query)
        : await apiUser.search(query)
      setMatchedUserByCode(
        searchByOrganization ? response.organizations : response.users,
      )
    } catch (error) {
      console.error(error)
    }
  }

  const handleHabitCheckbox = e => {
    setIsHabit(e.target.checked)
  }

  const renderActionProposeView = () => {
    const {
      intl: { formatMessage },
    } = props

    return renderInContainer({
      children: (
        <Fragment>
          <EngageViewPanel>
            <EngageViewPicture src={action.picture} />
            <ProposeView>
              <CheckboxWrapper>
                <CheckboxStyled
                  disabled={!_.get(action, 'habit.canBeHabit')}
                  onChange={handleHabitCheckbox}
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
                    onSearch={handleCodeSearch}
                    suggestions={matchedUsersByCode}
                    onSelect={handleRecruitingEmailsInputChange}
                    onChange={handleRecruitingEmailsInputChange}
                  />
                </div>

                <EngageViewSendButton
                  type="primary"
                  htmlType="submit"
                  loading={takingAction}
                  onClick={takeAction}
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

  switch (step) {
    case ActionModalPageSteps.LOADING:
      return renderLoading()
    case ActionModalPageSteps.ACTION_VIEW:
      return renderActionView()
    case ActionModalPageSteps.ACTION_TAKEN_REDUCE_FOOTPRINT_VIEW:
      return renderActionTakenView({
        type: ActionModalPageSteps.ACTION_TAKEN_REDUCE_FOOTPRINT_VIEW,
      })
    case ActionModalPageSteps.ACTION_TAKEN_INCREACE_HANDPRINT_VIEW:
      return renderActionTakenView({
        type: ActionModalPageSteps.ACTION_TAKEN_INCREACE_HANDPRINT_VIEW,
      })
    case ActionModalPageSteps.ENGAGE_VIEW:
      return renderEngageView()
    case ActionModalPageSteps.ACTION_TAKEN_MODELING_VIEW:
      return renderActionTakenView({
        type: ActionModalPageSteps.ACTION_TAKEN_MODELING_VIEW,
      })
    case ActionModalPageSteps.ACTION_TAKE_PROPOSE:
      return renderActionProposeView({
        type: ActionModalPageSteps.ACTION_TAKE_PROPOSE,
      })
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
