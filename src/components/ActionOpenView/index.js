import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { injectIntl, intlShape } from 'react-intl'

import colors from 'config/colors'
import media, { sizes } from 'utils/mediaQueryTemplate'
import hexToRgba from 'utils/hexToRgba'
import { PrimaryButton } from 'components/Styled'

const Block = styled.section`
  width: 93vw;
  max-width: 930px;
  height: 580px;
  display: flex;
  justify-content: space-between;
  background-color: ${colors.white};
  box-shadow: 0 1px 10px rgba(52, 68, 66, 0.08);
  border-radius: 4px;
  overflow: hidden;

  ${media.tablet`
    height: initial;
    min-height: 100%;
    width: 100vw;
  `}

  ${media.phone`
    flex-direction: column;
    border-radius: 0; 
  `}
`

const ImgWrap = styled.div`
  width: 50%;
  overflow: hidden;

  ${media.phone`
    width: 100%;
    height: 210px;
  `}

  img {
    min-width: 100%;
    min-height: 100%;
  }
`

const Info = styled.div`
  margin: 0 auto;
  padding: 50px 60px;
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  ${media.tablet`
    padding: 50px 20px;
  `}

  ${media.phone`
    width: 100%;
    flex-grow: 1;
  `}
`

const Title = styled.h3`
  color: ${colors.dark};
  font-size: 28px;
  line-height: 1.25;
  margin-bottom: 12px;
`

const Description = styled.p`
  color: ${colors.darkGray};
  font-size: 14px;
  line-height: 1.43;
  overflow-y: auto;

  @media screen and (max-height: ${sizes.phone}px) and (orientation: landscape) {
    max-height: 30vh;
  }

  ${media.phone`
    max-height: 30vh;
  `}
`

const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 15px;
`

const ButtonCancel = styled(PrimaryButton)`
  min-width: 47%;
  color: ${colors.ocean};
  background-color: ${hexToRgba(colors.ocean, 0.1)};

  &:active,
  &:focus,
  &:hover {
    color: ${colors.ocean};
    background-color: ${hexToRgba(colors.ocean, 0.3)};
  }
`

const ButtonSuccess = styled(PrimaryButton)`
  min-width: 50%;
  text-transform: capitalize;
`

class ActionOpenView extends React.PureComponent {
  static propTypes = {
    action: PropTypes.shape({
      picture: PropTypes.string,
    }),
    success: PropTypes.shape({
      onClick: PropTypes.func,
      message: PropTypes.string,
    }),
    cancel: PropTypes.shape({
      onClick: PropTypes.func,
      message: PropTypes.string,
    }),
    intl: intlShape.isRequired,
  }

  static defaultProps = {
    action: {},
  }

  render() {
    const { action, success, cancel, intl } = this.props

    return (
      <Block>
        <ImgWrap>
          {action.picture && <img src={action.picture} alt="action picture" />}
        </ImgWrap>
        <Info>
          <div>
            <Title>
              {(action.translatedName && action.translatedName[intl.locale]) ||
                action.name}
            </Title>
            <Description>
              {(action.translatedDescription &&
                action.translatedDescription[intl.locale]) ||
                action.description}
            </Description>
          </div>

          <ButtonsWrapper>
            {cancel && (
              <ButtonCancel onClick={cancel.onClick}>
                {cancel.message}
              </ButtonCancel>
            )}

            {success && (
              <ButtonSuccess type="primary" onClick={success.onClick}>
                {success.message}
              </ButtonSuccess>
            )}
          </ButtonsWrapper>
        </Info>
      </Block>
    )
  }
}

export default injectIntl(ActionOpenView)
