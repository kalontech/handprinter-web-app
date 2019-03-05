import React, { Component } from 'react'
import styled from 'styled-components'
import { injectIntl, FormattedMessage, intlShape } from 'react-intl'
import { Menu, Dropdown } from 'antd'
import { animateScroll } from 'react-scroll/modules'

import Spinner from 'components/Spinner'
import NewsList from 'components/NewsList'
import { BlockContainer, DefaultButton } from 'components/Styled'
import colors from 'config/colors'
import media from 'utils/mediaQueryTemplate'
import ExpandMoreIcon from 'assets/icons/ExpandMoreIcon'
import hexToRgba from 'utils/hexToRgba'
import api, { getNews } from 'api'

const NEWS_RANGES = {
  NETWORK: 'network',
  WORLD: 'world',
}

const PageContainer = styled.div`
  background-color: ${colors.lightGray};
  padding: 40px 0;
  ${media.phone`
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
  ${media.phone`
    display: none;
  `}
`

const NewsTitleMob = styled(NewsTitle)`
   display: none;
    ${media.phone`
      display: block;
  `}
  }
`

const NewsContainer = styled.div`
  background-color: ${colors.white};
  padding: 17px 40px;
  box-shadow: 0 0 10px ${hexToRgba(colors.dark, 0.08)};
  border-radius: 4px;
  ${media.desktop`
    padding-left: 34px;
    padding-right: 34px;
  `}
  ${media.phone`
    margin-left: -15px;
    margin-right: -15px;
    padding-left: 15px;
    padding-right: 15px;
  `}
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

const NewsFooter = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 40px;
  ${media.phone`
    margin-top: 30px;
    .ant-btn {
      width: 100%;
    }
  `}
`

class NewsPage extends Component {
  state = {
    loadingNews: false,
    news: [],
    page: 1,
    range: NEWS_RANGES.WORLD,
  }

  componentDidMount() {
    animateScroll.scrollToTop()

    api.sendLastTimeReadNewsAt(Date.now())
    this.fetchNews()
  }

  fetchNews = async () => {
    this.setState({ loadingNews: true })
    const { news = [] } = await getNews({
      page: this.state.page,
      range: this.state.range,
    })
    this.setState({
      loadingNews: false,
      news: [
        ...this.state.news,
        ...news.filter(oneNews => {
          return (
            oneNews.type === 'USER_DID_ACTION' &&
            Boolean(oneNews.arguments.user)
          )
        }),
      ],
    })
  }

  handleLoadMoreNews = () => {
    this.setState({ page: this.state.page + 1 }, () => {
      this.fetchNews()
    })
  }

  handleRangeSelectorSelect = ({ key }) => {
    this.setState({ news: [], page: 1, range: key }, () => {
      this.fetchNews()
    })
  }

  render() {
    const {
      intl: { locale },
    } = this.props
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
                <FormattedMessage
                  id={`app.newsPage.ranges.${this.state.range}`}
                />{' '}
                <ExpandMoreIcon />
              </DropdownLink>
            </Dropdown>
          </NewsHeader>
          <NewsContainer>
            <NewsList news={this.state.news} locale={locale} />

            {this.state.loadingNews && this.state.page === 1 && <Spinner />}
          </NewsContainer>
          <NewsFooter>
            <DefaultButton
              disabled={this.state.loadingNews}
              loading={this.state.loadingNews && this.state.page > 1}
              onClick={this.handleLoadMoreNews}
            >
              <FormattedMessage id="app.newsPage.loadMoreNews" />
            </DefaultButton>
          </NewsFooter>
        </BlockContainer>
      </PageContainer>
    )
  }
}

NewsPage.propTypes = {
  intl: intlShape.isRequired,
}

export default injectIntl(NewsPage)
