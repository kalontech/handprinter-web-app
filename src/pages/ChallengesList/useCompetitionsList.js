import { useState, useEffect } from 'react'
import _ from 'lodash'
import qs from 'qs'

import { fetchCompetitionsList } from '../../api/competitions'

export default function useCompetitionsList(props) {
  const [competitions, setCompetitions] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(false)

  const { location } = props
  const queries = qs.parse(location.search, { ignoreQueryPrefix: true })

  useEffect(() => {
    async function fetchList() {
      try {
        setLoading(true)
        const res = await fetchCompetitionsList({
          page: queries.page || 1,
          limit: 21,
        })
        const docs = _.get(res, 'competitions.docs', [])
        setCompetitions(docs)
        setPage(res.competitions.page)
        setTotalPages(res.competitions.totalPages)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchList()
  }, [competitions.length, location])

  return [competitions, page, totalPages, loading]
}
