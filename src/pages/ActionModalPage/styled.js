import { Row, Button, Form, Input } from 'antd'
import styled, { css } from 'styled-components'
import media, { sizes } from 'utils/mediaQueryTemplate'
import hexToRgba from 'utils/hexToRgba'
import colors from 'config/colors'
import { DefaultButton, Checkbox } from 'components/Styled'

export const Container = styled(Row)`
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

export const ImpactButton = styled(DefaultButton)`
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

export const LeftPanel = styled.div`
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

export const RightPanel = styled.div`
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

export const CloseButton = styled.button`
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

export const ActionName = styled.h1`
  color: ${colors.dark};
  font-size: 28px;
  line-height: 35px;
  margin-top: 20px;
`

export const ActionDescription = styled.p`
  color: ${colors.darkGray};
  font-size: 14px;
  line-height: 20px;
  margin-top: 12px;
`

export const ActionAssumptions = styled(ActionDescription)`
  font-style: italic;
`

export const BottomPanel = styled.div`
  position: absolute;
  backface-visibility: hidden;
  bottom: 32px;
  width: 100%;
  max-width: calc(339px + 30px);

  @media screen and (max-width: ${sizes.tablet}px) and (orientation: landscape) {
    position: absolute;
  }

  ${media.tablet`
    max-width: initial;
    bottom: 0px;
  `}
`

export const TakenActionPanel = styled.div`
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

export const TakenActionTitle = styled.h1`
  font-family: 'Noto Serif', serif;
  font-size: 37px;
  line-height: 46px;
`

export const TakenActionDescription = styled.p`
  font-size: 16px;
  line-height: 22px;
  margin: -10px 30px 25px 30px;
  text-align: center;
`

export const EngageViewPanel = styled.div`
  height: 100%;
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: column;
  overflow: hidden;
`

export const ModalContentWrap = styled.div`
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

export const FormItem = styled(Form.Item)`
  margin-bottom: 0;
`

export const EngageViewPicture = styled.div`
  height: calc(592px / 2);
  width: 101%;
  overflow: hidden;
  background-image: url(${props => props.src});
  background-size: cover;
  background-position: center center;
`

export const EngageViewContentContainer = styled.div`
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

export const EngageViewContentInputWrap = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  width: 100%;
`

export const EngageViewContentSubtitle = styled.p`
  color: ${colors.darkGray};
  font-size: 14px;
  font-family: 'Noto Sans', serif;
`

export const EngageViewContentTitle = styled.p`
  color: ${colors.dark};
  font-size: 19px;
  font-family: 'Noto Serif', serif;
  margin-bottom: 20px;
`

export const TextError = styled.p`
  color: ${colors.ocean};
  font-size: 14px;
`

export const EngageViewSendButton = styled(Button)`
  width: 100%;
  height: 47px;
`

export const EngageViewInput = styled(Input)`
  height: 47px;
  margin-right: 5px;
  color: ${colors.darkGray};
`

export const ProposeViewContentInputWrap = styled.div`
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  flex: 1;
  margin-top: 20px;
`

export const ActionViewButtonsWrapper = styled.div`
  background: ${colors.white};
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

export const TakenActionAuthWrap = styled.div`
  width: 100%;
  text-align: center;
  background: ${colors.lightGray};
  padding: 15px;
  color: ${colors.darkGray};
  margin-top: 60px;
`

export const TakenActionAuthTitle = styled.div`
  margin-bottom: 15px;
`

export const TakenActionAuthContent = styled.div`
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

export const TakenActionAuthContentOr = styled.span`
  margin: 0 15px;
  ${media.phone`
    margin: 15px 0;
  `}
`

export const EngageViewContenSentMessage = styled.div`
  font-size: 18px;
  color: ${colors.green};
`

export const TakeActionButton = styled(Button)`
  width: 100%;
  ${props =>
    props.isLoggedIn &&
    `
    margin-left: 15px
  `}
`

export const ActionContent = styled.div`
  height: 400px;
  overflow: scroll;
  padding: 0 60px 60px 60px;
  width: 100%;
`

export const CheckboxStyled = styled(Checkbox)`
  color: ${colors.dark};
`

export const CheckboxWrapper = styled.div`
  border-bottom: 1px solid ${colors.gray};
  padding-bottom: 20px;
`

export const SearchableInputHeader = styled.div`
  margin-bottom: 5px;
`

export const ProposeView = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 30px 0px;
`
