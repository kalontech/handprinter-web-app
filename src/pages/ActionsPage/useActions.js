import { useEffect, useState, useRef } from 'react'
import qs from 'qs'
import _ from 'lodash'
import * as api from 'api/actions'
import Compress from 'compress.js'

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
  const [isLoading, setIsLoading] = useState(true)
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
    if (!shouldConcatActions) setActions([])
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
      ][Object.values(ACTIONS_SUBSETS).indexOf(match.params.subset)] ||
      api.getActions

    const response = await getActions({ ...query, limit: 20, page })
    if (response && response.actions) {
      const nextActions = _.get(response, 'actions.docs', [])
      // TODO run script for production DB
      // for (let i = 0; i < nextActions.length; i++) {
      //   const element = nextActions[i]
      //   await compressActionPicture(element)
      // }

      setActions(
        shouldConcatActions ? actions.concat(nextActions) : nextActions,
      )
      setTotal(_.get(response, 'actions.totalDocs', 0))
    }
    setIsLoading(false)
  }

  return [actions, total, isLoading]
}

export async function compressActionPicture(action) {
  let blob = await fetch(action.picture).then(r => r.blob())
  const body = new FormData()
  const compress = new Compress()
  const compressed = await compress.compress([blob], {
    size: 1,
    quality: 1,
    maxWidth: 1920,
    maxHeight: 1920,
    resize: true,
  })
  const base64str = compressed[0].data
  const imgExt = compressed[0].ext
  const compressedFile = Compress.convertBase64ToFile(base64str, imgExt)
  body.append('picture', compressedFile)

  const compressedPreview = await compress.compress([blob], {
    size: 0.1,
    quality: 0.5,
    maxWidth: 200,
    maxHeight: 200,
    resize: true,
  })
  const base64strPreview = compressedPreview[0].data
  const imgExtPreview = compressedPreview[0].ext
  const preview = Compress.convertBase64ToFile(base64strPreview, imgExtPreview)
  body.append('picturePreview', preview)

  await api.updateAction(action._id, { body })
}
