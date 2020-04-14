import { useState, useEffect } from 'react'
import _ from 'lodash'
import qs from 'qs'

import { fetchCompetitionsList, getInvitations } from '../../api/competitions'
import { INVITATION_STATUSES } from '../IncreaseHandprintPage'

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
          limit: 50,
        })
        const docs = _.get(res, 'competitions.docs', [])

        for (let i = 0; i < docs.length; i++) {
          const competition = docs[i]
          const invitationRes = await getInvitations(competition._id)
          if (invitationRes && invitationRes.invitations) {
            const pendingInvitation = invitationRes.invitations.find(
              i => i.status === INVITATION_STATUSES.PENDING,
            )
            if (pendingInvitation) {
              docs[i].pendingInvitation = pendingInvitation
            }
          }
        }
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

  return [competitions, loading, page, totalPages]
}
