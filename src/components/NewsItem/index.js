import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import media from 'utils/mediaQueryTemplate'

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

const NewsItemBody = styled.div``

const NewsItemMessage = styled.div``

const NewsItemDate = styled.div``

const NewsItemSuffix = styled.div`
  ${media.desktop`
    display: none;
  `}
`

const NewsItem = ({ picture, subject, date, suffix }) => (
  <NewsItemContainer>
    <NewsItemContent>
      <NewsItemPicture>
        <img src={picture} alt="photo" />
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

export default NewsItem
