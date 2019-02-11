import React, { Fragment } from 'react'
import styled from 'styled-components'
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router-dom'

import {
  BlockContainer,
  PrimaryButton,
  DefaultButton,
  BlockTitle,
} from 'components/Styled'
import colors from 'config/colors'
import media from 'utils/mediaQueryTemplate'
import { CONTACT_DATA } from 'utils/constants'

import notFoundImg from './assets/404.png'

const Wrapper = styled(BlockContainer)`
  padding: 120px 0;
  text-align: center;
  ${media.desktop`
    padding-top: 80px;
    padding-bottom: 80px;
  `};
  ${media.phone`
    padding-top: 60px;
    padding-bottom: 60px;
  `};
`
const Title = styled(BlockTitle)`
  margin-bottom: 15px;
`
const Text = styled.div`
  line-height: 30px;
  font-size: 22px;
  color: ${colors.darkGray};
`
const Links = styled.div`
  margin-top: 50px;
  margin-bottom: 70px;
  display: flex;
  align-items: center;
  justify-content: center;
  .ant-btn {
    min-width: 160px;
  }
  ${Text} {
    margin: 10px 15px;
  }
  ${media.phone`
    flex-direction: column;
    margin: 30px auto;
  `};
`
const Image = styled.img`
  display: block;
  max-width: 100%;
  margin: 0 auto;
`

const NotFoundPage = () => {
  return (
    <Fragment>
      <Wrapper>
        <Title>
          <FormattedMessage id="app.NotFoundPage.Title" />
        </Title>
        <Text>
          <FormattedMessage id="app.NotFoundPage.Description" />
        </Text>
        <Links>
          <Link to="/">
            <PrimaryButton type="primary" size="large">
              <FormattedMessage id="app.NotFoundPage.Link1" />
            </PrimaryButton>
          </Link>
          <Text>
            <FormattedMessage id="app.NotFoundPage.Text" />
          </Text>
          <a href={CONTACT_DATA.EMAIL}>
            <DefaultButton type="primary" size="large">
              <FormattedMessage id="app.NotFoundPage.Link2" />
            </DefaultButton>
          </a>
        </Links>
        <Image src={notFoundImg} alt="" />
      </Wrapper>
    </Fragment>
  )
}

export default NotFoundPage
