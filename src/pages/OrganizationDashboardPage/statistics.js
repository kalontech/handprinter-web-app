import React, { Fragment, useContext } from 'react'
import Spinner from 'components/Spinner'
import { FormattedMessage } from 'react-intl'
import ActionCardLabelSet from 'components/ActionCardLabelSet'
import moment from 'moment'

import {
  StatisticsScroll,
  StatisticsContainer,
  StatisticsMain,
  StatisticsScrollTitle,
  TotalImpactTitle,
  ActionLabelsBlock,
  Separator,
  ActionLabelsTitle,
} from './styled'
import AccomplishedAction from './accomplishedAction'

import { UIContextSettings } from '../../context/uiSettingsContext'
import ActionCardLabel from '../../components/ActionCardLabel'
import {
  TimeValueAbbreviations,
  IMPACT_CATEGORIES,
} from '../../utils/constants'

function getSortedActions(actions) {
  const res = {}
  // Group by slug
  actions.forEach(({ action, picture, impactsTime }) => {
    if (!res[action.slug]) res[action.slug] = {}
    res[action.slug] = {
      action: {
        ...action,
        picture,
        impacts: impactsTime,
      },
      count: res[action.slug].count ? res[action.slug].count + 1 : 1,
    }
  })
  // Convert to array and sort by accimplished actions count
  return Object.keys(res)
    .map(key => res[key])
    .sort((a, b) => b.count - a.count)
}

export default function renderStatistics(props) {
  const UIContextData = useContext(UIContextSettings)

  const { loading, group, groupNetwork } = props
  if (!group) return null
  const sortedActions = getSortedActions(group.userImpacts.actions)
  const organizationImpacts = group.userImpacts && group.userImpacts.impacts
  const organizationImpactsInUnits =
    group.userImpacts && group.userImpacts.impactsInUnits
  const networkImpacts = groupNetwork && groupNetwork.networkImpacts.impacts
  const networkImpactsInUnits =
    groupNetwork && groupNetwork.networkImpacts.impactsInUnits

  const activeSince = props.intl.formatMessage(
    { id: 'app.organization.active.since' },
    {
      organization: group.name,
      date: moment(group.info.dateFrom).format('LL'),
    },
  )
  return (
    <Fragment>
      {loading ? (
        <Spinner />
      ) : (
        <StatisticsMain>
          {!props.isTablet && !props.isMobile && (
            <StatisticsContainer>
              <StatisticsScrollTitle>
                <FormattedMessage id="app.organization.impact" />
              </StatisticsScrollTitle>
              <StatisticsScroll>
                <ActionLabelsTitle>
                  <p>{activeSince}</p>
                </ActionLabelsTitle>
                <TotalImpactTitle>
                  <FormattedMessage id="app.organization.total.impact" />
                </TotalImpactTitle>
                <ActionLabelsBlock>
                  <ActionCardLabelSet
                    largeLabel
                    impacts={organizationImpacts}
                    impactsInUnits={organizationImpactsInUnits}
                    showPhysicalValues={UIContextData.showPhysicalValues}
                    hideTooltipTitle
                  />
                </ActionLabelsBlock>
                <ActionLabelsBlock>
                  <ActionCardLabel
                    largeLabel
                    hideTooltip
                    labelWidth={105}
                    category={IMPACT_CATEGORIES.MEMBERS}
                    unit={TimeValueAbbreviations.MEMBERS}
                    value={group.info.membersCount}
                    variant={'positive'}
                  />
                  <ActionCardLabel
                    largeLabel
                    hideTooltip
                    labelWidth={105}
                    category={IMPACT_CATEGORIES.ACTIONS_TAKEN}
                    unit={TimeValueAbbreviations.ACTIONS_TAKEN}
                    value={
                      group.userImpacts ? group.userImpacts.actions.length : 0
                    }
                    variant={'positive'}
                  />
                </ActionLabelsBlock>
                <Separator />
                {groupNetwork && (
                  <Fragment>
                    <TotalImpactTitle>
                      <FormattedMessage id="app.organization.total.impact.network" />
                    </TotalImpactTitle>
                    <ActionLabelsBlock>
                      <ActionCardLabelSet
                        hideTooltipTitle
                        largeLabel
                        impacts={networkImpacts}
                        impactsInUnits={networkImpactsInUnits}
                        showPhysicalValues={UIContextData.showPhysicalValues}
                      />
                    </ActionLabelsBlock>
                    <ActionLabelsBlock>
                      <ActionCardLabel
                        largeLabel
                        hideTooltip
                        labelWidth={105}
                        category={IMPACT_CATEGORIES.MEMBERS}
                        unit={TimeValueAbbreviations.NETWORK_MEMBERS}
                        value={
                          group.info.membersCount +
                          groupNetwork.info.networkMembersCount
                        }
                        variant={'positive'}
                      />
                      <ActionCardLabel
                        largeLabel
                        hideTooltip
                        labelWidth={105}
                        category={IMPACT_CATEGORIES.ACTIONS_TAKEN}
                        unit={TimeValueAbbreviations.ACTIONS_TAKEN}
                        value={
                          groupNetwork.networkImpacts
                            ? groupNetwork.networkImpacts.actions.length
                            : 0
                        }
                        variant={'positive'}
                      />
                    </ActionLabelsBlock>
                  </Fragment>
                )}
              </StatisticsScroll>
            </StatisticsContainer>
          )}
          {props.activeTab && props.isTablet && (
            <StatisticsContainer>
              <StatisticsScroll>
                <TotalImpactTitle>
                  <FormattedMessage id="app.organization.total.impact" />
                </TotalImpactTitle>
                <ActionLabelsTitle>
                  <p>{activeSince}</p>
                </ActionLabelsTitle>
                <ActionLabelsBlock>
                  <ActionCardLabelSet
                    hideTooltipTitle
                    largeLabel
                    impacts={organizationImpacts}
                    impactsInUnits={organizationImpactsInUnits}
                    showPhysicalValues={UIContextData.showPhysicalValues}
                    justify
                  />
                </ActionLabelsBlock>
                <ActionLabelsBlock>
                  <ActionCardLabel
                    largeLabel
                    hideTooltip
                    labelWidth={105}
                    category={IMPACT_CATEGORIES.MEMBERS}
                    unit={TimeValueAbbreviations.MEMBERS}
                    value={group.info.membersCount}
                    variant={'positive'}
                  />
                  <ActionCardLabel
                    largeLabel
                    hideTooltip
                    labelWidth={105}
                    category={IMPACT_CATEGORIES.ACTIONS_TAKEN}
                    unit={TimeValueAbbreviations.ACTIONS_TAKEN}
                    value={
                      group.userImpacts ? group.userImpacts.actions.length : 0
                    }
                    variant={'positive'}
                  />
                </ActionLabelsBlock>
                <Separator />
                {groupNetwork && (
                  <Fragment>
                    <TotalImpactTitle>
                      <FormattedMessage id="app.organization.total.impact.network" />
                    </TotalImpactTitle>
                    <ActionLabelsBlock>
                      <ActionCardLabelSet
                        hideTooltipTitle
                        largeLabel
                        impacts={networkImpacts}
                        impactsInUnits={networkImpactsInUnits}
                        showPhysicalValues={UIContextData.showPhysicalValues}
                        justify
                      />
                    </ActionLabelsBlock>
                    <ActionLabelsBlock>
                      <ActionCardLabel
                        largeLabel
                        hideTooltip
                        labelWidth={105}
                        category={IMPACT_CATEGORIES.MEMBERS}
                        unit={TimeValueAbbreviations.NETWORK_MEMBERS}
                        value={
                          group.info.membersCount +
                          groupNetwork.info.networkMembersCount
                        }
                        variant={'positive'}
                      />
                      <ActionCardLabel
                        largeLabel
                        hideTooltip
                        labelWidth={105}
                        category={IMPACT_CATEGORIES.ACTIONS_TAKEN}
                        unit={TimeValueAbbreviations.ACTIONS_TAKEN}
                        value={
                          groupNetwork.networkImpacts
                            ? groupNetwork.networkImpacts.actions.length
                            : 0
                        }
                        variant={'positive'}
                      />
                    </ActionLabelsBlock>
                  </Fragment>
                )}
              </StatisticsScroll>
            </StatisticsContainer>
          )}
          {!props.activeTab && props.isTablet && (
            <StatisticsContainer>
              {!props.isTablet && !props.isMobile && (
                <StatisticsScrollTitle>
                  <FormattedMessage id="app.header.menu.actions" />
                </StatisticsScrollTitle>
              )}
              <StatisticsScroll>
                {sortedActions.map(accomplished => (
                  <AccomplishedAction
                    key={accomplished.action._id}
                    accomplished={accomplished}
                    isTablet={props.isTablet}
                    isMobile={props.isMobile}
                  />
                ))}
              </StatisticsScroll>
            </StatisticsContainer>
          )}
          {!props.activeTab && !props.isTablet && !props.isMobile && (
            <StatisticsContainer>
              <StatisticsScrollTitle>
                <FormattedMessage id="app.header.menu.actions" />
              </StatisticsScrollTitle>
              <StatisticsScroll>
                {sortedActions.map(accomplished => (
                  <AccomplishedAction
                    key={accomplished.action._id}
                    accomplished={accomplished}
                  />
                ))}
              </StatisticsScroll>
            </StatisticsContainer>
          )}
        </StatisticsMain>
      )}
    </Fragment>
  )
}

renderStatistics.propTypes = {
  loading: Boolean,
  participants: Array,
  intl: Object,
  campaign: Object,
  history: Object,
  user: Object,
  group: Object,
  groupNetwork: Object,
  isTablet: Boolean,
  isMobile: Boolean,
  activeTab: Boolean,
}
