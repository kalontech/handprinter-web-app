import { useState, useEffect } from 'react'

import { getInvitations } from '../../api/competitions'

export default function useInvitationsList(competitionId) {
  const [list, setList] = useState([])

  useEffect(() => {
    async function fetchList() {
      try {
        const res = await getInvitations(competitionId)
        if (res) {
          const invitations = res.invitations
          setList(invitations)
        }
      } catch (error) {
        console.error(error)
      }
    }
    fetchList()
  }, [list.length])

  return [list]
}
