import { useState, useEffect } from 'react'
import _ from 'lodash'
import qs from 'qs'

import { fetchCampaignsList } from '../../api/campaigns'

export default function useCampaignsList(props) {
  const [campaigns, setCampaigns] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(false)

  const { location } = props
  const queries = qs.parse(location.search, { ignoreQueryPrefix: true })

  useEffect(() => {
    async function fetchList() {
      try {
        setLoading(true)
        const res = await fetchCampaignsList({
          page: queries.page || 1,
          limit: 50,
          userId: props.user._id,
        })
        const docs = _.get(res, 'campaigns.docs', [])
        setCampaigns(docs)
        setPage(res.campaigns.page)
        setTotalPages(res.campaigns.totalPages)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchList()
  }, [campaigns.length, location])
  return [campaigns, loading, page, totalPages]
}
