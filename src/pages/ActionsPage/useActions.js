import { useEffect, useState, useRef } from 'react'
import qs from 'qs'
import _ from 'lodash'
import * as api from 'api/actions'

import { ACTIONS_SUBSETS } from 'utils/constants'

function usePrevious(value) {
  const ref = useRef()
  useEffect(() => {
    ref.current = value
  })
  return ref.current
}

export default function useActions(props, page, setPage) {
  const { location, match } = props
  const query = qs.parse(location.search, { ignoreQueryPrefix: true })
  const [actions, setActions] = useState([])
  const [total, setTotal] = useState(0)
  const previousPage = usePrevious(page)
  useEffect(() => {
    // Fetching only if need to display next page of actions
    if (!previousPage || page > previousPage) {
      getActionsList(true, page)
    }
  }, [page])

  useEffect(() => {
    setPage(1)
    getActionsList(false, 1)
  }, [props.location, props.match])

  async function getActionsList(shouldConcatActions, page = 1) {
    /*
        Depending on match.params.subset fetching different lists of actions
        (modeling, history, etc.)
      */
    const getActions =
      [
        api.getActions,
        api.getSuggestedActions,
        api.getActionsMyIdeas,
        api.getActionsHistory,
        api.getActionsModeling,
      ][Object.values(ACTIONS_SUBSETS).indexOf(match.params.subset)] ||
      api.getActions

    const response = await getActions({ ...query, limit: 20, page })
    if (response && response.actions) {
      const nextActions = _.get(response, 'actions.docs', [])
      setActions(
        shouldConcatActions ? actions.concat(nextActions) : nextActions,
      )
      setTotal(_.get(response, 'actions.totalDocs', 0))
    }
  }

  return [actions, total]
}
