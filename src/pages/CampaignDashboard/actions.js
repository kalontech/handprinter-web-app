import React, { Fragment } from 'react'
import _ from 'lodash'
import Spinner from 'components/Spinner'
import { FormattedMessage } from 'react-intl'
import { Link } from 'react-router-dom'
import { Menu, Row, Col } from 'antd'
import ActionCard from 'components/ActionCard'
import ScrollAnimation from 'components/ScrollAnimation'
import { ACTION_STATES } from 'utils/constants'
import ActionCardLabelSet from 'components/ActionCardLabelSet'
import Tooltip from 'components/Tooltip'

import { MenuStyled, EmptyList } from './styled'
import { ACTIONS_TABS } from './constants'
import { ImpactButton } from '../ActionsPage/styled'
import { EVENT_TYPES, logEvent } from '../../amplitude'

function getActions(props, selectedKey) {
  const {
    myProgress,
    campaign: { actions },
  } = props
  if (myProgress) {
    const myAccomplishedActionIds = myProgress.accomplishedActions.map(
      i => i._id,
    )
    return actions.filter(action => {
      const isAccomplished = myAccomplishedActionIds.includes(action._id)
      return selectedKey === ACTIONS_TABS.ACCOMPLISHED
        ? isAccomplished
        : !isAccomplished
    })
  } else if (selectedKey === ACTIONS_TABS.ACCOMPLISHED) {
    return []
  } else return actions
}

export default function renderActions(props) {
  const {
    loading,
    intl: { formatMessage, formatRelative, locale },
    intl,
    history,
    showPhysicalValues,
  } = props
  const selectedKey = _.get(props, 'location.search', '').includes(
    ACTIONS_TABS.ACCOMPLISHED,
  )
    ? ACTIONS_TABS.ACCOMPLISHED
    : ACTIONS_TABS.TODO

  const filteredActions = getActions(props, selectedKey)

  return (
    <Fragment>
      <MenuStyled
        mode="horizontal"
        inlineIndent={0}
        selectedKeys={[selectedKey]}
      >
        <Menu.Item key={ACTIONS_TABS.TODO}>
          <Link to={`?view=actions`}>
            <FormattedMessage id="app.campaignPage.todo" />
          </Link>
        </Menu.Item>
        <Menu.Item key={ACTIONS_TABS.ACCOMPLISHED}>
          <Link to={`?view=actions&tab=${ACTIONS_TABS.ACCOMPLISHED}`}>
            <FormattedMessage id="app.campaignPage.accomplished" />
          </Link>
        </Menu.Item>
      </MenuStyled>
      {loading && <Spinner />}
      {!loading &&
        filteredActions
          .sort((a, b) => {
            return _.get(a, 'habit.canBeHabit') - _.get(b, 'habit.canBeHabit')
          })
          .reduce((resultArray, action, index) => {
            const chunkIndex = Math.floor(index / 3)

            if (!resultArray[chunkIndex]) {
              resultArray[chunkIndex] = [] // start a new chunk
            }

            resultArray[chunkIndex].push(action)

            return resultArray
          }, [])
          .map((chunk, index) => {
            return (
              <Row key={index} gutter={{ md: 20 }} span={24}>
                {chunk.map(action => (
                  <Col key={action._id} xl={8} lg={12} md={12} xs={24}>
                    <ScrollAnimation>
                      <ActionCard
                        onClick={() =>
                          logEvent(EVENT_TYPES.CHALLENGES_PARTICIPATE_CAMPAIGN)
                        }
                        to={
                          action.status === ACTION_STATES.PROPOSED
                            ? `/account/actions/preview/${action.slug}`
                            : `/actions/discover/${action.slug}`
                        }
                        picture={action.picture}
                        canChange={action.status === ACTION_STATES.PROPOSED}
                        onEdit={e => {
                          e.preventDefault()

                          history.push(`/account/actions/edit/${action.slug}`)
                        }}
                        name={
                          action.translatedName && action.translatedName[locale]
                            ? action.translatedName[locale]
                            : action.name
                        }
                        impacts={() => {
                          let tooltipTextId, buttonTextId
                          switch (action.status) {
                            case ACTION_STATES.MODELING:
                              tooltipTextId =
                                'app.actions.card.waitModelingHint'
                              buttonTextId = 'app.actions.card.waitModeling'
                              break
                            case ACTION_STATES.DENIED:
                              tooltipTextId = 'app.actions.card.deniedHint'
                              buttonTextId = 'app.actions.card.denied'
                              break
                            default:
                              tooltipTextId = 'app.actions.card.waitAdminHint'
                              buttonTextId = 'app.actions.card.waitAdmin'
                          }
                          return action.status !== ACTION_STATES.PUBLISHED ? (
                            <Tooltip
                              placement="top"
                              title={formatMessage({
                                id: tooltipTextId,
                              })}
                            >
                              <ImpactButton
                                style={{ height: 35 }}
                                isModelling={
                                  action.status === ACTION_STATES.MODELING
                                }
                              >
                                {formatMessage({
                                  id: buttonTextId,
                                })}
                              </ImpactButton>
                            </Tooltip>
                          ) : (
                            <ActionCardLabelSet
                              impacts={action.impacts}
                              impactsInUnits={action.impactsInUnits}
                              showPhysicalValues={showPhysicalValues}
                            />
                          )
                        }}
                        suggestedBy={action.suggestedBy}
                        suggestedAt={
                          action.suggestedAt &&
                          formatRelative(action.suggestedAt)
                        }
                        isHabit={action.isHabit}
                        selectedKey={selectedKey}
                      />
                    </ScrollAnimation>
                  </Col>
                ))}
              </Row>
            )
          })}
      {filteredActions.length === 0 && (
        <EmptyList>
          {intl.formatMessage({
            id: 'app.actionsPage.actionsNotFound',
          })}
        </EmptyList>
      )}
    </Fragment>
  )
}

renderActions.propTypes = {
  loading: Boolean,
  participants: Array,
  intl: Object,
  campaign: Object,
  history: Object,
  showPhysicalValues: Boolean,
  toggleUnits: Function,
}
