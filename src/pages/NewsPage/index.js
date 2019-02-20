import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { injectIntl, FormattedMessage, intlShape } from 'react-intl'
import { Menu, Dropdown } from 'antd'
import { animateScroll } from 'react-scroll/modules'

import ActionCardLabelSet from 'components/ActionCardLabelSet'
import Spinner from 'components/Spinner'
import { BlockContainer, DefaultButton } from 'components/Styled'
import colors from 'config/colors'
import media from 'utils/mediaQueryTemplate'
import ExpandMoreIcon from 'assets/icons/ExpandMoreIcon'
import hexToRgba from 'utils/hexToRgba'
import api from 'api'

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

const NewsItemContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 13px 0;
`

const NewsItemPicture = styled.div`
  margin-right: 17px;
  width: 50px;

  img {
    border-radius: 25px;
    height: 50px;
    width: 50px;
  }
`

const NewsItemContent = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
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

const NewsItemLink = styled(Link)`
  font-weight: bold;
`

const NewsItemBody = styled.div``

const NewsItemMessage = styled.div``

const NewsItemDate = styled.div``

const NewsItemSuffix = styled.div`
  ${media.desktop`
    display: none;
  `}
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

const NewsItem = ({ picture, subject, date, suffix }) => (
  <NewsItemContainer>
    <NewsItemContent>
      <NewsItemPicture>
        <img src={picture} />
      </NewsItemPicture>
      <NewsItemBody>
        <NewsItemMessage>{subject}</NewsItemMessage>
        <NewsItemDate>{date}</NewsItemDate>
      </NewsItemBody>
    </NewsItemContent>
    <NewsItemSuffix>{suffix}</NewsItemSuffix>
  </NewsItemContainer>
)

NewsItem.propTypes = {
  picture: PropTypes.string.isRequired,
  subject: PropTypes.node.isRequired,
  date: PropTypes.node.isRequired,
  suffix: PropTypes.node.isRequired,
}

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
    const { news } = await api.getNews({
      page: this.state.page,
      range: this.state.range,
    })
    this.setState({
      loadingNews: false,
      news: [...this.state.news, ...news],
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
      intl: { locale, formatRelative },
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
            {this.state.news.map((news, index) => {
              switch (news.type) {
                case 'USER_DID_ACTION':
                  const { user, action, impacts } = news.arguments
                  return (
                    <NewsItem
                      key={index}
                      picture={
                        (user && user.photo) ||
                        api.getUserInitialAvatar((user && user.fullName) || '?')
                      }
                      subject={
                        <FormattedMessage
                          id="app.newsPage.news.userDidAction"
                          values={{
                            user: (
                              <NewsItemLink to={`/account/person/${user.id}`}>
                                {(user && user.fullName) ||
                                  this.props.intl.formatMessage({
                                    id: 'app.newsPage.userWithoutName',
                                  })}
                              </NewsItemLink>
                            ),
                            action: (
                              <NewsItemLink
                                to={`/account/news/actions/${action.slug}`}
                              >
                                {action.translatedName[locale] || action.name}
                              </NewsItemLink>
                            ),
                          }}
                        />
                      }
                      date={formatRelative(news.date)}
                      suffix={<ActionCardLabelSet impacts={impacts} />}
                    />
                  )
                default:
                  return null
              }
            })}
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
