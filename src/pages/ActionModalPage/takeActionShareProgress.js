import React, { Fragment } from 'react'
import { FormattedMessage } from 'react-intl'
import styled from 'styled-components'
import { DefaultButton } from 'components/Styled'

import colors from 'config/colors'
import Feed from 'components/Feed'

import pigImage from 'assets/actions/pig.png'

import { TakenActionPanel, TakenActionAuthContent } from '.'

const TakenActionTitle = styled.text`
  font-family: Noto Serif;
  font-style: normal;
  font-weight: bold;
  font-size: 33px;
  color: ${colors.dark};
  text-align: center;
  padding: 0px 60px;
`

const TakenActionDescription = styled.text`
  font-family: Noto Sans;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  color: ${colors.dark};
  text-align: center;
  padding: 0px 60px 10px 60px;
`

const PostWrapper = styled.div`
  margin: 0px 0px;
  width: 85%;
  overflow: scroll;
  height: 350px;
  padding: 3px;
  display: flex;
  flex-direction: column;
  justify-content: center;
`

const Picture = styled.img`
  height: 140px;
`

export const TakenActionAuthWrap = styled.div`
  width: 100%;
  text-align: center;
  background: ${colors.lightGray};
  padding: 15px;
  color: ${colors.darkGray};
`

function takeActionShareProgress(props) {
  const { history, closeModal, action } = props
  return (
    <Fragment>
      <TakenActionPanel>
        <Picture src={pigImage} alt="" />
        <TakenActionTitle>
          <FormattedMessage id="app.actions.share.progress" />
        </TakenActionTitle>
        <TakenActionDescription>
          <FormattedMessage id="app.actions.share.progress.reduce.fp" />
        </TakenActionDescription>
        <PostWrapper>
          <Feed
            hideFlatFeed
            readFrom={{
              feedGroup: 'timeline',
              userId: 'world',
            }}
            verb="comment action"
            context={{ action }}
            onSuccess={closeModal}
          />
        </PostWrapper>
        <TakenActionAuthWrap>
          <TakenActionAuthContent>
            <DefaultButton
              type="primary"
              htmlType="submit"
              onClick={() => {
                history.length > 1 ? history.goBack() : closeModal()
              }}
            >
              <FormattedMessage id="app.actions.share.progress.skip" />
            </DefaultButton>
          </TakenActionAuthContent>
        </TakenActionAuthWrap>
      </TakenActionPanel>
    </Fragment>
  )
}

takeActionShareProgress.propTypes = {
  history: Object,
  action: Object,
  closeModal: Function,
}

export default takeActionShareProgress
