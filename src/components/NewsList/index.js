import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { FormattedMessage, FormattedRelative } from 'react-intl'

import ActionCardLabelSet from 'components/ActionCardLabelSet'
import NewsItem from 'components/NewsItem'

import { getUserInitialAvatar } from 'api'

const NewsItemLink = styled(Link)`
  font-weight: bold;
`

export default class NewsList extends React.PureComponent {
  static propTypes = {
    news: PropTypes.array,
    locale: PropTypes.string,
    personLinkPrefix: PropTypes.string,
    actionLinkPrefix: PropTypes.string,
  }

  static defaultProps = {
    news: [],
    locale: 'en',
    personLinkPrefix: '/account/',
    actionLinkPrefix: '/account/news/actions/',
  }

  render() {
    const { news, locale, personLinkPrefix, actionLinkPrefix } = this.props

    return (Array.isArray(news) ? news : []).map(
      ({ arguments: oneNews, date }) => (
        <NewsItem
          key={oneNews.user.id}
          picture={
            oneNews.user.photo || getUserInitialAvatar(oneNews.user.fullName)
          }
          subject={
            <FormattedMessage
              id="app.newsPage.news.userDidAction"
              values={{
                user: (
                  <NewsItemLink to={`${personLinkPrefix}${oneNews.user.id}`}>
                    {oneNews.user.fullName}
                  </NewsItemLink>
                ),
                action: oneNews.action ? (
                  <NewsItemLink
                    to={`${actionLinkPrefix}${oneNews.action.slug}`}
                  >
                    {oneNews.action.translatedName
                      ? oneNews.action.translatedName[locale]
                      : oneNews.action.name}
                  </NewsItemLink>
                ) : (
                  ''
                ),
              }}
            />
          }
          date={<FormattedRelative value={date} />}
          suffix={<ActionCardLabelSet impacts={oneNews.impacts} />}
        />
      ),
    )
  }
}
