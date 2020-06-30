import { useState, useEffect } from 'react'

import { getCampaignParticipants } from '../../api/campaigns'

export default function useCampaignParticipants(campaign) {
  const [loading, setLoading] = useState([])
  const [participants, setParticipants] = useState([])
  useEffect(() => {
    async function fetchList() {
      try {
        setLoading(true)
        const res = await getCampaignParticipants(campaign._id)
        if (res && res.participants) {
          setParticipants(res.participants)
        }
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    if (campaign) fetchList()
  }, [campaign])

  return [participants, loading]
}
