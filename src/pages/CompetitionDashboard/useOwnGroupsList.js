import { useState, useEffect } from 'react'

import { fetchOwnGroupsList } from '../../api/groups'

export default function useOwnGroupsList() {
  const [groups, setGroups] = useState([])

  useEffect(() => {
    async function fetchList() {
      try {
        const res = await fetchOwnGroupsList()
        if (res) {
          const groups = res.groups
          setGroups(groups.docs)
        }
      } catch (error) {
        console.error(error)
      }
    }
    fetchList()
  }, [groups.length])

  return [groups]
}
