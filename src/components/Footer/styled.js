import { Layout, Row, Col } from 'antd'
import { BlockContainer } from 'components/Styled'
import FooterLanguageSelector from 'components/FooterLanguageSelector'
import colors from 'config/colors'
import hexToRgba from 'utils/hexToRgba'
import media from 'utils/mediaQueryTemplate'
import styled, { css } from 'styled-components'

export const FooterWrap = styled(Layout.Footer)`
  padding: 0;
`

export const FooterContent = styled.section`
  padding: 0;
  background-color: ${colors.dark};
  color: ${colors.white};
`

export const Wrap = styled(BlockContainer)`
  padding: 80px 0 60px;
  overflow: hidden;
  ${media.phone`
    padding-top: 40px;
    padding-bottom: 40px;
  `};
`

export const FooterMenu = styled.ul`
  list-style: none;
  padding-left: 0;

  a {
    text-decoration: none;
    line-height: 36px;
    font-size: 16px;
    color: ${hexToRgba(colors.white, 0.7)};
    letter-spacing: -0.25px;
    &:hover {
      color: ${colors.white};
    }
  }

  ${media.tablet`
    margin-left: 10px;
  `}

  ${media.phone`
    margin-right: 10px;
  `}
`

export const FooterImage = styled.div`
  margin-top: 15px;
  margin-bottom: 15px;
  ${({ desktop }) =>
    desktop
      ? css`
          ${media.largeDesktop`
        display: none;
      `}
        `
      : css`
          display: none;
          ${media.largeDesktop`
        display: block;
      `}
          ${media.phone`
        display: none;
      `}
        `}

  ${media.largeDesktop`
    margin-top: 0;
    margin-bottom: 40px;
  `};
  ${media.phone`
    margin-bottom: -20px;
  `};
`

export const CopyrightBlock = styled.div`
  color: ${colors.white};
  background-color: ${colors.footerDropdownBg};
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px;
`

export const Copyright = styled.p`
  font-size: 14px;
  color: ${hexToRgba(colors.white, 0.43)};
`

export const RowWrapper = styled(Row)`
  margin-bottom: 20px;
  ${media.phone`
    margin-top: 40px;
  `};
`

export const LangsWrap = styled(Col)`
  ${media.largeDesktop`
    display: flex;
    align-items: center;
  `};
  ${media.phone`
    display: block;
  `};

  ${({ largeDesktopPhone, tablet }) =>
    largeDesktopPhone
      ? css`
          ${media.largeDesktop`
        display: none;
      `}
          ${media.phone`
        display: block;
      `}
        `
      : tablet
      ? css`
          display: none;
          ${media.largeDesktop`
        display: block;
      `}
          ${media.phone`
        display: none;
      `}
        `
      : ''}
`

export const UnitsWrap = styled(Col)`
  ${media.largeDesktop`
  display: flex;
  align-items: center;
`};
  ${media.phone`
  display: block;
`};

  ${({ largeDesktopPhone, tablet }) =>
    largeDesktopPhone
      ? css`
          ${media.largeDesktop`
      display: none;
    `}
          ${media.phone`
      display: block;
    `}
        `
      : tablet
      ? css`
          display: none;
          ${media.largeDesktop`
      display: block;
    `}
          ${media.phone`
      display: none;
    `}
        `
      : ''}
`

export const Langs = styled(FooterLanguageSelector)`
  ${media.phone`
    max-width: 100%;
    margin-bottom: 20px;
  `};
`

export const Decription = styled.p`
  text-transform: uppercase;
  font-family: Noto Sans;
  font-style: normal;
  font-weight: bold;
  font-size: 10px;
  line-height: 20px;
  text-transform: uppercase;
  color: ${hexToRgba(colors.white, 0.43)};
  ${media.largeDesktop`
    margin-bottom: 30px;
  `}
`

export const DecriptionLink = styled.a`
  color: ${hexToRgba(colors.white, 0.43)};
  text-decoration: underline;
  &:hover,
  &:focus,
  &:active {
    color: ${hexToRgba(colors.white, 0.43)};
  }
`

export const SocialContainer = styled.div`
  margin-left: 12px;
  margin-top: 40px;
`

export const SocialImage = styled.img`
  height: 34px;
  width: 34px;
  margin-right: 30px;
`

export const SocialLink = styled.a``
