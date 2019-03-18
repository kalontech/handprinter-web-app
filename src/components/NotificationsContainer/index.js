import React from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage, injectIntl, intlShape } from 'react-intl'
import { Link } from 'react-router-dom'

import styled from 'styled-components'
import colors from 'config/colors'

import emptyNotifBackground from 'assets/notifications-popover/notifications-empty-background.png'

import viewAllIcon from './assets/viewAllIcon.svg'

const NotificationBox = styled.div`
  width: 436px;
  min-height: 307px;
  color: ${({ fontColor }) => fontColor || colors.darkGray};
`

const NotificationTitle = styled.div`
  display: flex;
  background-color: ${colors.green};
  border-radius: 4px 4px 0px 0;
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
  background-color: ${colors.white};
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

const NotificationEmptySection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const NotificationEmptySectionBackground = styled.img`
  width: 188px;
  height: 170px;
`

const NotificationsEmptyText = styled.div`
  margin-top: 3px;
  color: ${colors.darkGray};
  font-family: ${({ fontNames }) => fontNames || '"Noto Sans", sans-serif'};
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
      {notification.length > 0 ? (
        notification.slice(0, 5).map((notifItem, index) => {
          const { user, action } = notifItem.arguments

          return (
            <NotificationItem key={index}>
              <NotificationPicture>
                <img src={user && user.photo} alt="photo" />
              </NotificationPicture>
              <NotificationBody>
                <div>
                  <FormattedMessage
                    id="app.newsPage.notification.userDidAction"
                    values={{
                      user: (
                        <NotificationLink to={`/account/${user._id}`}>
                          {(user && user.fullName) ||
                            formatMessage({
                              id: 'app.newsPage.userWithoutName',
                            })}
                        </NotificationLink>
                      ),
                      action: (
                        <NotificationLink
                          to={`/account/news/actions/${action.slug}`}
                        >
                          {action.translatedName
                            ? action.translatedName[locale]
                            : action.name}
                        </NotificationLink>
                      ),
                    }}
                  />
                </div>

                <div>{formatRelative(notifItem.date)}</div>
              </NotificationBody>
            </NotificationItem>
          )
        })
      ) : (
        <NotificationEmptySection>
          <NotificationEmptySectionBackground
            src={emptyNotifBackground}
            alt=""
          />
          <NotificationsEmptyText fontNames={fontNames}>
            <FormattedMessage id="app.header.menu.noNotificationsYet" />
          </NotificationsEmptyText>
        </NotificationEmptySection>
      )}
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
