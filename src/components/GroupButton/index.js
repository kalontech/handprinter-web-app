import React from 'react'
import PropTypes from 'prop-types'
import { injectIntl, intlShape } from 'react-intl'
import styled from 'styled-components'

import colors from 'config/colors'
import hexToRgba from 'utils/hexToRgba'
import { SecondaryButton } from 'components/Styled'

const ButtonToggleable = styled(SecondaryButton)`
  position: relative;
  max-width: 170px;

  span {
    width: 100%;
    height: 100%;
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  span:nth-last-child(1) {
    opacity: 0;
    width: 0;
  }

  :hover,
  :focus,
  :active {
    background-color: ${colors.orange};
    color: ${colors.white};

    span:nth-last-child(2) {
      opacity: 0;
      width: 0;
    }

    span:nth-last-child(1) {
      opacity: 1;
      width: 100%;
    }
  }

  &.ant-btn-loading {
    background-color: ${colors.orange};
    color: ${colors.white};
  }

  &.ant-btn-loading span:nth-last-child(1) {
    opacity: 1;
    width: 100%;
  }

  &.ant-btn-loading span:nth-last-child(2) {
    opacity: 0;
    width: 0;
  }

  :disabled {
    pointer-events: none;
  }
`

const ButtonsWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  opacity: ${({ disabled }) => (disabled ? '0.5' : '1')};

  button {
    min-width: 70px;
    flex-grow: 1;
  }

  button:first-child {
    margin-right: 10px;
  }
`

const ButtonJoin = styled(SecondaryButton)`
  color: ${({ color = colors.ocean }) => color};
  background-color: ${({ bgColor = colors.lightGray }) => bgColor};

  &.ant-btn-loading,
  &:hover {
    color: ${({ hoverColor = colors.ocean }) => hoverColor};
    background-color: ${({ hoverBgColor = colors.whiteSmoke }) => hoverBgColor};
  }
`

const ButtonRequest = styled(SecondaryButton)`
  color: ${colors.blue};
  background-color: ${colors.gentlyBlue};

  &.ant-btn-loading,
  &:hover {
    color: ${colors.blue};
    background-color: ${hexToRgba(colors.blue, 0.2)};
  }
`

const ButtonDelete = styled(SecondaryButton)`
  background-color: ${colors.orange};

  &.ant-btn-loading,
  :hover {
    background-color: ${colors.red};
  }
`

export const BUTTON_TYPES = {
  leave: 'leave',
  invited: 'invited',
  join: 'join',
  request: 'request',
  delete: 'delete',
}

class GroupButton extends React.PureComponent {
  static propTypes = {
    type: PropTypes.oneOf(Object.values(BUTTON_TYPES)),
    intl: intlShape.isRequired,
    loading: PropTypes.bool,
    disabled: PropTypes.bool,
    onClick: PropTypes.oneOfType([
      PropTypes.func,
      PropTypes.shape({ onAccept: PropTypes.func, onDeny: PropTypes.func }),
    ]),
  }

  static defaultProps = {
    type: BUTTON_TYPES.join,
  }

  render() {
    const { type, intl, loading, onClick, disabled } = this.props

    switch (type) {
      case BUTTON_TYPES.leave: {
        return (
          <ButtonToggleable
            disabled={disabled}
            loading={loading}
            onClick={onClick}
          >
            <span>
              {intl.formatMessage({
                id: 'app.pages.groups.youAreMember',
              })}
            </span>
            <span>
              {intl.formatMessage({
                id: 'app.pages.groups.leave',
              })}
            </span>
          </ButtonToggleable>
        )
      }
      case BUTTON_TYPES.join: {
        return (
          <ButtonJoin loading={loading} onClick={onClick}>
            {intl.formatMessage({ id: 'app.pages.groups.join' })}
          </ButtonJoin>
        )
      }
      case BUTTON_TYPES.request: {
        return (
          <ButtonRequest
            loading={loading}
            onClick={onClick}
            disabled={disabled}
          >
            {intl.formatMessage({
              id: disabled
                ? 'app.pages.groups.pending'
                : 'app.pages.groups.sendRequest',
            })}
          </ButtonRequest>
        )
      }
      case BUTTON_TYPES.delete: {
        return (
          <ButtonDelete loading={loading} disabled={disabled} onClick={onClick}>
            {intl.formatMessage({ id: 'app.actions.card.delete' })}
          </ButtonDelete>
        )
      }
      case BUTTON_TYPES.invited: {
        return (
          <ButtonsWrap disabled={disabled}>
            <ButtonJoin
              loading={loading}
              disabled={disabled}
              onClick={onClick.onAccept}
              color={colors.white}
              bgColor={colors.ocean}
              hoverColor={colors.white}
              hoverBgColor={colors.btnSecondaryHover}
            >
              {intl.formatMessage({
                id: 'app.pages.groups.join',
              })}
            </ButtonJoin>

            <ButtonRequest onClick={onClick.onDeny} disabled={disabled}>
              {intl.formatMessage({
                id: 'app.pages.groups.deny',
              })}
            </ButtonRequest>
          </ButtonsWrap>
        )
      }
    }
  }
}

export default injectIntl(GroupButton)
