import { useState, useEffect } from 'react'

import { getCampaign } from '../../api/campaigns'

export default function useCampaign(campaignId) {
  const [campaign, setCampaign] = useState()
  const [myProgress, setMyProgress] = useState()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    async function fetchList() {
      try {
        setLoading(true)
        const res = await getCampaign(campaignId)
        if (res) {
          setCampaign({
            ...res.campaign,
            actions: res.campaign.actions,
          })
          setMyProgress(res.myProgress)
        }
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }
    fetchList()
  }, [campaignId])

  return [campaign, loading, myProgress]
}
