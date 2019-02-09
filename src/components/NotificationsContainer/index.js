import React from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage, injectIntl, intlShape } from 'react-intl'
import { Link } from 'react-router-dom'

import api from 'api'
import styled from 'styled-components'
import colors from 'config/colors'
import viewAllIcon from './assets/viewAllIcon.svg'

const NotificationBox = styled.div`
  width: 500px;
  color: ${({ fontColor }) => fontColor || colors.darkGray};
`

const NotificationTitle = styled.div`
  display: flex;
  background-color: ${colors.green};
  align-items: center;
  color: ${colors.white};
  font-size: 16px;
  justify-content: center;
  height: 45px;
  font-family: ${({ fontNames }) => fontNames || '"Noto Sans", sans-serif'};
  cursor: default;
`

const NotificationContent = styled.div``

const NotificationBody = styled.div`
  padding: 13px 10px;
  overflow: hidden;
  white-space: nowrap;
  div {
    line-height: 20px;
    text-overflow: ellipsis;
    overflow: hidden;
  }
`

const NotificationItem = styled.div`
  display: flex;
  flex-direction: row;
  height: 65px;
  border-bottom: 1px solid ${colors.gray};
`

const NotificationPicture = styled.div`
  margin-right: 10px;
  width: 66px;
  padding: 13px;
  background-color: ${colors.lightGray};

  img {
    border-radius: 25px;
    height: 40px;
    width: 40px;
  }
`

const ViewAllNewsContainer = styled.div`
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const ViewAllButton = styled(Link)`
  font-family: ${({ fontNames }) => fontNames || '"Noto Sans", sans-serif'};
  color: ${colors.ocean};
  font-weight: bold;
  &:hover {
    color: ${colors.ocean};
  }
`

const NotificationLink = styled(Link)`
  font-weight: bold;
`

const BoldNameTag = styled.span`
  font-weight: bold;
  color: ${colors.dark};
`

const NotificationsContainer = ({
  fontColor,
  fontNames,
  notification,
  intl: { locale, formatMessage, formatRelative },
}) => (
  <NotificationBox fontColor={fontColor}>
    <NotificationTitle fontNames={fontNames}>
      <FormattedMessage id="app.header.menu.notificationTitle" />
    </NotificationTitle>
    <NotificationContent>
      {notification.map((notifItem, index) => {
        if (index > 4) return

        const { user, action } = notifItem.arguments
        const userPhoto =
          (user && user.photo) ||
          api.getUserInitialAvatar((user && user.fullName) || '?')

        return (
          <NotificationItem key={index}>
            <NotificationPicture>
              <img src={userPhoto} alt="" />
            </NotificationPicture>
            <NotificationBody>
              <div>
                <FormattedMessage
                  id="app.newsPage.notification.userDidAction"
                  values={{
                    user: (
                      <BoldNameTag>
                        {(user && user.fullName) ||
                          formatMessage({
                            id: 'app.newsPage.userWithoutName',
                          })}
                      </BoldNameTag>
                    ),
                    action: (
                      <NotificationLink
                        to={`/account/news/actions/${action.slug}`}
                      >
                        {action.translatedName[locale] || action.name}
                      </NotificationLink>
                    ),
                  }}
                />
              </div>

              <div>{formatRelative(notifItem.date)}</div>
            </NotificationBody>
          </NotificationItem>
        )
      })}
    </NotificationContent>
    {notification.length > 5 && (
      <ViewAllNewsContainer>
        <ViewAllButton to="/account/news" fontNames={fontNames}>
          <FormattedMessage id="app.header.menu.viewAllNews" />
          <img src={viewAllIcon} alt="" />
        </ViewAllButton>
      </ViewAllNewsContainer>
    )}
  </NotificationBox>
)

NotificationsContainer.propTypes = {
  intl: intlShape.isRequired,
  notification: PropTypes.array.isRequired,
  fontColor: PropTypes.string.isRequired,
  fontNames: PropTypes.string.isRequired,
}

export default injectIntl(NotificationsContainer)
