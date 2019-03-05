import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import styled, { css } from 'styled-components'
import Popover from 'antd/lib/popover'

import ExpandMoreIcon from 'assets/icons/ExpandMoreIcon'
import colors from 'config/colors'
import media from 'utils/mediaQueryTemplate'
import hexToRgba from 'utils/hexToRgba'
import { DefaultButton } from 'components/Styled'

const Block = styled.nav`
  padding: 6px 0;
  background-color: ${colors.dark};
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;

  ${media.phone`
    padding: 3px 0;  
  `}
`

const Container = styled.div`
  max-width: 1180px;
  flex-grow: 1;
  
  ${({ hasButton }) =>
    hasButton &&
    css`
      display: flex;
      justify-content: space-between;
      align-items: center;
    `}
  

  ${media.largeDesktop`
    padding-left: 34px;
    padding-right: 34px;
  `}

  ${media.phone`
    padding-left: 15px;
    padding-right: 15px;  
  `}
`

const List = styled.ul`
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: ${({ justify }) => justify};
  align-items: center;
  min-height: 44px;

  ${media.tablet`
    flex-direction: column;
    min-height: initial;
    align-items: baseline;
  `}
`

const ListItem = styled.li`
  display: inline-flex;
  align-items: center;

  &:not(:last-child) {
    margin-right: 45px;
  }

  ${media.tablet`
    width: 100%;

    &:not(:last-child) {
      margin-right: 0;
    }
  `}
`

const NavLinkStyled = styled(NavLink)`
  display: inline-flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 14px;
  color: ${colors.darkGray};

  &:hover {
    color: ${colors.darkGray};
  }

  ${media.tablet`
    width: 100%;
    height: 40px;
    padding: 4px 50px 4px 10px;
  `}

  i {
    margin-right: 6px;
  }
`

const ButtonToggle = styled.button`
  padding: 0;
  margin: 0;
  align-items: center;
  justify-content: center;
  display: inline-flex;
  color: ${colors.white};
  background-color: ${colors.dark};
  font-size: 14px;
  min-height: 44px;
  border: 0;
  outline: 0;
  cursor: pointer;

  ${media.tablet`
    background-color: transparent;
  `}

  i:first-child {
    margin-right: 6px;
  }

  i:nth-child(2) {
    max-height: 24px;
    transition: transform 0.3s linear;
    transform: ${({ rotateIcon }) =>
      rotateIcon ? 'rotate(-180deg)' : 'rotate(0deg)'};
  }

  .ant-popover-inner-content {
    padding: 6px;
  }
`

const Button = styled(DefaultButton)`
  background-color: ${hexToRgba(colors.white, 0.1)};
  color: ${colors.white};
  height: 44px;
  min-width: 134px;
  display: inline-flex;

  &&:hover,
  &&:active,
  &&:focus {
    background-color: ${hexToRgba(colors.white, 0.15)};
    color: ${colors.white};
  }
`

export const TABS_TYPES = {
  default: 'default',
  select: 'select',
}

export default class TabsSecondary extends React.PureComponent {
  static propTypes = {
    isOpen: PropTypes.bool,
    toggleVisible: PropTypes.func,
    listType: PropTypes.oneOf(Object.values(TABS_TYPES)),
    list: PropTypes.arrayOf(
      PropTypes.shape({
        to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
        icon: PropTypes.func,
        text: PropTypes.string,
        active: PropTypes.bool,
      }),
    ),
    button: PropTypes.shape({
      text: PropTypes.string,
      onClick: PropTypes.func,
    }),
    justify: PropTypes.oneOf(['flex-start', 'center']),
    children: PropTypes.node,
  }

  static defaultProps = {
    listType: 'default',
    list: [],
    isOpen: false,
    toggleVisible: () => {},
    button: undefined,
    justify: 'flex-start',
  }

  $button = React.createRef()

  render() {
    const {
      isOpen,
      toggleVisible,
      list,
      listType,
      button,
      justify,
      children,
    } = this.props

    const linksList = (
      <List justify={justify}>
        {list.map(item => (
          <ListItem key={item.to} onClick={() => toggleVisible(false)}>
            <NavLinkStyled
              to={item.to}
              activeStyle={{
                textDecoration: 'none',
                color:
                  listType === TABS_TYPES.default ? colors.white : colors.dark,
                backgroundColor:
                  listType === TABS_TYPES.default
                    ? 'transparent'
                    : colors.lightGray,
              }}
            >
              <item.icon />
              {item.text}
            </NavLinkStyled>
          </ListItem>
        ))}
      </List>
    )
    const activeItem = list.find(item => item.active)

    return (
      <React.Fragment>
        <Block>
          <Container hasButton={Boolean(button)}>
            {
              {
                default: linksList,
                select: (
                  <Popover
                    content={linksList}
                    trigger="click"
                    placement="bottomLeft"
                    visible={isOpen}
                    onVisibleChange={toggleVisible}
                    overlayStyle={{
                      paddingTop: '14px',
                      left: '15px',
                      top: '37px',
                    }}
                    getPopupContainer={() => this.$button.current}
                  >
                    <ButtonToggle
                      onClick={() => toggleVisible(!isOpen)}
                      rotateIcon={isOpen}
                      ref={this.$button}
                    >
                      <activeItem.icon color={colors.white} />
                      {activeItem.text}
                      <ExpandMoreIcon iconColor={colors.green} />
                    </ButtonToggle>
                  </Popover>
                ),
              }[listType]
            }

            {button && <Button onClick={button.onClick}>{button.text}</Button>}
          </Container>
        </Block>

        {children && React.Children.toArray(children)[list.indexOf(activeItem)]}
      </React.Fragment>
    )
  }
}
