import React, { Component, Fragment } from 'react'
import { Row, Col, Button } from 'antd'
import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'
import { FormattedMessage, injectIntl } from 'react-intl'
import { connect } from 'react-redux'

import { history } from './../../appRouter'
import api from './../../api'
import ActionCardLabelSet from './../../components/ActionCardLabelSet'
import colors from './../../config/colors'
import clearIcon from './../../assets/icons/clear.svg'
import Spinner from './../../components/Spinner'
import treeImage from './../../assets/actions/tree.png'
import decodeError from './../../utils/decodeError'
import { FormItem } from './../../components/Styled'

const Container = styled(Row)`
  align-items: center;
  border-radius: 4px;
  display: flex;
  height: 580px;
  justify-content: center;
  overflow: hidden;

  ${props =>
    props.width === 'half' &&
    css`
      width: 460px;
    `};
  ${props =>
    props.width === 'full' &&
    css`
      width: 920px;
    `};
`

const LeftPanel = styled(Col)`
  height: 100%;

  img {
    height: 100%;
    object-fit: cover;
    width: 100%;
  }
`

const RightPanel = styled(Col)`
  height: 100%;
  padding: 60px;
`

const CloseButton = styled.div`
  align-items: center;
  cursor: pointer;
  display: flex;
  height: 50px;
  justify-content: center;
  position: absolute;
  right: 0;
  top: 0;
  width: 50px;
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
  bottom: 60px;
  left: 60px;
  position: absolute;
  right: 60px;
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

const ActionModalPageSteps = {
  LOADING: 'LOADING',
  ACTION_VIEW: 'ACTION_VIEW',
  ACTION_TAKEN_VIEW: 'ACTION_TAKEN_VIEW',
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
    if (!user) {
      history.push('/account/register')
      return
    }

    this.setState({ takeActionError: null, takingAction: true })
    try {
      const { takenAction } = await api.takeAction(this.state.action._id, token)
      this.setState({
        step: ActionModalPageSteps.ACTION_TAKEN_VIEW,
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
          <LeftPanel span={12}>
            <img src={action.picture} />
          </LeftPanel>
          <RightPanel span={12}>
            <ActionCardLabelSet impacts={action.impacts} />
            <ActionName>{action.name}</ActionName>
            <ActionDescription>{action.description}</ActionDescription>
            <BottomPanel>
              <Button
                type="primary"
                htmlType="submit"
                style={{ width: '100%' }}
                loading={takingAction}
                onClick={this.takeAction}
              >
                <FormattedMessage id="app.actions.takeAction" />
              </Button>
              {takeActionError && (
                <FormItem
                  validateStatus="error"
                  help={formatMessage({ id: takeActionError })}
                />
              )}
            </BottomPanel>
          </RightPanel>
        </Fragment>
      ),
      width: 'full',
    })
  }

  renderActionTakenView = () => {
    const { action } = this.state
    return this.renderInContainer({
      children: (
        <Fragment>
          <TakenActionPanel>
            <img src={treeImage} />
            <TakenActionTitle>
              <FormattedMessage id="app.actions.congratulations" />
            </TakenActionTitle>
            <TakenActionDescription>
              <FormattedMessage id="app.actions.handprintIncreased" />
            </TakenActionDescription>
            <ActionCardLabelSet impacts={action.impacts} />
          </TakenActionPanel>
        </Fragment>
      ),
      width: 'half',
    })
  }

  renderInContainer = ({ children, width }) => {
    const { closeModal } = this.props
    return (
      <Container width={width}>
        {children}
        <CloseButton onClick={closeModal}>
          <img src={clearIcon} />
        </CloseButton>
      </Container>
    )
  }

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
      case ActionModalPageSteps.ACTION_TAKEN_VIEW:
        return this.renderActionTakenView()
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
