import React, { Component } from 'react'
import styled, { css } from 'styled-components'
import { injectIntl, FormattedMessage } from 'react-intl'
import { Menu, Dropdown } from 'antd'
import { animateScroll } from 'react-scroll/modules'
import { compose } from 'redux'

import { BlockContainer } from 'components/Styled'
import Feed from 'components/Feed'
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
    const { range } = this.state

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
          {range === NEWS_RANGES.ME && (
            <Feed
              readFrom={{
                feedGroup: 'user',
              }}
            />
          )}
          {range === NEWS_RANGES.NETWORK && (
            <Feed
              readFrom={{
                feedGroup: 'network',
              }}
            />
          )}
          {range === NEWS_RANGES.WORLD && (
            <Feed
              readFrom={{
                feedGroup: 'timeline',
                userId: 'world',
              }}
            />
          )}
        </BlockContainer>
      </PageContainer>
    )
  }
}

export default compose(injectIntl)(NewsPage)
