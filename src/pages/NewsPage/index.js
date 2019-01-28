import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { injectIntl, FormattedMessage, FormattedHTMLMessage } from 'react-intl'
import { Menu, Dropdown } from 'antd'
import { connect } from 'react-redux'
import moment from 'moment'

import api from './../../api'
import ActionCardLabelSet from './../../components/ActionCardLabelSet'
import Spinner from './../../components/Spinner'
import { BlockContainer, DefaultButton } from './../../components/Styled'
import colors from './../../config/colors'
import media from './../../utils/mediaQueryTemplate'
import ExpandMoreIcon from '../../assets/icons/ExpandMoreIcon'

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

  componentDidMount = () => {
    this.fetchNews()
  }

  fetchNews = async () => {
    this.setState({ loadingNews: true })
    const { news } = await api.getNews(
      {
        page: this.state.page,
        range: this.state.range,
      },
      this.props.token,
    )
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
            {this.state.news.map((news, index) => {
              switch (news.type) {
                case 'USER_DID_ACTION':
                  return (
                    <NewsItem
                      key={index}
                      picture={
                        (news.arguments.user && news.arguments.user.photo) ||
                        api.getUserInitialAvatar(
                          (news.arguments.user &&
                            news.arguments.user.fullName) ||
                            '?',
                        )
                      }
                      subject={
                        <FormattedHTMLMessage
                          id="app.newsPage.news.userDidAction"
                          values={{
                            user:
                              (news.arguments.user &&
                                news.arguments.user.fullName) ||
                              this.props.intl.formatMessage({
                                id: 'app.newsPage.userWithoutName',
                              }),
                            action:
                              news.arguments.action.translatedName[locale] ||
                              news.arguments.action.name,
                          }}
                        />
                      }
                      date={<Fragment>{moment(news.date).fromNow()}</Fragment>}
                      suffix={
                        <ActionCardLabelSet impacts={news.arguments.impacts} />
                      }
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

const mapStateToProps = state => ({
  token: state.account.token,
})

NewsPage.propTypes = {
  intl: PropTypes.object.isRequired,
  token: PropTypes.string.isRequired,
}

export default connect(mapStateToProps)(injectIntl(NewsPage))
