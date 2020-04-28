import { useState, useEffect } from 'react'

import { getCampaign } from '../../api/campaigns'
import { getActions } from '../../api/actions'

export default function useCampaign(campaignId) {
  const [campaign, setCampaign] = useState()
  const [participants, setParticipants] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function fetchList() {
      try {
        setLoading(true)
        const res = await getCampaign(campaignId)
        const campaingActionsRes = await getActions({
          _id: {
            $in: res.campaign.actions.map(i => i._id),
          },
          limit: 50,
        })

        if (res && campaingActionsRes) {
          setCampaign({
            ...res.campaign,
            actions: campaingActionsRes.actions.docs,
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
  }, [campaignId])

  return [campaign, loading, participants]
}
