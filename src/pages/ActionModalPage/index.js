import React, { Component, Fragment } from 'react'
import { Row, Button, Icon } from 'antd'
import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'
import { FormattedMessage, injectIntl } from 'react-intl'
import { connect } from 'react-redux'

import { history, handleBackdropClick } from './../../appRouter'
import api from './../../api'
import ActionCardLabelSet from './../../components/ActionCardLabelSet'
import colors from './../../config/colors'
import Spinner from './../../components/Spinner'
import treeImage from './../../assets/actions/tree.png'
import pigImage from './../../assets/actions/pig.png'
import decodeError from './../../utils/decodeError'
import media from './../../utils/mediaQueryTemplate'
import hexToRgba from '../../utils/hexToRgba'
import { FormItem } from './../../components/Styled'

const Container = styled(Row)`
  align-items: center;
  border-radius: 4px;
  display: flex;
  height: 580px;
  justify-content: center;
  overflow: scroll;

  ${props =>
    props.width === 'half' &&
    css`
      width: 460px;
    `};
  ${props =>
    props.width === 'full' &&
    css`
      width: 920px;
      ${media.desktop`
        max-width: 700px;
        height: 100vh;
      `}
      ${media.tablet`
        max-width: 100%;
        flex-direction: column;
        justify-content: flex-start;
      `}
    `};
`

const LeftPanel = styled.div`
  height: 100%;
  width: 50%;

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
  padding: 60px;
  width: 50%;
  ${media.desktop`
    width: 460px;
  `}
  ${media.tablet`
    width: 100%;
    height: auto;
    padding: 30px 15px 120px 15px;
  `}
`

const CloseButton = styled(Icon)`
  align-items: center;
  cursor: pointer;
  display: flex;
  height: 63px;
  justify-content: center;
  position: absolute;
  right: 0;
  top: 0;
  width: 55px;
  font-size: 20px;
  color: ${colors.darkGray};
  ${media.phone`
    color: ${colors.white};
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

const BottomPanel = styled.div`
  width: 100%;
  padding: 18px 15px;
  background: ${colors.white};
  ${media.tablet`
    position: fixed;
    bottom: 0;
    box-shadow: 0 1px 70px 0 ${hexToRgba(`${colors.dark}`, 0.1)};
  `}
`

const TakenActionPanel = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  padding: 60px;

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
  margin-bottom: 25px;
  margin-top: -10px;
`

const ModalContentWrap = styled.div`
  height: 100%;
  display: flex;
  align-items: center
  justify-content: space-between;
  flex-direction: column;
`

const TakeActionButton = styled(Button)`
  width: 100%;
`

const ActionModalPageSteps = {
  LOADING: 'LOADING',
  ACTION_VIEW: 'ACTION_VIEW',
  ACTION_TAKEN_REDUCE_FOOTPRINT_VIEW: 'ACTION_TAKEN_REDUCE_FOOTPRINT_VIEW',
  ACTION_TAKEN_INCREACE_HANDPRINT_VIEW: 'ACTION_TAKEN_INCREACE_HANDPRINT_VIEW',
}

class ActionModalPage extends Component {
  state = {
    action: null,
    step: ActionModalPageSteps.LOADING,
    takenAction: null,
    takingAction: false,
  }

  componentDidMount = async () => {
    await this.fetchAction()
  }

  fetchAction = async () => {
    const { action } = await api.findAction({
      slug: this.props.match.params.actionSlug,
    })
    this.setState({ action, step: ActionModalPageSteps.ACTION_VIEW })
  }

  takeAction = async () => {
    const { user, token } = this.props
    const { action } = this.state
    if (!user) {
      history.push('/account/register')
      return
    }

    let modalType = ActionModalPageSteps.ACTION_TAKEN_REDUCE_FOOTPRINT_VIEW

    Object.values(action.impacts.handprint).forEach(impact => {
      if (impact.minutes > 0) {
        modalType = ActionModalPageSteps.ACTION_TAKEN_INCREACE_HANDPRINT_VIEW
      }
    })

    this.setState({ takeActionError: null, takingAction: true })
    try {
      const { takenAction } = await api.takeAction(action._id, token)
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

  renderActionView = () => {
    const {
      intl: { formatMessage },
    } = this.props
    const { action, takeActionError, takingAction } = this.state
    return this.renderInContainer({
      children: (
        <Fragment>
          <LeftPanel>
            <img src={action.picture} />
          </LeftPanel>
          <RightPanel>
            <ModalContentWrap>
              <div>
                <ActionCardLabelSet
                  impacts={action.impacts}
                  mobileFixedWidth={true}
                />
                <ActionName>{action.name}</ActionName>
                <ActionDescription>{action.description}</ActionDescription>
              </div>
              <BottomPanel>
                <TakeActionButton
                  type="primary"
                  htmlType="submit"
                  loading={takingAction}
                  onClick={this.takeAction}
                >
                  <FormattedMessage id="app.actions.takeAction" />
                </TakeActionButton>
                {takeActionError && (
                  <FormItem
                    validateStatus="error"
                    help={formatMessage({ id: takeActionError })}
                  />
                )}
              </BottomPanel>
            </ModalContentWrap>
          </RightPanel>
        </Fragment>
      ),
      width: 'full',
    })
  }

  renderActionTakenView = ({ type }) => {
    const { action } = this.state
    return this.renderInContainer({
      children: (
        <Fragment>
          <TakenActionPanel>
            {type ===
            ActionModalPageSteps.ACTION_TAKEN_REDUCE_FOOTPRINT_VIEW ? (
              <img src={pigImage} />
            ) : (
              <img src={treeImage} />
            )}
            <TakenActionTitle>
              <FormattedMessage id="app.actions.congratulations" />
            </TakenActionTitle>
            <TakenActionDescription>
              {type ===
              ActionModalPageSteps.ACTION_TAKEN_REDUCE_FOOTPRINT_VIEW ? (
                <FormattedMessage id="app.actions.reduceFootprint" />
              ) : (
                <FormattedMessage id="app.actions.handprintIncreased" />
              )}
            </TakenActionDescription>
            <ActionCardLabelSet
              impacts={action.impacts}
              mobileFixedWidth={true}
              hideTooltip={true}
            />
          </TakenActionPanel>
        </Fragment>
      ),
      width: 'half',
    })
  }

  renderInContainer = ({ children, width }) => (
    <Container width={width}>
      {children}
      <CloseButton
        type="close"
        onClick={() => handleBackdropClick({ parentPath: '/actions' })}
      />
    </Container>
  )

  renderLoading = () => {
    return this.renderInContainer({
      children: <Spinner />,
      width: 'full',
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
    }
  }
}

ActionModalPage.propTypes = {
  closeModal: PropTypes.func.isRequired,
  intl: PropTypes.object.isRequired,
  match: {
    params: {
      actionSlug: PropTypes.string.isRequired,
    },
  },
  user: PropTypes.oneOf([null, PropTypes.object]),
  token: PropTypes.string,
}

const mapStateToProps = state => ({
  user: state.user.data,
  token: state.account.token,
})

export default connect(mapStateToProps)(injectIntl(ActionModalPage))
