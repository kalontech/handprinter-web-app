import { useState, useEffect } from 'react'

import { getCompetition } from '../../api/competitions'
import { getActions } from '../../api/actions'

export default function useCompetition(competitionId) {
  const [competition, setCompetition] = useState()
  const [participants, setParticipants] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function fetchList() {
      try {
        setLoading(true)
        const res = await getCompetition(competitionId)
        const competitionActionsRes = await getActions({
          _id: {
            $in: res.competition.actions.map(i => i._id),
          },
          limit: 50,
        })

        if (res && competitionActionsRes) {
          setCompetition({
            ...res.competition,
            actions: competitionActionsRes.actions.docs,
          })
          setParticipants(res.participants)
        }
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    fetchList()
  }, [competitionId])

  return [competition, loading, participants]
}
