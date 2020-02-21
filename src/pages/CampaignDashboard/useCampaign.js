import { useState, useEffect } from 'react'

import { getCampaign } from '../../api/campaigns'

export default function useCampaign(campaignId) {
  const [campaign, setCampaign] = useState()
  const [participants, setParticipants] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function fetchList() {
      try {
        setLoading(true)
        const res = await getCampaign(campaignId)
        if (res) {
          const participants = res.participants.map(participant => {
            return {
              user: participant._id,
              accomplishedActions: participant.accomplishedActions,
            }
          })
          setCampaign(res.campaign)
          setParticipants(participants)
        }
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    fetchList()
  }, [campaignId])

  return [campaign, loading, participants]
}
