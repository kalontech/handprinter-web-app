import React, { Component } from 'react'
import styled, { css } from 'styled-components'
import { injectIntl, FormattedMessage } from 'react-intl'
import { Menu, Dropdown } from 'antd'
import { animateScroll } from 'react-scroll/modules'
import {
  StreamApp,
  StatusUpdateForm,
  FlatFeed,
  Activity,
} from 'react-activity-feed'
import { compose } from 'redux'
import { connect } from 'react-redux'

import { BlockContainer } from 'components/Styled'
import { ActivityFooter, ActivityHeader } from 'components/GetStreamComponents'
import colors from 'config/colors'
import media from 'utils/mediaQueryTemplate'
import ExpandMoreIcon from 'assets/icons/ExpandMoreIcon'

const NEWS_RANGES = {
  ME: 'me',
  NETWORK: 'network',
  WORLD: 'world',
}

const PageContainer = styled.div`
  background-color: ${colors.lightGray};
  padding: 40px 0;
  flex: 1;

  ${media.phone &&
    css`
      padding-bottom: 50px;
    `}
`

const NewsHeader = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 20px;
`

const NewsTitle = styled.h1`
  font-size: 28px;
  margin-bottom: 0;
  line-height: 35px;

  ${media.phone &&
    css`
      display: none;
    `}
`

const NewsTitleMob = styled(NewsTitle)`
   display: none;

    ${media.phone &&
      css`
        display: block;
      `}
  }
`

const DropdownLink = styled.a`
  font-size: 16px;
  line-height: 30px;
  color: ${colors.darkGray};
  display: flex;
  align-items: center;

  .anticon {
    color: ${colors.green};
  }
`

class NewsPage extends Component {
  state = {
    range: NEWS_RANGES.NETWORK,
  }

  componentDidMount() {
    animateScroll.scrollToTop()
  }

  handleRangeSelectorSelect = ({ key }) => {
    this.setState({ news: [], page: 1, range: key })
  }

  render() {
    const {
      REACT_APP_GETSTREAM_API_KEY,
      REACT_APP_GETSTREAM_APP_ID,
    } = process.env
    const { user } = this.props
    const { range } = this.state

    const flatFeedOptions = {
      Activity: props => {
        return (
          <Activity
            {...props}
            Footer={() => {
              return <ActivityFooter {...props} />
            }}
            Header={() => {
              return <ActivityHeader {...props} />
            }}
          />
        )
      },
      notify: true,
    }

    return (
      <PageContainer>
        <BlockContainer>
          <NewsHeader>
            <NewsTitle>
              <FormattedMessage id="app.newsPage.title" />
            </NewsTitle>
            <NewsTitleMob>
              <FormattedMessage id="app.newsPage.titleMobile" />
            </NewsTitleMob>
            <Dropdown
              overlay={
                <Menu onClick={this.handleRangeSelectorSelect}>
                  <Menu.Item key={NEWS_RANGES.ME}>
                    <FormattedMessage id="app.newsPage.ranges.me" />
                  </Menu.Item>
                  <Menu.Item key={NEWS_RANGES.NETWORK}>
                    <FormattedMessage id="app.newsPage.ranges.network" />
                  </Menu.Item>
                  <Menu.Item key={NEWS_RANGES.WORLD}>
                    <FormattedMessage id="app.newsPage.ranges.world" />
                  </Menu.Item>
                </Menu>
              }
              trigger={['click']}
            >
              <DropdownLink className="ant-dropdown-link" href="#">
                <FormattedMessage id={`app.newsPage.ranges.${range}`} />{' '}
                <ExpandMoreIcon />
              </DropdownLink>
            </Dropdown>
          </NewsHeader>
          <StreamApp
            apiKey={REACT_APP_GETSTREAM_API_KEY}
            appId={REACT_APP_GETSTREAM_APP_ID}
            token={user.feedToken}
          >
            <StatusUpdateForm
              feedGroup="user"
              modifyActivityData={data => ({
                ...data,
                to: ['timeline:world'],
              })}
            />
            {range === NEWS_RANGES.ME && (
              <FlatFeed {...flatFeedOptions} feedGroup="user" />
            )}
            {range === NEWS_RANGES.NETWORK && (
              <FlatFeed {...flatFeedOptions} feedGroup="network" />
            )}
            {range === NEWS_RANGES.WORLD && (
              <FlatFeed
                {...flatFeedOptions}
                feedGroup="timeline"
                userId="world"
              />
            )}
          </StreamApp>
        </BlockContainer>
      </PageContainer>
    )
  }
}

const mapStateToProps = state => ({
  user: state.user.data,
})

export default compose(
  connect(mapStateToProps),
  injectIntl,
)(NewsPage)
